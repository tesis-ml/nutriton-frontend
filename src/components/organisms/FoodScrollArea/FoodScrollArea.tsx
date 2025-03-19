import { useEffect, useState, useRef } from 'react'
import { searchFood } from "@/services/food.service.ts";

type FoodScrollAreaProps = {
    foodQuery: string;
}

export default function FoodScrollArea({ foodQuery }: FoodScrollAreaProps) {
    const [foods, setFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Reset when search query changes
    useEffect(() => {
        setFoods([]);
        setPage(1);
        setHasMore(true);
    }, [foodQuery]);

    // Fetch foods based on current page and search query
    useEffect(() => {
        const fetchFoods = async () => {
            if (!foodQuery) {
                setFoods([]);
                return;
            }

            try {
                setLoading(true);
                const response = await searchFood({
                    name: foodQuery,
                    page,
                    limit: 20
                });

                const foodData = response.data.data || [];
                const totalElements = response.data.elements || 0;

                if (page === 1) {
                    setFoods(foodData);
                } else {
                    setFoods(prevFoods => [...prevFoods, ...foodData]);
                }

                const currentTotal = page === 1 ? foodData.length : foods.length + foodData.length;
                setHasMore(currentTotal < totalElements);
            } catch (error) {
                console.error("Error fetching foods:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, [foodQuery, page]);

    useEffect(() => {
        if (loading || !hasMore) return;

        if (observer.current) {
            observer.current.disconnect();
        }

        const handleObserver = (entries: IntersectionObserverEntry[]) => {
            const [target] = entries;
            if (target.isIntersecting && hasMore && !loading) {
                console.log('Loading more foods, current page:', page);
                setPage(prevPage => prevPage + 1);
            }
        };

        observer.current = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "20px",
            threshold: 0.1
        });

        if (containerRef.current) {
            observer.current.observe(containerRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [foods, loading, hasMore, page]);

    const renderEmpty = () => (
        <div className="w-full flex flex-col text-center gap-2 p-2">
            Inicia una búsqueda
        </div>
    );

    const renderNoResults = () => (
        <div className="w-full flex flex-col text-center gap-2 p-2">
            No se encontraron resultados
        </div>
    );

    const renderLoadingIndicator = () => (
        <div className="w-full py-4 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
    );

    if (!foodQuery) return renderEmpty();
    if (foods.length === 0 && !loading) return renderNoResults();

    return (
        <div className="w-full flex flex-col gap-2 p-2">
            {
                foods.filter(food => food.name).map((food, index) => (
                    <div
                        key={`${food.id}-${index}`}
                        className="p-3 border rounded hover:bg-gray-100 cursor-pointer transition-all"
                        ref={index === foods.length - 1 ? containerRef : null} // Only attach observer to last element
                    >
                        <div className="flex flex-col">
                            <span className="font-semibold">{food.name}</span>
                            <span className="text-xs text-gray-500">{food.foodCategory.name}</span>
                        </div>
                    </div>
                ))
            }

            {loading && renderLoadingIndicator()}

            {!hasMore && foods.length > 0 && (
                <div className="w-full py-4 text-center text-sm text-gray-500">
                    No hay más resultados
                </div>
            )}

        </div>
    );
}