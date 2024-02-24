import React from 'react';
import Layout from "./layout";
import ProfileRender from "./own/own_profile";
export default function Profile({ Head, userId }) {
    return(
        <>
            <Layout inner={
                <ProfileRender user_id={userId} />
            } Head={ Head }/>
        </>
    )
}