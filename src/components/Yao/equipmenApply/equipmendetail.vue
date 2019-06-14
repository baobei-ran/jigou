<template>
    <div id="equipmentdetail" class="">
        <div class="bg_f" style="width:87.7%">
            <p class="equipmentdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Mg-B24 Color_black">设备详情</p>
            <div class="clear detail_head Pd-B46 Pd-L24">
                <div class="fl silder Mg-B20">
                    <div class="layui-carousel" id="play" lay-filter="play">
                        <div carousel-item>
                            <div v-for="(val,index) in arrimg" :key='index'><img style='width: 100%;' :src="$http.baseURL+val.img" alt=""></div>
                        </div>
                        <p class="ar"><span class="slider_num">{{index+1}}/{{ arrimg.length }}</span></p>
                    </div>
                </div>
                <div class="fl Mg-L24" style="width:55%">
                    <p class="Ft-S18 Color_black Mg-B22">{{ devdata.name }}</p>
                    <p class="Ft-S14 Mg-B22">
                        <table width="100%">
                            <tr>
                                <td width="50%"><span class="Color_black">产品型号：</span><span class="Color_gray6">{{ devdata.model }}</span></td>
                                <td width="50%"><span class="Color_black">供货方式：</span><span class="Color_gray6">{{ devdata.supply }}</span></td>
                            </tr>
                        </table>
                    </p>
                    <p class="Ft-S14 Mg-B22">

                        <table width="100%">
                            <tr>
                                <td width="50%"><span class="Color_black">生产品牌：</span><span class="Color_gray6">{{ devdata.brand }}</span></td>
                                <td width="50%"><span class="Color_black">产品价格：</span><span class="Color_orange">{{ devdata.price }}</span></td>
                            </tr>
                        </table>
                    </p>
                    <p class="Ft-S14 Mg-B22"><span class="Color_black">适用范围：</span><span class="Color_gray6">{{ devdata.sphere }}</span></p>
                    <p class="Ft-S14 Mg-B60"><span class="Color_black">产品特点：</span><span class="Color_gray6">{{ devdata.specialty }}</span></p>
                    <p class="Ft-S14 Pd-T20 Mg-B22">
                        <span class="Color_gray6">数量</span>
                        <el-input-number class="Mg-L36" v-model="num1" size="small" @change="handleChange" :min="1" label="描述文字"></el-input-number>
                    </p>
                    <p class="Pd-L60"><span class="addbtn Mg-L10" @click='submitCart(devdata.id)'>加入申请单</span></p>
                </div>
            </div>
            <div class="Pd-L24 Pd-R24 Pd-B24 detail_content">
                <div>
                    <p class="con_tab Mg-B24"><span>设备详情</span></p>
                    <p class="Mg-B24 Pd-L32 Pd-R32 Ft-S14 Color_black" v-html='devdata.content'></p>
                    <!-- <p class="Pd-L32 Mg-B24 "><img src="../../../common/image/pages/yi/1234_03.jpg" alt=""></p> -->
                </div>
            </div>
        </div>


            
            



        <div id="sendgoods" class="hide delcode">
            <div style="width: 720px;" class="Mg-T26">
                <div class="table-head ac">
                    <table>
                        <colgroup>
                            <col style="width: 80px;" />
                            <col />
                        </colgroup>
                        <thead>
                            <tr>
                                <td class="Color_black Ft-S16" width="150px">设备名称</td>
                                <td width="130px">
                                    型号
                                </td>
                                <td width="130px">价格</td>
                                <td width="130px">数量</td>
                                <td width="110px">操作</td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="table-body ac">
                    <table>
                        <colgroup>
                            <col style="width: 80px;" />
                            <col />
                        </colgroup>
                        <tbody v-if='cart.length'>
                            <tr v-for="val in cart" :key='val.id'>
                                <td class="Color_black Ft-S16" width="150px">{{ val.name }}</td>
                                <td width="130px">{{ val.model }}</td>
                                <td width="130px">{{ val.price }}</td>
                                <td width="130px">{{ val.num }}</td>
                                <td width="110px"><span class="pointer Color_blue" @click='del(val.id)'>删除</span></td>
                            </tr>
                        </tbody>
                        <tbody v-if='!cart.length'>
                            <tr>
                                <td colspan="6">无数据</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <p class="ac">
                <span class="Mg-R24"><button class="cancel pointer" @click='close' >返回</button></span>
                <span class=""><button class="send pointer" @click='submitCartlist'>提交</button></span>
            </p>
        </div>
        <ul class="aside">
            <li class="pointer" @click="eqlist"><span class="icon_num"><i class="add_num">{{ numbers }}</i></span>
                <transition-group @before-enter='beforeEnter' @enter='enter' @after-enter='afterEnter'>
                    <div class="ball" v-for="item in balls" :key="item.id" v-show="item.show" transition='drop'>
                        <div class="inner inner-hook"></div>
                    </div>
                </transition-group>
            
            </li>
            <li class="pointer"><span class="icon_up"></span></li>
            <li class="pointer" @click="go('/server/YaoequipmenApply')">
                <p>返回首页</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'equipmentdetail',
    data() {
        return {
            balls: [        // 动画
                { show: false, id: 1 },
                { show: false, id: 2 },
                { show: false, id: 3 }
            ],
            dropBalls: [],  // 收集动画小球
            index: 0,
            num1: 1,            // 数量
            devdata: {                      // 数据
                brand: "一路高歌",
                content: "",
                manufacturers: "北京云医康",
                model: "CDAAA555A",
                name: "【凯尔】凯尔监护仪",
                price: "6000.00",
                specialty: "AAAAAAAAAAAAAAAAAAAA",
                sphere: "医用",
                supply: "物流",
                tname: "监护仪"
            },
            arrimg: [],                 //  图片
            cart: [],                   //  购物车
            numbers: 0,                 //  购物车数量
        }
    },
    mounted() {
        this.initdata()
        this.Cartdata()
    },
    methods: {
        submitCart(id, num) {   // 填加购物车
            this.drop(event.target);  // 执行动画
            var _this = this
            num = num ? num : this.num1
            setTimeout(() => {          
                _this.$http.post('/shv2/deviceapply/add_apply', { did: id, num: num }, function (res) {//添加购物车
                    if (res.code == 1) {
                    _this.Cartdata()
                    }
                }, function (err) { })
            }, 300)
        },
        drop(target) {
            for (var i = 0; i < this.balls.length; i++) {
                var ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true
                    ball.el = target
                    this.dropBalls.push(ball)
                    return
                }
            }
        },
        beforeEnter(el) {
            var count = this.balls.length
            while (count--) {
               var ball = this.balls[count]
                if (ball.show) {
                    var rect = ball.el.getBoundingClientRect() // 获取小球的相对于视口的位移(小球高度)
                    var x = -(window.innerWidth - rect.left - 140)
                    var y = rect.top - 550 // 负数是从左上角往下的的方向, 正数是往上
                    el.style.display = '' // 清空display
                    el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
                    el.style.transform = `translate3d(0, ${y}px, 0)`
                    // 处理内层动画
                    var inner = el.getElementsByClassName('inner-hook')[0] // 使用inner-hook类来单纯被js操作
                    inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
                    inner.style.transform = `translate3d(${x}px, 0, 0)`
                }
            }
        },
        enter(el, done) {
            var rf = el.offsetHeight // 触发重绘html
            this.$nextTick(() => {
                // 让动画效果异步执行,提高性能
                el.style.webkitTransform = 'translate3d(0, 0, 0)'
                el.style.transform = 'translate3d(0, 0, 0)'
                // 处理内层动画
                var inner = el.getElementsByClassName('inner-hook')[0] // 使用inner-hook类来单纯被js操作
                inner.style.webkitTransform = 'translate3d(0, 0, 0)'
                inner.style.transform = 'translate3d(0, 0, 0)'
                el.addEventListener('transitionend', done) // Vue为了知道过渡的完成，必须设置相应的事件监听器。
            })
        },
        afterEnter(el) {
            var ball = this.dropBalls.shift() // 完成一次动画就删除一个dropBalls的小球
            if (ball) {
                ball.show = false;
                el.style.display = 'none'; // 隐藏小球
            }
        },
      
        // 以上为加入购物车动画效果

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




        Cartdata () {   // 获取购物车数据
            var _this = this;
            this.$http.post('/shv2/deviceapply/apply_data', {}, function (res) {
                if (res.code == 1) {
                    _this.cart = res.data
                    var num = 0;
                    _this.cart.map(val => {
                        num += val.num
                    })
                    _this.numbers = num
                } else {
                    _this.cart = [];
                    _this.numbers = 0;
                }
            }, function (err) { console.log(err)})
        },
        initdata() {
            var _this = this;
            layui.use(["laypage", "layer", "laydate", "element", "carousel"], function () {
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
                });

                _this.$http.post('/shv2/deviceapply/detail', _this.$route.query, function (res) {
                console.log(res)
                if(res.code == 1) {
                    _this.devdata = res.data
                    _this.arrimg = res.pic
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
            }, function (err) { console.log(err)})

            });

        },
        del(id) {   // 购物车删除
            var _this = this;
            layui.use('layer', function(){
                var layer = layui.layer;
                _this.$http.post('/shv2/deviceapply/del_apply', { id: id}, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.msg(res.msg, { icon: 1, time: 1500});
                        _this.Cartdata()
                    } else {
                        layer.msg(res.msg, { icon: 2, time: 1500});
                    }
                })
                
            }); 
        },
        
        handleChange (event) {  // 数量处理
           
        },
        eqlist() {          // 打开购物车
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
        submitCartlist() {      // 提交购物车
            var _this = this;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                if (_this.cart.length > 0) {
                    layer.msg('success')
                    _this.$http.post('/shv2/deviceapply/sub_apply', {}, function (res) {
                    console.log(res) 
                        if (res.code == 1) {
                            layer.msg(res.msg, { icon: 1, time: 1500});
                            var time = setTimeout(() => {
                                clearTimeout(time)
                                _this.Cartdata()
                                layer.closeAll();
                            }, 1000)
                        } else {
                            layer.msg(res.msg, { icon: 2, time: 1500});
                        }
                    }, function (err) { console.log(err)})
                }
            })
        },
        close () {  // 购物车返回键
            layui.use(["layer"], function () {
                var layer = layui.layer;
                layer.closeAll();
            })
        }
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

