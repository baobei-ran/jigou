<template>
    <div>
        <div id="bank_recharge" class="bg_f bankrecharge" style="height:800px;">
            <p class="recharge_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10">
                提现到银行卡
            </p>
            <table class="Mg-T34">
                <tr height="40px">
                    <td width="104px" class="Ft-S16 Color_black" align="right">
                        账户余额
                    </td>
                    <td class="Pd-L44 Ft-S16 Color_gray6">{{ userData.money_balance }} 元</td>
                </tr>
                <tr height="60px">
                    <td width="104px" class="Ft-S16 Color_black" align="right">银行卡</td>
                    <td class="Pd-L44 Ft-S16 Color_gray6">
                        <img class='banklogo' :src='$http.baseURL+bankData.img' alt='' />
                        <span>{{ bankData.bank_name }}</span>
                        <span>{{ bankData.numberu }}</span>
                    </td>
                </tr>
                <tr class="">
                    <td width="104px" class="Ft-S16 Color_black" align="right" style="position:relative;top:-10px;">
                        提现金额
                    </td>
                    <td class="Pd-L44 Ft-S16 Color_gray6 Pd-T10">
                        <input type="number" v-model='price' id="price" placeholder="输入金额" />
                        <span>元</span>
                        <p class="Color_grayA Ft-S14 Mg-T10">（每月前5次提现免费）</p>
                    </td>
                </tr>
                <tr class="">
                    <td width="104px" class="Ft-S16 Color_black" align="right" style="position:relative;top:-10px;">
                        支付密码
                    </td>
                    <td class="Pd-L44 Ft-S16 Color_gray6 tdParent">
                        <ul id="ul" class="Mg-T30">
                            <input ref='content' type="password" />
                            <input type="password" />
                            <input type="password" />
                            <input type="password" />
                            <input type="password" />
                            <input type="password" />
                          
                        </ul>
                        
                        <p class="Mg-T10 Mg-B16 Color_gray6">
                            <span class="">请输入6位数字支付密码</span><span class="Mg-L54" style="color: #4281D7;cursor: pointer;" id="wjdialog">忘记密码？</span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="Pd-L44 Pd-T40">
                        <button class="bankrecharge Ft-S16" id="checkwithdraw">确认</button>
                    </td>
                </tr>
            </table>
        </div>
        <div id="SectionBox">
            <div class="layer_notice hide">
                <div class="form_content_action" id="layer">
                    <form class="layui-form Mg-T40" action="">
                        <div class="layui-form-item Mg-B24">
                            <label class="layui-form-label">手机号：</label>
                            <div class="layui-input-inline">
                                <input type="tel" name="phone" lay-verify="required" style="width:300px" v-model='userData.login_phone' disabled autocomplete="off" class="layui-input Mg-L16" id="phone" value="}" />
                            </div>
                        </div>
                        <div class="layui-form-item Mg-B24">
                            <label class="layui-form-label">验证码：</label>
                            <div class="layui-input-inline empay Mg-L16">
                                <input type="tel" name="code" required lay-verify="required" style="width:210px" placeholder="请输入密码" autocomplete="off" maxlength="10" class="layui-input" id="code" />
                            </div>
                            <div class="layui-form-mid layui-word-aux Mg-L20 ac pointer" id="getcode">
                                获取验证码
                            </div>
                        </div>
                        <div class="layui-form-item  Mg-B24">
                            <label class="layui-form-label">支付密码：</label>
                            <div class="layui-input-inline Mg-L16">
                                <ul id="ul1" class='empay'>
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                </ul>
                                <p class="Mg-T10 Mg-B20 Color_gray6">请输入6位数字支付密码</p>
                                <ul id="ul2" class='empay'>
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
            userData: '',         // 用户信息
            bankData: '',         // 银行卡信息
            price: '',            // 提现金额
        }
    },
    mounted() {
        this.initdata();
        
    },
    methods: {
      initdata() {
          var _this = this;
        layui.use(["layer"], function() {
            var $ = layui.jquery;
            var layer = layui.layer;
            _this.$http.post('/shv2/account/withdraw_deposit',{}, function (res) {  // 获取用户银行卡信息
              console.log(res)
              if (res.code == 1) {
                _this.userData = res.data
                _this.bankData = res.bank
              }
            }, function (err) { console.log(err)})

            $('#price').blur(function(){
                    if (_this.price == '') {
                        _this.price = '0.00'
                    }
                    var money2 = _this.price.match(/^\d*(\.?\d{0,2})/g)[0]; // 保留小数点后面两位小数
                    _this.price = money2
                    var regex=/^[0]+/;
                    _this.price = _this.price.replace(regex,"");
                    _this.price =  _this.price.replace(/^\./g, '0.');
                });
                $("#price").on('input  propertychange',function(){  // 金钱输入验证
                    this.value = this.value.replace(/[^\d\.]/g, '');
                    this.value = this.value.replace(/^\./g,'');
                    this.value = this.value.replace(/\.{2,}/g,'.');
                    this.value = this.value.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
                    //只能输入两位小数
                    this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');

                    
                })

            $("#ul>input").on("keypress", function() {
              $(this).val("");
              var $input = $(this).next("input");
              if ($input.length > 0) {
                $input.focus();
              }
            });

            
              
            
            $("#checkwithdraw").on("click", function() { 
                  var password = '';
                  var code = /^\d{6}$/;
                $('#ul>input').each(function (i) {
                  if ($(this).val()) {
                      password += $(this).val();
                  }
              })
                if (_this.price < _this.userData.min_money) {
                    layer.msg(`提现金额不能小于${_this.userData.min_money}`)
                    return false;
                }
                if (!(password.length == 6) || !code.test(password)) {
                    layer.msg(`请输入正确的密码`)
                    return false;
                }
              // 提现到银行卡
              var user = _this.localstorage.get('logindata')
              var obj = {type_id: user.hid, type_user: 3,money: _this.price, cardid: _this.bankData.id, pwd: password }
              _this.$http.post('/mobile/order/money_carry', obj, function (res) {   // 提现到银行卡确认操作
                  // console.log(res)
                  if (res.code == 1) {
                    _this.$router.replace('/finance/withdrawal/withdrawalResult')
                  } else {
                    layer.msg(res.msg)
                  }
              }, function (err) { console.log(err)})
              // window.location.href = "/shanghu/account/withdraw_deposit_submit";
            });







            $("#wjdialog").on("click", function() {
              $(".empay input").each(function(i) {
                $(this).val('');
              });
              layer.open({                          // 忘记密码弹框
                type: 1,
                closeBtn: 1,
                shade: 0.5,
                shadeClose: true,
                title: "忘记交易密码",
                content: $(".layer_notice"),
                area: ["560px", "500px"],
                cancel: function() {}
              });
            });
            $("#ul1>input").on("keypress", function() {
              $(this).val("");
              var $input = $(this).next("input");
              if ($input.length > 0) {
                $input.focus();
              }
            });
            $("#ul2>input").on("keypress", function() {
              $(this).val("");
              var $input = $(this).next("input");
              if ($input.length > 0) {
                $input.focus();
              }
            });
            var noneclick = false;
            $("#getcode").on("click", function() {
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
              var settime = setInterval(function() {
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
              _this.$http.post('/shv2/Alidayu/sendSMS', { telphone: _this.userData.login_phone }, function (res) {      // 手机获取短信验证码
                // console.log(res)
                  if (res.code == 1) {
                    layer.msg(res.msg)
                  } else {
                    layer.msg(res.msg)
                  }
              }, function (err) { console.log(err)})
            });
            


      $('#onsubmit').on('click', function () {//提交
          var isphone = /^1[3456789]\d{9}$/;
          var codeNum = /^\d{4}$/;
          var passNum = /^\d{6}$/;
          var num = '';//密码
          var num1 = '';//再次输入的密码
          var code = $('#code').val();
          // $('#phone').val() 手机号
          //$('#code').val() 验证码
          $('#ul1>input').each(function (i) {
              if ($(this).val()) {
                  num += $(this).val();
              }
          })
          $('#ul2>input').each(function (i) {
              if ($(this).val()) {
                  num1 += $(this).val();
              }
          })
          /*if(!isphone.test($('#phone').val())) {
           layer.msg('请输入正确的手机号');
           return
           }*/

          if (!codeNum.test(code)) {
              layer.msg('请输入正确的验证码');
              return
          }
          if (!(num.length == 6) || !passNum.test(num)) {
              layer.msg('请输入正确密码');
              return
          }
          if (!(num1.length == 6) || !passNum.test(num1)) {
              layer.msg('请再次确认密码');
              return
          }
          if (num != num1) {
              layer.msg('两次输入的密码不一致');
              return
          }

            var obj = { code: code, pwd: num}
          _this.$http.post('/shv2/account/set_pwd', obj, function (res) {
            console.log(res)
            if (res.code == 1) {
              layer.msg('密码修改成功')
              layer.closeAll();
            } else {
              layer.msg(res.msg)
              
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
.bankrecharge {

      .tdParent {
        position: relative;
        #admin {
            position: absolute;
            top:30px;
            width: 300px;
            height: 40px;
            input {
                width: 320px;
                height: 40px;
                border: 0;
                background: none;
                letter-spacing: 43px;
                padding-left: 20px;
                color: transparent;
                caret-color: #000;
            }
        }
      }
      

  ul {
    overflow: hidden;
    width: 300px;
    input {
      float: left;
      width: 50px;
      height: 40px;
      text-align: center;
      border: 1px solid #ddd;
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

  .banklogo {
    width: 20px;
    margin-bottom: 3px;
    margin-right: 5px;
  }
}
#bank_recharge {
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
  .getcode {
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
</style>
