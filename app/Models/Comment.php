<?php

namespace App\Models;

use App\Models\Post;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $table = 'comments';
    protected $fillable = ['id', 'posted_date', 'subject', 'comment_body', 'posted', 'post_id', 'user_id'];

    public function post() {
        return $this->belongsTo(Post::class, 'post_id', 'id');
    }

    public function commentator() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function commentable() {
        return $this->morphOne(User::class, 'identifiable');
    }
}
