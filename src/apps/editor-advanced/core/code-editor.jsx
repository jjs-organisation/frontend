import Editor from "@monaco-editor/react";
import {useState} from "react";

export function CodeEditor() {
    const [code, setCode] = useState(
        `function add(a, b) {\n  return a + b;\n}`
    );
    return (
        <>
            <Editor
                height="-webkit-fill-available"
                defaultLanguage="javascript"
                theme={"vs-dark"}
                defaultValue={code}
            />
        </>
    );
}