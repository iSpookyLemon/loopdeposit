import { LOGIN } from "lib/routes";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/auth";

export default function Protected() {

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && (pathname.startsWith("/protected")) && !user) {
            navigate(LOGIN);
        }
    }, [pathname, navigate, user, isLoading])

    if (isLoading) return "Loading...";

    return (
        <>
        <Outlet />
        </>
    );
}