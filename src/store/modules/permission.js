// vuex的权限管理模块
import { constantRoutes, asyncRoutes } from "@/router"


// vuex中的permisson模块，用来存储当前的静态路由和当前用户的权限路由
const state = {
    routes: constantRoutes
}

const mutations = {
    setRoutes(state, newRoute) {
        // 修改路由的时候，应当是静态路由+当前用户的权限路由，不是[...state.routes, ...newRoutes]
        state.routes = [...newRoute, ...constantRoutes]
    }
}

const actions = {
    // 筛选权限路由，第二个参数是当前用户所拥有的菜单权限
    filterRoutes(context, menus) {
        const routes = []
        // 筛选出动态路由和menus中能够对上的路由
        menus.forEach(key => {
            // 筛选出用户拥有的路由权限
            let userRoutes = asyncRoutes.filter(item => item.name === key)
            // 将筛选到的数据解包到routes中
            routes.push(...userRoutes)
        })
        context.commit("setRoutes", routes)
        // 并将结果返回
        return routes
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
}