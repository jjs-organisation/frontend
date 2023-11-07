function dropHandler(ev) {
    console.log("File(s) dropped");
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        [...ev.dataTransfer.items].forEach((item, i) => {
            if (item.kind === "file") {
                const file = item.getAsFile();
                console.log(`… file[${i}].name = ${file.name}`);
            }
        });
    } else {
        [...ev.dataTransfer.files].forEach((file, i) => {
            console.log(`… file[${i}].name = ${file.name}`);
        });
    }
}

function dragOverHandler(ev) {
    console.log("File(s) in drop zone");
    ev.preventDefault();
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
export function PopupSignUp({ id }){
    return(
        <div className='pop-1'>
            <span className='pop-6'> Sign up </span>
            <form className='pop-2'>
                <>
                    <div className='pop-5'>
                        <div className='pop-6'>Name</div>
                        <input type='text' className='pop-3' />
                    </div>
                    <div className='pop-5'>
                        <div className='pop-6'>Email</div>
                        <input type='text' className='pop-3'/>
                    </div>
                    <div className='pop-5'>
                        <div className='pop-6'>Password</div>
                        <input type='text' className='pop-3' />
                    </div>
                </>
                <>
                    <input type='button' className='pop-4' value='Purchase'/>
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
    return(
        <div className='pop-1'>
            <span className='pop-6'> Log in </span>
            <form className='pop-2'>
                <>
                    <div className='pop-5'>
                        <div className='pop-6'>Name or Email</div>
                        <input type='text' className='pop-3' />
                    </div>
                    <div className='pop-5'>
                        <div className='pop-6'>Password</div>
                        <input type='text' className='pop-3'/>
                    </div>
                </>
                <>
                    <input type='button' className='pop-4' value='Purchase'/>
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