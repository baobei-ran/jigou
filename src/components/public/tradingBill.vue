<template>
    <div id="lyt_account" class="">
        <div class="lyt_table bg_f">
            <p class="tab_tit Ft-S16 Color_black Pd-B24">交易账单</p>
            <div class="layui-form-item Mg-T24 Mg-B10">
                <div class="layui-inline" id='form_time'>
                    <div class="layui-inline">
                        <label class="layui-form-label" style="width: 100px;">订单编号</label>
                        <div class="layui-input-inline" style="width: 200px;">
                            <input type="text" name="" v-model='order_code' autocomplete="off" class="layui-input" id="ordercode" />
                        </div>
                    </div>
                    <label class="layui-form-label" style="width: 100px;">订单时间</label>
                    <div class="layui-input-inline" style="width: 200px;">
                        <input type="text" name="price_min" placeholder="请选择起始时间"  autocomplete="off" class="layui-input" id="date" />
                    </div>
                    <div class="layui-form-mid">-</div>
                    <div class="layui-input-inline" style="width: 200px;">
                        <input type="text" name="price_max" placeholder="请选择截止时间"  autocomplete="off" class="layui-input" id="date1" />
                    </div>
                </div>
            </div>
            <div class="layui-form-item Mg-B10">
                <div class="layui-inline">
                    <div class="layui-inline">
                        <label class="layui-form-label" style="width: 100px;">类型状态</label>
                        <div class="layui-input-inline" style="width: 160px;">
                            <select name="" id="type" lay-verify="" v-model='type'>
                                <option v-for='(val, index) in typeData' :key='index' :value="val.id">{{ val.name }}</option>
                                
                            </select>
                        </div>
                        <!-- <div class="layui-input-inline" style="width: 160px;">
                            <select name="" id="status" lay-verify="">
                                <option value="">全部状态</option>
                                <option value="010">1</option>
                            </select>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="layui-form-item Mg-L30 Mg-B24">
                <div class="layui-inline">
                    <button class="layui-btn layui-btn-normal" id="selectord">
                        筛选订单
                    </button>
                    <span class="Mg-L10" id="clearinp">清空筛选条件</span>
                </div>
            </div>
            <table class="layui-table ac" lay-even="nob">
                <thead>
                    <tr>
                        <td>序号</td>
                        <td>流水单号</td>
                        <td>时间</td>
                        <td>类型</td>
                        <td>状态</td>
                        <td>相关信息</td>
                        <td>金额（元）</td>
                    </tr>
                </thead>

               <tbody v-if='accountList.length'>
                    <tr v-for='(val, index) in accountList' :key='index'>
                        <td v-text='index+1'>0002</td>
                        <td v-text='val.number'>3332018092700012121</td>
                        <td v-text='val.creatime'>2019-11-11 11:11:11</td>
                        <td v-text='val.change'>收入</td>
                        <td v-text='val.status'>冻结中</td>
                        <td v-text='val.payment'>预约挂号 订单号：6876765758</td>
                        <td v-text='val.money'>+1000.00</td>
                    </tr>
               </tbody>
               <tbody v-if='!accountList.length'>
                   <tr>
                    <td colspan="7">暂无数据</td>
                </tr>
               </tbody>
            </table>

            <div v-if='accountList.length' id="page" class="ac Mg-T20"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'tradingBill',
    data() {
        return {
            page: 1,
            limit: 10,
            order_code: '',     //  订单号
            timestart: '',      //  订单开始时间
            timeend: '',        // 订单结束时间
            type: '',            // 0 全部，1 充值，2收入，3 提现，4 退款，5 手续费，6 手动账户变更
            typeData:[{id:'', name: '全部类型'}, {id: 1, name: '充值'}, { id: 2, name: '收入'}, {id:3, name: ' 提现'}, {id:4, name: '退款'}, 
                     {id: 5, name: '手续费'}, {id: 6, name: '手动账户变更'}],
            accountList: [],    //  列表数据
        }
    },
    mounted() {
        this.accountDeal(this.page)
        var _this = this;
        
    },
    methods: {
        accountDeal(num) {
            var _this = this;
              console.log(_this.type, _this.order_code, _this.timestart, _this.timeend)
            layui.use('layer', function(){
            var layer = layui.layer;
            var tp = _this.type == undefined ? 0 : _this.type
            var obj = { page:num, limit: _this.limit, order_code: _this.order_code, timestart: _this.timestart, timeend: _this.timeend, type: tp}
            _this.$http.post('/shv2/account/dataList', obj, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.accountList = res.data
                   _this.$nextTick(() => {
                        _this.initdata(res.count)
                   })
                } else {
                    layer.msg(res.msg);
                }
            }, function (err) { console.log(err)})
            
        });
        },
        initdata(total) {
            var _this = this;
            layui.use(["laypage", "laydate", "layer"], function () {
                var $ = layui.jquery;
                var laypage = layui.laypage;
                //执行一个laypage实例
                laypage.render({
                    elem: "page", //注意，这里的 test1 是 ID，不用加 # 号
                    count: total, //数据总数，从服务端得到
                    limit: _this.limit, //每页条数
                    layout: ["prev", "page", "next", "skip"],
                    groups: 4,
                    jump: function(obj, first){
                        //首次不执行
                        if(!first){
                            _this.accountDeal(obj.curr);
                            _this.page = obj.curr
                        }
                    }
                    // prev:
                    //     '<img src="@/common/image/pages/account/icon_left.png" style="margin-top:-3px;" alt="" />',
                    // next:
                    //     '<img src="@/common/image/pages/account/icon_right.png" style="margin-top:-3px;"  alt="" />'
                });
                var laydate = layui.laydate;
                laydate.render({   // 渲染日期
                    elem: "#date" //指定元素
                });
                laydate.render({
                    elem: "#date1", //指定元素
                });
                $("#selectord").on("click", function () {
                    // 搜索
                    var timestrat = $("#date").val(); //订单时间
                    var timeend = $("#date1").val(); //订单end时间
                    _this.timestart = timestrat;
                    _this.timeend = timeend;
                    _this.accountDeal(1)  // 调用
                });
                $("#clearinp").on("click", function () {
                    //清空
                    $("#date").val(""); //订单start时间
                    $("#date1").val(""); //订单end时间
                    _this.order_code = ''
                    _this.type = ''
                });
            });
        }
    }
}
</script>

