import {BellIcon, CalendarIcon, FileTextIcon, GlobeIcon, InputIcon,} from "@radix-ui/react-icons";
import {BentoCard, BentoGrid} from "@/Components/ui/bento-grid";

const features = [
    {
        Icon: FileTextIcon,
        name: "Manque de conseils d'experts",
        description: "Les entrepreneurs manquent de soutien pour prendre des décisions stratégiques.",
        href: "/",
        cta: "",
        background: <img src={"/images/pb3.jpg"} className="absolute -right-20 -top-20 opacity-60" alt={''}/>,
        className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
        Icon: InputIcon,
        name: " Trouver un réseau d'entrepreneurs solide",
        description: "   Les entrepreneurs ont du mal à se connecter avec d'autres professionnels pertinents.",
        href: "/",
        cta: "",
        background: <img src={"/images/pb1.jpg"} className="absolute -right-20 -top-20 opacity-60" alt={''}/>,
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
        Icon: GlobeIcon,
        name: "Accès à des prestataires fiables",
        description: "Difficile de trouver des prestataires compétents pour chaque besoin.",
        href: "/",
        cta: "",
        background: <img src={"/images/pb2.jpg"} className="absolute opacity-40" alt={''}/>,
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
        Icon: CalendarIcon,
        name: "Se former à l'entrepreneuriat",
        description: "Accéder à des ressources de qualité pour se former à entreprendre est un challenge.",
        href: "/",
        cta: "",
        background: <img src={"/images/pb4.jpg"} className="absolute -right-20 -top-20 opacity-40" alt={''}/>,
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
        Icon: BellIcon,
        name: "Manque de visibilité professionnelle",
        description:
            "Les entrepreneurs ont du mal à se faire connaître.",
        href: "/",
        cta: "",
        background: <img src={"/images/pb5.jpg"} className="absolute -right-20 -top-20 opacity-60" alt={''}/>,
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
];

export function BentoSolved() {
    return (
        <BentoGrid className="lg:grid-rows-3">
            {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
            ))}
        </BentoGrid>
    );
}
