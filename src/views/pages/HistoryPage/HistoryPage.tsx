import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";
import UpdateFoodForm from "@/components/organisms/UpdateFoodForm";
import useAuthStore from "@/stores/auth.store.ts";
import {useEffect, useState} from "react";
import {useUserHistory} from "@/hooks/query/useUserHistory.ts";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "sonner";
import {Copy} from "lucide-react";

export default function HistoryPage() {

    const {user} = useAuthStore();
    const [foodSelected, setFoodSelected] = useState<Food | null>(null);
    const [selectedFoodImage, setSelectedFoodImage] = useState<Image | null>(foodSelected?.image ?? null);

    const {data: userHistory, isLoading: isHistoryLoading} = useUserHistory({
        editedById: user!.id,
        page: 1,
        limit: 2000
    });

    useEffect(() => {
        console.log(selectedFoodImage);
        setSelectedFoodImage(foodSelected?.image ?? null);
    }, [foodSelected]);

    return (
        <section className="flex flex-col flex-1 max-h-[88dvh]">
            <h1 className="text-2xl font-semibold mb-8"> Historial de comidas editadas</h1>
            <ResizablePanelGroup
                direction="horizontal"
                className="rounded-lg border w-full md:min-w-[450px]"
            >
                <ResizablePanel defaultSize={40} minSize={25}>

                    <ResizablePanelGroup direction="vertical">

                        <ResizablePanel defaultSize={15} maxSize={15} minSize={10}>
                            <div
                                className="flex flex-col h-full items-center justify-center p-6">
                                <span className="flex gap-4 font-semibold text-xl items-center">
                                    {foodSelected?.name}
                                    {
                                        foodSelected &&
                                        <Button
                                            size={"icon"}
                                            onClick={() => {
                                                navigator.clipboard.writeText(foodSelected.name.toString().toLowerCase())
                                                    .then(() => {
                                                        toast.success("Nombre copiado al portapapeles");
                                                    })
                                                    .catch(err => {
                                                        console.error('Error al copiar: ', err);
                                                        toast.error("No se pudo copiar al portapapeles");
                                                    });
                                            }}
                                        >
                                            <Copy/>
                                        </Button>
                                    }
                                </span>
                                <span className="text-muted-foreground">
                                    {foodSelected?.foodCategory.name}
                                </span>
                            </div>
                        </ResizablePanel>

                        <ResizableHandle withHandle/>

                        <ResizablePanel defaultSize={75}>
                            <UpdateFoodForm
                                imageFoodSelected={selectedFoodImage}
                                onFoodUpdate={() => {
                                    setSelectedFoodImage(null);
                                }}
                                currentFood={foodSelected}
                            />
                        </ResizablePanel>

                    </ResizablePanelGroup>
                </ResizablePanel>

                <ResizableHandle withHandle/>

                <ResizablePanel defaultSize={30} minSize={25}>
                    <div className="flex flex-col h-full p-6">
                        <div className="flex-1 flex gap-2 max-h-min p-4">
                            <p className={"text-lg font-medium"}>
                                Comidas editadas
                            </p>
                        </div>
                        <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                            {
                                !isHistoryLoading
                                    ? userHistory?.data.data.map((item) => {
                                        return (
                                            <div
                                                className={`p-4 border rounded-md transition-all
                                                ${foodSelected && foodSelected.id == item.id ? 'border-primary shadow-md' : 'hover:bg-neutral-100 shadow-sm'}`}
                                                key={item.id}
                                                onClick={() =>
                                                    setFoodSelected(prevState => (prevState?.id === item.id ? null : item))
                                                }
                                            >
                                                {item.name}
                                            </div>
                                        )
                                    })
                                    : <></>
                            }
                        </div>
                    </div>
                </ResizablePanel>
{/*
                <ResizableHandle withHandle/>

                <ResizablePanel defaultSize={30} minSize={25}>
                    <div className="flex flex-col h-full p-6">
                        <div className="flex-1 flex gap-2 max-h-min p-4">
                            <Input
                                placeholder="Buscar imagen por nombre"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <Sheet
                                open={isSheetOpen}
                                onOpenChange={setIsSheetOpen}
                            >
                                <CreateImageForm
                                    onImageCreated={(image: Image) => {
                                        setSelectedFoodImage(image)
                                        setIsSheetOpen(false)
                                    }}
                                />
                            </Sheet>
                        </div>
                        <div className="flex-1 flex overflow-y-auto">
                            <ImageFoodScrollArea
                                foodQuery={foodQueryDebounced}
                                selectedFood={selectedFoodImage}
                                onFoodSelect={(food) => setSelectedFoodImage(food)}
                            />
                        </div>
                    </div>
                </ResizablePanel>
*/}
            </ResizablePanelGroup>
        </section>
    )
}
