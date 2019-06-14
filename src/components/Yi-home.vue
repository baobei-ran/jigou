<template>
    <div id="index" class="" style="width:100%">
        <p class="Pd-T28 Pd-B28 Pd-L20 Mg-B24 bg_f">
            <span class="Ft-S18 Color_black">{{ user.name }}</span>
            <span class="Ft-S12 btn_rz">机构认证</span>
            <span class="Ft-S14 Color_black leftline">机构编码：{{ user.number }}</span>
        </p>
        <div class="section1">
            <div class="layui-row layui-col-space22">
                <div class="layui-col-md9">
                    <div class="bg_f Mg-B24 left_box1">
                        <p class="Pd-T20 Pd-B20 Pd-L18 Ft-S16 Color_black">经营概况</p>
                        <div class="layui-row Mg-T20 Mg-B30 ac">
                            <div class="layui-col-md2">
                                <p style="text-align:center"><img src="../common/image/pages/index/icon_qianbao@2x.png" alt=""></p>
                            </div>
                            <div class="layui-col-md2">
                                <p class="Ft-S12 Color_black Mg-B18">总资产（元）</p>
                                <p class="Ft-S26 Color_black" v-text='datas.sum'>0.00</p>
                            </div>
                            <div class="layui-col-md2">
                                <p class="Ft-S12 Color_black Mg-B18">已收入（元）</p>
                                <p class="Ft-S26 Color_black" v-text='datas.money_balance'>0.00</p>
                            </div>
                            <div class="layui-col-md2">
                                <p class="Ft-S12 Color_black Mg-B18">冻结中（元）</p>
                                <p class="Ft-S26 Color_black" v-text='datas.money_lock'>0.00</p>
                            </div>
                            <div class="layui-col-md2">
                                <p class="Ft-S12 Color_black Mg-B18">今日收入（元）</p>
                                <p class="Ft-S26 Color_black" v-text='datas.today'>0.00</p>
                            </div>
                        </div>
                        <div class="layui-row Pd-B38 Mg-T36 ac">
                            <div class="layui-col-md2">
                                <p  style="text-align:center"><img src="../common/image/pages/index/icon_shangp@2x.png" alt=""></p>
                            </div>
                            <div class="layui-col-md2">
                                <p class="Ft-S12 Color_black Mg-B18">总预约订单</p>
                                <p class="Ft-S26 blue" v-text='datas.reg'>218</p>
                            </div>
                            <div class="layui-col-md2">
                                <p class="Ft-S12 Color_black Mg-B18">今日预约</p>
                                <p class="Ft-S26 blue" v-text='datas.regtoday'>218</p>
                            </div>
                            <div class="layui-col-md2">
                                <p class="Ft-S12 Color_black Mg-B18">未使用（今日） </p>
                                <p class="Ft-S26 red" v-text='datas.regnone'>218</p>
                            </div>
                            <div class="layui-col-md2">
                                <p class="Ft-S12 Color_black Mg-B18">已退号（今日）</p>
                                <p class="Ft-S26 red" v-text='datas.regquit'>0</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg_f Mg-B24 left_box2">
                        <p class="Pd-T20 Pd-B20 Pd-L18 Ft-S16 Color_black">功能分类</p>
                        <div class="layui-row Pd-B20 Mg-T20 ac">
                            <div class="layui-col-md3">
                                <p class="Ft-S14 Color_black Mg-B18 icon1 pointer" @click='list(1)'>预约订单</p>
                            </div>
                            <div class="layui-col-md3">
                                <p class="Ft-S14 Color_black Mg-B18 icon2 pointer" @click='list(2)'>问诊订单</p>
                            </div>
                            <div class="layui-col-md3">
                                <p class="Ft-S14 Color_black Mg-B18 icon3 pointer" @click='list(3)'>医生排班</p>
                            </div>
                            <div class="layui-col-md3">
                                <p class="Ft-S14 Color_black Mg-B18 icon4 pointer" @click='list(4)'>机构关联</p>
                            </div>
                        </div>
                        <div class="layui-row Pd-B20 ac">
                            <div class="layui-col-md3">
                                <p class="Ft-S14 Color_black Mg-B18 icon5 pointer" @click='list(5)'>医生列表</p>
                            </div>
                            <div class="layui-col-md3">
                                <p class="Ft-S14 Color_black Mg-B18 icon6 pointer" @click='list(6)'>科室列表</p>
                            </div>
                            <div class="layui-col-md3">
                                <p class="Ft-S14 Color_black Mg-B18 icon5 pointer" @click='list(7)'>设备申请</p>
                            </div>
                            <div class="layui-col-md3">
                                <p class="Ft-S14 Color_black Mg-B18 icon6 pointer" @click='list(8)'>机构设置</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg_f Mg-B24 left_box3">
                        <p class="Pd-T26 Pd-B24 Pd-L24 Pd-R24 clear tit"><span class="fl Ft-S16">公告</span><span class="fr Color_blue pointer">更多<i class="el-icon-arrow-right"></i></span></p>
                        <ul>
                            <li v-for="val in 10">
                                <p class="clear Pd-L24 Pd-R24 Pd-T24"><span class="fl Ft-S14 pointer">云医康平台持续打击违规帐号的公告｜2018年9月21日<i class="Color_red Ft-S16" style="margin-left:11px">new</i></span><span class="fr Ft-S14" style="color:#B3B3B3">2018/07/12</span></p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="layui-col-md3 section2">
                    <div class="bg_f Mg-B24 Pd-B26 Pd-T30 Pd-L34">
                        <div class="clear">
                            <div class="fl">
                                <img src="../common/image/pages/index/icon_kefudh@2x.png" alt="">
                            </div>
                            <div class="fl Mg-L24">
                                <p class="Color_black Ft-S16 Mg-B10">官方客服</p>
                                <p class="Color_black Ft-S12">电话：010 - 51190889</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg_f Mg-B24 right_box2  Pd-B24">
                        <p class="Pd-T26 Pd-B24 Pd-L24 Pd-R24 clear tit Mg-B22"><span class="fl Ft-S16">操作说明</span><span class="fr Color_blue pointer">更多<i class="el-icon-arrow-right"></i></span></p>
                        <ul>
                            <li class="Mg-B16 Color_black Ft-S12 Pd-L20 Pd-R20 pointer" v-for="val in 5">提现流程：提现前相关操作，医院必看</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'index',
    data() {
        return {
            datas: '',
            user: ''
        }
    },
    mounted(){
        this.indexData();
    },
    methods:{
        indexData() {
            var _this = this;
            layui.use('layer', function(){
            var layer = layui.layer;
                _this.$http.post('/shv2/index/hos_index', {}, function (res) {
                    // console.log(res)
                    if (res.code == 1) {
                        _this.datas = res.data
                    } else {
                        layer.msg(res.msg);
                    }
                }, function (err) {console.log(err)})
            }); 
            this.user = this.localstorage.get('logindata')
        },
        list (num) {    // 功能分类跳转链接
            switch(num) {
                case 1: this.$router.push({path: '/server/bookingOrder'}); break;
                case 2: this.$router.push({path:'/server/inquiryOrder'}); break;
                case 3: this.$router.push({path:'/server/doctorScheduling'}); break;
                case 4: this.$router.push({path: '/server/doctorParabiose'}); break;
                case 5: this.$router.push({path: '/data/doctorList'}); break;
                case 6: this.$router.push({path: '/data/departmentList'}); break;
                case 7: this.$router.push({path: '/server/equipmenApply'}); break;
                case 8: this.$router.push({path: '/setting/boxMechanismMsg/mesuccess'}); break;
            }
        }
    }
}
</script>

