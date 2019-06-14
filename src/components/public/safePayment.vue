<template>
    <div>
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
                        <div class="layui-input-inline" style="width: 200px;">
                            <select name="" id="type" lay-verify="" style="width: 200px;">
                                <option value="1">对公账户</option>
                                <option value="2">法人账户</option>
                                <option value="3">其他账户</option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 开户银行：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="layui-input-inline">
                            <select name="" id="khbank" lay-verify="" style="width: 300px;">
                                <option value="">请选择开户行</option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 归属地：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="layui-input-inline">
                            <select name="" id="sheng" lay-verify="" style="width: 200px;">
                                <option value="">请选择省</option>
                            </select>
                        </div>
                        <div class="layui-input-inline">
                            <select name="" id="city" lay-verify="" style="width: 200px;">
                                <option value="">请选择市/区</option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 支行名称：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="layui-input-inline">
                            <select name="" id="typebank" lay-verify="" style="width: 300px;">
                                <option value="">请选择支行</option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 开户名：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" id="khname" placeholder="" style="width: 300px;" />
                        <span style="font-size:12px" class="Color_gray6">为确保机构资金安全，开户名必须与机构认证信息保持一致</span>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 银行卡号：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" id="bankcode" placeholder="" style="width: 300px;" />
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 银行预留手机号：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" id="phone" placeholder="" style="width: 300px;" />
                    </td>
                </tr>

                <tr>
                    <td></td>
                    <td class="Pd-L44 Pd-T40">
                        <button class="bankrecharge Ft-S16 onsubmit" id="addbackpublic">
                            提交信息
                        </button>
                    </td>
                </tr>
            </table>
        </div>
        <div id="layer_getcode" class="hide">
            <table class="Mg-T46 Ft-S16">
                <tr>
                    <td width="100px" align="right">手机号：</td>
                    <td width="210px" class="Pd-L40" id="layerphone">18232337779</td>
                </tr>
                <tr class="">
                    <td width="100px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 验证码：
                    </td>
                    <td class="Pd-L30 Ft-S16 Color_gray6">
                        <input type="text" id="code" placeholder="请输入验证码" style="width: 210px;height: 40px" class="Pd-L10" /><span class="getcode" id="getcode">获取验证码</span>
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

        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {
            var _this = this
            layui.use(["layer"], function () {
                var $ = layui.jquery;

                $("#type").on("change", function () {
                    //选择
                    if ($("#type").val() == 2) {
                        _this.go('/finance/bankcardadmin/bindbankLegal')
                    } else if ($("#type").val() == 3) {
                        _this.go('/finance/bankcardadmin/bindbankPerson')
                    }
                });

                var noneclick = false;
                $("#getcode").on("click", function () {
                    var isphone = /^1[3456789]\d{9}$/;
                    if (!isphone.test($('#layerphone').val())) {
                        layer.msg("请输入确的手机号");
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
                });

                $(".onsubmit").on("click", function () {
                    var isphone = /^1[3456789]\d{9}$/;
                    var pattern = /^([1-9]{1})(\d{14}|\d{18})$/;

                    if ($("#khbank").val() == "请选择开户行") {
                        //开户行
                        layer.msg("请选择");
                        return;
                    }
                    if ($("#sheng").val() == "请选择省") {
                        //省
                        layer.msg("请选择");
                        return;
                    }
                    if ($("#city").val() == "请选择市/区") {
                        //市
                        layer.msg("请选择");
                        return;
                    }
                    if ($("#typebank").val() == "支行名称") {
                        //支行名称
                        layer.msg("请输入");
                        return;
                    }
                    if (!$("#khname").val()) {
                        //开户名
                        layer.msg("请输入");
                        return;
                    }
                    if (!$("#bankcode").val() || !pattern.test($("#bankcode").val())) {
                        //银行卡号
                        layer.msg("请输入正确的银行卡号");
                        return;
                    }
                    if (!$("#phone").val() || !isphone.test($("#phone").val())) {
                        //银行预留手机号
                        layer.msg("请输入正确的手机号");
                        return;
                    }

                    $('#layerphone').text($("#phone").val())//弹框手机号
                    layer.load(1, {
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
                        cancel: function () { }
                    });

                });
                $("#confirm").on("click", function () {
                    //弹出框提交
                    if (!$("#code").val() || $("#code").val().length != 4) {
                        //验证码
                        layer.msg("请输入正确的验证码");
                        return;
                    }
                });
            });
        }
    }
}
</script>

<style scoped lang="less">
//绑定
#bindbank_card {
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
}
//绑卡页面弹框
#layer_getcode {
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
        margin: 10px;
        cursor: pointer;
    }
    .acitve_btn {
        width: 140px;
        height: 40px;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        border: none;
    }
}
</style>
