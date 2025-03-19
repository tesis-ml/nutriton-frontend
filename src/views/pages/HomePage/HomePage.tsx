import useAuthStore from "@/stores/auth.store.ts";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "@/components/ui/resizable"
import { Input } from "@/components/ui/input.tsx";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce.ts";
import FoodScrollArea from "@/components/organisms/FoodScrollArea";

export default function HomePage() {

    const { user } = useAuthStore();
    const [search, setSearch] = useState("");
    const foodQueryDebounced = useDebounce(search, 800);

    const testFood = {
        "id": 1073,
        "foodCategoryId": 1,
        "name": "CREMA, ÁCIDA O AGRIA, BAJA GRASA",
        "water": "71",
        "calories": "181",
        "protein": "7",
        "totalFat": "14.1",
        "sfa": "8.7",
        "mufa": "4.1",
        "pufa": "0.5",
        "cholesterol": "35",
        "carbs": "7",
        "sugar": "0.3",
        "ash": "0",
        "dietaryFiber": "0.9",
        "calcium": "141",
        "iron": "0.06",
        "magnesium": "11",
        "phosphorus": "85",
        "potassium": "211",
        "sodium": "70",
        "zinc": "0.27",
        "copper": "0.01",
        "selenium": "4.1",
        "edibleFraction": "1",
        "vitaminC": "1",
        "thiamine": "0.04",
        "riboflavin": "0.24",
        "niacin": "0.07",
        "vitaminB5": null,
        "vitaminB6": "0.02",
        "folicAcid": "0",
        "folate": "11",
        "foodBasedFolate": "11",
        "vitaminB12": "0.3",
        "vitaminA": "119",
        "retinol": "117",
        "carotenoids": "27",
        "vitaminE": "0.4",
        "vitaminD": "0.3",
        "vitaminK": "0.7",
        "priceTierId": null,
        "imageId": null,
        "hasMeat": null,
        "hasEggs": null,
        "hasMilk": null,
        "hasHoney": null,
        "hasGluten": null,
        "isOvoLactoVegetarian": null,
        "isLactoVegetarian": null,
        "isOvoVegetarian": null,
        "isVegan": null,
        "isGlutenFree": null,
        "canBeADish": null,
        "editedById": null,
        "isEdited": false,
        "foodCategory": {
            "id": 1,
            "name": "LÁCTEOS Y SIMILARES"
        }
    }

    return (
        <section className="flex flex-col flex-1 border max-h-[88dvh]">
            <h1 className="text-2xl font-semibold mb-8"> Bienvenid@ a la Nutriton, {user!.firstName}!</h1>
            <ResizablePanelGroup
                direction="horizontal"
                className="rounded-lg border w-full md:min-w-[450px]"
            >
                <ResizablePanel defaultSize={50} minSize={25}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={15} maxSize={15} minSize={10}>
                            <div
                                className="flex flex-col border border-lime-500 h-full items-center justify-center p-6">
                                <span className="font-semibold text-xl">
                                    {testFood.name}
                                </span>
                                <span className="text-muted-foreground">
                                    {testFood.foodCategory.name}
                                </span>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={75}>
                            <div className="flex border border-lime-500 h-full items-center justify-center p-6">
                                <span className="font-semibold">Three</span>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50} minSize={25} maxSize={60}>
                    <div className="flex flex-col border border-lime-500 h-full p-6">
                        <div className="flex-1 max-h-min p-4 border border-blue-500">
                            <Input
                                placeholder="Buscar imagen por nombre"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 flex border overflow-y-auto border-indigo-500">
                            <FoodScrollArea
                                foodQuery={foodQueryDebounced}
                            />
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </section>
    )
}
