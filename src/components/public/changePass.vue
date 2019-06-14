<template>
    <div id="" class="">
        <div id="exitpass" class="bg_f Pd-B40">
            <p class="recharge_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10">
                修改账户密码
            </p>
            <table class="Mg-T24">
                <tr class="" height="65px">
                    <td width="100px" class="Ft-S14 Color_black" align="right">
                        手机号：
                    </td>
                    <td class="Pd-L24 Ft-S16 Color_gray6">
                        <input type="text" id="phone" maxlength="11" @keypress="errphone=''" v-model="form.phone" disabled="disabled" placeholder="输入账户绑定手机号" style="width: 300px;" />
                        <p class="Ft-S12 Color_gray6 errmsg">{{errphone}}</p>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="100px" class="Ft-S14 Color_black" align="right">
                        验证码：
                    </td>
                    <td class="Pd-L24 Ft-S16 Color_gray6">
                        <input type="text" maxlength="4" id="code" @keypress="errcode=''" autocomplete="off" v-model="form.code" placeholder="请输入验证码" style="width: 210px;" class="Pd-L10" /><span class="getcode" @click="getcode">获取验证码</span>
                        <p class="Ft-S12 errmsg" >{{errcode}}</p>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="100px" class="Ft-S14 Color_black" align="right">
                        账户密码：
                    </td>
                    <td class="Pd-L24 Ft-S16 Color_gray6">
                        <input type="password" id="pass" @keypress="errmsg=''" v-model="form.pass" placeholder="请输入新密码" style="width: 300px;" />
                        <p class="Ft-S12 errmsg">{{errmsg}}</p>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="100px" class="Ft-S14 Color_black" align="right">

                    </td>
                    <td class="Pd-L24 Ft-S16 Color_gray6">
                        <input type="password" id="secondpass" @keypress="repeatmsg=''" v-model="form.secondpass" placeholder="再次输入新密码" style="width: 300px;" />
                        <p class="Ft-S12 errmsg">{{repeatmsg}}</p>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="Pd-L24 Pd-T40">
                        <button class="Ft-S16 onsubmit pointer" @click="onsubmit">
                            提交信息
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
            noneclick: false,
            phone: this.localstorage.get('logindata').phone,
            form: {
                phone: '',
                code: '',
                pass: '',
                secondpass: ''
            },
            errphone: '',
            errcode: '',
            errmsg: '',
            repeatmsg: ''
        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {
            
            var phone = this.localstorage.get('logindata').phone
            this.form.phone = phone
            // console.log(phone)
            // this.form.phone=phone.substring(0,3)+'****'+phone.substring(7,11)
        },
        getcode() {
            var _this = this
            //获取验证码
            layui.use(["layer"], function () {
                var isphone = /^1[3456789]\d{9}$/;
                if (this.noneclick) {
                    return;
                }
                var time1 = 60;
                $('.getcode').text("(60s)重获");
                var _salf = this;
                _this.timer1 = setInterval(function () {
                    if (!time1) {
                        _salf.noneclick = false;
                        $('.getcode').text("重新获取");
                        clearInterval(_this.timer1);
                        return;
                    }
                    _salf.noneclick = true;
                    time1--;
                    $('.getcode').text("(" + time1 + "s)重获");
                }, 1000);
                _this.$http.post('/shv2/Alidayu/sendSMS', { telphone: _this.phone }, function (res) {//
                console.log(res)
                    if (res.code == 1) {
                        layer.msg('验证码已发送');
                    } else {
                        layer.msg(res.msg);
                    }
                }, function (err) { console.log(err) });
            })
        },
        onsubmit() {
            var _this = this
            layui.use(["layer"], function () {
                var layer=layui.layer
                if (!_this.form.code || _this.form.code.length != 4) {
                    _this.errcode = '请填写正确的验证码';
                    return
                }
                if (!_this.form.pass || !_this.form.pass.length >= 6) {
                    _this.errmsg = "请输入新密码"
                    return
                }
                if (!_this.form.secondpass ||! _this.form.secondpass.length >= 6) {
                    _this.repeatmsg = "请再次确认新密码"
                    return
                }
                if (_this.form.pass != _this.form.secondpass) {
                    layer.msg('两次密码输入不一致');
                    return
                }
                _this.$http.post('/shv2/Setting/pwd_edit', { phone: _this.phone, code: _this.form.code, pwd: _this.form.pass }, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.msg('修改成功')
                    } else {
                        layer.msg(res.msg)
                    }
                }, function () {
                    layer.msg(res.msg)
                })
            })

        }

    },
    destroyed(){
        if(this.timer1) { //如果定时器在运行则关闭
            clearInterval(this.timer1); 
        }
    }

}
</script>

<style scoped lang="less">
#exitpass {
    .recharge_tit {
        border-bottom: 1px solid #f1f2f9;
    }
    select {
        display: block;
        height: 36px;
        padding-left: 10px;
        border: 1px solid rgba(194, 194, 195, 1);
    }
    input {
        height: 36px;
        padding-left: 10px;
        border: 1px solid rgba(194, 194, 195, 1);
    }
    input:focus,
    input:hover {
        border: 1px solid rgba(194, 194, 195, 1);
    }
    .errmsg {
        position: absolute;
        z-index: 66;
        padding-top: 3px;
        color:rgb(250, 14, 14);
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
        margin-left: 10px;
        cursor: pointer;
    }
    .onsubmit {
        width: 110px;
        height: 40px;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        color: #fff;
        border: none;
    }
}
</style>
