import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import AuthPage from "../pages/AuthPage/AuthPage";
import HomePage from "../pages/HomePage/HomePage";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import BookingPage from "../pages/BookingPage/BookingPage";
import MyBookingsPage from "../pages/MyBookingsPage/MyBookingsPage";

export const router = createBrowserRouter([
    {
        path : '/',
        element : <HomePage />
    },
    {
        path : '/auth',
        element : <AuthPage />
    },
    {
        path : '/admin',
        element : (
            <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
            </ProtectedRoute>
        )
    },
    {
        path : '/booking',
        element : (
            <ProtectedRoute allowedRoles={['GUEST']}>
                <BookingPage />
            </ProtectedRoute>
        )
    },
    {
        path : '/bookings',
        element : (
            <ProtectedRoute allowedRoles={['GUEST']}>
                <MyBookingsPage />
            </ProtectedRoute>
        )
    }
]);