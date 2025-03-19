import {useEffect, useRef, useState} from 'react';
import {getFoodImages} from "@/services/app.service.ts";

type FoodScrollAreaProps = {
    foodQuery: string;
    selectedFood: Image | null;
    onFoodSelect: (food: Image) => void;
}

export default function ImageFoodScrollArea({foodQuery, onFoodSelect, selectedFood}: FoodScrollAreaProps) {
    const [foods, setFoods] = useState<Image[]>([]);
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
                const response = await getFoodImages({
                    name: foodQuery,
                    page,
                    limit: 5
                });

                const foodData = response.data || [];
                console.log("Foods fetched:", response.data)

                const totalElements = response.elements || 0;

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
        <div className="w-full flex flex-col text-center gap-2 p-4 text-muted-foreground/50">
            Inicia una búsqueda
        </div>
    );

    const renderNoResults = () => (
        <div className="w-full flex flex-col text-center gap-2 p-4 text-muted-foreground/50">
            No se encontraron resultados
        </div>
    );

    const renderLoadingIndicator = () => (
        <div className="w-full py-4 text-center">
            <div
                className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
    );

    if (!foodQuery) return renderEmpty();
    if (foods.length === 0 && !loading) return renderNoResults();

    return (
        <div className="w-full flex flex-col gap-2 p-2">
            {
                foods.map((foodImage, index) => (
                    <div
                        key={`${foodImage.id}-${index}`}
                        className={`
                            flex min-w-fit justify-between gap-2 p-3 border rounded  cursor-pointer transition-all
                            ${selectedFood?.id === foodImage.id
                            ? 'bg-gray-700 text-white'
                            : 'hover:bg-slate-200'}
                            `}
                        ref={index === foods.length - 1 ? containerRef : null} // Only attach observer to last element
                    >
                        <div className="flex flex-col w-full"
                             onClick={() => onFoodSelect(foodImage)}
                        >
                            <span className="font-semibold">{foodImage.name}</span>
                            <span className="text-xs text-gray-500">
                                {`${foodImage.createdBy.firstName} ${foodImage.createdBy.lastName}`}
                            </span>
                        </div>

                        <img
                            src={foodImage.src || ""}
                            className={`h-auto max-w-64 border
                            ${selectedFood?.id === foodImage.id
                                ? 'border border-white text-white'
                                : 'hover:bg-slate-200'}
                            `}
                            alt={foodImage.name || "Imagen de comida"}
                        />

                    </div>
                ))
            }

            {loading && renderLoadingIndicator()}

            {!hasMore && foods.length > 0 && (
                <div className="w-full flex flex-col text-center gap-2 p-4 text-muted-foreground/50">
                    No hay más resultados
                </div>
            )}

        </div>
    );
}