import React, {useEffect, useState} from "react";
import {forumGetThemePosts, getCookie, getThemes} from "../../../server-api/using";
import {Forum_PopupCreatePost} from "../forum-popup";
import {useLocation} from "react-router-dom";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function ForumIndexP(){
    const [themeData, setThemeData] = useState([]);
    const [postsData, setPostsData] = useState([]);
    const query = useQuery()

    useEffect(() => {
        const callData = async () => {
            await getThemes(function (res) {
                setThemeData(res)
            })
            await forumGetThemePosts(
                !query.get('search') ? '0' : query.get('search')
            , function (res){
                setPostsData(res)
            })
        }
        callData()
    }, [])

    const ThemeBlock = () => themeData.map((v,i) => (
        <div className='f-5' key={i} theme-id={v.id} onClick={() => {
            window.location.assign(`?search=${v.id}`)
        }}>
            {v.name}
        </div>
    ))

    const PostsBlock = () => postsData.map((v,i) => (
        <div className={ i === 0 ? 'f-7 f-7-first' :  'f-7'} desc='theme post object' key={i} fzf={i}>
            <div className='f-12' desc='post-name | post-author name'>
                <span className='f-13'>
                    <a href={
                        !v.user_name
                            ?`/pagerlynotfoundWhatISgoingOn`
                            :`/profile/?user-id=${v.user_id}`
                    }>{!v.user_name ? 'undefined_user' : v.user_name}</a>
                    <a onClick={() => window.location.assign(`forum/postview/?post-id=${v.id}`)}>{` | ${v.title} `} </a>
                </span>
            </div>
            <div className='f-14'>
                {v.preview}
            </div>
        </div>
    ))

    return(
        <>
            <div className='f-1'>
                <div className='f-8' desc='upper panel post creation ... etc...'>
                    <div className='f-9 f-9-1' desc='user-name' >
                        <span className='f-10'>
                            {
                                !getCookie('user-name')
                                    ? 'NotLoggedIn (( '
                                    : getCookie('user-name')
                            }
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <input className={
                                getCookie('user-id')
                                ? 'f-11 open-popup__createpost_forum'
                                : 'f-11'
                            } type='button' value='New post'
                            disabled={!getCookie('user-id')}/>
                            <input className='f-11' type='button' value='Profile' onClick={() => {
                                window.location.replace('/profile')
                            }}/>
                            <input className='f-11' type='button' value='NO_ACTION'/>
                        </div>
                    </div>
                    <div className='f-9'>

                    </div>
                    <div className='f-9'>

                    </div>
                    <div className='f-9'>

                    </div>
                </div>
                <div className='f-1-1'>
                    <div className='f-2' desc='panel'>
                        <div className='f-4' desc='theme array'>
                            <ThemeBlock />
                        </div>
                    </div>
                    <div className='f-3'>
                        <div className='f-6' desc='theme posts Array'>
                            {<PostsBlock />}
                        </div>
                    </div>
                </div>
            </div>
            <Forum_PopupCreatePost />
        </>
    )
}