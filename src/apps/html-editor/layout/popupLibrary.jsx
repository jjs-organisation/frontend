import React, {useEffect, useRef, useState} from 'react';
import {
    createProject,
    saveProject,
    loadProject,
    getCookie, getProjects
} from "../../../server-api/using";
import { IState, editorState } from '../model.tsx';

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
    return(
        <>
            <PopupLoadProject />
            <PopupSaveProject />
            <PopupCreateProject />
        </>
    )
};

