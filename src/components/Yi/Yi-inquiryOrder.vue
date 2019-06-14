<template>

<!-- 问诊订单页 -->
    <div id="bookingorder" class="bg_f" style="height:95%">
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab Pd-T24">
                <ul class="layui-tab-title">
                    <li class="layui-this" @click="tab(0)">全部（{{ orderNavNum.count }}）</li>
                    <li @click="tab(3)">图文问诊（{{ orderNavNum.count1 }}）</li>
                    <li @click="tab(4)">语音问诊（{{ orderNavNum.count2 }}）</li>
                    <li @click="tab(12)">视频问诊（{{ orderNavNum.count3 }}）</li>
                    <li @click="tab(11)">院后指导（{{ orderNavNum.count4 }}）</li>
                    <li @click="tab(2)">私人医生（{{ orderNavNum.count5 }}）</li>
                </ul>

                 <div class="layui-tab-content">
                    <div class="screen_type Mg-T14 ">
                        <div class="layui-form-item layui-row">
                            <div class="layui-col-md2 ">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">问诊单号</label>
                                    <div class="layui-input-inline">
                                        <input type="text" v-model='number' autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md2 ">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">问诊医生</label>
                                    <div class="layui-input-inline">
                                        <input type="text" v-model='name' autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md2">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">所属科室</label>
                                    <select name="city" lay-verify="required" v-model='depid' class="select_class" >
                                        <option value="">全部</option>
                                        <option v-for='(val,i) in depList' :key='i' :value="val.department_id">{{ val.department_name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="layui-col-md4 selecttime">
                                <label class="layui-form-label">问诊状态</label>
                                <select name="city" lay-verify="required" v-model='stateId' class="select_tai" style='width: 100px;height:38px;'>
                                        <option value="">请选择</option>
                                        <option v-for='(val,i) in states' :key='i' :value="val.id">{{ val.name }}</option>
                                    </select>
                                
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
                                <td>预约单号</td>
                                <td>预约医生</td>
                                <td>所属科室</td>
                                <td>问诊类型</td>
                                <td>用户信息</td>
                                <td>患者信息</td>
                                <td>支付信息</td>
                                <td>问诊状态</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody v-show='orderList.length'>
                            <tr v-for="(val,i) in orderList">
                                <td>{{ i+1 }}</td>
                                <td>{{ val.number }}</td>
                                <td>{{ val.true_name }}</td>
                                <td>{{ val.department_name }}</td>
                                <td>{{ val.type}}</td>
                                <td>{{ val.user  }}</td>
                                <td>{{ val.con }}</td>
                                <td>{{ val.money }}元</td>
                                <td>{{ val.status }}</td>
                                <td><span class="Color_blue pointer" @click="godetail(val.id)">查看</span></td>
                            </tr>
                        </tbody>
                        <tbody v-show='!orderList.length'>
                            <td colspan="10">暂无数据</td>
                        </tbody>
                    </table>
                    <div v-show='orderList.length' id="page" class="ac Mg-T30"></div>
                </div>
            </div>

        </div>

        <div class="box hide" id='wrap' >
            <p class="title">基本信息</p>
            <div class="box_head bg_f">
                <div class="box_user">
               <div>
                   <span>医生姓名：</span><span>{{ check.true_name }}</span>
               </div>
               <div>
                   <span>医生手机：</span><span>{{ check.d_phone }}</span>
               </div>
               <div>
                   <span>医生邮箱：</span><span>{{ check.mailbox }}</span>
               </div>
            </div>
            <div class="box_user">
                <div>
                   <span>医生职称：</span><span>{{ check.gname }}</span>
               </div>
               <div>
                   <span>所属科室：</span><span>{{ check.department_name }}</span>
               </div>
            </div>
                <div style='padding-left:10px;' class="Mg-T10">
                    <span>医生简介：</span> {{ check.introduction }}
                </div>
            </div>
            <p class="title Mg-T20">订单信息</p>
            <div class="box_head bg_f">
                <div class="box_user">
               <div>
                   <span>问诊单号：</span><span>{{ check.number }}</span>
               </div>
               <div>
                   <span>问诊时间：</span><span>{{ check.addtime|moment('YYYY-MM-DD hh:mm:ss') }}</span>
               </div>
            </div>
            <div class="box_user">
                <div>
                   <span>支付金额：</span><span>{{ check.money }} 元</span>
               </div>
                <div>
                   <span>问诊类型：</span><span>{{ busitype }}</span>
               </div>
               <div>
                   <span>问诊状态：</span><span>{{ busistatus }}</span>
               </div>
            </div>
               
                <div class="box_user">
                    <div>
                        <span>用户信息：</span><span>{{ check.real_name }}</span> <span> 手机  {{ check.patient_phone }}</span>
                    </div>
                    <div>
                        <span>患者信息：</span><span>{{ check.cname }}</span> <span> 手机 {{ check.patient_phone }}</span>
                    </div>
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
                count5: 0
            },
            number: '',     // 问诊单号
            name: '',       // 问诊医生
            depid: '',      // 科室 id
            stateId: '',     // 选择问诊状态
            depList: [],    // 选择科室列表
            states: [       // 问诊状态列表
                {id: 1, name: '未开始'},
                {id:2,name: '已开始'},
                {id:3,name: '已结束'}
            ],
           check: '',      //  查看的数据
           busitype: '',    // 类型
           busistatus: ''   // 状态

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

        search () { // 搜索
            var _this = this;
                _this.orderList = []
                _this.initList(1)
            
        },
        //  数据
        initList(num) { 
            var _this = this;
            var obj = {busitype: _this.tdlast, page: num,limit: _this.limit, number: _this.number, name: _this.name, depid: _this.depid, type:_this.stateId }
            this.$http.post('/shv2/server/asking_list', obj, function (res) {
                // console.log(res)
                if (res.code == 1) {
                    _this.orderList = res.data
                    _this.orderNavNum = res.type
                    _this.initdata(res.count)
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
                });
            });
        },
        tab(num) {  
            this.tdlast = num
            this.orderList = [];        // tab 切换，先进行一次清空数据
            this.initList(1)
        },
       godetail(id) {  // 查看详情
            var _this = this;
            _this.check = '';
           layui.use('layer', function(){
            var layer = layui.layer;
            _this.$http.post('/shv2/server/asking_look', {id:id}, function (res) {
                if (res.code == 1) {
                    _this.check = res.data
                    var type = res.data.busitype;
                    _this.busitype = type == 3 ? '图文问诊' : type == 4 ? '语音问诊' : type == 12 ? '视频问诊' : type == 11 ? '院后指导': type == 2 ? '私人医生': '';
                    var statu = res.data.busistatus;
                    _this.busistatus = statu == 1? '未开始': statu == 2? '已开始': '已结束';
                }
            }, function (err) { console.log(err)})




                layer.open({    // 弹框
                    type: 1,
                    title: "信息",
                    btn:['返回'],
                    shade: 0.4,
                    anim: 0,
                    area: ["1000px", "700px"],
                    content: $("#wrap"), //iframe的弹框
                    end: function () {
                        $("#wrap").hide()
                     }
                });
                
            });  
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
                .select_tai {
                    width: 100px;
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

    // 弹框
    .box {
        width: 100%;
        height: auto;
        background: #F1F2F9;
        display: none;
        .title {
            padding: 20px;
            border-bottom: 1px solid #eee;
            background: #fff;
        }
        .box_head {
            background-color: #fff;
            padding: 20px;
            font-size: 16px;
        }
        .box_user {
            width: 100%;
            -webkit-display:flex;
            display: flex;
            > div {
                width: 300px;
                margin: 10px;
            }
        }
    }
    

}
</style>
