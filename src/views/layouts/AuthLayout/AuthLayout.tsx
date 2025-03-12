import AppHeader from "@/components/atoms/AppHeader";
import { toasterConfig } from "@/config/toaster";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function AuthLayout() {
    return (
        <main className="min-h-dvh w-full flex">
            <Toaster {...toasterConfig} />
            <div className="relative flex-1 hidden lg:block">
                <img
                    src="/img/auth-bg.jpg"
                    alt="Auth"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/60 to-black/90 "></div>
            </div>
            <div className="flex flex-col items-center w-full lg:w-2/5 min-h-dvh">
                <div className="flex-1 flex flex-col justify-center items-center w-full max-w-md px-4 pt-8">
                    <AppHeader />
                    <Outlet />
                </div>
            </div>
        </main>
    );
}
