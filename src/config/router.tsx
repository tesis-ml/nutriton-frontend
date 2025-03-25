import AuthGuard from "@/components/guards/AuthGuard";
import RoleGuard from "@/components/guards/RoleGuard";
import AppLayout from "@/views/layouts/AppLayout";
import AuthLayout from "@/views/layouts/AuthLayout";
import AdminPage from "@/views/pages/AdminPage";
import ErrorPage from "@/views/pages/ErrorPage";
import HomePage from "@/views/pages/HomePage";
import LoginPage from "@/views/pages/LoginPage";
import ProfilePage from "@/views/pages/ProfilePage";
import StatsPage from "@/views/pages/StatsPage";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import HistoryPage from "@/views/pages/HistoryPage";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorPage />}>
            <Route element={<AuthGuard inverted />}>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                </Route>
            </Route>

            <Route element={<AuthGuard />}>
                <Route index path="/" element={<Navigate to={"/dashboard"} />} />

                <Route element={<AppLayout />}>
                    <Route path="/dashboard" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/history" element={<HistoryPage />} />
                </Route>

                <Route element={<AppLayout />}>
                    <Route element={<RoleGuard allowedRoles={["admin"]} />}>
                        <Route path="/stats" element={<StatsPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                    </Route>
                </Route>
            </Route>
        </Route>
    )
);