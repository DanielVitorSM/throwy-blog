<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Override\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'slug',
        'name',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Category $category) {
            if (!empty($category->slug))
                return;

            $unique = false;
            $iterator = 0;

            while ($unique === false) {
                $category->slug = Str::slug($category->name, '-', 'pt');

                if ($iterator > 0)
                    $category->slug .= "-{$iterator}";

                $unique = !Category::query()->where('slug', $category->slug)->exists();
                $iterator += 1;
            }
        });
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'category_id');
    }

    /**
     * Scope a query to order by popular categories.
     */
    public function scopePopular(Builder $query): void
    {
        $query->withCount('posts')->orderBy('posts_count', 'DESC');
    }

    /**
     * Scope a query to return only really needed fields.
     */
    public function scopeForSelect(Builder $query): void
    {
        $query->orderBy('name')->select(['id', 'name']);
    }
}
