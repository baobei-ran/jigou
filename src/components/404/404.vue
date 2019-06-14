<!--404-->
<template>
    <div id="notfind">
        <div class="pointer container Mg-T60 Pd-T20" @click="go('/')">
          <!-- <img src="../common/img/icon/logo.png" alt> -->
        </div>
        <div class="container none_con">
            <i class="bg_icon1"></i>
            <i class="bg_icon2"></i>
            <div class="none_msg">
                <p class="Ft-S48 Color_blue ">Page</p>
                <p class="Ft-S48 Color_blue Mg-T16g-T16 Mg-B24 ">Not Found</p>
                <p class="Ft-S20 Color_black Mg-B30">抱歉，您访问的页面出错了！</p>
                <button class="pointer" @click="Return">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        Return () {
            this.$router.replace('/')
        }
    }
}
</script>

<style scoped lang="less">
#notfind {
    width: 100%;
    .none_con {
        width: 100%;
        height: 553px;
        padding-bottom: 43px;
        position: relative;
        text-align: center;
        .bg_icon1 {
            position: absolute;
            display: inline-block;
            width: 367px;
            height: 221px;
            top: 0px;
            right: 0px;
            
        }
        .bg_icon2 {
            position: absolute;
            display: inline-block;
            width: 367px;
            height: 221px;
            bottom: 43px;
            left: 0px;
        }
        .none_msg {
            width: 600px;
            margin: 0 auto;
            padding-top: 150px;
            p:first-child{
                line-height: 58px;
                font-weight: bold
            }
            p:nth-child(2){
                line-height: 58px;
                font-weight: bold
            }
            button {
                width: 130px;
                height: 42px;
                background: rgba(20, 141, 255, 1);
                border-radius: 4px;
                border: none;
                color: #fff;
                font-size: 18px;
            }
        }
    }
}
</style>