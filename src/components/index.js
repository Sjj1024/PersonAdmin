// 该文件负责所有的公共的组件的全局注册   Vue.use
import PageTools from './PageTools'

// 使用插件的形式全局注册组件，然后
export default {
    install(Vue) {
        //  注册全局的通用栏组件对象
        Vue.component('PageTools', PageTools)
    }
}