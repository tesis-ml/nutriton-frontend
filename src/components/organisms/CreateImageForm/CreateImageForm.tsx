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
import {useState, useRef, useEffect} from "react";
import {toast} from "sonner";
import {useCreateImage} from "@/hooks/query/useCreateImage.ts";
import {PlusCircle, Image as ImageIcon} from "lucide-react";

type CreateImageFormProps = {
    onImageCreated: (image: Image) => void;
}

export default function CreateImageForm({onImageCreated}: CreateImageFormProps) {
    const [name, setName] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const {mutateAsync, isPending} = useCreateImage({file: imageFile!, name});

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        const items = e.clipboardData.items;

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                e.preventDefault();

                const file = items[i].getAsFile();
                if (file) {
                    const fileWithName = new File(
                        [file],
                        file.name || `image-${Date.now()}.${file.type.split('/')[1] || 'png'}`,
                        {type: file.type}
                    );

                    setImageFile(fileWithName);

                    const url = URL.createObjectURL(fileWithName);
                    setPreviewUrl(url);

                    break;
                }
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !imageFile) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', imageFile);

        toast.promise(mutateAsync(), {
            loading: 'Guardando imagen...',
            success: (response) => {
                onImageCreated(response);
                setName("");
                setImageFile(null);
                setPreviewUrl(null);
                return 'Imagen guardada y seleccionada correctamente';
            },
            error: 'Error al guardar la imagen'
        });
    };

    const clearPastedImage = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setImageFile(null);
    };

    const focusImageContainer = () => {
        if (imageContainerRef.current) {
            imageContainerRef.current.focus();
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

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
                                value={name}
                                onChange={handleNameChange}
                                className="col-span-3"
                                placeholder="Nombre de la imagen"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-2">
                                Imagen
                            </Label>
                            <div className="col-span-3">
                                {imageFile && previewUrl ? (
                                    // Mostrar la imagen pegada
                                    <div className="relative">
                                        <img
                                            src={previewUrl}
                                            alt="Imagen pegada"
                                            className="max-h-48 rounded-md border border-gray-200"
                                        />
                                        <div className="mt-2 text-sm text-gray-500">
                                            {imageFile.name} ({(imageFile.size / 1024).toFixed(2)} KB)
                                        </div>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="absolute top-2 right-2"
                                            onClick={clearPastedImage}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                ) : (
                                    // Mostrar área para pegar
                                    <div
                                        ref={imageContainerRef}
                                        onPaste={handlePaste}
                                        onClick={focusImageContainer}
                                        tabIndex={0}
                                        className="border-2 border-dashed border-gray-300 rounded-md p-4 h-32 flex flex-col items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <ImageIcon className="h-10 w-10 text-gray-400 mb-2"/>
                                        <p className="text-sm text-gray-500">
                                            Haz clic aquí y pega una imagen desde el portapapeles (Ctrl+V)
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            O pega directamente desde tu dispositivo móvil
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <SheetFooter>
                        <Button
                            type="submit"
                            disabled={isPending || !imageFile || !name.trim()}
                        >
                            {isPending ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </>
    );
}