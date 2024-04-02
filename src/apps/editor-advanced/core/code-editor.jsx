import Editor from "@monaco-editor/react";
import {useEffect, useRef, useState} from "react";

export function CodeEditor({ source, fileEnd }) {
    const [code, setCode] = useState(source);
    const [language, setLanguage] = useState(fileEnd)
    const val = useRef(null);

    const supportedLanguages = {
        js: "javascript",
        html: "html",
        css: "css",
        ts: "typescript",
        msql: "mysql",
        sql: "sql",
        scss: "scss",
        less: "less",
        json: "json"
    }

    useEffect(() => {
        Object.keys(supportedLanguages).forEach((lang) => {
            if (fileEnd === lang)
                setLanguage(lang)
        })
    },[fileEnd])

    function saveEditedFileToStorage(editor) {
        localStorage.setItem('opened-file-current-value', editor)
    }

    return (
        <>
            {
                source === undefined || fileEnd === undefined
                    ? <></>
                    : <Editor height="100%"
                           defaultLanguage={language}
                           theme={"vs-dark"}
                           defaultValue={code}
                           onChange={saveEditedFileToStorage}
                    />
            }
        </>
    );
}