import Popup from "./app-pages/popup";
import {PopupLogIn, PopupPayment, PopupSignUp} from "./elements/popup-elements";
import {useEffect, useRef, useState} from "react";
import {createUser, deleteCookie, getCookie, getProjects, getUserData, stringify} from "../../server-api/using";

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
            <span className='h-7'> { UserName ? UserName : undefined } </span>
            <span onClick={() => {
                deleteCookie('user-id')
                window.location.reload();
            }}> Log out </span>
        </>
    )
    const UnLoggedIn = () => (
        <>
            <span className='h-9' onClick={() => PopupShowHide('popup3')}> Log in </span>
            <span className='h-9' onClick={() => PopupShowHide('popup2')}> Sign up </span>
        </>
    )

    const PopupShowHide = (id) => {
        if (document.getElementById(id).classList.contains('popup-settings-show')){
            document.getElementById(id).classList.remove('popup-settings-show')
            document.getElementById(id).classList.add('popup-settings-hide')
        }else {
            document.getElementById(id).classList.remove('popup-settings-hide')
            document.getElementById(id).classList.add('popup-settings-show')
        }
    }

    return(
        <>
            <div className='h-header'>
                <div className='h-2'> Hosting </div>
                <div className='h-3'>
                    <div className='h-5'>
                        <label htmlFor='button-headerhostapp'>
                            <span className='h-6' id='balance-amount'> {
                                !getCookie('user-id') ? null : 0.00
                            } </span>
                        </label>
                        <input type='button' name='button-headerhostapp' className='h-4' value='Purchase+'
                               onClick={() => PopupShowHide('popup1')}
                               disabled={
                                   !getCookie('user-id') ? true : false
                               }
                        />
                    </div>
                    <div className='h-7'>
                        { getCookie('user-id') ? <LoggedIn/> : <UnLoggedIn/> }
                    </div>
                </div>
            </div>
            <Popup id={'popup1'} popupPart={
                <PopupPayment id={'popup1'}/>
            }/>
            <Popup id={'popup2'} popupPart={
                <PopupSignUp id={'popup2'} />
            }/>
            <Popup id={'popup3'} popupPart={
                <PopupLogIn id={'popup3'}/>
            }/>
        </>
    )
}