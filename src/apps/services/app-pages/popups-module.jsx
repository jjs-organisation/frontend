import React, {useEffect, useState} from "react";
import {getCookie} from "../../../server-api/using";

export default function GetAllPopups_PluginsServices() {
    function PopupPlugin_About() {

        useEffect(() => {
            let name;
            let popupBg = document.querySelector('.popup__bg_plugin-about');
            let popup = document.querySelector('.popup_plugin-about');
            let openPopupButtons = document.querySelectorAll('.open-popup_plugin-about');
            let closePopupButton = document.querySelector('.close-popup_plugin-about');

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
        }, [])
        return(
            <div className="popup__bg popup__bg_plugin-about">
                <div className="popup popup_plugin-about">
                    <svg className="close-popup_plugin-about" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#2982ff" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
                    </svg>
                    <label style={{ height: "100%" }} className='label__wrapper'>
                        {/*<div className="label__text">*/}
                        {/*    About {`\$\{plugin_name\}`}*/}
                        {/*</div>*/}
                        <div className='label__text__about__description'>
                            <div className='label__text__about__description-r' id='label__text__about__description-r'>
                                I see, using grid as a style for the code's CSS aspects indeed worked like a charm!
                                I should have covered the rendered components inside a "container-like" entity,
                                such as the div which you applied grid upon it as a style.
                                My version lacked any kind of divs/containers since it was only directly
                                rendered plainlyI see, using grid as a style for the code's CSS aspects
                                indeed worked like a charm! I should have covered the rendered components
                                inside a "container-like" entity, such as the div which you applied grid upon
                                it as a style. My version lacked any kind of divs/containers since it was only
                                directly rendered plainlyI see, using grid as a style for the code's CSS aspects
                                indeed worked like a charm! I should have covered the rendered components inside
                                a "container-like" entity, such as the div which you applied grid upon it as a style.
                                My version lacked any kind of divs/containers since it was only directly rendered plainlyI see,
                                using grid as a style for the code's CSS aspects indeed worked like a charm! I should have
                                covered the rendered components inside a "container-like" entity, such as the div which you
                                applied grid upon it as a style. My version lacked any kind of divs/containers since it was
                                only directly rendered plainly
                            </div>
                            <div className='label__text__about__description-l'>
                                {/*// TODO: FInish that shit*/}
                                <div className='label__icon__description-l' id='label__icon__description-l'/>
                                <button className='label__text__about__description-l-button'
                                id='button_install-about'>
                                    Install
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className='label__text__about__caption' id='label__text__about__caption'>
                                Caption
                            </div>
                            <div className='label__text__about__version' id='label__text__about__version'>
                                1.1.1
                            </div>
                        </div>
                    </label>
                    <span style={{ fontSize: 12 }}>  </span>
                </div>
            </div>
        )
    }

    return(
        <>
            <PopupPlugin_About />
        </>
    )
}