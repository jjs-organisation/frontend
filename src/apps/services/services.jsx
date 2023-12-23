import {Outlet, Route, Routes} from "react-router-dom";
import Index from "./app-pages/index-page";
import NotFoundHostApp from "../host-app/app-pages/notfound";
import Layout from "./layout"
import Neiro from "../neiro/neiro";
import Editor from "../html-editor/editor.tsx";

export default function Services() {
    const routeElement = () => (
        <>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="htmleditor" element={<Editor />} />
                <Route path="neiro" element={<Neiro />} />
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