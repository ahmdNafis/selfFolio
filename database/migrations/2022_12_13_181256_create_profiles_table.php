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
        Schema::create('profiles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('profile_description')->nullable();
            $table->string('avatar_link')->nullable();
            $table->json('social_media_links')->nullable();
            $table->boolean('about_enabled')->default(false);

            $table->unsignedInteger('user_id')->nullable();
            $table->timestamps();
        });

        Schema::table('profiles', function(Blueprint $table) {
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
        Schema::dropIfExists('profiles');
    }
};
