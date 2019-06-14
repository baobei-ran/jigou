<template>
    <div id="orderListDetail" style="height:100%">
        <div class="layui-row layui-col-space22 head_msg">
            <div class="layui-col-md8">
                <div class="bg_f">
                    <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24 Mg-B24">订单详情</p>
                    <div class="layui-row order_datail  Pd-L24 Pd-R24">
                        <div class="layui-col-md6 layui-col-sm6">
                            <table>
                                <tr>
                                    <td>订单号</td>
                                    <td v-text="detailList.list.number">201923332211222</td>
                                </tr>
                                <tr>
                                    <td>用户</td>
                                    <td v-text="detailList.list.uname">张三</td>
                                </tr>
                                <tr>
                                    <td>支付方式</td>
                                    <td v-text="detailList.list.type==1?'支付宝':detailList.list.type==2?'微信': detailList.list.type==3?'银行卡':detailList.list.type==4?'鲁医通':''">微信支付</td>
                                </tr>
                                <tr>
                                    <td>配送方式</td>
                                    <td v-text="detailList.list.distribution==1?'快递':detailList.list.distribution==2?'自提':''">快递</td>
                                </tr>
                                <tr>
                                    <td>配送公司</td>
                                    <td v-text="detailList.express.company">韵达</td>
                                </tr>
                                <tr>
                                    <td>发货单号</td>
                                    <td v-text="detailList.express.logistics_number">32111122221111</td>
                                </tr>

                            </table>
                        </div>
                        <div class="layui-col-md6 layui-col-sm6">
                            <table>
                                <tr>
                                    <td width="60px">收货人</td>
                                    <td v-text="detailList.list.rname">琳娜</td>
                                </tr>
                                <tr>
                                    <td>电话</td>
                                    <td v-text="detailList.list.rphone">122****4221</td>
                                </tr>
                                <tr>
                                    <td>收货地址</td>
                                    <td v-text="detailList.list.raddress">北京市丰台区三环新城6号院8号楼2单元192</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="layui-col-md4 head_right">
                <div class="bg_f">
                    <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24 Mg-B24">订单状态</p>
                    <div class="order_logistics">
                        <div class="Pd-L24 Pd-R24 Pd-B24 logistics" v-show="detailList.list.distribution==1 &&(detailList.list.status==4||detailList.list.status==5)">
                            <p class="Color_blue Ft-S18 Pd-B12">已发货</p>
                            <div class="order_logistics">
                                <ul class="layui-timeline">
                                    <li class="layui-timeline-item" v-for="ar in 8">
                                        <i class="layui-timeline-axis"></i>
                                        <div class="layui-timeline-content layui-text" style="position:relative;top:-18px">
                                            <p class="Color_black Ft-S14 Overflow1">山东济南天桥集散中心-已发往-山东济南转运中心</p>
                                            <time class="Color_gray6 Ft-S12">2018-12-15 20:00:08</time>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="Pd-B24 logistics1" v-show="detailList.list.distribution==1 &&(detailList.list.status==2||detailList.list.status==3)">
                            <p class="Color_blue Ft-S18 Pd-B24 Pd-L24">{{$route.query.pay}},{{$route.query.express}},{{$route.query.order}}</p>
                            <p class="ar">
                                <button class="btn1 pointer" @click="sendgoods">发货</button>
                                <button class="btn2 pointer" @click="exitaddress">修改收货地址</button>
                                <button class="btn3 pointer" @click="closeorder">关闭订单</button>
                            </p>
                        </div>
                        <div class="logistics2 Pd-B24 Pd-L24" v-show="detailList.list.distribution==2 &&(detailList.list.status==2||detailList.list.status==3)">
                            <p class="Color_blue Ft-S18 Pd-B24">到店自取</p>
                            <p class="Mg-B20 Ft-S14"><span class="Color_gray6">自取核销码：</span><span class="Color_black">SG18782788729</span></p>
                            <p class="Ft-S14" style="margin-bottom:86px"><span class="Color_gray6">自取时间段：</span><span class="Color_black">12-12 13:00—15:00</span></p>
                            <p class="ar">
                                <button class="btn3 pointer" @click="closeorder">关闭订单</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab_content">
            <div class="layui-tab Pd-T24">
                <div class="layui-tab-content Pd-T24 Pd-B24 Pd-L24 Pd-R24 bg_f">
                    <table class="layui-table" lay-skin="nob">
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td class="firstheadtd"><span>商品</span><span>数量</span></td>
                                <td>商品售价</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table_none">
                                <td colspan="7">
                                    <div class="bg_f" style="margin-left:-2px;margin-right:-1px;margin-top:-1px;width:101%;height:12px"></div>
                                </td>
                            </tr>
                            <tr class="table_msg">
                                <td colspan="7"><span class="Ft-S12 Color_gray6 Mg-R24">{{detailList.list.addtime|moment('YYYY-MM-DD hh:mm:ss')}}</span><span class="Ft-S12 Color_gray6">订单号：{{detailList.list.number}}</span></td>
                            </tr>
                            <tr class="table_con Color_black ac" v-for="val in detailList.data">
                                <td>
                                    <div class="shopdetail"><span v-text="val.name">OTC（非处方药）同仁堂药业益安宁丸112丸</span><span style="margin-right:10px;">X{{val.num}}</span></div>
                                </td>
                                <td v-text="val.money">790</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="ar">
                        <p class="Mg-B24 Color_gray6 Ft-S14"><span class="Mg-R30">商品总计：¥{{detailList.total}}</span>
                            <span class="Mg-R30">运费：¥{{detailList.freight}}</span>
                            <span class="Mg-R30">优惠：¥{{detailList.discounts}}</span>
                            <span>订单总额：¥{{detailList.pay_money}}</span></p>
                        <p><span class="Ft-S14">实付款：</span><span class="Ft-S14 Color_blue Fw700">¥</span><span class="Fw700 Ft-S24 Color_blue">{{detailList.pay_money}}</span></p>
                    </div>

                </div>
            </div>
        </div>
        <div class="orderlog bg_f Pd-L24 Pd-R24 Mg-T24">
            <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24 Mg-B24">订单日志</p>
            <table class="layui-table ac" lay-even lay-skin="nob">
                <thead>
                    <tr>
                        <th class="ac">时间</th>
                        <th class="ac">操作人</th>
                        <th class="ac">订单状态</th>
                        <th class="ac">备注</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="val in detailList.order_log">
                        <td>{{val.addtime|moment('YYYY-MM-DD hh:mm:ss')}}</td>
                        <td v-text="val.name">188****9979</td>
                        <td v-text="val.status==1?'待付款': val.status==2?'已付款':val.status==3?'未发货':val.status== 4?'已发货': val.status==5?'交易成功':val.status== 6?'交易关闭':''">已评价</td>
                        <td v-text="val.remarks">无</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="ac Mg-T24 goback" @click="go('/jgmall/List')"><button class="pointer">返回</button></p>
        <div id="sendgoods" class="hide">
            <table width="100%">
                <tr>
                    <td class="Color_black Ft-S16" width="90px"><span class="Color_red">*</span>配送公司</td>
                    <td><input type="text" v-model="commpany"></td>
                </tr>
                <tr>
                    <td class="Color_black Ft-S16"><span class="Color_red">*</span>物流单号</td>
                    <td><input type="text" v-model="logistics_number"></td>
                </tr>
            </table>
            <p class="clear">
                <span class="fl"><button class="cancel pointer">取消</button></span>
                <span class="fr"><button class="send pointer" @click="sendup">发货</button></span>
            </p>
        </div>
        <div id="exitaddress" class="hide">
            <table width="100%">
                <tr>
                    <td class="Color_black Ft-S16" width="90px"><span class="Color_red">*</span>收货人</td>
                    <td><input type="text" v-model="sname" </td> </tr> <tr>
                    <td class="Color_black Ft-S16"><span class="Color_red">*</span>电话</td>
                    <td><input type="text" v-model="sphone"></td>
                </tr>
                <tr>
                    <td class="Color_black Ft-S16">
                        <div><span class="Color_red">*</span>详细地址</div>
                    </td>
                    <td><textarea style="" v-model="saddress"></textarea></td>
                </tr>
            </table>
            <p class="clear">
                <span class="fl"><button class="cancel pointer">取消</button></span>
                <span class="fr"><button class="send pointer">提交</button></span>
            </p>
        </div>
        <div id="closeorder" class="hide Pd-L50 Pd-R50">
            <table width="100%">
                <tr>
                    <td class="Color_black Ft-S16">请填写关闭订单的原因</td>
                </tr>
                <tr>
                    <td>
                        <textarea name="" id=""></textarea>
                    </td>
                </tr>
            </table>
            <p class="clear">
                <span class="fl"><button class="send pointer">确定</button></span>
                <span class="fr"><button class="cancel pointer">取消</button></span>

            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'orderList',
    data() {
        return {
            detailList: {
                data: [{
                    number: "",
                    money: "",
                    num: 1,
                    name: ""
                }],
                total: "",
                freight: "",
                discounts: "",
                pay_money: "",
                list: {
                    number: "",
                    status: 6,
                    type: null,
                    distribution: 1,
                    addtime: 1546070514,
                    order_code: "",
                    remarks: "",
                    uname: null,
                    rname: null,
                    rphone: null,
                    raddress: null
                },
                express: {
                    company: null,
                    logistics_number: null
                },
                order_log: {
                    name: "",
                    status: 1,
                    addtime: 1546070514,
                    remarks: ""
                }
            },
            commpany: '',
            logistics_number: '',
            sname: '',
            sphone: '',
            saddress: ''
        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {
            var _this = this;
            _this.$http.post('/shv2/goodsorder/detail', { number: _this.$route.query.number }, function (res) {//
                if (res.code == 1) {
                    _this.detailList = res;
                }
            }, function (err) { console.log(err) });
        },
        exitaddress() {//修改收货人弹框
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 1,
                    title: "修改收货地址",
                    content: $("#exitaddress"),
                    area: ["580px", "500px"],
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
        exitadd() {//修改收货人地址
            var _this = this;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                if (!_this.sname) {
                    layer.msg('请填写收货人姓名')
                    return;
                }
                if (!_this.sphone) {
                    layer.msg('请填写收货人手机号')
                    return;
                }
                if (!_this.saddress) {
                    layer.msg('请填写地址')
                    return;
                }
                _this.$http.post('/shv2/goodsorder/change_address', { number: _this.$route.query.number, order_code: _this.list.order_code, name: _this.name, address: _this.saddress, phone: _this.phone }, function (res) {//
                    if (res.code == 1) {

                    }
                }, function (err) { console.log(err) });
            });
        },
        closeorder() {//关闭订单
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 1,
                    title: "关闭订单",
                    content: $("#closeorder"),
                    area: ["500px", "460px"],
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
        sendgoods() {//订单发货弹框
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
        sendup() {//订单发货
            var _this = this;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                if (!_this.company) {
                    layer.msg('请填写物流公司')
                    return;
                }
                if (!_this.logistics_number) {
                    layer.msg('请填写物流单号')
                    return;
                }
                _this.$http.post('/shv2/goodsorder/order_delivery', { number: _this.$route.query.number, company: _this.company, logistics_number: _this.logistics_number }, function (res) {
                    if (res.code == 1) {
                        layer.closeAll();
                        layer.msg(res.msg);
                    }
                }, function () {

                });
            })
        }
    }
}
</script>

