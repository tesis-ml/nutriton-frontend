import SectionHeader from "@/components/molecules/SectionHeader";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import useAuthStore from "@/stores/auth.store";
import {User} from "lucide-react";

export default function ProfilePage() {
    const {user} = useAuthStore();


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
                            <User className="h-5 w-5"/>
                            <CardTitle>Información Personal</CardTitle>
                        </div>
                        <CardDescription>
                            <p className="font-medium tracking-widest"> Correo actual </p>
                            {user?.email}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Tabs defaultValue="food" className="w-full">
                            <TabsList className="w-full mb-8">
                                <TabsTrigger value="food"> Comidas editadas </TabsTrigger>
                                <TabsTrigger value="images">Imagenes creadas</TabsTrigger>
                                <TabsTrigger value="dishes">Platos editados</TabsTrigger>
                            </TabsList>

                            <TabsContent value="food">
                                <p className={"text-9xl text-center"}>{user?._count.foodsEdited}</p>
                            </TabsContent>

                            <TabsContent value="images">
                                <p className={"text-9xl text-center"}>{user?._count.imagesCreated}</p>
                            </TabsContent>

                            <TabsContent value="dishes">
                                <p className={"text-9xl text-center"}>{user?._count.dishesEdited}</p>
                            </TabsContent>
                        </Tabs>

                        <p className={"mt-12 tracking-widest text-sm text-muted-foreground font-medium text-center"}>
                            ¡Sigue así! Estás a 6 platos de alcanzar al top 3 contribuyentes en la Nutriton.
                        </p>

                    </CardContent>
                </Card>

                {/*
               <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5"/>
                            <CardTitle>Seguridad</CardTitle>
                        </div>
                        <CardDescription>
                            Actualiza tu contraseña
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        <UpdatePasswordForm user={user as User}/>

                    </CardContent>
                </Card>
                */}
            </div>
        </div>
    );
}