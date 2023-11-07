export default function Popup({ id, popupPart }){
    return(
        <div className="h-popup-1 popup-settings-hide" id={id}>
            <div className='h-inner-1'>
                { popupPart }
            </div>
        </div>
    )
}