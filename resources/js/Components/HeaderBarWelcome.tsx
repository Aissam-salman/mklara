import LogoSVG from "@/Components/logo-svg";
import {Link} from "@inertiajs/react";
import {PageProps, User} from "@/types";
import {useIsMobile} from "@/hooks/use-mobile";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/Components/ui/dropdown-menu";
import {MenuIcon} from "lucide-react";
interface HeaderBarProps {
    auth: {
        user?: User | null;
    };
}
const HeaderBarWelcome = ({auth}: HeaderBarProps) => {

    const isMobile = useIsMobile();

    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3">
            <nav className="w-full mx-auto flex flex-wrap basis-full items-center justify-between">
                <Link href={"/"} className=" flex-none text-xl font-semibold focus:outline-none focus:opacity-80">
                    <LogoSVG fillColor={"#1A3927"} height={"50"} width={"50"} />
                </Link>
                {isMobile ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger> <MenuIcon/></DropdownMenuTrigger>
                        <DropdownMenuContent>

                            {auth.user ? (
                                <>
                                    <DropdownMenuItem>
                                        <Link
                                            href={route('dashboard')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <>
                                    <DropdownMenuItem>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </DropdownMenuItem>
                                </>
                                )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="sm:flex items-center gap-3">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                )}

            </nav>
        </header>
    )
}

export default HeaderBarWelcome;
