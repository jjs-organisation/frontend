import React from 'react';
import Popup from "./app-pages/popup";
import {
    PopupLogin,
    PopupVerify,
    PopupSignUp
} from "../services/layout";
import {
    useEffect,
    useRef,
    useState
} from "react";
import {
    createUser,
    deleteCookie,
    getCookie,
    getProjects,
    getUserData,
    stringify
} from "../../server-api/using";

export default function HeaderHostApp() {
    const [UserName, setUserName] = useState([]);

    useEffect(() => {
        const dataFetch = async () => {
            await getUserData(function (res) {
                if (res){
                    setUserName(JSON.parse(res.r)[0].name);
                }
                console.log(res)
            })
        };
        if (!getCookie('user-id'))
            console.log('not in session')
        else
            dataFetch();
    }, []);

    const LoggedIn = () => (
        <>
            <span className='h-7' onClick={
                () => window.location.replace('/profile')}>
                { UserName ? UserName : undefined }
            </span>
            <span onClick={() => {
                deleteCookie('user-id')
                window.location.reload();
            }}  style={{
                textTransform: 'uppercase'
            }}> Log out </span>
        </>
    )
    const UnLoggedIn = () => (
        <>
            <span className='h-9 open-popup_login' style={{
                textTransform: 'uppercase'
            }}> Log in </span>
            <span className='h-9 open-popup_signup' style={{
                textTransform: 'uppercase'
            }}> Sign up </span>
        </>
    )

    return(
        <>
            <div className='h-header'>
                <div className='h-2'> UNIJS hosting - in development </div>
                <div className='h-3'>
                    <div className='h-5'>
                        <label htmlFor='button-headerhostapp'>
                            <span className='h-6' id='balance-amount'> {
                                !getCookie('user-id') ? null : 0.00
                            } </span>
                        </label>
                        <input type='button' name='button-headerhostapp' className='h-4' value='balance +'
                               disabled={!getCookie('user-id')}
                        />
                    </div>
                    <div className='h-7'>
                        { getCookie('user-id') ? <LoggedIn/> : <UnLoggedIn/> }
                    </div>
                </div>
            </div>
            <PopupLogin  />
            <PopupSignUp />
            <PopupVerify />
        </>
    )
}