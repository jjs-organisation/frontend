import {forwardRef, useRef} from "react";
import {createProject, createUser, getCookie, logIn, stringify} from "../../../server-api/using";
import {useState} from "react";

async function createAccount(popupId, signUpName, signUpEmail, signUpPhone, signUpPassword) {
    let data = {
        name: signUpName,
        mail: signUpEmail,
        phone: signUpPhone,
        password: signUpPassword,
        country: 'ru'
    }
    await createUser(data, function (r) {
        console.log(r)
        if (r === true){
            document.getElementById(popupId).classList.add('popup-settings-hide');
            document.getElementById(popupId).classList.remove('popup-settings-show');
        }
    });
}

async function loginInAccount(popupId, loginName, loginPassword) {
    let data = {
        name: loginName, // OR mail
        password: loginPassword,
    }
    await logIn(data, function (res) { // RETURNS ID
        console.log(getCookie('user-id'))
        if (res.r === false || res.r === 'error'){
            console.log('incorrect data')
        } else {
            document.cookie=`user-id=${res.r}`;
            document.getElementById(popupId).classList.add('popup-settings-hide');
            document.getElementById(popupId).classList.remove('popup-settings-show');
        }
    });
}

export function PopupPayment({ id }) {
    return(
        <div className='pop-1'>
            <span className='pop-6'> Payment </span>
            <form className='pop-2'>
                <>
                    <div className='pop-5'>
                        <div className='pop-6'>Amount</div>
                        <input type='text' className='pop-3' />
                    </div>
                    <div className='pop-5'>
                        <div className='pop-6'>Email</div>
                        <input type='text' className='pop-3'/>
                    </div>
                    <div className='pop-5'>
                        <div className='pop-6'>Telephone</div>
                        <input type='text' className='pop-3' />
                    </div>
                </>
                <>
                    <input type='button' className='pop-4' value='Purchase'/>
                    <input type='button' className='pop-4' value='Close' onClick={() => {
                        try {
                            document.getElementById(id).classList.add('popup-settings-hide')
                            document.getElementById(id).classList.remove('popup-settings-show')
                        }catch (e) {}
                    }}/>
                </>
            </form>
        </div>
    )
}
export function PopupSignUp ({ id }) {
    const signUpName = useRef(null),
        signUpEmail = useRef(null),
        signUpPassword = useRef(null),
        signUpPhone = useRef(null);

    return(
        <div className='pop-1'>
            <span className='pop-6'> Sign up </span>
            <form className='pop-2'>
                <>
                    <div className='pop-5'>
                        <div className='pop-6' >Name</div>
                        <input type='text' className='pop-3' ref={signUpName}/>
                    </div>
                    <div className='pop-5'>
                        <div className='pop-6'>Email</div>
                        <input type='text' className='pop-3' ref={signUpEmail}/>
                    </div>
                    <div className='pop-5'>
                        <div className='pop-6'>Password</div>
                        <input type='text' className='pop-3' ref={signUpPhone}/>
                    </div>
                    <div className='pop-5'>
                        <div className='pop-6'>Password</div>
                        <input type='text' className='pop-3' ref={signUpPassword}/>
                    </div>
                </>
                <>
                    <input type='button' className='pop-4' value='Sign Up' onClick={() =>
                        createAccount(
                            id,
                            signUpName.current.value,
                            signUpEmail.current.value,
                            signUpPhone.current.value,
                            signUpPassword.current.value
                        )
                    }/>
                    <input type='button' className='pop-4' value='Close' onClick={() => {
                        try {
                            document.getElementById(id).classList.add('popup-settings-hide')
                            document.getElementById(id).classList.remove('popup-settings-show')
                        }catch (e) {

                        }
                    }}/>
                </>
            </form>
        </div>
    )
}
export function PopupLogIn({ id }){
    const loginName = useRef(null),
            loginPassword = useRef(null);

    return(
        <div className='pop-1'>
            <span className='pop-6'> Log in </span>
            <form className='pop-2'>
                <>
                    <div className='pop-5'>
                        <div className='pop-6'>Name or Email</div>
                        <input type='text' className='pop-3' ref={loginName}/>
                    </div>
                    <div className='pop-5'>
                        <div className='pop-6'>Password</div>
                        <input type='text' className='pop-3' ref={loginPassword}/>
                    </div>
                </>
                <>
                    <input type='button' className='pop-4' value='Log in' onClick={() =>
                        loginInAccount(
                            id,
                            loginName.current.value,
                            loginPassword.current.value
                        )
                    }/>
                    <input type='button' className='pop-4' value='Close' onClick={() => {
                        try {
                            document.getElementById(id).classList.add('popup-settings-hide')
                            document.getElementById(id).classList.remove('popup-settings-show')
                        }catch (e) {

                        }
                    }}/>
                </>
            </form>
        </div>
    )
}

export function PopupUploadFiles({ id }){
    return(
        <div className='pop-1'>
            <div>
                <span></span>
                <span></span>
            </div>
            <form className='pop-2'>
                <>
                    {/*<div className='pop-7'*/}
                    {/*    id="drop_zone"*/}
                    {/*    onDrop={(event) => dropHandler(event)}*/}
                    {/*    onDragOver={(event) => dragOverHandler(event)}>*/}
                    {/*    <p>Drag one or more files to this <i>drop zone</i>.</p>*/}
                    {/*</div>*/}
                </>
                <>
                    <input type='button' className='pop-4' value='Upload'/>
                    <input type='button' className='pop-4' value='Close' onClick={() => {
                        try {
                            document.getElementById(id).classList.add('popup-settings-hide')
                            document.getElementById(id).classList.remove('popup-settings-show')
                        }catch (e) {

                        }
                    }}/>
                </>
            </form>
        </div>
    )
}
export function PopupCreateProject({ id }){
    const projectName = useRef(null);

    const getInitialState = () => {
        const value = "NodeJs";
        return value;
    };

    const [value, setValue] = useState(getInitialState);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className='pop-1'>
            <div>
                <span></span>
                <span></span>
            </div>
            <form className='pop-2'>
                <>
                    <div className='pop-5'>
                        <div className='pop-6'>Project Name</div>
                        <input type='text' className='pop-3' ref={projectName}/>
                    </div>
                    <div className='pop-5'>
                        <div className='pop-6'>Project type</div>
                        <select value={value} onChange={handleChange}>
                            <option value='NodeJS'> NodeJS </option>
                            <option value='React'> React </option>
                            <option value='HTML'> HTML </option>
                        </select>
                    </div>
                </>
                <>
                    <input type='button' className='pop-4' value='Create'
                           onClick={() => createProject({
                               name: projectName.current.value,
                               type: value
                           })}/>
                    <input type='button' className='pop-4' value='Close' onClick={() => {
                        try {
                            document.getElementById(id).classList.add('popup-settings-hide')
                            document.getElementById(id).classList.remove('popup-settings-show')
                        }catch (e) {}
                    }}/>
                </>
            </form>
        </div>
    )
}