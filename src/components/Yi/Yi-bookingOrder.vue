<template>
    <div id="bookingorder" class="bg_f" style="height:95%">
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab Pd-T24">
                <ul class="layui-tab-title">
                    <li class="layui-this" @click="tab(0)">全部（{{ orderNavNum.count }}）</li>
                    <li @click="tab(1)">未使用（{{ orderNavNum.count1 }}）</li>
                    <li @click="tab(2)">已使用（{{ orderNavNum.count2 }}）</li>
                    <li @click="tab(3)">已过期（{{ orderNavNum.count3 }}）</li>
                    <li @click="tab(4)">已退号（{{ orderNavNum.count4 }}）</li>
                </ul>

                 <div class="layui-tab-content">
                    <div class="screen_type Mg-T14 ">
                        <div class="layui-form-item layui-row">
                            <div class="layui-col-md3 ">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">预约单号</label>
                                    <div class="layui-input-inline">
                                        <input type="text" v-model='number' autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md3 ">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">预约医生</label>
                                    <div class="layui-input-inline">
                                        <input type="text" v-model='name' autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md3">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">所属科室</label>
                                    <select name="city" lay-verify="required" v-model='depid' class="select_class">
                                        <option value="">全部</option>
                                        <option v-for='(val,i) in depList' :key='i' :value="val.department_id">{{ val.department_name }}</option>
                                    </select>
                                </div>
                            </div>
                            <!-- <div class="layui-col-md4 selecttime">
                                <label class="layui-form-label">预约时间</label>
                                <div class="layui-input-block">
                                    <div class="layui-input-inline">
                                        <input type="text" name="price_min" v-model='ktime' placeholder="" id="date" autocomplete="off" class="layui-input">
                                    </div>
                                    <div class="layui-form-mid">-</div>
                                    <div class="layui-input-inline">
                                        <input type="text" name="price_max" v-model='jtime' placeholder="" id="date1" autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md1">
                                <div class="layui-input-inline">
                                    <span class="Ft-S14 selectbtn ac pointer" @click='search'>查询</span>
                                </div>
                            </div> -->
                        </div>
                        <div class="layui-form-item Mg-T20 layui-row">
                            
                            <div class="layui-col-md6 selecttime">
                                <label class="layui-form-label">预约时间</label>
                                <div class="layui-input-block">
                                    <div class="layui-input-inline">
                                        <input type="text" name="price_min" placeholder="请输入开始时间" id="date" autocomplete="off" class="layui-input">
                                    </div>
                                    <div class="layui-form-mid">-</div>
                                    <div class="layui-input-inline">
                                        <input type="text" name="price_max" placeholder="请输入结束时间" id="date1" autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md1 Mg-L20">
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
                                <td>预约单号</td>
                                <td>预约医生</td>
                                <td>所属科室</td>
                                <td>预约时间</td>
                                <td>用户信息</td>
                                <td>患者信息</td>
                                <td>支付信息</td>
                                <td>预约订单</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody v-show='orderList'>
                            <tr v-for="(val,i) in orderList">
                                <td>{{ i+1 }}</td>
                                <td>{{ val.registration_number }}</td>
                                <td>{{ val.true_name }}</td>
                                <td>{{ val.department_name }}</td>
                                <td>{{ val.registration_time }}</td>
                                <td>{{ val.real_name  }}</td>
                                <td>{{ val.name }}</td>
                                <td>{{ val.registration_amount }}元</td>
                                <td>{{ val.stat }}</td>
                                <td><span class="Color_blue pointer" @click="godetail(val.registration_id)">查看</span></td>
                            </tr>
                        </tbody>
                        <tbody v-show='!orderList'>
                            <td colspan="10">暂无数据</td>
                        </tbody>
                    </table>
                    <div v-show='orderList' id="page" class="ac Mg-T30"></div>
                </div>
                

            </div>
        </div>
    </div>
</template>
<script>

export default {
    
    name: 'bookingorder',
    data() {
        return {
            tdlast: '', // tab Nav 导航
            page: 1,    // 页数
            limit: 10,   // 条数
            orderList: [],   // 订单列表
            orderNavNum: {  // 导航数量
                count: 0,
                count1: 0,
                count2: 0,
                count3: 0,
                count4: 0,
            },
            number: '',     // 预约单号
            name: '',       // 预约医生
            depid: '',      // 科室 id
            ktime: '',      // 开始时间
            jtime: '',       // 结束时间
            depList: [],    // 选择科室列表
        }
    },
    mounted() {
        this.initList(1)
        var _this = this;
        this.$http.post('/shv2/data/dep_list',{}, function (res) {   // 获取科室
            // console.log(res)
            if (res.code == 1) {
                _this.depList = res.data
            }
        }, (err) => { console.log(err)} )
    },
    methods: {

        search () {
            var oDate1 = new Date($('#date').val());
            var oDate2 = new Date($('#date1').val());
            if (oDate1.getTime() > oDate2.getTime()) {
                layer.msg('开始时间不能大于结束时间');
                return
            }
            this.ktime = $('#date').val()
            this.jtime = $('#date1').val()
            this.initList(1)
        },
        //  数据
        initList(num) { // 和 搜索
            var _this = this;
            var obj = {type: _this.tdlast, page: num,limit: _this.limit, number: _this.number, name: _this.name, depid: _this.depid, ktime: _this.ktime, jtime: _this.jtime }
            console.log(obj)
            this.$http.post('/shv2/server/make_list', obj, function (res) {
                console.log(res)
                if (res.code == 0) {
                    _this.orderList = res.data
                    _this.orderNavNum = res.type
                        if (num == 1) {
                            _this.initdata(res.count)
                        }
                }
            }, function (err) { console.log(err)})
        },
        initdata(total) {    // 分页
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
                    limit: _this.limit, //每页条数
                    layout: ["prev", "page", "next", "skip"],
                    groups: 4,
                    jump: function(obj, first) {    
                        if(!first){ //首次不执行
                            _this.page = obj.curr;
                            _this.initList(obj.curr);
                        }
                    },
                    // prev:
                    //     '<img src="../../common/image/pages/account/icon_left.png" style="margin-top:-3px;" alt="" />',
                    // next:
                    //     '<img src="../../common/image/pages/account/icon_right.png" style="margin-top:-3px;"  alt="" />'
                });
            });
        },
        tab(num) {  
            this.tdlast = num
            this.initList(1)
        },
       godetail(id) {
           this.go('/server/bookingOrder/bookingOrderdetail?id='+id)
       }

    }
}
</script>

<style scoped lang="less">
#bookingorder {
    .layui-table[lay-even] tr:nth-child(even) {
        background-color: #e5f0ff;
    }
    .screen_type {
        width: 100%;
        .layui-form-item {
            .lay_width {
                width: 100%;
                .layui-form-label {
                    width: 80px;
                    padding: 9px 10px 9px 0px;
                }
                .layui-input-inline {
                    font-size: 14px;
                    width: 150px;
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
                padding: 9px 10px 9px 0px;
            }
            .layui-input-block {
                margin-left: 80px;
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
