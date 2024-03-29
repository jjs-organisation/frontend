import React, {useEffect} from 'react';
import './elements/carousel1.css';

export default function Index() {
    useEffect(() => {

    }, [])
    return(
        <>
            <section className="a3">
                <div className="a4">
                    <div className="a5">
                        UniJS
                        <br />
                        <span style={{ color: 'white', fontSize: 20}}>
                            Universal JavaScript Solutions
                        </span>
                    </div>
                    <div className="a6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                </div>
                <div className="a7">
                    <div className="a8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                    <div className="a9">
                        >_Resources & Apps <br/> for your projects
                        <div className='a33'>
                        </div>
                    </div>
                </div>
            </section>
            <section className="a11">
                <div className="a12">
                    <div className="a18">
                        <div className="a22">
                            Dev webMap
                        </div>
                        <div className="a19">
                            <input type="button" className="but tb-1" style={{ color: 'black' }} value="More.."
                                   onClick={() => window.location.replace('services/')}/>
                        </div>
                    </div>
                </div>
                <div className="a12">
                    <div className="a20">
                        <text style={{
                            fontSize: 36
                        }}>Pages list:</text><br />
                        <span className='a23'>
                            <a href='/profile'> Profile *requires token* </a> <br/>
                            <a href='/host-app/index'> Hosting </a> <br />
                            <a href='/forum'> Forum </a> <br/>
                            <a href='/api'> API </a> <br />
                            <a href='/services'> Services [hosting, htmlEditor]</a>
                        </span>
                    </div>
                </div>
            </section>
            <span className='a35'>About project</span>
            <section className='a34' desc='about'>
                <div className="slider">
                    <input type="radio" name="slider" title="slide1" className="slider__nav"/>
                    <input type="radio" name="slider" title="slide2" className="slider__nav"/>
                    <input type="radio" name="slider" title="slide3" className="slider__nav"/>
                    <input type="radio" name="slider" title="slide4" className="slider__nav"/>
                    <div className="slider__inner">
                        <div className="slider__contents">
                            <div className='slider__inner__contents__holder'>
                                <i className="slider__image fa fa-codepen"/>
                                <h2 className="slider__caption">UniJS</h2>
                                <p className="slider__txt">Is a huge web-programming platform written using ReactJS,
                                which includes a huge variety of services and social apps!</p>
                            </div>
                        </div>
                        <div className="slider__contents">
                            <div className='slider__inner__contents__holder slider__inner__contents__holder--right'>
                                <i className="slider__image fa fa-newspaper-o"/>
                                <h2 className="slider__caption"> Forum, Hosting, WebEditor... </h2>
                                <p className="slider__txt">And more services you can find here </p>
                                <input type="button" className="but tb-1 tb-1-2" value="Browse more.."/>
                            </div>
                        </div>
                        <div className="slider__contents">
                            <div className='slider__inner__contents__holder'>
                                <i className="slider__image fa fa-television"/>
                                <h2 className="slider__caption">Join our team right now</h2>
                                <p className="slider__txt">We are waiting any summaries!</p>
                                <input type="button" className="but tb-1 tb-1-2" value="Find job..."/>
                            </div>
                        </div>
                        <div className="slider__contents">
                            <div className='slider__inner__contents__holder slider__inner__contents__holder--right'>
                                <i className="slider__image fa fa-diamond"/>
                                <h2 className="slider__caption">Sing in project today!</h2>
                                <p className="slider__txt">Registration 'll take a few minutes!</p>
                                <input type="button" className="but tb-1 tb-1-2" value="More.."/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='a38'>
                <div className='a38-1'>
                    <span className='a38-title'>
                        Subscribe our team
                    </span>
                    <br/>
                    <p className='a38-desc'>
                        Get our news in your email service
                    </p>
                </div>
                <div className='a38-2'>
                    <div className='a39'> Your mail address </div>
                    <div className='a41'>
                        <input type='text' className='a40' placeholder='email' id='735347268984-textbox' onChange={() => {
                            document.getElementById('735347268984-textbox').classList.remove('a40-bad-result')
                            document.getElementById('735347268984-textbox-wrong-result')
                                .innerHTML = ''
                        }}/>
                        {/*TODO: create sendMail(to backend) function*/}
                        <span id='735347268984-textbox-wrong-result' style={{ color: "red" }}> </span>
                        <input type='button' className='a42' value='send' onClick={() => {
                            if (!document.getElementById('735347268984-textbox').value){
                                document.getElementById('735347268984-textbox').classList.add('a40-bad-result')
                                document.getElementById('735347268984-textbox-wrong-result')
                                    .innerHTML = 'Value cant be empty'
                            }
                        }}/>
                    </div>
                </div>
            </section>
            <footer id="contacts" className='a26'>
                <div className='footer'>
                    <div className='footer-background'>
                        <div className='footer-text-wrapper'>
                            <div className='footer-text-elem-holder-1'>
                                <span className='footer-text-elem-2'> Universal JavaScript Solutions </span>
                                <span className='footer-text-elem-3'> Web Development Studio </span>
                            </div>
                            <div className='footer-text-elem-holder'>
                                <span className='footer-text-elem-2'> Services </span>
                                <span className='footer-text-elem-1'> Solutions </span>
                                <span className='footer-text-elem-1'> WebIDE </span>
                                <span className='footer-text-elem-1'> WebHTMLEditor </span>
                                <span className='footer-text-elem-1'> Hosting </span>
                            </div>
                            <div className='footer-text-elem-holder'>
                                <span className='footer-text-elem-2'> Community </span>
                                <span className='footer-text-elem-1'> Forum </span>
                            </div>
                            <div className='footer-text-elem-holder'>
                                <span className='footer-text-elem-2'> Company </span>
                                <span className='footer-text-elem-1'> Career </span>
                                <span className='footer-text-elem-1'> Freelance </span>
                            </div>
                        </div>
                        <div className='footer-line'/>
                        <div className='footer-contacts'>
                            Contact us
                            <div className='a27'>
                                <div className='a29'>
                                    <div className='a36'>
                                        <div className='a30'>
                                            <div className='a31'>
                                                <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 4C10.4178 4 8.87103 4.46919 7.55544 5.34824C6.23985 6.22729 5.21447 7.47672 4.60897 8.93853C4.00347 10.4003 3.84504 12.0089 4.15372 13.5607C4.4624 15.1126 5.22433 16.538 6.34315 17.6569C7.46197 18.7757 8.88743 19.5376 10.4393 19.8463C11.9911 20.155 13.5997 19.9965 15.0615 19.391C16.5233 18.7855 17.7727 17.7602 18.6518 16.4446C19.5308 15.129 20 13.5823 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4ZM15.93 9.48L14.62 15.67C14.52 16.11 14.26 16.21 13.89 16.01L11.89 14.53L10.89 15.46C10.8429 15.5215 10.7824 15.5715 10.7131 15.6062C10.6438 15.6408 10.5675 15.6592 10.49 15.66L10.63 13.66L14.33 10.31C14.5 10.17 14.33 10.09 14.09 10.23L9.55 13.08L7.55 12.46C7.12 12.33 7.11 12.03 7.64 11.83L15.35 8.83C15.73 8.72 16.05 8.94 15.93 9.48Z" fill="#000000"/>
                                                </svg>
                                                <span className='a32'>  </span>
                                            </div>
                                            <figcaption className='a31 back'>
                                                <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 4C10.4178 4 8.87103 4.46919 7.55544 5.34824C6.23985 6.22729 5.21447 7.47672 4.60897 8.93853C4.00347 10.4003 3.84504 12.0089 4.15372 13.5607C4.4624 15.1126 5.22433 16.538 6.34315 17.6569C7.46197 18.7757 8.88743 19.5376 10.4393 19.8463C11.9911 20.155 13.5997 19.9965 15.0615 19.391C16.5233 18.7855 17.7727 17.7602 18.6518 16.4446C19.5308 15.129 20 13.5823 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4ZM15.93 9.48L14.62 15.67C14.52 16.11 14.26 16.21 13.89 16.01L11.89 14.53L10.89 15.46C10.8429 15.5215 10.7824 15.5715 10.7131 15.6062C10.6438 15.6408 10.5675 15.6592 10.49 15.66L10.63 13.66L14.33 10.31C14.5 10.17 14.33 10.09 14.09 10.23L9.55 13.08L7.55 12.46C7.12 12.33 7.11 12.03 7.64 11.83L15.35 8.83C15.73 8.72 16.05 8.94 15.93 9.48Z" fill="#000000"/>
                                                </svg>
                                                <span className='a32 back'> @unijssupport </span>
                                            </figcaption>
                                        </div>
                                        <div className='a30'>
                                            <div className='a31'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="95" height="95" viewBox="0 0 50 50">
                                                    <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
                                                </svg>
                                                <span className='a32'>  </span>
                                            </div>
                                            <figcaption className='a31 back'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="95" height="95" viewBox="0 0 50 50">
                                                    <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
                                                </svg>
                                                <span className='a32 back'> twitter.com/unijsprofile </span>
                                            </figcaption>
                                        </div>
                                        <div className='a30'>
                                            <div className='a31'>
                                                <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18.59 5.88997C17.36 5.31997 16.05 4.89997 14.67 4.65997C14.5 4.95997 14.3 5.36997 14.17 5.69997C12.71 5.47997 11.26 5.47997 9.83001 5.69997C9.69001 5.36997 9.49001 4.95997 9.32001 4.65997C7.94001 4.89997 6.63001 5.31997 5.40001 5.88997C2.92001 9.62997 2.25001 13.28 2.58001 16.87C4.23001 18.1 5.82001 18.84 7.39001 19.33C7.78001 18.8 8.12001 18.23 8.42001 17.64C7.85001 17.43 7.31001 17.16 6.80001 16.85C6.94001 16.75 7.07001 16.64 7.20001 16.54C10.33 18 13.72 18 16.81 16.54C16.94 16.65 17.07 16.75 17.21 16.85C16.7 17.16 16.15 17.42 15.59 17.64C15.89 18.23 16.23 18.8 16.62 19.33C18.19 18.84 19.79 18.1 21.43 16.87C21.82 12.7 20.76 9.08997 18.61 5.88997H18.59ZM8.84001 14.67C7.90001 14.67 7.13001 13.8 7.13001 12.73C7.13001 11.66 7.88001 10.79 8.84001 10.79C9.80001 10.79 10.56 11.66 10.55 12.73C10.55 13.79 9.80001 14.67 8.84001 14.67ZM15.15 14.67C14.21 14.67 13.44 13.8 13.44 12.73C13.44 11.66 14.19 10.79 15.15 10.79C16.11 10.79 16.87 11.66 16.86 12.73C16.86 13.79 16.11 14.67 15.15 14.67Z" fill="#000000"/>
                                                </svg>
                                                <span className='a32'></span>
                                            </div>
                                            <figcaption className='a31 back'>
                                                <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18.59 5.88997C17.36 5.31997 16.05 4.89997 14.67 4.65997C14.5 4.95997 14.3 5.36997 14.17 5.69997C12.71 5.47997 11.26 5.47997 9.83001 5.69997C9.69001 5.36997 9.49001 4.95997 9.32001 4.65997C7.94001 4.89997 6.63001 5.31997 5.40001 5.88997C2.92001 9.62997 2.25001 13.28 2.58001 16.87C4.23001 18.1 5.82001 18.84 7.39001 19.33C7.78001 18.8 8.12001 18.23 8.42001 17.64C7.85001 17.43 7.31001 17.16 6.80001 16.85C6.94001 16.75 7.07001 16.64 7.20001 16.54C10.33 18 13.72 18 16.81 16.54C16.94 16.65 17.07 16.75 17.21 16.85C16.7 17.16 16.15 17.42 15.59 17.64C15.89 18.23 16.23 18.8 16.62 19.33C18.19 18.84 19.79 18.1 21.43 16.87C21.82 12.7 20.76 9.08997 18.61 5.88997H18.59ZM8.84001 14.67C7.90001 14.67 7.13001 13.8 7.13001 12.73C7.13001 11.66 7.88001 10.79 8.84001 10.79C9.80001 10.79 10.56 11.66 10.55 12.73C10.55 13.79 9.80001 14.67 8.84001 14.67ZM15.15 14.67C14.21 14.67 13.44 13.8 13.44 12.73C13.44 11.66 14.19 10.79 15.15 10.79C16.11 10.79 16.87 11.66 16.86 12.73C16.86 13.79 16.11 14.67 15.15 14.67Z" fill="#000000"/>
                                                </svg>
                                                <span className='a32 back'> 中國他媽的#3622 </span>
                                            </figcaption>
                                        </div>
                                        <div className='a30'>
                                            <div className='a31'>
                                                <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 4.25H5C4.53668 4.25263 4.09309 4.43784 3.76546 4.76546C3.43784 5.09309 3.25263 5.53668 3.25 6V18C3.25263 18.4633 3.43784 18.9069 3.76546 19.2345C4.09309 19.5622 4.53668 19.7474 5 19.75H19C19.4633 19.7474 19.9069 19.5622 20.2345 19.2345C20.5622 18.9069 20.7474 18.4633 20.75 18V6C20.7474 5.53668 20.5622 5.09309 20.2345 4.76546C19.9069 4.43784 19.4633 4.25263 19 4.25ZM5 5.75H19C19.0663 5.75 19.1299 5.77634 19.1768 5.82322C19.2237 5.87011 19.25 5.9337 19.25 6V7.54L12 11.16L4.75 7.54V6C4.75 5.9337 4.77634 5.87011 4.82322 5.82322C4.87011 5.77634 4.9337 5.75 5 5.75ZM19 18.25H5C4.9337 18.25 4.87011 18.2237 4.82322 18.1768C4.77634 18.1299 4.75 18.0663 4.75 18V9.21L11.66 12.67C11.7656 12.7228 11.882 12.7503 12 12.7503C12.118 12.7503 12.2344 12.7228 12.34 12.67L19.25 9.21V18C19.25 18.0663 19.2237 18.1299 19.1768 18.1768C19.1299 18.2237 19.0663 18.25 19 18.25Z" fill="#000000"/>
                                                </svg>
                                                <span className='a32'>  </span>
                                            </div>
                                            <figcaption className='a31 back'>
                                                <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 4.25H5C4.53668 4.25263 4.09309 4.43784 3.76546 4.76546C3.43784 5.09309 3.25263 5.53668 3.25 6V18C3.25263 18.4633 3.43784 18.9069 3.76546 19.2345C4.09309 19.5622 4.53668 19.7474 5 19.75H19C19.4633 19.7474 19.9069 19.5622 20.2345 19.2345C20.5622 18.9069 20.7474 18.4633 20.75 18V6C20.7474 5.53668 20.5622 5.09309 20.2345 4.76546C19.9069 4.43784 19.4633 4.25263 19 4.25ZM5 5.75H19C19.0663 5.75 19.1299 5.77634 19.1768 5.82322C19.2237 5.87011 19.25 5.9337 19.25 6V7.54L12 11.16L4.75 7.54V6C4.75 5.9337 4.77634 5.87011 4.82322 5.82322C4.87011 5.77634 4.9337 5.75 5 5.75ZM19 18.25H5C4.9337 18.25 4.87011 18.2237 4.82322 18.1768C4.77634 18.1299 4.75 18.0663 4.75 18V9.21L11.66 12.67C11.7656 12.7228 11.882 12.7503 12 12.7503C12.118 12.7503 12.2344 12.7228 12.34 12.67L19.25 9.21V18C19.25 18.0663 19.2237 18.1299 19.1768 18.1768C19.1299 18.2237 19.0663 18.25 19 18.25Z" fill="#000000"/>
                                                </svg>
                                                <span className='a32 back'> support@unijs.ru </span>
                                            </figcaption>
                                        </div>
                                    </div>
                                    <div className='a37'> Copyright © 2024 UniversalJS </div>
                                </div>
                                <div className='footer-foot'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}