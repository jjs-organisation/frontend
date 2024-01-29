import HeaderServices from "../services/elements/header";
import {deleteCookie, getCookie} from "../../server-api/using";
import React from "react";
import {PopupLogin, PopupSignUp, PopupVerify} from "../services/layout";
import ForumHeader from "./forum-header";

export default function ForumLayout({ inner }){
    return(
        <>
            <ForumHeader text={ 'UniJS Forum - IN DEVELOPMENT' } inner={
                <>
                    {
                        !getCookie('user-id')
                            ?  <>
                                <span className='open-popup_login' style={{
                                    cursor: 'pointer'
                                }}> Sign in </span>
                                <span className='open-popup_signup' style={{
                                    cursor: 'pointer'
                                }}> Sign up </span>
                            </>
                            :   <>
                                <span onClick={() => window.location.replace('/profile')}
                                      style={{ cursor: 'default' }}
                                > {getCookie('user-name')} </span>
                                <span onClick={() => {
                                    deleteCookie(`user-id`)
                                    deleteCookie(`user-name`)
                                }}>
                                    logout
                                </span>
                            </>

                    }
                    <a href='/'> to main page </a>
                </>
            }/>
            <div className='s-1'>
                <main className='s-2'>
                    { inner }
                </main>
            </div>
            <PopupVerify />
            <PopupLogin />
            <PopupSignUp />
        </>
    );
}