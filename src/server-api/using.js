let backend_uri = `http://localhost:3450/` // || 95.163.233.114
// http://localhost:3450/ -- HTTP!!! 3450
// https://localhost:3451/ -- HTTPS!!! 3451

const config = {
    api:{
        users_api: {
            create_user: `${backend_uri}users/create`,
            login_user: `${backend_uri}users/login`,
            get_user_data: `${backend_uri}users/getdata`,
            verify_code: `${backend_uri}users/create/verify`,
            get_profile_data: `${backend_uri}users/getprofile`,
            change_password_logged: `${backend_uri}users/changepasswordlogged`,
            settings_set: `${backend_uri}users/settings_set`
        },
        projects_api: {
            create_project : `${backend_uri}projects/create`,
            get_projects : `${backend_uri}projects/get`,
            save_project : `${backend_uri}projects/save`,
            run_project: `${backend_uri}projects/run`,
            load_project: `${backend_uri}projects/load`,
            view_project: `${backend_uri}projects/viewhtml`
        },
        bill: {
            default: {
                get_balance: `${backend_uri}billing/getbalance`
            }
        },
        forum:{
            get_themes : `${backend_uri}forum/getallthemes`,
            create_post: `${backend_uri}forum/createpost`,
            get_posts_by_theme: `${backend_uri}forum/gettheme`,
            get_post: `${backend_uri}forum/getpost`,
            get_user_posts: `${backend_uri}forum/getuserposts`,
            response_post: `${backend_uri}forum/postresponse`,
            get_response_posts: `${backend_uri}forum/getresponseposts`
        },
        plugins: {
            get_all: `${backend_uri}plugins/getall`,
            get_info: `${backend_uri}plugins/getinfo`,
            get_installed: `${backend_uri}plugins/getinstalled`,
            install_plugin: `${backend_uri}plugins/installplugin`,
            delete_all: `${backend_uri}plugins/deleteall`,
            delete_plugin: `${backend_uri}plugins/deleteplugin`,
            blob: {
                get_image: `${backend_uri}plugins/getimg`,
                get_plugin: `${backend_uri}plugins/getplugin`
            }
        },
        posts:{
            create_post: `${backend_uri}posts/create`,
            get_posts: `${backend_uri}posts/get`
        }
    }
}

export function stringify(obj) {
    let cache = [];
    let str = JSON.stringify(obj, function(key, value) {
        if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
                return;
            }
            cache.push(value);
        }
        return value;
    });
    cache = null;
    return str;
}

export function getCookie(name){
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}

function getDate() {
    let a = new Date();
    return `${a.getDate()}.${a.getMonth()}.${a.getFullYear()}`;
}

