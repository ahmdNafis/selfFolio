<?php

namespace App\Models;

use App\Models\Project;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectCategory extends Model
{
    use HasFactory;

    protected $table = 'project_categories';
    protected $fillable = ['project_category_title', 'project_category_description', 'project_category_enabled'];

    public function projects() {
        return $this->hasMany(Project::class, 'project_category_id');
    }
}
