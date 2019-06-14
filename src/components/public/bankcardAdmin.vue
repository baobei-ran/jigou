<template>
    <div id="lyt_setting">
        <div class="bg_f Mg-B26">
            <p class="recharge_tit Ft-S16 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10 clear">
                <span class="fl">鲁医通账户设置</span><span class="fr"><span class="Color_blue Ft-S14 Mg-R24 pointer" @click="outbank"><i class="outbank_icon"></i>申请解绑银行卡</span><span class="Color_blue Ft-S14 Mg-R24 pointer" @click="exitpass"><i class="exitpass_cion"></i>修改交易密码</span></span>
            </p>
            <div class="Pd-B24 Pd-L24 Pd-R24">
                <div class="Pd-B24 Pd-L24 Pd-T24 Mg-T22 Ft-S14 Color_black backborder">
                    <p class="Mg-B20"><img class="Mg-R5" :src="$http.baseURL+dataObj.img" width="15px" height="15ox" alt="" style="position:relative;top:-2px">{{ dataObj.bank_name }}</p>
                    <p>{{ dataObj.numberu }}</p>
                </div>
            </div>
        </div>
        <div class="bg_f">
            <p class="recharge_tit Ft-S16 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10 clear">
                绑卡类型信息
            </p>
            <div class="Pd-B24 Pd-L24 Pd-R24 Mg-T10">
                <table>
                    <tr height="44px">
                        <td class="Ft-S14 Color_black" align="right">提现账户类型：</td>
                        <td class="Ft-S14 Color_gray6 Pd-L40">个人账户</td>
                    </tr>
                    <tr height="44px">
                        <td class="Ft-S14 Color_black" align="right">姓名：</td>
                        <td class="Ft-S14 Color_gray6 Pd-L40">{{ dataObj.userName }}</td>
                    </tr>
                    <tr height="44px">
                        <td class="Ft-S14 Color_black" align="right">身份证号：</td>
                        <td class="Ft-S14 Color_gray6 Pd-L40">{{ dataObj.idCardNo }}</td>
                    </tr>
                    <tr height="44px">
                        <td class="Ft-S14 Color_black" align="right">个人身份证照片：</td>
                        <td class="Ft-S14 Color_gray6 Pd-L40"><i class="photo_icon"></i>身份证照片已成功上传</td>
                    </tr>
                </table>
            </div>
        </div>

        <!-- 修改交易密码 -->
        <div id="exitpass" class="form_content_action hide">
            <div class="layui-form Mg-T40" >
                <div class="layui-form-item Mg-B24">
                    <label class="layui-form-label Color_black">原交易密码：</label>
                    <div class="layui-input-inline Mg-L16">
                        <ul id="ul0">
                            <input type="password" v-model='pass[0]' maxlength="1"/>
                            <input type="password" v-model='pass[1]' maxlength="1"/>
                            <input type="password" v-model='pass[2]' maxlength="1"/>
                            <input type="password" v-model='pass[3]' maxlength="1"/>
                            <input type="password" v-model='pass[4]' maxlength="1"/>
                            <input type="password" v-model='pass[5]' maxlength="1"/>
                        </ul>
                        <p class="clear Mg-T10 Ft-S14" style="width:300px"><span class="fl Color_gray6">请输入原交易密码</span><span class="fr Color_blue pointer" @click="forgetpass">忘记密码?</span></p>
                    </div>
                </div>
                <div class="layui-form-item  Mg-B24">
                    <label class="layui-form-label Color_black">新交易密码：</label>
                    <div class="layui-input-inline Mg-L16">
                        <ul id="ul1">
                            <input type="password" v-model='newPass[0]' maxlength="1"/>
                            <input type="password" v-model='newPass[1]' maxlength="1"/>
                            <input type="password" v-model='newPass[2]' maxlength="1"/>
                            <input type="password" v-model='newPass[3]' maxlength="1"/>
                            <input type="password" v-model='newPass[4]' maxlength="1"/>
                            <input type="password" v-model='newPass[5]' maxlength="1"/>
                        </ul>
                        <p class="Mg-T10 Mg-B20 Color_gray6">请输入6位数字支付密码</p>
                        <ul id="ul2">
                            <input type="password"  v-model='yesPass[0]' maxlength="1"/>
                            <input type="password"  v-model='yesPass[1]' maxlength="1"/>
                            <input type="password"  v-model='yesPass[2]' maxlength="1"/>
                            <input type="password"  v-model='yesPass[3]' maxlength="1"/>
                            <input type="password"  v-model='yesPass[4]' maxlength="1"/>
                            <input type="password"  v-model='yesPass[5]' maxlength="1"/>
                        </ul>
                        <p class="Mg-T10 Mg-B16 Color_gray6">请再次确定支付密码</p>
                    </div>
                </div>
                <div class="Mg-B24">
                    <div class="layui-input-block">
                        <a class="layui-btn" id="onsubmit" @click='editPass'>确认</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 忘记密码 -->
        <div id="forgetpass" class="form_content_action hide">
            <div class="layui-form Mg-T40" >
                <div class="layui-form-item Mg-B24">
                    <label class="layui-form-label">手机号：</label>
                    <div class="layui-input-inline">
                        <input type="tel" name="phone" required lay-verify="required" v-model='phone' style="width:300px" placeholder="" autocomplete="off" class="layui-input Mg-L16" maxlength="11" />
                    </div>
                </div>
                <div class="layui-form-item Mg-B24">
                    <label class="layui-form-label">验证码：</label>
                    <div class="layui-input-inline  Mg-L16">
                        <input type="tel" name="code" required lay-verify="required" v-model='phoneCode' style="width:210px" placeholder="请输入密码" autocomplete="off" maxlength="10" class="layui-input" />
                    </div>
                    <div class="layui-form-mid layui-word-aux Mg-L20 ac pointer getcode" @click="getcode">
                        获取验证码
                    </div>
                </div>
                <div class="layui-form-item  Mg-B24">
                    <label class="layui-form-label">支付密码：</label>
                    <div class="layui-input-inline Mg-L16">
                        <ul id="ul4">
                            <input type="password" maxlength="1"/>
                            <input type="password" maxlength="1"/>
                            <input type="password" maxlength="1"/>
                            <input type="password" maxlength="1"/>
                            <input type="password" maxlength="1"/>
                            <input type="password" maxlength="1"/>
                        </ul>
                        <p class="Mg-T10 Mg-B20 Color_gray6">请输入6位数字支付密码</p>
                        <ul id="ul5">
                            <input type="password" maxlength="1"/>
                            <input type="password" maxlength="1"/>
                            <input type="password" maxlength="1"/>
                            <input type="password" maxlength="1"/>
                            <input type="password" maxlength="1"/>
                            <input type="password" maxlength="1"/>
                        </ul>
                        <p class="Mg-T10 Mg-B16 Color_gray6">请再次确定支付密码</p>
                    </div>
                </div>
                <div class="Mg-B24">
                    <div class="layui-input-block">
                        <button class="layui-btn" @click='setPass'>确认</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 申请解绑银行卡 -->
        <div id="outbank" class="form_content_action hide">
            <form class="layui-form Mg-T40">
                <div class="layui-form-item Mg-B24">
                    <label class="layui-form-label">银行卡：</label>
                    <div class="layui-input-inline">
                        <input type="tel" name="bankcard" v-model='bankCard' required lay-verify="required" style="width:300px" placeholder="输入已绑定银行卡号" autocomplete="off" class="layui-input Mg-L16" id="bankcard" />
                    </div>
                </div>
                <div class="layui-form-item  Mg-B40">
                    <label class="layui-form-label">交易密码：</label>
                    <div class="layui-input-inline Mg-L16">
                        <ul id="ul3">
                            <input type="password" maxlength="1"/>
                            <input type="password" maxlength="1"/>
                            <input type="password" maxlength="1"/>
                            <input type="password" maxlength="1"/>
                            <input type="password" maxlength="1"/>
                            <input type="password" maxlength="1"/>
                        </ul>
                        <p class="clear Mg-T10 Ft-S14" style="width:300px"><span class="fl Color_gray6">请输入6位数字交易密码</span><span class="fr Color_blue pointer" @click="forgetpass">忘记密码?</span></p>
                    </div>
                </div>
                <div class="Mg-B24">
                    <div class="layui-input-block">
                        <button class="layui-btn" id="submit">确认</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {
            noneclick:false,                    // 
            pass: new Array(6),                 // 修改交易密码的原密码
            newPass: new Array(6),              // 修改交易密码的新密码
            yesPass: new Array(6),              // 确认新密码
            bankCard: '',                       // 申请解绑银行卡的卡号
            phone: '',                          // 手机号
            phoneCode: '',                      // 手机验证码
            dataObj: {
                bank_name: "",
                bankcard: "",
                banktel: "",
                bindid: "",
                idCardNo: "",
                img: "",
                money: "0.00",
                numberu: "",
                userName: "李大爷"
            }
        }
    },
    created() {
        this.initbank();
         
                // 以上是对下面的嵌套进行处理
        // this.$http.post('/shv2/account/if_bank', {}, function (res) {   // 查询机构是否绑卡
        //     if (res.code == 1) {    // 1 代表绑卡
        //         _this.go('/finance/bankcardadmin')  // 已绑定银行卡页面
        //         _this.getUserMsg();
        //     } else if (res.code == 0) {
        //         // 未绑卡的情况查询是否提交过其他账户审核状态
        //         _this.$http.post('/shv2/account/add_bank_person_audit',{}, function (res) {
        //             console.log(res)
        //             if (res.code == 1) {
        //                 var status = res.data.status;
        //                 if (status == 1) {
        //                     _this.go('/finance/bankcardadmin/otherform')  // 审核通过，进入绑卡模块
        //                 } else if (status == 3) {
        //                     _this.go('/finance/bankcardadmin/bindbankLegal') // 未绑卡进入法人页面
        //                 } else {
        //                     _this.go('/finance/bankcardadmin/checkbank')   // 其他账户审核情况
        //                 }
        //             }
        //         }, (err) => console.log(err))
        //     }
        // }, function (err) { console.log(err)})
        
    },
    mounted() {
        this.initdata();
        // if(true){//判断条件是否绑卡 如果绑卡则不跳转绑卡页面
        //     // this.go('/finance/bankcardadmin/safePayment')    // 跳转对公账户页面  已去掉，但页面还在，已隐藏
        // }
    },
    methods: {
        initbank () {
            var _this = this;
            function bank() {
            return _this.$http.$post('/shv2/account/if_bank', {})   // 查询机构是否绑卡
            }
            function zhuang () {
                return _this.$http.$post('/shv2/account/add_bank_person_audit',{})   // 未绑卡的情况查询是否提交过其他账户审核状态
            }

            this.$http.all([bank(), zhuang()], function (res, rea) {        // 处理并发请求
                // console.log(res, rea)
                if (res.code == 1) {    // 1 代表绑卡
                    _this.go('/finance/bankcardadmin')  // 已绑定银行卡页面
                    _this.getUserMsg();                 // 绑卡后获取卡号信息
                } else if (res.code == 0) {
                        if (rea.code == 1) {
                            var status = rea.data.status;
                            if (status == 1) {
                                _this.go('/finance/bankcardadmin/otherform')  // 审核通过，进入绑卡模块
                            } else if (status == 3) {
                                _this.go('/finance/bankcardadmin/bindbankLegal') // 未绑卡进入法人页面
                            } else {
                                _this.go('/finance/bankcardadmin/checkbank')   // 其他账户审核情况
                            }
                        }
                }
            })
        },




        initdata() {
            var _this = this;
            layui.use(["layer"], function () {
                var $ = layui.jquery,
                    layer = layui.layer;
                function inkeypress() {
                    $(this).val("");
                    var $input = $(this).next("input");
                    if ($input.length > 0) {
                        $input.focus();
                    }
                }
                $("#ul0>input").on("keypress", inkeypress);
                $("#ul1>input").on("keypress", inkeypress);
                $("#ul2>input").on("keypress", inkeypress);
                $("#ul3>input").on("keypress", inkeypress);
                $("#ul4>input").on("keypress", inkeypress);
                $("#ul5>input").on("keypress", inkeypress);
                
                
                
                // 解绑银行卡
                $('#submit').on('click', function () {
                    var password = '';
                    $('#ul3>input').each(function (i) {     // 获取支付密码
                        if ($(this).val()) {
                            password += $(this).val();
                        }
                    })
                    var pattern = /^([1-9]{1})(\d{14}|\d{18})$/,    // 验证身份证
                        num = /^\d{6}$/;
                    if (!_this.bankCard || !pattern.test(_this.bankCard)) {
                        layer.msg('请输入正确的银行卡号')
                        return false;
                    }
                    if (!(password.length == 6) || !num.test(password)) {
                        layer.msg('请输入正确的密码')
                        return false;
                    }
                    if (_this.bankCard != _this.dataObj.bankcard) {
                        layer.msg('银行卡号错误')
                        return false;
                    }
                    _this.$http.post('/shv2/account/unbind_bankcard', { pwd: password }, function (res) {    // 解绑银行卡
                        console.log(res)
                        if (res.code == 1) {
                            layer.msg(res.msg)
                            layer.closeAll('page');
                            _this.initbank();
                        } else {
                            layer.msg(res.msg)
                        }
                    }, function (err) { console.log(err)})
                    return false;
                })
            });
        },
        getcode(){  // 忘记密码弹框中的 获取验证码按钮
            var _salf = this;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var _layer = this;
                var isphone = /^1[3456789]\d{9}$/;
                if (!isphone.test(_salf.phone)) {
                    layer.msg("请输入正确的手机号");
                    return;
                }
                if (_salf.noneclick) {
                    return;
                }
                var time = 60;
                $('.getcode').text("(60s)重获");
               
                var settime = setInterval(function () {
                    if (!time) {
                        _salf.noneclick = false;
                        $('.getcode').text("重新获取");
                        clearInterval(settime);
                        return;
                    }
                    _salf.noneclick = true;
                    time--;
                    $('.getcode').text("(" + time + "s)重获");
                }, 1000);
                var obj =  { telphone: _salf.phone }
                _salf.$http.post('/shv2/Alidayu/sendSMS', obj, function (res) {         // 获取验证码
                    // console.log(res)
                    if (res.code == 1) {
                        _layer.layer.msg('短信发送成功')
                    } else {
                        _layer.layer.msg(res.msg)
                    }
                }, function (err) { console.log(err)})
            })
        },
        outbank() {//申请解绑银行卡按钮
            layui.use(["layer"], function () {
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    anim: 0,
                    title: "申请解绑银行卡",
                    shadeClose: true,
                    shade: 0.2,
                    area: ["560px", "360px"],
                    content: $("#outbank")
                });
            });

            $(".layui-layer-title").css({
                height: "50px",
                background: "#ECF2FB",
                "line-height": "50px"
            });
            $(".layui-layer-setwin").css("top", "19px");
        },
        exitpass() {// 修改交易密码 按钮
             this.pass = this.pass.map((v) => {     // 开启弹框，进行清空
                v = ''
            })
            this.newPass = this.newPass.map((v) => {
                v = ''
            })
            this.yesPass = this.yesPass.map((v) => {
                v = ''
            })
            layui.use(["layer"], function () {
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    title: "修改交易密码",
                    shadeClose: true,
                    shade: 0.2,
                    area: ["560px", "460px"],
                    content: $("#exitpass")
                });
            });

            $(".layui-layer-title").css({
                height: "50px",
                background: "#ECF2FB",
                "line-height": "50px"
            });
            $(".layui-layer-setwin").css("top", "19px");
        },
        
        editPass () {   // 修改交易密码后提交
            var _this = this;
            var admin = this.pass.join(''),
                newAdmin = this.newPass.join(''),
                yesAdmin = this.yesPass.join(''),
                num = /^\d{6}$/;
            layui.use('layer', function(){
                var layer = layui.layer;
            if (!(admin.length == 6) || !num.test(admin)) {
                layer.msg('请输入正确密码');
                return false;
            }
            if (!(newAdmin.length == 6)) {
                layer.msg('请输入六位新密码');
                return false;
            } else if (!num.test(newAdmin)) {
                layer.msg('请输入六位数字');
                return false;
            }
            if (!(yesAdmin.length == 6) || !num.test(yesAdmin)) {
                layer.msg("请再次确认密码");
                return false;
            }

            if (yesAdmin != newAdmin) {
                layer.msg('两次密码输入不一致');
                return false;
            }
                var $ = layui.jquery;
                var obj = { pwd: admin, new_pwd: newAdmin }
                _this.$http.post('/shv2/account/change_pwd', obj, function (res) {
                    if (res.code == 1) {
                        layer.msg(res.msg)
                        layer.closeAll('page');
                    } else {
                        layer.msg(res.msg)
                    }
                }, function (err) { console.log(err)})
             
             }); 
        },

        forgetpass() {//忘记交易密码按钮
            layui.use(["layer"], function () {
                var $ = layui.jquery;
                layer.closeAll()
                layer.open({
                    type: 1,
                    title: "修改交易密码",
                    shadeClose: true,
                    shade: 0.2,
                    area: ["560px", "500px"],
                    content: $("#forgetpass")
                });
            });

            $(".layui-layer-title").css({
                height: "50px",
                background: "#ECF2FB",
                "line-height": "50px"
            });
            $(".layui-layer-setwin").css("top", "19px");
        },

        setPass () {    // 忘记密码进行充值
            var _this = this,
                newPass1 = '',
                newPass2 = '',
                isphone = /^1[3456789]\d{9}$/,
                pass = /^\d{6}/;
            if (!isphone.test(_this.phone)) {
                layer.msg("请输入正确的手机号");
                return;
            }
            $('#ul4>input').each(function (i) {
                if ($(this).val()) {
                    newPass1 += $(this).val();
                }
            })
            $('#ul5>input').each(function (i) {
                if ($(this).val()) {
                    newPass2 += $(this).val();
                }
            })
            if (!_this.phoneCode) {
                layer.msg('请输入正确验证码')
                return false;
            }
            if (!(newPass1.length == 6) || !pass.test(newPass1)) {
                layer.msg('请输入正确的密码')
                return false;
            }
            if (!(newPass2.length == 6) || !pass.test(newPass2)) {
                layer.msg('请输入再次确认密码')
                return false;
            }
            if (newPass1 != newPass2) {
                layer.msg('两次输入密码不一致')
                return false;
            }
            layui.use('layer', function(){
                var layer = layui.layer;
                var obj = {code: _this.phoneCode, pwd: newPass1 }
                _this.$http.post('/shv2/account/set_pwd', obj, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.msg('密码修改成功');
                        layer.closeAll('page');
                    } else {
                        layer.msg(res.msg);
                    }
                }, function (err) { console.log(err)})
            }); 
            
        },
        
        getUserMsg() {
            var _this = this;
            this.$http.post('/shv2/account/recharge_wait',{}, function (res) {      // 获取绑定卡后用户卡号信息
                console.log(res)
                if (res.code == 1) {
                    _this.dataObj = res.data
                }
            }, function (err) { console.log(err)})
        }
    }
}
</script>

