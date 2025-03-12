import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer";

type ResponsiveFormContainerProps = {
    condition: boolean;
    title: string;
    description?: string;
    cancelText?: string;
    trigger: React.ReactNode;
    children: React.ReactNode;
    open?: boolean;
    setOpen?: (open: boolean) => void;
}

export default function ResponsiveFormContainer({
    condition,
    title,
    cancelText,
    description,
    trigger,
    open,
    setOpen,
    children
}: ResponsiveFormContainerProps) {

    return condition ?
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    {description && <DialogDescription> {description} </DialogDescription>}
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
        :
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {trigger}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>
                        {title}
                    </DrawerTitle>
                    {description && <DrawerDescription> {description} </DrawerDescription>}
                </DrawerHeader>
                {children}
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline"> {cancelText || 'Cancelar'} </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

}
