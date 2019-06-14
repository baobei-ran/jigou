<template>
    <div id="base">
        <div id="login">
            <form class="input_box" @submit.prevent='submitFun'>
                <div class="title_logo">
                    <img src="@/common/image/pages/login/icon_dblogo@3x.png" alt="">
                </div>
                <p>机构登录</p>
                <div class="my_group"><input type="text" id="phone" maxlength="11" autocomplete="on" v-focus placeholder="账号/手机号"></div>
                <div class="my_group"><input type="password" id="pass" autocomplete="current-password" placeholder="请输入密码"></div>
                <div class="my_group code"><input type="text" id="code" autocomplete="off" maxlength="4" placeholder="请输入验证码">
                    <img :src="$http.baseURL+'/captcha.html'" id="imgcode" alt="" onclick="this.src=this.src+'?'">
                </div>
                <div class="my_group link_box">
                    <span class="register pointer" @click="go('/register')">注册账号</span>
                    <span class="reset pointer" @click="go('/forgetpass')">忘记密码</span>
                </div>
                <div class="my_group">
                    <!-- <button class="login_btn pointer" @click="submitFun" @keyup.enter="submitFun">
                        立即登录
                    </button> -->
                    <input type="submit" :disabled='flag' class="login_btn pointer" value="立即登录" />
                </div>
            </form>
            <div class="footer">
                软件版本号：1.2.0 登录即代表您已阅读并同意 《云医康用户注册协议》《法律声明及隐私权政策》
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {
            flag: false
        }
    },
    methods: {
        initdata() {

        },
        submitFun() {
            var _this = this;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var exgphone = /^1(3|4|5|6|7|8|9)\d{9}$/;//手机号验证
                var isNumber = /^\d{4}$/; //验证数字
                var ispass = /^\d{6,12}$/; //验证密码
                var userphone = $('#phone').val();
                var checkpress = function () {
                    if (!exgphone.test($('#phone').val())) {
                        layer.msg('请输入正确的手机号',{ icon: 2});
                        return false
                    }

                    if (!ispass.test($('#pass').val())) {
                        layer.msg('请输入正确的密码',{ icon: 2})
                        return false
                    }
                    if (!isNumber.test($('#code').val())) {
                        layer.msg('请输入正确的验证码',{ icon: 2})
                        return false
                    }
                    return true
                }
                if (checkpress()) {
                    _this.flag = true;
                    _this.$http.post('/shv2/login/login', { phone: userphone, code: $('#code').val(), pwd: $('#pass').val() }, function (res) {// 登录
                        console.log(res)
                        _this.flag = false
                        if (res.code == 1) {
                            _this.localstorage.put('logindata', res.data);
                            if (res.data.hospital_status == 0 || res.data.hospital_status == 2 || res.data.hospital_status == 3) {
                                _this.go('/setting/boxMechanismMsg?upload=true')
                            } else {
                                _this.go('/?login=true')
                            }

                        } else if (res.code == 3) {
                           layer.msg(res.msg, { icon: 2})
                           $('#imgcode').attr('src', _this.$http.baseURL+'/captcha.html')
                        } else {
                            layer.msg(res.msg, { icon: 2})
                        }
                    }, function (err) { console.log(err) });
                }
                return false;
            });
           
        }
    },
    directives: {
       focus: {
            // 当绑定元素插入到 DOM 中。
        inserted: function (el) {
            // 聚焦元素
            el.focus()
        },
        //也可以用update,update就是当页面有操作的时候就触发，比如点击按钮，输入框输入都算。
        //有一个要注意的就是，就是你页面有几个input,比如一个input绑定了v-focus,一个没有绑定。你在没绑定v-focus的input输入时，绑定了v-focus的input就是自动获取焦点，这是个bug.
        //update: function (el) {
            //el.focus()
        //}
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
    #login {
        .input_box {
            width: 460px;
            height: 440px;
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
                margin-bottom: 27px;
            }
            .my_group {
                height: 42px;
                width: 336px;
                margin: 0 auto;
                margin-bottom: 20px;
                position: relative;
                input {
                    border: 1px solid #d7d7d7;
                    -webkit-border-radius: 2px;
                    -moz-border-radius: 2px;
                    border-radius: 2px;
                    padding: 10px 20px;
                    width: 100%;
                }
            }
            .code {
                img {
                    position: absolute;
                    right: 2px;
                    top: 2px;
                }
            }
            .link_box {
                overflow: hidden;
                span {
                    font-size: 14px;
                    color: #888;
                    &.register {
                        float: left;
                    }
                    &.reset {
                        float: right;
                    }
                }
            }
            .login_btn {
                cursor: pointer;
                width: 100%;
                height: 100%;
                background: rgba(78, 140, 216, 1);
                color: #fff;
                text-align: center;
                -webkit-border-radius: 2px;
                -moz-border-radius: 2px;
                border-radius: 2px;
                border:0;
            }
        }
        .footer {
            position: absolute;
            font-size: 14px;
            color: rgba(255, 255, 255, 1);
            bottom: 40px;
            width: 100%;
            text-align: center;
            a {
                color: #fff;
            }
        }
    }
}
</style>
