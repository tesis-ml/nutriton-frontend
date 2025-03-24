import RegisterForm from "../../../components/organisms/RegisterForm"
import AllFoodsTable from "@/components/organisms/AllFoodsTable";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDown} from "lucide-react";

const columns: ColumnDef<{
    id: string
    amount: number
    status: string
    email: string
}> [] = [
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "email",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({row}) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
]

const payments = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
    // ...
]


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

                <AllFoodsTable
                    columns={columns}
                    data={payments}
                />

            </div>
        </section>
    )
}
