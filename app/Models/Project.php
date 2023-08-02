<?php

namespace App\Models;

use App\Models\ProjectCategory;
use App\Models\User;
use App\Models\Project;
use App\Models\Feedback;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $table = 'projects';
    protected $fillable = ['project_title', 'project_description', 'project_link', 'image_url', 'project_category_id', 'user_id', 'project_published', 'price'];

    public function project_category() {
        return $this->belongsTo(ProjectCategory::class, 'project_category_id');
    }

    //user relation
    public function created_by() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function orders() {
        return $this->belongsToMany(Order::class, 'orders_projects', 'project_id', 'order_id')->withPivot('quantity');
    }

    public function feedbacks() {
        return $this->hasMany(Feedback::class, 'project_id');
    }
}
