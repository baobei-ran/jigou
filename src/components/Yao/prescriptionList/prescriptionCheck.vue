<template>
    <div id="prescriptionCheck">
        <div class="tab_content">
                <div class="layui-tab-content bg_f Pd-L24 Pd-R24">
                    <table class="layui-table" lay-skin="nob" lay-even>
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td>处方订单号</td>
                                <td>处方单申请时间</td>
                                <td>处方单状态</td>
                                <td>发送医生</td>
                                <td>处方单编号</td>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td>{{ prescriptiondata.number }}</td>
                                <td>{{ prescriptiondata.creatime | moment }}</td>
                                <td>
                                    <span v-if='prescriptiondata.status == 1'>未接单</span>
                                    <span v-if='prescriptiondata.status == 2'>等待中</span>
                                    <span v-if='prescriptiondata.status == 3'>已开具</span>
                                    <span v-if='prescriptiondata.status == 4'>已拒绝</span>
                                </td>
                                <td>
                                    <div class="doctor dis_f dis_js">
                                        <ul>
                                            <li v-for='(user,index) in prescriptiondata.doc_name' :key='index'>{{ user }}</li>
                                        </ul>
                                        <ul>
                                            <li v-for='(state) in prescriptiondata.state' >
                                                <span v-if='state == 1'>未接单</span>
                                                <span v-if='state == 2'>已接单</span>
                                                <span v-if='state == 3'>已拒绝</span>
                                                <span v-if='state == 4'>已超时</span>
                                                <span v-if='state == 5'>已开具</span>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                                <td>
                                    <span v-text='prescriptiondata.order_code !=null?prescriptiondata.order_code:"---"'></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="Mg-T20 bg_f prescription">
                    <div class="orderList_tit dis_f dis_sb Pd-T20 Pd-B20 Pd-L24 Pd-R24 flex-vc">
                        <p class="Color_black Ft-S16 ">处方样式</p>
                        <div v-show='prescriptiondata.flag==1 && prescriptiondata.status == 3'>
                            <button class="layui-btn layui-btn-normal" @click='browse'>在线浏览打印</button>
                            <button class="layui-btn layui-btn-normal" @click='donwload'>下载处方单</button>
                        </div>
                    </div>
                    <!-- 处方单 -->
                <div class="prescription_box" ref='prescription_box' id='html'>
                    <div class="prescription_content">
                        <ul class="dis_f msg_title">
                            <li>
                                药店机构编码：<span>{{ num }}</span>
                            </li>
                            <li>
                                处方编号：<span>{{ prescriptiondata.order_code }}</span>
                            </li>
                            <li>
                                处方有效期：<span>{{ prescriptiondata.undue_time | moment }}</span>
                            </li>
                        </ul>
                        <h1>云医康互联网药店电子处方</h1>
                        <div class="usermsg">
                            <ul class="dis_f">
                                <li>
                                    姓名：<span>{{ prescriptiondata.name }}</span>
                                </li>
                                <li>
                                    性别：<span v-text="prescriptiondata.sex == 1? '女': '男'"></span>
                                </li>
                                <li>
                                    年龄：<span>{{ prescriptiondata.age }}</span>
                                </li>
                                <li>
                                    联系电话：<span>{{ prescriptiondata.phone }}</span>
                                </li>
                            </ul>
                            <ul class="dis_f">
                                <li>
                                    肝功能：<span v-text='prescriptiondata.liver'></span>
                                </li>
                                <li>
                                    肾功能：<span>{{ prescriptiondata.kidney }}</span>
                                </li>
                                <li>
                                    过敏史：<span>{{ prescriptiondata.allergy }}</span>
                                </li>
                                <li>
                                    备孕情况：<span>{{ prescriptiondata.yun }}</span>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    过往病史：<span>{{ prescriptiondata.ago }}</span>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    临床诊断：<span>{{ prescriptiondata.result }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="drug">
                            <p class="rp">Rp : </p>
                            <ol class="dis_f" v-for='(val,i) in prescriptiondata.recipe_eat' :key='i'>
                                <li>{{ val.name }} <span>x{{ val.num }}</span></li>
                                <li>
                                    用法：<b>{{ val.usage }}</b>
                                </li>
                            </ol>
                            
                        </div>
                        <div class="message">
                            （以下空白，手写无效）
                        </div>
                        <div class="signature">
                            <ul class="dis_f flex-vc">
                                <li>
                                    处方医师：<img :src="$http.baseURL+prescriptiondata.signpic" alt="">
                                </li>
                                <li>
                                    审核药师：<img :src="$http.baseURL+prescriptiondata.yname_pic" alt="">
                                </li>
                            </ul>
                        </div>
                        <div class="message_foot">
                            药师提示：1、请遵医嘱服药；2、请在窗口点清药品；3、发出药品不予退换
                        </div>
                    </div>
                        <div class="come" v-if='prescriptiondata.status == 4'>
                            <img src="../../../common/image/check/wtg.png" alt="">
                        </div>
                        <div class="come" v-if='prescriptiondata.flag == 2'>
                            <img src="../../../common/image/check/yswtg.png" alt="">
                        </div>
                    </div>
                </div>

                <!-- 审核未通过原因 -->
                <div class="defeated bg_f Mg-T20" v-if="prescriptiondata.flag == 2">
                    <p class="orderList_tit Color_black Ft-S16 Pd-T20 Pd-B20 Pd-L24">审核未通过原因</p>
                    <div v-if='!prescriptiondata.doc_remark.length'>无信息</div>
                    <ul v-if='prescriptiondata.doc_remark.length'>
                        <li v-for="(val,i) in prescriptiondata.doc_remark" :key='i'>{{val.name}}:<span>{{ val.remark }}</span></li>
                    </ul>
                </div>
                <div class="prescription_btn">
                    <button class="layui-btn layui-btn-normal" @click='initdata' v-show='prescriptiondata.flag == 0 && prescriptiondata.status == 3'>药师审核</button>
                    <button class="layui-btn Return_btn" @click='go("/server/YaoprescriptionList")'>返回</button>
                </div>
        </div>
        <div id="sendgoods" class="hide">
            <div>
                <p>药师审核后不可更改，是否确认</p>
                <p>审核并添加药师电子签名？</p>
            </div>
            <p class="clear">
                <span><button class="layui-btn cancel" @click='cancel(2)'>审核拒绝</button></span>
                <span><button class="layui-btn layui-btn-normal" @click="cancel(1)">审核通过</button></span>
            </p>
        </div> 
        <div id="sendgood" class="hide">
            <div class="images">
                <img src="" ref='imgs' alt="">
            </div>
            <p class="clears">
                <button class="layui-btn layui-btn-normal" @click="donwload">打印</button>
            </p>
        </div> 
    </div>
</template>
<script>
import html2canvas from 'html2canvas'
export default {
    name: 'prescriptionCheck',
    data() {
        return {
            prescriptiondata: {},   // 数据
            num: '',                // 
            doctorId: '',           // 获取id
        }
    },
    mounted() {
        this.doctorId = this.$route.query.id
        var user = this.localstorage.get('logindata')
        this.num = user.number
        this.datadetail()
    },
    methods: {
        datadetail () {
            var self = this;
            self.$http.post('/shv2/recipe/recipe_look', this.$route.query, function (res) {
                console.log(res)
                if (res.code == 1) {
                    self.prescriptiondata = res.data
                }
            }, function (err) { console.log(err)})
        },
        initdata() {    // 审核调取弹框
            var self = this;
           layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.4,
                    shadeClose: true,
                    closeBtn: 1,
                    title: "审核",
                    content: $("#sendgoods"),
                    area: ["400px", "300px"],
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
        
        cancel (num) { // 审核成功或者拒绝
            var _this = this;
            console.log(_this.doctorId, num)
            layui.use('layer', function(){
            var layer = layui.layer;
            _this.$http.post('/shv2/recipe/recipe_teacher', { id: _this.doctorId, flag: num }, function (res) {
                console.log(res)
                if (res.code == 1) {
                    layer.closeAll('page');
                    layer.msg('审核成功', {icon:1})
                    _this.datadetail()
                } else if (res.code == 3) {
                    layer.closeAll('page');
                    layer.msg('审核成功', {icon:1})
                    _this.datadetail()
                } else {
                    layer.closeAll('page');
                    layer.msg('审核失败', { icon: 2})
                }
            }, function (err) { console.log(err)})
                
            }); 
        },
         
        donwload () {
            /*图片跨域及截图模糊处理*/
            var shareContent = document.getElementById('html'),//需要截图的包裹的（原生的）DOM 对象
                width = shareContent.clientWidth,//shareContent.offsetWidth; //获取dom 宽度
                height = shareContent.clientHeight,//shareContent.offsetHeight; //获取dom 高度
                canvas = document.createElement("canvas"), //创建一个canvas节点
                scale = 4; //定义任意放大倍数 支持小数
            canvas.width = width * scale; //定义canvas 宽度 * 缩放
            canvas.height = height * scale; //定义canvas高度 *缩放
            canvas.style.width = shareContent.clientWidth * scale + "px";
            canvas.style.height = shareContent.clientHeight * scale + "px";
            canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
            var opts = {
                scale: scale, // 添加的scale 参数
                canvas: canvas, //自定义 canvas
                logging: false, //日志开关，便于查看html2canvas的内部执行流程
                width: width, //dom 原始宽度
                height: height,
                dpi: window.devicePixelRatio
                // useCORS: true // 【重要】开启跨域配置
            };
            html2canvas(shareContent,opts).then(function(canvas) {
               
                var url = canvas.toDataURL();
                var triggerDownload = $("<a>").attr("href", url).attr("download", "处方单.png").appendTo("body");
                triggerDownload[0].click();
                triggerDownload.remove();
            })
        },

        browse () { // 浏览
            var _this = this;
            var shareContent = document.getElementById('html'),//需要截图的包裹的（原生的）DOM 对象
                width = shareContent.clientWidth,//shareContent.offsetWidth; //获取dom 宽度
                height = shareContent.clientHeight,//shareContent.offsetHeight; //获取dom 高度
                canvas = document.createElement("canvas"), //创建一个canvas节点
                scale = 6; //定义任意放大倍数 支持小数
            canvas.width = width * scale; //定义canvas 宽度 * 缩放
            canvas.height = height * scale; //定义canvas高度 *缩放
            canvas.style.width = shareContent.clientWidth * scale ;
            canvas.style.height = shareContent.clientHeight * scale;
            canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
            var opts = {
                scale: scale, // 添加的scale 参数
                canvas: canvas, //自定义 canvas
                logging: true, //日志开关，便于查看html2canvas的内部执行流程
                width: width, //dom 原始宽度
                height: height,
                dpi: window.devicePixelRatio
            };
            html2canvas(shareContent,opts).then(function(canvas) {
                 var context = canvas.getContext('2d');
                // 【重要】关闭抗锯齿
                context.mozImageSmoothingEnabled = false;
                context.webkitImageSmoothingEnabled = false;
                context.msImageSmoothingEnabled = false;
                context.imageSmoothingEnabled = false;
                var url = canvas.toDataURL('image/png');
                _this.$refs.imgs.src = url
            })

             layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.4,
                    shadeClose: true,
                    closeBtn: 1,
                    title: "在线预览",
                    content: $("#sendgood"),
                    area: ["900px", "600px"],
                    cancel: function () { }
                });
            });
        }
      
    }
}
</script>

