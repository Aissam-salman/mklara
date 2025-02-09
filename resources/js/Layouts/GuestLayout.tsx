import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import LogoSVG from "@/Components/logo-svg";
import {cn} from "@/lib/utils";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-slate-300 px-2  pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div>
                <Link href="/" className={cn("dark:fill-white fill-black")}>
                   <LogoSVG width={"100"} height={"100"}  />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-slate-400 px-6 py-4 rounded-sm shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
