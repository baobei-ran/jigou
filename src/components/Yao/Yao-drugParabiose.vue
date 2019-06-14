<template>
    <div id="doctorParabiose" class="bg_f">
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab Pd-T24">
                <ul class="layui-tab-title">
                    <li class="layui-this" @click="tab(0)">全部关联（{{ tabdata.count }}）</li>
                    <li @click="tab(1)">收到的关联（{{ tabdata.count1 }}）</li>
                    <li @click="tab(2)">添加的关联（{{ tabdata.count2 }}）</li>
                    <li class="fr"><span class="adddoctor pointer" @click="go('/server/YaodrugParabiose/YaoaddDrugParabiose')">增加关联</span></li>
                </ul>
                <div class="layui-tab-content">
                    <div class="screen_type Mg-T14 ">
                        <div class="layui-form-item layui-row">
                            <div class="layui-col-md2">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">关联机构</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="" autocomplete="off" v-model='name' class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md4 selecttime">
                                <label class="layui-form-label">关联时间</label>
                                <div class="layui-input-block">
                                    <div class="layui-input-inline">
                                        <input type="text" name="price_min" placeholder="yyyy-MM-dd" id="date" autocomplete="off" class="layui-input">
                                    </div>
                                    <div class="layui-form-mid">-</div>
                                    <div class="layui-input-inline">
                                        <input type="text" name="price_max" placeholder="yyyy-MM-dd" id="date1" autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md2 ">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">业务状态</label>
                                    <select name="city" lay-verify="required" class="select_class" v-model='state'>
                                        <option v-for="(val,i) in statuslist" :value="val.id" :key='i'>{{ val.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <!-- <div class="layui-col-md2">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label" style="width:90px;">上/下级机构</label>
                                    <select name="city" lay-verify="required" class="select_class">
                                        <option value="">全部</option>
                                        <option value="010">xx</option>
                                        <option value="021">xx</option>
                                        <option value="0571">xx</option>
                                    </select>
                                </div>
                            </div> -->
                            <div class="layui-col-md2">
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
                                <td>关联发出机构</td>
                                <td>目标机构</td>
                                <td>关联时间</td>
                                <td>业务状态</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody v-if='listdata.length'>
                            <tr v-for="(val,i) in listdata" :key='val.id'>
                                <td v-text='i+1'>0001</td>
                                <td><i class="icon_star"></i>{{ val.dname }}</td>
                                <td><i class="icon_star"></i>{{ val.uname }}</td>
                                <td>{{ val.addtime }}</td>
                                <td>{{ val.status }}</td>
                                <td>
                                  <span class="Color_blue pointer Mg-R36" @click="godetail(val.down_hid, val.up_hid)">查看</span>
                                  <!-- <span class="Color_default">开启合作</span>
                                  <span class="Color_blue pointer">提成设置</span> -->
                                  <!-- <span class="Color_blue pointer" @click="go('/server/YaodrugParabiose/Yaodrugrecord')">合作记录</span> -->
                                  <!-- <span class="Color_default">合作开启中</span> -->
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-if='!listdata.length'>
                            <tr>
                                <td colspan="6">无数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="page" v-show='listdata.length' class="ac Mg-T30"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'doctorParabiose',
    data() {
        return {
            num: 0,             // tab
            name: '',           // 关联机构的名称
            start_time: '',     // 时间
            end_time: '',       // end 时间
            state: 0,          // 业务状态
            page: 1,            // 页数
            limit: 10,          // 每页数据
            statuslist: [{id: 0, name: '全部'},{id: 1, name: '单项关联'},{id: 2, name: '双向关联 '},{id: 3, name: '合作开启中'},{id: 4, name: '已合作'}],
            listdata: [],       // 列表数据
            tabdata: ''         //  tab数据
        }
    },
    mounted() {
        this.yaolist(1)
    },
    methods: {
        tab(num) {
            this.num = num;
            this.yaolist(1)
        },
        search () {
            this.num = 1
            this.yaolist(1)
        },
        yaolist (num) {
            var _this = this;
            _this.start_time = $('#date').val()
            _this.end_time = $('#date1').val()
            var obj = {type:_this.num, name: _this.name,start_time: _this.start_time, end_time: _this.end_time, state: _this.state, page: num, limit: _this.limit}
            _this.$http.post('/shv2/medicine/relevance_list', obj, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.tabdata = res;
                    _this.listdata = res.data
                    if (num == 1) {
                        _this.initdata(res.count)
                    }
                }
            }, function (err) { console.log(err)})
        },
        initdata(total) {
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
                    limit: 10, //每页条数
                    layout: ["prev", "page", "next", "skip"],
                    groups: 4,
                    jump: function(obj, first){
                        if(!first){ 
                            _this.page = obj.curr
                            _this.yaolist(obj.curr)
                        }
                    }
                });
            });
        },
        
        godetail(hid, id) {  // 查看
            this.$router.push({ path: '/server/YaodrugParabiose/YaodrugParabiosemsg', query: { down_hid: hid, up_hid: id } })
        }
    }
}
</script>

<style scoped lang="less">
#doctorParabiose {
  .icon_star{
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(../../common/image/icon/icon_star_active.png) no-repeat center;
    background-size: contain;
    position: relative;
    top:1px;
    margin-right:5px
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
                    width: 98px;
                    height: 38px;
                    border: 1px solid #ddd;
                }
            }
        }
        .selecttime {
            .layui-form-label {
                width: 66px;
                padding: 9px 10px 9px 0px;
            }
            .layui-input-block {
                margin-left: 66px;
            }
            .layui-input-inline {
                width: 150px;
                input {
                    height: 38px;
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
        .layui-tab {
            .layui-tab-title {
                font-size: 16px;
                color: #666666;
                .layui-this {
                    color: #128dff;
                    background: #fff;
                }
                .layui-this:after {
                    color: #128dff;
                    border-top: 2px solid #128dff;
                }
                .adddoctor {
                    display: inline-block;
                    width: 80px;
                    height: 28px;
                    line-height: 28px;
                    background: rgba(49, 150, 255, 1);
                    border-radius: 2px;
                    color: #fff;
                    font-size:14px; 
                }
            }
        }
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
