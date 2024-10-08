import { createBrowserRouter } from "react-router-dom";

import Login from "components/auth/Login"
import Register from "components/auth/Register";
import Layout from "components/layout";
import Dashboard from "components/dashboard";
import Comments from "components/comments";
import Profile from "components/profile";
import Users from "components/users";
import Upload from "components/upload";
import Protected from "components/protected";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const DASHBOARD = "/dashboard";

export const PROTECTED = "/protected";
export const UPLOAD = "/protected/upload";
export const USERS = "/protected/users";
export const PROFILE = "/protected/profile/:id";
export const COMMENTS = "/protected/comments/:id";

export const router = createBrowserRouter([
    { path: ROOT, element: <Login /> },
    { path: LOGIN, element: <Login /> },
    { path: REGISTER, element: <Register /> },
    { path: "", element: <Layout />, children: [
        {
            path: DASHBOARD,
            element: <Dashboard />,
        }, { path: PROTECTED, element: <Protected />, children: [
            {
                path: USERS,
                element: <Users />,
            },
            {
                path: PROFILE,
                element: <Profile />,
            },
            {
                path: COMMENTS,
                element: <Comments />,
            },
            {
                path: UPLOAD,
                element: <Upload />,
            }
        ] }
    ] }
]);