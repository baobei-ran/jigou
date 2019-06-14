<template>
    <div id="doctorparabiosemsg" class="" style="height:95%">
        <div class="bg_f Mg-B24">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">目标机构信息</p>
            <table class="Mg-T12">
                <tr>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                机构名称:
                            </span>
                            <span class="Color_gray6" v-text="dataList.hname">
                                北京市同济医院
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                机构地址:
                            </span>
                            <span class="Color_gray6" v-text="dataList.province+dataList.city+dataList.county">
                                辽宁省-营口市-站前区
                            </span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>
                            <span class="Color_black">
                                机构电话:
                            </span>
                            <span class="Color_gray6" v-text="dataList.telephone">
                                010-44582125
                            </span> </p>
                    </td>
                    <td>
                        <p>
                            <span class="Color_black">
                                详细地址:
                            </span>
                            <span class="Color_gray6" v-text="dataList.address">
                                辽宁省营口市站前区金牛山大街306号
                            </span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td width="33.3%" colspan="2">
                        <p class="">
                            <span class="Color_black v-top" style="width:60px;">
                                机构简介:
                            </span>
                            <span class="Color_gray6">
                                {{dataList.introduction}}
                            </span>
                        </p>
                    </td>
                </tr>
            </table>
        </div>
        <div class="bg_f Pd-T12 Mg-B24">
            <table>
                <tr>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                业务状态:
                            </span>
                            <span class="Color_gray6" v-text="dataList.state==1?'单向关联':dataList.state==2?'双向关联':dataList.state==3?'提成设置':'已合作'">
                                单向关联
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                关联时间:
                            </span>
                            <span class="Color_gray6">
                                {{dataList.addtime|moment('YYYY-MM-DD hh:mm:ss')}}
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">

                    </td>
                </tr>
            </table>
        </div>
        <div class="bg_f" v-if="dataList.state==2&&show==1">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">提成类别设置<span class="Color_red Ft-S12 Mg-L16" style="position:relative;top:1px;"></span></p>
            <form class="layui-form" action="">
                <table>
                    <tr>
                        <td width="33.3%">
                            <input type="checkbox" name="" title="预约挂号转诊" lay-skin="primary" lay-filter="checktext">
                            <span class="Color_black Ft-S14">提成比例</span>
                            <input type="text" id="focus1" disabled v-model="yynumber">%
                        </td>
                        <td width="33.3%">
                            <input type="checkbox" name="" title="在线问诊" lay-skin="primary" lay-filter="checktext1">
                            <span class="Color_black  Ft-S14">提成比例</span>
                            <input type="text" id="focus2" disabled v-model="tcnumber">%
                        </td>
                        <td>
                            <p class=""><span class="Color_white Ft-S16 rebate_btn pointer" @click="rebate_btn">保存</span></p>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="bg_f" v-if="dataList.state==2&&show!=1">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">提成类别设置<span class="Color_red Ft-S12 Mg-L16" style="position:relative;top:1px;">您当前为下级机构，您的目标机构为上级机构，提成由上一级机构设定</span></p>
            <form class="layui-form" action="">
                <table>
                    <tr>
                        <td width="33.3%">
                            <input type="checkbox" disabled name="" title="预约挂号转诊" lay-skin="primary" lay-filter="checktext">
                            <span class="Color_black Ft-S14">提成比例</span>
                            <input type="text" id="focus1" disabled v-model="yynumber">%
                        </td>
                        <td width="33.3%">
                            <input type="checkbox" disabled name="" title="在线问诊" lay-skin="primary" lay-filter="checktext1">
                            <span class="Color_black  Ft-S14">提成比例</span>
                            <input type="text" id="focus2" disabled v-model="tcnumber">%
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="bg_f" v-if="dataList.state==3||dataList.state==4">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">提成信息</p>
            <form class="layui-form" action="">
                <table>
                    <tr>
                        <td width="33.3%" v-show="tcnumber">
                            <span class="Color_black Ft-S14"> 提成类别：</span>
                            <span class="Color_gray6 Ft-S14">预约挂号转诊</span>
                            <span class="Color_black Ft-S14 Mg-L24"> 提成比例：</span>
                            <span class="Color_gray6 Ft-S14" v-text="tcnumber+'%'"></span>
                        </td>
                        <td width="33.3%" v-show="yynumber">
                            <span class="Color_black Ft-S14"> 提成类别：</span>
                            <span class="Color_gray6 Ft-S14">在线问诊</span>
                            <span class="Color_black Ft-S14 Mg-L24"> 提成比例：</span>
                            <span class="Color_gray6 Ft-S14" v-text="yynumber+'%'"></span>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <p class="ac" v-if="dataList.state!=4&&!(type==2&&dataList.state==1)&&!(show==2&&dataList.state==3)"><span class="Color_white Ft-S16 goback pointer" @click="go('/server/doctorParabiose')">返回</span></p>
        <p class="ac" v-if="dataList.state==4">
            <span class="Color_white Ft-S16 goback pointer Mg-R28" @click="go('/server/doctorParabiose')" style="background:#fff;color:rgba(49, 150, 255, 1)!important;border:1px solid rgba(49, 150, 255, 1)">返回</span>
            <span class="Color_white Ft-S16 goback pointer" @click="go('/server/doctorParabiose/record')">合作记录</span>
        </p>
        <p class="ac" v-if="type==2&&dataList.state==1">
            <span class="Color_white Ft-S16 goback pointer Mg-R28" @click="go('/server/doctorParabiose')" style="background:#fff;color:rgba(49, 150, 255, 1)!important;border:1px solid rgba(49, 150, 255, 1)">返回</span>
            <span class="Color_white Ft-S16 goback pointer">开启双向关联</span>
        </p>
        <p class="ac" v-if="show==2&&dataList.state==3">
            <span class="Color_white Ft-S16 goback pointer Mg-R28" @click="go('/server/doctorParabiose')" style="background:#fff;color:rgba(49, 150, 255, 1)!important;border:1px solid rgba(49, 150, 255, 1)">返回</span>
            <span class="Color_white Ft-S16 goback pointer">开启合作</span>
        </p>
    </div>
