<template>
<!-- 提现页面 -->
    <div>
        <div id="lyt_account" class="">
            <p class="lyt_title Ft-S16 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10">
                提现
            </p>
            <div class="lyt_typetotal Mg-B24">
                <ul class=" layui-row layui-col-space10">
                    <li class="lyt_hos layui-col-md6 layui-col-sm6">
                        <div class="bg_f Pd-L24 Pd-B24 Pd-T24 clear">
                            <div class="fl">
                                <p class="Ft-S16 Color_gray6 Mg-B44">
                                    可提现金额<i class="icon_layer"></i>
                                </p>
                                <p class="Color_black ">
                                    <span class="Ft-S18">¥</span><span class="Ft-S24">{{ withdraw_deposit.money_balance }}</span>
                                    <span class="Ft-S12 Color_gray6">（每次提现需超过¥<span>{{ withdraw_deposit.min_money }}</span>）</span>
                                </p>
                            </div>
                            <div class="fr Mg-R24">
                                <p class="Mg-B34">
                                    <span class="Ft-S14 Color_blue pointer reBtn" @click='reloads'><i class="reflsh"></i>核对信息</span>
                                </p>
                                <!--
                  <button style="width:140px;height:40px;border:none;background: #3196FF" class="Color_white Ft-S18">提现</button>
                -->
                                <button :disabled='disabledBtn' :class="{'active': !disabledBtn}" id="withdraw">
                                    提现
                                </button>
                            </div>
                        </div>
                    </li>
                    <li class="lyt_price layui-col-md6 layui-col-sm6">
                        <div class="bg_f Pd-T24 Pd-B22 Pd-L24">
                            <p class="Mg-B52">银行卡</p>

                            <p v-show='!disabledBtn' class="bank">
                                <img :src="$http.baseURL+bankImg" alt=""><span class="Mg-R20">{{ Card_door }}</span><span>{{ Card_number }}</span>
                            </p>

                            <p class="Ft-S14 pointer" style="color:#3196FF;"  v-show='disabledBtn'>
                                <span>+</span><span id="addbankcard">添加银行卡</span>
                            </p>

                        </div>
                    </li>
                </ul>
            </div>
            <div class="lyt_table bg_f">
                <p class="tab_tit Ft-S16 Color_black Pd-B24">提现记录</p>
                <div class="layui-form-item Mg-T24 Mg-B10">
                    <div class="layui-inline">
                        <label class="layui-form-label" style="width: 90px;">订单时间</label>
                        <div class="layui-input-inline" style="width: 180px;">
                            <input type="text" name="price_min" placeholder="请选择起始时间" v-model='startTime' autocomplete="off" class="layui-input" id="date" />
                        </div>
                        <div class="layui-form-mid">-</div>
                        <div class="layui-input-inline" style="width: 180px;">
                            <input type="text" name="price_max" placeholder="请选择截止时间" autocomplete="off" class="layui-input" id="date1" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-normal" id="selectord" style="height:32px;line-height:32px">
                            搜索
                        </button>
                    </div>
                </div>
                <table class="layui-table Mg-T24 ac" lay-even="nob">
                    <thead>
                        <tr>
                            <td>序号</td>
                            <td>账单单号</td>
                            <td>申请时间</td>
                            <td>类型</td>
                            <td>金额（元）</td>
                            <td>账单状态</td>
                            <td>收款方式</td>
                        </tr>
                    </thead>

                    <tbody v-if='withdraw_depositList.length'>
                        <tr v-for='(val, i) in withdraw_depositList'>
                            <td>{{ i+1 }}</td>
                            <td>{{ val.number }}</td>
                            <td>{{ val.creatime }}</td>
                            <td>{{ val.change }}</td>
                            <td>{{ val.money }}</td>
                            <td>{{ val.state }}</td>
                            <td>{{ val.pay_name }}</td>
                        </tr>
                    </tbody>
                    
                    <tbody v-else>
                        <tr>
                            <td colspan="7">暂无数据</td>
                        </tr>
                    </tbody>
                </table>

                <div v-if='withdraw_depositList.length' id="page" class="ac Mg-T20"></div>
            </div>
        </div>
        <div id="SectionBox">
            <div class="layer_notice hide">
                <div class="form_content_action" id="layer">
                    <form class="layui-form Mg-T40" action="">
                        <div class="layui-form-item Mg-B24">
                            <label class="layui-form-label">手机号：</label>
                            <div class="layui-input-inline">
                                <input type="tel" name="phone" lay-verify="required" style="width:300px" disabled v-model='withdraw_deposit.login_phone' autocomplete="off" class="layui-input Mg-L16" id="phone" />
                            </div>
                        </div>
                        <div class="layui-form-item Mg-B24">
                            <label class="layui-form-label">验证码：</label>
                            <div class="layui-input-inline  Mg-L16">
                                <input type="tel" name="code" required lay-verify="required" style="width:210px" placeholder="请输入密码" autocomplete="off" class="layui-input" id="code" />
                            </div>
                            <div class="layui-form-mid layui-word-aux Mg-L20 ac pointer" id="getcode">
                                获取验证码
                            </div>
                        </div>
                        <div class="layui-form-item  Mg-B24">
                            <label class="layui-form-label">支付密码：</label>
                            <div class="layui-input-inline Mg-L16">
                                <ul id="ul1">
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                </ul>
                                <p class="Mg-T10 Mg-B20 Color_gray6">请输入6位数字支付密码</p>
                                <ul id="ul2">
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                </ul>
                                <p class="Mg-T10 Mg-B16 Color_gray6">请再次确定支付密码</p>
                            </div>
                        </div>
                        <div class="Mg-B24">
                            <div class="layui-input-block">
                                <a class="layui-btn" id="onsubmit">确认</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {
            disabledBtn: true,                        //  提现按钮
            Card_door: '工商银行',                     //  银行
            Card_number: '452523*******125564455',    //  卡号
            bankImg: '',                              //   银行login
            withdraw_deposit: {                       // 提现人的基本信息
                login_phone: "19912345678",
                transaction: 0
            },                     
            page: 1,
            limit: 10,
            startTime: '',                            // 开始时间 
            endTime: '',                              // 结束时间
            withdraw_depositList: '',                 // 提现记录列表
            setPass: '',                              // 设置支付密码
        }
    },
    created() {
        var _this = this;
        this.getData('/shv2/account/if_bank', {}).then(res => {     // 查询 查询机构是否绑卡
            if (res.code == 1) {   // 1 代表绑卡
                _this.disabledBtn = false
            } else {
                _this.disabledBtn = true
            }
        }).catch(err => console.log(err))
    },
    mounted() {
        this.whetherbank()
        this.TixianList(1);
    },
    methods: {
        //核对信息
        reloads () {
            this.TixianList(1)
            // window.location.reload();       // 刷新
        },
               
        whetherbank () {        // 
            var _this = this;
            this.$http.post('/shv2/account/withdraw_deposit', {}, function (res) {  // 提现人的信息，是否有可提现的金额和卡
                console.log(res)
                if (res.code == 1) {
                    if (res.bank) {
                        _this.Card_door = res.bank.bank_name;   // 获取某某银行
                            // 处理卡号
                        _this.Card_number = res.bank.numberu  // 卡号
                        _this.bankImg = res.bank.img 
                    }
                    _this.withdraw_deposit = res.data
                    console.log(_this.withdraw_deposit)
                }
            }, (err) => console.log(err))
        },

        getData (url, data) {   // 封装下接口
            var _this = this;
            return new Promise((resolve, reject) => {
                _this.$http.post(url, data, function (res) { resolve(res) }, function (err) { reject(err)})
            })
        },
        serch () {
            console.log(this.startTime)
        },
        TixianList(num) {   // 提现列表数据
            var _this = this;
            layui.use('layer', function(){
            var layer = layui.layer;
            var obj = {page: num, limit: _this.limit, timestart: _this.startTime, timeend: _this.endTime }
            _this.$http.post('/shv2/account/withdraw_deposit_data',obj, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.withdraw_depositList = res.data
                    _this.initdata(res.count)
                }
            }, (err) => console.log(err))
            }); 
        },
        initdata(total) {
            var _this = this;
            layui.use(["laypage", "layer", "laydate"], function () {
                var laypage = layui.laypage;
                var layer = layui.layer;
                //执行一个laypage实例
                laypage.render({
                    elem: "page", //注意，这里的 test1 是 ID，不用加 # 号
                    count: total, //数据总数，从服务端得到
                    limit: 5, //每页条数
                    layout: ["prev", "page", "next", "skip"],
                    groups: 4,
                    jump: function(obj, first){
                        if(!first){
                           _this.TixianList(obj.curr);
                           _this.page = obj.curr
                        }
                    }
                });
                var laydate = layui.laydate;
                laydate.render({
                    elem: "#date" //指定元素
                });
                laydate.render({
                    elem: "#date1" //指定元素
                });
                var layer = layui.layer;
                var $ = layui.jquery;
                
                $('#selectord').on('click', function () {   // 搜索按钮
                    _this.startTime = $('#date').val()
                    _this.endTime = $('#date1').val()
                    if (!_this.startTime) {
                        layer.msg('请选择时间')
                        return;
                    }
                    if (!_this.endTime) {
                        return;
                    }
                    _this.TixianList(1)
                })


                $(".ihover").hover(
                    function () {
                        layer.tips(
                            "患者的服务订单完结后，冻结金额将变为可用，若发生退款，将自动扣减金额。",
                            ".ihover",
                            {
                                tips: [3, "rgba(0,0,0)"],
                                time: 0
                            }
                        );
                    },
                    function () {
                        layer.closeAll();
                    }
                );

                
                // 添加银行卡按钮
                $("#addbankcard").on("click", function () {
                    // window.location.href = "/shanghu/account/add_bank_public";
                    _this.go('/finance/bankcardadmin')  // 跳转到银行卡管理进行绑卡
                });

                var checkpress = function () {//验证
                    var isphone = /^1[3456789]\d{9}$/;
                    // var codeNum = /^\d{6}$/;
                    var passNum = /^\d{6}$/;
                    var num = ""; //密码
                    var num1 = ""; //再次输入的密码
                    var code = $("#code").val(); // 验证码
                    $("#ul1>input").each(function (i) {
                        if ($(this).val()) {
                            num += $(this).val();
                        }
                    });
                    $("#ul2>input").each(function (i) {
                        if ($(this).val()) {
                            num1 += $(this).val();
                        }
                    });

                    if (!code) {
                        layer.msg("请输入正确的验证码");
                        return false;
                    }
                    if (!(num.length == 6) || !passNum.test(num)) {
                        layer.msg("请输入正确密码");
                        return false;
                    }
                    if (!(num1.length == 6) || !passNum.test(num1)) {
                        layer.msg("请再次确认密码");
                        return false;
                    }
                    if (num != num1) {
                        layer.msg("两次输入的密码不一致");
                        return false;
                    }
                    _this.setPass = num
                    return true;
                };
                var onsubmit = function () {//提交ajax
                    // window.location.href = "/shanghu/account/withdraw_deposit_bank";
                    var obj = { code: $("#code").val(), pwd: _this.setPass}
                    _this.$http.post('/shv2/account/set_pwd', obj, function (res) {
                        console.log(res)
                        if(res.code == 1) {
                            layer.msg(res.msg)
                            layer.closeAll();
                            _this.whetherbank()
                        } else {
                            layer.msg(res.msg)
                        }

                    }, function (err) { console.log(err)})
                };
                $("#onsubmit").on("click", function () {//设置密码确认
                    if (checkpress()) {
                        onsubmit();
                    }
                });
                $("#withdraw").on("click", function () {//点击提现
                    if (_this.withdraw_deposit.transaction === 1){  //判断是否设置交易密码
                        _this.go('/finance/withdrawal/outToBank')   // 进入提现到银行卡页
                    } else {
                        layer.open({    // 没有设置密码调起弹框去填写
                            type: 1,
                            shadeClose: true,
                            shade: 0.3,
                            closeBtn: 1,
                            title: "设置交易密码",
                            content: $(".layer_notice"),
                            area: ["560px", "500px"],
                            cancel: function () { }
                        });
                        $(".layui-layer-title").css({
                            height: "50px",
                            background: "#ECF2FB",
                            "line-height": "50px"
                        });
                        $(".layui-layer-setwin").css("top", "19px");
                        return;
                    }
                    // onsubmit();
                });

                $("#ul1>input").on("keypress", function () {
                    $(this).val("");
                    var $input = $(this).next("input");
                    if ($input.length > 0) {
                        $input.focus();
                    }
                });
                $("#ul2>input").on("keypress", function () {
                    $(this).val("");
                    var $input = $(this).next("input");
                    if ($input.length > 0) {
                        $input.focus();
                    }
                });
                var noneclick = false;

                $("#getcode").on("click", function () {
                    //获取验证码
                    var isphone = /^1[3456789]\d{9}$/;
                    if (!isphone.test($("#phone").val())) {
                        layer.msg("请输入正确的手机号");
                        return;
                    }
                    if (noneclick) {
                        return;
                    }

                     var time = 60;
                    $(this).text("(60s)重获");
                    var _selt = $(this);
                    var settime = setInterval(function () {
                        if (!time) {
                            noneclick = false;
                            _selt.text("重新获取");
                            clearInterval(settime);
                            return;
                        }
                        noneclick = true;
                        time--;
                        _selt.text("(" + time + "s)重获");
                    }, 1000);
                    _this.$http.post('/shv2/Alidayu/sendSMS', { telphone: _this.withdraw_deposit.login_phone }, function (res) {  // 获取验证码      
                        console.log(res)
                        if (res.code == 1) {
                            // layer.msg('已发送验证码')
                        } else {
                            layer.msg(res.msg)
                        }
                    }, function (err) { console.log(err)})
                
                   
                });
            });
        }
    }
}
</script>

