<template>
    <div id="lyt_account" class="">
        <div class="lyt_table bg_f">
            <p class="tab_tit Ft-S16 Color_black Pd-B24">月账单明细</p>
            <div class="layui-form-item Mg-T24 Mg-B24">
                <div class="layui-inline">
                    <!-- <label class="layui-form-label" style="width: 100px;">订单编号</label>
                    <div class="layui-input-inline" style="width: 200px;">
                        <input type="text" name="" autocomplete="off" class="layui-input" id="ordercode" />
                    </div> -->
                    <div class="layui-inline">
                        <label class="layui-form-label" style="width: 100px;">订单时间</label>
                        <div class="layui-input-inline" style="width: 200px;">
                            <input type="text" name="" v-model='data' autocomplete="off" class="layui-input" id="date" />
                        </div>
                    </div>
                    <div class="layui-inline">
                        <button class="layui-btn layui-btn-normal" id="selectord" @click='month_datalist(1)'>
                            筛选订单
                        </button>
                        <span class="Mg-L10" id="clearinp">清空筛选条件</span>
                    </div>
                </div>
            </div>
            <table class="layui-table ac" lay-even="nob">
                <thead>
                    <tr>
                        <td>序号</td>
                        <td>时间</td>
                        <td>收入</td>
                        <td>支出</td>
                    </tr>
                </thead>
                <tbody v-if='monthList.length'>
                    <tr v-for='(val, index) in monthList'>
                        <td v-text='index+1'></td>
                        <td v-text='val.month'></td>
                        <td v-text='val.shou'></td>
                        <td v-text='val.zhi'></td>
                    </tr>
                    <!-- <tr>
                        <td >0001</td>
                        <td>2019-11-11</td>
                        <td >+787888.00</td>
                        <td >+787888.00</td>
                    </tr>
                    <tr>
                        <td >0001</td>
                        <td>2019-11-11</td>
                        <td >+787888.00</td>
                        <td >+787888.00</td>
                    </tr> -->
                    
                </tbody>
                <tbody v-if='!monthList.length'>
                    <tr>
                        <td colspan="4">暂无信息</td>
                    </tr>
                </tbody>
            </table>

            <div  v-if='monthList.length' id="page" class="ac Mg-T20"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'monthBillDetail',
    data() {
        return {
            page: 1,
            limit: 10,
            data: '',    // 查询时间
            monthList: [],   // 账单列表 
        }
    },
    mounted() {
        this.month_datalist(this.page)
    },
    methods: {
        month_datalist(num) {  // 月账单明细
            var _this = this;
            layui.use('layer', function(){
            var layer = layui.layer;
            var obj = { page: num, limit: _this.limit, data: _this.data,hos_id: 283 }
            _this.$http.post('/shv2/account/month_datalist', obj, function (res) {
                // console.log(res)
                if (res.code == 1) {
                    _this.monthList = res.data
                    _this.initdata(res.count)
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
                            _this.month_datalist(obj.curr)
                            _this.page = obj.curr
                        }
                    }
                    // prev:
                    //     '<img src="__STATIC__/web/image/pages/account/icon_left.png" style="margin-top:-3px;" alt="" />',
                    // next:
                    //     '<img src="__STATIC__/web/image/pages/account/icon_right.png" style="margin-top:-3px;"  alt="" />'
                });
                var laydate = layui.laydate;
                // laydate.render({ // 渲染日期
                //     elem: "#date" //指定元素
                // });
                // $("#selectord").on("click", function () {
                //     //提交
                //     // var inp1 = $("#ordercode").val(); //订单编号
                //     var inp2 = $("#date").val(); //订单时间
                // });
                $("#clearinp").on("click", function () {
                    //清空
                    // $("#ordercode").val(""); //订单编号
                    $("#date").val(""); //订单时间
                    _this.data = ''
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
