<?php

namespace App\Models;

use App\Models\BlogCategory;
use App\Models\Tag;
use App\Models\Comment;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'posts';
    protected $fillable = ['id', 'published_date', 'heading', 'description', 'body', 'published', 'image_url', 'blog_category_id', 'user_id'];

    public function category() {
        return $this->belongsTo(BlogCategory::class, 'blog_category_id');
    }

    public function comments() {
        return $this->hasMany(Comment::class, 'post_id');
    }

    public function tags() {
        return $this->belongsToMany(Tag::class, 'posts_tags', 'post_id', 'tag_id');
    }

    //public function author() {
//        return $this->belongsTo(User::class, 'user_id');
  //  }

    public function author() {
        return $this->morphOne(User::class, 'identifiable');
    }
}
