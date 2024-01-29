import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context.ts';

export const PreviewPanel = () => {
    const { state } = useContext(Context);
    const [srcDoc, setSrcDoc] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            const srcDoc = `
        <html>
        <style> ${state.css}</style>
        <body>${state.html}</body>
        <script>${state.javascript}</script>
        </html>
      `;
            setSrcDoc(srcDoc);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [state.html, state.css, state.javascript]);

    return (
        <div className="p-3 border-bottom mx-1">
            <iframe
                srcDoc={srcDoc}
                title="output"
                sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
                width="100%"
                height="100%"
            />
        </div>
    );
};