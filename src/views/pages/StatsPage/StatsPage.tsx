import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import { useMemo, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

const chartConfig = {
    foodsEdited: {
        label: "Alimentos Editados",
        color: "hsl(var(--primary))",
    },
    imagesCreated: {
        label: "Imágenes Creadas",
        color: "hsl(var(--chart-2))",
    },
}

export default function UserStatsChart() {
    // Datos de ejemplo que has proporcionado
    const userData = useMemo(() => {
        return [
            {
                "id": 10,
                "createdAt": "2025-03-13T00:03:58.224Z",
                "updatedAt": "2025-03-13T00:03:58.224Z",
                "email": "langosta@gmail.com",
                "firstName": "Sofia",
                "lastName": "Reyes",
                "role": "user",
                "_count": {
                    "foodsEdited": 10,
                    "imagesCreated": 32,
                }
            },
            {
                "id": 13,
                "createdAt": "2025-03-13T00:07:43.469Z",
                "updatedAt": "2025-03-13T00:07:43.469Z",
                "email": "langosta2@gmail.com",
                "firstName": "Sofia",
                "lastName": "Reyes",
                "role": "user",
                "_count": {
                    "foodsEdited": 7,
                    "imagesCreated": 10
                }
            },
            {
                "id": 16,
                "createdAt": "2025-03-13T00:14:36.078Z",
                "updatedAt": "2025-03-13T00:14:36.078Z",
                "email": "correodemierda@email.com",
                "firstName": "Langui",
                "lastName": "Dos Cuartos",
                "role": "user",
                "_count": {
                    "foodsEdited": 12,
                    "imagesCreated": 7
                }
            },
            {
                "id": 1,
                "createdAt": "2025-03-12T16:58:54.471Z",
                "updatedAt": "2025-03-12T16:58:54.471Z",
                "email": "eduarmercado4@gmail.com",
                "firstName": "Carlos",
                "lastName": "Mercado",
                "role": "admin",
                "_count": {
                    "foodsEdited": 31,
                    "imagesCreated": 13
                }
            },
            {
                "id": 3,
                "createdAt": "2025-03-12T17:12:34.990Z",
                "updatedAt": "2025-03-12T17:12:34.990Z",
                "email": "sofiareyes0090@gmail.com",
                "firstName": "Sofia",
                "lastName": "Reyes",
                "role": "user",
                "_count": {
                    "foodsEdited": 15,
                    "imagesCreated": 0
                }
            },
            {
                "id": 14,
                "createdAt": "2025-03-13T00:13:35.669Z",
                "updatedAt": "2025-03-13T00:13:35.669Z",
                "email": "correo@gogomail.com",
                "firstName": "Miguel",
                "lastName": "Eduardo",
                "role": "user",
                "_count": {
                    "foodsEdited": 12,
                    "imagesCreated": 4
                }
            }
        ]
    }, []);

    // Formatear los datos para la gráfica
    const chartData = useMemo(() => {
        return userData.map(user => ({
            name: `${user.firstName} ${user.lastName}`,
            id: user.id,
            email: user.email,
            foodsEdited: user._count.foodsEdited,
            imagesCreated: user._count.imagesCreated
        }));
    }, [userData]);

    const [activeChart, setActiveChart] = useState("foodsEdited");

    const total = useMemo(
        () => ({
            foodsEdited: chartData.reduce((acc, curr) => acc + curr.foodsEdited, 0),
            imagesCreated: chartData.reduce((acc, curr) => acc + curr.imagesCreated, 0),
        }),
        [chartData]
    );

    return (
        <section className="flex-1">
            <h1 className="text-2xl font-semibold mb-8">Estadísticas de Usuarios</h1>
            <Card>
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardTitle>Actividad de Usuarios</CardTitle>
                        <CardDescription>
                            Mostrando actividad de edición de alimentos y creación de imágenes
                        </CardDescription>
                    </div>
                    <div className="flex">
                        {Object.keys(chartConfig).map((key) => {
                            const chart = key as keyof typeof chartConfig;
                            return (
                                <button
                                    key={chart}
                                    data-active={activeChart === chart}
                                    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                    onClick={() => setActiveChart(chart)}
                                >
                                    <span className="text-xs text-muted-foreground">
                                        {chartConfig[chart].label}
                                    </span>
                                    <span className="text-lg font-bold leading-none sm:text-3xl">
                                        {total[chart as keyof typeof total].toLocaleString()}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </CardHeader>
                <CardContent className="px-2 sm:p-6">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[350px] w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                                bottom: 80
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                angle={0}
                                textAnchor="end"
                                height={80}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        className="w-[220px]"
                                        nameKey="datos"
                                        labelFormatter={(value, item) => {
                                            const user = item[0]?.payload;
                                            return `${value} (${user.email})`;
                                        }}
                                    />
                                }
                            />
                            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </section>
    );
}