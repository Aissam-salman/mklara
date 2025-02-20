<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class StripeWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $payload = $request->all();

        Log::info('Webhook Stripe reçu:', $payload);

        // Vérifier le type d'événement
        if ($payload['type'] === 'checkout.session.completed') {
            $session = $payload['data']['object'];

            // Récupérer l'utilisateur via metadata
            $user = User::where('id', $session['metadata']['user_id'] ?? null)->first();

            if ($user) {
                // Identifier le plan souscrit
                $plans = [
                    env('STRIPE_PREMIUM_MONTHLY') => 'premium_monthly',
                    env('STRIPE_PREMIUM_YEARLY') => 'premium_yearly',
                    env('STRIPE_ULTIMATE_MONTHLY') => 'ultimate_monthly',
                    env('STRIPE_ULTIMATE_YEARLY') => 'ultimate_yearly',
                ];

                $planId = $session['metadata']['plan_id'] ?? null;
                $user->update([
                    'current_plan' => $plans[$planId] ?? 'inconnu'
                ]);
            }
        }

        return response()->json(['status' => 'success']);
    }
}
