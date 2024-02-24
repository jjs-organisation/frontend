import React from "react";
import MEditor from '@monaco-editor/react';
import { getCookie } from "../../../server-api/using";
import { useContext } from 'react';
import { editorOptions } from '../config.ts';
import { Context } from '../context.ts';
export const EditorPanel = () => {
    const { state, dispatch } = useContext(Context);

    return (
        <div className="h-100 py-1 position-relative">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link active rounded-0 px-5"
                        id="html"
                        data-bs-toggle="tab"
                        data-bs-target="#html-pane"
                        type="button"
                        role="tab"
                        aria-controls="html-pane"
                        aria-selected="true"
                    >
                        HTML
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link rounded-0 px-5"
                        id="css"
                        data-bs-toggle="tab"
                        data-bs-target="#css-pane"
                        type="button"
                        role="tab"
                        aria-controls="css-pane"
                        aria-selected="false"
                    >
                        CSS
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link rounded-0 px-5"
                        id="js"
                        data-bs-toggle="tab"
                        data-bs-target="#js-pane"
                        type="button"
                        role="tab"
                        aria-controls="js-pane"
                        aria-selected="false"
                    >
                        JS
                    </button>
                </li>
            </ul>
            <div className="tab-content h-100" id="myTabContent">
                <div
                    className="tab-pane fade show active h-100"
                    id="html-pane"
                    role="tabpanel"
                    aria-labelledby="html"
                    tabIndex={0}
                >
                    <MEditor
                        options={editorOptions}
                        theme={!getCookie('editor-theme')
                            ?'vs-dark'
                            :getCookie('editor-theme')}
                        height="100%"
                        defaultLanguage="html"
                        value={state.html}
                        onChange={(value) =>
                            dispatch((prevState) => ({
                                ...prevState,
                                html: value ? value : '',
                            }))
                        }
                    />
                </div>
                <div
                    className="tab-pane fade h-100"
                    id="css-pane"
                    role="tabpanel"
                    aria-labelledby="css"
                    tabIndex={0}
                >
                    <MEditor
                        options={editorOptions}
                        theme={!getCookie('editor-theme')
                            ?'vs-dark'
                            :getCookie('editor-theme')}
                        height="100%"
                        defaultLanguage="css"
                        value={state.css}
                        onChange={(value) =>
                            dispatch((prevState) => ({
                                ...prevState,
                                css: value ? value : '',
                            }))
                        }
                    />
                </div>
                <div
                    className="tab-pane fade h-100"
                    id="js-pane"
                    role="tabpanel"
                    aria-labelledby="js"
                    tabIndex={0}
                >
                    <MEditor
                        options={editorOptions}
                        theme={!getCookie('editor-theme')
                            ?'vs-dark'
                            :getCookie('editor-theme')}
                        height="100%"
                        defaultLanguage="javascript"
                        value={state.javascript}
                        onChange={(value) =>
                            dispatch((prevState) => ({
                                ...prevState,
                                javascript: value ? value : '',
                            }))
                        }
                    />
                </div>
            </div>
        </div>
    );
};