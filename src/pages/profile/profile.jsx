import React from 'react';
import Layout from "./layout";
import OwnProfile from "./own/own_profile";
export default function Profile({ Head }) {
    return(
        <>
            <Layout inner={
                <OwnProfile />
            } Head={ Head }/>
        </>
    )
}