<template>
    <div id="bookingorderdetail" class="" style="height:95%">
        <div class="bg_f Mg-B24">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">基本信息</p>
            <table class="Mg-L24 Mg-T12 table">
                <tr>
                    <td width="33.3%">
                        <p >
                            <span class="Color_black">
                                医生姓名:
                            </span>
                            <span class="Color_gray6" v-text='doctorMsg.true_name'>
                                张三
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">
                        <p >
                            <span class="Color_black">
                                医生手机:
                            </span>
                            <span class="Color_gray6" v-text='doctorMsg.phone'>
                                18588888888
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                医生邮箱:
                            </span>
                            <span class="Color_gray6" v-text='doctorMsg.mailbox'>
                                zhangsan@163.com
                            </span> </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p >
                            <span class="Color_black">
                                医生职称:
                            </span>
                            <span class="Color_gray6" v-text='doctorMsg.name'>
                                主任医师
                            </span> </p>
                    </td>
                    <td>
                        <p >
                            <span class="Color_black">
                                所属科室:
                            </span>
                            <span class="Color_gray6" v-text='doctorMsg.department_name'>
                                妇产科
                            </span>
                        </p>
                    </td>
                    <td><span></span><span></span></td>
                </tr>
            </table>
        </div>
        <div class="bg_f">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Pd-R24 Ft-S16 Color_black clear"><span class="fl">排班信息</span> <span class="fr icon_right1"><i>停</i>停诊</span><span class="fr icon_right Mg-R40"><i>普</i>普通门诊</span></p>
            <div class="Pd-L24 Pd-R24 Mg-T24">
                <table id="tab" border="1">
                    <thead>
                        <tr>
                            <td rowspan="2">排班</td>
                            <td v-for="(val,index) in datearr">
                                <span v-text="val.week">08/27</span>
                            </td>
                        </tr>
                        <tr>
                            <td v-for="(val,index) in datearr" :key='index'> <span v-text="val.date">08/27</span></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>上午</td>
                            <td v-for="(val,index) in datearr"  :key='index'>
                                <span v-for='(item, i) in normal'>
                                    <i v-if='val.date == item.date1 && item.subsection_type == val.up' class="icon_default">普</i>
                                </span>
                                 <span v-for='(sp, s) in stop' >
                                     <i v-if='val.date == sp.date2 && sp.subsection_type == val.up' class="icon_stop">停</i>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>下午</td>
                            <td v-for="(val,index) in datearr" :key='index'>
                                <span v-for='(item, i) in normal' >
                                    <i v-show='val.date == item.date1 && item.subsection_type == val.centre ' class="icon_default">普</i>
                                    
                                </span>
                                <span v-for='(sp, s) in stop' >
                                     <i v-if='val.date == sp.date2 && sp.subsection_type == val.centre' class="icon_stop">停</i>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>晚上</td>
                            <td  v-for="(val,index) in datearr" :key='index' :dtype='val.out'>
                                <span v-for='(item, i) in normal' >
                                    <i v-if='val.date == item.date1 && item.subsection_type == val.out' class="icon_default">普</i>
                                </span>
                                 <span v-for='(sp, s) in stop' >
                                     <i v-if='val.date == sp.date2 && sp.subsection_type == val.out' class="icon_stop">停</i>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
        <p class="ac"><span class="Color_white Ft-S16 goback pointer" @click="go('/server/doctorScheduling')">返回</span></p>
    </div>
