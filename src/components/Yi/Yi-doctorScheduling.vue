<template>
    <div id="doctorpb" class="bg_f" style="height:95%">
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab">
                <div class="layui-tab-content">
                    <div class="screen_type Mg-T20 Mg-B24">
                        <div class="layui-form-item layui-row">
                            <div class="layui-col-md3">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">医生姓名</label>
                                    <div class="layui-input-inline">
                                        <input type="text" v-model='userName' autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md3">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">所属科室</label>
                                    <select name="city" lay-verify="required" v-model='departmentName' class="select_class1">
                                        <option value="">全部</option>
                                        <option v-for='(val, i) in departmentList' :key='i' :value="val.department_id">{{ val.department_name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="layui-col-md3">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">医生职称</label>
                                    <select name="city" lay-verify="required" v-model='doctorName' class="select_class1">
                                        <option value="">全部</option>
                                        <option v-for='(val,i) in doctorList' :key='i' :value="val.id">{{ val.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="layui-col-md1">
                                <div class="layui-input-inline">
                                    <span class="Ft-S14 selectbtn ac pointer" @click='crewList(1)'>查询</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <table class="layui-table" lay-skin="nob" lay-even>
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td>序号</td>
                                <td>医生姓名</td>
                                <td>医生职称</td>
                                <td>所属科室</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody v-show='doctorLists.length'>
                            <tr v-for="(val, index) in doctorLists" :key='index'>
                                <td>{{ index+1 }}</td>
                                <td v-text='val.true_name'>陈亚楠</td> 
                                <td v-text='val.name'>主任医师</td>
                                <td v-text='val.department_name'>内科</td>
                                <td><span class="Color_blue pointer" @click="godetail(val.did)">查看</span></td>
                            </tr>
                        </tbody>
                        <tbody v-show="!doctorLists.length">
                            <tr>
                                <td colspan="5">暂无数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <div  v-show="doctorLists.length" id="page" class="ac Mg-T30"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'doctorpb',
    data() {
        return {
            page: 1,            // 页数
            limit: 10,          // 每一位几条
            doctorLists: [],     // 排班列表
            userName: '',       // 搜索医生姓名
            departmentName: '', // 搜索科室
            doctorName: '',      // 搜索职称
            doctorList: [],      // 职称列表
            departmentList: []       // 科室列表
        }
    },
    mounted() {
        this.crewList(1);
        // 医生职称
        var _this = this;
        this.$http.post('shv2/data/doc_type',{}, function (res) {
            // console.log(res)
            if (res.code == 1) {
                _this.doctorList = res.data.grade
            }
        })
        // 科室 
        this.$http.post('/shv2/data/dep_list', {}, function (res) {
            if (res.code == 1) {
                _this.departmentList = res.data
            }
        },(err) => { console.log(err)})
    },
    methods: {
        //  数据接口  和  搜索
        crewList(num) {
            var _this = this;
            layui.use(["laypage", "layer", "laydate", "element"], function () {
                var element = layui.element;
                _this.page = num;
                _this.$http.post('/shv2/server/doctor_list', {page: _this.page, limit: _this.limit, name: _this.userName, depid: _this.departmentName, grade: _this.doctorName}, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        _this.doctorLists = res.data
                        _this.initdata(res.count)   // 传递总条数
                      
                    }
                }, function (err) { console.log(err)})
            });
        },
        initdata(total) {   // 分页
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
                    count: total, //数据总数，从服务端得到
                    limit: 5, //每页条数
                    layout: ["prev", "page", "next", "skip"],
                    groups: 4,
                    jump: function(obj, first){                        
                        if(!first){ //首次不执行
                            _this.page = obj.curr;  // obj.curr 代表当前点击的页数
                            _this.crewList(obj.curr);
                        }
                    }
                });
            });
        },
        godetail(id) {  // 查看
            this.go('/server/doctorScheduling/doctorSchedulingdetail?id=' + id)
        },

    }
}
</script>

<style scoped lang="less">
#doctorpb {
    .layui-table[lay-even] tr:nth-child(even) {
        background-color: #e5f0ff;
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
            top:5px;
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
