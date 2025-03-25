import RegisterForm from "../../../components/organisms/RegisterForm"
import AllFoodsTable from "@/components/organisms/AllFoodsTable";
import {ColumnDef} from "@tanstack/react-table";
import {useAllFood} from "@/hooks/query/useAllFood.ts";

const columns: ColumnDef<Food> [] = [
    {
        accessorKey: "name",
        header: "Alimento"
    },
    {
        accessorKey: "hasMeat",
        header: "hasMeat"
    },
    {
        accessorKey: "hasEggs",
        header: "hasEggs"
    },
    {
        accessorKey: "hasMilk",
        header: "hasMilk"
    },
    {
        accessorKey: "hasHoney",
        header: "hasHoney"
    },
    {
        accessorKey: "hasGluten",
        header: "hasGluten"
    },
    {
        accessorKey: "isOvoLactoVegetarian",
        header: "isOvoLactoVegetarian"
    },
    {
        accessorKey: "isLactoVegetarian",
        header: "isLactoVegetarian"
    },
    {
        accessorKey: "isOvoVegetarian",
        header: "isOvoVegetarian"
    },
    {
        accessorKey: "isVegan",
        header: "isVegan"
    },
    {
        accessorKey: "isGlutenFree",
        header: "isGlutenFree"
    },
    {
        accessorKey: "canBeADish",
        header: "canBeADish"
    },
    {
        accessorKey: "editedBy",
        header: "editedBy",
        cell: ({row}) => {
            const value: { firstName: string; lastName: string } | null = row.getValue("editedBy");
            return (
                <p>
                    {value?.firstName ?? ""} {value?.lastName ?? ""}
                </p>
            );
        }
    },
    // {
    //     accessorKey: "email",
    //     header: ({column}) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //             >
    //                 Email
    //                 <ArrowUpDown className="ml-2 h-4 w-4"/>
    //             </Button>
    //         )
    //     },
    // },
    // {
    //     accessorKey: "amount",
    //     header: () => <div className="text-right">Amount</div>,
    //     cell: ({row}) => {
    //         const amount = parseFloat(row.getValue("amount"))
    //         const formatted = new Intl.NumberFormat("en-US", {
    //             style: "currency",
    //             currency: "USD",
    //         }).format(amount)
    //
    //         return <div className="text-right font-medium">{formatted}</div>
    //     },
    // },
]

export default function AdminPage() {

    const {data, isLoading} = useAllFood()

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

                {
                    isLoading && data
                        ? (
                            <div>
                                Cargando...
                            </div>
                        )
                        : (
                            <AllFoodsTable
                                columns={columns}
                                data={data?.data.data ?? []}
                            />
                        )
                }

            </div>
        </section>
    )
}
