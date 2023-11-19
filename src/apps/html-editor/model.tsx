import { Dispatch, SetStateAction } from 'react';

export type EditorTheme = 'light' | 'dark';

export interface IState {
    html: string;
    css: string;
    javascript: string;
    theme: EditorTheme;
}

export interface IContext {
    state: IState;
    dispatch: Dispatch<SetStateAction<IState>>;
}