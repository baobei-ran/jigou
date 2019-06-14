<template>
    <div id="bankcard_sh" class="bg_f Pd-B40">
        <p class="recharge_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24">
            认证机构信息
        </p>

        <div class="Pd-T24 Pd-L24 Pd-R24" > 
            <p class="sh_status" v-show="auditingmsg.hospital_status==3">当前审核状态：<span>审核中</span></p>
            <div class="sh_status" v-show="auditingmsg.hospital_status==2">
                当前审核状态：审核未通过 <button class="onup" @click="go('/setting/boxMechanismMsg')">重新上传</button>
                <p class="Ft-S14 Color_gray6 Mg-T24">
                    未通过原因：{{auditingmsg.remark}}
                </p>
            </div>
            <div class="sh_status" v-show="auditingmsg.hospital_status==1">
                当前审核状态：审核通过 <button class="onup" @click="Returns">返回首页</button>
            </div>
        </div>
        
        <!-- 药店审核中 -->
        <div class="Pd-L24 Pd-R24" v-if="auditingmsg.hospital_status!=1">
            <table class="Mg-T24" width="100%">
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        机构类型：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.structureType">药店</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">机构名称：</td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.hospital_name">北京同仁堂大药房</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        营业执照号：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.license_number">222t76576222*********988</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        营业执照：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black">
                        <i class="fileimg"></i>营业执照已成功上传
                    </td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        法人姓名：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black"  v-text="auditingmsg.method_name">
                        张三
                    </td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        法人身份证号：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.method_prove">6776 **** **** 7777</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        法人身份证照片：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black"><i class="fileimg"></i>身份证已成功上传</td>
                </tr>
                <tr class="">
                    <td width="120px" class="Ft-S14 Color_gray6 v-top Pd-T10" align="right">
                        认证资料：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black Pd-T10">
                        <p class="Mg-B18"><i class="fileimg"></i>GSP认证证书已成功上传</p>
                        <p class="Mg-B18"><i class="fileimg"></i>药品经营许可证已成功上传</p>
                        <p class="Mg-B18"><i class="fileimg"></i>药师资格证已成功上传</p>
                    </td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        证件缺失申请：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black">
                        <p><i class="fileimg"></i>已提交</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <p style="border-top:1px solid #E6E6E6;" class="Mg-T20 Pd-B20"></p>
                    </td>

                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        业务联系人：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.owner_name">张三</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        联系电话：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.owner_mobile">197****3333</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        机构经营地址：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.address">北京市朝阳区安定门外小关街51号</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        机构电话：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.telephone">（010）51190889</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        经纬度：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black">经度（Y）{{auditingmsg.longitude}}|纬度（X）{{auditingmsg.latitude}}</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6 Pd-T10 v-top" align="right">
                        机构简介：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black Pd-T10">
                        <p style="max-width:993px" v-text="auditingmsg.introduction"></p>
                    </td>
                </tr>
            </table>
        </div>
        
        <div class="Pd-L24 Pd-R24" v-if="auditingmsg.hospital_status==1">
            <table class="Mg-T24" width="100%">
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        机构账号：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.login_phone">药店</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">机构名称：</td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.hospital_name">北京同仁堂大药房</td>
                </tr>
                <tr>
                    <td colspan="2">
                        <p style="border-top:1px solid #E6E6E6;" class="Mg-T20 Pd-B20"></p>
                    </td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        业务联系人：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.owner_name">（010）51190889</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        联系电话：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.owner_mobile">（010）51190889</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        机构经营地址：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.address">（010）51190889</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        机构电话：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.telephone">（010）51190889</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        经纬度：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black">经度（Y）{{auditingmsg.longitude}} | 纬度（X）{{auditingmsg.latitude}}</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        机构简介：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.introduction">（010）51190889</td>
                </tr>
            </table>

        </div>
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {
            auditingmsg: '',
            ishospital: this.$route.query.hospital,
            isStatus: '',
            isfalg: this.localstorage.get('flagYao'),
            isfalg2: this.localstorage.get('flagYao2')
        }
    },
    created() {
        var zheng = this.$route.query.zheng
        console.log(zheng)
        if (zheng) {
            this.$router.replace('/setting/boxMechanismMsg/Yaocheckmemsg')
            window.location.reload()
        }
    },
    mounted() {
        this.initdata()
        var _this = this;
        this.isStatus = setInterval(function () {
            _this.initStatus()
        }, 5000)
    },
    methods: {
        initStatus() {// 查询状态
            var _this = this
            _this.$http.post('/shv2/Setting/look_hos', {}, function (res) {
                console.log(res)
                if (res.code == 1) {
                    if (res.data.hospital_status == 1 || res.data.hospital_status == 2 ) {
                        _this.initdata()
                        clearInterval(_this.isStatus)
                        if (res.data.hospital_status == 1) {
                            var userStatus = _this.localstorage.get('logindata')
                            if (userStatus.hospital_status !== 1) {
                                userStatus.hospital_status = 1
                                userStatus.name =  rea.data.hospital_name
                                userStatus.uid = rea.data.uid
                                userStatus.number = rea.data.hospital_number
                                userStatus.phone = rea.data.login_phone
                                userStatus.type = rea.data.htype
                                _this.localstorage.put('logindata',userStatus);
                               if (_this.isfalg) {
                                    console.log('通过')
                                    return 
                                }
                                var isF = _this.localstorage.put('flagYao', '1');
                                function refresh(){
                                    window.location.reload();
                                    console.log('test')
                                    setTimeout(refresh , 3000);   
                                }
                                refresh()  
                            }
                        } else if (res.data.hospital_status == 2) {
                            if (_this.isfalg2) {
                                console.log('test')
                                return 
                            }
                            var isF = _this.localstorage.put('flagYao2', '2');
                            function refresh(){
                                window.location.reload();
                                console.log('test')
                                setTimeout(refresh , 3000);   
                            }
                           refresh()   
                            
                        }
                        
                    } 
                }
            }, function () {

            })
        },
        initdata() {//  药店状态和数据
            var _this = this
            layui.use(["layer"], function () {
                var layer = layui.layer
                _this.$http.post('/shv2/Setting/look_hos', {}, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        _this.auditingmsg = res.data;
                    } else {
                        layer.msg(res.msg)
                    }
                }, function () {

                })
            })
            $('#showimg').on('change', function () {//医院上传图片
                $('#showimg3').attr('style', 'background:url(' + window.URL.createObjectURL(this.files[0]) + ');background-size:cover');
            })
        },
        Returns () {
            this.$router.replace('/?login=true')
        }
    },
    beforeDestroy () {
        clearInterval(this.isStatus)
    }
}
</script>

