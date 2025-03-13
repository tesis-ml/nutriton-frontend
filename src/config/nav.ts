import { AppWindow, ChartArea, Shield } from "lucide-react";


export const navigationConfig = [
    { to: "/dashboard", icon: AppWindow, label: "Zona de trabajo" },
    { to: "/stats", icon: ChartArea, label: "Estadísticas" },
    { to: "/admin", icon: Shield, label: "Admin Panel" },
];