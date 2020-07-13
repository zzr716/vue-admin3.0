import cookie from "cookie_js"

const adminToken = 'admin_toKen';

export function getToken() {
    return cookie.get(adminToken)
}

export function setToken(token) {
    return cookie.set(adminToken, token)
}

export function removeToken() {
    return cookie.remove(adminToken)
}

export function setUserName(value) {
    return cookie.set('username', value)
}

export function getUserName() {
    return cookie.get('username')
}