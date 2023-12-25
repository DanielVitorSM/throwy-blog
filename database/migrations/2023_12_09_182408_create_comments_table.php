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
            $table->string('id', 32)->primary();
            $table->string('user_id', 32);
            $table->string('post_id', 32);
            $table->string('comment_id', 32)->nullable();
            $table->string('content');
            $table->timestamps();

            $table
                ->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onUpdate("CASCADE")
                ->onDelete("CASCADE");

            $table
                ->foreign('post_id')
                ->references('id')
                ->on('posts')
                ->onUpdate("CASCADE")
                ->onDelete("CASCADE");
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
