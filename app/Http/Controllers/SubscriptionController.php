<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'plan' => 'required|string'
        ]);

        $user = Auth::user();

        $plans = [
            'premium_monthly' => env('STRIPE_PREMIUM_MONTHLY'),
            'premium_yearly' => env('STRIPE_PREMIUM_YEARLY'),
            'ultimate_monthly' => env('STRIPE_ULTIMATE_MONTHLY'),
            'ultimate_yearly' => env('STRIPE_ULTIMATE_YEARLY'),
        ];

        // Vérifier si le plan demandé est valide
        if (!isset($plans[$validated['plan']])) {
            return redirect()->route('billing')->with('error', 'Plan invalide.');
        }

        // Vérifier si l'utilisateur a déjà un abonnement actif
        if ($user->subscribed('default')) {
            return redirect()->route('billing')->with('error', 'Vous avez déjà un abonnement actif.');
        }

        try {
            // Gestion des paiements uniques pour les plans annuels
            if (str_contains($validated['plan'], 'yearly')) {
                $checkoutUrl = $user->checkout([$plans[$validated['plan']] => 1], [
                    'success_url' => route('billing'),
                    'cancel_url' => route('billing'),
                    'metadata' => [
                        'user_id' => $user->id,
                        'plan_id' => $plans[$validated['plan']]
                    ]
                ])->asStripeCheckoutSession()->url;

                return Inertia::location($checkoutUrl);
            }

            // Gestion des abonnements pour les plans mensuels
            $checkoutUrl = $user->newSubscription('default', $plans[$validated['plan']])
                ->checkout([
                    'success_url' => route('billing'),
                    'cancel_url' => route('billing'),
                    'metadata' => [
                        'user_id' => $user->id,
                        'plan_id' => $plans[$validated['plan']]
                    ]
                ])->asStripeCheckoutSession()->url;

            return Inertia::location($checkoutUrl);

        } catch (\Exception $e) {
            return redirect()->route('billing')->with('error', 'Une erreur est survenue : ' . $e->getMessage());
        }
    }


    public function billing()
    {
        $user = Auth::user();

        return Inertia::render('Billing/BillingPage', [
            'subscription' => $user->subscription('default'),
            'current_plan' => $user->current_plan
        ]);
    }
}
