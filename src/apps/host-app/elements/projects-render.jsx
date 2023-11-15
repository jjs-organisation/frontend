import {getProjects, PopupShowHide, runProject} from "../../../server-api/using";
import {useEffect, useState} from "react";

export function ProjectsRender () {
    const [data, setData] = useState([]);

    useEffect(() => {
        const dataFetch = async () => {
            await getProjects(function (res) {
                if (res)
                    setData(res)
                console.log(res)
            })
        };
        dataFetch();
    }, []);


    let state
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
            default: {
                document.getElementById('c-8').classList.remove('c-8-error')
                document.getElementById('c-8').classList.add('c-8-stopped')
                document.getElementById('c-8').classList.remove('c-8-running')
                document.getElementById('c-8').classList.remove('c-8-launch')
                document.getElementById('c-8').innerText = 'остановлено'
            }
        }
    }

    const ProjectsList = () => data.map((item, i) => (
        <div className='c-7' key={item.name + '-' + i + '-' + item.id}>
            <div className='c-16'>
                <div className='c-8 c-8-stopped' id='c-8'>
                    {() => stateBox()}
                </div>
                <span className='c-9'>
                {item.name}
            </span>
            </div>
            <div className='c-17'>
                <input type='button' className='c-10' value='Upload files' projectId={item.id}
                       onClick={
                           () => {
                                PopupShowHide('popup4')
                                document.cookie=`project-id=${item.id}`
                           }}/>
                <input type='button' className='c-10' value='Start project' 
                       onClick={() => runProject(item.id, function (res) {
                           if (res === true)
                               console.log('running')
                       })}/>
                <input type='button' className='c-10' value='Delete project'
                       onClick={() => console.log('delete')}/>
            </div>
        </div>
    ))

    return (
        <ProjectsList />
    )
}