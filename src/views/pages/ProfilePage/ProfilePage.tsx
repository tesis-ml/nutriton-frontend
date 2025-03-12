import SectionHeader from "@/components/molecules/SectionHeader";
import UpdatePasswordForm from "@/components/organisms/UpdatePasswordForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useAuthStore from "@/stores/auth.store";
import { ShieldCheck, User } from "lucide-react";

export default function ProfilePage() {
    const { user } = useAuthStore();

    return (
        <div className="space-y-6">

            <SectionHeader
                title="Perfil"
                subtitle="Gestiona tu información personal y credenciales"
            />

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-12 md:px-8">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            <CardTitle>Información Personal</CardTitle>
                        </div>
                        <CardDescription>
                            <p className="font-medium tracking-widest"> Correo actual  </p>
                            {user?.email}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>


                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5" />
                            <CardTitle>Seguridad</CardTitle>
                        </div>
                        <CardDescription>
                            Actualiza tu contraseña
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        <UpdatePasswordForm user={user as User} />

                    </CardContent>
                </Card>
            </div>
        </div>
    );
}