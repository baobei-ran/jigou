<template>
    <div id="bookingorderdetail" class="" style="height:95%">
        <div class="bg_f Mg-B24">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">基本信息</p>
            <table>
                <tr>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                医生姓名:
                            </span>
                            <span class="Color_gray6" v-text='orderDetail.true_name'>
                                张三
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                医生手机:
                            </span>
                            <span class="Color_gray6" v-text='orderDetail.phone'>
                                18588888888
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                医生邮箱:
                            </span>
                            <span class="Color_gray6"  v-text='orderDetail.mailbox'>
                                zhangsan@163.com
                            </span> </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>
                            <span class="Color_black">
                                医生职称:
                            </span>
                            <span class="Color_gray6" v-text='orderDetail.grade'>
                                主任医师
                            </span> </p>
                    </td>
                    <td>
                        <p>
                            <span class="Color_black">
                                所属科室:
                            </span>
                            <span class="Color_gray6" v-text='orderDetail.department_name'>
                                妇产科
                            </span>
                        </p>
                    </td>
                    <td><span></span><span></span></td>
                </tr>
            </table>
        </div>
        <div class="bg_f">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">订单信息</p>
            <table>
                <tr>
                    <td  width="33.3%">
                        <p>
                            <span class="Color_black">
                                预约单号:
                            </span>
                            <span class="Color_gray6" v-text='orderDetail.registration_number'>
                                GH2018092700012121
                            </span>
                        </p>
                    </td>
                    <td  width="33.3%">
                        <p>
                            <span class="Color_black">
                                预约时间:
                            </span>
                            <span class="Color_gray6">
                                {{ orderDetail.registration_time | filterDate }}
                            </span>
                            <span>{{ registration_timeslot }}</span>
                        </p>
                    </td>
                    <td  width="33.3%">
                        <p>
                            <span class="Color_black">
                                用户信息:
                            </span>
                            <span v-text='orderDetail.real_name'></span>
                            <span class="Color_gray6" v-text='orderDetail.upatient_phone'>
                                王满强 手机13370145535
                            </span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>
                            <span class="Color_black">
                                支付金额:
                            </span>
                            <span class="Color_gray6" v-text='orderDetail.registration_amount'>
                                100.00元
                            </span> </p>
                    </td>
                    <td>
                        <p>
                            <span class="Color_black">
                                订单状态:
                            </span>
                            <span class="Color_gray6" >
                                {{ state }}
                            </span>
                        </p>
                    </td>
                    <td>
                        <p>
                            <span class="Color_black">
                                患者信息:
                            </span>
                            <span v-text='orderDetail.name'></span>
                            <span class="Color_gray6" v-text='orderDetail.patient_phone'>
                                王满强 手机13370145535
                            </span>
                        </p>
                    </td>
                </tr>
            </table>
        </div>
        <p class="ac"><span class="Color_white Ft-S16 goback pointer" @click="go('/server/bookingOrder')">返回</span></p>
    </div>
</template>
<script>
export default {
    name: 'bookingorderdetail',
    data() {
        return {    
            orderDetail: '', // 预约订单信息
            state: '',        //  状态
            registration_timeslot: '' // 预约时间
        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {    // 查看预约订单详情接口
            var _this = this;
            this.$http.post('/shv2/server/make_look', _this.$route.query, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.orderDetail = res.data
                    var st = res.data.registration_stat;
                    _this.state = st == 1 ? '未使用' : st == 2 ? '已使用' : st == 3 ? '已过期' : '已退号'
                    var time = res.data.registration_timeslot
                    _this.registration_timeslot = time == 1 ? '上午' : time == 2 ? '下午' : '晚上'
                }
            }, function (err) { console.log(err)})
        },
    },
    filters: {  // 时间过滤器
        filterDate: function (val) {
            var time = new Date().get
            var value=new Date(val);
            var a = Math.floor(val/1000/60/60/24/30)
            console.log(a)
            console.log(value.toLocaleString())
            
        }
    }
}
</script>

<style scoped lang="less">
#bookingorderdetail {
    div {
        border-radius: 4px;
        padding-bottom: 12px;
        .bookingorderdetail_tit {
            border-bottom: 1px solid #f1f2f9;
        }
        table {
            width: 100%;
            text-align: left;
            margin-left: 24px;
            margin-top: 12px;
            font-size: 14px;
            color: #333;
            td {
                height: 38px;
            }
        }
    }
    .goback {
        display: inline-block;
        width: 120px;
        height: 40px;
        line-height: 40px;;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        margin-top: 24px;
    }
}
</style>
