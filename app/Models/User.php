<?php

namespace App\Models;

use App\Models\Post;
use App\Models\Profile;
use App\Models\Role;
use App\Models\Comment;
use App\Models\User;
use App\Models\Order;
use App\Models\Feedback;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'first_name',
        'last_name',
        'address',
        'user_enabled', 
        'role_id',
        'identifiable_id', 
        'identifiable_type',
        'email',
        'password',
        'city',
        'country',
        'cellphone'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function identifiable() {
        return $this->morphTo(__FUNCTION__, 'identifiable_type', 'identifiable_id');
    }

    public function profile() {
        return $this->hasOne(Profile::class, 'user_id');
    }

    public function role() {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function comments() {
        return $this->hasMany(Comment::class, 'user_id');
    }

    public function posts() {
        return $this->hasMany(Post::class, 'user_id');
    }

    public function orders() {
        return $this->hasMany(Order::class, 'user_id');
    }

    public function feedbacks() {
        return $this->hasMany(Feedback::class, 'user_id');
    }
}
