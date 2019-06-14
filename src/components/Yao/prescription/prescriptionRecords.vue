<template>
    <div id="orderList" style="height:100%">
        <div class="bg_f">
            <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">医生数据</p>
            <ul class="dis_f Pd-T24 Pd-B24 dis_js">
                <li>
                    <span>医生姓名：</span>
                    <span>{{ doctormsg.true_name }}</span>
                </li>
                <li>
                    <span>医生职称：</span>
                    <span>{{ doctormsg.gname }}</span>
                </li>
                <li>
                    <span>医生执业医院：</span>
                    <span>{{ doctormsg.hospital_name }}</span>
                </li>
                <li>
                    <span>服务时间段：</span>
                    <span>{{ doctormsg.busktime }}-{{ doctormsg.busjtime }}</span>
                </li>
            </ul>
        </div>
        <div class="tab_content Mg-T24 bg_f">
            <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">处方单记录</p>
            <div class="layui-tab Pd-T24 Pd-L24 Pd-R24">
                <div class="layui-tab-content">
                    <ul class="screen_type Pd-B24 Mg-T14 Mg-B24 dis_f">
                        <li class="layui-inline dis_f flex-vc">
                            <label>处方编号</label>
                            <div class="layui-input-inline">
                                <input type="text" name="" v-model="number" autocomplete="off" class="layui-input">
                            </div>
                        </li>
                        <li class="lay_width dis_f flex-vc">
                            <label >生成时间</label>
                            <div class="layui-input-inline" >
                                <input type="text" name="price_min" placeholder="请选择开始时间"  id="date" autocomplete="off" class="layui-input date_icon">
                            </div>
                            <span style='padding:0 3px;'>-</span>
                            <div class="layui-input-inline" >
                                <input type="text" name="price_max" placeholder="请选择结束时间" id="date1" autocomplete="off" class="layui-input date_icon">
                            </div>
                        </li>
                        
                        <li class="layui-inline Pd-L10">
                            <label>药师审核状态</label>
                            <div class="layui-input-inline">
                                <!-- <el-select v-model="flag" size='small' placeholder="请选择">
                                    <el-option
                                    v-for="item in auditor"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select> -->

                                <select class="layui-input" name="city" v-model="flag" style='width: 150px;' autocomplete="off" id="userSelect" lay-filter="userClass">
                                    <option value="">全部</option>
                                    <option v-for='val in auditor' :value="val.id">{{ val.name }}</option>
                                </select>
                            </div>
                        </li>

                        <li class="Pd-L30">
                            <span class="Ft-S14 selectbtn ac pointer" @click="search">筛选订单</span>
                            <span class="Color_blue pointer Ft-S14 Mg-L24" @click='empty'>清空筛选条件</span>
                        </li>
                    </ul>


                    <table class="layui-table" lay-skin="">
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td class="firstheadtd">序号</td>
                                <td>处方编号</td>
                                <td>处方生成时间</td>
                                <td>医师接单状态</td>
                                <td>药师审核状态</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody v-if='tableList.length'>
                            <tr class="table_con Color_black ac" v-for="(val,index) in tableList" :key='index'>
                                <td>{{ index+1 }}</td>
                                <td>{{ val.number }}</td>
                                <td>{{ val.start_time }}</td>
                                <td>{{ val.status }}</td>
                                <td>
                                    <span v-show='val.flag == 0'>未审核</span>
                                    <span v-show='val.flag == 1'>通过</span>
                                    <span v-show='val.flag == 2'>不通过</span>
                                </td>
                                <td>
                                    <p class="pointer Ft-S14 Color_blue" v-if='false' @click="godetail(val.id)">查看详情</p>
                                    <p class="pointer Ft-S14" >查看详情</p>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="table_con Color_black ac" >
                                <td colspan='6'>暂无数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- <div id="page" v-show='tableList.length' class="ac Mg-T30"></div> -->
                    <div class="returns Mg-T24">
                        <button class="layui-btn layui-btn-normal" @click='go("/server/Yaodoctorprescription/prescriptionList")'>返回</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div id="sendgoods" class="hide">
            <table width="100%">
                <tr>
                    <td class="Color_black Ft-S16" width="90px"><span class="Color_red">*</span>配送公司</td>
                    <td><input type="text" v-model="company"></td>
                </tr>
                <tr>
                    <td class="Color_black Ft-S16"><span class="Color_red">*</span>物流单号</td>
                    <td><input type="text" v-model="logistics_number"></td>
                </tr>
            </table>
            <p class="clear">
                <span class="fl"><button class="cancel pointer" @click='cancel'>取消</button></span>
                <span class="fr"><button class="send pointer" @click="sendup">发货</button></span>
            </p>
        </div> -->
        
    </div>
