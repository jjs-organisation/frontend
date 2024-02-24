import {
    forumGetPostById,
    forumGetResponsePosts,
    forumGetThemePosts,
    getCookie,
    getThemes
} from "../../../server-api/using";
import {Forum_PopupCreatePost, Forum_PopupResponsePost, popupShow} from "../forum-popup";
import React, {useEffect, useState} from "react";

export default function ForumPostView({ post_id }){
    const [themeData, setThemeData] = useState([]);
    const [postData, setPostData] = useState([]);
    const [responsePostData, setResponsePostData] = useState([]);

    if (!post_id)
        window.location.replace('/forum')

    useEffect(() => {
        const callData = async () => {
            await getThemes(function (res) {
                setThemeData(res)
            })
            await forumGetResponsePosts(post_id, function (res) {
                setResponsePostData(res)
            })
            await forumGetPostById(post_id,function (res) {
                setPostData(res[0])
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

    const ResponsePosts = () => responsePostData.map((v,i) => (
        <>
            <div className={'f-7'} desc='theme post object' key={i} fzf={i}>
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
        </>
    ))

    const Post = () => (
        <div className={'f-7'} desc='theme post object'>
            <div className='f-12 f-12-post-v' desc='post-name | post-author name'>

            </div>
            <div className='f-14'>
                {postData.content + `\n`}
                <div className='f-17'>
                    <span className='f-16 open-popup__createpost_forum'
                    onClick={() => popupShow()}>
                        <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" fill="transparent"/>
                            <path d="M15.6287 5.12132L4.31497 16.435M15.6287 5.12132L19.1642 8.65685M15.6287 5.12132L17.0429 3.70711C17.4334 3.31658 18.0666 3.31658 18.4571 3.70711L20.5784 5.82843C20.969 6.21895 20.969 6.85212 20.5784 7.24264L19.1642 8.65685M7.85051 19.9706L4.31497 16.435M7.85051 19.9706L19.1642 8.65685M7.85051 19.9706L3.25431 21.0312L4.31497 16.435" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    <span className='f-16'>
                        <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" fill="transparent"/>
                            <path d="M11.5245 4.46353C11.6741 4.00287 12.3259 4.00287 12.4755 4.46353L13.9084 8.87336C13.9753 9.07937 14.1673 9.21885 14.3839 9.21885H19.0207C19.505 9.21885 19.7064 9.83866 19.3146 10.1234L15.5633 12.8488C15.3881 12.9761 15.3148 13.2018 15.3817 13.4078L16.8145 17.8176C16.9642 18.2783 16.437 18.6613 16.0451 18.3766L12.2939 15.6512C12.1186 15.5239 11.8814 15.5239 11.7061 15.6512L7.95488 18.3766C7.56303 18.6613 7.03578 18.2783 7.18546 17.8176L8.6183 13.4078C8.68524 13.2018 8.61191 12.9761 8.43667 12.8488L4.68544 10.1234C4.29358 9.83866 4.49497 9.21885 4.97933 9.21885H9.6161C9.83272 9.21885 10.0247 9.07937 10.0916 8.87336L11.5245 4.46353Z" stroke="#ffff00" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    <span className='f-16'>
                        <span style={{ marginLeft: 5 }}>0</span>
                        <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_15_200)">
                                <rect width="24" height="24" fill="transparent"/>
                                <circle cx="12" cy="13" r="2" stroke="#ffffff" strokeLinejoin="round"/>
                                <path d="M12 7.5C7.69517 7.5 4.47617 11.0833 3.39473 12.4653C3.14595 12.7832 3.14595 13.2168 3.39473 13.5347C4.47617 14.9167 7.69517 18.5 12 18.5C16.3048 18.5 19.5238 14.9167 20.6053 13.5347C20.8541 13.2168 20.8541 12.7832 20.6053 12.4653C19.5238 11.0833 16.3048 7.5 12 7.5Z" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_15_200">
                                    <rect width="24" height="24" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    )

    return(
        <>
            <div className='f-1'>
                <div className='f-8' desc='upper panel post creation ... etc...'>
                    <div className='f-9 f-9-1' desc='user-name' >
                        <span className='f-10'>
                            { !getCookie('user-name') ? 'Undefined' : getCookie('user-name') }
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <input className='f-11' type='button' value='Back to forum' onClick={() => {
                                window.location.replace('/forum')
                            }}/>
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
                            <div className='f-15'>
                                <a href={`/profile?user-id=${getCookie('user-id')}`}>{postData.user_name}</a>
                                <a> {` | ${postData.title} `} </a>
                            </div>
                            <Post />
                            <div className='f-18' desc='response posts object'>
                                <span className='f-18-line'></span>
                                <div className='f-19'>
                                    <ResponsePosts />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Forum_PopupCreatePost />
        </>
    )
}