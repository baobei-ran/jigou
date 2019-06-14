<template>
    <div id="orderList" class="bg_f" style="height:100%">
        <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">订单列表</p>
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab Pd-T24">
                <ul class="layui-tab-title">
                    <li class="layui-this" @click="tab(0)">全部</li>
                    <li @click="tab(1)">未接单</li>
                    <li @click="tab(2)">等待中</li>
                    <li @click="tab(3)">已开具</li>
                    <li @click="tab(4)">已拒绝</li>
                </ul>
                <div class="layui-tab-content">
                    <div class="screen_type Pd-B24 Mg-T14 Mg-B24  dis_f">
                        <div class="layui-form-item selecttime dis_f">
                            <div class="layui-inline">
                                <label class="layui-form-label">处方申请时间</label>
                                <div class="layui-input-inline" style="width:180px">
                                    <input type="text" name="price_min" placeholder="" v-model="list.ktime" id="date" autocomplete="off" class="layui-input date_icon">
                                </div>
                                <div class="layui-form-mid">-</div>
                                <div class="layui-input-inline" style="width:180px">
                                    <input type="text" name="price_max" placeholder="" v-model="list.jtime" id="date1" autocomplete="off" class="layui-input date_icon">
                                </div>
                            </div>
                            <div class="layui-inline lay_width">
                                <label class="layui-form-label">处方单编号</label>
                                <div class="layui-input-inline">
                                    <input type="text" name="" v-model="list.order_code" autocomplete="off" class="layui-input">
                                </div>
                            </div>
                            <p class=" Pd-L50">
                                <span class="Ft-S14 selectbtn ac pointer" @click="search">筛选订单</span>
                                <span class="Color_blue pointer Ft-S14 Mg-L24" @click='empty'>清空筛选条件</span>
                            </p>

                        </div>
                       
                    </div>
                    <table class="layui-table" lay-skin="">
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td class="firstheadtd">序号</td>
                                <td>处方订单号</td>
                                <td>处方单申请时间</td>
                                <td>处方单状态</td>
                                <td>发送医生</td>
                                <td>处方单编号</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody v-if='tableList.length'>
                            <tr class="table_con Color_black ac" v-for='(val,i) in tableList' :key='i'>
                                <td>{{ i+1 }}</td>
                                <td>{{ val.number }}</td>
                                <td>{{ val.creatime | moment }}</td>
                                <td>
                                    <span v-if='val.status == 1'>未接单</span>
                                    <span v-if='val.status == 2'>等待中</span>
                                    <span v-if='val.status == 3'>已开具</span>
                                    <span v-if='val.status == 4'>已拒绝</span>
                                </td>
                                <td>
                                    <div class="doctor dis_f dis_js">
                                        <ul>
                                            <li v-for='(user,index) in val.name' :key='index'>{{ user }}</li>
                                        </ul>
                                        <ul>
                                            <li v-for='(state) in val.state' >
                                                <span v-if='state == 1'>未接单</span>
                                                <span v-if='state == 2'>已接单</span>
                                                <span v-if='state == 3'>已拒绝</span>
                                                <span v-if='state == 4'>已超时</span>
                                                <span v-if='state == 5'>已开具</span>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                                <td>
                                    <span v-text='val.order_code != null ? val.order_code : "---" '></span>
                                </td>
                                <td>
                                    <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="godetail(val.id)">查看详情</p>
                                    <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="del(val.id)">删除</p>
                                    <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" v-if='val.status == 4' @click="delcode(val.id)">再次提交</p>
                                    <p class="Ft-S14 al" style="width:80px;margin:0 auto" v-else>再次提交</p>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="table_con Color_black ac" >
                                <td colspan='7'>暂无数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="page" v-show='tableList.length' class="ac Mg-T30"></div>
                </div>
            </div>
        </div>

       
        <div id="sendgoods" class="hide delcode">
            <ul class="Pd-T14 Pd-B14 kuang">
                <li class="title">
                    <label>请选择医生</label>
                </li>
                <li class="dis_f flex_w dis_js">
                    <div>
                        <el-checkbox v-model="checkAll" @change="handleCheckAllChange" >全选</el-checkbox>
                    </div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="(city,i) in doctorList" :label="city" :key="i">{{city.true_name}}</el-checkbox>
                    </el-checkbox-group>
                </li>
            </ul>
            <p class="clear">
                <span class="fl"><button class="cancel pointer" @click='cancel'>取消</button></span>
                <span class="fr"><button class="send pointer" @click='outdoctor'>确认提交</button></span>
            </p>
        </div>

    </div>
