import { Dispatch, SetStateAction } from 'react';

export type EditorTheme = 'light'; // light

export interface IState {
    html: string;
    css: string;
    javascript: string;
}

export interface editorState {
    projectName: string;
    projectId  : string;
    projectType: string;
}

export interface IContext {
    state: IState;
    dispatch: Dispatch<SetStateAction<IState>>;
}