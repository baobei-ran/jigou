<template>
    <div id="lyt_recharge" class="bg_f">
        <p class="recharge_tit Ft-S16 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10">
            充值
        </p>
        <div class="layui-form-item Mg-T24 Mg-B40">
            <label class="layui-form-label" style="width:150px">请输入充值金额：</label>
            <div class="layui-input-inline">
                <input type="number" v-model='price' name="password" required lay-verify="required" placeholder="请输入金额" autocomplete="off" class="layui-input" id="money" />
            </div>
            <div class="layui-form-mid layui-word-aux">元</div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label" style="width:150px; padding-top:0px;">请选择充值方式：</label>
            <span class="paytype icon_wx Mg-R24">微信支付</span>
            <span class="paytype icon_zfb Mg-R24">支付宝支付</span>
            <span class="paytype icon_yl">银行卡</span>
        </div>
        <div class="layui-form-item Mg-T40">
            <button class="layui-btn layui-btn-normal" :disabled='disabled' style="margin-left:150px" id="onsubmit">
                立即充值
            </button>
        </div>
        <div class="wx_dialig ac hide">
            <div class="Mg-T56" style="width:200px;height:200px;background: #eee; margin: 0 auto">
                <img id="wxurl" :src="wxUrl" width="180px" height="180px;" class="Mg-T10" alt="" />
            </div>
            <p class="Ft-S30 Fw700 Color_black Mg-T18 Mg-B26">
                ¥<span id="wxmoney">{{ price }}</span>
            </p>
            <p class="Ft-S16 Color_black">请使用微信扫码支付</p>
        </div>

        <div class="alipay_dialog ac hide">
            <div class="Mg-T56" style="width:200px;height:200px;background: #eee; margin: 0 auto">
                <iframe id="aliurl" ref='Iframe' src="" frameborder="0"
                    width="180px"
                    height="180px;"
                    marginwidth="0"
                    marginheight="0"
                    scrolling="no"
                    allowtransparency="yes"
                ></iframe>
            </div>
            <p class="Ft-S30 Fw700 Color_black Mg-T18 Mg-B26">
                ¥<span>{{ price }}</span>
            </p>
            <p class="Ft-S16 Color_black">请使用支付宝扫码支付</p>
        </div>

        <div class="alipay_success ac hide">
            <img src="../../common/image/pages/account/icon_czcg.png" style="margin-top:110px" alt="" />
            <!--
          <img
            src="../../common/image/pages/account/icon_czsb.png"
            style="margin-top:110px"
            alt=""
          />
        -->
            <p class="Mg-T20 Pd-B50">充值成功！</p>
            <!-- <p class="Mg-T20 Pd-B50">充值失败，余额不足</p> -->
            <button class="Mg-T30 gobacklyt Color_white Ft-S16" style="width: 140px;
            height: 40px;
            background: #3196FF;
            border:none;
            border-radius: 5px;
            pointer" @click='ReturnBtn'>
                返回鲁医通账户
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {
            price: '',              // 监听金额
            wxUrl: '',              //  微信返回的二维码
            zfbUrl: '',             // 支付宝的路径
            maxPrice: '1',          // 充值最大金额
            minPrice: '0.01',       // 充值最小金额
            Tied_card: false,       // 是否绑定银行卡
            chongzhiTime: '',       // 二维码充值时间查询
            disabled: false,        // 按钮
            session: '',            // 支付宝订单号
        }
    },
    computed: {
       
    },
    mounted() {
        this.initdata();
        var _this = this;
        this.$http.post('/shv2/account/if_bank',{}, function (res) {   // 检测是否绑卡
            // console.log(res)
            if(res.code == 1) {
                _this.Tied_card = true;  // 已绑卡
            } else {
                _this.Tied_card = false; // 未绑卡
            }
        }, function (err) { console.log(err)})
           
        

    },
    methods: {
        ReturnBtn () {
            var _this = this;
            layui.use('layer', function(){
                var layer = layui.layer;
                _this.go('/finance/lytAccount')
                layer.closeAll();
            });  
            
        },
        initdata() {
            var _this = this;
            layui.use(["layer"], function () {
                var $ = layui.jquery;
                var paytext = "";
                var selectstatus = function () {
                    //成功失败
                    layer.open({
                        type: 1,
                        anim: 0,
                        title: "<span class='Color_black Ft-S18'>支付宝充值</span>",
                        area: ["400px", "460px"], //宽高
                        content: $(".alipay_success")
                    });
                };
                $(".paytype").each(function () {
                    $(this).on("click", function () {
                        $(".paytype").each(function (i) {
                            $(this).attr("style", "border:1px solid #DDDDDD");
                        });
                        $(this).attr(
                            "style",
                            "border:1px solid #4281D7;outline:1px solid #4281D7"
                        );
                        paytext = $(this).text();
                    });
                });

          
                $('#money').blur(function(){    // 失去焦点后不符合要求的会对内容进行处理
                    if (_this.price == '') {
                        _this.price = '0.00'
                    }
                    var money2 = _this.price.match(/^\d*(\.?\d{0,2})/g)[0]; // 保留小数点后面两位小数
                    _this.price = money2
                     var regex=/^[0]+/;
                     _this.price = _this.price.replace(regex,"");
                     _this.price =  _this.price.replace(/^\./g, '0.');
                     _this.price =  _this.price.replace(/^\d$/g, '$1');
                });
                $("#money").on("input propertychange",function(event) {     // 输入的时候进行验证
                    this.value = this.value.replace(/^([1-9]\d*(\.[\d]{0,2})?|0(\.[\d]{0,2})?)[\d.]*/g, '$1');
                    this.value = this.value.replace(/^([1-9]\d{5})\d*/g, '$1');
                    this.value = this.value.replace(/[^\d\.]/g, '');
                    this.value = this.value.replace(/^\./g, '0.');
                    this.value = this.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
                    this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
                })

                

                _this.$http.post('/shv2/account/recharge',{}, function (res) {  // 充值参数判断
                    // console.log(res)
                    if(res.code == 1) {
                        var data = res.data;
                        _this.maxPrice = data.max;
                        _this.minPrice = data.min;
                    }
                }, function (err) { console.log(err) })

                

                $("#onsubmit").on("click", function () {
                    
                    _this.disabled = true
                    var time = setTimeout(() => {
                         _this.disabled = false
                         clearTimeout(time)
                    }, 2000)
                    var money = $('#money').val(); //金额 各种验证规则不太清楚
                    if (money <= 0) {
                        // layer.msg('充值金额不能小于100');
                        layer.msg('请输入充值金额');
                        return false;
                    }
                    if (money < _this.minPrice) {
                        layer.msg('充值金额不能小于'+_this.minPrice);
                        return false;
                    }
                    if (money > _this.maxPrice) {
                        layer.msg('充值金额不能大于'+_this.maxPrice);
                        return false;
                    }
                    if (paytext == '') {
                        layer.msg('请选择充值方式');
                        return false;
                    }
                    if (paytext == "微信支付") {
                        _this.$http.post('/shv2/account/charge', {money: _this.price, type: 2}, function (res) {
                            // console.log(res)
                            if (res.code == 1) {
                                _this.wxUrl = res.code_url
                                layer.open({   // 调取弹框
                                    type: 1,
                                    shadeClose: true,
                                    shade: 0.8,
                                    title: "<span class='Color_black Ft-S18'>微信充值</span>",
                                    area: ["400px", "460px"], //宽高
                                    content: $(".wx_dialig")
                                });
                                if (_this.chongzhiTime !== '') {    // 调用前先查看一遍，如果有定时器存在就清除
                                    clearInterval(_this.chongzhiTime)
                                }
                               _this.chongzhiTime = setInterval(() => {    // 调用微信二维码后，进行充值查询
                                    _this.payResult(res.order_code, res.type).then(res => {
                                        console.log(res)
                                        if (res.code == 1) {
                                            clearInterval(_this.chongzhiTime)
                                             layer.closeAll();
                                            selectstatus()              // 充值成功后弹出成功框
                                        }
                                    })
                                }, 3000)
                            } else {
                                layer.msg(res.msg);
                            }
                        }, function (err) { console.log(err)})
                       
                    } else if (paytext == "支付宝支付") {
                        _this.zfbUrl = '/shv2/account/charge?money='+_this.price+'&type=1';  // 支付宝地址
                       $('#aliurl').attr('src', _this.$http.baseURL+_this.zfbUrl)            // 把地址发给 iframe
                            var bao = $('#aliurl').attr('src')
                            layer.open({    // 弹框
                                type: 1,
                                title: "支付宝充值",
                                shadeClose: true,
                                shade: 0.6,
                                area: ["400px", "460px"],
                                content: $(".alipay_dialog"), //iframe的弹框
                                cancel: function () {
                                    $('#aliurl').attr('src', '')   // 关闭按钮，进行清空，防止发生二次请求
                                 }
                            });
                            if (_this.chongzhiTime !== '') {         // 调用前先查看一遍，如果有定时器存在就清除
                                clearInterval(_this.chongzhiTime)
                            }
                        if (bao !== '') {
                           var timer = setTimeout(() => { //  调取支付宝二维码后，获取订单号
                                _this.$http.post('/shv2/account/get_session', {}, function (res) {
                                    // console.log(res)
                                    if (res.code == 1) {
                                        _this.session = res.data
                                    }
                                }, function (err) { console.log(err)})
                                clearTimeout(timer)
                            }, 1500)  
                            
                            _this.chongzhiTime = setInterval(() => {    // 调用支付宝二维码后，进行充值查询
                            if (_this.session !== '') {
                                _this.payResult(_this.session.order_code, _this.session.type).then(res => {
                                    console.log(res)
                                    if (res.code == 1) {
                                        clearInterval(_this.chongzhiTime)
                                        layer.closeAll();
                                        selectstatus()              // 充值成功后弹出成功框
                                    }
                                })
                            } else {
                                console.log('获取支付宝订单号失败，请重新发起请求')
                            }
                        }, 3000)
                                 
                        }
                            
                            
                                    
                              
                    } else {
                        // 在此判断有无绑定银行卡
                        // window.location.href = "/shanghu/account/recharge_bank";
                            if(_this.Tied_card) {
                                _this.$http.post('/shv2/account/recharge_bank', { money: _this.price }, function (res) {
                                        console.log(res)
                                        if (res.code == 1) {
                                            _this.localstorage.put('bankOrder', res.data, 1/12);
                                            _this.$router.replace({path: '/finance/recharge/insetBank'})
                                            
                                        } else {
                                            layer.msg(res.msg)
                                        }
                                }, function (err) { console.log(err)})
                            } else {
                                 _this.$router.push('/finance/bankcardadmin')   //  跳转到绑定银行卡页面
                            }
                       
                         
                        
                        
                        
                    }

                    $(".layui-layer-title").css({
                        height: "50px",
                        background: "#ECF2FB",
                        "line-height": "50px"
                    });
                    $(".layui-layer-setwin").css("top", "19px");
                });

                // function getPay(money, paytype) {
                //     var data = false;
                //     $.ajax({
                //         url: '/shanghu/account/recharge',
                //         async: false,
                //         type: 'post',
                //         dataType: 'json',
                //         data: { 'money': money, 'type': paytype },
                //         success: function (res) {
                //             console.log(res);
                //             if (res.code == 1) {
                //                 data = res;
                //             } else {
                //                 layer.msg(res.msg);
                //             }
                //         },
                //         error: function () {
                //             layer.msg('系统错误');
                //         }
                //     });
                //     return data;
                // }
            });
        },
        payResult: function (order, type) {    //封装， 微信支付宝充值调用是否成功
            return new Promise((resolve, reject) => {
                this.$http.post('/mobile/order/pay_result',{order_code: order, type:type}, function (res) {
                    resolve(res)
                }, function (err) { reject(err)})
            })
        }
    },
    beforeDestroy() {
        clearInterval(this.chongzhiTime)    // 离开前清楚定时器
    }
}
</script>

<style scoped lang="less">
//鲁医通充值
#lyt_recharge {
  height: 800px;
  input:focus,
  input:hover {
    border: 1px solid #e2e2e2;
  }
  .recharge_tit {
    border-bottom: 1px solid #f1f2f9;
  }
  .paytype {
    display: inline-block;
    width: 160px;
    height: 50px;
    line-height: 50px;
    border: 1px solid #dddddd;
    cursor: pointer;
  }
  .icon_wx {
    background: url(../../common/image/pages/account/icon_wepay.png) no-repeat 28px;
    padding-left: 67px;
  }
  .icon_zfb {
    background: url(../../common/image/pages/account/icon_alipay.png) no-repeat 25px;
    padding-left: 59px;
  }
  .icon_yl {
    background: url(../../common/image/pages/account/icon_card.png) no-repeat 21px;
    padding-left: 59px;
  }
}
</style>
