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
        Schema::table('group_members', function (Blueprint $table) {
            if (Schema::hasColumn('group_members', 'users')) {
                $table->dropColumn('users');
            }
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('group_members', function (Blueprint $table) {
            // Supprime la colonne `user_id`
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');

            // Recrée la colonne `users` (optionnel, pour rollback)
            $table->foreignId('users')->constrained()->cascadeOnDelete();
        });
        Schema::table('group_members', function (Blueprint $table) {
            $table->dropForeign(['users']);
            $table->dropColumn('users');
        });
    }
};