<style scoped lang="less">
#orderListDetail {
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
    }
    .head_msg {
        .head_right {
            ::-webkit-scrollbar {
                width: 4px;
                // height: 50px;
                background-color: #fff;
            }

            ::-webkit-scrollbar-track {
                border-radius: 4px;
                background-color: #fff;
            }

            ::-webkit-scrollbar-thumb {
                border-radius: 4px;
                -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                background-color: #e6e6e6;
            }
            .order_logistics {
                height: 175px;
                overflow-y: auto;
                padding-top: 14px;
                .layui-timeline-axis {
                    width: 10px;
                    height: 10px;
                    background: #e6e6e6;
                    color: #e6e6e6;
                    left: 0px;
                    top: 0px;
                }
            }
            .logistics1 {
                p:first-child {
                    margin-bottom: 144px;
                }
                p {
                    button {
                        font-size: 14px;
                        margin-right: 12px;
                        border-radius: 4px;
                        border: none;
                    }
                    .btn1 {
                        background: #3196ff;
                        color: #fff;
                        width: 60px;
                        height: 30px;
                    }
                    .btn2 {
                        background: #3196ff;
                        color: #fff;
                        width: 120px;
                        height: 30px;
                    }
                    .btn3 {
                        background: #fff;
                        color: #3196ff;
                        border: 1px solid #3196ff;
                        width: 80px;
                        height: 30px;
                    }
                }
            }
            .logistics2 {
                p:first-child {
                }
                .btn3 {
                    font-size: 14px;
                    margin-right: 12px;
                    border-radius: 4px;
                    border: none;
                    background: #fff;
                    color: #3196ff;
                    border: 1px solid #3196ff;
                    width: 80px;
                    height: 30px;
                }
            }
            @media (max-width: 1350px) {
                .logistics1 {
                    p:first-child {
                        margin-bottom: 44px;
                    }
                    button {
                        width: 80% !important;
                        position: relative;
                        left: -10% !important;
                        margin-right: 0px !important;
                        margin-bottom: 20px;
                    }
                    button:last-child {
                        margin-bottom: 0px;
                    }
                }
            }
        }
    }
    .order_datail {
        padding-bottom: 12px;
        table {
            margin-top: 12px;
            tr {
                height: 37px;
                td {
                    font-size: 14px;
                }
                td:first-child {
                    color: #666;
                    text-align: right;
                }
                td:last-child {
                    color: #333;
                    padding-left: 30px;
                }
            }
        }
    }
    .tab_content {
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
                        padding-right: 60px;
                        position: relative;
                        span:last-child {
                            position: absolute;
                            right: 20px;
                        }
                    }
                }
                tbody {
                    outline: 1px solid rgba(221, 221, 221, 1);
                    .table_none {
                        height: 12px;
                        td {
                            padding: 0px;
                        }
                    }
                    .table_msg {
                        background: #eeeeee;
                        height: 30px;
                        border-top: 1px solid rgba(221, 221, 221, 1);
                        td {
                            padding-top: 0px;
                            padding-bottom: 0px;
                        }
                    }
                    .table_con {
                        background: #fff;

                        td {
                            padding: 0px;
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
                                background: url(../../../common/image/icon/icon_ck.png)
                                    no-repeat;
                            }
                            .sendhw_icon {
                                background: url(../../../common/image/icon/icon_fh.png)
                                    no-repeat;
                            }
                        }
                    }
                }
            }
        }
    }
    .orderlog {
        padding-bottom: 36px;
        table {
            .layui-table tbody tr:hover,
            .layui-table[lay-even] tr:nth-child(even) {
                background-color: #eee;
            }
            thead {
                tr {
                    background: #e6e6e6;
                }
            }
            th {
                text-align: center !important;
                color: #333;
                font-size: 16px;
                padding-top: 10px;
                padding-bottom: 10px;
            }
            td {
                font-size: 14px;
                padding-top: 10px;
                padding-bottom: 10px;
            }
        }
    }
    .goback {
        margin-bottom: 98px;
        button {
            width: 100px;
            height: 36px;
            background: rgba(49, 150, 255, 1);
            border-radius: 4px;
            border: none;
            font-size: 16px;
            color: #fff;
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
#exitaddress {
    padding-left: 53px;
    padding-right: 53px;

    table {
        margin-top: 27px;
        tr:last-child {
            height: 164px;
            td {
                div {
                    margin-top: -70px;
                }
            }
        }
        tr {
            height: 64px;
            td {
                textarea {
                    width: 340px;
                    height: 140px;
                    border: 1px solid #c2c2c3;
                    resize: none;
                    padding: 10px;
                    border-radius: 4px;
                }
                input {
                    width: 340px;
                    height: 40px;
                    padding-left: 10px;
                    border-radius: 3px;
                }
                input,
                input:hover,
                input:focus {
                    border: 1px solid #c2c3c3;
                }
                select {
                    width: 120px;
                    height: 40px;
                    border-radius: 4px;
                    border: 1px solid #c2c3c3;
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
        margin-top: 26px;
    }
    .cancel {
        border: 1px solid #128dff;
        color: #128dff;
        background: #fff;
        margin-left: 58px;
    }
    .send {
        color: #fff;
        background: #128dff;
        margin-right: 58px;
    }
}
#closeorder {
    table {
        margin-top: 25px;
        tr {
            height: 65px;
            td {
                textarea {
                    width: 100%;
                    height: 180px;
                    border: 1px solid #c2c2c3;
                    resize: none;
                    padding: 10px;
                    border-radius: 4px;
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
        margin-right: 20px;
    }
    .send {
        color: #fff;
        background: #128dff;
        margin-left: 20px;
    }
}
</style>
