<template>
    <div class="success bg_f" >
        <header class="Pd-T24 Pd-L22 Pd-B24">
            <div class="Ft-S18">
                绑卡提示
            </div>
        </header>
        <section class="content Mg-T60">
            <div>
                <i class="layui-icon layui-icon-ok-circle" style="font-size: 30px; color: #1E9FFF;"></i>  
                <p class="Pd-T10 Ft-S16">绑卡成功 !</p>
                <button class="layui-btn layui-btn-normal Pd-L30 Pd-R30" @click='returnBtn'>返回</button>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {
            flag: false     // 条件判断
        }
    },
    mounted () {    
        console.log(this.$route)
        var { name } = this.$route.query
        if (name.includes('yes')) {
            this.flag = true
        } else {
            this.flag = false
        }
    },
    methods: {
        returnBtn () {
            this.go('/finance/bankcardadmin');       //  绑卡成功，返回绑卡页面
        }
    }
}
</script>
<style scoped>
.success {
    height: 100vh;
}
.success header {
    border-bottom: 1px solid #f1f2f9;
}
.content {
    width: 100%;
    height: 400px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.content div i {
    color: #3196FF;
    padding-top: 50px;
}
.content div p {
    color: #333;
    margin-bottom: 30px;
}
</style>
