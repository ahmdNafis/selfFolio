<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $table = 'messages';
    protected $fillable = ['submission_date','message_title', 'name', 'email', 'cellphone', 'message_body'];

}
