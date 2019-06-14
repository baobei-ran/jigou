<template>
    <div id="app">
        <div id="myindex">
            <div class="left_ctrl">
                <div class="logo menu_hide"><img src="@/common/image/icon/logo.png" alt=""></div>
                <div class="menu_show ac" style="display:none; margin-top:17px;margin-bottom:18px"><img width="40px" src="@/common/image/icon/logo1.png" alt=""></div>
                <div class="list_box">
                    <ul class="floor_container">
                        <!-- 主菜单 -->
                        <li v-for="(list,$index) in SidebarList" :key="$index" @click="clicktoggle(list,$index)" :name="list.urlIndexof" v-if="sliderMenu">
                            <div>
                                <i :class="$index==0?'index':$index==1?'server':$index==2?'data':$index==3?'finance':$index==4?'vip':$index==5?'supply':$index==6?'msg':'setting'"></i>
                                <span class="menu_hide Overflow1">{{list.title}}</span>
                            </div>
                        </li>
                        <!-- 主菜单2 药店端-->
                        <li v-for="(list,$index) in SidebarList1" :key="$index" @click="clicktoggle(list,$index)" :name="list.urlIndexof" v-if="!sliderMenu">
                            <div>
                                <i :class="$index==0?'index':$index==1?'data':$index==2?'finance':$index==3?'statistics':$index==4?'vip':$index==5?'supply':$index==6?'server':$index==7?'msg':'setting'"></i>
                                <span class="menu_hide Overflow1">{{list.title}}</span>
                            </div>
                        </li>
                    </ul>
                    <ul class="outlogin menu_hide">
                        <li class="ac">
                            <transition name="fade">
                                <dl v-show="ShowMenu" class="bg_f">
                                    <dd class="ac pointer" @click="loginout">退出登录</dd>
                                </dl>
                            </transition>
                            <span class="pointer" @click="ShowMenu=!ShowMenu"><span v-text='hospitalName.name ? hospitalName.name: "退出"'></span><i class="layui-nav-more"></i></span>
                        </li>
                        <li class="versions">软件版本号：1.2.0</li>
                    </ul>
                    <ul class="menu_show minwidlogin hide">
                        <li class="ac">
                            <transition name="fade">
                                <dl v-show="ShowMenu">
                                    <dd class="ac pointer" @click="loginout">退出登录</dd>
                                </dl>
                            </transition>
                            <div class="menu_show pointer" @click="ShowMenu=!ShowMenu"><img src="@/common/image/icon/icon_gren.png" alt=""></div>
                        </li>
                    </ul>
                </div>
            </div>
            <transition name="fade">
                <div class="childmenu Pd-B22" v-show="childShow">
                   
                    <ul class="Mg-T60">
                        <!-- 子级菜单 -->
                        <li v-for="(val,index) in childlist" @click="childselect(val,index)" :name="val.url" class="pointer Mg-B24 Color_black Ft-S16 Pd-L30 childhover">{{val.title}}</li>
                    </ul>
                </div>
            </transition>
        </div>
        <div id="index_content" class="fl" :style="{'position':'absolute','left':pdleft, 'right':'0px'}">
            <div class="Pd-L24 Pd-R24 Mg-T24">
                <div id="viewheight">
                    
                        <router-view /> 
                    
                </div>
            </div>
        </div>
        <!-- <div style="position:absolute; z-index:6666;width:100%">
            <router-view name="login" />
        </div> -->

    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            SidebarList: [
                {
                    title: "首页",
                    urlIndexof: '',
                    children: []
                },
                {
                    title: "服务",
                    urlIndexof: 'server',
                    children: [
                        {
                            title: '预约订单',
                            url: '/server/bookingOrder',
                        },
                        {
                            title: '问诊订单',
                            url: '/server/inquiryOrder',
                        },
                        {
                            title: '医生排班',
                            url: '/server/doctorScheduling',
                        },
                        {
                            title: '医联体',
                            url: '/server/doctorParabiose',
                        },
                        {
                            title: '药联体',
                            url: '/server/drugParabiose',
                        },
                        {
                            title: '设备申请',
                            url: '/server/equipmenApply',
                        },
                        {
                            title: '服务设置',
                            url: '/server/serverSetting',
                        },

                    ]
                },
                {
                    title: "数据",
                    urlIndexof: 'data',
                    children: [
                        {
                            title: '科室列表',
                            url: '/data/departmentList',
                       },
                        {
                            title: '医生列表',
                            url: '/data/doctorList',
                        }
                    
                    ]
                },
                {
                    title: "财务",
                    urlIndexof: 'finance',
                    children: [
                        {
                            title: '鲁医通账户',
                            url: '/finance/lytAccount',
                        },
                        {
                            title: '交易帐单',
                            url: '/finance/tradingBill',
                        },
                        {
                            title: '月账单明细',
                            url: '/finance/monthBillDetail',
                        },
                        {
                            title: '充值/转入',
                            url: '/finance/recharge',
                        },
                        {
                            title: '提现/转出',
                            url: '/finance/withdrawal',
                        },
                        {
                            title: '银行卡管理',
                            url: '/finance/bankcardadmin',
                        },
                    ]
                },
                {
                    title: "会员",
                    urlIndexof: 'vip',
                    children: [
                        {
                            title: '会员',
                            url: '/vip/vipmember',
                        },
                        // {
                        //     title: '会员',
                        //     url: '',
                        // }
                    ]
                },
                {
                    title: "采购",
                    urlIndexof: 'supply',
                    children: [
                        {
                            title: '采购',
                            url: '/supply/purchase',
                        },
                        // {
                        //     title: '采购',
                        //     url: '',
                        // }
                    ]
                },
                {
                    title: "通知",
                    urlIndexof: 'message',
                    children: [
                        {
                            title: '通知',
                            url: '/message/inform',
                        },
                        // {
                        //     title: '通知',
                        //     url: '',
                        // }
                    ]
                },
                {
                    title: "设置",
                    urlIndexof: 'setting',
                    children: [
                        {
                            title: '机构信息',
                            url: '/setting/boxMechanismMsg',
                        },
                        {
                            title: '修改密码',
                            url: '/setting/changePass',
                        },
                        {
                            title: '修改手机号',
                            url: '/setting/changePhone',
                        },
                    ]
                },
            ],

            SidebarList1: [//药店端
                {
                    title: "首页",
                    urlIndexof: '',
                    children: []
                },
                {
                    title: "商城",
                    urlIndexof: 'jgmall',
                    children: [
                        {
                            title: '商品列表',
                            url: '/jgmall/goodsList',
                        },
                        {
                            title: '订单列表',
                            url: '/jgmall/List',
                        },
                        {
                            title: '商城管理',
                            url: '/jgmall/openmall',
                        },
                        {
                            title: '发货单列表',
                            url: '/jgmall/sendGoodsList',
                        },
                        {
                            title: '发货日志',
                            url: '/jgmall/sendGoodsLog',
                        },
                        {
                            title: '退款列表',
                            url: '/jgmall/refundList',
                        },
                        {
                            title: '评价管理',
                            url: '/jgmall/evaluationAdmin',
                        }
                        
                        
                    ]
                },
                {
                    title: "财务",
                    urlIndexof: 'finance',
                    children: [
                        {
                            title: '鲁医通账户',
                            url: '/finance/lytAccount',
                        },
                        {
                            title: '交易帐单',
                            url: '/finance/tradingBill',
                        },
                        {
                            title: '月账单明细',
                            url: '/finance/monthBillDetail',
                        },
                        {
                            title: '充值/转入',
                            url: '/finance/recharge',
                        },
                        {
                            title: '提现/转出',
                            url: '/finance/withdrawal',
                        },
                        {
                            title: '银行卡管理',
                            url: '/finance/bankcardadmin',
                        },
                    ]
                },
                {
                    title: "统计",
                    urlIndexof: 'statistics',
                    children: [
                        {
                            title: '统计',
                            url: '/statistics/home',
                        },
                        
                    ]
                },
                {
                    title: "会员",
                    urlIndexof: 'vip',
                    children: [
                        {
                            title: '会员',
                            url: '/vip/member',
                        },
                        
                    ]
                },
                {
                    title: "供销",
                    urlIndexof: 'supply',
                    children: [
                        {
                            title: '供销',
                            url: '/supply/marketing',
                        },
                        
                    ]
                },
                {
                    title: "服务",
                    urlIndexof: 'server',
                    children: [
                        {
                            title: '药联体',
                            url: '/server/YaodrugParabiose',
                        },
                        {
                            title: '设备申请',
                            url: '/server/YaoequipmenApply',
                        },
                        {
                            title: '处方单医生列表',
                            url: '/server/Yaodoctorprescription',
                        },
                        {
                            title:'处方单列表',
                            url: '/server/YaoprescriptionList'
                        }
                    ]
                },
                {
                    title: "通知",
                    urlIndexof: 'messages',
                    children: [
                        {
                            title: '通知',
                            url: '/messages/informMsg',
                        },
                        
                    ]
                },
                {
                    title: "设置",
                    urlIndexof: 'setting',
                    children: [
                        {
                            title: '机构信息',
                            url: '/setting/boxMechanismMsg',
                        },
                        // {
                        //     title: '店铺信息',
                        //     url: '/setting/shopMsg',
                        // },
                        {
                            title: '修改密码',
                            url: '/setting/changePass',
                        },
                        {
                            title: '修改手机号',
                            url: '/setting/changePhone',
                        },
                    ]
                },
            ],
            sliderMenu: true,//区分医院 药店菜单
            ShowMenu: false,//退出登录显示
            childShow: false,//二级菜单显示
            childlist: '',
            pdleft: '152px',//内容区距离惨淡的距离
            resize: false,//点击事件中判断当前窗口是否《1200
            isstatus: false,//认证信息审核
            hospitalName: '',
            attestation: false,     // 判断是否认证
            bedefeated: false,      // 审核失败
        }
    },
    created() {
        this.user_authentication();
        var user = this.localstorage.get('logindata');
        if (user && user.type != null ) {
            var type = Number(user.type)                // 根据type来区分医院 药店菜单
            switch(type) {
                case 1:  this.sliderMenu = true; break;   // 医院 
                case 8:  this.sliderMenu = false; break;  // 药店菜单
            }
        }
    },
    mounted() {
        this.hospitalName = this.localstorage.get('logindata') ? this.localstorage.get('logindata') : '';
        this.tabListActive();
        this.initdata()
        layui.use('element', function () {
            var element = layui.element;
        })
        $('#viewheight').css('height', window.innerHeight - 54);
        window.onresize = () => {
            if (document.body.clientWidth < 1200) {//页面width发生变化
                if (this.$route.path == '/') {
                    this.pdleft = '50px'
                } else {
                    this.pdleft = '240px'
                }
            } else {
                this.pdleft = this.$route.path == '/' ? '152px' : '342px'
            }
        }

         
    },
    watch: {
        '$route': ['tabListActive', 'isLogon'],
    },
    updated () {    // URL 变化，样式跟随变化
        this.listStyle();
    },
    methods: {
        isLogon () {    // 检测是否登录
            var logindata = this.localstorage.get('logindata'); //无登录缓存 跳转登录页面
            if (logindata == "" || logindata == null) {
                if (!window.location.href.includes("login")) {
                    console.log('未登录')
                    this.$router.replace('/login')
                }
            }
           
        },
        user_authentication () {
            var user = this.localstorage.get('logindata');
        if (user) {
            if (user.hospital_status == 1) {
                console.log(user)
                return;
            }
            var _this = this;
            function Status () {
               return _this.$http.$post('/shv2/Setting/look_hos',{})   // 认证状态
            }
            
            function Msg () {
                return _this.$http.$post('/shv2/Setting/step', {})  // 认证信息
            }

            this.$http.all([Msg(), Status()], function (res, rea) {     // 并发请求
                console.log(res, rea)
                if (res.code == 223 && res.data == 0 ) {
                        _this.attestation = true
                        _this.go('/setting/boxMechanismMsg')  // 去填写认证信息
                        return;
                } 
                if (rea.data.hospital_status !== 1) {
                    // 药店的判断
                    if (res.code == 224 && res.data == 8 && rea.data.hospital_status == 0) {
                        _this.attestation = true
                        _this.$router.replace('/setting/boxMechanismMsg/YaomechanismNext')  // 去填写认证信息
                    } else if (res.code == 224 && res.data == 8 && rea.data.hospital_status == 3) {
                        _this.$router.replace('/setting/boxMechanismMsg/Yaocheckmemsg')       // 3、药店待审核
                    } else if (res.code == 224 && res.data == 8 && rea.data.hospital_status == 2 ) {
                        _this.$router.replace('/setting/boxMechanismMsg/Yaocheckmemsg')      // 2、药店审核失败
                        _this.bedefeated = true
                    } 

                    // 医院的判断
                    if (res.code == 224 && res.data == 1 && rea.data.hospital_status == 0) {
                        _this.attestation = true
                        _this.$router.replace('/setting/boxMechanismMsg/mechanismNext')  // 去填写认证信息
                    } else if (res.code == 224 && res.data == 1 && rea.data.hospital_status == 3 ) {
                        _this.$router.replace('/setting/boxMechanismMsg/checkmemsg') // 医院待审核
                    } else if (res.code == 224 && res.data == 1 && rea.data.hospital_status == 2 ) {
                        _this.$router.replace('/setting/boxMechanismMsg/checkmemsg') // 医院审核失败
                        _this.bedefeated = true
                    }
                } else {
                    var userStatus = _this.localstorage.get('logindata')
                   if (userStatus.hospital_status !== 1) {
                       userStatus.hospital_status = 1
                       userStatus.name =  rea.data.hospital_name
                       userStatus.uid = rea.data.uid
                       userStatus.number = rea.data.hospital_number
                       userStatus.phone = rea.data.login_phone
                       userStatus.type = rea.data.htype
                       _this.localstorage.put('logindata',userStatus);
                       setTimeout(() => {
                           window.location.reload()
                       }, 30);
                   }
                }
               
            })
               
               
           
            
        } else {
            this.$router.replace('/login')
        }
        
        },
        listStyle () { // URL 变化，样式跟随变化
            var li = $('.floor_container>li');
            var _this = this;
            for (var j=0;j<li.length;j++) {   
                if (this.$route.fullPath !== '/') {
                    if (li[j].getAttribute("name") != '' && this.$route.path.includes(li[j].getAttribute("name"))) {
                        li[j].setAttribute('class', 'active')
                    } else {
                        li[j].removeAttribute('class', 'active')
                    }
                } else {
                    if (li[j].getAttribute("name") == '' && this.$route.path == '/') {
                        li[j].setAttribute('class', 'active');//首页
                    } else {
                        this.childShow = false;
                        li[j].removeAttribute('class', 'active')
                    }
                }
            }
        },
        
        tabListActive() {//页面刷新保持选中状态
            this.initdata()
            this.pdleft = this.$route.path == '/' ? document.body.clientWidth < 1200 ? '50px' : '152px' : document.body.clientWidth < 1200 ? '240px' : '342px';//侧边菜单栏根据屏幕width缩小
            var li = $('.floor_container>li');//主菜单
            var _this = this;

            for (var i = 0; i < li.length; i++) {
                if (li[i].getAttribute("name") !== '' && this.$route.path.includes(li[i].getAttribute("name"))) {
                    li[i].setAttribute('class', 'active');//属性赋值
                    _this.childShow = true;//子菜单显示
                    if (_this.sliderMenu) {//判断子菜单显示 医院或者药店
                        _this.SidebarList = _this.SidebarList
                    } else {
                        _this.SidebarList = _this.SidebarList1
                    }
                    _this.SidebarList.forEach(ele => {//匹配子菜单中数据
                        if (ele.urlIndexof == li[i].getAttribute("name")) {
                            _this.childlist = ele.children;//子菜单列表
                            setTimeout(() => {//异步
                                var childli = $('.childmenu li');//子菜单
                                ele.children.forEach((val, index) => {
                                    // childli[index].setAttribute('style', '');//子菜单初始化选中
                                    childli[index].removeAttribute('class','enter')
                                    if (_this.$route.path.includes(val.url)) {//子路由对应url
                                        // childli[index].setAttribute('style', 'color:#3196FF!important');//子菜单初始化选中
                                        childli[index].setAttribute('class', 'enter');
                                    } 
                                })
                            }, 200)
                        }
                    })
                } else {
                    if (li[i].getAttribute("name") == '' && this.$route.path == '/') {
                        li[i].setAttribute('class', 'active');//首页
                    }
                }
            }
        },
        initdata() {
            this.ShowMenu = false;
            if (this.$route.query.login) {
                this.go('/')
                window.location.reload()
            }
            var rzstatus = this.localstorage.get('logindata');
            if (rzstatus) {     // 判断是否审核通过
                if (rzstatus.hospital_status == 0 || rzstatus.hospital_status == 2 || rzstatus.hospital_status == 3  ) {
                    this.isstatus = true;
                } 
            }
        },
        loginout() {    // 退出登录
            //删除缓存
            // 
            var _this=this;
            this.$http.post('/shv2/login/quit', {}, function (res) {
                if (res.code == 1) {
                    _this.localstorage.remove('logindata');
                    // _this.localstorage.clear()
                    _this.$router.replace('/login');
                }
            }, function () { })

        },
        slideShow() {//显示退出
            this.ShowMenu = !this.ShowMenu;
        },
        clicktoggle(item, index) {//点击主菜单事件
            var _this = this;
            if (_this.isstatus) {
                layui.use(["layer"], function () {
                    var layer = layui.layer;
                    if (_this.attestation) {
                        layer.msg('请上传机构资料, 完成认证', { icon: 0})
                        return;
                    } 
                    if (_this.bedefeated) {
                        layer.msg('审核失败，请重新上传机构资料, 完成认证', { icon: 2})
                        return;
                    }
                    layer.msg('资料正在审核中', { icon: 0})
                })
                return false
            }
            var li = $('.floor_container>li');
            if (!item.children.length) {//点击主页
                this.childShow = false;
                this.go('/');
                this.pdleft = document.body.clientWidth < 1200 ? '50px' : '152px';
            } else {//其他菜单
                _this.childShow = true;
                this.childlist = item.children;
                this.pdleft = document.body.clientWidth < 1200 ? '240px' : '342px';
                this.go(item.children[0].url)//点击主菜单默认显示子菜单第一个
                setTimeout(() => {//异步
                    var childli = $('.childmenu li');//子菜单
                    for (var i = 0; i < childli.length; i++) {
                        childli[i].setAttribute('style', '');//清除样式
                    }
                    // childli[0].setAttribute('style', 'color:#3196FF!important');
                }, 200)
            }
            for (var i = 0; i < li.length; i++) {
                li[i].setAttribute('class', '');//清除样式
            }
            li[index].setAttribute('class', 'active');//当前选中

        },
        childselect(val, index) {   // 二级路由跳转
            var _this = this;
            if (_this.isstatus) {
                layui.use(["layer"], function () {
                    var layer = layui.layer;
                    if (_this.attestation) {
                        layer.msg('请上传机构资料, 完成认证', { icon: 0})
                        return;
                    }
                     if (_this.bedefeated) {
                        layer.msg('审核失败，请重新上传机构资料, 完成认证', { icon: 2})
                        return;
                    }
                    layer.msg('资料正在审核中', { icon: 0})
                })
                return false
            }
            var childli = $('.childmenu li');//子菜单
            for (var i = 0; i < childli.length; i++) {
                childli[i].setAttribute('style', '');//清除样式
            }
            this.go(val.url)    // ---》 跳转
            // childli[index].setAttribute('style', 'color:#3196FF!important');
        }
    },
    computed: {
    },
     
};
</script>

