import React from 'react';
import { Outlet } from 'react-router';
export default function NotFoundHostApp(){
    return(
        <>
            <div className='nf-1'>
                <div className='nf-2'>
                    <b> 404 Not found </b><br/>
                    <span> Page you want to open </span><br/>
                    <span> is not exists</span>
                </div>
                <div className='nf-3'>
                    <div className='nf-4'>
                        <span style={{
                            marginTop: 20,
                            fontSize: 32
                        }}> Fast redirect </span>
                        <a href='/'>> Main page </a>
                        <a href='/services'>> Services </a>
                        <a href='/profile'>> Profile </a>
                    </div>
                </div>
            </div>
        </>
    )
}