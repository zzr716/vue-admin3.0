import service from '@/utils/request'

/**
 * 获取验证码
 */
export function GetSms(data) {
    return service.request({
        method: "post",
        url: "/getSms/",
        data
    })
}
/**
 * 登录
 */
export function Login(data) {
    return service.request({
        method: "post",
        url: "/login/",
        data
    })
}
/**
 * 获取角色
 */
export function getUserRole(data = {}) {
    service.request({
        method: "post",
        url: "/userRole/",
        data: {}
    })
}
/**
 * 获取验证码
 */
