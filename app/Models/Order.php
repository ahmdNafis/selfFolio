<?php

namespace App\Models;

use App\Models\User;
use App\Models\Project;
use App\Models\Feedback;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $fillable = ['id', 'initiate_date', 'completion_date', 'total_price', 'total_quantity', 'tracking_id', 'tracking_stage', 'user_id', 'paid', 'payment_date'];

    public function customer() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function projects() {
        return $this->belongsToMany(Project::class, 'orders_projects', 'order_id', 'project_id')->withPivot('quantity');
    }

    public function orders() {
        return $this->hasMany(Feedback::class, 'order_id');
    }
}
