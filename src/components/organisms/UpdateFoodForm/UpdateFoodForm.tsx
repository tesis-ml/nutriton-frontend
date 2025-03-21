import {FormEvent, useState} from 'react'
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
    {id: 'hasMeat', label: 'Contiene carne'},
    {id: 'hasEggs', label: 'Contiene huevos'},
    {id: 'hasMilk', label: 'Contiene lácteos'},
    {id: 'hasHoney', label: 'Contiene miel'},
    {id: 'hasGluten', label: 'Contiene gluten'},
    {id: 'canBeADish', label: 'Puede ser un plato'}
];

type UpdateFoodFormProps = {
    onFoodUpdate: () => void;
    foodSelected: Image | null;
    currentFoodId: number;
};

export default function UpdateFoodForm({foodSelected, currentFoodId, onFoodUpdate}: UpdateFoodFormProps) {
    const {data: prices, isLoading: pricesLoading} = usePriceTiers();

    const [priceTierId, setPriceTierId] = useState(1);
    const [dietaryFlags, setDietaryFlags] = useState({
        hasMeat: false,
        hasEggs: false,
        hasMilk: false,
        hasHoney: false,
        hasGluten: false,
        canBeADish: false
    });
    const {mutateAsync, status} = useUpdateFood(currentFoodId, {
        imageId: foodSelected?.id ?? 0,
        priceTierId, ...dietaryFlags
    });

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

        if (!priceTierId) {
            toast.error("Por favor, selecciona un rango de precio");
            return;
        }

        if (foodSelected === null) {
            toast.error("Por favor, selecciona una imagen para el alimento", {id: "food.update"});
            return;
        }

        const formData = {
            imageId: foodSelected.id,
            priceTierId,
            ...dietaryFlags
        };

        toast.loading("Actualizando...", {id: "food.update"});

        console.log("Datos del formulario:", {id: currentFoodId, ...formData});

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
        <form onSubmit={updateFood} className="space-y-6 p-8 flex flex-col">
            <div>
                <h3 className="mb-4 text-lg">Rango de precio</h3>
                <RadioGroup
                    defaultValue={priceTierId.toString()}
                    value={priceTierId.toString()}
                    onValueChange={handleRadioChange}
                    className="flex w-full justify-evenly"
                >
                    {prices!.map((tier: PriceTier) => (
                        <div key={tier.id} className="flex flex-col items-center gap-3">
                            <RadioGroupItem className="h-10 w-auto aspect-square rounded-md" value={tier.id.toString()}
                                            id={`price-${tier.id}`}/>
                            <Label htmlFor={`price-${tier.id}`} className="text-xl">{itemsLabels.get(tier.name)}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            <div>
                <h3 className="mb-4 text-lg">Características del alimento</h3>
                <div className="grid grid-cols-3 gap-4">
                    {foodProperties.map(item => (
                        <div key={item.id} className="flex flex-col items-center gap-2">
                            <Checkbox
                                id={item.id}
                                checked={dietaryFlags[item.id as keyof typeof dietaryFlags]}
                                className="h-12 w-12"
                                onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                            />
                            <Label htmlFor={item.id}>{item.label}</Label>
                        </div>
                    ))}
                </div>
            </div>
            <hr className="my-4"/>
            <div className="flex justify-evenly items-center overflow-y-auto">

                <img
                    src={foodSelected?.src}
                    alt=""
                    className="w-auto max-h-44"
                />

                <Button type="submit">
                    Actualizar alimento
                </Button>
            </div>
        </form>
    );
}