<template>
    <div>

        <ul class="aside">
            <li class="pointer" @click="eqlist">
                <span class="icon_num">
                    <i class="add_num" >{{ numbers }}</i>
                    <transition-group @before-enter='beforeEnter' @enter='enter' @after-enter='afterEnter'>
                        <div class="ball" v-for="item in balls" :key="item.id" v-show="item.show" transition='drop'>
                            <div class="inner inner-hook"></div>
                        </div>
                    </transition-group>
                </span>
            </li>
            <li class="pointer" @click="goup" id="goup"><span class="icon_up"></span></li>
            <li class="pointer" v-show="backindex" >
                <p @click='Return'>返回首页</p>
            </li>
        </ul>
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
                        <tbody v-show="layerData.length">
                            <tr v-for="(val,i) in layerData" :key='i'>
                                <td class="Color_black Ft-S16" width="150px" v-text="val.name">推车式彩超</td>
                                <td width="130px" v-text="val.model"> H2468595</td>
                                <td width="130px" v-text="val.price">50000.00</td>
                                <td width="130px" v-text="val.num">2</td>
                                <td width="110px"><span class="pointer Color_blue" @click="deldata(val.id)">删除</span></td>
                            </tr>
                        </tbody>
                        <tbody v-show="!layerData.length">
                            <tr>
                                <td class="Color_black Ft-S16" colspan="5">暂无数据</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <p class="ac">
                <span class="Mg-R24"><button class="cancel pointer" @click="close">返回</button></span>
                <span class=""><button class="send pointer"  @click="submitdata">提交</button></span>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'shoppingcart',
    props: ['num'],
    data() {
        return {
            balls: [
                { show: false, id: 1 },
                { show: false, id: 2 },
                { show: false, id: 3 }
            ],
            dropBalls: [],
            numbers: 0,             // 购物车数量
            layerData: [],          // 购物车数据
            backindex:this.$route.path=='/server/equipmenApply/equipmendetail',
        }
    },
    computed: {
        
    },
    updated () {
        
    },
    mounted() {
        var _this = this;
            this.$http.post('/shv2/deviceapply/apply_data', {}, function (res) { //  获取购物车的数据
                if (res.code == 1) {
                    _this.layerData = res.data;
                    var num = 0;
                    _this.layerData.map(val => {
                         num += val.num
                    })
                    _this.numbers = num
                } else {
                    _this.layerData = []
                    _this.numbers = 0
                }
            }, function (err) { })
    },
    methods: {
        
        Return () {
            this.$router.push('/server/equipmenApply')
        },
        submitdata() {      // 提交购物车
            var _this = this
            layui.use(["layer"], function () {
                var layer = layui.layer;
                if (_this.layerData) {
                     _this.$http.post('/shv2/deviceapply/sub_apply', {}, function (res) {
                    if (res.code == 1) {
                        _this.$emit('clickinit',1);
                         _this.goodstypes= [];
                        layer.closeAll()
                        _this.updan()
                        layer.msg(res.msg, { icon: 1, time: 1500});
                    } else {
                        layer.msg(res.msg);
                    }
                    }, function (err) { })
                }
               
            })
        },
        // 绑定在父组件上了
        initdata(id, num) {
            var _this = this
            this.$http.post('/shv2/deviceapply/add_apply', { did: id, num: num }, function (res) {//添加购物车
                if (res.code == 1) {
                   _this.updan()
                }
            }, function (err) { })
        },
        close() {
            layui.use(["layer"], function () {
                var layer = layui.layer;
                layer.closeAll()
            })
        },
        eqlist() {
            this.updan()
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
        updan() {
            var _this = this;
            this.$http.post('/shv2/deviceapply/apply_data', {}, function (res) { //  获取购物车的数据
                if (res.code == 1) {
                    _this.layerData = res.data;
                    var num = 0;
                    _this.layerData.map(val => {
                         num += val.num
                    })
                    _this.numbers = num
                } else {
                    _this.layerData = []
                    _this.numbers = 0
                }
            }, function (err) { })
        },
        deldata(id) {
            var _this = this;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                _this.$http.post('/shv2/deviceapply/del_apply', { id: id }, function (res) {// 删除购物车
                    if (res.code == 1) {
                        _this.updan()
                        layer.msg('删除成功', { icon:1, time: 1500});
                    }
                }, function (err) { })
            })
        },
        goup() {
            $(function () {
                $(window).scroll(function () {
                    if ($(document).scrollTop() == 0) {
                        $("#goup").css({ "display": "none" });
                    } else {
                        $("#goup").css({ "display": "block" });
                    }

                });
                $('#goup').click(function () {
                    if ($(document).scrollTop() > 0) {
                        $("html,body").animate({ scrollTop: '0px' }, 100);
                    }
                })
            })
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
                    var x = -(window.innerWidth - rect.left - 136)
                    var y = rect.top - 520 // 负数是从左上角往下的的方向, 正数是往上
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
        }
    }
}
</script>

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

.aside {
    position: absolute;
    right: 20px;
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
            background: url(../../common/image/pages/yi/icon_sqqd.png) no-repeat
                center;
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
            background: url(../../common/image/pages/yi/icon_zd.png) no-repeat
                center;
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
</style>
