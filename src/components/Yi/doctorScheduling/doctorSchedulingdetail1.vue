<template>
    <div id="bookingorderdetail" class="" style="height:95%">
        <div class="bg_f Mg-B24">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">基本信息</p>
            <table>
                <tr>
                    <td>
                        <p style="width:220px;margin:0 auto;text-align:left;">
                            <span class="Color_black">
                                医生姓名:
                            </span>
                            <span class="Color_gray6">
                                张三
                            </span>
                        </p>
                    </td>
                    <td>
                        <p style="width:170px;margin:0 auto;text-align:left;">
                            <span class="Color_black">
                                医生手机:
                            </span>
                            <span class="Color_gray6">
                                18588888888
                            </span>
                        </p>
                    </td>
                    <td>
                        <p style="width:230px;margin:0 auto;text-align:left;">
                            <span class="Color_black">
                                医生邮箱:
                            </span>
                            <span class="Color_gray6">
                                zhangsan@163.com
                            </span> </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p style="width:220px;margin:0 auto;text-align:left;">
                            <span class="Color_black">
                                医生职称:
                            </span>
                            <span class="Color_gray6">
                                主任医师
                            </span> </p>
                    </td>
                    <td>
                        <p style="width:170px;margin:0 auto;text-align:left;">
                            <span class="Color_black">
                                所属科室:
                            </span>
                            <span class="Color_gray6">
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
                    <td>
                        <p style="width:220px;margin:0 auto;text-align:left;">
                            <span class="Color_black">
                                预约单号:
                            </span>
                            <span class="Color_gray6">
                                GH2018092700012121
                            </span>
                        </p>
                    </td>
                    <td>
                        <p style="width:170px;margin:0 auto;text-align:left;">
                            <span class="Color_black">
                                预约时间:
                            </span>
                            <span class="Color_gray6">
                                2018.09.09 上午
                            </span>
                        </p>
                    </td>
                    <td>
                        <p style="width:230px;margin:0 auto;text-align:left;">
                            <span class="Color_black">

                                用户信息:

                            </span>
                            <span class="Color_gray6">
                                王满强 手机13370145535
                            </span> </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p style="width:220px;margin:0 auto;text-align:left;">
                            <span class="Color_black">
                                支付金额:
                            </span>
                            <span class="Color_gray6">
                                100.00元
                            </span> </p>
                    </td>
                    <td>
                        <p style="width:170px;margin:0 auto;text-align:left;">
                            <span class="Color_black">
                                订单状态:
                            </span>
                            <span class="Color_gray6">
                                未使用
                            </span>
                        </p>
                    </td>
                    <td>
                        <p style="width:230px;margin:0 auto;text-align:left;">
                            <span class="Color_black">
                                患者信息:
                            </span>
                            <span class="Color_gray6">
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

        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {

        },
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
            text-align: center;
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
