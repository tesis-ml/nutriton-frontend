import {Label} from "@/components/ui/label.tsx";
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
import {PlusCircle} from "lucide-react";

type CreateImageFormProps = {
    onImageCreated: (image: Image) => void;
}

export default function CreateImageForm({onImageCreated}: CreateImageFormProps) {
    const [name, setName] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const {mutateAsync, isPending} = useCreateImage({file: imageFile!, name});

    const handleNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setName(e.target.value);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        // Revisar si hay imágenes en el portapapeles
        const items = e.clipboardData?.items;
        let imageFound = false;

        if (items) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    // Prevenir comportamiento predeterminado si es imagen
                    e.preventDefault();

                    const file = items[i].getAsFile();
                    if (file) {
                        const fileWithName = new File(
                            [file],
                            file.name || `image-${Date.now()}.${file.type.split('/')[1] || 'png'}`,
                            {type: file.type}
                        );

                        setImageFile(fileWithName);

                        // Crear URL para previsualización
                        const url = URL.createObjectURL(fileWithName);
                        setPreviewUrl(url);

                        imageFound = true;
                        break;
                    }
                }
            }
        }

        // Si no se encontró imagen, deja que el comportamiento normal ocurra para el texto
        if (!imageFound) {
            // No hacer nada, el textarea manejará el texto pegado normalmente
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

    const removeImage = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setImageFile(null);
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
                        {/* Área donde se muestra la imagen pegada */}
                        {imageFile && previewUrl && (
                            <div className="relative rounded-md overflow-hidden border border-gray-200">
                                <img
                                    src={previewUrl}
                                    alt="Imagen pegada"
                                    className="w-full max-h-48 object-contain"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={removeImage}
                                >
                                    Eliminar
                                </Button>
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                                    {imageFile.name} ({(imageFile.size / 1024).toFixed(2)} KB)
                                </div>
                            </div>
                        )}

                        {/* Campo de texto similar a un chat */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Nombre y descripción</Label>
                            <div className="flex flex-col">
                                <textarea
                                    ref={textAreaRef}
                                    id="name"
                                    value={name}
                                    onChange={handleNameChange}
                                    onPaste={handlePaste}
                                    placeholder="Escribe un nombre o descripción y pega una imagen (Ctrl+V)..."
                                    className="flex-grow p-2 border rounded-md resize-none min-h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Puedes pegar una imagen directamente en el campo de texto (Ctrl+V)
                                </p>
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