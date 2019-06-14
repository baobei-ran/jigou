<template>
    <div id="equipmentApply" class="">
        <div class="bg_f Pd-L24 Pd-T24" style="width:87.7%">
            <div class="clear Ft-S16 Pd-B24 Pd-R24">
                <span class="fl Mg-R22">医疗设备分类：</span>
                <ul class="fl head_tab">
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==0}" @click="select(0)">全部</li>
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==1}" @click="select(1)">呼吸机</li>
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==2}" @click="select(2)">监护仪</li>
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==3}" @click="select(3)">心电图机</li>
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==4}" @click="select(4)">麻醉剂</li>
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==5}" @click="select(5)">分析仪</li>
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==6}" @click="select(6)">X射线机</li>
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==7}" @click="select(7)">超声仪器</li>
                    <li class="fl pointer" :class="{'Color_blue':inactive==8}" @click="select(8)">医用病床</li>
                </ul>
                <span class="fr head_btn pointer" @click="go('/server/YaoequipmenApply/Yaoequipmenjl')">申请记录</span>
            </div>

            <ul class="good_list clear" v-if="facilityList.length">
                <li class="good_list_li ac fl Mg-R24 Mg-B24" v-for="val in facilityList" :key='val.id'>
                    <div>
                        <img :src="$http.baseURL + val.img" width="206px" height="188px" alt="">
                    </div>
                    <p class="Mg-T16 Ft-S14 Color_black">{{ val.name }}</p>
                    <p class="Mg-T10 Ft-S14 Color_orange">￥{{ val.price }}</p>
                    <span class="Mg-T12 adddan pointer" @click="godetail(val.id)">查看详情</span>
                </li>
            </ul>
            <ul class="good_list clear" v-else>
                <li class="a_center Mg-R24 Mg-B24" >
                    无数据
                </li>
            </ul>
            <div id="page" v-show='facilityList.length'  class="ac Mg-T30"></div>
        </div>
        
        <ul class="aside">
            <li class="pointer" @click="eqlist"><span class="icon_num"><i class="add_num">{{ cart.length }}</i></span></li>
            <li class="pointer"><span class="icon_up"></span></li>
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
                <span class="Mg-R24"><button class="cancel pointer">返回</button></span>
                <span class=""><button class="send pointer" @click='snbmitCart'>提交</button></span>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'equipmentApply',
    data() {
        return {
            inactive: 0,        // tab选择分类
            page:1,             // 页数
            limit: 10,          // 每页数据
            facilityList: [],   // 数据
            cart: [],           // 购物车
        }
    },
    mounted() {
        this.initlist(1);
        this.Cartdata()
    },
    methods: {
        Cartdata () {   // 购物车数据
            var _this = this;
            if (_this.cart) {
                _this.cart = []
            }
            this.$http.post('/shv2/deviceapply/apply_data',{}, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.cart = res.data
                }
            }, function (err) { console.log(err)})
        },
        initlist(num) {
            var _this = this;
            layui.use('layer', function(){
            var layer = layui.layer;
            var obj = { type: _this.inactive, page: _this.psge, limit: _this.limit }
            _this.$http.post('/shv2/deviceapply/index', obj, function(res) {
                console.log(res)
                if(res.code == 1) {
                    _this.facilityList = res.data
                    if (num == 1) {
                        _this.initdata(res.count)
                    }
                   
                }
            }, function (err) { console.log(err)})
            }); 
        },
        initdata(tatol) {
            var _this = this;
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
                    count: tatol, //数据总数，从服务端得到
                    limit: 5, //每页条数
                    layout: ["prev", "page", "next", "skip"],
                    groups: 4,
                    jump: function(obj, first){
                        if(!first){
                            _this.page = obj.curr
                            _this.initlist(obj.curr)
                        }
                    }
                });
            });
        },
        godetail(id){   // 查看详情
            this.go('/server/YaoequipmenApply/Yaoequipmendetail?id=' + id)
        },
        select(num) {
            this.inactive = num
            this.initlist(num)
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
                $('.cancel').on('click', function () {
                    layer.closeAll('page');
                })
                $(".layui-layer-title").css({
                    height: "50px",
                    background: "#ECF2FB",
                    "line-height": "50px",
                    fontSize: '18px'
                });
                $(".layui-layer-setwin").css("top", "19px");
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
        snbmitCart () {     // 提交购物车数据
            var _this = this;
            layui.use('layer', function(){
                var layer = layui.layer;
                if (_this.cart.length <= 0) {
                    return false;
                }
                _this.$http.post('/shv2/deviceapply/sub_apply', {}, function (res) {
                    console.log(res) 
                    if (res.code == 1) {
                        layer.msg(res.msg, { icon: 1, time: 1500});
                        var time = setTimeout(() => {
                            clearTimeout(time)
                            _this.Cartdata()
                        }, 1000)
                    } else {
                        layer.msg(res.msg, { icon: 2, time: 1500});
                    }
                }, function (err) { console.log(err)})
            }); 
        }
    }
}
</script>

<style scoped lang="less">
#equipmentApply {
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
                background: url(../../common/image/pages/yi/icon_sqqd.png)
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
            .icon_up {
                display: inline-block;
                width: 36px;
                height: 36px;
                margin-top: 12px;
                background: url(../../common/image/pages/yi/icon_zd.png)
                    no-repeat center;
            }
        }
        li:first-child {
            border-bottom: none;
        }
    }
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
        .a_center {
            text-align: center;
            border: 1px solid #e6e6e6;
            line-height: 40px;
        }
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
    #sendgoods {
        padding-left:40px;
        .table-head {
            padding-right: 17px;
            color: #000;
            height:50px;
            line-height: 50px;
            font-size: 16px;
            color: #333;
            background:rgba(241,242,249,1);
            border:1px solid rgba(194,195,195,1);
        }
        .table-body {
            width: 100%;
            height: 400px;
            border-left:1px solid rgba(194,195,195,1);
            border-right:1px solid rgba(194,195,195,1);
            border-bottom:1px solid rgba(194,195,195,1);
            overflow-y: scroll;
            tr{
                height: 40px;
            }
        }
        .table-head table,
        .table-body table {
            width: 100%;
        }
        .table-body table tr:nth-child(2n + 1) {
            background:rgba(241,242,249,1);
        }
        button {
            width:120px;
            height:40px;
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
