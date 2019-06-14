<template>
    <div id="doctorList" class="bg_f" style="height:95%">
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab">
                <div class="layui-tab-content">
                    <div class="screen_type Mg-T20 Mg-B24">
                        <div class="layui-form-item layui-row">
                            <div class="fl">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">医生姓名</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="" v-model="name" autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="fl">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">医生职称</label>
                                    <el-select v-model="grade" style='width: 170px;border-color: #e6e6e6;' placeholder="请选择">
                                        <el-option
                                        v-for="(item, index) in gradeList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="fl">
                                <div class="layui-input-inline">
                                    <span class="Ft-S14 selectbtn ac pointer" @click="initdata(1)">查询</span>
                                </div>
                            </div>
                            <div class="fr">
                                <span class="adddoctor pointer" @click="go('/data/doctorList/doctorListAdd')">增加医生</span>
                            </div>
                        </div>
                    </div>
                    <table class="layui-table" lay-skin="nob" lay-even>
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td>序号</td>
                                <td>医生姓名</td>
                                <td>医生职称</td>
                                <td width="400px">关联疾病</td>
                                <!-- <td>开通服务</td> -->
                                <!-- <td>展示权重</td> -->
                                <td>推荐</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody v-if='tableList.length'>
                            <tr v-for="(val,index) in tableList">
                                <td v-text="index"></td>
                                <td v-text="val.true_name">陈亚楠</td>
                                <td v-text="val.name">主任医师</td>
                                <td v-text="val.title">心脏病、糖尿病、急性脑...</td>
                                
                                <td>
                                    <el-switch v-model="val.sort" @change="setdep_op(val.did,val.sort)" active-color="#13ce66" :active-value="1" :inactive-value="0" inactive-color="#ccc">
                                    </el-switch>
                                </td>
                                <td>
                                    <span class="Color_blue pointer" @click="godetail(val.did)">查看</span>
                                    <span class="Color_blue pointer Mg-L24 Mg-R24" @click="edit(val.did)">编辑</span>
                                    <span class="Color_blue pointer" @click="del(val.did)">删除</span>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-if='!tableList.length'>
                            <tr>
                                <td colspan='8'>无数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="page" v-show='tableList.length' class="ac Mg-T30"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'doctorList',
    data() {
        return {
            value: true,
            name: '',
            grade: '',
            page: 1,
            limit: 10,
            count: '',
            tableList: [],
            gradeList: []   // 医生职称列表
        }
    },
    mounted() {
        this.initdata(1);
        var _this = this;
        this.$http.post('/shv2/data/doc_type', {}, function (res) { // 获取医生职称接口
            var code = res.code.toString()
            if (code.includes('1')) {
                _this.gradeList = res.data.grade
            }
        }, function (err) {consoel.log(err)})
    },
    methods: {
        initdata(num) { // 初始化调用或者查询
            var _this = this;
            layui.use(["laypage", "layer", "laydate", "element"], function () {
                var element = layui.element;
                _this.page = num;
                _this.$http.post('/shv2/data/doc_list', { name: _this.name, grade: _this.grade, page: _this.page, limit: _this.limit }, function (res) {//
                    console.log(res)
                    if (res.code == 1) {
                        _this.count = res.count;
                        _this.tableList = res.data;
                        _this.pageFun(res.count)
                    } else {
                        _this.tableList = false;
                        _this.pageFun(0)
                    }
                }, function (err) { console.log(err) });

            });
        },
        pageFun(total) {   // 分页
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
                            _this.page = obj.curr;
                            _this.initdata(obj.curr)
                        }
                    }
                });
            });
        },
        setdep_op(id, val) {    // 推荐按钮
            var _this = this;
            val ? val = 1 : val = 0
            layui.use(["layer"], function () {
                _this.$http.post('/shv2/data/doc_op', { id: id, val: val }, function (res) {//
                    if (res.code == 1) {
                        layui.layer.msg(res.msg, {icon:1})
                    }
                }, function (err) { console.log(err) });
            });
        },
        tab(num) {
            this.tdlast = num
        },
        godetail(id) {  // 查看
            this.go('/data/doctorList/doctordetail?id='+id)
        },
        edit(id) {  // 编辑
            this.go('/data/doctorList/doctorEdit?id='+id)
        },
        del(id) {   // 删除
            var _this = this;
            layui.use(["layer"], function () {
                layui.layer.confirm('您确定要删除吗', {
                    btn: ['确定', '取消'] //按钮
                }, function () {
                    _this.$http.post('/shv2/data/doc_del', { id: id }, function (res) {// 
                    console.log(res)
                        layui.layer.msg(res.msg)
                        if (res.code == 1) {
                            _this.initdata(1)
                        }
                    }, function (err) { console.log(err) });
                }, function () {
                    layer.closeAll()
                });
            });
        }
    }
}
</script>

<style scoped lang="less">
#doctorList {
    .layui-table[lay-even] tr:nth-child(even) {
        background-color: #e5f0ff;
    }
    .adddoctor {
        display: inline-block;
        width: 80px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        background: rgba(49, 150, 255, 1);
        border-radius: 2px;
        color: #fff;
        font-size: 14px;
        margin-top: 5px;
    }
    .screen_type {
        .layui-form-item {
            .lay_width {
                width: 100%;
                .layui-form-label {
                    font-size: 14px;
                    width: 80px;
                    padding: 9px 10px 9px 0px;
                }
                .layui-input-inline {
                    width: 170px;
                    input {
                        height: 38px;
                    }
                }
                .select_class {
                    width: 98px;
                    height: 38px;
                    border: 1px solid #ddd;
                }
                .select_class1 {
                    width: 170px;
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
