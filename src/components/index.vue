<template>
    <div class="index">
        <yao-home v-if='boolear'></yao-home>
        <yi-home v-else></yi-home>
    </div>
</template>
<script>
var YaoHome = resolve => require(['./Yao-home.vue'], resolve);
var YiHome = resolve => require(['./Yi-home.vue'], resolve);
export default {
    components: {
        'yao-home': YaoHome,
        'yi-home': YiHome
    },
    data () {
        return {
            boolear: true
        }
    },
    mounted () {
        this.judge();
    },
    methods: {
        judge() {   // 根据登录的 type 来进行辨认医院和药店
            var user = this.localstorage.get('logindata');
            var type = Number(user.type);
            switch(type) {
                case 1: this.boolear = false; break;  // 1 医院
                case 8: this.boolear = true; break;   // 8 药店
                // 机构类型： 1.医院 2.体检机构 3.乡镇卫生院 4.社区服务中心 5.社区服务站  6.村卫生室 7.个人诊所 8.药店
            }
        }
    }

}
</script>
<style scoped>

</style>

