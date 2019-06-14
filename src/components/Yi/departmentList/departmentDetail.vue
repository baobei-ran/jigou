<template>
    <div id="departmentdetail" class="" style="height:95%">
        <div class="bg_f Pd-T12 Mg-B24">
            <table>
                <tr>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                科室名称：
                            </span>
                            <span class="Color_gray6" v-text="data.data.name">
                                口腔科
                            </span>
                        </p>
                    </td>

                </tr>
            </table>
        </div>
        <div class="bg_f Mg-B24">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">关联疾病</p>
            <table class="Mg-T12">
                <tr>
                    <td width="33.3%">
                        <p class="Ft-S14 Color_gray6">
                            <span v-for="(val,index) in data.info" v-text="val.take_name+(data.info.length-1==index?'':'丨')"></span>
                        </p>
                    </td>
                </tr>
            </table>
        </div>

        <div class="bg_f">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">展示效果</p>
            <form class="layui-form" action="">
                <table>
                    <tr>
                        <td width="33.3%">
                            <span class="Color_black Ft-S14">是否开启推荐:</span>
                            <span v-text="data.data.settop==1?'开启':'关闭'"></span>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <p class="ac"><span class="Color_white Ft-S16 goback pointer Mg-R28" @click="go('/data/departmentList')" style="background:#fff;color:rgba(49, 150, 255, 1)!important;border:1px solid rgba(49, 150, 255, 1)">返回</span><span class="Color_white Ft-S16 goback pointer" @click="go('/data/departmentList/departmentEdit?id='+data.data.id)">编辑</span></p>

    </div>
</template>
<script>
export default {
    name: 'departmentdetail',
    data() {
        return {
            data: {
                data: {
                    id: 205,
                    name: "",
                    settop: 1
                },
                dep: [{
                    disease_name: "",
                    disid: 342,
                    flag: 0
                }],
                info: [{
                    take_disease: 345,
                    take_name: ""
                }]
            }
        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {
            var _this = this
            layui.use(["layer"], function () {
                var layer = layui.layer;
                _this.$http.post('/shv2/data/dep_look', _this.$route.query, function (res) {//
                    if (res.code == 1) {
                        _this.data = res
                    }
                }, function (err) { })
            })
        }
    }
}
</script>
<style>
.layui-form-checkbox {
    padding-left: 25px !important;
}
</style>

<style scoped lang="less">
#departmentdetail {
    input,
    input:hover,
    input:focus {
        width: 60px;
        height: 30px;
        text-align: center;
        border: 1px solid #c2c3c3 !important;
        margin-right: 5px;
        margin-left: 10px;
    }
    div {
        border-radius: 4px;
        padding-bottom: 12px;
        .bookingorderdetail_tit {
            border-bottom: 1px solid #f1f2f9;
        }
        table {
            width: 100%;
            text-align: left;
            margin-left: 24px;
            font-size: 14px;
            color: #333;
            td {
                height: 38px;
            }
        }
    }
    .goback {
        display: inline-block;
        width: 120px;
        height: 40px;
        line-height: 40px;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        margin-top: 24px;
    }
}
</style>
