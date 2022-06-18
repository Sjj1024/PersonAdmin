import request from '@/utils/request'

export function login(data) {
    // 返回的是一个promise对象
    return request({
        method: "POST",
        url: "/sys/login",
        data
    })
}

export function getInfo(token) {
}

export function logout() {
}
