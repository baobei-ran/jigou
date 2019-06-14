<template>
    <div id="drugParabiose" class="bg_f">
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab Pd-T24">
                <ul class="layui-tab-title">
                    <li class="layui-this" @click="tab(0)">全部关联（{{headernum.count}}）</li>
                    <li @click="tab(1)">收到的关联（{{headernum.count1}}）</li>
                    <li @click="tab(2)">添加的关联（{{headernum.count2}}）</li>
                    <li class="fr"><span class="adddoctor pointer" @click="go('/server/drugParabiose/addDrugParabiose')">增加关联</span></li>
                </ul>
                <div class="layui-tab-content">
                    <div class="screen_type Mg-T14 ">
                        <div class="layui-form-item layui-row">
                            <div class="fl">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">关联机构</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="" v-model="list.name" autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="fl selecttime">
                                <label class="layui-form-label">关联时间</label>
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
                            <div class="fl Mg-R20">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">业务状态</label>
                                    <select name="city" v-model="list.state" class="select_class">
                                        <option value="0">全部</option>
                                        <option value="1">单项关联</option>
                                        <option value="2">双向关联</option>
                                        <option value="3">合作开启中</option>
                                        <option value="4">已合作</option>
                                    </select>
                                </div>
                            </div>
                            <div class="fl">
                                <div class="layui-input-inline ">
                                    <span class="Ft-S14 selectbtn ac pointer" @click="search">查询</span>
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
                        <tbody v-show="tableList.length">
                            <tr v-for="(val,index) in tableList">
                                <td>{{index+1}}</td>
                                <td><i class="icon_star" v-show="val.down_hid==hid"></i>{{val.dname}}</td>
                                <td><i class="icon_star" v-show="val.up_hid==hid"></i>{{val.uname}}</td>
                                <td v-text="val.addtime">2018-09-04 01:53</td>
                                <td v-text="val.status">单向关联</td>
                                <td>
                                    <span class="Color_blue pointer Mg-R36" @click="godetail(val.up_hid,val.down_hid,val.id,val.show)">查看</span>
                                    <span class="Color_blue pointer" v-show="val.state==4" @click="go('/server/drugParabiose/record')">合作记录</span>
                                    <span class="Color_blue pointer" v-show="val.state==3&&htype!=8" @click="godetail(val.up_hid,val.down_hid,val.id,val.show)">开启合作中</span>
                                    <span class="Color_blue pointer" v-show="val.state==2&&htype!=8" @click="godetail(val.up_hid,val.down_hid,val.id,val.show)">提成设置</span>
                                    <span class="Color_default" v-show="val.state==3&&htype==8">开启合作</span>
                                    <span class="Color_default" v-show="!(val.state==3&&htype==8)&&val.state!=4&&!(val.state==3&&htype!=8)&&!(val.state==2&&htype!=8)&&!(val.state==1&&val.up_hid==hid)">开启合作</span>
                                    <span class="Color_blue pointer" v-show="val.state==1&&val.up_hid==hid" @click="godetail(val.up_hid,val.down_hid,val.id,val.show)">开启双向关联</span>
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
    name: 'drugParabiose',
    data() {
        return {
            list: {
                type: 0,
                name: '',
                start_time: '',
                end_time: '',
                state: 0,
                type_data: '',
                page: 1,
                limit: 10
            },
            tableList: [],
            headernum: '',
            hid: this.localstorage.get('logindata').hid,
            htype:''
        }
    },
    mounted() {
        this.tab(0);
    },
    methods: {
        tab(num) {
            this.tdlast = num;
            this.initdata(num, 1)
        },
        initdata(type, num) {
            var _this = this;
            layui.use(["laypage", "layer", "laydate", "element"], function () {
                var element = layui.element;
                var laypage = layui.laypage;
                var laydate = layui.laydate;
                var date = new Date();
                var yyyy = date.getFullYear() + '-';
                var MM = date.getMonth() + 1 + '-';
                var DD = date.getDate()
                var newdate = yyyy + MM + DD;
                laydate.render({
                    elem: "#date",
                });
                laydate.render({
                    elem: "#date1",
                });
                var oDate1 = new Date($('#date').val());
                var oDate2 = new Date($('#date1').val());
                if (oDate1.getTime() > oDate2.getTime()) {
                    layer.msg('开始时间不能大于结束时间');
                    return
                }
                _this.list.page = num;
                _this.list.type = type;
                _this.list.start_time = $('#date').val();
                _this.list.end_time = $('#date1').val();
                _this.$http.post('/shv2/medicine/relevance_list', _this.list, function (res) {//
                    if (res.code == 1) {
                        _this.headernum = res;
                        _this.tableList = res.data;
                        _this.htype=res.structureType;
                        if (num == 1) {
                            _this.page(res.count)
                        }
                    } else {
                        _this.tableList = false;
                        _this.page(0)
                    }
                }, function (err) { console.log(err) });

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
                            _this.list.page = obj.curr;
                            _this.initdata(_this.tdlast, obj.curr)
                        }
                    }
                });
            });
        },
        search() {
            this.initdata(this.tdlast, 1) 
        },
        godetail(upid, downid,id,show,type) {
            this.go('/server/drugParabiose/drugParabiosemsg?up_hid=' + upid + '&down_hid=' + downid + '&id=' + id+ '&show=' + show)
        }
    }
}
</script>

<style scoped lang="less">
#drugParabiose {
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
