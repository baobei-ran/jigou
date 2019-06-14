<template>
    <div id="" class="">
        <div id="bindbank_card" class="bg_f  Pd-B40">
            <p class="recharge_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10">
                绑定银行卡
            </p>
            <table class="Mg-T24">
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 提现账户类型：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_gray6">
                        <div class="layui-input-inline" style="width: 200px;">
                           个人账户
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 姓名：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_gray6">
                        {{ userName }}
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 身份证号码：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_gray6">
                        {{ IDcrad }}
                    </td>
                </tr>
                
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 开户银行：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="layui-input-inline">
                            <!-- <select name="" id="khh_bank" lay-verify="" >
                                <option value="">请选择开户行</option>
                            </select> -->
                            <input type="text" class='inputTxt' id='khh_bank' v-model='account_open' placeholder="请填写开户行" />
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 银行卡号：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="number" class='inputTxt' v-model='bank_card' id="bankcode" placeholder="请填写银行卡号"  />
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 银行预留手机号：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="number" class='inputTxt' v-model='phone' id="phone" placeholder="请填写银行预留手机号" />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="Pd-L44 Pd-T40">
                        <button class="bankrecharge Ft-S16" id="addbackpublic" >
                            提交信息
                        </button>
                    </td>
                </tr>
            </table>
        </div>
        <div id="layer_getcode" class="hide">
            <table class="Mg-T46 Ft-S16 tb_open">
                <tr>
                    <td width="100px" align="right">手机号：</td>
                    <td width="210px" class="Pd-L40" id="layerphone">18232337779</td>
                </tr>
                <tr class="tr_conter">
                    <td width="100px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 验证码：
                    </td>
                    <td class="Pd-L30 Ft-S16 Color_gray6 yanma">
                        <input type="text" id="code" v-model='verification_code' placeholder="请输入验证码" style="width: 210px;height: 40px" class="Pd-L10" />
                        <span v-show="sp" class="getcode" id="getcode">获取验证码</span>
                        <span v-show="!sp"  class="getcode">({{ time }}s)重获</span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center">
                        <button class="acitve_btn Ft-S16 Color_white Mg-T50" id="confirm" >
                            确认
                        </button>
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
            userName: '',            // 姓名
            IDcrad: '',              // 身份证
            account_open: '',        // 开户银行
            bank_card: '',           // 银行卡
            phone: '',               //  手机号
            verification_code: '',   // 验证码
            flag: false,             // 是否发送手机验证码
            time: '60',              //  时间
            sp: true,                // 按钮时间切换
            cleardate: '',           //  储存时间
            merchantFlowId: ''       //  绑卡请求号
        }
    },
    mounted() {
        this.initdata()
        var _this = this;
        this.$http.post('/shv2/account/add_bank_person_audit', {}, function (res) {
            // console.log(res)
            if(res.code == 1) {
                _this.userName = res.data.name;
                _this.IDcrad = res.data.idcard
            }
        }, function (err) { console.log(err)})
    },
    methods: {
        initdata() {
          var _this=this
            layui.use(["layer"], function () {
                var $ = layui.jquery;
                $("#type").on("change", function () {
                    if ($("#type").val() == 2) {
                        _this.go('/setting/safePayment')
                    } else if ($("#type").val() == 3) {
                        _this.go('/setting/safePayment/bindbankLegal')
                    }
                });

                // 提交按钮
                $("#addbackpublic").on("click", function () {   
                    var isphone = /^1[3456789]\d{9}$/;
                    var pattern = /^([1-9]{1})(\d{14}|\d{18})$/;
                    var isIDCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                    // if (!$("#name").val()) {
                    //     //姓名
                    //     layer.msg("请填写正确的姓名");
                    //     return;
                    // }
                    // if (!$("#mycode").val() || !isIDCard.test($("#mycode").val())) {
                    //     //身份证号码
                    //     layer.msg("请填写正确的身份证号码");
                    //     return;
                    // }

                    if (!_this.account_open) {
                        //开户行
                        layer.msg("请填写开户行");
                        return;
                    }
                    if (!_this.bank_card || !pattern.test(_this.bank_card)) {
                        //银行卡号
                        layer.msg("请输入正确的银行卡号");
                        return;
                    }
                    if (!_this.phone || !isphone.test(_this.phone)) {
                        //银行预留手机号
                        layer.msg("请输入正确的手机号");
                        return;
                    }
                    // layer.closeAll() //关闭弹框 

                     var obj = { depositBank: _this.account_open, bankCardNo: _this.bank_card, phone: _this.phone }
                    _this.$http.post('/shv2/account/add_bank_person_bind', obj, function (res) {                    // 其他账户绑定银行卡
                    
                        console.log(res)
                        if(res.code == 1) {
                            layer.msg(res.msg)
                            _this.flag = true
                            _this.merchantFlowId = res.merchantFlowId;  // 绑卡请求号
                             if (_this.flag) {
                                // 弹出层
                                $("#layerphone").text(_this.phone);  // 弹框手机号
                                var index = layer.load(1, {          // 调用loading动画
                                    shade: [0.1, "#000"]             // 加载层
                                });
                             var time = 60;
                            _this.sp = false;
                            _this.cleardate = setInterval(function () {
                                if (!time) {
                                        _this.sp = true;
                                        _this.time = 60;
                                        clearInterval(_this.cleardate);
                                        return;
                                    }
                                    time--;
                                    _this.time = time
                                }, 1000);
                            layer.open({    // 弹框
                                type: 1,
                                shade: false,
                                closeBtn: 1,
                                title: "验证码",
                                content: $("#layer_getcode"),
                                area: ["560px", "360px"],
                                cancel: function () {           // 右上角关闭回调
                                    
                                         layer.close(index)     // 关闭loading
                                        _this.sp = true;
                                        _this.time = '60'
                                        clearInterval(_this.cleardate);
                                   
                                   
                                }
                            });
                            }
                        } else {
                            layer.msg(res.msg)
                            _this.flag = false
                          
                        }
                    }, function (err) { console.log( err)})

                    
                    
                    
                       
                        // layer.open({
                        //     type: 1,
                        //     shade: false,
                        //     closeBtn: 1,
                        //     title: "验证码",
                        //     content: $("#layer_getcode"),
                        //     area: ["560px", "360px"],
                        //     cancel: function () {   //右上角关闭回调
                        //         layer.close(index)  // 关闭loading
                        //         layer.msg('绑卡失败')
                        //     }
                        // });
                    
                    

                
                    var noneclick = false
                $("#getcode").on("click", function () {
                    //获取验证码
                    _this.$http.post('/shv2/account/resendSms', { merchantFlowId: _this.phone }, function (res) {   // 绑卡重发验证码
                        console.log(res)
                        if (res.code == 1) {
                            // layer.msg(res.msg)
                             noneclick = true
                            if (noneclick) {
                                var time = 60;
                                _this.sp = false;
                                _this.cleardate = setInterval(function () {
                                    if (!time) {
                                        _this.sp = true;
                                        clearInterval(_this.cleardate);
                                        return;
                                    }
                                    time--;
                                    _this.time = time
                                }, 1000);
                            }
                            
                        } else {
                            // layer.msg(res.msg)
                            noneclick = false
                        }
                    }, function (err) { console.log(err)})
                });
                    
                    
                    
                });

                //弹出框确认提交
                $("#confirm").on("click", function () {
                    //弹出框提交
                    if (!_this.verification_code ) {
                        //验证码
                        layer.msg("请输入正确的验证码");
                        return;
                    } else {
                       
                        var obj = { merchantFlowId: _this.merchantFlowId, smsCode: _this.verification_code }
                        _this.$http.post('/shv2/account/smsConfirm', obj, function (res) {           // 绑卡短信确认
                            console.log(res)
                            if (res.code == 1) {
                                 layer.closeAll() //关闭弹框和loading
                                _this.go('/finance/bankcardadmin/success?name=yes')     // 绑卡成功后跳转成功提示
                            } else {
                                layer.msg(res.msg);
                            }
                        }, function (err) { console.log(err)})
                    }
                });
            });

        }
    },
    beforeDestroy() {
        clearInterval(this.cleardate)  // 离开前清楚定时器
    }
}
</script>

