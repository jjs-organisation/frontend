import {
    getCookie,
    getFullProfileInfo,
    viewProject, getProjectsById, getPostsById, forumGetUserPosts, getProfileInfo
} from "../../../server-api/using";
import {
    NoPosts,
    PopupCreatePost, PopupUserSettings
} from './popupProfileOwn'
import React, {
    useEffect,
    useState
} from 'react';
import '../profiles.css'

export default function ProfileRender ({ user_id }) {
    const [data, setData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [forumPosts, setForumPosts] = useState([]);
    const [profileName, setProfileName] = useState(null);
    const [profileMail, setProfileMail] = useState(null);
    const isUserProfile = getCookie('user-id') === user_id;
    console.log(isUserProfile + ' ' + user_id)

    if (!user_id)
        user_id = window.location.assign(`/profile?user-id=${getCookie('user-id')}`)

    useEffect(() => {
        const callData = async () => {
            await getProjectsById(user_id,function (res) {
                if (res)
                    setData(res)
                console.log(res)
            })
            await getPostsById(user_id,function (res) {
                if (res)
                    setPosts(res)
                console.log(res)
            })
            await forumGetUserPosts(user_id, function (res) {
                if (res)
                    setForumPosts(res)
            })
            await getProfileInfo(user_id, function (res) {
                if (res) {
                    setProfileName(res.name)
                    setProfileMail(res.mail)
                }
            })
        }
        callData()
    }, [])

    const NoProjects = () => (
        <span className='p-001 p-001-black'> { 'No projects here...' } </span>
    )

    const ProjectsProfile = () =>
        !data[0] ? <NoProjects /> :
        !isUserProfile ? data.map((v, i) => (
            <>
                <div className={ i === 0 ? 'p-09 p-09-first' : 'p-09' } key={v.name+i}>
                    <span className='p-011'> {v.name} </span>
                    <span className='p-012'> {v.type.toUpperCase()} </span>
                    <input type='button' className='p-010' value='View'
                           onClick={() => viewProject(v.id, v.name)}/>
                </div>
            </>
        )) : data.map((v, i) => (
            <>
                <div className={ i === 0 ? 'p-09 p-09-first' : 'p-09' } key={v.name+i}>
                    <span className='p-011'> {v.name} </span>
                    <span className='p-012'> {v.type.toUpperCase()} </span>
                    <input type='button' className='p-010' value='Edit'/>
                    <input type='button' className='p-010' value='View'
                           onClick={() => viewProject(v.id, v.name)}/>
                </div>
            </>
        ))

    const PostsProfile = () =>
    posts.length === 0
        ? <NoPosts />
        : posts.map((v, i) => (
            <>
                <div className={i === 0 ? 'p-016 p-016-first' : 'p-016'} desc='post' key={i+v.id}>
                    <div className='p-020-r'>
                        <span className='p-017'> {v.title} </span>
                    </div>
                    <div className='p-020'>
                        <div className='p-021'>
                            <span className='p-018'> {v.content} </span>
                        </div>
                    </div>
                </div>
            </>
        ))

    const ForumPosts = () => forumPosts.map((v,i) => (
        <>
            <div className={ i === 0 ? 'f-7 f-7-first f-7-white' :  'f-7 f-7-white'} desc='theme post object' key={i} fzf={i}>
                <div className='f-12' desc='post-name | post-author name'>
                <span className='f-13'>
                    <a onClick={() => window.location.assign(`forum/postview/?post-id=${v.id}`)}>{`${v.title}`} </a>
                    <span>{`${v.theme}`} </span>
                </span>
                </div>
                <div className='f-14'>
                    {v.preview}
                </div>
            </div>
        </>
    ));

    return (
        <>
            {
                !getCookie('user-id')
                ? window.location.replace('/')
                :
                <>
                    <div className='p-07'>
                        <div className='p-05'>
                            <span className='p-001'> Profile </span>
                            <div className='p-03 p-03-first'>
                                <span className='p-04'>
                                    Name: { profileName }
                                </span>
                            </div>
                            <div className='p-03'>
                                <span className='p-04'>
                                    Mail: { profileMail }
                                </span>
                            </div>
                            {
                                !isUserProfile? <></>
                                :   <>
                                        <div className='p-03'>
                                            <span className='p-04'>
                                                Balance: { getCookie('user-balance') }
                                            </span>
                                        </div>
                                        <div className='p-03 p-03-change-password'>
                                            <span className='p-04 open-popup__user_settings' >
                                            Profile Settings
                                            </span>
                                        </div>
                                    </>
                            }

                        </div>
                        <div className='p-06'>
                            <span className='p-001'> Projects </span>
                            <div className='p-08'>
                                { <ProjectsProfile /> }
                            </div>
                        </div>
                    </div>
                    <div className='p-014'>
                        <span className='p-001'> Posts </span>
                        <div>
                            {
                                 !isUserProfile ? <></> :<>
                                    <input type='button' className='p-015 open-popup__createpost' value='New post'/>
                                    <input type='button' className='p-015' value='New code snippet'/>
                                    {/*<input type='button' className='p-015' value='Share'/>*/}
                                </>
                            }
                        </div>
                    </div>
                    <div className='p-013' desc='post-holder'>
                        { <PostsProfile /> }
                    </div>
                    <div className='p-022'>
                        {
                            !forumPosts[0]?<></>:
                                <>
                                    <span className='p-001'> Forum activity </span>
                                    {
                                        <div className='p-023'>
                                            <ForumPosts />
                                        </div>
                                    }
                                </>
                        }
                    </div>
                </>
            }
            <PopupCreatePost />
            <PopupUserSettings />
        </>
    )
}