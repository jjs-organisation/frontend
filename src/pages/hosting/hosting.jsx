import {useEffect} from "react";
import cursor1 from '../../static/cursor1.png';

export default function Hosting(){
    useEffect(() => {
        let ids = ['el-1','el-2','el-3','el-4'];
        ids.forEach(el => {
            document.getElementById(el).addEventListener('mouseenter', () =>
            slideAnim_1_enter(el))
        })
        ids.forEach(el => {
            document.getElementById(el).addEventListener('mouseleave', () =>
                slideAnim_1_leave(el))
        })
        function slideAnim_1_enter(e) {
            document.getElementById('el-a-' + e.slice(-1))
                .classList.add('b20-animation-slide-1')
            document.getElementById('el-a-' + e.slice(-1))
                .classList.remove('b20-animation-slide-2')
            console.log('1')
        }
        function slideAnim_1_leave(e) {
            document.getElementById('el-a-' + e.slice(-1))
                .classList.add('b20-animation-slide-2')
            document.getElementById('el-a-' + e.slice(-1))
                .classList.remove('b20-animation-slide-1')
            console.log('1')
        }
    },[])
    return(
        <>
            <div className='b1'>
                <span className='b2'> Use our hosting for your bot! </span>
                <span className='b3'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </span>
                <input type='button' value='About' className='b4'/>
            </div>
            <div className='b5' id='b5'>
                <span className='b2'>  About </span>
                <div className='b6'>
                    <div className='b7'>
                        <span className='b10'>Simple</span>
                    </div>
                    <div className='b8'>
                        <span className='b10'>Clear</span>
                    </div >
                    <div className='b9'>
                        <span className='b10'>Free</span>
                    </div>
                </div>
            </div>
            <div className='b11'>
                <div className='b12' id='b12'>
                    <span className='b13'> NodeJS API >_</span>
                    <div className='b18'>
                        <div className='b14' id='el-1'>
                            <div className='b20' id='el-a-1'>
                                <span className='b19'> APITEXT1 </span>
                                <span className='b21'>  Simple API for node,js </span>
                            </div>
                        </div>
                        <div className='b15' id='el-2'>
                            <div className='b20' id='el-a-2'>
                                <span className='b19'> APITEXT2 </span>
                                <span className='b21'>  Simple API for node,js </span>
                            </div>
                        </div>
                        <div className='b16' id='el-3'>
                            <div className='b20' id='el-a-3'>
                                <span className='b19'>  APITEXT3 </span>
                                <span className='b21'>  Simple API for node,js </span>
                            </div>
                        </div>
                        <div className='b17' id='el-4'>
                            <div className='b20' id='el-a-4'>
                                <span className='b19'> APITEXT4 </span>
                                <span className='b21'>  Simple API for node,js </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='b22'>
                <span className='b23'>
                    Use git to deploy your projects
                </span>
                <div className='b24'>
                    <span className='b25'>
                        > git remote add UniJS_Repository https://github.com/my-organisation/bot-repo.git <br/>
                        > git fetch<br/>
                        > git push bot refs/heads/master:refs/heads/main --set-upstream
                    </span>
                </div>
            </div>
            <div className='b26'>
                <span className='b27'>
                    Use app right now
                </span>
                <div className='b28'>
                    <a href='/host-app/index'> App </a>
                </div>
            </div>
            <footer className='b29'>
                <a className='b31' href='/'>
                    To main page
                </a>
            </footer>
            <div className='b30'>
                OOO "MOLDOVANE"
            </div>
        </>
    )
}