<style scoped lang="less">
#prescriptionCheck {
    padding-bottom: 20px;
    .layui-table[lay-even] tr:nth-child(even) {
        background-color: #e5f0ff;
    }
    .tab_content {
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
                        p {
                            line-height: 30px;
                        }
                        .doctor {
                            ul {
                                li {
                                    line-height: 25px;
                                }
                            }
                        }
                    }
                }
            }
        }

        .prescription {
            width:100%;
            .orderList_tit {
                border-bottom: 1px solid #F1F2F9;
            }
            .prescription_box {
                padding: 20px;
                position: relative;
                .come {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    img {
                        width: 100%;
                    }
                }
            .prescription_content {
                padding: 30px 50px;
                border:1px solid #C2C2C3;
                .msg_title {
                    li {
                        width: 30%;
                    }
                }
                h1 {
                    padding: 30px 0;
                    text-align: center;
                    font-size: 20px;
                    color: #333;
                    font-weight: 550;
                    letter-spacing:5px;
                }
                .usermsg {
                    border-bottom: 1px solid #666;
                    >ul {
                        padding-bottom: 24px;
                        li {
                            width: 22%;
                            font-size: 15px;
                            font-weight: 540;
                        }
                    }
                }
                .drug {
                    
                    .rp {
                        font-weight: 550;
                       padding: 24px 0;
                    }
                    >ol {
                        padding: 0 50px;
                        >li {
                            width: 30%;
                            line-height: 50px;
                            margin-right: 30px;
                            font-weight: 540;
                            font-size: 15px;
                            >span {
                                float: right;
                            }
                            >b {
                                font-weight: 500;
                            }
                        }
                    }
                }
                .message {
                    text-align: center;
                    margin-top: 60px;
                    margin-bottom: 12px;
                    font-size: 12px;
                }
                .signature {
                    > ul {
                        width: 100%;
                        li {
                            width: 50%;
                            >img {
                                max-width: 80px;

                            }
                        }
                    }
                }
                .message_foot {
                    margin-top: 20px;
                }
            }
        }

        }

        .defeated {
            >p {
                border-bottom: 1px solid #F1F2F9;
            }
            >ul {
                padding: 20px 24px;
                li {
                    line-height: 35px;
                    padding-left: 20px;
                    color: #333;
                    font-size: 13px;
                    span {
                        color: #666;
                    }
                }
                li:nth-child(odd) {
                    background-color: #EEEEEE;
                }
            }
        }
        .prescription_btn {
            text-align: center;
            margin-top: 20px;
            .Return_btn {
                background: #fff;
                border: 1px solid #3196FF;
                color: #3196FF;
                margin-left: 40px;
            }
        }
 
    }


    #sendgoods {
        >div {
            text-align: center;
            padding: 50px 0;
            p {
                line-height: 30px;
            }
        }
        .clear {
            text-align: center;
            width:100%;
            .cancel {
                background: #fff;
                color:#128DFF;
                border:1px solid #128DFF;
                margin-right: 20px;
            }
        }
    }

    #sendgood {
       padding: 30px;
        .images {
            width: 100%;
            height: 98%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .clears {
            text-align: center;
        }
    }
}
</style>
