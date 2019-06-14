<template>
    <div id="base">
        <div id="register">
            <div class="input_box">
                <div class="title_logo">
                    <img src="@/common/image/pages/login/icon_dblogo@3x.png" alt="">
                </div>
                <p>机构注册</p>
                <form class="layui-form" action="">
                    <div class="layui-form-item">
                        <label class="layui-form-label"><span class="Ft-S16 Color_red">*</span>手机号码</label>
                        <div class="layui-input-block">
                            <input type="tel" name="phone" id="phone" autocomplete="off" class="layui-input" placeholder="请输入手机号码" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label"><span class="Ft-S16 Color_red">*</span>验证码</label>
                        <div class="layui-input-block get_code">
                            <input type="tel" name="code" autocomplete="off" id="code" maxlength="4" class="layui-input" placeholder="请输入验证码">
                            <a href="javascript:" id="sendCode">发送验证码</a>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label"><span class="Ft-S16 Color_red">*</span>登录密码</label>
                        <div class="layui-input-block">
                            <input type="password" name="pwd" id="pass" maxlength="12" autocomplete="off" placeholder="请设置您的登录密码, 长度为6~12位" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item Agreement">
                        <input type="checkbox" checked="checked" id="check">
                        <span>我已阅读并同意 </span>
                        <a class="aler pointer" style="color: #128dff;">《云医康用户注册协议》</a>
                        <a class="aler pointer" style="color: #128dff;">《法律声明及隐私权政策》</a>
                    </div>
                    <div class="layui-form-item sub_btn">
                        <div class="onsub" @click="submitFun">立即注册</div>
                        <p class="Ft-S16 ac Mg-T20"><span>已有账号&nbsp;</span><span class="pointer" @click="go('/login')">立即登录</span></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {

        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {
            var _self = this;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var noneclick = false;
                $("#sendCode").on("click", function () {
                    var isphone = /^1[3456789]\d{9}$/;
                    if (!isphone.test($('#phone').val())) {
                        layer.msg("请输入正确的手机号");
                        return;
                    }
                    //获取验证码
                    if (noneclick) {
                        return;
                    }
                    var time = 60;
                    $(this).text("(60s)重获");
                    var _this = $(this);
                    var settime = setInterval(function () {
                        if (!time) {
                            noneclick = false;
                            _this.text("重新获取");
                            clearInterval(settime);
                            return;
                        }
                        noneclick = true;
                        time--;
                        _this.text("(" + time + "s)重获");
                    }, 1000);
                    _self.$http.post('/shv2/Alidayu/sendSMS', { telphone: $('#phone').val() }, function (res) {//
                        if (res.code == 1) {
                            console.log('已发送')
                        }
                    }, function (err) { console.log(err) });
                });
            });
        },
        submitFun() {
            var _this = this;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var exgphone = /^1(3|4|5|6|7|8|9)\d{9}$/;//手机号验证
                var isNumber = /^\d{4}$/; //验证数字
                var ispass = /^\d{6,12}$/; //验证密码

                var checkpress = function () {
                    if (!exgphone.test($('#phone').val())) {
                        layer.msg('请输入正确的手机号',{icon:2});
                        return false
                    }
                    if (!isNumber.test($('#code').val())) {
                        layer.msg('请输入正确的验证码',{icon:2})
                        return false
                    }
                        var pass = $('#pass').val();
                    if (pass.length < 6) {
                        layer.msg('请设置正确的密码，密码长度为6~12位数字',{icon:2})
                        return false
                    }
                    if (!ispass.test(pass)) {
                        layer.msg('请设置正确的密码，不能有特殊字符',{icon:2})
                        return false
                    }
                    if (!$('#check').is(':checked')) {
                        layer.msg('请勾选阅读协议',{icon:2})
                        return false
                    }
                    return true
                }
                if (checkpress()) {
                    _this.$http.post('/shv2/login/register', { phone: $('#phone').val(), code: $('#code').val(), pwd: $('#pass').val() }, function (res) {//
                    console.log(res)
                        if (res.code == 1) {
                            _this.localstorage.put('logindata',{hospital_status:0})
                            _this.go('/setting/boxMechanismMsg?upload=true')
                        } else {
                            layer.msg(res.msg, { icon: 5})
                        }
                    }, function (err) { console.log(err) });
                }
            });
        }
    }
}
</script>

<style scoped lang="less">
//登录 注册 忘记密码
#base {
    width: 100%;
    min-height: 100vh;
    background: url(../../../common/image/pages/login/img_jgbg@3x.png) no-repeat;
    background-size: cover;
    font-size: 16px;
    color: #888;

    #register {
        .input_box {
            width: 640px;
            height: 480px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            padding-top: 60px;
            .title_logo {
                width: 207px;
                height: 60px;
                position: absolute;
                top: -60/2px;
                left: 50%;
                transform: translateX(-50%);
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            p {
                font-size: 16px;
                font-weight: 400;
                color: rgba(78, 140, 216, 1);
                text-align: center;
                margin-bottom: 30px;
            }
            form {
                input {
                    height: 42px;
                    border: 1px solid rgba(194, 195, 195, 1);
                    border-radius: 2px;
                }
                .layui-form-item {
                    padding: 0 30px;
                    margin-bottom: 20px;
                    .layui-form-label {
                        min-width: 120px;
                    }
                    .layui-input-block {
                        margin-left: 130px;
                    }
                    .get_code {
                        position: relative;
                        input {
                            width: 300px;
                            margin: 0;
                        }
                        a {
                            position: absolute;
                            right: 0;
                            top: 0;
                            width: 130px;
                            height: 42px;
                            background: #fff;
                            border: 1px solid rgba(194, 195, 195, 1);
                            -webkit-border-radius: 2px;
                            -moz-border-radius: 2px;
                            border-radius: 2px;
                            color: #c2c3c3;
                            font-size: 16px;
                            text-align: center;
                            line-height: 42px;
                            text-decoration: none;
                        }
                    }
                    &.Agreement {
                        text-align: center;
                        font-size: 14px;
                        color: #c2c3c3;
                        a {
                            color: #4e8cd8;
                            text-decoration: none;
                        }
                        input[type="checkbox"] {
                            display: inline-block;
                            height: 15px;
                            position: relative;
                            top: 3px;
                        }
                        .layui-form-checkbox {
                            margin-top: 0;
                        }
                    }
                    &.sub_btn {
                        text-align: center;
                        .onsub {
                            width: 336px;
                            background: rgba(78, 140, 216, 1);
                            height: 44px;
                            border-radius: 2px;
                            border: none;
                            color: #fff;
                            text-align: center;
                            line-height: 44px;
                            margin: 0 auto;
                            cursor: pointer;
                        }
                        p {
                            span {
                                color: #c2c3c3;
                            }
                            span:last-child {
                                color: #4e8cd8;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
