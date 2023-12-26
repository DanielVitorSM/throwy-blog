<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Rules\Slug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Override\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\UploadedFile;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Intervention\Image\Facades\Image;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'slug',
        'role',
        'name',
        'email',
        'password',
        'avatar',
        'description',
        'email_verified_at',
        'last_login_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'last_login_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
    ];

    static array $roles = [
        'manager' => "Administrador",
        'writer' => "Escritor",
        'reader' => "Leitor"
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (User $user) {
            if (!empty($user->slug))
                return;

            $unique = false;
            $iterator = 0;

            while ($unique === false) {
                $user->slug = Str::slug($user->name, '-', 'pt');

                if ($iterator > 0)
                    $user->slug .= "-{$iterator}";

                $unique = !User::query()->where('slug', $user->slug)->exists();
                $iterator += 1;
            }
        });
    }

    public function setPasswordAttribute(string|null $value)
    {
        if (!empty($value))
            $this->attributes['password'] = bcrypt($value);
    }

    public function setAvatarAttribute(UploadedFile|string|null $file): void
    {
        if (is_string($file) || empty($file))
            return;

        $this->removeActualImage();
        $name = "{$this->slug}.{$file->getClientOriginalExtension()}";
        $path = "users/{$name}";

        if (!Storage::has('users'))
            Storage::makeDirectory('users');

        $img = Image::make($file->getRealPath());
        $img->resize(512, 512);
        $img->save(storage_path() . "/app/public/{$path}");

        $this->attributes['avatar'] = $path;
    }

    protected function removeActualImage(): void
    {
        $path = $this->getRawOriginal('avatar');

        if (empty($path))
            return;

        Storage::delete($path);
    }

    public function getAvatarAttribute($value)
    {
        if (empty($value))
            return null;

        if (Storage::exists($value))
            return asset(Storage::url($value));

        return null;
    }
}
