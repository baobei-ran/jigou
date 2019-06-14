<template>
    <div id="equipmentApply" class="">
        <div class="bg_f Pd-L24 Pd-T24" style="width:87.7%">
            <div class="clear Ft-S16 Pd-B24 Pd-R24">
                <span class="fl Mg-R22">医疗设备分类：</span>
                <ul class="fl head_tab">
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==0}" @click="select(0)">全部</li>
                    <li class="fl pointer" v-for="(val,index) in tableType" :class="{'Color_blue':inactive==val.id,'Mg-R32':index!=(tableType.length-1)}" @click="select(val.id)" v-text="val.name">呼吸机</li>
                </ul>
                <span class="fr head_btn pointer" @click="go('/server/equipmenApply/equipmenjl')">申请记录</span>
            </div>
            <ul class="good_list clear">
                <li class="good_list_li ac fl Mg-R24 Mg-B24" v-for="val in tableList">
                    <section @click="godetail(val.id)">
                        <div>
                            <img :src="$http.baseURL+val.img" width="206px" height="188px" alt="">
                        </div>
                        <p class="Mg-T16 Ft-S14 Color_black" v-text="val.name">【必利劲】推车式彩超</p>
                        <p class="Mg-T10 Ft-S14 Color_orange">￥{{val.price}}</p>
                    </section>
                    <span class="Mg-T12 adddan pointer" @click="addcart(val.id)">加入申请单</span>
                </li>
            </ul>
            <div id="page" class="ac Mg-T30"></div>
        </div>
        <shopping-cart ref="shapcart" :num="count2" v-on:clickinit="initdata"></shopping-cart>
    </div>
</template>
<script>
import shoppingCart from "@/components/Yi/Yi-shoppingcart";
export default {
    name: 'equipmentApply',
    components: {
        shoppingCart
    },
    data() {
        return {
            inactive: 0,
            page: 1,
            limit: 10,
            tableList: '',
            tableType: '',
            count2:''
        }
    },
    created(){
        this.initdata(1)
    },
    mounted() {
        
    },
    methods: {
        initdata(num) {
            var _this = this;
            layui.use(["laypage", "layer", "laydate", "element"], function () {
                var element = layui.element;
                _this.page = num;
                _this.$http.post('/shv2/deviceapply/index', { type: _this.inactive, page: _this.page, limit: _this.limit }, function (res) {//
                    if (res.code == 1) {
                        _this.count2 = res.count2;
                        _this.tableList = res.data;
                        _this.tableType = res.type;
                        if (num == 1) {
                            _this.pageFun(res.count)
                        }
                    } else {
                        _this.tableList = false;
                        _this.pageFun(0)
                    }
                }, function (err) { console.log(err) });

            });
        },
        addcart(id) {
            this.$refs.shapcart.drop(event.target);
            this.$refs.shapcart.initdata(id, 1);
        },
        pageFun(total) {
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
                            _this.page = obj.curr;
                            _this.initdata(obj.curr)
                        }
                    }
                });
            });
        },
        godetail(id) {
            this.go('/server/equipmenApply/equipmendetail?id='+id)
        },
        select(num) {
            this.inactive = num;
            this.initdata(1)
        },

    }
}
</script>

<style scoped lang="less">
#equipmentApply {
    .head_btn {
        font-size: 14px;
        color: #3196ff;
        border: 1px solid #3196ff;
        width: 80px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border-radius: 4px;
    }
    @media (max-width: 1530px) {
        .head_tab {
            li {
                margin-right: 10px !important;
            }
            li:last-child {
                margin-right: 0px !important;
            }
        }
    }
    .good_list {
        .good_list_li {
            width: 240px;
            height: 350px;
            border: 1px solid rgba(221, 221, 221, 1);
            line-height: 14px;
            div {
                text-align: center;
                padding: 24px 0px 28px;
                border-bottom: 1px solid rgba(221, 221, 221, 1);
            }
            .adddan {
                display: inline-block;
                width: 100px;
                height: 30px;
                line-height: 30px;
                background: rgba(49, 150, 255, 1);
                border-radius: 4px;
                color: #fff;
                font-size: 14px;
            }
        }
    }
}
</style>
