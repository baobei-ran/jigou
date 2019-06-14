<template>
    <div id="base">
    <div id="reset">
        <div class="input_box">
            <div class="title_logo">
                <img src="@/common/image/pages/login/icon_dblogo@3x.png" alt="">
            </div>
            <p>忘记密码</p>
            <form id="myform" action="" onsubmit="return false">
            <div class="my_group"><input type="tel" id="phone" v-model='phone' name="phone" placeholder="手机号"></div>
            <div class="my_group code"><input type="text" id="code" v-model='code' name="code" placeholder="请输入验证码"><button id="sendCode" >发送验证码</button></div>
            <div class="my_group"><input type="text" id="pwd" v-model='newPass' autocomplete="new-password" name="pwd" placeholder="请输入密码"></div>
            <div class="my_group link_box">
                <span class="login pointer" @click="go('/login')">返回登录</span>
                <span class="register pointer" @click="go('/register')">注册账号</span>
            </div>
            <div class="my_group">
                <div class="login_btn" :disabled="disabled" @click='initdata'>
                    确定
                </div>
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
            phone: '',
            code: '',
            newPass: '',
            disabled: false,
        }
    },
    mounted() {
        this.getCode()
    },
    methods: {
        initdata() {  // 提交
            var _this = this;
            layui.use(["laypage", "layer", "laydate"], function () {
                var layer = layui.layer;
                _this.disabled = true
                var reg = /^1[3456789]\d{9}$/;  //11位手机号
                 var ispass = /^\d{6,12}$/; //验证密码
                var time = setTimeout(() => {
                  _this.disabled = false
                  clearTimeout(time)
                }, 3000)
                if (!_this.phone && !reg.test(_this.phone)) {
                  layer.msg('请输入正确手机号', { icon: 2});
                    return;
                }
                if (!_this.code) {
                  layer.msg('请输入正确验证码', { icon: 2});
                    return;
                }
                if (!_this.newPass && !ispass.test(_this.newPass)) {
                  layer.msg('请输入6~12位数字为密码', { icon: 7});
                    return;
                }
                var obj = { phone: _this.phone, code: _this.code, pwd: _this.newPass }
                _this.$http.post('/shv2/login/pwd_edit', obj, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.msg('密码修改成功', { icon: 1, time: 1000});
                        setTimeout (() => {
                          _this.go('/login')
                        }, 1000)
                    } else {
                        layer.msg(res.msg, { icon: 2});
                    }
                })
            });
        },
        getCode () {  // 获取验证码
            var _self = this;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var noneclick = false;
                $("#sendCode").on("click", function () {
                    var isphone = /^1[3456789]\d{9}$/;
                    if (!isphone.test($('#phone').val())) {
                        layer.msg("请输入确的手机号",{icon:2});
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
                            
                        } else {
                            
                        }
                    }, function (err) { console.log(err) });
                });
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

  #reset {
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
          border: 1px solid #D7D7D7;
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
        line-height: 42px;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
      }

    }
    .footer {
      position: absolute;
      font-size: 14px;
      color: rgba(255, 255, 255, 1);
      bottom: 40px;
      width: 100%;
      text-align: center;
    }
  }
  #reset {
    .link_box {
      .login {
        float: left;
      }
      .register {
        float: right !important;
      }
    }
    .code {
      input {
        width: 204px !important;
        margin-right: 10px;
      }
      button {
        list-style: none;
        border: 1px solid #D7D7D7;
        outline: none;
        width: 119px;
        height: 41px;
        background: rgba(255, 255, 255, 1); 
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(136, 136, 136, 1);
        cursor: pointer;
      }
    }
  }

}


</style>
