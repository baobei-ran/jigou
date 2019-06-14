<template>
    <div id="record" class="" style="height:95%">
        <div class="tab_content Pd-L24 Pd-R24 bg_f">
            <div class="layui-tab Pd-T24">
                <ul class="layui-tab-title">
                    <li class="layui-this" @click="tab(0)">全部（400）</li>
                    <li @click="tab(1)">未使用（100）</li>
                    <li @click="tab(2)">已使用（100）</li>
                    <li @click="tab(3)">已过期（100）</li>
                    <li @click="tab(4)">已退号（100）</li>
                </ul>
                <div class="layui-tab-content">
                    <div class="screen_type Mg-T14 ">
                        <div class="layui-form-item layui-row">
                            <div class="layui-col-md2 ">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">预约单号</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="" autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md2 ">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">预约医生</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="" autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md2">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">所属科室</label>
                                    <select name="city" lay-verify="required" class="select_class">
                                        <option value="">全部</option>
                                        <option value="010">xx</option>
                                        <option value="021">xx</option>
                                        <option value="0571">xx</option>
                                    </select>
                                </div>
                            </div>
                            <div class="layui-col-md4 selecttime">
                                <label class="layui-form-label">预约时间</label>
                                <div class="layui-input-block">
                                    <div class="layui-input-inline">
                                        <input type="text" name="price_min" placeholder="yyyy-MM-dd" id="date" autocomplete="off" class="layui-input">
                                    </div>
                                    <div class="layui-form-mid">-</div>
                                    <div class="layui-input-inline">
                                        <input type="text" name="price_max" placeholder="yyyy-MM-dd" id="date1" autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md1">
                                <div class="layui-input-inline">
                                    <span class="Ft-S14 selectbtn ac pointer">查询</span>
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
                                <td>备注</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="val in 10">
                                <td>0001</td>
                                <td>GH2018092700012121</td>
                                <td>陈亚楠</td>
                                <td>内科</td>
                                <td>2018.09.09 上午</td>
                                <td>王满强 13370145535</td>
                                <td>王满强 13370145535</td>
                                <td>1000000.00元</td>
                                <td>未使用</td>
                                <td>转出</td>
                                <td><span class="Color_blue pointer" @click="godetail()">查看</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="page" class="ac Mg-T30"></div>
                </div>
            </div>
        </div>
        <p class="ac"><span class="Color_white Ft-S16 goback pointer" @click="go('/server/doctorParabiose')">返回</span></p>
    </div>
</template>
<script>
export default {
    name: 'record',
    data() {
        return {

        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {
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
                    count: 50, //数据总数，从服务端得到
                    limit: 10, //每页条数
                    layout: ["prev", "page", "next", "skip"],
                    groups: 4,
                    // prev:
                    //     '<img src="../../common/image/pages/account/icon_left.png" style="margin-top:-3px;" alt="" />',
                    // next:
                    //     '<img src="../../common/image/pages/account/icon_right.png" style="margin-top:-3px;"  alt="" />'
                });
            });
        },
        tab(num) {
            this.tdlast = num
        },
        godetail() {
            this.go('/server/drugParabiose/drugrecorddetail')
        }
    }
}
</script>

<style scoped lang="less">
#record {
    .layui-table[lay-even] tr:nth-child(even) {
        background-color: #e5f0ff;
    }
    .screen_type {
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
        .goback {
        display: inline-block;
        width: 120px;
        height: 40px;
        line-height: 40px;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        margin-top: 24px;
    }
}
</style>
