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
                            <span class="Color_gray6" v-text='dataVal.hname'>
                                北京市同济医院
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                机构地址:
                            </span>
                            <span class="Color_gray6" >
                               <span>{{ dataVal.province }}</span> - <span>{{ dataVal.city }}</span> - <span>{{ dataVal.county }}</span>
                            </span>
                        </p>
                    </td>
                    <td width="33.3%" rowspan="2">
                        <p class="">
                            <span class="Color_black v-top" style="width:60px;">
                                机构简介:
                            </span>
                            <span class="Color_gray6" style="width:326px;display:inline-block" v-text="dataVal.introduction">
                                首都医科大学附属北京朝阳医院建院于1958年2月24日，是北京市医院管理局直属，集医疗、教学、科研、预防为一体的三级甲等医院，是首都医科...
                                <span class="Color_blue pointer">
                                    更多
                                </span>
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
                            <span class="Color_gray6" v-text='dataVal.telephone'>
                                010-44582125
                            </span> </p>
                    </td>
                    <td>
                        <p>
                            <span class="Color_black">
                                详细地址:
                            </span>
                            <span class="Color_gray6" v-text='dataVal.address'>
                                辽宁省营口市站前区金牛山大街306号
                            </span>
                        </p>
                    </td>
                    <td><span></span><span></span></td>
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
                            <span class="Color_gray6">
                                <span v-if='dataVal.state == 1'>单向关联</span>  
                                <span v-if='dataVal.state == 2'>双向关联</span>
                                <span v-if='dataVal.state == 3'>提成设置</span>
                                <span v-if='dataVal.state == 4'>已合作</span>
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                关联时间:
                            </span>
                            <span class="Color_gray6" >
                                {{ dataVal.addtime | moment }}
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">

                    </td>
                </tr>
            </table>
        </div>
        <div class="bg_f">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">提成类别设置<span class="Color_red Ft-S12 Mg-L16" style="position:relative;top:1px;">您当前为二甲医院，您的目标机构为三甲医院，提成由上一级机构设定</span></p>
            <form class="layui-form" action="">
                <table>
                    <tr>
                        <td width="33.3%">
                            <input type="checkbox" name="" title="预约挂号转诊" lay-skin="primary" lay-filter="checktext" >
                            <span class="Color_black Ft-S14">提成比例</span>
                            <input type="text" id="focus1" disabled>%
                        </td>
                        <td width="33.3%">
                            <input type="checkbox" name="" title="在线问诊" lay-skin="primary" lay-filter="checktext1" >
                            <span class="Color_black  Ft-S14">提成比例</span>
                            <input type="text" id="focus2" disabled>%
                        </td>
                        <td>

                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="bg_f hide">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">提成信息</p>
            <form class="layui-form" action="">
                <table>
                    <tr>
                        <td width="33.3%">
                            <span class="Color_black Ft-S14"> 提成类别：</span>
                            <span class="Color_gray6 Ft-S14">预约挂号转诊</span>
                            <span class="Color_black Ft-S14 Mg-L24"> 提成比例：</span>
                            <span class="Color_gray6 Ft-S14">6%</span>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <p class="ac"><span class="Color_white Ft-S16 goback pointer" @click="go('/server/YaodrugParabiose')">返回</span></p>
        <p class="ac hide"><span class="Color_white Ft-S16 goback pointer Mg-R28" @click="go('/server/YaodrugParabiose')" style="background:#fff;color:rgba(49, 150, 255, 1)!important;border:1px solid rgba(49, 150, 255, 1)">返回</span><span class="Color_white Ft-S16 goback pointer" @click="go('/server/YaodrugParabiose/Yaodrugrecord')">合作记录</span></p>
        <p class="ac hide"><span class="Color_white Ft-S16 goback pointer Mg-R28" @click="go('/server/YaodrugParabiose')" style="background:#fff;color:rgba(49, 150, 255, 1)!important;border:1px solid rgba(49, 150, 255, 1)">返回</span><span class="Color_white Ft-S16 goback pointer">开启双向关联</span></p>
        <p class="ac hide"><span class="Color_white Ft-S16 goback pointer Mg-R28" @click="go('/server/YaodrugParabiose')" style="background:#fff;color:rgba(49, 150, 255, 1)!important;border:1px solid rgba(49, 150, 255, 1)">返回</span><span class="Color_white Ft-S16 goback pointer">开启合作</span></p>
    </div>
</template>
<script>
export default {
    name: 'doctorparabiosemsg',
    data() {
        return {
            dataVal:[]
        }
    },
    mounted() {
        this.initdata()
        var _this = this;
        _this.$http.post('/shv2/dcouplet/look', _this.$route.query, function(res) {
            console.log(res)
            if(res.code == 1) {
                _this.dataVal = res.data;
            }
        }, function (err) { console.log(err)})
    },
    methods: {
        initdata() {
            layui.use('form', function () {
                var form = layui.form;
                form.on('checkbox(checktext)', function (data) {
                    if(data.elem.checked){
                        $('#focus1').removeAttr('disabled')
                    }else{
                        $('#focus1').attr('disabled','disabled')
                    }
                });
                form.on('checkbox(checktext1)', function (data) {
                    if(data.elem.checked){
                        $('#focus2').removeAttr('disabled')
                    }else{
                        $('#focus2').attr('disabled','disabled')
                    }
                });
                form.render()//防止渲染失败
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
