import ImageFoodScrollArea from "@/components/organisms/FoodScrollArea";
import {Input} from "@/components/ui/input.tsx";
import {Sheet,} from "@/components/ui/sheet"
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/ui/resizable";
import useDebounce from "@/hooks/useDebounce.ts";
import useAuthStore from "@/stores/auth.store.ts";
import {useState} from "react";
import CreateImageForm from "@/components/organisms/CreateImageForm";
import UpdateFoodForm from "@/components/organisms/UpdateFoodForm";
import {useAssignFood} from "@/hooks/query/useAssignFood.ts";
import {Button} from "@/components/ui/button.tsx";
import {Copy} from "lucide-react";
import {toast} from "sonner";
import {useLogout} from "@/hooks/useLogout.ts";

export default function HomePage() {

    const {user} = useAuthStore();
    const {logout} = useLogout()
    const [search, setSearch] = useState("");
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const foodQueryDebounced = useDebounce(search, 800);
    const [selectedFoodImage, setSelectedFoodImage] = useState<Image | null>(null);
    const {data: currentFood, isLoading, isError} = useAssignFood();

    if (isError)
        logout()

    return !isLoading ? (
            <section className="flex flex-col flex-1 max-h-[88dvh]">
                <h1 className="text-2xl font-semibold mb-8"> Bienvenid@ a la Nutriton, {user!.firstName}!</h1>
                <ResizablePanelGroup
                    direction="horizontal"
                    className="rounded-lg border w-full md:min-w-[450px]"
                >
                    <ResizablePanel defaultSize={50} minSize={25}>

                        <ResizablePanelGroup direction="vertical">

                            <ResizablePanel defaultSize={15} maxSize={15} minSize={10}>
                                <div
                                    className="flex flex-col h-full items-center justify-center p-6">
                                <span className="flex gap-4 font-semibold text-xl items-center">
                                    {currentFood.name}
                                    <Button
                                        size={"icon"}
                                        onClick={() => {
                                            navigator.clipboard.writeText(currentFood.name.toString().toLowerCase())
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
                                </span>
                                    <span className="text-muted-foreground">
                                    {currentFood.foodCategory.name}
                                </span>
                                </div>
                            </ResizablePanel>

                            <ResizableHandle withHandle/>

                            <ResizablePanel defaultSize={75}>
                                <UpdateFoodForm
                                    foodSelected={selectedFoodImage}
                                    onFoodUpdate={() => {
                                        setSelectedFoodImage(null);
                                    }}
                                    currentFoodId={currentFood.id}
                                />
                            </ResizablePanel>

                        </ResizablePanelGroup>
                    </ResizablePanel>

                    <ResizableHandle withHandle/>

                    <ResizablePanel defaultSize={50} minSize={35} maxSize={60}>
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

                </ResizablePanelGroup>
            </section>
        )
        :
        null;
}
