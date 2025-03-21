import RegisterForm from "../../../components/organisms/RegisterForm"
import AllFoodsTable from "@/components/organisms/AllFoodsTable";

export default function AdminPage() {
    return (
        <section className="flex-1 max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-8">Página de admin</h1>

            <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg">

                <div className="w-full md:w-2/5 p-6">
                    <h2 className="text-xl font-medium mb-4">Registro de usuarios</h2>
                    <p className="text-gray-600">
                        Aquí puedes registrar nuevos usuarios para el sistema. Por favor, completa el formulario a
                        continuación con la información requerida.
                    </p>
                </div>

                <div className="w-full md:w-3/5 p-6 rounded-r-lg">
                    <RegisterForm/>
                </div>
            </div>

            <div className="flex flex-col gap-8 bg-white rounded-lg">
                <h2 className="text-xl font-medium mb-4"> Tabla de alimentos en la plataforma </h2>

                <AllFoodsTable />

            </div>
        </section>
    )
}
