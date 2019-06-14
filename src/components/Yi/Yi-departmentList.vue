<template>
    <div id="departmentList" class="bg_f" style="height:95%">
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab">
                <div class="layui-tab-content">
                    <div class="screen_type Mg-T20 Mg-B24">
                        <div class="layui-form-item layui-row">
                            <div class="fl">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">科室名称</label>
                                    <div class="layui-input-inline">
                                        <input type="text" autocomplete="off" v-model='name' class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="fl">
                                <span class="Ft-S14 selectbtn ac pointer" @click='initdata(1)'>查询</span>
                            </div>
                            <div class="fr">
                                <span class="adddoctor pointer" @click="go('/data/departmentList/departmentAdd')">增加科室</span>
                            </div>
                        </div>

                    </div>
                    <table class="layui-table" lay-skin="nob" lay-even>
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td>序号</td>
                                <td>科室名称</td>
                                <td>关联疾病</td>
                                <td>展示权重</td>
                                <td>推荐</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody class='tbody' v-show="tableList.length">
                            <tr v-for="(val,index) in tableList">
                                <td>{{index+1}}</td>
                                <td v-text="val.department_name">妇产科</td>
                                <td v-text="val.diss">心脏病、糖尿病、急性脑...</td>
                                <td v-text="val.sort">1</td>
                                <td>
                                    <el-switch v-model="val.settop" :active-value="1" :inactive-value="0" @change="setdep_op(val.id,val.settop)" active-color="#13ce66" inactive-color="#ccc">
                                    </el-switch>
                                </td>
                                <td>
                                    <span class="Color_blue pointer" @click="godetail(val.id)">查看</span>
                                    <span class="Color_blue pointer Mg-L24 Mg-R24" @click="edit(val.id)">编辑</span>
                                    <span class="Color_blue pointer" @click="deldata(val.id)">删除</span>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-show="!tableList.length">
                            <tr>
                                <td colspan="6">暂无数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="page" v-show="tableList.length" class="ac Mg-T30"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'departmentList',
    data() {
        return {
            value: true,
            name: '',   // 搜索框内容
            page: 1,
            limit: 10,
            tableList: []   // 数据列表
        }
    },
    mounted() {
        this.initdata(1)
    },
    methods: {
        initdata(num) {
            var _this = this;
            layui.use(["laypage", "layer", "laydate", "element"], function () {
                var element = layui.element;
                _this.page = num;
                _this.$http.post('/shv2/data/dep_list', { name: _this.name, page: _this.page, limit: _this.limit }, function (res) {//
                console.log(res.data)
                    if (res.code == 1) {
                        _this.tableList = res.data;
                        if (num == 1) {
                            _this.pageFun(res.count)
                        }
                    } else {
                        _this.tableList = false;
                        _this.pageFun(0)
                    }
                }, function (err) { console.log(err) });

            });
        },
        pageFun(total) {    // 下一页和上一页
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
        setdep_op(id, val) {   // 推荐按钮组
            var _this = this;
            val ? val = 1 : val = 0
            layui.use(["layer"], function () {
                _this.$http.post('/shv2/data/dep_op', { id: id, val: val }, function (res) {//
                    if (res.code == 1) {
                        layui.layer.msg(res.msg, {icon:1})
                    } else {
                        layui.layer.msg(res.msg, {icon:2})
                    }
                }, function (err) { console.log(err) });
            });
        },
        godetail(id) {  // 查看
            this.go('/data/departmentList/departmentDetail?id=' + id)
        },
        edit(id) {  // 编辑
            this.go('/data/departmentList/departmentEdit?id=' + id)
        },
        deldata(id) {   // 单条删除
            var _this = this;
            layui.use(["layer"], function () {
                layui.layer.confirm('您确定要删除吗', {
                    btn: ['确定', '取消'] //按钮
                }, function () {
                    _this.$http.post('/shv2/data/dep_del', { id: id }, function (res) {//
                        if (res.code == 1) {
                            layui.layer.msg(res.msg)
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
#departmentList {
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
