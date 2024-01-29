import React, {
    useEffect,
    useRef
} from "react";
import {
    createPost,
    getCookie
} from "../../../server-api/using";

export function PopupCreatePost(){
    let postTitle = useRef(null),
        postContent = useRef(null);

    useEffect(() => {
        let popupBg = document.querySelector('.popup__bg__createpost');
        let popup = document.querySelector('.popup__createpost');
        let openPopupButtons = document.querySelectorAll('.open-popup__createpost');
        let closePopupButton = document.querySelector('.close-popup__createpost');

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
    // <span className='h-9 open-popup__createpost'> Log in </span>
        <div className="popup__bg__createpost popup__bg__createpost">
            <div className="popup__createpost popup__createpost">
                <svg className="close-popup__createpost" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#2982ff" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
                </svg>
                <label>
                    <input type="text" name="name" style={{ color: 'white' }} ref={postTitle}
                    />
                    <div className="label__text">
                        Title
                    </div>
                </label>
                <label>
                    <textarea type="text" name="name" ref={postContent} style={{
                        color: 'white',
                        minHeight: 500
                    }}
                    />
                    <div className="label__text">
                        Content
                    </div>
                </label>
                <button className='popup__button__createpost' onClick={
                    async () => await createPost(
                        postTitle.current.value, postContent.current.value
                    )}>
                    publish
                </button>
            </div>
        </div>
    )
}

export function PopupUserSettings(){
    let sessionLifetime = useRef(null)

    useEffect(() => {
        let popupBg = document.querySelector('.popup__bg__user_settings');
        let popup = document.querySelector('.popup__user_settings');
        let openPopupButtons = document.querySelectorAll('.open-popup__user_settings');
        let closePopupButton = document.querySelector('.close-popup__user_settings');

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
        // <span className='h-9 open-popup__createpost'> Log in </span>
        <div className="popup__bg__user_settings"> {/* x2 */}
            <div className="popup__user_settings"> {/* x2 */}
                <svg className="close-popup__user_settings" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#2982ff" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
                </svg>
                <label>
                    <input type="text" name="name" style={{ color: 'white' }}
                    value={
                        !getCookie('user-name')
                            ? 'Name not found'
                            : getCookie('user-name')
                    }/>
                    <div className="label__text">
                        Profile name
                    </div>
                </label>
                <label>
                    <select name='session_lifetime_select' style={{
                        color: 'white'
                    }} ref={sessionLifetime}>
                        <option value="value1"> Day </option>
                        <option value="value2"> 1 week </option>
                        <option value="value3"> 1 month </option>
                        <option value="value2"> 3 month </option>
                        <option value="value3"> Unlimited </option>
                    </select>
                    <div className="label__text">
                        session lifetime
                    </div>
                </label>
                <button className='popup__button__user_settings' onClick={
                    () => setSettings()
                }>
                    publish
                </button>
            </div>
        </div>
    )
}

export function NoPosts() {
    return(
        <div className='p-019'>
            <span> Currently abandoned ... mb create one post? :^( </span>
        </div>
    )
}