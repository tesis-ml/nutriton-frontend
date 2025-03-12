import { bouncy } from 'ldrs'

bouncy.register()

type BouncyLoaderProps = {
    size?: string
    speed?: string
    color?: string
}

export default function BouncyLoader({
    size,
    speed,
    color
}: BouncyLoaderProps) {
    return (
        <l-bouncy
            size={size || "45"}
            speed={speed || "1.75"}
            color={color || "black"}
        />
    )
}