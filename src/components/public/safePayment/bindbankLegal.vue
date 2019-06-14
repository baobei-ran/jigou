<template>
    <div id="" class="">
        <div id="bindbank_card" class="bg_f Pd-B40">
            <p class="recharge_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10">
                绑定银行卡
            </p>
            <table class="Mg-T24">
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 提现账户类型：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="layui-input-inline">
                            <select name="" id="type" lay-verify="" class="input_txt">
                                <option value="1">法人账户</option>
                                <option value="2">其他账户</option>
                                <!-- <option value="3">对公账户</option> -->
                            </select>
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 法人姓名：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" id="fname" v-model='userName' disabled placeholder="" class='input_txt' />
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 法人身份证号码：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" id="fmycode" v-model='IDcard' disabled placeholder="" class='inputTxt'/>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 开户银行：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" v-model='account_open' placeholder="请输入开户银行" class='inputTxt'/>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 银行卡号：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" id="bankcode" placeholder="请输入银行卡号" v-model='card_num' class='inputTxt' />
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 银行预留手机号：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="number" id="phone" placeholder="请输入手机号" v-model='phone' class='inputTxt' />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="Pd-L44 Pd-T40">
                        <button class="layui-btn Ft-S16 layui-btn-normal"  id="addbackpublic" :disabled='disabled'>提交</button>
                    </td>
                </tr>
            </table>
        </div>

        
        <!-- 弹出层 -->
        <div id="layer_getcode" class="hide">
            <table class="Mg-T46 Ft-S16 tb_pop">
                <tr>
                    <td width="100px" align="right">手机号：</td>
                    <td width="210px" class="Pd-L40" id="layerphone"></td>
                </tr>
                <tr class="Mg-T20">
                    <td width="100px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 验证码：
                    </td>
                    <td class="Pd-L30 Ft-S16 Color_gray6">
                        <input type="text" id="code" placeholder="请输入验证码" v-model='auth_code' style="width: 210px;height: 40px" class="Pd-L10" /><span class="getcode" id="getcode">获取验证码</span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center">
                        <button class="acitve_btn Ft-S16 Color_white Mg-T60" id="confirm">
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
            disabled: false,    // 提交按钮
            userName: '',       // 姓名
            IDcard: '',         // 身份证
            account_open: '',   // 开户银行
            card_num: '',       // 银行卡号
            phone:'',           // 银行手机号
            auth_code: '',      // 验证码
            flag: false,        // 调取弹框
            noneclick: false,    // 控制时间
            merchantFlowId: ''   // 绑卡请求号
        }
    },
    mounted() {
        this.initdata();
        var _this = this;
        this.$http.post('/shv2/account/law_name', {}, function (res){
            // console.log(res)
            if (res.code == 1) {
                _this.userName = res.data.method_name
                _this.IDcard = res.data.method_prove
            }
        }, function (err) { console.log(err)})
    },
    methods: {
        initdata() {
            var _this = this
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                $("#type").on("change", function () {
                    if ($("#type").val() == 2) {
                        _this.go('/finance/bankcardadmin/bindbankPerson')   // 其他账户
                    } else if ($("#type").val() == 3) {
                        _this.go('/finance/bankcardadmin/safePayment')  // 对公账户，已隐藏
                    }
                });

                $("#getcode").on("click", function () {
                    //获取验证码
                    var _self = $(this);
                    if (_this.noneclick) {
                        return;
                    }
                    _this.$http.post('/shv2/account/resendSms', { merchantFlowId: _this.phone}, function (res) {
                        console.log(res)
                        if (res.code == 1) {
                            layer.msg(res.msg)
                            var time = 60;
                            _self.text("(60s)重获");
                            var settime = setInterval(function () {
                                if (!time) {
                                    _this.noneclick = false;
                                    _self.text("重新获取");
                                    clearInterval(settime);
                                    return;
                                }
                                _this.noneclick = true;
                                time--;
                                _self.text("(" + time + "s)重获");
                            }, 1000);
                        } else {
                            layer.msg(res.msg)
                        }
                    }, function (err) { consoel.log(err)})
                    
                });
                // 提交
                $("#addbackpublic").on("click", function () {
                    
                    var isphone = /^1[3456789]\d{9}$/;
                    var pattern = /^([1-9]{1})(\d{14}|\d{18})$/;
                    var isIDCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                   
                    if (!_this.account_open) {
                        //开户银行
                        layer.msg("请输入正确的开户银行");
                        return;
                    }
                    if (!_this.card_num || !pattern.test(_this.card_num)) {
                        //银行卡号
                        layer.msg("请输入正确的银行卡号");
                        return;
                    }

                    if (!_this.phone || !isphone.test(_this.phone)) {
                        //银行预留手机号
                        layer.msg("请输入正确的手机号");
                        return;
                    }
                    _this.disabled = true
                    // 提交
                    var obj = { depositBank: _this.account_open, bankCardNo: _this.card_num, phone: _this.phone }
                    _this.$http.post('/shv2/account/add_bank_legal', obj, function (res) {              // 法人账户绑定银行卡
                        console.log(res)
                        _this.disabled = false
                        if (res.code == 1) {
                            _this.merchantFlowId = res.merchantFlowId;
                            _this.flag = true
                            layer.msg(res.msg)
                            if (!_this.noneclick) { // 初始化是false 的时候调用时间，只调用一次
                                var time = 60;
                                var _self = $("#getcode")
                                _self.text("(60s)重获");
                                var settime = setInterval(function () {
                                    if (!time) {
                                        _this.noneclick = false;
                                        _self.text("重新获取");
                                        clearInterval(settime);
                                        return;
                                    }
                                    _this.noneclick = true;       // 执行的时候显示 true，避免冲突
                                    time--;
                                    _self.text("(" + time + "s)重获");
                                }, 1000);
                            }


                            if (_this.flag) { // 调用弹框  
                                $("#layerphone").text(_this.phone); //弹框手机号
                                var index = layer.load(1, {     // 开启loading
                                    shade: [0.1, "#000"] //加载层
                                });

                                // layer.closeAll()//关闭弹框
                                layer.open({
                                    type: 1,
                                    shade: false,
                                    closeBtn: 1,
                                    title: "验证码",
                                    content: $("#layer_getcode"),
                                    area: ["560px", "360px"],
                                    cancel: function () { 
                                        layer.close(index); // 关闭loading
                                        // layer.msg('绑卡失败')
                                        
                                    }
                                });
                            }


                        } else {
                            layer.msg(res.msg);
                            _this.flag = false
                            
                        }
                    }, function (err) { _this.disabled = false; console.log(err)})

                    
                });

                $("#confirm").on("click", function () {
                    //弹出框提交
                    if (!_this.auth_code) {
                        //验证码
                        layer.msg("请输入正确的验证码");
                        return;
                    } else {
                        // layer.closeAll() //关闭弹框
                        var obj = { merchantFlowId: _this.merchantFlowId, smsCode: _this.auth_code } // 传递的参数
                        _this.$http.post('/shv2/account/smsConfirm', obj, function (res) {
                            console.log(res)
                            if (res.code == 1) {
                                layer.closeAll();
                                _this.go('/finance/bankcardadmin/success?name=yes')     //  绑卡成功后跳转成功提示
                            } else if (res.code == 2) {
                                layer.msg(res.msg)
                            } else {
                                layer.msg(res.msg)
                            }
                        }, function (err) { console.log(err)})
                    }
                });
            });

        }
    },
    beforeDestroy() {
       
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
    }
    .input_txt {
        width: 200px;
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
    input:focus,
    input:hover {
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
        cursor:pointer;
    }
    .showimg {
        width: 158px;
        height: 158px;
    }
  
}
//绑卡页面弹框
#layer_getcode {
    .tb_pop {
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
    .Color_gray6 {
        margin-top: 20px;
        -ms-display: flex;
        -o-display: flex;
        -moz-display: flex;
        -webkit-display: flex;
        display: flex;
    }
}
</style>
