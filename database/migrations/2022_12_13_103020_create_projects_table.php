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
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->string('project_title');
            $table->text('project_description')->nullable();
            $table->string('project_link')->nullable();
            $table->string('image_url')->nullable();

            $table->unsignedInteger('project_category_id')->nullable();
            $table->timestamps();
        });

        Schema::table('projects', function(Blueprint $table) {
            $table->foreign('project_category_id')->references('id')->on('project_categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
};
