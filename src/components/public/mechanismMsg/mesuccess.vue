<template>
    <div id="bankcard_sh" class="bg_f Pd-B40">
        <p class="recharge_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24">
            机构信息
        </p>
        <div class="Pd-L24 Pd-R24">
            <table class="Mg-T24" width="100%">
                <tr class="" height="34px">
                    <td width="100px" class="Ft-S14 Color_gray6" align="right">
                        机构类型：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_black">{{ msgdata.structureType }}</td>
                </tr>
                <tr class="" height="34px">
                    <td width="100px" class="Ft-S14 Color_gray6" align="right">机构名称：</td>
                    <td class="Pd-L40 Ft-S14 Color_black">{{ msgdata.hospital_name }}</td>
                </tr>

                <tr>
                    <td colspan="2">
                        <p style="border-top:1px solid #E6E6E6;" class="Mg-T20 Pd-B20"></p>
                    </td>
                </tr>
                <tr class="" height="34px">
                    <td width="100px" class="Ft-S14 Color_gray6" align="right">
                        业务联系人：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_black">{{ msgdata.owner_name }}</td>
                </tr>
                <tr class="" height="34px">
                    <td width="100px" class="Ft-S14 Color_gray6" align="right">
                        联系电话：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_black">{{ msgdata.owner_mobile }}</td>
                </tr>
                <tr class="" height="34px">
                    <td width="100px" class="Ft-S14 Color_gray6" align="right">
                        机构经营地址：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_black">{{ msgdata.address }}</td>
                </tr>
                <tr class="" height="34px">
                    <td width="100px" class="Ft-S14 Color_gray6" align="right">
                        机构电话：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_black">{{ msgdata.telephone }}</td>
                </tr>
                <tr class="" height="34px">
                    <td width="100px" class="Ft-S14 Color_gray6" align="right">
                        经纬度：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_black">经度（Y）{{ msgdata.longitude }}|纬度（X）{{ msgdata.latitude }}</td>
                </tr>
                <tr class="" height="34px">
                    <td width="100px" class="Ft-S14 Color_gray6 v-top Pd-T10" align="right">
                        机构简介：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_black Pd-T10">
                        <p style="max-width:993px">{{ msgdata.introduction }}</p>
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
            msgdata: {}
        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {
            var _this = this;
            this.$http.post('/shv2/Setting/look_hos', {}, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.msgdata = res.data
                }
            }, function (err) { })

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