</template>
<script>
export default {
    name: 'bookingorderdetail',
    data() {
        return {
            datearr: [],     // 日期
            doctorMsg: '',   // 医生信息
            normal: [],      // 正常排班数据
            stop: []         // 停诊数据
        }
    },
    mounted() {
        this.initdata();
        this.Datelist()
        
    },
    methods: {
        initdata() {
            var _this = this;
            this.$http.post('/shv2/server/doc_class', _this.$route.query , function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.doctorMsg = res.data;
                    var pu = res.normal;
                    var sp = res.stop;
                    Date.prototype.Formats = function (fmt) {    // 封装时间转换格式
                        var o = {
                            "M+": this.getMonth() + 1, //月份
                            "d+": this.getDate(), //日
                            "h+": this.getHours(), //小时
                            "m+": this.getMinutes(), //分
                            "s+": this.getSeconds(), //秒
                            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                            "S": this.getMilliseconds() //毫秒
                        };
                        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                        for (var k in o)
                            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                        return fmt;
                    };
                
                if (pu.length > 0) {    // 普通门诊
                    var time = [];
                    pu.forEach(val => {
                        var cTime = new Date(val.date1*1000).Formats("MM.dd");
                        val.date1 = cTime
                        time.push(val)
                    })
                    _this.normal = time
                } else {
                    _this.normal = pu
                }
                if (sp.length > 0) {    // 停诊
                    var timeSp = []
                    sp.forEach(val => {
                        var commonTime = new Date(val.date2*1000).Formats("MM.dd");
                        val.date2 = commonTime
                        timeSp.push(val)
                    })
                    _this.stop = timeSp;
                } else {
                    _this.stop = sp;
                }
                }
            }, function (err) { console.log(err)})
        },
        
        Datelist() {
            this.datearr;   // 空数组，用来接收时间
            var datetime = new Date().getTime();
            var onedays = 24 * 60 * 60 * 1000
            for (var i = 0; i < 20; i++) {
                var month = (new Date(datetime).getMonth() + 1 + '').length > 1 ? new Date(datetime).getMonth() + 1 : '0' + (new Date(datetime).getMonth() + 1)     // 月份
                var dates = (new Date(datetime).getDate() + '').length > 1 ? new Date(datetime).getDate() : '0' + new Date(datetime).getDate();                     // 几号
                var week = new Date(datetime).getDay();     //  星期
                switch (week) {
                    case 0: week = '周日'; break;
                    case 1: week = "周一"; break;
                    case 2: week = "周二"; break;
                    case 3: week = "周三"; break;
                    case 4: week = "周四"; break;
                    case 5: week = "周五"; break;
                    case 6: week = "周六"; break;
                }
                var dateobj = {
                    week: week,
                    date: month + '.' + dates,
                    up: 1,
                    centre: 2,
                    out: 3
                }
                this.datearr.push(dateobj);
                datetime += onedays;
            }
        },
    }
}
</script>

<style scoped lang="less">
#bookingorderdetail {
    .icon_stop {
        font-style: normal;
        display: inline-block;
        height: 28px;
        width: 28px;
        text-align: center;
        line-height: 28px;
        border-radius: 2px;
        background: #ff3131;
        font-size: 16px;
        color: #fff;
    }
    .icon_default {
        font-style: normal;
        display: inline-block;
        height: 28px;
        width: 28px;
        text-align: center;
        line-height: 28px;
        border-radius: 2px;
        background: #2ec97a;
        font-size: 16px;
        color: #fff;
    }
    div {
        border-radius: 4px;
        padding-bottom: 12px;
        .bookingorderdetail_tit {
            border-bottom: 1px solid #f1f2f9;
            i {
                font-style: normal;
                display: inline-block;
                height: 28px;
                width: 28px;
                text-align: center;
                line-height: 28px;
                margin-right: 12px;
                border-radius: 2px;
            }
            .icon_right1 {
                font-size: 14px;
                i {
                    background: #ff3131;
                    font-size: 16px;
                    color: #fff;
                }
            }
            .icon_right {
                font-size: 14px;
                i {
                    background: #2ec97a;
                    font-size: 16px;
                    color: #fff;
                }
            }
        }
        .table {
            width: 100%;
            text-align: left;
            font-size: 14px;
            color: #333;
            td {
                height: 38px;
            }
        }
        #tab {
            width: 100%;
            text-align: center;
            border: 1px solid #c2c3c3;
            border-color: #c2c3c3;
            font-size: 14px;
            color: #333;
            thead {
                td {
                    background: #f1f2f9;
                }
            }
            td {
                height: 50px;
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
