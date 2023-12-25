<?php

namespace App\Models;

use App\Override\Model;

class PostView extends Model
{
    const UPDATED_AT = null;

    public $table = 'posts_views';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'post_id',  
        'user_id',
        'ip',
        'agent'
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
}
