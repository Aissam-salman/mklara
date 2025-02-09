import {cn} from "@/lib/utils";
import {Marquee} from "@/Components/ui/marquee";

const reviews = [
    {
        name: "Loana",
        username: "@Lookaroun CEO",
        body: "J'aurais bien aimé connaitre Minkey quand j'ai commencé mon expérience entreprineuriale",
        img: "/images/lookaroun.png",
    },
    {
        name: "Cheyenne & Camille",
        username: "@Studylance CEO",
        body: "Minkey, c'est la boussole dont on ne pourrait plus se passer pour trouver notre chemin dans la jungle" +
            " entrepreneuriale",
        img: "/images/studylance.png",
    },
    {
        name: "Laurianne & Lionel",
        username: "@Anakiara CEO",
        body: "Enfin un endroit où trouver les vraies informations mises à jour pour entreprendre en 2023",
        img: "/images/ANAKIARA.png",
    },
];

const firstRow = reviews;

const ReviewCard = ({
                        img,
                        name,
                        username,
                        body,
                    }: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className=" object-center" width="62" height="62" alt="" src={img}/>
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};

export function Testimonial() {
    return (
        <div
            className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div
                className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
    );
}
