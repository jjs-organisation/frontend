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

const initialState: IState = {
    html: htmlDefaultTemplate2,
    css: cssDefaultTemplate2,
    javascript: jsDefaultTemplate,
    theme: 'dark',
};

const projectInitial: editorState = {
    projectName: '',
    projectId  : '',
    projectType: ''
}

const headerElements = () => (
    <>
        <a href="/">to main page</a>
    </>
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
                {/*
                    <EditorHeader inner={headerElements} />
                    def header
                */}
                <div className='e-1'>
                    {
                        !getCookie('project-id')
                            ? <span className='e-2'> Untiled project </span>
                            : <span className='e-2'> { getCookie('project-name') } </span>
                    }
                    <input className='open-popup open-popup_create e-3' type="button" value='New project'
                        disabled={!getCookie('user-id')}
                    />
                    <input className='open-popup open-popup_save e-3' type="button" value='Save this project'
                        disabled={!getCookie('project-id')}
                    />
                    <input className='open-popup open-popup_load e-3' type="button" value='Load project'
                        disabled={!getCookie('user-id')}
                    />
                </div>
                <main className='editor-main'>
                    <Context.Provider value={{ state, dispatch }}>
                        <Layout />
                    </Context.Provider>
                </main>
            </div>
            <PopupLibrary />
        </>
    );
}

export default Editor;