import {AppWindow, ChartArea, Shield, History} from "lucide-react";


export const navigationConfig = [
    {to: "/dashboard", icon: AppWindow, label: "Zona de trabajo"},
    {to: "/history", icon: History, label: "Historial"},
    {to: "/stats", icon: ChartArea, label: "Estadísticas"},
    {to: "/admin", icon: Shield, label: "Admin Panel"},
];