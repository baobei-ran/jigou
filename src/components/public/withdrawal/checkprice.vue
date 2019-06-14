<template>
       <div id="bank_recharge" class="bg_f" style="height:800px;">
      <p class="recharge_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B40">
            提现到银行卡
      </p>
      <div class="ac">
        <img src="../../../common/image/pages/account/icon_tjcg.png" alt="" class="Mg-T40 Mg-B30" />
        <p class="Color_black Ft-S16 Mg-B10">提现申请已提交，等待银行处理</p>
        <p class="Color_gray6" style="font-size:12px;">如果银行信息填写错误，导致提现失败，资金将自动退还到您的鲁医通账户</p>
        <button
          class="Mg-T40 gobacklyt Color_white Ft-S16"
          style="width: 140px;
            height: 40px;
            background: #3196FF;
            border:none;
            border-radius: 5px;
            cursor: pointer
            "
            id="golyt"
        >
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

        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {
            layui.use(["layer"], function() {
                var $ = layui.jquery;

                $("#golyt").on("click", function() {
                //充值
                // window.location.href = "/shanghu/account/index";
                });
            });
        }
    }
}
</script>

<style scoped lang="less">
    //银行卡充值
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
</style>