<style lang="less">
//定义变量
@sidebar_width: 152px; //左侧边栏宽度
@two_sidebar_width: 190px; //二级边栏宽度
@sidebar_bgcolor: #31333b; //左侧边栏背景色
@sidebar_color: #bfbfc1; //左侧边栏文字色
@sidebar_bgcolor_active: #4281d7; //左侧边栏激活背景色
@sidebar_color_active: #ffffff; //左侧边栏激活背景色
@bg_color: #f1f2f9; //背景及边框颜色
@login_height: 60px; //头部高度
@color3: #333; //主要文字内容 #333333
@color9: #999; //辅助文字内容 #999999
@colorb3: #b3b3b3; //提示文字内容 #b2b2b2
@font36: 36px; //36px文字大小
@font26: 26px; //26px文字大小
@font16: 16px; //16px文字大小
@font18: 18px; //18px文字大小
@font14: 14px; //14px文字大小
//左浮动
.float(left) {
    float: left;
}
.pointer {
    cursor: pointer;
}
//右浮动
.float(right) {
    float: right;
}

//统一块级元素
.float(@_) {
    display: block;
}

//图片占据父元素的100%尺寸
.img {
    display: block;
    width: 100%;
    height: 100%;
}

//相对定位
.position(r) {
    position: relative;
}

