import Loader from "@/components/atoms/Loader";

export default function LoadingPage() {
    return (
        <main
            className="min-h-dvh bg-cover bg-center"
            style={{ backgroundImage: 'url("/img/loading-bg.jpg")' }}
        >
            <div className="p-6 w-full min-h-dvh backdrop-blur-sm backdrop-brightness-50 flex flex-col justify-center items-center">
                <img
                    className="h-56 sm:h-80 mx-auto"
                    src="/img/logo.webp"
                    alt="Logo"
                />
                <h1 className="text-5xl sm:text-7xl font-bold text-center text-white">
                    <span className="text-primary">
                        Calco {' '}
                    </span>
                    Vault
                    <Loader className="mt-8" />
                </h1>
            </div>

        </main>
    );
}
