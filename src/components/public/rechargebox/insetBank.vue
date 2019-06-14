<template>
    <div id="bank_recharge" class="bg_f" style="height:800px;">
        <p class="recharge_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10">
            充值
        </p>
        <table class="Mg-T24 table_con Pd-L30">
            <tr height="50px">
                <td width="104px" class="Ft-S16 Color_black" align="right">
                    账户余额
                </td>
                <td class="Pd-L44 Ft-S16 Color_gray6">{{ userMsg.money }} 元</td>
            </tr>
            <tr height="50px">
                <td width="104px" class="Ft-S16 Color_black" align="right">银行卡</td>
                <td class="Pd-L44 Ft-S16 Color_gray6">
                    <img class="cardLogo" :src="$http.baseURL+userMsg.img" alt=""><span>{{ userMsg.bank_name }}</span> <span>{{ bankcard }}</span>
                </td>
            </tr>
            <tr height="50px" class="hide">
                <td width="104px" class="Ft-S16 Color_black" align="right">
                    充值金额
                </td>
                <td class="Pd-L44 Ft-S16 Color_gray6">
                    <input type="text" id="price" placeholder="输入金额" />
                    <span>元</span>
                </td>
            </tr>
            <tr>
                <td width="104px" class="Ft-S16 Color_black Pd-T32" align="right">
                    验证码
                </td>
                <td class="Pd-L44 Ft-S16 Color_gray6">
                    <p class="Ft-S12 Color_gray6 Pd-T16" style="margin-bottom:5px;">
                        验证码已发送手机号<span>{{ userMsg.banktel }}</span>
                    </p>
                    <input type="text" id="price" v-model='phone_code' placeholder="输入验证码" />
            
                    <span class="getcode2">获取验证码</span>
                </td>
            </tr>
            <tr>
                <td></td>
                <td class="Pd-L44 Pd-T40">
                    <button class="bankrecharge Ft-S16" id="checkcharge">确认充值</button>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name: 'insetBank',
    data() {
        return {
            timeCode: true,         // 验证码判断
            phone_code: '',          // 手机验证码
            userMsg: {               //  用户信息
                account_type: 3,
                bank_name: "工商银行",
                bankcard: "621226****8781",
                banktel: "199****8302",
                img: "/upload/bankcard/ICBC.png",
                money: "0.00",
            },
            bankcard: '621226****8781',      // 卡号
            token: '',                      //  token
            order_code: '',                 //  订单号
        }     
    },
    mounted() {
        this.initdata();
        var { token, order_code } = this.localstorage.get('bankOrder');
        this.token = token
        this.order_code = order_code
        var _this = this;
        this.$http.post('/shv2/account/recharge_wait',{}, function (res) {
            if (res.code == 1) {
                _this.userMsg = res.data
                _this.bankcard = _this.userMsg.bankcard.substring(0, 5) + '********' + _this.userMsg.bankcard.substr(-4)    // 对卡号进行处理
            }
        }, function (err) { console.log(err)})
    },
    methods: {
       
        initdata() {
            var _this = this;
            layui.use(["layer"], function () {
                var $ = layui.jquery;
               
                // $("#money").val(); //充值金额 各种验证
               

                var timeCode = false
                $(".getcode2").on("click", function () {
                    var num = 60;
                    if (timeCode) {
                        console.log('aa')
                        return;
                    }
                    _this.$http.post('/mobile/order/paySms',{token: _this.token}, function (res) {
                        console.log(res)
                        if (res.code == 1) {
                            layer.msg('已发送短信')
                        } else {
                            layer.msg(res.msg)
                        }
                    }, function (err) {
                        console.log(err)
                    })
                    var time = setInterval(function () {
                        if (!num) {
                            $(".getcode2").text("重新获取");
                            clearInterval(time);
                             timeCode = false;
                            return;
                        }
                        num--;
                         timeCode = true;
                        $(".getcode2").text(num + "s重新获取");
                    }, 1000);
                });
                $('#checkcharge').on('click', function () { //充值
                // window.location.href = "/shanghu/account/recharge_bank_success"
                 _this.$router.replace({path: '/finance/recharge/rechargeResult?order=0'})
                    if (!_this.phone_code) {
                        layer.msg('请输入验证码')
                        return;
                    }
                    var obj = { token: _this.token, code: _this.phone_code, order_code: _this.order_code }
                    _this.$http.post('/shv2/account/paySmsConfirm', obj, function (res) {
                        console.log(res)
                        if (res.code == 1) {
                            _this.$router.replace({path: '/finance/recharge/rechargeResult?order=1'})
                        }  else if (res.code == 102) {
                            layer.msg(res.msg)
                        } else {
                            _this.$router.replace({path: '/finance/recharge/rechargeResult?order=0'})
                        }
                    }, function (err) { console.log(err)})
                   
                    
                })
            });
        }
    }
}
</script>

<style scoped lang="less">
//银行卡充值
#bank_recharge {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 50px 0 100px;
    .table_con {
        width: 100%;
    }
  .recharge_tit {
    border-bottom: 1px solid #f1f2f9;
  }
  #price {
    border: 1px solid #c2c2c3;
    width: 160px;
    height: 36px;
    padding-left: 10px;
  }
  input:focus,
  input:hover {
    border: 1px solid #c2c2c3;
  }
  .getcode1, .getcode2 {
    border: 1px solid #3196ff;
    color: #3196ff;
    display: inline-block;
    width: 80px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
  }
  .bankrecharge {
    width: 110px;
    height: 40px;
    background: #3196ff;
    border: none;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  .cardLogo {
      width: 18px;
      margin-bottom: 3px;
      margin-right: 5px;
  }
}
</style>