</template>
<script>
export default {
    name: 'orderList',
    data() {
        return {
            doctorList: [],             // 医生列表
            checkAll: false,            // 全选按钮操作
            checkedCities: [],          // 选择医生的数据liebaio
            doctorId: '',               // 再次提价发起，获取医生id
            list: {
                status: 0,
                order_code: '',
                ktime: '',
                jtime: '',
                page: 1,
                limit: 10
            },
            tableList: [],
            status: 0           // tab 列表
        }
    },
    mounted() {
        this.tab(0)
        var self = this;
        self.$http.post('/shv2/Recipe/recipe_seldoc', {}, function (res) {
            // console.log(res)
            if (res.code == 1) {
                self.doctorList = res.data
            }
        }, function (err) { console.log(err)})
    },
    methods: {
        tab(type) {
            this.status = type;
            this.initdata(type, 1)
        },
        initdata(type, num) {   // 数据
            var _this = this;
            layui.use(["laypage", "layer", "laydate", "element"], function () {
                var element = layui.element;
                var laydate = layui.laydate;
                laydate.render({
                    elem: "#date",
                });
                laydate.render({
                    elem: "#date1",
                });
                var oDate1 = new Date($('#date').val());
                var oDate2 = new Date($('#date1').val());
                if (oDate1.getTime() > oDate2.getTime()) {
                    layer.msg('开始时间不能大于结束时间', { icon: 5});
                    return
                }
                _this.list.page = num;
                _this.list.status = type;
                _this.list.ktime = $('#date').val();
                _this.list.jtime = $('#date1').val();
                _this.$http.post('/shv2/recipe/recipe_index', _this.list, function (res) {//
                    console.log(res)
                    if (res.code == 1) {
                        _this.tableList = res.data;
                        if (num == 1) {
                            //分页
                            _this.pageFun(res.count)
                        }
                    } else {
                        _this.tableList = [];
                        _this.pageFun(0)
                    }
                }, function (err) { console.log(err) });

            });
        },
        pageFun(total) {    // 分页
            var _this = this;
            layui.use(["laypage", "layer", "element"], function () {
                var element = layui.element;
                var laypage = layui.laypage;
                laypage.render({
                    elem: "page", //注意，这里的 test1 是 ID，不用加 # 号
                    count: total, //数据总数，从服务端得到
                    limit: _this.list.limit, //每页条数
                    layout: ["prev", "page", "next", "skip"],
                    groups: 4,
                    jump: function (obj, first) {
                        if (!first) {
                            _this.list.page = obj.curr;
                            _this.initdata(_this.list.status, obj.curr)
                        }
                    }
                });
            });
        },
        search() {  // 搜索
          var _this = this;
          layui.use('layer', function(){
            var layer = layui.layer;
            if (!$('#date').val() && !$('#date1').val() && !_this.list.order_code) {
                layer.msg('请输入内容', { icon: 5});
                return false;
            }
            _this.initdata(_this.list.status, 1)
            
          });
           
        },
        godetail(val) {    // 查看详情
            this.go('/server/YaoprescriptionList/prescriptionCheck?id='+ val)
        },
        delcode(id) { // 再次提交弹框
            this.doctorId = id
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 1,
                    title: "",
                    content: $(".delcode"),
                    area: ["500px", "300px"],
                    cancel: function () { }
                });
                
            });
        },

        outdoctor () {  // 再次提交确认
            var _this = this;
            layui.use('layer', function(){
                var layer = layui.layer;
                if(_this.checkedCities.length <= 0) {
                    layer.msg('请选择医生',{icon: 2, time:1500});
                    return 
                }
                var formdata = new FormData();
                _this.checkedCities.map(val => {
                    formdata.append('did[]', val.did)
                })
                    formdata.append('id', _this.doctorId);
                    
                _this.$http.upload('/shv2/recipe/recipe_again', formdata, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.closeAll('page');
                        layer.msg('提交成功',{icon: 1, time:1500});
                        _this.initdata(_this.status, _this.list.page)
                    }
                }, function (err) { console.log(err)})
            }); 
        },
       
        del(id) {  // 删除
          var self = this;
          layui.use('layer', function(){
            var layer = layui.layer;
            layer.confirm('删除后不可恢复，是否确定删除？', {
              btn: ['确定', '取消']
            }, function(index, layero){
              layer.closeAll('dialog');
              self.$http.post('/shv2/recipe/recipe_del',{ id:id}, function (res) {
                  console.log(res)
                  if (res.code == 1) {
                      layer.msg('删除成功', { icon:1});
                      self.tab(self.status)
                  } else {
                      layer.msg('删除失败', { icon: 2});
                  }
              }, function (err) { console.log(err)})
            }, function(index){
                // 取消的回调
            });
           
          });
            
        },  
        cancel () {     // 取消关闭弹框
            layui.use('layer', function(){
            var layer = layui.layer;
            
                layer.closeAll();
            }); 
        },
        empty() {   // 清空
           this.list = {
                order_code: '',
                ktime: '',
                jtime: '',
            }
            $('#date').val('');
            $('#date1').val('');
            this.initdata(this.status, 1)
        },
         handleCheckAllChange(val) {     // 全选
            if(val) {
                this.checkedCities = this.doctorList 
            } else {
                this.checkedCities = [] 
            }
        },
        handleCheckedCitiesChange(value) {  // 单选
            if (value.length > 0) {
                var checkedCount = value.length;
                if (checkedCount == this.doctorList.length) {
                    this.checkAll = true;
                } else {
                    this.checkAll = false;
                }
            }
        }
    }
}
</script>

