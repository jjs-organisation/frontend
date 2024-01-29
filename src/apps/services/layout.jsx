import HeaderServices from "./elements/header";
import React, {useEffect, useRef} from 'react';
import {
    createUser,
    getCookie,
    deleteCookie,
    logIn,
    sendVerifyCodeToBackend
} from "../../server-api/using";

export function PopupLogin() {
    let userMail = useRef(null),
        userPassword = useRef(null)

    useEffect(() => {
        let popupBg = document.querySelector('.popup__bg_login');
        let popup = document.querySelector('.popup_login');
        let openPopupButtons = document.querySelectorAll('.open-popup_login');
        let closePopupButton = document.querySelector('.close-popup_login');

        openPopupButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                popupBg.classList.add('active');
                popup.classList.add('active');
            })
        });

        closePopupButton.addEventListener('click',() => {
            popupBg.classList.remove('active');
            popup.classList.remove('active');
        });

        document.addEventListener('click', (e) => {
            if(e.target === popupBg) {
                popupBg.classList.remove('active');
                popup.classList.remove('active');
            }
        });
    })
    return(
        <div className="popup__bg popup__bg_login">
            <div className="popup popup_login">
                <svg className="close-popup_login" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#2982ff" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
                </svg>
                <label>
                    <input type="text" name="name" style={{ color: 'white' }}
                           ref={userMail}
                    />
                    <div className="label__text">
                        Mail
                    </div>
                </label>
                <label>
                    <input type="text" name="name" style={{ color: 'white' }}
                           ref={userPassword}
                    />
                    <div className="label__text">
                        Password
                    </div>
                </label>
                <button className='popup__button_' onClick={() => logIn({
                    mail: userMail.current.value,
                    password: userPassword.current.value
                }, function (result) {
                    if (result.r === false)
                        console.log('auth failed')
                    else {
                        document.cookie = `user-id=${result.r.userid}; path=/`;
                        document.cookie = `user-name=${result.r.username}; path=/`;
                        window.location.reload();
                    }
                })}>
                    Login
                </button>
            </div>
        </div>
    )
}

export function PopupVerify() {
    let userCode = useRef(null);

    useEffect(() => {
        let popupBg = document.querySelector('.popup__bg_verify');
        let popup = document.querySelector('.popup_verify');
        let openPopupButtons = document.querySelectorAll('.open-popup_verify');
        let closePopupButton = document.querySelector('.close-popup_verify');

        openPopupButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                popupBg.classList.add('active');
                popup.classList.add('active');
            })
        });

        closePopupButton.addEventListener('click',() => {
            popupBg.classList.remove('active');
            popup.classList.remove('active');
        });

        document.addEventListener('click', (e) => {
            if(e.target === popupBg) {
                popupBg.classList.remove('active');
                popup.classList.remove('active');
            }
        });
    })
    return(
        <div className="popup__bg popup__bg_verify">
            <div className="popup popup_verify">
                <svg className="close-popup_verify" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#2982ff" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
                </svg>
                <label>
                    <input type="text" name="name" style={{ color: 'white' }}
                           ref={userCode}
                    />
                    <div className="label__text">
                        verify code
                    </div>
                </label>
                <button className='popup__button_' onClick={() => {
                    sendVerifyCodeToBackend({
                        code: userCode.current.value
                    },async function (c) {
                        if (c === true) {
                            try {
                                console.log(localStorage.getItem(
                                    `${getCookie(`verify-id`)}`
                                ))
                                await createUser(
                                    JSON.parse(
                                        localStorage.getItem(
                                            `${getCookie(`verify-id`)}`
                                        )
                                    ),
                                    true
                                )
                                setTimeout(() => window.location.reload(), 100);
                            } catch (e) {
                                console.log(localStorage.getItem(`${getCookie(`verify-id`)}`))
                                console.log(e)
                            }
                        } else {
                            alert('code incorrect')
                            console.log(false)
                        }
                    })
                }}>
                    verify mail
                </button>
            </div>
        </div>
    )
}

export function PopupSignUp() {
    let userMail = useRef(null),
        userName = useRef(null),
        userPassword = useRef(null),
        userPassword2 = useRef(null)

    useEffect(() => {
        let popupBg = document.querySelector('.popup__bg_signup');
        let popup = document.querySelector('.popup_signup');
        let openPopupButtons = document.querySelectorAll('.open-popup_signup');
        let closePopupButton = document.querySelector('.close-popup_signup');

        openPopupButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                popupBg.classList.add('active');
                popup.classList.add('active');
            })
        });

        closePopupButton.addEventListener('click',() => {
            popupBg.classList.remove('active');
            popup.classList.remove('active');
        });

        document.addEventListener('click', (e) => {
            if(e.target === popupBg) {
                popupBg.classList.remove('active');
                popup.classList.remove('active');
            }
        });
    })
    return(
        <div className="popup__bg popup__bg_signup">
            <div className="popup popup_signup">
                <svg className="close-popup_signup" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#2982ff" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
                </svg>
                <label>
                    <input type="text" name="name" style={{ color: 'white' }}
                           ref={userName}
                    />
                    <div className="label__text">
                        Name
                    </div>
                </label>
                <label>
                    <input type="text" name="name" style={{ color: 'white' }}
                           ref={userMail}
                    />
                    <div className="label__text">
                        Mail
                    </div>
                </label>
                <label>
                    <input type="text" name="name" style={{ color: 'white' }}
                           ref={userPassword}
                    />
                    <div className="label__text">
                        Password
                    </div>
                </label>
                <label>
                    <input type="text" name="name" style={{ color: 'white' }}
                           ref={userPassword2}
                    />
                    <div className="label__text">
                        Password verify
                    </div>
                </label>
                <button className='popup__button_ open-popup_verify' onClick={() => {
                    if (userPassword.current.value === userPassword2.current.value){
                        createUser({
                            name: userName.current.value,
                            mail: userMail.current.value,
                            country: 'ru',
                            password: userPassword.current.value
                        }, false).then(() => {
                            setTimeout(() => {
                                try {
                                    localStorage.setItem(`${(getCookie('verify-id'))}`, JSON.stringify({
                                        name: userName.current.value,
                                        phone: '000000000',
                                        mail: userMail.current.value,
                                        password: userPassword.current.value,
                                        country: 'ru'
                                    }))
                                    let popupBg = document.querySelector('.popup__bg_signup');
                                    let popup = document.querySelector('.popup_signup');
                                    popupBg.classList.remove('active');
                                    popup.classList.remove('active');
                                } catch (e) {

                                }
                            }, 1000)
                        });
                    }
                }
                }>
                    sign up
                </button>
            </div>
        </div>
    )
}

export function LayoutHostApp({ inner }){
    return(
        <>
            <HeaderServices inner={
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
    )
}