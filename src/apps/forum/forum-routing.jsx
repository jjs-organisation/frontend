import {
    BrowserRouter,
    Outlet,
    Route,
    Routes,
    useLocation
} from "react-router-dom";
import Index from "../services/app-pages/index-page";
import Editor from "../html-editor/editor";
import Neiro from "../neiro/neiro";
import NotFoundHostApp from "../host-app/app-pages/notfound";
import React from "react";
import ForumLayout from "./forum-layout";
import ForumIndexP from "./pages/forum-index-p";
import ForumTheme from "./pages/forum-theme";
import ForumPostView from "./pages/forum-postview";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function ForumRouting() {
    function Routing(){
        const query = useQuery()
        return(
            <>
                <Routes>
                    <Route path="/" element={<ForumLayout
                        inner={<ForumIndexP />} />} />
                    <Route path="theme" element={<ForumTheme
                    theme_id={query.get("theme-id")} />} />
                    <Route path="postview" element={ <ForumLayout inner={
                        <ForumPostView post_id={query.get("post-id")} />
                    }/>}/>
                    <Route path="neiro" element={<Neiro />} />
                    <Route path="*" element={<NotFoundHostApp />} />
                </Routes>
                <Outlet />
            </>
        );
    }
    return(
        <>
            <Routing />
        </>
    )
}