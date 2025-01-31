<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();

            $table->string('payment_description');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->integer('total_installments'); // Cantidad de cuotas
            $table->decimal('installment_amount', 10, 2); // Monto por cuota
            $table->decimal('total_amount', 10, 2); // Total del pago
            $table->decimal('remaining_amount', 10, 2)->default(0); // Monto restante por pagar
            $table->date('payment_date');
            $table->boolean('is_paid')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
