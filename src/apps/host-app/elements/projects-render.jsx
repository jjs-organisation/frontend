import {PopupShowHide} from "../../../server-api/using";

export const ProjectsRender = ({ userId , state }) => {
  let data = [];

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

  return data.map((item, i) => (
      <div className='c-7' key={item.name + '-' + i}>
          <div className='c-8 c-8-stopped' id='c-8'>
              {() => stateBox()}
          </div>
          <span className='c-9'>
              PROJECT_NAME
          </span>
          <input type='button' className='c-10' value='Upload files'
                 onClick={() => PopupShowHide('popup4')} />
      </div>
  ))
}