<style scoped lang="less">
#lyt_account {
    .lyt_title {
        background: #fff;
    }
    .lyt_typetotal {
        .lyt_hos {
            .bg_f {
                height: 137px;
                .lyt_rz {
                    color: #4281d7;
                    span {
                        display: inline-block;
                        text-align: center;
                        font-size: 12px;
                        width: 60px;
                        height: 20px;
                        line-height: 20px;
                        background: rgba(236, 242, 251, 1);
                        border-radius: 4px;
                    }
                }
            }
        }
        .lyt_price {
            li {
                height: 80px;
                border-right: 1px dashed #aaa;
                .icon1 {
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    background: url("../../common/image/pages/account/icon_zzc.png")
                        no-repeat;
                    position: relative;
                    top: 4px;
                    margin-right: 6px;
                }
                .icon2 {
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    background: url("../../common/image/pages/account/icon_djye.png")
                        no-repeat;
                    position: relative;
                    top: 4px;
                    margin-right: 6px;
                }
                .icon3 {
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    background: url("../../common/image/pages/account/icon_jrsr.png")
                        no-repeat;
                    position: relative;
                    top: 4px;
                    margin-right: 6px;
                }
                .layer_icon {
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    background: url("../../common/image/pages/account/icon_gd.png")
                        no-repeat;
                    position: relative;
                    top: 4px;
                    margin-right: 6px;
                }
                .layer_icon:hover {
                    background: url("../../common/image/pages/account/icon_gdls.png")
                        no-repeat;
                }
                p:first-child {
                    line-height: 16px;
                }
                p:last-child {
                    margin-left: 65px;
                    line-height: 24px;
                }
            }
            li:last-child {
                border-right: none;
            }
        }
    }
    .lyt_table {
        padding: 24px;
        #clearinp {
            color: #3196ff;
            cursor: pointer;
        }
        .layui-input-inline {
            input {
                height: 34px;
            }
        }
        .layui-inline {
            .layui-btn {
                height: 34px;
                line-height: 34px;
                background: #3196ff;
            }
            .layui-form-label {
                padding: 7px 15px;
            }
        }
        #type,
        #status {
            height: 34px;
            border: 1px solid #e2e2e2;
            border-radius: 3px;
            width: 100%;
            padding-left: 5px;
        }
        .tab_tit {
            border-bottom: 1px solid #f1f2f9;
        }
        .layui-table thead tr {
            background: #dae9ff;
            height: 49px;
        }
        .layui-table[lay-even] tr:nth-child(even) {
            background-color: #e5f0ff;
        }
        .layui-laypage .layui-laypage-curr .layui-laypage-em,
        .layui-laypage-btn {
            color: #fff;
            font-size: 14px;
            background: #3196ff;
        }
        .layui-input:focus,
        .layui-input:hover {
            border: 1px solid #e2e2e2;
        }
    }
}
</style>
