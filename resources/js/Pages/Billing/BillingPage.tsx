import { toast } from "@/hooks/use-toast.js";
import Authenticated from "@/Layouts/AuthenticatedLayout.js";
import { useForm } from "@inertiajs/react";
import Pricing from "@/Components/pricing";

interface BillingProps {
    subscription: any;
    current_plan: string;
}

export default function BillingPage({ subscription, current_plan }: BillingProps) {

    console.log('current_plan', current_plan);
    console.log('subscription', subscription);

    return (
        <Authenticated>
            <div className="p-6 mx-auto bg-white rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Gestion de l'abonnement</h2>
                {current_plan ? (
                    <div>
                        <p>Abonnement actif : {current_plan}</p>
                    </div>
                ) : (
                    <Pricing />
                )}
            </div>
        </Authenticated>
    );
}
