import React from 'react';
import {Outlet, Route, Routes} from "react-router-dom";
import Index from "./app-pages/index-page";
import { LayoutHostApp } from "./layout"

export default function Services() {
    const routeElement = () => (
        <>
            <Routes>
                <Route path="/" element={<Index />} />
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