import React, {
    useEffect,
    useState
} from 'react';
import {
    deletePlugin,
    getAllPlugins,
    getInfoAboutPlugin,
    getInstalledPlugins,
    getPluginCode,
    getPluginImage,
    installPlugin
} from "../../../server-api/using";
import GetAllPopups_PluginsServices from "./popups-module";

export default function IndexPage(){
    const [plugins, setPlugins] = useState([]),
        [installedPlugins, setInstalledPlugins] = useState([]),
        [isInstalled, setIsInstalled] = useState(false)

    useEffect(() => {
        const DataFetch = async () => {
            await getAllPlugins(function (result) {
                setPlugins(result)
            })
            await getInstalledPlugins(function (res) {
                setInstalledPlugins(res)
            })
        }
        DataFetch()
    },[])

    function getImage(d) {
        getPluginImage(d, function (res) {
            let result = URL.createObjectURL(res);
            console.log(result);
            document.getElementById(d).setAttribute('style', `background-image: url(\'${result}\');
            background-position: top left;`);
        })
    }

    const openAboutWindow = async (path) => {
        await getInfoAboutPlugin(path,function (res) {
             const icon = document.getElementById('label__icon__description-l'),
                 desc = document.getElementById('label__text__about__description-r'),
                 ver = document.getElementById('label__text__about__version'),
                 capt = document.getElementById('label__text__about__caption'),
                 popupBg = document.querySelector('.popup__bg_plugin-about'),
                 button = document.getElementById('button_install-about'),
                 popup = document.querySelector('.popup_plugin-about');
             let parsed_icon = URL.createObjectURL(res.icon)


             console.log(installedPlugins)
             console.log(res.id)

             for(let element of installedPlugins){
                if (element.id === res.id){
                    setIsInstalled(true)
                    break;
                }
             }

             console.log(isInstalled)

             icon.setAttribute('style', `background-image: url(\'${parsed_icon}\');
             background-position: center top; background-size: contain; min-height: 446px;`);
             desc.innerHTML = ''; desc.innerHTML = res.text;
             ver.innerHTML = ''; ver.innerHTML = res.ver;
             capt.innerHTML = ''; capt.innerHTML = res.caption;
             button.innerHTML = '';

             isInstalled === true
                ? button.innerHTML = 'remove'
                : button.innerHTML = 'Install'

             isInstalled === true
                ? button.addEventListener('click',  () => {
                     button.innerHTML = 'Install'
                     deletePlugin(res.id)
                     getInstalledPlugins(function (res) {
                         setInstalledPlugins(res)
                     })
                })
                : button.addEventListener('click', () => {
                    button.innerHTML = 'remove'
                    installPlugin(res.id)
                    getInstalledPlugins(function (res) {
                        setInstalledPlugins(res)
                    })
                })
             popupBg.classList.add('active');
             popup.classList.add('active')
        })
    }

    const PluginsElement = () => plugins.map((v, i) => (
        <>
            { getImage(v.path) }
            <div className={ i === 0 ? 's4 s4-first-element' : 's4' } desc='card' key={v.name + '_' + v.version}>
                <div className='s4-card-img' id={v.path}> </div>
                <span className='s4-card-caption'>{v.name}</span>
                <br/>
                <span className='s4-card-caption'>{v.version}</span>
                <div className='s4-button-holder'>
                    <input type='button' className='s4-button-about open-popup_plugin-about' value='About'
                    onClick={() => openAboutWindow(v.path)}/>
                    <input type='button' className='s4-button-install' value='Install'
                    onClick={() => installPlugin(v.id)}/>
                </div>
            </div>
            { v % 4 === 0 ? <br /> : <></> }
        </>
    ));


    return(
        <>
            <div className='s1'>
                <div className='s2'>
                    <h1 className='s2-text-1'>
                        WebDevelopment tools
                    </h1>
                    <span className='s2-text-2'>
                        For any web product
                    </span>
                </div>
                <div className='s3'>
                    { <PluginsElement /> }
                </div>
            </div>
            <GetAllPopups_PluginsServices />
        </>
    )
}

