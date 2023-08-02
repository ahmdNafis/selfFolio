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
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->date('initiate_date');
            $table->date('completion_date')->nullable();
            $table->decimal('total_price', 9, 2);
            $table->integer('total_quantity');
            $table->string('tracking_id');
            $table->enum('tracking_stage', ['pending', 'accepted', 'under discussion', 'processing', 'delivered', 'declined'])->default('pending');
            $table->unsignedInteger('user_id')->nullable();
            $table->timestamps();
        });

        Schema::table('orders', function(Blueprint $table) {
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
        Schema::dropIfExists('orders');
    }
};