<style scoped lang="less">
#index {
    .btn_rz {
        display: inline-block;
        width: 60px;
        height: 22px;
        background: rgba(236, 242, 251, 1);
        color: #4281d7;
        text-align: center;
        line-height: 22px;
        border-radius: 2px;
        margin-left: 13px;
        margin-right: 32px;
    }
    .leftline {
        padding-left: 32px;
        display: inline-block;
        height: 27px;
        line-height: 27px;
        border-left: 1px solid #e5e5e6;
    }
    .section1 {
        .left_box1 {
            div {
                div {
                    p:first-child {
                        line-height: 12px;
                        width: 140px;
                        margin: 0 auto;
                        text-align: left;
                    }
                    p:last-child {
                        line-height: 26px;
                        width: 140px;
                        margin: 0 auto;
                        text-align: left;
                    }
                    .blue {
                        color: #128dff;
                    }
                    .red {
                        color: #ff4444;
                    }
                }
            }
        }
        .left_box2 {
            div {
                p {
                    height: 36px;
                    line-height: 36px;
                    padding-left: 48px;
                    width: 120px;
                    margin: 0 auto;
                    text-align: left;
                }
                .icon1 {
                    background: url(../common/image/pages/index/icon_fahuodan@2x.png)
                        no-repeat left;
                }
                .icon2 {
                    background: url(../common/image/pages/index/icon_zhangd@2x.png)
                        no-repeat left;
                }
                .icon3 {
                    background: url(../common/image/pages/index/icon_zhangdan@2x.png)
                        no-repeat left;
                }
                .icon4 {
                    background: url(../common/image/pages/index/iocn_guanlian@2x.png)
                        no-repeat left;
                }
                .icon5 {
                    background: url(../common/image/pages/index/icon_dianpsz@2x.png)
                        no-repeat left;
                }
                .icon6 {
                    background: url(../common/image/pages/index/icon_jgsz@2x.png)
                        no-repeat left;
                }
            }
        }
        .left_box3 {
            .tit {
                border-bottom: 1px solid #f1f2f9;
            }
        }
    }
    .section2 {
        .right_box2 {
            .tit {
                border-bottom: 1px solid #f1f2f9;
            }
        }
    }
}
</style>
