import React from 'react';
import Header from "../../elements/header";
export default function Layout({ inner, Head }) {
    return(
        <>
            <div className='p-00' style={{
                backgroundColor: '',
                width: '-webkit-fill-available',
                height: 'max-content'
            }}>
                <Header inner={ Head } />
                <div className='p-01'>
                    <main className='p-02'>
                        { inner }
                    </main>
                </div>
            </div>
        </>
    )
}