async function Connect(uri, body, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('post', uri, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.send(stringify(body))
    xhr.onload = async () => {
        if (xhr.status !== 200) {
            console.log(`some error caught when tries call ${uri} \n with body: \n ${body}`)
        } else {
            await callback(xhr.response)
        }
    };
}
async function ConnectBlob(uri, body, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('post', uri, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'blob';
    xhr.send(stringify(body))
    xhr.onload = async () => {
        if (xhr.status !== 200) {
            console.log(`some error caught when tries call ${uri} \n with body: \n ${body}`)
        } else {
            await callback(xhr.response)
        }
    };
}

async function ConnectGET(uri, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('get', uri, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.send()
    xhr.onload = async () => {
        if (xhr.status !== 200) {
            console.log(`some error caught when tries call ${uri} \n with body: \n ${body}`)
        } else {
            await callback(xhr.response)
        }
    };
}

async function ConnectGETImg(uri, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('get', uri);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'blob';
    xhr.send()
    xhr.onload = async () => {
        if (xhr.status !== 200) {
            console.log(`some error caught when tries call ${uri} \n with body: \n ${body}`)
        } else {
            await callback(xhr.response)
        }
    };
}


export async function createUser(data, verify) {
    await Connect(config.api.users_api.create_user, {
        id: 'null-1',
        userdata: {
            name: data.name,
            phone: '0000000',
            mail: data.mail,
            password: data.password,
            country: data.country,
            dateofreg: getDate()
        },
        verified: verify
    }, function (result) {
        try {
            if (verify === true){
                document.cookie = `user-id=${result.r.id}; path=/`
                document.cookie = `user-name=${result.r.username}; path=/`
            }
            else
                document.cookie = `verify-id=${result.r}; path=/`
        }catch (e) {
            console.log('caught err when tries set cookie <verify-id>')
        }
    })
}

export async function sendVerifyCodeToBackend(data, callback){
    await Connect(config.api.users_api.verify_code, {
        code: data.code,
        id: getCookie(`verify-id`)
    }, function (result) {
            if (result.r === true)
                callback(true)
            else
                callback(false)
        }
    )
}

export async function logIn(data, callback) {
    await Connect(
        config.api.users_api.login_user, {
        mail: data.mail,
        password: data.password
    }, function (result) {
        callback(result)
    })
}

export async function createProject(data, callback) {
    await Connect(config.api.projects_api.create_project, {
        user_id : getCookie('user-id'),
        project_name: data.project_name,
        user_name: getCookie('user-name'),
        project_type: 'html'
    }, function (result) {
        document.cookie = `project-id=${result.r.project_id}; path=/`
        document.cookie = `project-name=${result.r.project_name}; path=/`
        callback('created')
    })
}

export async function saveProject(data, callback){
    await Connect(config.api.projects_api.save_project, {
        project_name: data.proj_name,
        project_id: getCookie('project-id'),
        project_type: 'html',
        user_name: getCookie('user-name'),
        user_id: getCookie('user-id'),
        code: {
            html: data.code.html,
            css: data.code.css,
            js: data.code.js
        }
    }, function (result) {

    })
}

export async function getProjects(callback) {
    if (!getCookie('user-id')){
        console.log('no user-id in cookie')
    }else {
        await Connect(config.api.projects_api.get_projects,{
            ownerid: getCookie('user-id'),
        }, function (result) {
            callback(result)
        })
    }
}

export async function getProjectsById(user_id, callback){
    if (!getCookie('user-id')){
        console.log('no user-id in cookie')
    }else {
        await Connect(config.api.projects_api.get_projects,{
            ownerid: user_id,
        }, function (result) {
            callback(result)
        })
    }
}

export async function getUserData(callback) {
    await Connect(config.api.users_api.get_user_data,{
        userid: getCookie('user-id'),
    }, function (result) {
        callback(result)
    })
}

export async function getFullProfileInfo() {
    await Connect(config.api.users_api.get_user_data,{
        userid: getCookie('user-id'),
    }, function (result) {
        localStorage.setItem('profile-info', JSON.stringify(
            result.r
        ))
        document.cookie = `user-mail=${result.r.mail}; path=/`
    })
    await Connect(config.api.bill.default.get_balance,{
        user_id: getCookie('user-id'),
    }, function (result) {
        document.cookie = `user-balance=${result.result}; path=/`
    })
}

export async function viewProject(id, name) {
    if (true) { // projectType = html || react ..etc
        let pId = id,
            uId = getCookie('user-id'),
            xhr = new XMLHttpRequest();
        xhr.open(
            'get',
            `${config.api.projects_api.view_project}/${uId}/${pId}`,
            true
        );
        xhr.send();
        xhr.onload = () => {
            if (xhr.responseText === null || ''){
                console.error('No data received')
            }
            else {
                localStorage.setItem(`view-${pId}`, xhr.responseText)
                window.location.replace(`/view?content=${
                    pId
                }&name=${name}`)
            }
        }
    }
}

export async function getBalanceData(callback) {
    await Connect(config.api.bill.default.get_balance,{
        user_id: getCookie('user-id'),
    }, function (result) {
        callback(result)
    })
}

export function deleteCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}

export function payment(data, callback){
    let link =` https://alfa.rbsuat.com/payment/rest/register.do?amount=${data.amount}&currency=810&language=ru&orderNumber=${data.orderid}&password=${data.password}&returnUrl=https://alfa.rbsuat.com/payment/finish.html&userName=${data.login}`
    let xhr = new XMLHttpRequest();
    xhr.open('get', link, true);
    xhr.send();
    xhr.onload = () => {
        callback(xhr.response)
    }
}

export async function runProject(projId, callback) {
    await Connect(config.api.projects_api.run_project, {
        id: projId,
        uid: getCookie('user-id')
    }, function (result) {
        callback(result)
    })
}

export const PopupShowHide = (id) => {
    if (document.getElementById(id).classList.contains('popup-settings-show')){
        document.getElementById(id).classList.remove('popup-settings-show')
        document.getElementById(id).classList.add('popup-settings-hide')
    }else {
        document.getElementById(id).classList.remove('popup-settings-hide')
        document.getElementById(id).classList.add('popup-settings-show')
    }
}

export async function loadProject(project_name, callback){
    await Connect(config.api.projects_api.load_project, {
        project_name: project_name,
        user_id: getCookie('user-id')
    },function (result) {
        callback(result);
    })
}

export async function getProfileInfo(user_id, callback){
    await Connect(config.api.users_api.get_profile_data, {
        user_id: user_id
    }, function (result) {
        callback(JSON.parse(result.r)[0])
    })
}

/**
 * posts
 * */

export async function createPost(title,content) {
    await Connect(config.api.posts.create_post, {
        user_id: getCookie('user-id'),
        user_name: getCookie('user-name'),
        title: title,
        content: content
    }, function (result) {
        if (result === true)
            window.location.reload()
    })
}

export async function getPosts(callback) {
    await Connect(config.api.posts.get_posts, {
        user_id: getCookie('user-id')
    }, function (res) {
        callback(res)
    })
}

export async function getPostsById(profile_id, callback) {
    await Connect(config.api.posts.get_posts, {
        user_id: profile_id
    }, function (res) {
        callback(res)
    })
}

/** Forum */

export async function getThemes(callback) {
    await ConnectGET(config.api.forum.get_themes, function (res) {
        callback(res)
    })
}

export async function forumCreatePost(title, theme, content, responseId){
    await Connect(config.api.forum.create_post, {
        user_id: getCookie('user-id'),
        user_name: getCookie('user-name'),
        title: title,
        theme: theme,
        content: content,
        response_id: responseId
    },function (res) {
        //..
    })
}

export async function forumGetThemePosts(query, callback){
    await Connect(config.api.forum.get_posts_by_theme, {
        themeId: query
    },function (res) {
        callback(res)
    })
}

export async function forumGetPostById(post_id, callback) {
    await Connect(config.api.forum.get_post, {
        post_id: post_id
    },function (res) {
        callback(res)
    })
}

export async function forumGetUserPosts(user_id, callback){
    await Connect(config.api.forum.get_user_posts, {
        user_id: user_id
    },function (res) {
        callback(res)
    })
}

export async function forumResponsePost(post_id, callback){
    await Connect(config.api.forum.response_post, {
        post_id: post_id,
        user_id: getCookie('user-id')
    },function (res) {
        callback(res)
    })
}

export async function forumGetResponsePosts(post_id, callback){
    await Connect(config.api.forum.get_response_posts,{
        response_id: post_id
    },function (res) {
        callback(res)
    })
}

/** Settings */

export async function setSettings(sessionLifetime, new_userName, callback){
    await Connect(config.api.users_api.settings_set, {
        user_id: getCookie('user-id'),
        session: sessionLifetime,
        user_name: new_userName
    }, function (res) {
        callback(res)
    })
}

export async function CleanUpCache() {
    localStorage.clear();
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    window.location.reload();
}

/** Plugins */

export async function getAllPlugins(callback){
    await ConnectGET(config.api.plugins.get_all, function (res) {
        callback(res)
    })
}
export function getPluginImage(data, callback){
    ConnectBlob(config.api.plugins.blob.get_image, {
        path: data},function (res) {
        callback(res)
    })
}

export function getPluginCode(data, callback){
    ConnectBlob(config.api.plugins.blob.get_plugin, {
        path: data
    }, function (res) {
        callback(res)
    })
}
export async function getInfoAboutPlugin(data, callback) {
    ConnectBlob(config.api.plugins.blob.get_image, {
        path: data
    },function (res) {
        Connect(config.api.plugins.get_info, {
            path: data
        }, function (re) {
            console.log({
                icon: res,
                id: re[0].id,
                caption: re[0].name,
                text: re[0].description,
                ver: re[0].version
            })
            callback({
                icon: res,
                id: re[0].id,
                caption: re[0].name,
                text: re[0].description,
                ver: re[0].version
            })
        })
    })
}
export async function getInstalledPlugins(callback) {
    !getCookie('user-id')
        ? callback(false)
        : await Connect(config.api.plugins.get_installed, {
            user_id: getCookie('user-id')
        } ,function (res) {
            callback(res)
        })
}
export async function installPlugin(pluginId , callback){
    !getCookie('user-id')
        ? callback(false)
        : await Connect(config.api.plugins.install_plugin, {
            user_id: getCookie('user-id'),
            plugin_id: pluginId
        }, function (res) {
            callback(res)
        })
}
export async function deletePlugin(pluginId) {
    !getCookie('user-id')
        ? console.log(false)
        : await Connect(config.api.plugins.delete_plugin, {
            plugin_id: pluginId,
            user_id: getCookie('user-id')
        },function (res) {
            if (res === true)
                console.log(true)
            else
                console.log(false)
        })
}
export async function DeleteAllPlugins(){
    !getCookie('user-id')
        ? console.error('not logged in')
            : await Connect(config.api.plugins.delete_all, {
                user_id: getCookie('user-id')
            },function (res) {
                console.log('deleted')
            })
}