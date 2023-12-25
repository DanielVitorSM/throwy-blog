<?php

namespace App\Models;

use App\Override\Model;

class PostTag extends Model
{
    public $timestamps = false;
    
    public $table = 'posts_tags';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'post_id',
        'tag_id'
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

    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class, 'tag_id');
    }
}
