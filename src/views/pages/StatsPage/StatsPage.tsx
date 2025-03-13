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
import { useStats } from "@/hooks/query/useStats.ts";

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

    const { data, isLoading } = useStats();
    const [activeChart, setActiveChart] = useState("foodsEdited");

    const total = useMemo(
        () => {
            if (!data) return { foodsEdited: 0, imagesCreated: 0 };

            return {
                foodsEdited: data.reduce((acc, curr) => acc + (curr.foodsEdited || 0), 0),
                imagesCreated: data.reduce((acc, curr) => acc + (curr.imagesCreated || 0), 0),
            };
        },
        [data]
    );

    return (
        <section className="flex-1">
            <h1 className="text-2xl font-semibold mb-8">Estadísticas de Usuarios</h1>
            {
                isLoading ? <p>Cargando...</p> :
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
                        <CardContent className="px-2 mt-4 sm:p-6">
                            <ChartContainer
                                config={chartConfig}
                                className="aspect-auto h-[350px] w-full"
                            >
                                <BarChart
                                    accessibilityLayer
                                    data={data}
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
            }
        </section>
    );
}