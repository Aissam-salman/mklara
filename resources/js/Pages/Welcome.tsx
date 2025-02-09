import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import HeaderBarWelcome from "@/Components/HeaderBarWelcome";
import {RainbowButton} from "@/Components/ui/rainbow-button";
import ShineBorder from "@/Components/ui/shine-border";
import Safari from "@/Components/ui/safari";
import {BentoSolved} from "@/Components/BentoSolved";
import Pricing from "@/Components/pricing";
import {Testimonial} from "@/Components/Testimonial";
import Footer from "@/Components/Footer";

export default function Welcome({
    auth,
}: PageProps) {


    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gradient-to-br from-gray-200 to-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center selection:bg-[#1A3927] selection:text-white">
                    <div className="relative w-full px-6 lg:max-w-7xl">
                        <HeaderBarWelcome auth={auth}  />
                        <main className="mx-auto overflow-hidden">
                            <section className="flex flex-col items-center justify-center pb-16">
                                <h1 className="bg-gradient-to-br from-green-950 via-green-800 to-green-200
                                    text-transparent bg-clip-text font-medium py-6 text-3xl sm:text-4xl md:text-5xl
                            lg:text-6xl"
                                >
                                    Découvrez un <span className={"font-bold"}>espace unique</span>
                                    <br/>pour apprendre, collaborer et explorer.
                                </h1>
                                <h2 className={"mb-12 text-lg text-gray-600 md:text-xl text-balance"}>
                                    {/*faire list point*/}
                                    Avec Minkey, accédez à des cours interactifs, connectez-vous à la
                                    communauté et réservez des experts
                                    en toute simplicité.
                                </h2>

                                <RainbowButton>
                                    {auth.user ? (
                                    <Link href={route("dashboard")}>Mon espace Minkey</Link>

                                    ): (
                                        <Link href={route("register")}>Rejoindre Minkey</Link>
                                    )}
                                </RainbowButton>
                                {/*    app image */}
                                <div className={"h-16"}></div>
                                <ShineBorder
                                    borderWidth={2}
                                    className="relative flex w-[70%] flex-col items-center justify-center overflow-hidden rounded-lg
                     bg-background md:shadow-xl"
                                    color={["#245037", "#5a9974", "#000"]}
                                >
                                    <Safari url="minkey.fr" imageSrc={"/images/home.png"} className="size-full"/>
                                </ShineBorder>
                            </section>
                            <section id="resolving" className={"py-20"}>
                                <BentoSolved/>
                            </section>
                            <Pricing/>
                            <section id="testemonial">
                                <Testimonial/>
                            </section>
                        </main>
                        <Footer auth={auth} />

                    </div>
                </div>
            </div>
        </>
    );
}
