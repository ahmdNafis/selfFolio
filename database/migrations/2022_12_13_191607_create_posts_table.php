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
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');
            $table->date('published_date');
            $table->string('heading');
            $table->string('description')->nullable();
            $table->text('body');
            $table->boolean('published')->default(true);
            $table->string('image_url')->nullable();

            $table->unsignedInteger('blog_category_id')->nullable();
            $table->unsignedInteger('user_id')->nullable();
            $table->timestamps();
        });

        Schema::table('posts', function(Blueprint $table) {
            $table->foreign('blog_category_id')->references('id')->on('blog_categories');
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
        Schema::dropIfExists('posts');
    }
};
