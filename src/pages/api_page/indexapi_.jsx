import {Outlet, Route, Routes} from "react-router-dom";
import {_uapi_layout} from "./_uapi_layout";
import Index_uapi_page from "./innerPages/index_uapi_page";
import React from "react";
import NotFoundHostApp from "../../apps/host-app/app-pages/notfound";

export default function Indexapi_(){
    const Routing = () => (
        <>
            <Routes>
                <Route path='/' element={<Index_uapi_page />}/>
                <Route path='*' element={<NotFoundHostApp />}/>
            </Routes>
            <Outlet/>
        </>
    )
    return(
        <_uapi_layout inner={Routing()}/>
    )
}