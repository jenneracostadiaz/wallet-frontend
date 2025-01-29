<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->enum('type', ['general', 'cash', 'bank', 'credit_card', 'saving_account', 'other'])->default('general');
            $table->string('color')->nullable();
            $table->string('icon')->nullable();
            $table->boolean('visibility')->default(true);
            $table->integer('order_column')->default(0);
            $table->string('slug')->unique();
            $table->decimal('starting_balance', 10, 2)->default(0);
            $table->decimal('current_balance', 10, 2)->default(0);

            $table->foreignId('currency_id')->constrained('currencies')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
