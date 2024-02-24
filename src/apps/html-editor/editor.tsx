import { useState } from 'react';
// @ts-ignore
import React from 'react';
// @ts-ignore
import {cssDefaultTemplate2, htmlDefaultTemplate2, jsDefaultTemplate} from './config.ts';
// @ts-ignore
import { Context } from './context.ts';
// @ts-ignore
import useLocalStorage from './hooks/local.tsx';
import { Layout } from './layout/layout.jsx';
import PopupLibrary from './layout/popupLibrary.jsx'
import EditorHeader from './layout/header.jsx';
import { IState, editorState } from './model';
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {getCookie} from "../../server-api/using";
import {
    PopupLogin,
    PopupSignUp,
    PopupVerify
} from "../services/layout";

const initialState: IState = {
    html: htmlDefaultTemplate2,
    css: cssDefaultTemplate2,
    javascript: jsDefaultTemplate,
};

const projectInitial: editorState = {
    projectName: '',
    projectId  : '',
    projectType: ''
}

const headerElements = () => (
    <div className='e-1'>
        {
            !getCookie('user-id')
                ?   <>
                        <span className='e-2'> Sandbox </span>
                        <span className='h-9 open-popup_login h-9-editor' style={{
                            textTransform: 'uppercase'
                        }}> Log in </span>
                        <span className='h-9 open-popup_signup h-9-editor' style={{
                            textTransform: 'uppercase'
                        }}> Sign up </span>
                    </>
                :   <>
                        <input className='open-popup open-popup_create e-3' type="button" value='New project'
                               disabled={!getCookie('user-id')}
                        />
                        <input className='open-popup open-popup_save e-3' type="button" value='Save project'
                               disabled={!getCookie('project-id')}
                        />
                        <input className='open-popup open-popup_load e-3' type="button" value='Load project'
                               disabled={!getCookie('user-id')}
                        />
                        <input className='open-popup open-popup_plugins e-3' type="button" value='Plugins'
                               disabled={!getCookie('user-id')}
                        />
                        <input className='open-popup open-popup_esettings e-3' type="button" value='Settings'
                               disabled={!getCookie('user-id')}
                        />
                        {
                            !getCookie('project-id')
                                ? <span className='e-2'> Untiled project </span>
                                : <span className='e-2'> { getCookie('project-name') } </span>
                        }
                    </>
        }
        {/*<a href="/">to main page</a>*/}
    </div>
)

function Editor() {
    const [
        state, dispatch
    ] = useLocalStorage('state', initialState);
    const [
        state1, dispatch1
    ] = useLocalStorage('editorState', projectInitial);
    return (
        <>
            <div className="App">
                <EditorHeader Inner={headerElements} />
                <main className='editor-main'>
                    <Context.Provider value={{ state, dispatch }}>
                        <Layout />
                    </Context.Provider>
                </main>
            </div>
            <PopupLibrary />
            <PopupLogin  />
            <PopupSignUp />
            <PopupVerify />
        </>
    );
}

export default Editor;