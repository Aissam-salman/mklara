import {Link} from "@inertiajs/react";

const ButtonAnimate = ({goto, text}:{goto: string, text: string}) => {
    return (
        <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md
                    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                    disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow
                    hover:bg-primary/90 h-9 px-4 py-2 group relative w-full gap-2 overflow-hidden text-lg
                    font-semibold tracking-tighter transform-gpu ring-offset-current transition-all duration-300
                    ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
        >
                    <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu
                    bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96 dark:bg-black"
                    ></span>
            <Link href={route(goto)}>
                {text}
            </Link>
        </button>
    )
}

export default ButtonAnimate;
