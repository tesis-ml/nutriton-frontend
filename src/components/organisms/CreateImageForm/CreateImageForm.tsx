import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {toast} from "sonner";
import {useCreateImage} from "@/hooks/query/useCreateImage.ts";
import {PlusCircle} from "lucide-react";


type CreateImageFormProps = {
    onImageCreated: (image: Image) => void;
}

export default function CreateImageForm({onImageCreated}: CreateImageFormProps) {

    const [imageReqBody, setImageReqBody] = useState({
        name: "",
        src: ""
    });

    const {mutateAsync, isPending} = useCreateImage(imageReqBody);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setImageReqBody(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!imageReqBody.name.trim() || !imageReqBody.src.trim()) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        toast.promise(mutateAsync, {
            loading: 'Guardando imagen...',
            success: (response) => {
                onImageCreated(response);
                return 'Imagen guardada y seleccionada correctamente';
            },
            error: 'Error al guardar la imagen'
        })
    };

    return (
        <>
            <SheetTrigger asChild>
                <Button
                    className={`h-full w-auto aspect-square`}
                    size={"icon"}
                    variant="outline"
                >
                    <PlusCircle
                        size={36}
                    />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Crear registro de imagen</SheetTitle>
                    <SheetDescription>
                        Completa la información para crear un nuevo registro de imagen y asignarlo a
                        la siguiente comida.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nombre
                            </Label>
                            <Input
                                autoComplete={"off"}
                                id="name"
                                value={imageReqBody.name}
                                onChange={handleInputChange}
                                className="col-span-3"
                                placeholder="Nombre de la imagen"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="src" className="text-right">
                                URL
                            </Label>
                            <Input
                                autoComplete={"off"}
                                id="src"
                                value={imageReqBody.src}
                                onChange={handleInputChange}
                                className="col-span-3"
                                placeholder="URL de la imagen"
                            />
                        </div>
                    </div>
                    <SheetFooter>
                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </>
    )
}
