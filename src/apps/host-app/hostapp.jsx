import React from 'react';
import LayoutHostApp from "./layout";
import {BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Index from "../../pages/index";
import Hosting from "../../pages/hosting/hosting";
import IndexHostApp from "./app-pages/index-hostapp";
import NotFoundHostApp from "./app-pages/notfound";


export default function HostApp({ inner }){
    const routeElement = () => (
        <>
            <Routes>
                <Route path="index" element={<IndexHostApp />} />
                <Route path="*" element={<NotFoundHostApp />} />
            </Routes>
            <Outlet />
        </>
    )
    return(
        <>
            <LayoutHostApp inner={routeElement()}/>
        </>
    )
}