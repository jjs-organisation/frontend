import { useState } from 'react';
// @ts-ignore
import {cssDefaultTemplate2, htmlDefaultTemplate2, jsDefaultTemplate} from './config.ts';
// @ts-ignore
import { Context } from './context.ts';
// @ts-ignore
import useLocalStorage from './hooks/local.tsx';
import { Layout } from './layout/layout.jsx';
// @ts-ignore
import EditorHeader from './layout/header.jsx';
import { IState } from './model';
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const initialState: IState = {
    html: htmlDefaultTemplate2,
    css: cssDefaultTemplate2,
    javascript: jsDefaultTemplate,
    theme: 'dark',
};

const headerElements = () => (
    <>
        <a href="/">to main page</a>
    </>
)

function Editor() {
    const [state, dispatch] = useLocalStorage('state', initialState);
    return (
        <div className="App">
            <EditorHeader inner={headerElements} />
            <main className='editor-main'>
                <Context.Provider value={{ state, dispatch }}>
                    <Layout />
                </Context.Provider>
            </main>
        </div>
    );
}

export default Editor;