type EmptyStateProps = {
    title: string;
    description?: string;
    imgSrc: string;
    imgAlt: string;
    className?: string;
    imageClassName?: string;
}

export default function EmptyState({
    title,
    description,
    imgSrc,
    imgAlt,
    className = "flex flex-col items-center justify-center p-8 text-center",
    imageClassName,
}: EmptyStateProps) {
    return (
        <div className={className}>

            <img src={imgSrc} alt={imgAlt} className={imageClassName} />

            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            {description && (
                <p className="mt-2 text-sm text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );

}