/**?
 * <div className='s-6'>
 *                 <div className='s-7'>
 *                     <div className='s-13'>
 *                         <span className='s-9'>  Website navigation  </span>
 *                     </div>
 *                     <div className='s-8'>
 *                         <div className='s-10' desc='element of collection'>
 *                             <div className='s-12'>
 *                                 <span className='s-12-span'> Hosting service </span>
 *                             </div>
 *                             <div className='s-11'>
 *                                 <span className='s-11-span'>Hover to inspect</span>
 *                                 <div className='s-11-service-order s-11-widget-style-hosting' id='s-11-service-order'>
 *                                     <div className='s-11-prewidget'>
 *                                         <span className='s-11-prewidget-span'> Hosting for your projects with
 *                                             friendly-use Api on NodeJS
 *                                         </span>
 *                                         <br />
 *                                         <span className='s-11-prewidget-span-desc'> Some description </span>
 *                                     </div>
 *                                     <div className='s-11-widget'>
 *                                         <span className='s-11-widget-span'>
 *                                             Move to service
 *                                         </span>
 *                                         <a className='s-11-widget-a' href='/host-app/index' style={{
 *                                             color: 'white',
 *                                             marginRight: 50,
 *                                             fontSize: 32,
 *                                             textDecoration: 'none'
 *                                         }}>
 *                                             >
 *                                         </a>
 *                                     </div>
 *                                 </div>
 *                             </div>
 *                         </div>
 *                         <div className='s-10 s-10-mt open' desc='element of collection'>
 *                             <div className='s-12'>
 *                                 <span className='s-12-span'> HTML Editor </span>
 *                             </div>
 *                             <div className='s-11'>
 *                                 <span className='s-11-span'>Hover to inspect</span>
 *                                 <div className='s-11-service-order s-11-widget-style-htmleditor' id='s-11-service-order'>
 *                                     <div className='s-11-prewidget'>
 *                                         <span className='s-11-prewidget-span'> HTML Editor in web for your any idea</span>
 *                                         <br />
 *                                         <div className='s-11-prewidget-span-desc_holder'>
 *                                             <span className='s-11-prewidget-span-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </span>
 *                                         </div>
 *                                     </div>
 *                                     <div className='s-11-widget'>
 *                                         <span className='s-11-widget-span'>
 *                                             Move to service
 *                                         </span>
 *                                         <a className='s-11-widget-a' href='/services/htmleditor' style={{
 *                                             color: 'white',
 *                                             marginRight: 50,
 *                                             fontSize: 32,
 *                                             textDecoration: 'none'
 *                                         }}>
 *                                             >
 *                                         </a>
 *                                     </div>
 *                                 </div>
 *                             </div>
 *                         </div>
 *                         <div className='s-10 s-10-mt' desc='element of collection'>
 *                             <div className='s-12'>
 *                                 <span className='s-12-span'> Forum </span>
 *                             </div>
 *                             <div className='s-11'>
 *                                 <span className='s-11-span'>Hover to inspect</span>
 *                                 <div className='s-11-service-order s-11-widget-style-forum' id='s-11-service-order'>
 *                                     <div className='s-11-prewidget'>
 *                                         <span className='s-11-prewidget-span'> Just a forum for users </span>
 *                                         <br />
 *                                         <span className='s-11-prewidget-span-desc'> None more description </span>
 *                                     </div>
 *                                     <div className='s-11-widget'>
 *                                         <span className='s-11-widget-span'>
 *                                             Move to forum
 *                                         </span>
 *                                         <a className='s-11-widget-a' href='/forum' style={{
 *                                             color: 'white',
 *                                             marginRight: 50,
 *                                             fontSize: 32,
 *                                             textDecoration: 'none'
 *                                         }}>
 *                                             >
 *                                         </a>
 *                                     </div>
 *                                 </div>
 *                             </div>
 *                         </div>
 *                     </div>
 *                 </div>
 *             </div>
 *             <div className='s-14'>
 *                 <div className='s-15'>
 *                     Hosting
 *                 </div>
 *                 <div className='s-16'>
 *                     Hosting service to host your projects or app's from our servers
 *                 </div>
 *             </div>
 *             <div className='s-14'>
 *                 <div className='s-16'>
 *                     Free browser html-editor for small websites
 *                 </div>
 *                 <div className='s-15 s-15-second'>
 *                     HTML Editor
 *                 </div>
 *             </div>
 *             <div className='s-14'>
 *                 <div className='s-15'>
 *                     Order development
 *                 </div>
 *                 <div className='s-16'>
 *                     You can use this service to order development of your project!
 *                 </div>
 *             </div>
 * **/