<style scoped lang="less">
//鲁医通设置
#lyt_setting {
    input:focus,
    input:hover {
        border: 1px solid #e2e2e2;
    }
    .recharge_tit {
        border-bottom: 1px solid #f1f2f9;
        i {
            display: inline-block;
            width: 18px;
            height: 18px;
            position: relative;
            top: 4px;
            margin-right: 3px;
        }
        .outbank_icon {
            background: url(../../common/image/pages/account/icon_jbyhk.png)
                no-repeat;
        }
        .exitpass_cion {
            background: url(../../common/image/pages/account/icon_xgmm.png)
                no-repeat;
        }
    }
    .backborder {
        width: 308px;
        height: 106px;
        border: 4px solid #e6e6e6;
        border-radius: 4px;
        p {
            line-height: 14px;
        }
    }
    .photo_icon{
         display: inline-block;
         width: 14px;
         height: 14px;
         position: relative;
         top: 2px;
         margin-right: 3px;
         background: url(../../common/image/pages/account/icon_sfz.png)
                no-repeat;
    }
    .form_content_action {
        input {
            height: 40px !important;
            border: 1px solid #ddd !important;
        }
        input:focus {
            border: 1px solid #ddd !important;
        }
        input:hover {
            border: 1px solid #ddd !important;
        }
        .layui-form-label {
            width: 130px;
        }
        .layui-form-mid {
            margin-top: 5px;
            border: 1px solid #4281d7;
            color: #4281d7 !important;
            width: 80px;
            height: 30px;
            padding: 0 !important;
            line-height: 30px;
            margin-right: 0px;
            border-radius: 3px;
        }
        .layui-btn {
            width: 140px;
            height: 40px;
            background: rgba(66, 129, 215, 1);
            border-radius: 4px;
            margin-left: 80px;
            color: #fff;
            &:hover {
                color: #fff;
            }
        }
        .layui-layer-setwin {
            top: 20px;
        }
        ul {
            overflow: hidden;
            width: 300px;
            input {
                float: left;
                width: 50px;
                height: 40px;
                text-align: center;
                border-right: none !important;
            }
            input:hover {
                border-right: none !important;
            }
            input:last-child {
                border-right: 1px solid #ddd !important;
            }
            input:focus {
                border: 1px solid rgba(66, 129, 215, 1) !important;
                border-right: 1px solid rgba(66, 129, 215, 1) !important;
            }
        }
    }
}
</style>
