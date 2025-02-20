<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function subscribe(Request $request)
    {
        $user = Auth::user();

        Log::info("Try to create from subscribe method");
        dd($request->plan);

        $plans = [
            'premium_monthly' => env('STRIPE_PREMIUM_MONTHLY'),
            'premium_yearly' => env('STRIPE_PREMIUM_YEARLY'),
            'ultimate_monthly' => env('STRIPE_ULTIMATE_MONTHLY'),
            'ultimate_yearly' => env('STRIPE_ULTIMATE_YEARLY'),
        ];

        if (!isset($plans[$request->plan])) {
            return Inertia::render('Billing/BillingPage', [
                'error' => 'Plan invalide'
            ]);
        }

        // Gestion des paiements uniques pour les plans annuels
        if (str_contains($request->plan, 'yearly')) {
            $checkoutUrl = $user->checkout([$plans[$request->plan] => 1], [
                'success_url' => route('billing'),
                'cancel_url' => route('billing'),
            ])->asStripeCheckoutSession()->url;

            return Inertia::location($checkoutUrl);
        }

        // Gestion des abonnements pour les plans mensuels
        $checkoutUrl = $user->newSubscription('default', $plans[$request->plan])
            ->checkout([
                'success_url' => route('billing'),
                'cancel_url' => route('billing'),
            ])->asStripeCheckoutSession()->url;

        return Inertia::location($checkoutUrl);
    }

    public function billing()
    {
        $user = Auth::user();

        return Inertia::render('Billing/BillingPage', [
            'subscribed' => $user->subscribed('default'),
            'subscription' => $user->subscription('default'),
        ]);
    }
}
