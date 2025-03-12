import AppHeader from "@/components/atoms/AppHeader";
import { Button } from "@/components/ui/button";
import { ErrorResponse, Link, useRouteError } from "react-router-dom";


export default function ErrorPage() {
    const { status, statusText, ...error } = useRouteError() as ErrorResponse & { error: { message: string } };
    return (
        <div className="h-dvh flex flex-col items-center justify-center text-center gap-8 p-4">
            <div>
                <AppHeader />

                <p className="text-7xl sm:text-9xl mb-4 bg-gradient-to-br font-bold text-transparent bg-clip-text from-primary to-emerald-800">
                    {status}
                </p>
                <p className="text-3xl tracking-[0.15em] sm:tracking-[0.3em] font-medium">
                    {statusText}
                </p>
            </div>
            <div>
                <p className="text-sm mb-4">
                    {error.error.message}
                </p>
                <Link to="/">
                    <Button>
                        Volver al inicio
                    </Button>
                </Link>
            </div>
        </div>
    )
}