.ball {
    &.v-enter-active {
        /* 可以在上面的工具里跳出自己想要的曲线，调整参数 */
        transition: all 0.6s cubic-bezier(0.11, 0.92, 0.98, 0.75);
    }

    .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #f00;
        transition: all 0.6s linear;
        position: absolute;
        z-index: 666;
    }
}


#equipmentdetail {
    .equipmentdetail_tit {
        border-bottom: 1px solid #f1f2f9;
    }
    .detail_head {
        .silder {
            width: 380px;
            height: 282px;
            text-align: center;
            border: 1px solid #e6e6e6;
            #play {
                height: 280px !important;
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
            cursor: pointer;
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
    .aside {
        position: absolute;
        right: 60px;
        top: 60%;
        z-index: 66;
        li {
            width: 60px;
            height: 60px;
            text-align: center;
            background: #fff;
            border: 1px solid rgba(221, 221, 221, 1);
            .icon_num {
                display: inline-block;
                width: 36px;
                height: 36px;
                margin-top: 12px;
                background: url(../../../common/image/pages/yi/icon_sqqd.png)
                    no-repeat center;
                position: relative;
                .add_num {
                    position: absolute;
                    top: -6px;
                    right: -4px;
                    font-style: normal;
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    line-height: 16px;
                    color: #fff;
                    font-size: 12px;
                    background: rgba(255, 0, 0, 1);
                    opacity: 0.8;
                    border-radius: 50%;
                }
            }
            p {
                width: 30px;
                margin: 10px auto;
            }
            .icon_up {
                display: inline-block;
                width: 36px;
                height: 36px;
                margin-top: 12px;
                background: url(../../../common/image/pages/yi/icon_zd.png)
                    no-repeat center;
            }
        }
        li:first-child {
            border-bottom: none;
        }
        li:nth-child(2) {
            border-bottom: none;
        }
    }

    #sendgoods {
        padding-left: 40px;
        .table-head {
            padding-right: 17px;
            color: #000;
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            color: #333;
            background: rgba(241, 242, 249, 1);
            border: 1px solid rgba(194, 195, 195, 1);
        }
        .table-body {
            width: 100%;
            height: 400px;
            border-left: 1px solid rgba(194, 195, 195, 1);
            border-right: 1px solid rgba(194, 195, 195, 1);
            border-bottom: 1px solid rgba(194, 195, 195, 1);
            overflow-y: scroll;
            tr {
                height: 40px;
            }
        }
        .table-head table,
        .table-body table {
            width: 100%;
        }
        .table-body table tr:nth-child(2n + 1) {
            background: rgba(241, 242, 249, 1);
        }
        button {
            width: 120px;
            height: 40px;
            border-radius: 4px;
            border: none;
            font-size: 16px;
            margin-top: 30px;
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
}
</style>
