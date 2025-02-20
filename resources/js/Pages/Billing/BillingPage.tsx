import { toast } from "@/hooks/use-toast.js";
import Authenticated from "@/Layouts/AuthenticatedLayout.js";
import { useForm } from "@inertiajs/react";
import Pricing from "@/Components/pricing";

interface BillingProps {
    subscription: any;
    subscribed: boolean;
}

export default function BillingPage({ subscription, subscribed }: BillingProps) {

    console.log('subscribed', subscribed);
    console.log('subscription', subscription);

    return (
        <Authenticated>
            <div className="p-6 mx-auto bg-white rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Gestion de l'abonnement</h2>
                {subscribed ? (
                    <div>
                        <p>Abonnement actif : {subscription.subscription?.stripe_price}</p>
                        <button className="mt-4 p-2 bg-red-500 text-white rounded" onClick={() => alert("Annulation non implémentée")}>Annuler</button>
                    </div>
                ) : (
                    <Pricing />
                )}
            </div>
        </Authenticated>
    );
}
