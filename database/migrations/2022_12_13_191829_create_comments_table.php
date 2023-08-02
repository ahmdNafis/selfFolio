<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->increments('id');
            $table->date('posted_date');
            $table->string('subject');
            $table->text('comment_body');
            $table->boolean('posted')->default(true);

            $table->unsignedInteger('post_id')->nullable();
            $table->unsignedInteger('user_id')->nullable();

            $table->timestamps();
        });

        Schema::table('comments', function(Blueprint $table) {
            $table->foreign('post_id')->references('id')->on('posts');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
};
