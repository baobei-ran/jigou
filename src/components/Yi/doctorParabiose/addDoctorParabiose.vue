<template>
    <div id="adddoctorParabiose" class="Mg-T40">
        <p style="background:#FFFAD7;height:32px;color:#F0A228;line-height:32px;position:absolute;top:23px; width:96.5%;z-index:6666" class="Ft-S16 Pd-L24">提示：您当前为二甲医院，可绑定1家上级医疗机构和10家下级医疗机构</p>
        <div class="tab_content Pd-L24 Pd-R24 bg_f">
            <div class="layui-tab">
                <div class="layui-tab-content">
                    <div class="screen_type Mg-T14 ">
                        <div class="layui-form-item layui-row">
                            <div class="layui-col-md5">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label" style="width:90px;">机构所在地</label>
                                    <select name="city" @change="selectcity(list.province)" v-model="list.province" class="select_class">
                                        <option value="">请选择省</option>
                                        <option :value="val.aid" v-for="val in provinceList" v-text="val.aname"></option>
                                    </select>
                                    <select name="city" @change="selectcounty(list.city)" v-model="list.city" class="select_class">
                                        <option value="" >请选择市</option>
                                        <option :value="val.aid" v-for="val in cityList" v-text="val.aname"></option>
                                    </select>
                                    <select name="city" v-model="list.county" class="select_class">
                                        <option value=''>请选择市</option>
                                        <option :value="val.aid" v-for="val in countyList" v-text="val.aname"></option>
                                    </select>
                                </div>
                            </div>
                            <div class="layui-col-md2">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">机构类型</label>
                                    <select name="city" v-model="list.htype" class="select_class">
                                        <option value="">全部</option>
                                        <option :value="key" v-for="(val,key) in structureType">{{val}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="layui-col-md2">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">机构级别</label>
                                    <select name="city" v-model="list.grade" class="select_class">
                                        <option :value="val.id" v-for="val in hospitalgrade">{{val.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="layui-col-md2">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label" style="width:90px;">上/下级机构</label>
                                    <select name="city" v-model="list.type" class="select_class">
                                        <option value="0">全部</option>
                                        <option value="1">上级机构</option>
                                        <option value="2">下级机构</option>
                                    </select>
                                </div>
                            </div>
                            <div class="layui-col-md1">
                                <div class="layui-input-inline">
                                    <span class="Ft-S14 selectbtn ac pointer" @click="initdata(1)">查询</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <table class="layui-table" lay-skin="nob" lay-even>
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td>序号</td>
                                <td>机构名称</td>
                                <td>机构级别</td>
                                <td>医生数量</td>
                                <td>科室数量</td>
                                <td>被关联数量</td>
                                <td>平均返佣比例</td>
                                <td>机构所在地</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody v-show='tableList.length'>
                            <tr v-for="(val,index) in tableList">
                                <td>{{index+1}}</td>
                                <td v-text="val.hospital_name"></td>
                                <td v-text="val.name"></td>
                                <td v-text="val.docnum"></td>
                                <td v-text="val.depnum"></td>
                                <td v-text="val.relnum"></td>
                                <td v-text="val.rebnum"></td>
                                <td v-text="val.address"></td>
                                <td>
                                    <span class="Color_blue pointer" v-show="!val.status&&!val.status2" @click="asother(val.hid)">关联</span>
                                    <span class="Color_default" v-show="val.status||val.status2">已关联</span>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-show='!tableList.length'>
                            <tr >
                                <td colspan="9">暂无数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="page" v-show='tableList.length' class="ac Mg-T30"></div>
                </div>
            </div>
        </div>
        <p class="ac"><span class="Color_white Ft-S16 goback pointer" @click="go('/server/doctorParabiose')">返回</span></p>
    </div>
</template>
<script>
export default {
    name: 'adddoctorParabiose',
    data() {
        return {
            list: {
                province: '',
                city: '',
                county: '',
                htype: '',
                grade: '',
                type: '',
                page: 1,
                limit: 10
            },
            count: 1,
            provinceList: '', // 省
            cityList: '',     // 市
            countyList: '',   // 区/县
            structureType: '',
            hospitalgrade: '',
            tableList: []
        }
    },
    mounted() {
        this.initdata(1);
        this.selectprovince();
    },
    methods: {
        initdata(num) {
            var _this = this;
            layui.use(["laypage", "layer", "element"], function () {
                var element = layui.element;
                var laypage = layui.laypage;
                _this.list.page = num
                _this.$http.post('/shv2/dcouplet/relevance_add', _this.list, function (res) {//
                    if (res.code == 1) {
                        _this.structureType = res.structureType;
                        _this.hospitalgrade = res.hospitalgrade;
                        _this.tableList = res.data;
                        _this.count = res.count;
                        if (num == 1) {
                            _this.page(res.count)
                        }
                    }
                });
            });
        },
        page(total) {
            var _this = this;
            layui.use(["laypage", "layer", "element"], function () {
                var element = layui.element;
                var laypage = layui.laypage;
                laypage.render({
                    elem: "page", //注意，这里的 test1 是 ID，不用加 # 号
                    count: total, //数据总数，从服务端得到
                    limit: 10, //每页条数
                    layout: ["prev", "page", "next", "skip"],
                    groups: 4,
                    jump: function (obj, first) {
                        if (!first) {
                            _this.list.page=obj.curr;
                            _this.initdata(obj.curr)
                        }
                    }
                });
            });
        },
        asother(num) {
            var _this = this;
            layui.use([ "layer"], function () {
                var layer=layui.layer;
                _this.$http.post('/shv2/dcouplet/relevance', { type: 1, hid2: num }, function (res) {
                    if (res.code == 1) {
                        layer.msg(res.msg);
                        _this.initdata(_this.list.page)    
                    }
                }, function () {

                })
            })
        },
        selectprovince() {//初始化下拉框 省份
            var _this = this
            _this.cityList = []
            _this.countyList = []
            this.$http.post('/shv2/Setting/area', { fid: 1 }, function (res) {
                if (res.code == 1) {
                    _this.provinceList = res.data;
                }
            }, function () {

            })
        },
        selectcity(num) {//市
            var _this = this
             _this.countyList = []
            this.$http.post('/shv2/Setting/area', { fid: num }, function (res) {
                if (res.code == 1) {
                    _this.cityList = res.data;
                }
            }, function () {

            })
        },
        selectcounty(num) { //区县
            var _this = this
            this.$http.post('/shv2/Setting/area', { fid: num }, function (res) {
                if (res.code == 1) {
                    _this.countyList = res.data;
                }
            }, function () {

            })
        },
    }
}
</script>

<style scoped lang="less">
#adddoctorParabiose {
    .goback {
        display: inline-block;
        width: 120px;
        height: 40px;
        line-height: 40px;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        margin-top: 24px;
    }
    .layui-table[lay-even] tr:nth-child(even) {
        background-color: #e5f0ff;
    }
    .screen_type {
        .layui-form-item {
            .lay_width {
                width: 100%;
                .layui-form-label {
                    width: 66px;
                    padding: 9px 10px 9px 0px;
                }
                .layui-input-inline {
                    font-size: 14px;
                    width: 120px;
                    input {
                        height: 38px;
                    }
                }
                .select_class {
                    width: 120px;
                    height: 38px;
                    border: 1px solid #ddd;
                }
            }
        }
        .selectbtn {
            display: inline-block;
            color: #3196ff;
            background: #fff;
            width: 50px;
            height: 28px;
            line-height: 28px;
            border: 1px solid #3196ff;
            border-radius: 4px;
            position: relative;
            top: 5px;
        }
    }
    .tab_content {
        .layui-tab-content {
            padding-left: 1px;
            padding-right: 1px;
            .layui-table {
                outline: 1px solid rgba(221, 221, 221, 1);
                text-align: center;
                .table_headtr {
                    height: 50px;
                    background: #dae9ff;
                    td {
                        font-size: 16px;
                    }
                }
                tbody {
                    td {
                        height: 40px;
                        font-size: 14px;
                        color: #666;
                    }
                }
            }
        }
    }
}
</style>
