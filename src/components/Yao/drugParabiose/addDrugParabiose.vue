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
                                    <select name="city" lay-verify="required" v-model='sheng' @change='changeSheng' class="select_class">
                                        <option value="">请选择省</option>
                                        <option v-for='val in province' :key='val.aid' :value="val.aid">{{ val.aname }}</option>
                                    </select>
                                    <select name="city" lay-verify="required" v-model='shi' @change='changeShi' class="select_class">
                                        <option value="">请选择市</option>
                                        <option v-for='val in city' :key='val.aid' :value="val.aid">{{ val.aname }}</option>
                                    </select>
                                    <select name="city" lay-verify="required" v-model='qu' class="select_class">
                                        <option value="">请选择县\区</option>
                                        <option v-for='val in county' :key='val.aid' :value="val.aid">{{ val.aname }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="layui-col-md2">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">机构类型</label>
                                    <select name="city" lay-verify="required" class="select_class">
                                        <option value="">全部</option>
                                       <option v-for='(val,i) in structureType' :key='i' :value="val">{{ val }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="layui-col-md2">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">机构级别</label>
                                    <select name="city" lay-verify="required" class="select_class">
                                        <option value="">全部</option>
                                        <option v-for='val in hospitalgrade' :key='val.id' :value="val.id">{{ val.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="layui-col-md1">
                                <div class="layui-input-inline">
                                    <span class="Ft-S14 selectbtn ac pointer" @click='search'>查询</span>
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
                        <tbody v-if='dataVal.length'>
                            <tr v-for="(val,i) in dataVal">
                                <td>{{ i+1 }}</td>
                                <td>{{ val.hospital_name }}</td>
                                <td>{{ val.name }}</td>
                                <td>{{ val.docnum }}</td>
                                <td>{{ val.depnum }}</td>
                                <td>{{ val.relnum }}</td>
                                <td>{{ val.rebnum }}</td>
                                <td>{{ val.address }}</td>
                                <td>
                                    <span class="Color_blue pointer" @click='relevance(val.hid)'>关联</span>
                                    <!-- <span class="Color_default">已关联</span> -->
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-if='!dataVal.length'>
                            <tr style='text-align:center;'>
                                <td colspan="9">无数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="page" v-show='dataVal.length' class="ac Mg-T30"></div>
                </div>
            </div>
        </div>
        <p class="ac"><span class="Color_white Ft-S16 goback pointer" @click="go('/server/YaodrugParabiose')">返回</span></p>
    </div>
</template>
<script>
export default {
    name: 'adddoctorParabiose',
    data() {
        return {
            province: '',   // 省
            city: '',       // 市
            county: '',     // 区
            htype: '',      // 机构类型
            grade: '',      // 机构级别
            type: '',       // 上下级机构
            page: 1,
            limit: 10,
            dataVal: [],     // 列表数据
            province: [],  // 省
            city: [],           // 市
            county: [],         // 区
            hospitalgrade: [],       // 机构级别
            structureType: [],   // 机构类型
            sheng: '',         // 获取省的id
            shi: '',            // 城市id
            qu: '',             // 区的id
        }
    },
    mounted() {
        this.initlist(1)
    },
    methods: {
        search () {     // 搜索
            this.initlist(1)
        },
        initlist(num) {
            console.log(num)
            var _this = this;
            var obj = { province: _this.province, city: _this.city, county: _this.county, htype: _this.htype, grade: _this.grade, type: _this.type, page: _this.page, limit: _this.limit}
            _this.$http.post('/shv2/dcouplet/relevance_add', obj, function (res) {
                console.log(res)
                if(res.code == 1) {
                    _this.dataVal = res.data
                    _this.hospitalgrade = res.hospitalgrade
                    _this.province = res.province
                    _this.structureType = res.structureType
                    if (num == 1) { 
                        _this.initdata(res.count)
                    }
                }
            }, function (err) { console.log(err)})
        },
        initdata(tatol) {
            var _this = this;
            layui.use(["laypage", "layer", "laydate", "element"], function () {
                var element = layui.element;
                var laypage = layui.laypage;
                var laydate = layui.laydate;
                laydate.render({
                    elem: "#date" //指定元素
                });
                laydate.render({
                    elem: "#date1" //指定元素
                });
                laypage.render({
                    elem: "page", //注意，这里的 test1 是 ID，不用加 # 号
                    count: tatol, //数据总数，从服务端得到
                    limit: 10, //每页条数
                    layout: ["prev", "page", "next", "skip"],
                    groups: 4,
                    jump: function(obj, first){
                        if(!first) {
                            _this.page = obj.curr
                            _this.initlist(obj.curr)
                        }
                    }
                });
            });
        },
        changeSheng () {    // 获取市
            var _this = this;
            this.shi = ''
            this.qu = ''
            _this.$http.post('/shv2/Setting/area', { fid: this.sheng}, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.city = res.data
                }
            }, function (err) { console.log(err)})
        },
        changeShi () {    // 获取区
            var _this = this;
            this.qu = ''
            _this.$http.post('/shv2/Setting/area', { fid: this.shi}, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.county = res.data
                }
            }, function (err) { console.log(err)})
        },
        relevance (id) {  // 关联
            var _this = this;
            layui.use('layer', function(){
            var layer = layui.layer;
                _this.$http.post('/shv2/dcouplet/relevance',{ type: 1, hid2: id}, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.msg(res.msg, { icon: 1, time: 2000});
                        var index = setTimeout(() => {
                            clearTimeout(index)
                            _this.initlist(_this.page)
                        }, 2000)
                    } else {
                        layer.msg(res.msg, { icon: 2, time: 2000});
                    }
                }, function (err) {console.log(err)})
            });  
        }
    }
}
</script>

<style scoped lang="less">
#adddoctorParabiose {
    .goback {
        display: inline-block;
        width: 120px;
        height: 40px;
        line-height: 40px;;
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
