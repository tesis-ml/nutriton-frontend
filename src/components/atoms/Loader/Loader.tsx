import './Loader.css'


interface LoaderProps {
    className?: string;
}

export default function Loader({ className }: LoaderProps) {
    return (
        <div className={"relative w-full h-2 overflow-hidden bg-gray-200 rounded " + className}>
            <div className={"absolute top-0 left-0 w-full h-full bg-primary progress-bar"} />
        </div>
    );
}
