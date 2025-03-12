import { Button } from "@/components/ui/button";
import { supabase } from "@/config/supabase/SupabaseClient.class";
import { toast } from "sonner";

type Props = {
    label: string;
}

export default function GoogleButton({ label }: Props) {

    const useOAuth = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' })

        if (error) {
            console.warn(error);
            toast.error('Error al iniciar sesión con Google');
            return;
        }

        console.log(data);

    }

    return (
        <>
            <Button
                onClick={useOAuth}
                type="button"
                variant="outline"
                className="w-full flex gap-2 items-center justify-center"
            >
                <img src="/google.svg" className="h-7" />
                {label}
            </Button>
        </>
    )
}
