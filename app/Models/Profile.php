<?php

namespace App\Models;

use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    protected $table = 'profiles';
    protected $fillable = ['profiel_description', 'avatar_link', 'social_media_links', 'about_enabled', 'user_id'];

    protected $casts = [
        'social_media_links' => 'array',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
