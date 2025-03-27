import {FormEvent, useEffect, useState} from 'react'
import {usePriceTiers} from "@/hooks/query/usePriceTiers.ts";
import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button"
import {toast} from "sonner"
import {useUpdateFood} from "@/hooks/query/useUpdateFood.ts";

const itemsLabels: Map<string, string> = new Map<string, string>([
    ['Económico', '$'],
    ['Estándar', '$$'],
    ['Premium', '$$$'],
    ['Lujo', '$$$$']
]);

const foodProperties = [
    {id: 'hasMeat', label: 'Proviene de un animal'},
    {id: 'hasEggs', label: 'Contiene huevos'},
    {id: 'hasMilk', label: 'Contiene lácteos'},
    {id: 'hasHoney', label: 'Contiene miel'},
    {id: 'hasGluten', label: 'Contiene gluten'},
    {id: 'canBeADish', label: 'Puede ser un plato'}
];

type UpdateFoodFormProps = {
    onFoodUpdate: () => void;
    imageFoodSelected: Image | null;
    currentFood: Food | null;
};

export default function UpdateFoodForm({imageFoodSelected, currentFood, onFoodUpdate}: UpdateFoodFormProps) {
    const {data: prices, isLoading: pricesLoading} = usePriceTiers();
    const [isMobileView, setIsMobileView] = useState(false);

    const [priceTierId, setPriceTierId] = useState(currentFood?.priceTierId ?? 1);
    const [dietaryFlags, setDietaryFlags] = useState({
        hasMeat: false,
        hasEggs: false,
        hasMilk: false,
        hasHoney: false,
        hasGluten: false,
        canBeADish: false
    });
    const {mutateAsync, status} = useUpdateFood(currentFood?.id ?? 0, {
        imageId: imageFoodSelected?.id ?? 0,
        priceTierId, ...dietaryFlags
    });

    useEffect(() => {
        // Check screen size and set mobile view state
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        // Set initial state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (currentFood) {
            setPriceTierId(currentFood.priceTierId || 1);
            setDietaryFlags({
                hasMeat: currentFood.hasMeat || false,
                hasEggs: currentFood.hasEggs || false,
                hasMilk: currentFood.hasMilk || false,
                hasHoney: currentFood.hasHoney || false,
                hasGluten: currentFood.hasGluten || false,
                canBeADish: currentFood.canBeADish || false
            });
        } else {
            resetValues();
        }
    }, [currentFood]);

    const resetValues = () => {
        setDietaryFlags({
            hasMeat: false,
            hasEggs: false,
            hasMilk: false,
            hasHoney: false,
            hasGluten: false,
            canBeADish: false
        })

        setPriceTierId(1);
    }

    const updateFood = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!currentFood) {
            toast.error("Por favor, selecciona una comida para poder actualizarla");
            return;
        }

        if (!priceTierId) {
            toast.error("Por favor, selecciona un rango de precio");
            return;
        }

        if (imageFoodSelected === null) {
            toast.error("Por favor, selecciona una imagen para el alimento", {id: "food.update"});
            return;
        }

        const formData = {
            imageId: imageFoodSelected.id,
            priceTierId,
            ...dietaryFlags
        };

        toast.loading("Actualizando...", {id: "food.update"});

        console.log("Datos del formulario:", {id: currentFood, ...formData});

        await mutateAsync();

        if (status == "error") {
            toast.error("Error al actualizar el alimento", {id: "food.update"});
        } else {
            resetValues();
            onFoodUpdate?.()
            toast.success(`Alimento actualizado correctamente`, {id: "food.update"});
        }

        return;
    };

    const handleRadioChange = (value: string) => {
        setPriceTierId(parseInt(value));
    };

    const handleCheckboxChange = (field: string, checked: boolean) => {
        setDietaryFlags(prev => ({
            ...prev,
            [field]: checked
        }));
    };

    if (pricesLoading)
        return <div className="flex justify-center p-4">Cargando opciones...</div>;

    return (
        <form onSubmit={updateFood}
              className="space-y-4 sm:space-y-6 p-4 sm:p-6 md:p-8 flex flex-col h-full overflow-y-auto">
            <div>
                <h3 className="mb-2 sm:mb-4 text-base sm:text-lg">Rango de precio</h3>
                <RadioGroup
                    defaultValue={priceTierId.toString()}
                    value={priceTierId.toString()}
                    onValueChange={handleRadioChange}
                    className="flex w-full justify-evenly"
                >
                    {prices!.map((tier: PriceTier) => (
                        <div key={tier.id} className="flex flex-col items-center gap-1 sm:gap-3">
                            <RadioGroupItem
                                className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 aspect-square rounded-md"
                                value={tier.id.toString()}
                                id={`price-${tier.id}`}
                            />
                            <Label
                                htmlFor={`price-${tier.id}`}
                                className="text-sm sm:text-base md:text-xl"
                            >
                                {itemsLabels.get(tier.name)}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            <div>
                <h3 className="mb-2 sm:mb-4 text-base sm:text-lg">Características del alimento</h3>
                <div className={`grid ${isMobileView ? 'grid-cols-2' : 'grid-cols-3'} gap-2 sm:gap-4`}>
                    {foodProperties.map(item => (
                        <div key={item.id} className="flex flex-col items-center gap-1 sm:gap-2">
                            <Checkbox
                                id={item.id}
                                checked={dietaryFlags[item.id as keyof typeof dietaryFlags]}
                                className="h-6 w-6 sm:h-8 sm:w-8 md:h-12 md:w-12"
                                onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                            />
                            <Label
                                htmlFor={item.id}
                                className="text-xs sm:text-sm md:text-base text-center"
                            >
                                {item.label}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="my-2 sm:my-4"/>

            <div className={`flex ${isMobileView ? 'flex-col' : 'flex-row'} justify-evenly items-center gap-4 mt-auto`}>
                {imageFoodSelected && (
                    <div className="flex justify-center">
                        <img
                            src={imageFoodSelected?.src}
                            alt=""
                            className="w-auto min-w-10 max-h-24 sm:max-h-32 md:max-h-44 object-contain"
                        />
                    </div>
                )}

                <Button type="submit" className="w-full sm:w-auto">
                    Actualizar alimento
                </Button>
            </div>
        </form>
    );
}