<style scoped lang="less">
//提现
#lyt_account {
    .active {
        background-color: #3196FF;
        color: rgba(255,255,255,1);
    }
    .lyt_title {
        background: #fff;
    }
    .lyt_typetotal {
        .lyt_hos {
            .reflsh {
                display: inline-block;
                width: 16px;
                height: 16px;
                background: url(../../common/image/pages/account/icon_hdxx.png)
                    no-repeat;
                position: relative;
                top: 2px;
                margin-right: 5px;
            }
            .bg_f {
                height: 137px;
                .lyt_rz {
                    color: #4281d7;
                    span {
                        display: inline-block;
                        text-align: center;
                        font-size: 12px;
                        width: 60px;
                        height: 20px;
                        line-height: 20px;
                        background: rgba(236, 242, 251, 1);
                        border-radius: 4px;
                    }
                }
            }
        }
        .lyt_price {
            li {
                height: 80px;
                border-right: 1px dashed #aaa;
                .icon1 {
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    background: url("../../common/image/pages/account/icon_zzc.png")
                        no-repeat;
                    position: relative;
                    top: 4px;
                    margin-right: 6px;
                }
                .icon2 {
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    background: url("../../common/image/pages/account/icon_djye.png")
                        no-repeat;
                    position: relative;
                    top: 4px;
                    margin-right: 6px;
                }
                .icon3 {
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    background: url("../../common/image/pages/account/icon_jrsr.png")
                        no-repeat;
                    position: relative;
                    top: 4px;
                    margin-right: 6px;
                }
                .layer_icon {
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    background: url("../../common/image/pages/account/icon_gd.png")
                        no-repeat;
                    position: relative;
                    top: 4px;
                    margin-right: 6px;
                }
                .layer_icon:hover {
                    background: url("../../common/image/pages/account/icon_gdls.png")
                        no-repeat;
                }
                p:first-child {
                    line-height: 16px;
                }
                p:last-child {
                    margin-left: 65px;
                    line-height: 24px;
                }
            }
            li:last-child {
                border-right: none;
            }
        }
    }
    .lyt_table {
        padding: 24px;
        #clearinp {
            color: #3196ff;
            cursor: pointer;
        }
        .layui-input-inline {
            input {
                height: 34px;
            }
        }
        .layui-inline {
            .layui-btn {
                height: 34px;
                line-height: 34px;
                background: #3196ff;
            }
            .layui-form-label {
                padding: 7px 15px;
            }
        }
        #type,
        #status {
            height: 34px;
            border: 1px solid #e2e2e2;
            border-radius: 3px;
            width: 100%;
            padding-left: 5px;
        }
        .tab_tit {
            border-bottom: 1px solid #f1f2f9;
        }
        .layui-table thead tr {
            background: #dae9ff;
            height: 49px;
        }
        .layui-table[lay-even] tr:nth-child(even) {
            background-color: #e5f0ff;
        }
        .layui-laypage .layui-laypage-curr .layui-laypage-em,
        .layui-laypage-btn {
            color: #fff;
            font-size: 14px;
            background: #3196ff;
        }
        .layui-input:focus,
        .layui-input:hover {
            border: 1px solid #e2e2e2;
        }
    }

    .bank > img {
        width: 15px;
        height: 15px;
        margin-right: 8px;
        vertical-align: middle;
        margin-bottom: 3px;
    }
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
.layui-layer-title {
    background-color: #ecf2fb;
    font-size: 18px;
    height: 50px;
    line-height: 50px;
}

#withdraw {
    width:140px;
    height:40px;
    border:none; 
    background: #DDDDDD;
    font-size: 18px;
    -webkit-border-radius: 4px;
    -moz--border-radius: 4px;
    -o-border-radius: 4px;
    -ms-border-radius: 4px;
    border-radius:4px;
    
}

</style>