<style scoped lang="less">
//绑定
#bindbank_card {
    height: 100vh;
    .recharge_tit {
        border-bottom: 1px solid #f1f2f9;
    }
    select {
        display: block;
        height: 36px;
        padding-left: 10px;
        border: 1px solid rgba(194, 194, 195, 1);
    }
    .inputTxt {
        width: 300px;
        height: 36px;
        padding-left: 10px;
        border: 1px solid rgba(194, 194, 195, 1);
    }
    .inputTxt:focus,
    .inputTxt:hover {
        border: 1px solid rgba(194, 194, 195, 1);
    }
    .getcode {
        display: inline-block;
        width: 80px;
        height: 30px;
        border: 1px solid rgba(49, 150, 255, 1);
        border-radius: 4px;
        color: rgba(49, 150, 255, 1);
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        margin: 10px;
        cursor: pointer;
    }
    #addbackpublic {
        width: 110px;
        height: 40px;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        color: #fff;
        border: none;
    }
    .showimg {
        width: 158px;
        height: 158px;
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
            width: 158px;
            height: 158px;
            padding-top: 100px;
            background: url(../../../common/image/pages/account/icon_pic.png)
                no-repeat center 44px;
            position: absolute;
            z-index: 0;
            left: 0px;
        }
        p {
            margin-top: 168px;
        }
    }
    .upflie {
        div {
            position: relative;
            height: 36px;
            #uploadfile {
                width: 150px;
                height: 36px;
                position: absolute;
                left: 0px;
                z-index: 3;
                opacity: 0;
            }
            .file-up {
                display: block;
                border-radius: 4px;
                width: 150px;
                height: 36px;
                line-height: 36px;
                padding-left: 28px;
                background: #3196ff
                    url(../../../common/image/pages/account/icon_sc.png) no-repeat
                    10px;
                font-size: 14px;
                color: #fff;
                position: absolute;
                left: 0px;
                z-index: 0;
            }
        }
    }
}
//绑卡页面弹框
#layer_getcode {
    width: 100%;
    .tb_open {
        width: 100%;
    }
    input,
    input:focus,
    input:hover {
        border: 1px solid #e2e2e2;
    }
    .getcode {
        display: inline-block;
        width: 80px;
        height: 30px;
        border: 1px solid rgba(49, 150, 255, 1);
        border-radius: 4px;
        color: rgba(49, 150, 255, 1);
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        margin: 5px 10px;
        cursor: pointer;
    }
    .acitve_btn {
        width: 140px;
        height: 40px;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        border: none;
    }
    .tr_conter {
        > td {
            margin-top: 30px;
        }
    }
    .yanma {
        display: flex;
    }
}
</style>
