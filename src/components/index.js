// 该文件负责所有的公共的组件的全局注册   Vue.use
import PageTools from './PageTools'
import UploadExcel from './UploadExcel' //导入
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
import ScreenFull from './ScreenFull'
import ThemePicker from './ThemePicker'

// 使用插件的形式全局注册组件，然后
export default {
    install(Vue) {
        //  注册全局的通用栏组件对象
        Vue.component('PageTools', PageTools)
        Vue.component('UploadExcel', UploadExcel) // 注册excel组件
        Vue.component('ImageUpload', ImageUpload) // 注册导入上传组件
        Vue.use(Print)
        Vue.component('ScreenFull', ScreenFull) // 注册全屏组件
        Vue.component('ThemePicker', ThemePicker)
    }
}