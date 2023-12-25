<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->string('id', 32)->primary();
            $table->string('author_id', 32);
            $table->string('category_id', 32);
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('caption');
            $table->string('banner')->nullable();
            $table->text('content');
            $table->boolean('published')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table
                ->foreign('author_id')
                ->references('id')
                ->on('users')
                ->onUpdate("CASCADE")
                ->onDelete("CASCADE");

            $table
                ->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onUpdate("CASCADE")
                ->onDelete("CASCADE");
        });

        Schema::create('posts_tags', function (Blueprint $table) {
            $table->string('post_id', 32);
            $table->string('tag_id', 32);

            $table
                ->foreign('post_id')
                ->references('id')
                ->on('posts')
                ->onUpdate("CASCADE")
                ->onDelete("CASCADE");

            $table
                ->foreign('tag_id')
                ->references('id')
                ->on('tags')
                ->onUpdate("CASCADE")
                ->onDelete("CASCADE");
        });

        Schema::create('posts_views', function (Blueprint $table) {
            $table->string('id', 32)->primary();
            $table->string('post_id', 32);
            $table->string('user_id', 32)->nullable();
            $table->string('agent')->nullable();
            $table->ipAddress('ip')->nullable();
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));

            $table
                ->foreign('post_id')
                ->references('id')
                ->on('posts')
                ->onUpdate("CASCADE")
                ->onDelete("CASCADE");

            $table
                ->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onUpdate("CASCADE")
                ->onDelete("SET NULL");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts_views');
        Schema::dropIfExists('posts_tags');
        Schema::dropIfExists('posts');
    }
};
