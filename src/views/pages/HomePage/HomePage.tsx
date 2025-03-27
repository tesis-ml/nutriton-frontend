import ImageFoodScrollArea from "@/components/organisms/FoodScrollArea";
import {Input} from "@/components/ui/input.tsx";
import {Sheet,} from "@/components/ui/sheet"
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/ui/resizable";
import useDebounce from "@/hooks/useDebounce.ts";
import useAuthStore from "@/stores/auth.store.ts";
import {useEffect, useState} from "react";
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
    const foodQueryDebounced = useDebounce(search, 500);
    const [selectedFoodImage, setSelectedFoodImage] = useState<Image | null>(null);
    const {data: currentFood, isLoading, isError} = useAssignFood();
    const [isMobileView, setIsMobileView] = useState(false);
    const [defaultSizes, setDefaultSizes] = useState({
        leftPanel: 50,
        rightPanel: 50
    });

    // Handle responsive layout changes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMobileView(true);
                setDefaultSizes({
                    leftPanel: 100,
                    rightPanel: 100
                });
            } else if (window.innerWidth < 1024) {
                setIsMobileView(false);
                setDefaultSizes({
                    leftPanel: 60,
                    rightPanel: 40
                });
            } else {
                setIsMobileView(false);
                setDefaultSizes({
                    leftPanel: 50,
                    rightPanel: 50
                });
            }
        };

        // Set initial state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isError)
        logout()

    return !isLoading && currentFood ? (
            <section className="flex flex-col flex-1 max-h-[88dvh] px-2 sm:px-4 md:px-6">
                <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-8">
                    Bienvenid@ a la Nutriton, {user?.firstName}!
                </h1>

                {isMobileView ? (
                    // Mobile/Small Tablet Layout (Stack vertically)
                    <div className="flex flex-col gap-4 w-full border rounded-lg">
                        <div className="p-4 border-b">
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="flex gap-2 font-semibold text-lg items-center">
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
                                            <Copy className="h-4 w-4"/>
                                        </Button>
                                    </span>
                                    <span className="text-muted-foreground text-sm">
                                        {currentFood.foodCategory.name}
                                    </span>
                                </div>

                                <UpdateFoodForm
                                    imageFoodSelected={selectedFoodImage}
                                    onFoodUpdate={() => {
                                        setSelectedFoodImage(null);
                                    }}
                                    currentFood={currentFood}
                                />
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="flex gap-2 mb-4">
                                <Input
                                    placeholder="Buscar imagen por nombre"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="text-sm"
                                />

                                <Sheet
                                    open={isSheetOpen}
                                    onOpenChange={setIsSheetOpen}
                                >
                                    <CreateImageForm
                                        onImageCreated={(image) => {
                                            setSelectedFoodImage(image)
                                            setIsSheetOpen(false)
                                        }}
                                    />
                                </Sheet>
                            </div>

                            <div className="h-64 overflow-y-auto">
                                <ImageFoodScrollArea
                                    foodQuery={foodQueryDebounced}
                                    selectedFood={selectedFoodImage}
                                    onFoodSelect={(food) => setSelectedFoodImage(food)}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    // Tablet and Desktop Layout (Side by side with resizable panels)
                    <ResizablePanelGroup
                        direction="horizontal"
                        className="rounded-lg border w-full"
                    >
                        <ResizablePanel defaultSize={defaultSizes.leftPanel} minSize={30}>
                            <ResizablePanelGroup direction="vertical">
                                <ResizablePanel defaultSize={15} maxSize={15} minSize={10}>
                                    <div className="flex flex-col h-full items-center justify-center p-4 sm:p-6">
                                        <span className="flex gap-2 font-semibold text-lg sm:text-xl items-center">
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
                                                <Copy className="h-4 w-4"/>
                                            </Button>
                                        </span>
                                        <span className="text-muted-foreground text-sm">
                                            {currentFood.foodCategory.name}
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
                                        currentFood={currentFood}
                                    />
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </ResizablePanel>

                        <ResizableHandle withHandle/>

                        <ResizablePanel defaultSize={defaultSizes.rightPanel} minSize={30}>
                            <div className="flex flex-col h-full p-4 sm:p-6">
                                <div className="flex-1 flex gap-2 max-h-min p-2 sm:p-4">
                                    <Input
                                        placeholder="Buscar imagen por nombre"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="text-sm"
                                    />

                                    <Sheet
                                        open={isSheetOpen}
                                        onOpenChange={setIsSheetOpen}
                                    >
                                        <CreateImageForm
                                            onImageCreated={(image) => {
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
                )}
            </section>
        ) :
        null;
}