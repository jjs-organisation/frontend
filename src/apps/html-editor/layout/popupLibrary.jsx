import React, {useEffect, useRef, useState} from 'react';
import {
    createProject,
    saveProject,
    loadProject,
    getCookie,
    getProjects,
    getUserData,
    getAllPlugins,
    getPluginImage,
    CleanUpCache, getPluginCode, getInstalledPlugins, DeleteAllPlugins
} from "../../../server-api/using";
import {
    cssDefaultTemplate,
    cssDefaultTemplate2,
    editor_themes,
    htmlDefaultTemplate,
    htmlDefaultTemplate2,
    jsDefaultTemplate
} from "../config";
import { IState, editorState } from '../model.tsx';
import {useLocation} from "react-router-dom";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function createProjectPopup(pname){
    createProject({
        project_name: pname.current.value
    }, function (result) {
        if (result === true)
            console.log('project_created')
    }).then(() => setTimeout(() => window.location.reload(), 500 ))
}
function saveProjectPopup() {
    saveProject({
        proj_name: getCookie(`project-name`),
        code: {
            html: JSON.parse(localStorage.getItem(`ms-playground-state`)).html,
            css: JSON.parse(localStorage.getItem(`ms-playground-state`)).css,
            js: JSON.parse(localStorage.getItem(`ms-playground-state`)).javascript
        }
    }, function (result) {
        if (result === true)
            console.log('project saved');
    })
}

function popupLoadProject(name) {
    loadProject(name, function (cb) {
        if (cb) {
            localStorage.setItem(`ms-playground-state`,JSON.stringify({
                [Object.keys(cb.project_files[0])] : cb.project_files[0][Object.keys(cb.project_files[0])],
                [Object.keys(cb.project_files[1])] : cb.project_files[1][Object.keys(cb.project_files[1])],
                [Object.keys(cb.project_files[2])] : cb.project_files[2][Object.keys(cb.project_files[2])],
                theme: 'dark'
            }))
            document.cookie = `project-name=${name}; path=/;`;
            document.cookie = `project-id=${cb.project_id}; path=/;`; 
            window.location.reload()
        }
    })
}

