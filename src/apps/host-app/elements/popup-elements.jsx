import {forwardRef, useEffect, useRef} from "react";
import {createProject, createUser, getCookie, logIn, payment, stringify} from "../../../server-api/using";
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

function genBillId() {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 8) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
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
    const paymentAmount = useRef(null),
        paymentMail = useRef(null),
        paymentPhone = useRef(null);

    async function paymentAccount(){
        await payment({
            amount: paymentAmount.current.value ,
            login: 'r-piskarevpro_see-api',
            password: 'r-piskarevpro_see*?1',
            orderid: genBillId()
        }, function (res) {
            console.log(res)
            return res.formUrl;
        })
    }

    return(
        <div className='pop-1'>
            <span className='pop-6'> Payment </span>
            <form className='pop-2'>
                <div>
                    <div className='pop-5'>
                        <div className='pop-6'>Amount</div>
                        <input type='text' className='pop-3' ref={paymentAmount}/>
                    </div>
                    <div className='pop-5'>
                        <div className='pop-6'>Email</div>
                        <input type='text' className='pop-3' ref={paymentMail}/>
                    </div>
                    <div className='pop-5'>
                        <div className='pop-6'>Telephone</div>
                        <input type='text' className='pop-3' ref={paymentPhone}/>
                    </div>
                </div>
                <div>
                    <input type='button' className='pop-4' value='Purchase'
                        onClick={() => {
                            paymentAccount().then(v => {
                                // window.location.replace(v)
                            })
                        }}
                    />
                    <input type='button' className='pop-4' value='Close' onClick={() => {
                        try {
                            document.getElementById(id).classList.add('popup-settings-hide')
                            document.getElementById(id).classList.remove('popup-settings-show')
                        }catch (e) {}
                    }}/>
                </div>
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
                        }catch (e) {}
                    }}/>
                </>
            </form>
        </div>
    )
}

export function PopupUploadFiles({ id }){
    let dropArea = document.getElementById('drop-area')
    function handleDrop(e) {
        let dt = e.dataTransfer
        let files = dt.files

        handleFiles(files)
    }
    function handleFiles(files) {
        ([...files]).forEach(uploadFile)
    }
    async function uploadFile(file) {
        let url = `http://localhost:3000/files/upload/${getCookie('user-id')}/${getCookie('project-id')}/`
        let xhr = new XMLHttpRequest()
        let formData = new FormData()
        xhr.open('POST', url, true)
        await formData.append('file', file)
        await xhr.send(formData)
        xhr.onload = () => {
            if (xhr.response === false) {
                console.log('error when tries upload files')
            } else {
                console.log('no error when tries upload files, fucking good staff')
            }
        }
    }

    return(
        <div className='pop-1'>
            <form className='pop-2'>
                <>
                    <div id="drop-area" onDrop={() => handleDrop} className='pop-8'>
                        <form className="pop-9" name='upload-form'>
                            <input type="file" id="fileElem" multiple accept="image/*" onChange={
                                e => handleFiles(e.target.files)
                            } />
                            <label className="button" htmlFor="fileElem">Select some files</label>
                        </form>
                    </div>
                </>
                <>
                    <input type='button' className='pop-4' value='Close' onClick={() => {
                        document.cookie=`project-id=null`
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
                           }, function (res) {
                               if (res)
                                   console.log(res)
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