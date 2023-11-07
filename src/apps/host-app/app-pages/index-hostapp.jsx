import { Outlet } from 'react-router';
import {PopupLogIn, PopupUploadFiles} from "../elements/popup-elements";
import Popup from "./popup";
export default function IndexHostApp({ state }){

    const stateBox = () => {
        switch (state) {
            case 'l': {
                document.getElementById('c-8').classList.remove('c-8-error')
                document.getElementById('c-8').classList.remove('c-8-stopped')
                document.getElementById('c-8').classList.remove('c-8-running')
                document.getElementById('c-8').classList.add('c-8-launch')
                document.getElementById('c-8').innerText = 'запуск..'
            }
            case 'r': {
                document.getElementById('c-8').classList.remove('c-8-error')
                document.getElementById('c-8').classList.remove('c-8-stopped')
                document.getElementById('c-8').classList.add('c-8-running')
                document.getElementById('c-8').classList.remove('c-8-launch')
                document.getElementById('c-8').innerText = 'запущено'
            }
            case 's': {
                document.getElementById('c-8').classList.remove('c-8-error')
                document.getElementById('c-8').classList.add('c-8-stopped')
                document.getElementById('c-8').classList.remove('c-8-running')
                document.getElementById('c-8').classList.remove('c-8-launch')
                document.getElementById('c-8').innerText = 'остановлено'
            }
            case 'e': {
                document.getElementById('c-8').classList.add('c-8-error')
                document.getElementById('c-8').classList.remove('c-8-stopped')
                document.getElementById('c-8').classList.remove('c-8-running')
                document.getElementById('c-8').classList.remove('c-8-launch')
                document.getElementById('c-8').innerText = 'ошибка'
            }
            default:{
                document.getElementById('c-8').classList.remove('c-8-error')
                document.getElementById('c-8').classList.add('c-8-stopped')
                document.getElementById('c-8').classList.remove('c-8-running')
                document.getElementById('c-8').classList.remove('c-8-launch')
                document.getElementById('c-8').innerText = 'остановлено'
            }
        }
    }

    const PopupShowHide = (id) => {
        if (document.getElementById(id).classList.contains('popup-settings-show')){
            document.getElementById(id).classList.remove('popup-settings-show')
            document.getElementById(id).classList.add('popup-settings-hide')
        }else {
            document.getElementById(id).classList.remove('popup-settings-hide')
            document.getElementById(id).classList.add('popup-settings-show')
        }
    }

    return(
        <>
            <div className='ha-index'>
                <div className='c-1 c-1-show' id='c-1'>
                    <span className='c-11'> Сервера </span>
                    <div className='c-15'>
                        <div className='c-12'>
                            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="60px" height="64px"><path d="M 15.994141 3 C 15.629141 3 15.264219 3.0895313 14.949219 3.2695312 L 5.0390625 8.9902344 C 4.3990625 9.3602344 4 10.060781 4 10.800781 L 4 21.179688 C 4 21.929688 4.3990625 22.620234 5.0390625 22.990234 L 7.640625 24.490234 C 8.900625 25.110234 9.3499219 25.109375 9.9199219 25.109375 C 11.789922 25.109375 12.859375 23.979531 12.859375 22.019531 L 12.859375 11.310547 C 12.859375 11.150547 12.730312 11.019531 12.570312 11.019531 L 11.320312 11.019531 C 11.150313 11.019531 11.029297 11.150547 11.029297 11.310547 L 11.029297 22.009766 C 11.029297 22.889766 10.120391 23.749531 8.6503906 23.019531 L 5.9296875 21.449219 C 5.8296875 21.399219 5.7695313 21.289687 5.7695312 21.179688 L 5.7695312 10.810547 C 5.7695312 10.690547 5.8296875 10.589297 5.9296875 10.529297 L 15.839844 4.8105469 C 15.929844 4.7505469 16.050391 4.7505469 16.150391 4.8105469 L 26.060547 10.529297 C 26.160547 10.589297 26.220703 10.690781 26.220703 10.800781 L 26.220703 21.179688 C 26.220703 21.289687 26.160313 21.399219 26.070312 21.449219 L 16.150391 27.179688 C 16.060391 27.229688 15.929844 27.229688 15.839844 27.179688 L 13.289062 25.669922 C 13.219062 25.619922 13.120781 25.610391 13.050781 25.650391 C 12.340781 26.050391 12.210781 26.100078 11.550781 26.330078 C 11.390781 26.380078 11.140625 26.479766 11.640625 26.759766 L 14.949219 28.720703 C 15.269219 28.900703 15.630234 29 15.990234 29 C 16.360234 29 16.719062 28.900703 17.039062 28.720703 L 26.960938 22.990234 C 27.600938 22.620234 28 21.929688 28 21.179688 L 28 10.810547 C 28 10.060547 27.600938 9.37 26.960938 9 L 17.039062 3.2695312 C 16.724063 3.0895313 16.359141 3 15.994141 3 z M 18.660156 11.005859 C 15.830156 11.005859 14.140625 12.205078 14.140625 14.205078 C 14.140625 16.375078 15.819062 16.974141 18.539062 17.244141 C 21.789062 17.564141 22.039062 18.045547 22.039062 18.685547 C 22.039062 19.785547 21.150547 20.255859 19.060547 20.255859 C 16.430547 20.255859 15.850156 19.594922 15.660156 18.294922 C 15.640156 18.154922 15.520859 18.054688 15.380859 18.054688 L 14.089844 18.054688 C 13.929844 18.054688 13.810547 18.185938 13.810547 18.335938 C 13.810547 20.005937 14.720547 21.994141 19.060547 21.994141 C 22.200547 21.994141 24 20.755703 24 18.595703 C 24 16.455703 22.549766 15.884609 19.509766 15.474609 C 16.419766 15.074609 16.109375 14.864531 16.109375 14.144531 C 16.109375 13.544531 16.380156 12.755859 18.660156 12.755859 C 20.690156 12.755859 21.449766 13.194453 21.759766 14.564453 C 21.789766 14.694453 21.899062 14.794922 22.039062 14.794922 L 23.330078 14.794922 C 23.410078 14.794922 23.479063 14.755313 23.539062 14.695312 C 23.589062 14.645313 23.619375 14.564609 23.609375 14.474609 C 23.409375 12.114609 21.840156 11.005859 18.660156 11.005859 z"/></svg>
                            <span className='c-13'> NodeJS </span>
                        </div>
                        <div className='c-12'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="50" fill="currentColor"
                                 className="bi bi-filetype-jsx" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                      d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.075 14.841a1.13 1.13 0 0 0 .401.823c.13.108.288.192.478.252.19.061.411.091.665.091.338 0 .624-.053.858-.158.237-.105.416-.252.54-.44a1.17 1.17 0 0 0 .187-.656c0-.224-.045-.41-.135-.56a1.001 1.001 0 0 0-.375-.357 2.027 2.027 0 0 0-.565-.21l-.621-.144a.97.97 0 0 1-.405-.176.37.37 0 0 1-.143-.299c0-.156.061-.284.184-.384.125-.101.296-.152.513-.152.143 0 .266.023.37.068a.624.624 0 0 1 .245.181.56.56 0 0 1 .12.258h.75a1.092 1.092 0 0 0-.199-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.552.05-.776.15-.225.099-.4.24-.528.421-.127.182-.19.395-.19.639 0 .201.04.376.123.524.082.149.199.27.351.367.153.095.332.167.54.213l.618.144c.207.049.36.113.462.193a.387.387 0 0 1 .153.326.512.512 0 0 1-.085.29.559.559 0 0 1-.255.193c-.111.047-.249.07-.413.07-.117 0-.224-.013-.32-.04a.837.837 0 0 1-.248-.115.578.578 0 0 1-.255-.384h-.765ZM0 14.791c0 .165.027.32.082.466.055.147.136.277.243.39.11.113.245.202.407.267.164.062.354.093.569.093.42 0 .748-.115.984-.346.238-.23.358-.565.358-1.004v-2.725h-.791v2.745c0 .201-.046.357-.138.466-.092.11-.233.164-.422.164a.499.499 0 0 1-.454-.246.576.576 0 0 1-.073-.27H0Zm8.907-2.859H9.8l-1.274 2.007L9.78 15.93h-.908l-.85-1.415h-.035l-.853 1.415h-.861l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Z"/>
                            </svg>
                            <span className='c-13'> NodeJS + React </span>
                        </div>
                        <div className='c-12' onClick={() => console.log('sad')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="50" fill="currentColor"
                                 className="bi bi-filetype-html" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                      d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5Zm-9.736 7.35v3.999h-.791v-1.714H1.79v1.714H1V11.85h.791v1.626h1.682V11.85h.79Zm2.251.662v3.337h-.794v-3.337H4.588v-.662h3.064v.662H6.515Zm2.176 3.337v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596H9.93L8.79 11.85h-.805v3.999h.706Zm4.71-.674h1.696v.674H12.61V11.85h.79v3.325Z"/>
                            </svg>
                            <span className='c-13'> HTML web </span>
                        </div>
                        <div className='c-14' id='c-14' onClick={() => {
                            if (document.getElementById('c-1').classList.contains('c-1-hide')){
                                document.getElementById('c-1').classList.add('c-1-show')
                                document.getElementById('c-1').classList.remove('c-1-hide')
                                document.getElementById('c-14').innerText = 'Закрыть';
                            } else {
                                document.getElementById('c-1').classList.remove('c-1-show')
                                document.getElementById('c-1').classList.add('c-1-hide')
                                document.getElementById('c-14').innerText = '>';
                            }
                        }}> Закрыть </div>
                    </div>
                </div>
                <div className='c-2'>
                    <div className='c-3'>
                        <span className='c-5'>Host new project</span>
                        <input type='button' className='c-6' value='Deploy'/>
                        <input type='button' className='c-6' value='Обновить'/>
                    </div>
                    <div className='c-4'>
                        <div className='c-7'>
                            <div className='c-8 c-8-stopped' id='c-8'>
                                {() => stateBox()}
                            </div>
                            <span className='c-9'>
                            PROJECT_NAME
                        </span>
                            <input type='button' className='c-10' value='Upload files'
                                   onClick={() => PopupShowHide('popup4')} />
                        </div>
                    </div>
                </div>
            </div>
            <Popup id={'popup4'} popupPart={
                <PopupUploadFiles id={'popup4'}/>
            }/>
        </>
    )
}