export default function PopupLibrary() {
    function PopupCreateProject() {
        let projectName = useRef(null);
        useEffect(() => {
            let popupBg = document.querySelector('.popup__bg_create');
            let popup = document.querySelector('.popup_create');
            let openPopupButtons = document.querySelectorAll('.open-popup_create');
            let closePopupButton = document.querySelector('.close-popup_create');

            openPopupButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    popupBg.classList.add('active');
                    popup.classList.add('active');
                })
            });

            closePopupButton.addEventListener('click',() => {
                popupBg.classList.remove('active');
                popup.classList.remove('active');
            });

            document.addEventListener('click', (e) => {
                if(e.target === popupBg) {
                    popupBg.classList.remove('active');
                    popup.classList.remove('active');
                }
            });
        })
        return(
            <div className="popup__bg popup__bg_create">
                <div className="popup popup_create" onSubmit={() =>  submitFormAjax()}>
                    <svg className="close-popup_create" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#2982ff" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
                    </svg>
                    <label>
                        <input type="text" name="name" style={{ color: 'white' }} ref={projectName}/>
                        <div className="label__text">
                            Project name
                        </div>

                    </label>
                    <button className='popup__button_' onClick={
                        () => createProjectPopup(projectName)
                    }>
                        Create
                    </button>
                    <span style={{ fontSize: 12 }}> Current workspace will be saved! </span>
                </div>
            </div>
        )
    }
    function PopupSaveProject() {
        useEffect(() => {
            let popupBg = document.querySelector('.popup__bg_save');
            let popup = document.querySelector('.popup_save');
            let openPopupButtons = document.querySelectorAll('.open-popup_save');
            let closePopupButton = document.querySelector('.close-popup_save');

            openPopupButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    popupBg.classList.add('active');
                    popup.classList.add('active');
                })
            });

            closePopupButton.addEventListener('click',() => {
                popupBg.classList.remove('active');
                popup.classList.remove('active');
            });

            document.addEventListener('click', (e) => {
                if(e.target === popupBg) {
                    popupBg.classList.remove('active');
                    popup.classList.remove('active');
                }
            });
        })

        return(
            <div className="popup__bg popup__bg_save">
                <div className="popup popup_save">
                    <svg className="close-popup_save" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#2982ff" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
                    </svg>
                    <label>
                        <input type="text" name="name" style={{ color: 'white' }}
                            value={
                                !getCookie('project-name')
                                    ? 'Untiled project'
                                    : getCookie('project-name')
                            }
                        />
                        <div className="label__text">
                            Project name
                        </div>
                    </label>
                    <button className='popup__button_' onClick={() =>
                        saveProjectPopup()
                    }>
                        Save
                    </button>
                </div>
            </div>
        )
    }
    function PopupLoadProject() {
        let project_name = useRef(null);
        const [projectList, setProjectList] = useState([])

        useEffect(() => {
            async function getData(){
                await getProjects(function (res) {
                    if (res)
                        setProjectList(res)
                    console.log(res)
                })
            }
            getData()
        },[])

        const ProjectList = () => projectList.map((v,i) => (
            <option key={v.name+i}>{ v.name }</option>
        ))


        useEffect(() => {
            let popupBg = document.querySelector('.popup__bg_load');
            let popup = document.querySelector('.popup_load');
            let openPopupButtons = document.querySelectorAll('.open-popup_load');
            let closePopupButton = document.querySelector('.close-popup_load');

            openPopupButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    popupBg.classList.add('active');
                    popup.classList.add('active');
                })
            });

            closePopupButton.addEventListener('click',() => {
                popupBg.classList.remove('active');
                popup.classList.remove('active');
            });

            document.addEventListener('click', (e) => {
                if(e.target === popupBg) {
                    popupBg.classList.remove('active');
                    popup.classList.remove('active');
                }
            });
        })

        return(
            <div className="popup__bg popup__bg_load">
                <div className="popup popup_load">
                    <svg className="close-popup_load" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#2982ff" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
                    </svg>
                    <label>
                        <select name="name" style={{ color: 'white' }} ref={project_name}>
                            { <ProjectList/> }
                        </select>
                        <div className="label__text">
                            Project name
                        </div>
                    </label>
                    <button className='popup__button_' onClick={() => popupLoadProject(project_name.current.value)}>
                        Load
                    </button>
                </div>
            </div>
        )
    }
    function PopupPlugins() {
        const [pluginList, setPluginList] = useState([]);

        useEffect(() => {
            let popupBg = document.querySelector('.popup__bg_plugins');
            let popup = document.querySelector('.popup_plugins');
            let openPopupButtons = document.querySelectorAll('.open-popup_plugins');
            let closePopupButton = document.querySelector('.close-popup_plugins');

            const dataFetch = async () => {
                await getInstalledPlugins(function (res) {
                    if (res !== false){
                        setPluginList(res);
                    }else {
                        setPluginList([])
                    }
                    console.log(res)
                })
            };

            openPopupButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    popupBg.classList.add('active');
                    popup.classList.add('active');
                })
            });

            closePopupButton.addEventListener('click',() => {
                popupBg.classList.remove('active');
                popup.classList.remove('active');
            });

            document.addEventListener('click', (e) => {
                if(e.target === popupBg) {
                    popupBg.classList.remove('active');
                    popup.classList.remove('active');
                }
            });
            dataFetch()
        },[])

        function openPlugin(plugin_path) {
            document.cookie = `plugin-opened=${plugin_path};`
            getPluginCode(getCookie('plugin-opened'), function (res) {
                document.getElementById('editor-plugin-viewport')
                    .setAttribute('src', URL.createObjectURL(res))
                let popupBg = document.querySelector('.popup__bg_plugin-view');
                let popup = document.querySelector('.popup_plugin-view');
                popupBg.classList.add('active');
                popup.classList.add('active');
            })
        }

        function getPluginPicture(itemId, itemPath) {
            getPluginImage(itemPath, function (res) {
                let result = URL.createObjectURL(res);
                console.log(result);
                document.getElementById(itemId).setAttribute('style', `background-image: url(\'${result}\');
                background-position: center center;background-size: contain;`);
            })
        }

        const PluginListElement = () => pluginList.map((v,i) => (
            <>
                { getPluginPicture(`plugin-editor-${v.id}`, v.path) }
                <button name='name' className='pl-1' onClick={() => {
                    openPlugin(v.path)
                    document.getElementById('opened-plugin-name')
                        .innerHTML = getCookie('plugin-opened')
                }} style={{ marginBottom: 20 }}>
                    <div className='pl-1-1' id={`plugin-editor-${v.id}`}>

                    </div>
                    <div className='pl-1-2'>
                        { v.name }
                    </div>
                </button>
            </>
        ))

        return(
            <div className="popup__bg popup__bg_plugins">
                <div className="popup popup_plugins">
                    <svg className="close-popup_plugins" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#2982ff" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
                    </svg>
                    <label>
                        { <PluginListElement /> }
                        <div className="label__text">
                            Plugins
                        </div>
                    </label>
                    <label>
                        <button name='name' className='pl-1'>
                            Create own plugin
                        </button>
                        <div className="label__text">
                            Anything else?
                        </div>
                    </label>
                    <span style={{ fontSize: 12 }}> You can use any plugin from this list </span>
                </div>
            </div>
        )
    }

    function PopupUsePlugin() {
        let [pName,setPName] = useState(null)

        useEffect(() => {
            setPName(getCookie('plugin-opened'))
            let popupBg = document.querySelector('.popup__bg_plugin-view');
            let popup = document.querySelector('.popup_plugin-view');
            let openPopupButtons = document.querySelectorAll('.open-popup_plugin-view');
            let closePopupButton = document.querySelector('.close-popup_plugin-view');

            openPopupButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    popupBg.classList.add('active');
                    popup.classList.add('active');
                })
            });

            closePopupButton.addEventListener('click',() => {
                popupBg.classList.remove('active');
                popup.classList.remove('active');
            });

            document.addEventListener('click', (e) => {
                if(e.target === popupBg) {
                    popupBg.classList.remove('active');
                    popup.classList.remove('active');
                }
            });
        })
        return(
            <div className="popup__bg popup__bg_plugin-view">
                <div className="popup popup_plugin-view">
                    <svg className="close-popup_plugin-view" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#2982ff" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
                    </svg>
                    <label style={{ height: "100%" }}>
                        <>
                            <iframe id='editor-plugin-viewport'
                                    name='content-viewer'
                                    width='100%'
                                    height='100%'
                                    title='viewer'
                                    sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
                            />
                        </>
                        <div className="label__text" id='opened-plugin-name'/>
                    </label>
                    {/*<button className='popup__button_'>*/}
                    {/*    Close*/}
                    {/*</button>*/}
                    <span style={{ fontSize: 12 }}>  </span>
                </div>
            </div>
        )
    }

    function PopupEditorSettings() {
        let themesArray = editor_themes,
            editorTheme = useRef(null),
            editorClear = useRef(null),
            editorTemplate_LoadDefault = useRef(null)

        function saveEditorSettings(){
            let settings = {
                theme: editorTheme.current.value,
                clear: editorClear.current.checked,
                loadTemplate: editorTemplate_LoadDefault.current.checked
            }

            document.cookie = `editor-theme=${settings.theme}; path=/`
            if (settings.clear === true)
                localStorage.setItem('ms-playground-state',
                    JSON.stringify({
                        "html":"",
                        "css":"",
                        "javascript":""
                    }))

            if (settings.loadTemplate === true)
                localStorage.setItem('ms-playground-state',
                    JSON.stringify({
                        "html": htmlDefaultTemplate2,
                        "css": cssDefaultTemplate,
                        "javascript": jsDefaultTemplate
                    }))

            window.location.reload()
        }

        useEffect(() => {
            let popupBg = document.querySelector('.popup__bg_esettings');
            let popup = document.querySelector('.popup_esettings');
            let openPopupButtons = document.querySelectorAll('.open-popup_esettings');
            let closePopupButton = document.querySelector('.close-popup_esettings');

            openPopupButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    popupBg.classList.add('active');
                    popup.classList.add('active');
                })
            });

            closePopupButton.addEventListener('click',() => {
                popupBg.classList.remove('active');
                popup.classList.remove('active');
            });

            document.addEventListener('click', (e) => {
                if(e.target === popupBg) {
                    popupBg.classList.remove('active');
                    popup.classList.remove('active');
                }
            });
        })
        return(
            <div className="popup__bg popup__bg_esettings">
                <div className="popup popup_esettings">
                    <svg className="close-popup_esettings" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#2982ff" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
                    </svg>
                    <label>
                        <input type="checkbox" name="name" ref={editorClear} style={{ color: 'white' }}/>
                        <div className="label__text">
                            Clear editor
                        </div>
                    </label>
                    <label>
                        <input type="checkbox" name="name" ref={editorTemplate_LoadDefault} style={{ color: 'white' }}/>
                        <div className="label__text">
                            Load default template
                        </div>
                    </label>
                    <label>
                        <button type="button" name="name"  style={{ color: 'white' }} onClick={() => CleanUpCache()}>
                            Clear
                        </button>
                        <div className="label__text">
                            Clear all cookies and local storage
                        </div>
                    </label>
                    <label>
                        <button type="button" name="name"  style={{ color: 'white' }} onClick={() =>
                            DeleteAllPlugins().then(() => window.location.reload())}>
                            Delete
                        </button>
                        <div className="label__text">
                            Delete all plugins
                        </div>
                    </label>
                    <label>
                        <select className='h-9-00-9-e-c' ref={editorTheme}>
                            {
                                editor_themes.map((v,i) => (
                                    i === 0
                                        ?   <>
                                                <option selected> { v } </option>
                                            </>
                                        :   <>
                                                <option> { v } </option>
                                            </>

                                ))
                            }

                        </select>
                        <div className="label__text">
                            Editor theme
                        </div>
                    </label>
                    <button className='popup__button_' onClick={() => saveEditorSettings()}>
                        Apply
                    </button>
                    <span style={{ fontSize: 12 }}>  </span>
                </div>
            </div>
        )
    }
    return(
        <>
            <PopupLoadProject />
            <PopupSaveProject />
            <PopupCreateProject />
            <PopupPlugins />
            <PopupUsePlugin />
            <PopupEditorSettings />
        </>
    )
};

