<template>
    <div id="equipmentdetail" class="">
        <div class="bg_f" style="width:87.7%">
            <p class="equipmentdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Mg-B24 Color_black">设备详情</p>
            <div class="clear detail_head Pd-B46 Pd-L24">
                <div class="fl silder">
                    <div class="layui-carousel" id="play" lay-filter="play">
                        <div carousel-item>
                            <div v-for="(val, index) in detailPic" :key='index' style="line-height:380px;"><img :src="$http.baseURL+val.img" alt="" width="100%"></div>
                        </div>
                        <p class="ar"><span class="slider_num">{{index+1}}/{{detailPic.length}}</span></p>
                    </div>
                </div>
                <div class="fl Mg-L24" style="width:55%">
                    <p class="Ft-S18 Color_black Mg-B22" v-text="detailData.name">凯尔推车式B超 彩超</p>
                    <p class="Ft-S14 Mg-B22">
                        <table width="100%">
                            <tr>
                                <td width="50%"><span class="Color_black">产品型号：</span><span class="Color_gray6"v-text="detailData.model">CDAAA555A</span></td>
                                <td width="50%"><span class="Color_black">供货方式：</span><span class="Color_gray6"v-text="detailData.supply">物流</span></td>
                            </tr>
                        </table>
                    </p>
                    <p class="Ft-S14 Mg-B22">

                        <table width="100%">
                            <tr>
                                <td width="50%"><span class="Color_black">生产品牌：</span><span class="Color_gray6"v-text="detailData.brand">一路高歌</span></td>
                                <td width="50%"><span class="Color_black">产品价格：</span><span class="Color_orange">¥{{detailData.price}}</span></td>
                            </tr>
                        </table>
                    </p>
                    <p class="Ft-S14 Mg-B22"><span class="Color_black">适用范围：</span><span class="Color_gray6"v-text="detailData.sphere">医用</span></p>
                    <p class="Ft-S14 Mg-B60"><span class="Color_black">产品特点：</span><span class="Color_gray6"v-text="detailData.specialty">AAAAA</span></p>
                    <p class="Ft-S14 Pd-T20 Mg-B22">
                        <span class="Color_gray6">数量</span>
                        <el-input-number class="Mg-L36" v-model="num1" size="small" @change="handleChange" :min="1" label=""></el-input-number>
                    </p>
                    <p class="Pd-L60"><span class="addbtn Mg-L10 pointer" @click="addcart(detailData.id)">加入申请单</span></p>
                </div>
            </div>
            <div class="Pd-L24 Pd-R24 Pd-B24 detail_content">
                <div>
                    <p class="con_tab Mg-B24"><span>设备详情</span></p>
                    <p class="Mg-B24 Pd-L32 Pd-R32 Ft-S14 Color_black"v-html="detailData.content">凯尔B超—专业超声制造商。本公司大量供应KR系列全数字B超，分为：便携式B超、笔记本式B超、推车式B超、一体化B超、超导可视人流B超、兽用B超等十几个品种型号。</p>
                    <!-- <p class="Pd-L32 Mg-B24 "><img src="../../../common/image/pages/yi/1234_03.jpg" alt=""></p> -->
                </div>
            </div>
        </div>

        <shopping-cart ref="shapcart" :num='num1' v-on:clickinit="initdata"></shopping-cart>
    </div>

</template>
<script>
import shoppingCart from "@/components/Yi/Yi-shoppingcart";
import { setTimeout } from 'timers';
export default {
    name: 'equipmentdetail',
    components: {
        shoppingCart
    },
    data() {
        return {
            index: 0,
            num1: 1,
            detailData: '',
            detailPic: ''
        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {
            var _this = this;
            layui.use(["layer", "element", "carousel"], function () {
                var element = layui.element;
                _this.$http.post('/shv2/deviceapply/detail', _this.$route.query, function (res) {//
                    if (res.code == 1) {
                        _this.detailData = res.data;
                        _this.detailPic = res.pic;
                        setTimeout(() => {
                            var carousel = layui.carousel;
                            carousel.render({
                                elem: '#play'
                                , width: '100%' //设置容器宽度
                                , arrow: 'always', //始终显示箭头
                                indicator: 'none'
                            });
                            carousel.on('change(play)', function (obj) {
                                _this.index = obj.index;
                            });
                        }, 200)

                    }
                }, function (err) { console.log(err) });

            });

        },
        godetail() {

        },
        addcart(id) {
            this.$refs.shapcart.drop(event.target);
            this.$refs.shapcart.initdata(id, this.num1);
        },
        handleChange(value) {
            // console.log(value);
        },
        select(num) {
            this.inactive = num
        },
        eqlist() {
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 1,
                    title: "医疗申请单",
                    content: $(".delcode"),
                    area: ["800px", "640px"],
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
    }
}
</script>
<style>
.layui-carousel-arrow {
    border-radius: 0px !important;
    width: 25px;
    height: 40px;
}
.layui-carousel[lay-arrow="always"] .layui-carousel-arrow {
    left: 0px;
}
.layui-carousel[lay-arrow="always"] .layui-carousel-arrow[lay-type="add"] {
    right: 0px;
}
</style>

<style scoped lang="less">
#equipmentdetail {
    .equipmentdetail_tit {
        border-bottom: 1px solid #f1f2f9;
    }
    .detail_head {
        .silder {
            width: 380px;
            height: 382px;
            text-align: center;
            border: 1px solid #e6e6e6;
            #play {
                height: 380px !important;
                .slider_num {
                    position: relative;
                    top: -30px;
                    right: 10px;
                    background: #b1b1b1;
                    display: inline-block;
                    width: 45px;
                    height: 20px;
                    line-height: 20px;
                    border-radius: 10px;
                    text-align: center;
                    font-size: 12px;
                    color: #fff;
                }
            }
        }
        .addbtn {
            display: inline-block;
            width: 140px;
            height: 40px;
            text-align: center;
            background: rgba(49, 150, 255, 1);
            font-size: 16px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 40px;
        }
    }
    .detail_content {
        div {
            border: 1px solid rgba(230, 230, 230, 1);
            .con_tab {
                height: 50px;
                background: rgba(245, 245, 245, 1);
                border-bottom: 1px solid rgba(230, 230, 230, 1);
                span {
                    display: inline-block;
                    width: 140px;
                    height: 52px;
                    text-align: center;
                    line-height: 50px;
                    border-top: 2px solid #128dff;
                    border-right: 1px solid rgba(230, 230, 230, 1);
                    position: relative;
                    top: -1px;
                    background: rgba(255, 255, 255, 1);
                }
            }
        }
    }
}
</style>
