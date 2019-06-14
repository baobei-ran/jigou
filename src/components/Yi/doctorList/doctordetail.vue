<template>
    <div id="doctordetail" class="" style="height:95%">
        <div class="bg_f Mg-B24 mydiv">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">基本信息</p>
            <table class="Mg-T12">
                <tr>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                医生姓名:
                            </span>
                            <span class="Color_gray6" v-text="datalist.true_name">
                                {{ datalist.true_name }}
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                医生邮箱:
                            </span>
                            <span class="Color_gray6" v-text="datalist.mailbox">
                                {{ datalist.mailbox }}
                            </span>
                        </p>
                    </td>
                    <td width="33.3%" rowspan="3">
                        <p class="introduction">
                            <span class="Color_black v-top" style="width:60px;">
                                医生简介:
                            </span>
                            <span class="Color_gray6" style="width:326px;display:inline-block" v-text="datalist.introduction">
                                {{ datalist.introduction }}
                                <span class="Color_blue pointer">
                                    更多
                                </span>
                            </span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>
                            <span class="Color_black">
                                医生职称:
                            </span>
                            <span class="Color_gray6" v-text="datalist.name">
                                {{ datalist.name }}
                            </span> </p>
                    </td>
                    <td>
                        <p>
                            <span class="Color_black">
                                医生手机:
                            </span>
                            <span class="Color_gray6" v-text="datalist.phone">
                                {{ datalist.phone }}
                            </span>
                        </p>
                    </td>

                </tr>
                <tr>
                    <td><span class="Color_black">所属科室:</span><span class="Color_gray6" v-text="datalist.department_name">内科系统</span></td>
                </tr>
            </table>
        </div>
        <div class="bg_f Mg-B24 mydiv">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">关联疾病</p>
            <table class="Mg-T12">
                <tr>
                    <td width="33.3%">
                        <p class="Ft-S14 Color_gray6" v-text='datalist.title'>
                            慢性支气管炎 丨 慢性阻塞性肺气肿 丨 风湿性心脏病 丨 心律失常
                        </p>
                    </td>
                </tr>
            </table>
        </div>
        <div class="bg_f Mg-B24 mydiv">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">认证信息</p>
            <table class="Mg-T12">
                <tr>
                    <td width="33.3%">
                        <p class="Ft-S14">
                            <span class="Color_black">身份证号:</span>
                            <span class="Color_gray6" v-text="datalist.IDnumber">230123456712345678</span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td class="Pd-T10">
                        <ul class="clear idcardphoto">
                            <li class="fl Pd-R60">
                                <div><img style='width: 157px; height: 157px;border-radius: 4px;' :src="$http.baseURL+datalist.zcard" alt=""></div>
                                <p class="Mg-T10 Ft-S14 Color_black">身份证正面</p>
                                <p class="line"></p>
                            </li>
                            <li class="fl Pd-L60 Pd-R60">
                                <div><img style='width: 157px; height: 157px;border-radius: 4px;' :src="$http.baseURL+datalist.fcard" alt=""></div>
                                <p class="Mg-T10 Ft-S14 Color_black">身份证反面</p>
                                <p class="line"></p>
                            </li>
                            <li class="fl">
                                <div class="Mg-L60"><img src="" alt=""></div>
                                <p class="Mg-T10 Mg-L30 Ft-S14 Color_black">执业证 / 资质证 / 职称证（三选一）</p>
                            </li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>
        <div class="bg_f Mg-B24 mydiv">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black"> 
                <span>服务信息:</span>
                
            </p>
            <table class="Mg-T12">
                <tr>
                    <td width="33.3%">
                        <p class="Ft-S14">
                            <span class="Color_black">服务内容：</span>
                            <span class="Color_gray6" v-text='datalist.title'>慢性支气管炎 丨 慢性阻塞性肺气肿 丨 风湿性心脏病 丨 心律失常</span>
                        </p>
                    </td>
                </tr>
            </table>
        </div>
        <div class="bg_f Mg-B24 mydiv">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">展示效果</p>
            <table class="Mg-T12">
                <tr>
                    <td width="33.3%">
                        <p class="Ft-S14">
                            <span class="Color_black">是否开启推荐：</span>
                            <span class="Color_gray6" v-text="datalist.sort==1?'开启':'关闭'">开启</span>
                        </p>
                    </td>
                </tr>
            </table>
        </div>
        <p class="ac"><span class="Color_white Ft-S16 goback pointer Mg-R28" @click="go('/data/doctorList')" style="background:#fff;color:rgba(49, 150, 255, 1)!important;border:1px solid rgba(49, 150, 255, 1)">返回</span><span class="Color_white Ft-S16 goback pointer" @click="editUp">编辑信息</span></p>

    </div>
</template>
<script>
export default {
    name: 'doctordetail',
    data() {
        return {
            datalist:'', // 用户信息
            id: ''       // 获取id
        }
    },
    mounted() {
        this.initdata();
        this.id = this.$route.query.id
    },
    methods: {
        initdata() {
            var _this = this;
                _this.$http.post('/shv2/data/doc_look', _this.$route.query, function (res) { //  查看获取用户信息
                console.log(res)
                    if (res.code == 1) {
                        _this.datalist=res.data;
                        _this.num = res.data.business
                        console.log(_this.num)
                    }
                }, function (err) { console.log(err) });
        },
        editUp () {
            this.go('/data/doctorList/doctorEdit?id=' + this.id)
        }
    }
}
</script>
<style>
.layui-form-checkbox {
    padding-left: 25px !important;
}
</style>

<style scoped lang="less">
#doctordetail {
    input,
    input:hover,
    input:focus {
        width: 60px;
        height: 30px;
        text-align: center;
        border: 1px solid #c2c3c3 !important;
        margin-right: 5px;
        margin-left: 10px;
    }
    .mydiv {
        border-radius: 4px;
        padding-bottom: 12px;
        .bookingorderdetail_tit {
            border-bottom: 1px solid #f1f2f9;
        }
        table {
            width: 100%;
            text-align: left;
            margin-left: 24px;
            font-size: 14px;
            color: #333;
            td {
                height: 38px;
                .idcardphoto {
                    li {
                        position: relative;
                        text-align: center;
                        div {
                            width: 158px;
                            height: 158px;
                            line-height: 158px;
                            border: 1px dashed #c2c2c2;
                            border-radius: 8px;
                        }
                        .line {
                            position: absolute;
                            z-index: 66;
                            height: 60px;
                            width: 1px;
                            background: #dddddd;
                            right: 0px;
                            top: 50px;
                        }
                    }
                }
            }
        }
    }
    .goback {
        display: inline-block;
        width: 120px;
        height: 40px;
        line-height: 40px;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        margin-top: 24px;
    }
}

.introduction {
    display: flex;
}
</style>
