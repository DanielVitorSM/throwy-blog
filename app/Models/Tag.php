<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Override\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class Tag extends Model
{
    use HasFactory;

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

        static::creating(function (Tag $tag) {
            if (!empty($tag->slug))
                return;

            $unique = false;
            $iterator = 0;

            while ($unique === false) {
                $tag->slug = Str::slug($tag->name, '-', 'pt');

                if ($iterator > 0)
                    $tag->slug .= "-{$iterator}";

                $unique = !Tag::query()->where('slug', $tag->slug)->exists();
                $iterator += 1;
            }
        });
    }


    public function posts()
    {
        return $this->hasManyThrough(Post::class, PostTag::class, 'tag_id', 'id', 'id', 'post_id');
    }
    
    /**
     * Scope a query to sort by popular tags..
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
