<?php

namespace App\Models;

use App\Models\Project;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;

    protected $table = 'feedbacks';
    protected $fillable = ['id', 'submission_date', 'feedback_body', 'feedback_approved', 'rating','order_id', 'project_id', 'user_id'];

    public function project() {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function order() {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
