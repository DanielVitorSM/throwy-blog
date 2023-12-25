<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Override\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'author_id',
        'category_id',
        'slug',
        'title',
        'caption',
        'content',
        'banner',
        'published',
        'published_at',
    ];

    /**
     * The rules for valdiation.
     * 
     * @var array<string, string>
     */
    public static $rules = [
        'title' => 'required|string|max:255',
        'caption' => 'required|string|max:255',
        'content' => 'required|string|max:65535',
        'category_id' => 'required|string|exists:categories,id',
        'tags' => 'nullable|array',
        'tags.*' => 'required|string',
        'banner' => 'nullable|file|max:4096|mimes:jpg,jpeg,png',
        'published' => 'nullable|boolean',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'author_id',
        'category_id'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'published_at'
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Post $post) {
            if (!empty($post->slug))
                return;

            $unique = false;
            $iterator = 0;

            while ($unique === false) {
                $post->slug = Str::slug($post->name, '-', 'pt');

                if ($iterator > 0)
                    $post->slug .= "-{$iterator}";

                $unique = !Post::query()->where('slug', $post->slug)->exists();
                $iterator += 1;
            }
        });
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id')->select(['id', 'name', 'slug'])->withTrashed();
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id')->select(['id', 'name', 'avatar', 'description'])->withTrashed();
    }

    public function tags()
    {
        return $this->hasManyThrough(Tag::class, PostTag::class, 'post_id', 'id', 'id', 'tag_id')->select(['id', 'name', 'slug']);
    }

    public function views()
    {
        return $this->hasMany(PostView::class, 'post_id')->select(['id', 'user_id', 'created_at']);
    }

    public function setPublishedAttribute(bool $value)
    {
        if ($this->getRawOriginal('published') != $value)
            $this->attributes['published_at'] = date('Y-m-d H:i:s');

        $this->attributes['published'] = $value;
    }

    public function setBannerAttribute(UploadedFile|string $file)
    {
        if (is_string($file))
            return;

        $name = date('YmdHis-');

        if (!empty($file->getClientOriginalName()))
            $name .= Str::slug($file->getClientOriginalName(), '-', 'pt');
        else
            $name .= Str::uuid();

        $name .= ".{$file->getClientOriginalExtension()}";
        $path = "posts/{$name}";

        if (!Storage::has('posts'))
            Storage::makeDirectory('posts');

        $img = Image::make($file->getRealPath());
        $img->resize(1280, 720);
        $img->save(storage_path() . "/app/public/{$path}");

        $this->attributes['banner'] = $path;
    }

    public function getPublishedAttribute($value)
    {
        return $value == 1;
    }

    public function getBannerAttribute($value)
    {
        if (empty($value))
            return null;

        if (Storage::exists($value))
            return asset(Storage::url($value));

        return null;
    }

    /**
     * Scope a query to order most popular posts.
     */
    public function scopePopular(Builder $query)
    {
        $query->withCount('views')->orderBy('views_count', 'DESC');
    }

    /**
     * Scope a query to order most recent posts.
     */
    public function scopeRecent(Builder $query)
    {
        $query->orderBy('published_at', 'DESC');
    }

    /**
     * Scope a query to only show published posts.
     */
    public function scopePublished(Builder $query)
    {
        $query->where(fn($q) => $q
            ->where('published_at', '!=', null)
            ->orWhere('published_at', '<=', now())
        );
    }

    /**
     * Scope a query to return similar posts.
     */
    public function scopeSimilar(Builder $query, Post $post)
    {
        $similarTagIds = $post->tags->pluck('tag_id')->toArray();

        $query->where(fn($q) => $q
            ->where('category_id', $post->category_id)
            ->orWhereHas('tags', fn($w) => $w->whereIn('tag_id', $similarTagIds))
        );
    }

    /**
     * Scope a query to return it with some basic and important relations.
     */
    public function scopeWithBasic(Builder $query)
    {
        $query->with(['category', 'tags', 'author']);
    }
}
