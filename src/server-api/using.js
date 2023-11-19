let backend_uri = `https://localhost:3451/` // || 95.163.233.114
const config = {
    api:{
        users_api: {
            create_user: `https://localhost:3451/users/create`,
            login_user: `https://localhost:3451/users/login`,
            get_user_data: `https://localhost:3451/users/get-data`
        },
        projects_api: {
            create_project : `https://localhost:3451/projects/create`,
            get_projects : `https://localhost:3451/projects/get`,
            run_project: `https://localhost:3451/projects/run`
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

export async function createUser(data, callback) {
    await Connect(config.api.users_api.create_user, {
        id: 'null-1',
        userdata: {
            name: data.name,
            phone: data.phone,
            mail: data.mail,
            password: data.password,
            country: data.country,
            dateofreg: getDate()
        }
    }, function (result) {
        if (result === true)
            callback(true)
        else
            callback(false)
    })
}

export async function logIn(data, callback) {
    await Connect(
        config.api.users_api.login_user, {
        name: data.name,
        password: data.password
    }, function (result) {
        callback({ r: result.r })
    })
}

export async function createProject(data, callback) {
    await Connect(config.api.projects_api.create_project, {
        id: 'null-1',
        name: data.name,
        ownerid: getCookie('user-id'),
        type: data.type
    }, function (result) {
        if (result === true)
            callback(true)
        else
            callback(false)
    })
}

export async function getProjects(callback) {
    await Connect(config.api.projects_api.get_projects,{
        ownerid: getCookie('user-id'),
    }, function (result) {
        callback(result)
    })
}

export async function getUserData(callback) {
    await Connect(config.api.users_api.get_user_data,{
        userid: getCookie('user-id'),
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