</template>
<script>
export default {
    name: 'doctorparabiosemsg',
    data() {
        return {
            dataList: '',
            yynumber: '',
            tcnumber: '',
            show: this.$route.query.show,
            type: '',
        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {
            var _this = this;
            layui.use(['form', 'layer'], function () {
                var layer = layui.layer;
                _this.$http.post('/shv2/dcouplet/look', { up_hid: _this.$route.query.up_hid, down_hid: _this.$route.query.down_hid }, function (res) {//
                    if (res.code == 1) {
                        _this.dataList = res.data;
                        _this.type = res.type;
                        if (res.list.length) {
                            res.list.forEach(ele => {
                                if (ele.business == 1) {
                                    _this.tcnumber = ele.percentage
                                } else {
                                    _this.yynumber = ele.percentage
                                }
                            });
                        }
                    } else {

                    }
                }, function (err) { console.log(err) });
                var form = layui.form;
                form.on('checkbox(checktext)', function (data) {
                    if (data.elem.checked) {
                        $('#focus1').removeAttr('disabled')
                    } else {
                        $('#focus1').attr('disabled', 'disabled')
                    }
                });
                form.on('checkbox(checktext1)', function (data) {
                    if (data.elem.checked) {
                        $('#focus2').removeAttr('disabled')
                    } else {
                        $('#focus2').attr('disabled', 'disabled')
                    }
                });
                form.render()//防止渲染失败
            });
        },
        rebate_btn() {
            var _this = this;
            layui.use(['form', 'layer'], function () {
                var layer = layui.layer;
                if (!_this.yynumber) {
                    layer.msg('请输入预约挂号提成比例')
                }
                if (!_this.tcnumber) {
                    layer.msg('请输入在线问诊提成比例')
                }
                var formdata = new FormData();
                formdata.append("rid", _this.$route.query.id);
                formdata.append("state", '3');
                formdata.append("data[1]", _this.yynumber);
                formdata.append("data[2]", _this.tcnumber);
                _this.$http.upload('/shv2/dcouplet/rebate', formdata, function (res) {//
                    if (res.code == 1) {
                        layer.msg(res.msg);
                        _this.initdata()
                    } else {

                    }
                });
            });
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
#doctorparabiosemsg {
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
