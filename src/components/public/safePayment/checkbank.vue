<template>
    <!-- 银行卡审核 -->
    <div id="bankcard_sh" class="bg_f Pd-B40">
        <p class="recharge_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24">
            绑定银行卡信息审核
        </p>
        <div class="Pd-T24 Pd-L24 Pd-R24">
            <p class="sh_status" v-if='status == "0" ? true : false'>
                当前审核状态：<span>待审核</span>
            </p>
            <p class="sh_status" v-if='status == "1" ? true : false'>
                当前审核状态：<span>审核通过</span>
                <el-button type="primary" size='small' @click='test'>去绑定银行卡</el-button>
            </p>
            <div class="sh_status" v-if='status == "2" ? true : false'>
                当前审核状态：<span style='color: red;'>审核未通过</span> <button class="onup" @click='Return'>重新上传</button>
                <p class="Ft-S14 Color_gray6 Mg-T24" >
                    未通过原因：<span v-text="text">个人账户姓名信息与绑定相关联银行卡号不符，请核对后重新上传！</span>
                </p>
            </div>
        </div>
        <table class="Mg-T24">
            <tr class="" height="34px">
                <td width="160px" class="Ft-S14 Color_black" align="right">
                    提现账户类型：
                </td>
                <td class="Pd-L40 Ft-S14 Color_gray6">个人账户</td>
            </tr>
            <tr class=""height="34px">
                <td width="160px" class="Ft-S14 Color_black" align="right">姓名：</td>
                <td class="Pd-L40 Ft-S14 Color_gray6" >{{ userName }}</td>
            </tr>
            <tr class=""height="34px">
                <td width="160px" class="Ft-S14 Color_black" align="right">
                    身份证号：
                </td>
                <td class="Pd-L40 Ft-S14 Color_gray6">{{ IDcard }}</td>
            </tr>
            <tr class=""height="34px">
                <td width="160px" class="Ft-S14 Color_black" align="right">
                    个人身份证照片：
                </td>
                <td class="Pd-L40 Ft-S14 Color_gray6">
                    <i class="fileimg"></i><span>身份证照片已成功上传</span>
                </td>
            </tr>
            <tr class="" height="34px">
                <td width="160px" class="Ft-S14 Color_black" align="right">
                    授权证明文件：
                </td>
                <td class="Pd-L40 Ft-S14 Color_gray6">
                    <i class="filetext"></i><span>文件已成功上传</span>
                </td>
            </tr>
        </table>

    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {
            userName: '',   // 姓名
            IDcard: '',     // 身份证号
            status: '0',     // 审核状态
            text: '',        // 未通过返回的原因
        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        test() { 
            this.go('/finance/bankcardadmin/otherform') // 去绑定银行卡
        },
        Return () { // 审核不通过
            this.go('/finance/bankcardadmin/bindbankPerson')    // 返回从新提交
        },
        initdata() {
            var _this = this;
            _this.$http.post('/shv2/account/add_bank_person_audit',{}, function (res) {
                if(res.code == 1) {
                    _this.userName = res.data.name
                    _this.IDcard = res.data.idcard
                    var st = res.data.status;
                    switch(st) {
                        case 0: _this.status = '0'; break;
                        case 1: _this.status = '1'; break;
                        case 2: _this.status = '2'; _this.text = res.data.text; break;
                    }
                }
            }, function (err) { console.log(err)})

        }
    }
}
</script>

<style scoped lang="less">
#bankcard_sh {
    .recharge_tit {
        border-bottom: 1px solid #f1f2f9;
    }
    .onup {
        width: 80px;
        height: 30px;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        border: none;
        color: #fff;
        margin-left: 23px;
    }
    .sh_status {
        padding: 18px;
        background: #eaf4ff;
        border: 1px solid #3196ff;
        color: #3196ff;
        font-size: 14px;
        span {
            margin-right: 20px;
        }
    }
    .fileimg {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url(../../../common/image/pages/account/icon_sfz.png)
            no-repeat;
        position: relative;
        top: 2px;
        margin-right: 5px;
    }
    .filetext {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url(../../../common/image/pages/account/icon_wj.png)
            no-repeat;
        position: relative;
        top: 2px;
        margin-right: 5px;
    }
}
</style>
