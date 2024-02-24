import React, {
    useEffect,
    useRef,
    useState
} from "react";
import {
    createPost,
    forumCreatePost,
    forumResponsePost,
    getThemes
} from "../../server-api/using";
import {useLocation} from "react-router-dom";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function popupShow(){
    let popupBg = document.querySelector('.popup__bg__createpost_forum');
    let popup = document.querySelector('.popup__createpost_forum');
    popupBg.classList.add('active');
    popup.classList.add('active');
}

export function Forum_PopupCreatePost(){
    const query = useQuery()

    let response = query.get('post-id'),
        postTitle = useRef(null),
        responseId = response ? response : '',
        [themeData, setThemeData] = useState([]),
        postTheme = useRef(null),
        postContent = useRef(null);

    useEffect(() => {
        const callData = async () => {
            await getThemes(function (res) {
                setThemeData(res)
            })
        }

        let popupBg = document.querySelector('.popup__bg__createpost_forum');
        let popup = document.querySelector('.popup__createpost_forum');
        let openPopupButtons = document.querySelectorAll('.open-popup__createpost_forum');
        let closePopupButton = document.querySelector('.close-popup__createpost_forum');

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

        callData()
    }, [],[])

    const ThemesObject = () => themeData.map((v, i) => (
        <option value={v.name} key={i}> {v.name} </option>
    ));

    return(
        <div className="popup__bg__createpost popup__bg__createpost_forum">
            <div className="popup__createpost popup__createpost_forum">
                <svg className="close-popup__createpost_forum" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#2982ff" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
                </svg>
                <label>
                    <input type="text" name="name" style={{ color: 'white' }} ref={postTitle}
                    />
                    <div className="label__text">
                        Title
                    </div>
                </label>
                {
                    responseId === ''
                        ?
                        <>
                            <label>
                                <select type="select" name="name" style={{ color: 'white' }} ref={postTheme}>
                                    <ThemesObject/>
                                </select>
                                <div className="label__text">
                                    Theme
                                </div>
                            </label>
                        </> : <></>
                }
                <label>
                    <textarea type="text" name="name" ref={postContent} style={{
                        color: 'white',
                        minHeight: 500
                    }}
                    />
                    <div className="label__text">
                        Content
                    </div>
                </label>
                <button className='popup__button__createpost_forum' onClick={
                    async () => await forumCreatePost(
                        postTitle.current.value,
                        responseId === ''
                            ? postTheme.current.value
                            : 'response'
                        ,
                        postContent.current.value,
                        responseId
                    ).then(() => window.location.reload())}>
                    publish
                </button>
            </div>
        </div>
    )
}