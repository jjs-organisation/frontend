import {useEffect} from "react";

export default function Header({ inner }) {
    useEffect(() => {
        window.onwheel = e => {
            if(e.deltaY >= 0){
                document.getElementById('header-element')
                    .classList.add('header-animation-1-elem');
                document.getElementById('header-element')
                    .classList.remove('header-animation-2-elem');
            } else {
                document.getElementById('header-element')
                    .classList.add('header-animation-2-elem');
                document.getElementById('header-element')
                    .classList.remove('header-animation-1-elem');
            }
        }
    })
    return(
        <header id='header-element'>
            <div className="a1">
                <a href='/'>UniJS</a>
            </div>
            <div className="tl-1">
                { inner }
            </div>
        </header>
    )
}