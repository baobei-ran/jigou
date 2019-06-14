import "babel-polyfill";
import Vue from 'vue';
import App from './App';
import router from './router/index';
import ElementUI from 'element-ui';
import Config from '@/common/js/config.js';
import API from '@/api/index.js';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/layui/css/layui.css'
import 'jquery';
import cache from './common/js/cz-storage.js';
import '@/common/js/filter';
//引入样式文件
import "@/common/css/reset.css"
import "@/common/css/Size.css"
// import axios from "axios";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
var VueCookie = require('vue-cookie');
Vue.use(VueCookie);
import moment from 'moment'//导入文件

Vue.prototype.$moment = moment;//赋值使用
    moment.locale('zh-cn');//需要汉化
    // this.$moment(23534543564).format('YYYY MMMM Do h:mm:ss a')   用法
 
 // 进度条
NProgress.configure({ showSpinner: false })     // true 为开启
router.beforeEach((to, from, next) => {
    NProgress.start();
    next()
});
 
router.afterEach(transition => {
	NProgress.done();
});

Vue.use(Config);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.go = function (name) {    // 把go挂载在实例上，直接使用
    if (name.indexOf('http') != -1) {
        window.open(name, '_black');
    } else {
        this.$router.push({ path: name });
    }
}//路由跳转

Vue.prototype.$http = API;//ajax
Vue.prototype.localstorage = cache;//缓存

   

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
});