</template>
<script>
export default {
    name: 'orderList',
    data() {
        return {
            
            number: '',                 // 处方编号
            flag: '',                   // 药师审核状态
            page: 1,
            limit: 10,
            tableList: [],              // 数据列表
            auditor: [                  // 药师审核状态下拉框
                {id: 0, name: '未审核'},
                {id: 1, name: '通过'},
                {id: 2, name: '不通过'}
            ],
            doctormsg: ''
        }
    },
    mounted() {
        this.doctormsg = this.$route.query
        this.initdata(1) 
    },
    methods: {
        initdata(num) {   // 数据
            var _this = this;
            layui.use(["laypage", "layer", "laydate", "element", "form"], function () {
                var element = layui.element;
                var laydate = layui.laydate;
                var form = layui.form;
                laydate.render({
                    elem: "#date",
                });
                laydate.render({
                    elem: "#date1",
                });
                form.on('select(userClass)', function(data){
                    console.log(data)
                });
                
                var oDate1 = new Date($('#date').val());
                var oDate2 = new Date($('#date1').val());
                if (oDate1.getTime() > oDate2.getTime()) {
                    layer.msg('开始时间不能大于结束时间', { icon: 2});
                    return
                }
                _this.page = num;
                var start = $('#date').val();
                var end_time = $('#date1').val();
                var id = _this.$route.query.id
                var obj = { id: id, number: _this.number, ktime: start, jtime: end_time, flag: _this.flag }
                _this.$http.post('/shv2/Recipe/recipe_record', obj, function (res) {//
                    console.log(res)
                    if (res.code == 1) {
                       _this.tableList = res.data
                    } else {
                        _this.tableList = []
                    }
                }, function (err) { console.log(err) });
                form.render();
                form.render('select'); //刷新select选择框渲染
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
                    limit: 10, //每页条数
                    layout: ["prev", "page", "next", "skip"],
                    groups: 4,
                    jump: function (obj, first) {
                        if (!first) {
                            _this.list.page = obj.curr;
                            _this.initdata(_this.tdlast, obj.curr)
                        }
                    }
                });
            });
        },
        search() {  // 搜索
            
            this.initdata(1)
        },
        godetail(id) {    // 查看详情
            console.log(id)
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 1,
                    title: "订单发货",
                    content: $("#sendgoods"),
                    area: ["560px", "340px"],
                    cancel: function () { }
                });
                $(".layui-layer-title").css({
                    height: "50px",
                    background: "#ECF2FB",
                    "line-height": "50px",
                    fontSize: '18px'
                });
                $(".layui-layer-setwin").css("top", "19px");
            });
        },
        sendup () {

        }, 
        cancel () {     // 取消关闭弹框
            layui.use('layer', function(){
            var layer = layui.layer;
            
                layer.closeAll();
            }); 
        },
        empty() {   // 清空
            this.number = '';
            this.flag = '';
            $('#date').val('');
            $('#date1').val('');
            this.initdata(1) 
        }
    }
}
</script>

<style scoped lang="less">
#orderList {
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
    }
    input:hover,
    input:focus {
        border: 1px solid #c2c3c3;
    }
    .screen_type {
        border-bottom: 1px solid #e6e6e6;
            .layui-inline {
                overflow: hidden;
                label {
                  padding-right: 10px;
                }
                .layui-input-inline {
                    margin-right: 10px;
                    .el-input__inner {
                        width: 150px;
                    }
                    input {
                        height: 34px;
                    }
                }
            }
            .lay_width {
                label {
                  padding-right: 10px;
                }
                .layui-input-inline {
                    input {
                        height: 34px;
                    }
                }
            .date_icon {
                background: url(../../../common/image/pages/account/icon_sj.png)
                    no-repeat 138px;
            }
        }
        .selecttime {
            .layui-inline {
                label {
                    padding-right: 10px;
                }
                .layui-input-inline {
                    input {
                        height: 34px;
                    }
                    .date_icon {
                        background: url(../../../common/image/pages/account/icon_sj.png)
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
            .returns {
                width:100%;
                text-align: center;
                .layui-btn {
                    padding: 0 28px;
                }
            }
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
                    .table_con {
                        background: #fff;

                        td {
                            padding: 20px 0px;
                            font-size: 14px;
                            .shopdetail {
                                padding: 52px 0px;
                                padding-right: 60px;
                                span:last-child {
                                    position: absolute;
                                    right: 20px;
                                }
                            }
                        }
                       
                    }
                }
            }
        }
    }
}
#sendgoods {
    padding-left: 53px;
    padding-right: 53px;

    table {
        margin-top: 27px;
        tr {
            height: 64px;
            td {
                input {
                    width: 100%;
                    height: 40px;
                    padding-left: 10px;
                    border-radius: 3px;
                }
                input,
                input:hover,
                input:focus {
                    border: 1px solid #c2c3c3;
                }
                .tan_icon {
                    background: url(../../../common/image/icon/icon_hxcw.png)
                        no-repeat;
                    width: 13px;
                    height: 13px;
                    display: inline-block;
                    position: relative;
                    z-index: 66;
                    top: 2px;
                    margin-right: 4px;
                }
            }
        }
    }

    button {
        width: 160px;
        height: 46px;
        border-radius: 4px;
        border: none;
        font-size: 18px;
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
