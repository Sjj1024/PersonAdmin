import store from "@/store";

export default {
    // 这里面可以定义vue实例中的任何属性，并且和vue实例中的都不冲突
    methods: {
        checkPermission(key) {
            const { userInfo } = store.state.user
            if (userInfo.roles.points && userInfo.roles.points.length) {
                // 判断用户的权限点是否存在这个key
                return userInfo.roles.points.some(item => item === key)
            }
            return false
        }
    },
}