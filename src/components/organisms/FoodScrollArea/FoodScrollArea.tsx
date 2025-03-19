import { useEffect, useState } from 'react'
import { searchFood } from "@/services/food.service.ts";

type FoodScrollAreaProps = {
    foodQuery: string;
}

export default function FoodScrollArea({ foodQuery }: FoodScrollAreaProps) {

    const [foods, setFoods] = useState<Food[] | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchFoods = async () => {
            const { data: { data } } = await searchFood({
                name: foodQuery,
                page,
                limit: 20
            })

            setFoods(data);
            return;
        }
        fetchFoods();
    }, [foodQuery])

    return foods && foods.length > 0 ?
        <div className="w-full flex flex-col gap-2 p-2">
            {
                foods.filter(food => food.name).length > 0 ?
                    foods.map(food => (
                        <div key={food.id} className="p-3 border rounded hover:bg-gray-100 cursor-pointer transition-all">
                            <span className="font-semibold">{food.name}</span>
                        </div>
                    ))
                    :
                    <div className="w-full flex flex-col text-center gap-2 p-2">
                        No se encontraron resultados
                    </div>
            }
        </div>
        :
        foodQuery ?
            <div className="w-full flex flex-col text-center gap-2 p-2">
                No se encontraron resultados
            </div>
            :
            <div className="w-full flex flex-col text-center gap-2 p-2">
                Inicia una búsqueda
            </div>
}
