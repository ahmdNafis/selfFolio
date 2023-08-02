<?php

namespace App\Models;

use App\Models\Post;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogCategory extends Model
{
    use HasFactory;

    protected $table = 'blog_categories';
    protected $fillable = ['blog_category_title', 'blog_category_description', 'blog_cateogry_activity'];

    public function posts() {
        return $this->hasMany(Post::class, 'blog_category_id');
    }
}
