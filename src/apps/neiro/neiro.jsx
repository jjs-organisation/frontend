import React from "react";
import {useRef} from "react";
import {stringify} from "../../server-api/using";

export default function Neiro(){
    const inputText = useRef(null),
        inputLearn = useRef(null);

    function learn() {
        let xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:3450/neiro/learn/'
            , true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'json';
        xhr.send(stringify({
            query: inputLearn.current.value
        }))
        xhr.onload = async () => {
            if (xhr.status !== 200) {
                console.log(`err`)
            } else {
                await xhr.response
                alert(xhr.response.r)
                console.log(xhr.response)
            }
        };
    }

    function request() {
        let xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:3450/neiro/request'
            , true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'json';
        xhr.send(stringify({
            query: inputText.current.value
        }))
        xhr.onload = async () => {
            if (xhr.status !== 200) {
                console.log(`err`)
            } else {
                await xhr.response
                document.getElementById('n-res').value = xhr.response.r
            }
        };
    }

    return(
        <div className='n-1'>
            <textarea type='text' id='n-learn' rows='50' placeholder='learn' className='n-2' ref={inputLearn} desc='input-learn'/>
            <textarea type='text' id='n-req' rows='50' placeholder='request' className='n-2' ref={inputText} desc='input'/>
            <textarea type='text' id='n-res' rows='50' placeholder='result' className='n-2' desc='output'/>
            <input type='button' className='n-3' desc='learn' value='learn' onClick={() =>
                learn()
            }/>
            <input type='button' className='n-3' desc='run' value='run' onClick={() =>
                request()
            }/>
        </div>
    )
}