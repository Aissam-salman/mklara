import {useState} from "react";

const PricingDemo = () => {
    const [isChecked, setIsChecked] = useState(true);

    const toggleSwitch = () => {
        setIsChecked((prev) => !prev);
    };

    return (
        <section id="pricing">
            <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-14 md:px-8">
                <div className="mx-auto max-w-5xl text-center">
                    <h4 className="text-xl font-bold tracking-tight text-black dark:text-white">
                        Tarifs
                    </h4>
                    <h2
                    className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">Une
                    tarification simple pour tous.
                    </h2>
                    <p
                    className="mt-6 text-xl leading-8 text-black/80 dark:text-white">Choisissez <strong>une
                    formule
                    abordable</strong>, dotée des meilleures fonctionnalités pour engager votre audience,
                    fidéliser vos
                    clients et stimuler vos ventes.
                    </p>
                </div>
                <div className="flex w-full items-center justify-center space-x-2">
                    <button
                        type="button"
                        role="switch"
                        aria-checked={isChecked}
                        data-state={isChecked ? "checked" : "unchecked"}
                        value={isChecked ? "on" : "off"}
                        onClick={toggleSwitch}
                        className={`peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors
                                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
                                            disabled:cursor-not-allowed disabled:opacity-50
                                            ${isChecked ? "bg-primary" : "bg-input"}`}
                        id="interval"
                    >
                                <span
                                    data-state={isChecked ? "checked" : "unchecked"}
                                    className={`pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform
                                    ${isChecked ? "translate-x-4" : "translate-x-0"}`}
                                ></span>
                    </button>
                    <span>Annuel</span>
                    <span
                        className="inline-block whitespace-nowrap rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold uppercase leading-5 tracking-wide text-white dark:bg-white dark:text-black">1 MOIS GRATUIT ✨</span>
                </div>

                <div
                    className="mx-auto grid w-full justify-center sm:grid-cols-2 lg:grid-cols-3 flex-col gap-4">
                    <div
                        className="relative flex max-w-[400px] flex-col gap-8 rounded-2xl border p-4 text-black dark:text-white overflow-hidden">
                        <div className="flex items-center">
                            <div className="ml-4">
                                <h2 className="text-base font-semibold leading-7">Free</h2>
                                <p className="h-12 text-sm leading-5 text-black/70 dark:text-white">
                                    Tu viens à peine de te lancer. 🙈
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-1">
                                    <span className="text-4xl font-bold text-black dark:text-white">
                                        €0
                                    </span>
                        </div>

                        <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-500/30 to-neutral-200/0"/>
                        <ul className="flex flex-col gap-2 font-normal">
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="flex">Accès aux groupes de messages</span>
                            </li>
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="flex">Accès à la Newsletter hebdo</span>
                            </li>
                        </ul>
                    </div>
                    <div
                        className="relative flex max-w-[400px] flex-col gap-8 rounded-2xl p-4 text-black dark:text-white overflow-hidden border-2 border-[var(--color-one)] dark:border-[var(--color-one)]">
                        <div className="flex items-center">
                            <div className="ml-4">
                                <h2 className="text-base font-semibold leading-7">
                                    Premium
                                </h2>
                                <p className="h-12 text-sm leading-5 text-black/70 dark:text-white">
                                    Tu as une idée et tu veux avancer 🌴
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-1">
                                    <span className="text-4xl font-bold text-black dark:text-white">
                                        €{isChecked ? "559" : "45"}
                                        <span className="text-xs">
                                            / {isChecked ? "an" : "mois"}
                                        </span>
                                    </span>
                        </div>
                        <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-500/30 to-neutral-200/0"/>
                        <ul className="flex flex-col gap-2 font-normal">
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd">

                                    </path>
                                </svg>
                                <span className="flex">
                                            Full Access Minkeydvisor
                                        </span>
                            </li>
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="flex">
                                             Accès à la Minkeyline
                                        </span>
                            </li>
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="flex">
                                            6 rendez-vous de suivi
                                        </span>
                            </li>
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="flex">
                                            1 Mise en avant médias Minkey (10k followers cumulés)
                                        </span>
                            </li>
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="flex">
                                            Accès à la Newsletter hebdo
                                        </span>
                            </li>
                        </ul>
                    </div>
                    <div
                        className="relative flex max-w-[400px] flex-col gap-8 rounded-2xl border p-4 text-black dark:text-white overflow-hidden">
                        <div className="flex items-center">
                            <div className="ml-4">
                                <h2 className="text-base font-semibold leading-7">
                                    Ultimate
                                </h2>
                                <p className="h-12 text-sm leading-5 text-black/70 dark:text-white">
                                    Tu veux passer à l'étape suivante 🚀
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-1">
                                    <span className="text-4xl font-bold text-black dark:text-white">
                                        €{isChecked ? "838" : "65"}
                                        <span className="text-xs">
                                            / {isChecked ? "an" : "mois"}
                                        </span>
                                    </span>
                        </div>
                        <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-500/30 to-neutral-200/0"/>
                        <ul className="flex flex-col gap-2 font-normal">
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="flex">
                                            Full Access Minkeydvisor
                                        </span>
                            </li>
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="flex">
                                            Accès à la Minkeyline
                                        </span>
                            </li>
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="flex">
                                            12 rendez-vous personnalisés
                                        </span>
                            </li>
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="flex">
                                            Mise en relation pro et suivi
                                        </span>
                            </li>
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="flex">
                                            3 Mises en avant médias Minkey (10k followers cumulés)
                                        </span>
                            </li>
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="flex">
                                            Ta place pour pitcher à la Paris Startup Night devant des investisseurs
                                        </span>
                            </li>
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="flex">
                                            Mise en relation avec partenaires financements
                                        </span>
                            </li>
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="flex">
                                           Accès à vie
                                        </span>
                            </li>
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="flex">
                                           Agenda Minkey Offert
                                        </span>
                            </li>
                            <li className="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white">
                                    <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="flex">
                                            Accès à la Newsletter hebdo
                                        </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default PricingDemo;
