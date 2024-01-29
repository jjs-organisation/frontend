import React from "react";
import cursor1 from './static/cursor1.png'
import Header from "./elements/header";
export default function Layout({ inner, Head }) {
    return(
        <>
            <Header inner={ Head } />
            <div className="a2">
                <main>
                    { inner }
                </main>
            </div>
        </>
    )
}