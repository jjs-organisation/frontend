import {
    getBalanceData,
    getCookie,
    getFullProfileInfo,
    getProfileInfo,
    getProjects,
    getPosts,
    getUserData,
    viewProject, getProjectsById
} from "../../../server-api/using";
import {
    NoPosts,
    PopupCreatePost, PopupUserSettings
} from './popupProfileOwn'
import React, {
    Component,
    useEffect,
    useState
} from 'react';
import '../profiles.css'
export default function OtherProfile({ profile_id }){
    const [data, setData] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const callData = async () => {
            await getProjectsById(profile_id ,function (res) {
                if (res)
                    setData(res)
                console.log(res)
            })
            await getPostsById(profile_id, function (res) {
                if (res)
                    setPosts(res)
                console.log(res)
            })
        }
        getFullProfileInfo();
        callData()
    }, [])

    const ProjectsProfile = () => data.map((v, i) => (
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
            :
            posts.map((v, i) => (
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
                                Name: { getCookie('user-name')}
                            </span>
                                </div>
                                <div className='p-03'>
                            <span className='p-04'>
                                Mail: { getCookie('user-mail') }
                            </span>
                                </div>
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
                                <input type='button' className='p-015 open-popup__createpost' value='New post'/>
                                <input type='button' className='p-015' value='New code snippet'/>
                                {/*<input type='button' className='p-015' value='Share'/>*/}
                            </div>
                        </div>
                        <div className='p-013' desc='post-holder'>
                            { <PostsProfile /> }
                        </div>
                    </>
            }
            <PopupCreatePost />
            <PopupUserSettings />
        </>
    )
}