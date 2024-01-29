import HeaderUserAPI from "./header_uapi";
import {deleteCookie, getCookie} from "../../server-api/using";
import React from "react";

export function _uapi_layout({ inner }){
    return(
        <>
            <HeaderUserAPI inner={
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
            <div className='ua-1'>
                <main className='ua-2'>
                    { inner }
                </main>
            </div>
        </>
    )
}