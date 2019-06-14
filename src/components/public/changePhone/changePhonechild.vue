<template>
    <div id="" class="">
        <div id="bindbankphone" class="bg_f Pd-B40">
            <p class="recharge_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10">
                修改绑定手机号
            </p>
            <table class="Mg-T24">
                <tr class="" height="65px">
                    <td width="100px" class="Ft-S14 Color_black" align="right">
                        手机号：
                    </td>
                    <td class="Pd-L24 Ft-S16 Color_gray6">
                        <input type="text" id="phone" maxlength="11" @keypress="errphone=''" placeholder="输入账户绑定手机号" v-model="form.phone" style="width: 300px;" />
                        <p class="Ft-S12 Color_gray6 errmsg">{{errphone}}</p>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="100px" class="Ft-S14 Color_black" align="right">
                        验证码：
                    </td>
                    <td class="Pd-L24 Ft-S16 Color_gray6">
                        <input type="text" maxlength="4" id="code" @keypress="errcode=''" v-model="form.code" placeholder="请输入验证码" style="width: 210px;" class="Pd-L10" /><span class="getcode" @click="getcode">获取验证码</span>
                        <p class="Ft-S12 Color_gray6 errmsg">{{errcode}}</p>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="Pd-L24 Pd-T40">
                        <button class="Ft-S16 onsubmit pointer" @click="onsubmit">
                            完成
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
            form: {
                phone: '',
                code: '',
            },
            errphone:'',
            errcode:'',
        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {
        },
        getcode() {
            var _this=this
            //获取验证码
            layui.use(["layer"], function () {
                var isphone = /^1[3456789]\d{9}$/;
                if (!isphone.test($("#phone").val())) {
                    layer.msg("请输入正确的手机号");
                    return;
                }
                if (this.noneclick) {
                    return;
                }
                var time = 60;
                $('.getcode').text("(60s)重获");
                var _salf = this;
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
                _this.$http.post('/shv2/Alidayu/sendSMS', { telphone: _this.phone}, function (res) {//
                    if (res.code == 1) {

                    } else {

                    }
                }, function (err) { console.log(err) });
            })
        },
        onsubmit() {
            var _this = this
            layui.use(["layer"], function () {
                var layer=layui.layer
                if (!_this.form.phone) {
                    _this.errphone = '请填写正确的手机号';
                    return
                }
                if (!_this.form.code) {
                    _this.errcode = '请填写正确的验证码';
                    return
                }
                _this.$http.post('/shv2/Setting/edit_phone', {phone:_this.form.phone, code: _this.form.code }, function (res) {//
                    if (res.code == 1) {
                        layer.msg(res.msg)
                        _this.go('/setting/changePhone')
                    } else {
                        layer.msg(res.msg)
                    }
                }, function (err) { console.log(err) });
            })
        }

    }
}
</script>

<style scoped lang="less">
#bindbankphone {
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
        padding-top:3px;
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