<style scoped lang="less">
#bankcard_sh {
    input {
        height: 36px;
        padding-left: 10px;
        border: 1px solid rgba(194, 194, 195, 1);
    }
    .recharge_tit {
        border-bottom: 1px solid #f1f2f9;
    }
    .onup {
        width: 80px;
        height: 30px;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        border: none;
        color: #fff;
        margin-left: 23px;
    }
    .sh_status {
        padding: 18px;
        background: #eaf4ff;
        border: 1px solid #3196ff;
        color: #3196ff;
        font-size: 14px;
    }
    .fileimg {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url(../../../common/image/pages/account/icon_sfz.png)
            no-repeat;
        position: relative;
        top: 2px;
        margin-right: 5px;
    }
    .filetext {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url(../../../common/image/pages/account/icon_wj.png)
            no-repeat;
        position: relative;
        top: 2px;
        margin-right: 5px;
    }
    .next_textarea {
        resize: none;
        width: 70%;
        height: 160px;
    }
    .uploadimg {
        width: 158px;
        height: 158px;
        text-align: center;
        position: relative;
        border: 1px dashed #c2c2c2;
        border-radius: 4px;
        input {
            width: 158px;
            height: 158px;
            opacity: 0;
            position: absolute;
            left: 0px;
            z-index: 3;
        }
        span {
            display: block;
            color: #c2c2c2;
            width: 158px;
            height: 158px;
            padding-top: 100px;
            background: url(../../../common/image/pages/account/icon_pic.png)
                no-repeat center 44px;
            position: absolute;
            z-index: 0;
            left: 0px;
            background-size: cover !important;
        }
        p {
            margin-top: 168px;
        }
    }
    .onsubmit {
        width: 110px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        color: #fff;
        font-size: 16px;
        border: none;
        margin-bottom: 46px;
    }
}
</style>
