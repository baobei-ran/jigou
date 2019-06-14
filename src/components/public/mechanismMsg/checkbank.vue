<template>
    <div id="bankcard_sh" class="bg_f Pd-B40">
        <p class="recharge_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24">
            认证机构信息
        </p>

        <div class="Pd-T24 Pd-L24 Pd-R24"> 
            <p class="sh_status" v-show="auditingmsg.hospital_status ==3">当前审核状态：<span>审核中</span></p>
            <div class="sh_status" v-show="auditingmsg.hospital_status==2">
                当前审核状态：审核未通过 <button class="onup" @click="go('/setting/boxMechanismMsg')">重新上传</button>
                <p class="Ft-S14 Color_gray6 Mg-T24">
                    未通过原因：{{auditingmsg.remark}}
                </p>
            </div>
            <div class="sh_status" v-show="auditingmsg.hospital_status==1">
                当前审核状态：审核通过 <button class="onup pointer" @click="Returns">返回首页</button>
            </div>
        </div>
        <!-- 医院审核中 -->
        <div class="Pd-L24 Pd-R24" v-if="true">
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
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.method_name">
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
                        医院类型：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.tname"></td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        机构等级：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.gname">（010）51190889</td>
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
                    <td class="Pd-L24 Ft-S14 Color_black">经度（Y）{{auditingmsg.longitude}}|纬度（X）{{auditingmsg.latitude}}</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        展示图片：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black"><i class="fileimg"></i>图片已成功上传</td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6 Pd-T10 v-top" align="right">
                        机构简介：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black Pd-T10">
                        <p style="max-width:993px" v-text="auditingmsg.introduction">医院（Hospital）一词是来自于拉丁文原意为“客人”，因为一开始设立时，是供人避难，还备有休息间，使来者舒适，有招待意图。后来，才逐渐成为满足人类医疗需求，提供医疗服务的专业机构，收容和治疗病人的服务场所。</p>
                    </td>
                </tr>
            </table>
        </div>
        <!-- 医院成功 -->
        <div class="Pd-L24 Pd-R24" v-if="false">
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
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_gray6 v-top" align="right">
                        <span class="Color_red">*</span> 机构简介：
                    </td>
                    <td class="Pd-L24 Pd-B20 Ft-S16 Color_gray6">
                        <textarea name="desc" placeholder="请输入内容" v-model="auditingmsg.introduction" class="layui-textarea next_textarea"></textarea>
                    </td>
                </tr>

                <tr class="" height="182px">
                    <td width="160px" class="Ft-S14 Color_gray6 v-top" align="right">
                        展示图片：
                    </td>
                    <td class="Pd-L24 Ft-S16 Color_gray6 Pd-B60">
                        <div class="fl uploadimg Mg-R24">
                            <span class="Ft-S14" id="showimg3" :style="'background:url('+$http.baseURL+auditingmsg.picture+');'"></span> <input type="file" id="showimg" placeholder="" />
                            <p class="Ft-S14 Color_gray6">用于机构展示<br> <em class="Ft-S8 Color_grayA">建议尺寸：120*120</em></p>
                        </div>
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
                    <td class="Pd-L24 Ft-S14 Color_black">
                        <div class="layui-input-inline">
                            <input type="text" v-model="auditingmsg.owner_name" placeholder="" style="width: 500px;" />
                        </div>
                    </td>
                </tr>
                <tr height="20px"></tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        联系电话：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black">
                        <div class="layui-input-inline">
                            <input type="text" v-model="auditingmsg.owner_mobile" placeholder="" style="width: 500px;" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <p style="border-top:1px solid #E6E6E6;" class="Mg-T20 Pd-B20"></p>
                    </td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        认证状态：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black">
                        审核通过
                    </td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        机构类型：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.structureType"></td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        省市区：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.site"></td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        营业执照地址：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.license_address"></td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        医院类型：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.tname"></td>
                </tr>
                <tr class="" height="34px">
                    <td width="120px" class="Ft-S14 Color_gray6" align="right">
                        机构等级：
                    </td>
                    <td class="Pd-L24 Ft-S14 Color_black" v-text="auditingmsg.gname">（010）51190889</td>
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
                    <td class="Pd-L24 Ft-S14 Color_black">经度（Y）{{auditingmsg.longitude}}|纬度（X）{{auditingmsg.latitude}}</td>
                </tr>
                <tr>
                    <td></td>
                    <td class="Pd-L24 Pd-T40">
                        <p class="Ft-S16 onsubmit pointer" @click="onsubmit">
                            保存
                        </p>
                    </td>
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
            isStatus: '',
            isfalg: this.localstorage.get('flag'),
            isfalg2: this.localstorage.get('flag2')
        }
    },
    created () {
        var zheng = this.$route.query.zheng
        console.log(zheng)
        if (zheng) {
            this.$router.replace('/setting/boxMechanismMsg/checkmemsg')
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
                                var isF = _this.localstorage.put('flag', '1');
                                function refresh(){
                                    window.location.reload();
                                    console.log('test')
                                    setTimeout(refresh , 3000);   
                                }
                                refresh()  
                            }
                                
                            } else if (res.data.hospital_status == 2) {
                                if (_this.isfalg2) {
                                    console.log('通过')
                                    return 
                                }
                                var isF = _this.localstorage.put('flag2', '2');
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
        initdata() {// 医院数据
            var _this = this
            layui.use(["layer"], function () {
                var layer = layui.layer
                _this.$http.post('/shv2/Setting/look_hos', {}, function (res) {
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
        },
        onsubmit() {//医院最后保存
            var _this = this;
            var fromdata = new FormData()
            fromdata.append('introduction', _this.auditingmsg.introduction);
            fromdata.append('name', _this.auditingmsg.owner_name);
            fromdata.append('mobile', _this.auditingmsg.owner_mobile);
            $.each($('#showimg')[0].files, function (i, file) {
                fromdata.append('pic', file);
            });
            layui.use(["layer"], function () {
                var layer = layui.layer
                _this.$http.upload('/shv2/Setting/edit_hos', fromdata, function (res) {
                    if (res.code == 1) {
                        layer.msg('保存成功')
                        _this.initdata()
                    } else {
                        layer.msg(res.msg)
                    }
                }, function () {

                })
            })
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
