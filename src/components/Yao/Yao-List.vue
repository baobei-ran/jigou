<template>
    <div id="orderList" class="bg_f" style="height:100%">
        <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">订单列表</p>
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab Pd-T24">
                <ul class="layui-tab-title">
                    <li class="layui-this" @click="tab(0)">全部商品（{{headernum.count}}）</li>
                    <li @click="tab(1)">待付款（{{headernum.count1}}）</li>
                    <li @click="tab(7)">待发货（{{headernum.count2}}）</li>
                    <li @click="tab(4)">待收货（{{headernum.count3}}）</li>
                    <li @click="tab(8)">待核销（{{headernum.count4}}）</li>
                    <li @click="tab(5)">已完成（{{headernum.count5}}）</li>
                    <li @click="tab(6)">已关闭（{{headernum.count6}}）</li>
                </ul>
                <div class="layui-tab-content">
                    <div class="screen_type Pd-B24 Mg-T14 Mg-B24">
                        <div class="layui-form-item layui-row">
                            <div class="layui-col-md4">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">订单编号</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="" v-model="list.number" autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-inline layui-col-md4">
                                <label class="layui-form-label">收货人</label>
                                <div class="layui-input-inline" style="width:65%">
                                    <input type="text" name="" v-model="list.name" autocomplete="off" class="layui-input">
                                </div>
                            </div>
                        </div>
                        <div class="layui-form-item selecttime dis_f">
                            <div class="layui-inline">
                                <label class="layui-form-label">订单时间</label>
                                <div class="layui-input-inline" style="width:180px">
                                    <input type="text" name="price_min" placeholder="" v-model="list.start_time" id="date" autocomplete="off" class="layui-input date_icon">
                                </div>
                                <div class="layui-form-mid">-</div>
                                <div class="layui-input-inline" style="width:180px">
                                    <input type="text" name="price_max" placeholder="" v-model="list.end_time" id="date1" autocomplete="off" class="layui-input date_icon">
                                </div>
                            </div>
                            <p class="Mg-L30 Pd-L50">
                                <span class="Ft-S14 selectbtn ac pointer" @click="search">筛选订单</span>
                                <span class="Color_blue pointer Ft-S14 Mg-L24" @click='empty'>清空筛选条件</span>
                            </p>

                        </div>
                       
                    </div>
                    <table class="layui-table" lay-skin="">
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td class="firstheadtd">序号</td>
                                <td>订单编号</td>
                                <td>金额信息</td>
                                <td>收货信息</td>
                                <td>下单时间</td>
                                <td>订单状态</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody v-if='tableList.length'>
                            <tr class="table_con Color_black ac" v-for="(val,index) in tableList">
                                <td v-text="index+1"></td>
                                <td v-text="val.number"></td>
                                <td>
                                    <p>总金额：{{val.money}}</p>
                                    <p>支付方式：{{val.type}}</p>
                                </td>
                                <td>
                                    <p>收货人：{{val.rname}}</p>
                                    <p>联系电话：{{val.rphone}}</p>
                                    <p>地址：{{val.raddress}}</p>
                                </td>
                                <td v-text="val.addtime"></td>
                                <td>
                                    <p v-text="val.pay"></p>
                                    <p v-text="val.express"></p>
                                    <p v-text="val.order"></p>
                                </td>
                                <td>
                                    <div>
                                        <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="godetail(val.number,val.pay,val.express,val.order)"><i class="seedetail_icon Mg-R5"></i>查看详情</p>
                                        <p class="pointer Ft-S14 Mg-T14 Color_blue al" style="width:80px;margin:0 auto" @click="sendgoods(val.number)" v-show="(val.status==2||val.status==3)&&val.distribution==1"><i class="sendhw_icon Mg-R5"></i>发货</p>
                                    </div>
                                    <p v-show="tdlast==8" class="pointer Ft-S14 Color_blue" style="width:80px;margin:0 auto" @click="godetail(val.number,val.pay,val.express,val.order)"><i class="seedetail_icon Mg-R5"></i>查看详情</p>
                                    <p v-show="tdlast==8" class="pointer Ft-S14 Color_blue Mg-T14 al" style="width:80px;margin:0 auto" @click="delcode"><i class="del_icon Mg-R5"></i>核销</p>
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
        <div id="sendgoods" class="hide">
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
        </div>
        <div id="sendgoods" class="hide delcode">
            <table width="100%" class="Mg-T50">
                <tr>
                    <td class="Color_black Ft-S16" width="90px"><span class="Color_red">*</span>核销码</td>
                    <td>
                        <input type="text">
                        <p class="Color_red Ft-S12" style="position:absolute; z-index:100;margin-top:5px"><i class="tan_icon"></i>核销码不存在</p>
                    </td>
                </tr>
            </table>
            <p class="clear">
                <span class="fl"><button class="cancel pointer" @click='cancel'>取消</button></span>
                <span class="fr"><button class="send pointer">发货</button></span>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'orderList',
    data() {
        return {
            tdlast: 0,
            list: {
                status: 0,
                number: '',
                name: '',
                start_time: '',
                end_time: '',
                page: 1,
                limit: 10
            },
            tableList: '',
            headernum: '',
            company: '',
            logistics_number: '',
            number: ''
        }
    },
    mounted() {
        this.tab(0)
        
    },
    methods: {
        tab(type) {
            this.tdlast = type;
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
                    layer.msg('开始时间不能大于结束时间');
                    return
                }
                _this.list.page = num;
                _this.list.status = type;
                _this.list.start_time = $('#date').val();
                _this.list.end_time = $('#date1').val();
                _this.$http.post('/shv2/goodsorder/index', _this.list, function (res) {//
                    console.log(res)
                    if (res.code == 1) {
                        _this.headernum = res;
                        _this.tableList = res.data;
                        if (num == 1) {
                            switch (_this.tdlast) {//分页
                                case 0: _this.pageFun(res.count); break;
                                case 1: _this.pageFun(res.count1); break;
                                case 4: _this.pageFun(res.count3); break;
                                case 5: _this.pageFun(res.count5); break;
                                case 6: _this.pageFun(res.count6); break;
                                case 7: _this.pageFun(res.count2); break;
                                case 8: _this.pageFun(res.count4); break;
                            }
                        }
                    } else {
                        _this.tableList = false;
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
            this.initdata(this.tdlast, 1)
        },
        godetail(number,pay,express,order) {    // 查看详情
            this.go('/jgmall/List/listDetail?number='+number+'&pay='+pay+'&express='+express+'&order='+order)
        },
        delcode() { // 核销
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 1,
                    title: "自取核销",
                    content: $(".delcode"),
                    area: ["500px", "300px"],
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
        sendgoods(num) {    // 发货
            this.number = num;
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
        sendup() {  // 发货
            var _this=this;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                if (!_this.number) {
                    layer.msg('订单号为空')
                    return;
                }
                if (!_this.company) {
                    layer.msg('请填写物流公司')
                    return;
                }
                if (!_this.logistics_number) {
                    layer.msg('请填写物流单号')
                    return;
                }
                _this.$http.post('/shv2/goodsorder/order_delivery', { number: _this.number, company: _this.company, logistics_number: _this.logistics_number }, function (res) {
                    if(res.code==1){
                        layer.closeAll();
                        layer.msg(res.msg);
                    }
                }, function () {

                });
            })
        },  
        cancel () {     // 取消关闭弹框
            layui.use('layer', function(){
            var layer = layui.layer;
            
                layer.closeAll();
            }); 
        },
        empty() {   // 清空
            this.list.number = '';
            this.list.name = '';
            this.list.start_time = '';
            this.list.end_time = '';
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
        .layui-form-item {
            .lay_width {
                width: 100%;
                .layui-form-label {
                    width: 80px;
                    padding: 7px 10px 7px 0px;
                }
                .layui-input-inline {
                    width: 65%;
                    input {
                        height: 34px;
                    }
                }
            }
        }
        .selecttime {
            .layui-inline {
                .layui-form-label {
                    padding: 7px 10px 7px 0px;
                }
                .layui-input-inline {
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
                    .table_con {
                        background: #fff;

                        td {
                            padding: 30px 0px;
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
                        td:last-child {
                            i {
                                display: inline-block;
                                width: 14px;
                                height: 14px;
                                position: relative;
                                top: 3px;
                            }
                            .seedetail_icon {
                                background: url(../../common/image/icon/icon_ck.png)
                                    no-repeat;
                            }
                            .sendhw_icon {
                                background: url(../../common/image/icon/icon_fh.png)
                                    no-repeat;
                            }
                            .del_icon {
                                background: url(../../common/image/icon/icon_hx.png)
                                    no-repeat;
                                background-size: 100%;
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
                    background: url(../../common/image/icon/icon_hxcw.png)
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
