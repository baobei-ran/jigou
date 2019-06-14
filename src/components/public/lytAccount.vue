<template>
    <div id="lyt_account" class="">
        <p class="lyt_title Ft-S16 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10">
            我的鲁医通账户
        </p>
        <div class="lyt_typetotal Mg-B24">
            <ul class="clear layui-row layui-col-space10">
                <li class="fl lyt_hos layui-col-md4 layui-col-sm4">
                    <div class="bg_f Pd-L24 Pd-B24 Pd-T24 clear">
                        <img src="__STATIC__/web/image/pages/account/pic.png" alt="" class="fl" height="88px" />
                        <div class="fl">
                            <p class="Mg-T18 Mg-B12 Mg-L24 Ft-S18 Color_black" v-text='hname'>
                                中国人民解放军301医院
                            </p>
                            <p class="Ft-S12 Mg-L24 lyt_rz">
                                <span class="Mg-R10">机构认证</span><span>资质认证</span>
                            </p>
                        </div>
                    </div>
                </li>
                <li class="fl lyt_price layui-col-md8 layui-col-sm8">
                    <div class="bg_f Pd-T28 Pd-B28">
                        <ul class="clear layui-row">
                            <li class="fl layui-col-md4 layui-col-sm4">
                                <p class="Ft-S16 Color_gray6 Mg-T10 Mg-B22">
                                    <i class="icon1 Mg-L40"></i>总资产
                                </p>
                                <p class="Color_black Ft-S18">
                                    ¥<span class="Ft-S24" v-text='all_money'>34214</span>
                                </p>
                            </li>
                            <li class="fl layui-col-md4 layui-col-sm4">
                                <p class="Ft-S16 Color_gray6 Mg-T10 Mg-B22">
                                    <i class="icon2 Mg-L40"></i>冻结余额<i class="Pd-L30 layer_icon ihover"></i>
                                </p>
                                <p class="Color_black Ft-S18">
                                    ¥<span class="Ft-S24" v-text='money_lock'>1234</span>
                                </p>
                            </li>
                            <li class="fl layui-col-md4 layui-col-sm4">
                                <p class="Ft-S16 Color_gray6 Mg-T10 Mg-B22">
                                    <i class="icon3 Mg-L40"></i>今日收入
                                </p>
                                <p class="Color_black Ft-S18">
                                    ¥<span class="Ft-S24" v-text='today_money'>435</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <div class="lyt_table bg_f">
            <p class="tab_tit Ft-S16 Color_black Pd-B24">今日收入明细</p>
            <table class="layui-table Mg-T24 ac" lay-even="nob">
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

                <tbody  v-if='todayList.length'>
                    <tr v-for='(val,i) in accountList' :key='i'>
                        <td>{{ i+1 }}</td>
                        <td>{{ val.number }}</td>
                        <td>{{ val.creatime }}</td>
                        <td>{{ val.change }}</td>
                        <td>{{ val.status }}</td>
                        <td>{{ val.payment }}</td>
                        <td>{{ val.money }}</td>
                    </tr>
                    <!-- <tr>
                        <td>0002</td>
                        <td>3332018092700012121</td>
                        <td>2019-11-11 11:11:11</td>
                        <td>收入</td>
                        <td>冻结中</td>
                        <td>预约挂号 订单号：6876765758</td>
                        <td>+1000.00</td>
                    </tr>
                    <tr>
                        <td>0002</td>
                        <td>3332018092700012121</td>
                        <td>2019-11-11 11:11:11</td>
                        <td>收入</td>
                        <td>冻结中</td>
                        <td>预约挂号 订单号：6876765758</td>
                        <td>+1000.00</td>
                    </tr> -->
                </tbody>
                <tbody v-if='!todayList.length'>
                    <tr>
                        <td colspan="7">暂无数据</td>
                    </tr>
                </tbody>
            </table>

            <div  v-if='todayList.length' id="page" class="ac Mg-T20"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'lytAccount',
    data() {
        return {
            page: 1,          // 当前页
            limit: 10,        // 每页数据
            accountList: '',  // 数据
            all_money: '',    // 总资产
            money_lock: '',   // 冻结余额
            today_money: '',  //  今日收入
            hname: '',        // 机构名称
            todayList: []     // 今日收入明细
        }
    },
    mounted() {
      this.account(this.page);
    },
    methods: {
        
        account(num) { // 鲁医通账户 数据
            var _this = this;
            layui.use('layer', function(){
            var layer = layui.layer;
            _this.$http.post('/shv2/account/index', {page: num, limit: _this.limit}, function (res) {
                // console.log(res)
                if (res.code == 1) {
                    _this.accountList = res.data
                    _this.all_money = res.all_money
                    _this.money_lock = res.money_lock
                    _this.today_money = res.today_money
                    _this.hname = res.hname
                    _this.todayList = res.data
                    _this.$nextTick(() => {
                        _this.initdata(res.count)
                    })
                } else {
                    layer.msg(res.msg);
                }
            }, function (err) { console.log(err)})
            
            });  
        },
        initdata(total) {    // 分页
            var _this = this;
            layui.use(["laypage", "layer"], function () {
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
                            _this.account(obj.curr) // 每页调取新数据
                            _this.page = obj.curr;
                        }
                    }
                    // prev:
                    //     '<img src="../../common/image/pages/account/icon_left.png" style="margin-top:-3px;" alt="" />',
                    // next:
                    //     '<img src="../../common/image/pages/account/icon_right.png" style="margin-top:-3px;"  alt="" />'
                });
                var layer = layui.layer;
                var $ = layui.jquery;
                $(".ihover").hover(function () {
                    layer.tips('患者的服务订单完结后，冻结金额将变为可用，若发生退款，将自动扣减金额。', '.ihover', {
                        tips: [3, 'rgba(0,0,0)'],
                        time: 0
                    });
                }, function () {
                    layer.closeAll()
                });
            });
        }
    }
}
</script>

<style scoped lang="less">
//鲁医通账户
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
                        no-repeat right;
                    position: relative;
                    top: 4px;
                    margin-right: 6px;
                }
                .layer_icon:hover {
                    background: url("../../common/image/pages/account/icon_gdls.png")
                        no-repeat right;
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