import {
    Outlet,
    Route,
    Routes,
    useLocation
} from "react-router-dom";
import NotFoundHostApp from "../../apps/host-app/app-pages/notfound";
import React from "react";
import Profile from "./profile";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function ProfileRouting() {
    const ProfileHeader = () => (
        <>
            <a href="/"> to main </a>
            <a href="/services/"> to services </a>
        </>
    )

    function Routing(){
        const query = useQuery()
        return(
            <>
                <Routes>
                    <Route path="/" element={<Profile Head={<ProfileHeader />}
                        userId={query.get('user-id')}/>} />
                    <Route path="*" element={<NotFoundHostApp />} />
                </Routes>
            </>
        );
    }
    return(
        <>
            <Routing />
        </>
    )
}