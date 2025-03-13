import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RegisterPage from "../RegisterPage"

export default function AdminPage() {
    return (
        <section className="flex-1">
            <h1 className="text-2xl font-semibold mb-8"> Página de admin </h1>
            <Card className="w-fit mx-auto">
                <CardHeader>
                    <CardTitle>
                        Registro de usuarios
                    </CardTitle>
                    <CardDescription>
                        Aquí puedes registrar nuevos usuarios para el sistema. Por favor, completa el formulario a continuación con la información requerida.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <RegisterPage />
                </CardContent>
            </Card>
        </section>
    )
}