//绝对定位
.position(a) {
    position: absolute;
}

//居中
.position_center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

//倒角默认6px
.border_radius(@radius:6px) {
    -webkit-border-radius: @radius;
    -moz-border-radius: @radius;
    border-radius: @radius;
}

//上边框默认1px
.border_top(@px:1px,@type:solid,@color:@bg_color) {
    border-top: @px @type @color;
}

//下边框默认1px
.border_bottom(@px:1px,@type:solid,@color:@bg_color) {
    border-bottom: @px @type @color;
}
#myindex {
    overflow: hidden;
    height: 100vh;
    .float(left);
    .left_ctrl {
        background: @sidebar_bgcolor;
        height: 100%;
        width: @sidebar_width;
        overflow-y: auto;
        .float(left);
        .logo {
            cursor: pointer;
            height: @login_height;
            text-align: center;
            .position(r);
            & > img {
                display: block;
                width: 100px;
                height: 25px;
                .position_center;
            }
        }
        //导航列表
        .list_box {
            .floor_container {
                li {
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    .position(r);
                    cursor: pointer;
                    & > div {
                        .position(a);
                        left: 38%;
                        transform: translateX(-50%);
                        font-size: @font18;
                        display: flex;
                        align-items: center;
                        span {
                            color: @sidebar_color;
                        }
                        i {
                            display: inline-block;
                            width: 18px;
                            height: 16px;
                            background-size: 18px 16px;
                            background-repeat: no-repeat;
                            margin-right: 16px;
                            &.index {
                                background-image: url("common/image/icon/icon_fuwu_x@2x.png");
                            }
                            &.data {
                                background-image: url("common/image/icon/icon_shuju_x@2x.png");
                            }
                            &.finance {
                                background-image: url("common/image/icon/icon_caiwu_x@2x.png");
                            }

                            &.msg {
                                background-image: url("common/image/icon/icon_tzh.png");
                            }
                            &.setting {
                                background-image: url("common/image/icon/icon_szh.png");
                                background-size: 16px 16px;
                            }
                            &.statistics {
                                width: 18px;
                                height: 18px;
                                background-image: url("common/image/icon/icon_tjh.png");
                                background-size: cover;
                            }
                            &.vip {
                                width: 18px;
                                height: 18px;
                                background-image: url("common/image/icon/icon_hyh.png");
                                background-size: 18px 18px;
                            }
                            &.supply {
                                width: 18px;
                                height: 18px;
                                background-image: url("common/image/icon/icon_xgh.png");
                                background-size: 18px 18px;
                            }
                            &.server {
                                background-image: url("common/image/icon/icon_fwh.png");
                            }
                        }
                    }
                    &:hover {
                        background: @sidebar_bgcolor_active;
                        span {
                            color: @sidebar_color_active;
                        }
                        i {
                            &.index {
                                background-image: url("common/image/icon/icon_fuwu@2x.png");
                            }
                            &.data {
                                background-image: url("common/image/icon/icon_shuju@2x.png");
                            }
                            &.finance {
                                background-image: url("common/image/icon/icon_caiwu@2x.png");
                            }
                            &.msg {
                                background-image: url("common/image/icon/icon_tzb.png");
                            }
                            &.setting {
                                background-image: url("common/image/icon/icon_szb.png");
                            }
                            &.statistics {
                                background-image: url("common/image/icon/icon_tjb.png");
                            }
                            &.vip {
                                background-image: url("common/image/icon/icon_hyb.png");
                            }
                            &.supply {
                                background-image: url("common/image/icon/icon_xgb.png");
                            }
                            &.server {
                                background-image: url("common/image/icon/icon_fwb.png");
                            }
                        }
                    }
                    &.active {
                        background: @sidebar_bgcolor_active;
                        span {
                            color: @sidebar_color_active;
                        }
                        i {
                            &.index {
                                background-image: url("common/image/icon/icon_fuwu@2x.png");
                            }
                            &.data {
                                background-image: url("common/image/icon/icon_shuju@2x.png");
                            }
                            &.finance {
                                background-image: url("common/image/icon/icon_caiwu@2x.png");
                            }
                            &.msg {
                                background-image: url("common/image/icon/icon_tzb.png");
                            }
                            &.setting {
                                background-image: url("common/image/icon/icon_szb.png");
                            }
                            &.statistics {
                                background-image: url("common/image/icon/icon_tjb.png");
                            }
                            &.vip {
                                background-image: url("common/image/icon/icon_hyb.png");
                            }
                            &.supply {
                                background-image: url("common/image/icon/icon_xgb.png");
                            }
                            &.server {
                                background-image: url("common/image/icon/icon_fwb.png");
                            }
                        }
                    }
                }
            }
            .outlogin {
                position: absolute;
                bottom: 20px;
                width: 153px;
                color: #bfbfc1;
                font-size: 16px;
                padding: 10px 24px 10px 14px;

                li {
                    span {
                        display: inline-block;
                        position: relative;
                        .layui-nav-more {
                            content: "";
                            width: 0;
                            height: 0;
                            border-style: dashed dashed solid;
                            border-color: transparent transparent #fff;
                            overflow: hidden;
                            position: absolute;
                            right: -13px;
                            top: 2px;
                            border-width: 6px;
                            border-bottom-color: rgba(255, 255, 255, 0.7);
                        }
                    }

                    dl {
                        position: relative;
                        width: 100px;
                        height: 30px;
                        border-radius: 5px;
                        line-height: 30px;
                        font-size: 14px;
                        color: #333;
                        margin-bottom: 10px;
                    }
                    dl:after {
                        content: "";
                        border: 8px dashed transparent;
                        border-top: 8px solid #fff;
                        width: 0;
                        height: 0;
                        font-size: 0;
                        display: inline-block;
                        *display: inline;
                        *zoom: 1;
                        vertical-align: -3px;
                        position: absolute;
                        bottom: -15px;
                        left: 5px;
                        top: auto;
                    }
                }
                .versions {
                    font-size: 10px;
                    margin-top: 20px;
                }
            }
            .minwidlogin {
                position: absolute;
                bottom: 15px;
                width: 50px;
                color: #bfbfc1;
                font-size: 16px;
                dl {
                    position: relative;
                    left: 52px;
                    width: 100px;
                    height: 30px;
                    background: #31333b;
                    border-radius: 5px;
                    line-height: 30px;
                    font-size: 14px;
                    color: #fff;
                    margin-bottom: 0px;
                }
                dl:after {
                    content: "";
                    border: 3px dashed transparent;
                    border-top: 5px solid #31333b;
                    border-left: 3px solid #31333b;
                    // border-right:15px solid #31333b;
                    width: 0;
                    height: 0;
                    font-size: 0;
                    display: inline-block;
                    *display: inline;
                    *zoom: 1;
                    vertical-align: -3px;
                    position: absolute;
                    bottom: -6px;
                    left: 1px;
                    top: auto;
                }
            }
        }
    }
    @media (max-width: 1200px) {
        .left_ctrl {
            width: 50px;
            .float(left);
            .menu_hide {
                display: none;
            }
            .menu_show {
                display: block !important;
            }
            div {
                li {
                    i {
                        margin-right: 0px !important;
                        margin-top: 15px;
                        margin-left: 11px;
                    }
                }
            }
        }
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    .childmenu {
        width: 190px;
        height: 100vh;
        background: #fff;
        .float(left);
        .childhover:hover {
            color: #3196ff !important;
        }
        >ul {
            li {
                margin-bottom: 15px;
                padding: 7.5px 30px;
                font-size: 16px;
                cursor: pointer;
            }
        }
        .enter {
            font-size: 16px;
            font-weight: 550;
            color:#3196FF!important;
            background: rgba(49,150,255, 0.1) url("./common/image/icon/icon_enter.png") no-repeat right center;
            background-size: 13%;
            background-position: 150px 5.5px;
        }
    }
}
.el-input__inner:focus {    // 全局改变element UI 的 selece下拉框获取焦点时的边框颜色
    border-color: #e6e6e6 !important;
}
.el-input__inner {    // 全局改变element UI 的 selece下拉框获取焦点时的边框颜色
    border-color: #c2c2c3 !important;
}

#viewheight {
    overflow-y: auto;
    // height: 100%;
    overflow-x: hidden;
    background-color: #fff;
}
::-webkit-scrollbar  
{  
    width: 10px;  
    height: 10px 
}  
::-webkit-scrollbar-track  
{  
    box-shadow:0px 1px 3px rgba(0,0,0,0.3) inset;
    border-radius: 10px;  
    background-color: #fff;
}  

::-webkit-scrollbar-thumb  
{  
    box-shadow:0px 1px 3px rgba(0,0,0,0.3) inset;
    border-radius: 10px;
    background-color: #f1f1f1;  
    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%,
         rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);

}  
::-webkit-scrollbar-thumb:hover {
    background-color: #ddd;
}

// 把input中 type=number 的文本框（数字框） 去掉箭头
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"] {
    -moz-appearance: textfield;
}



</style>