<style scoped lang="less">
#orderList {
    height: 100%;
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
    }
    input:hover,
    input:focus {
        border: 1px solid #c2c3c3;
    }
    .screen_type {
        border-bottom: 1px solid #e6e6e6;
        .layui-form-item {
            .lay_width {
                margin: 0;
                .layui-form-label {
                    width: 80px;
                    padding: 7px 10px 7px 0px;
                }
                .layui-input-inline {
                    
                    input {
                        height: 34px;
                    }
                }
            }
        }
        .selecttime {
            .layui-inline {
              .layui-form-mid {
                  margin: 0 3px;
              }
                .layui-form-label {
                  width: 100px;
                    padding: 7px 10px 7px 0px;
                }
                .layui-input-inline {
                  margin: 0;
                    input {
                        height: 34px;
                    }
                    .date_icon {
                        background: url(../../common/image/pages/account/icon_sj.png)
                            no-repeat 150px;
                    }
                }
            }
        }
        .selectbtn {
            display: inline-block;
            color: #fff;
            background: #3196ff;
            width: 100px;
            height: 34px;
            line-height: 34px;
            border: none;
            border-radius: 4px;
        }
    }
    .tab_content {
        height: 100%;
        background-color: #fff;
        
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
                .table_headtr {
                    height: 50px;
                    background: #dae9ff;
                    td {
                        font-size: 16px;
                    }
                    .firstheadtd {
                        position: relative;
                    }
                }
                tbody {
                  border:1px solid #ddd;
                    .table_con {
                        background: #fff;

                        td {
                            padding: 15px 0px;
                            font-size: 14px;
                            border:0;
                            >p {
                            line-height: 30px;
                          }
                          .doctor {
                              ul {
                                  li {
                                      line-height: 30px;
                                  }
                              }
                          }
                        }
                        td:last-child {
                            p {
                              text-align: center;
                            }
                        }
                    }
                    tr:nth-child(even) {
                        background: #E5F0FF;
                    }
                }
            }
        }
    }
}
#sendgoods {
    padding-left: 53px;
    padding-right: 53px;
    .kuang {
        width: 100%;
        padding: 30px 0;
        li {
            text-align: center;
            font-size: 16px;
        }
        .title {
             padding-bottom: 20px;
             font-size: 18px;
        }
    }
    
    button {
        width: 120px;
        height: 36px;
        border-radius: 4px;
        border: none;
        font-size: 15px;
        margin-top: 46px;
    }
    .cancel {
        border: 1px solid #128dff;
        color: #128dff;
        background: #fff;
    }
    .send {
        color: #fff;
        background: #128dff;
    }
}
</style>
