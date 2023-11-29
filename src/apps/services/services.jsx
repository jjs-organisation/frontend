import {Outlet, Route, Routes} from "react-router-dom";
import Index from "./app-pages/index-page";
import NotFoundHostApp from "../host-app/app-pages/notfound";
import Layout from "./layout"

export default function Services() {
    const routeElement = () => (
        <>
            <Routes>
                <Route path="index" element={<Index />} />
                <Route path="*" element={<NotFoundHostApp />} />
            </Routes>
            <Outlet />
        </>
    )
    return(
        <>
            <Layout inner={routeElement()}/>
        </>
    )
}