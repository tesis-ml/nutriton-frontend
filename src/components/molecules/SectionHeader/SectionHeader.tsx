import { Separator } from "@/components/ui/separator";

type SectionHeaderProps = {
    title: string;
    subtitle: string;
};

export default function ProfileHeader({ title, subtitle }: SectionHeaderProps) {
    return (
        <>
            <div>
                <h3 className="text-2xl font-medium">{title}</h3>
                <p className="text-sm text-muted-foreground">
                    {subtitle}
                </p>
            </div>
            <Separator />
        </>
    );
}