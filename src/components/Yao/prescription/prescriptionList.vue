<template>
    <div id="orderList">
        <div class="pass_test" v-if='tests'>
            <span>您好，您的资料已审核通过！</span>
            <button class="layui-btn layui-btn-sm layui-btn-normal" @click='cancelTest'>我知道了</button>
        </div>
        <div  class="bg_f"  style="height:100%">
        <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">
            <span>处方单医生列表</span>
            <span class="btn_r">
                <button class="layui-btn layui-btn-normal" @click='go("/server/Yaodoctorprescription/addApply")'>处方单申请</button> 
                <button class="layui-btn layui-btn-normal" :disabled='doctorNum' :class="{'layui-btn-disabled':doctorNum}" @click='outApply'>选择处方单医生</button>
            </span>
        </p>
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab Pd-T10">
               
                <div class="layui-tab-content">
                   
                    <table class="layui-table" lay-skin="">
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td class="firstheadtd">序号</td>
                                <td>医生姓名</td>
                                <td>医生职称</td>
                                <td>医生执业医院</td>
                                <td>服务时间段</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody v-if='tableList.length'>
                            <tr class="table_con Color_black ac" v-for="(val,index) in tableList">
                                <td v-text="index+1"></td>
                                <td v-text="val.true_name"></td>
                                <td v-text='val.gname'></td>
                                <td v-text="val.hospital_name"></td>
                                <td>{{ val.busktime }} - {{ val.busjtime }}</td>
                                <td>
                                    <div class="dis_f dis_js">
                                        <p class="pointer Ft-S14 Color_blue al"  @click="delcode(val)">处方记录</p>
                                        <p class="pointer Ft-S14 Color_blue al"  v-if='val.type == 2' @click="sendgoods(val)">申诉解除关联</p>
                                        <p class="pointer Ft-S14 al"  v-if='val.type == 1'>解除关联申诉中</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="table_con Color_black ac" >
                                <td colspan='6'>暂无相关数据！<span @click='outApply' class="btns">选择处方单医生</span>后可进行处方单申请</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="page" v-show='tableList.length > 10' class="ac Mg-T30"></div>
                </div>
            </div>
        </div>




        <div id="sendgoods" class="hide">
            <div class="txt">
                <p>申请解除关联后，云医康客户会</p>
                <p>24小时内与您联系！</p>
            </div>
            <p class="clear">
               <button class="layui-btn layui-btn-normal" @click='cancel'>确定</button>
            </p>
        </div>
       
    </div>

    </div>
</template>
<script>
export default {
    name: 'orderList',
    data() {
        return {
            tests: false,        // 审核通过提示
            tableList: [],              // 数据列表
            headernum: '',
            doctorNum: true,          // 添加的医生数量
        }
    },
    mounted() {
       this.initdata()
       var self = this;
       function doctorLength() {   // 添加了几位医生
          return self.$http.$post('/shv2/Recipe/recipe_doccount')
       }
      function know () {    // 通过审核，我知道了
          return self.$http.$post('/shv2/Recipe/recipe_check')
      }
      self.$http.all([doctorLength(), know()], function (res, res2) {
          console.log(res, res2)
           if(res.code == 1) {
                if (res.data.type == 1) {
                    self.doctorNum = true
                } else {
                    self.doctorNum = false
                }
            }

            if (res2.code == 1) {
               self.tests = res2.data.if == 0 ? true : false
           }
      })
      
       
    },
    methods: {
        cancelTest() {  // 关闭审核通过提示
            this.tests = !this.tests
            var self = this;
            self.$http.post('/shv2/recipe/recipe_if', {}, function (res) {
                console.log(res)
            }, function (err) { })
        },
        initdata() {   // 数据
            var _this = this;
            layui.use("layer", function () {
                var layer = layui.layer;
                _this.$http.post('/shv2/Recipe/recipe_doc',{}, function (res) {//
                    console.log(res)
                    if (res.code == 1) {
                       _this.tableList = res.data
                    } else {
                    }
                }, function (err) { console.log(err) });

            });
        },
        outApply () {   // 进入处方单医生页
            this.go('/server/Yaodoctorprescription/prescriptionApply')
        },
        pageFun(total) {    // 分页
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
                            
                        }
                    }
                });
            });
        },
        delcode(val) { // 处方记录
           var obj = { id: val.did, busjtime: val.busjtime, busktime: val.busktime, gname: val.gname, hospital_name: val.hospital_name, true_name: val.true_name, type: val.type }
           this.$router.push({ path: '/server/Yaodoctorprescription/prescriptionRecords', query: obj })
        },
        sendgoods(val) {    // 申诉解除机构
            var _this = this;
            console.log(val)

            layui.use('layer', function(){
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.confirm('确定要解除关联吗？', {
                btn: ['确定', '取消'],  },
                function(index, layero) {
                    layer.closeAll('dialog');
                    jiechu()
                }, function(index){
                   
                });
                
                function jiechu () {
                    _this.$http.post('/shv2/Recipe/recipe_docuncoil', { id: val.did}, function (res) {
                        console.log(res)
                        if (res.code == 1) {
                            Open()
                            _this.initdata()
                        } else {
                            layer.msg('申请失败', { icon: 5});
                        }
                    }, function (err) { console.log(err)})
                }
                
                function Open () {
                    
                    layer.open({
                        type: 1,
                        shade: 0.2,
                        shadeClose: true,
                        closeBtn: 1,
                        title: '',
                        content: $("#sendgoods"),
                        area: ["400px", "300px"],
                        cancel: function () { }
                    });
                }
            
            
            })
        },
         
        cancel () {     // 取消关闭弹框
            layui.use('layer', function(){
            var layer = layui.layer;
                layer.closeAll();
            }); 
        },
      
    }
}
</script>

<style scoped lang="less">
#orderList {
    height: 100%;
    .pass_test {
        color: #3196FF;
        padding: 18px 24px;
        background: rgb(234,244,255);
        border: 1px solid #3196FF;
        margin-bottom: 20px;
    }
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
        
        .btn_r {
            float: right;
            margin-right: 30px;
            button {
                height: 33px;
                line-height: 33px;
            }
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
                border: 1px solid #DDDDDD;
                .table_headtr {
                    height: 50px;
                    background: #dae9ff;
                    td {
                        font-size: 16px;
                        border:0;
                    }
                    .firstheadtd {
                        position: relative;
                    }
                }
                tbody {
                    .table_con {
                        background: #fff;
                        tr:nth-child(even) {
                            background: #E5F0FF;
                        }
                        td {
                            padding: 20px 0px;
                            font-size: 14px;
                            border:0;
                            .btns {
                                color: #3196FF;
                                cursor: pointer;
                            }
                            .shopdetail {
                                padding: 52px 0px;
                                padding-right: 60px;
                                span:last-child {
                                    position: absolute;
                                    right: 20px;
                                }
                            }
                        }
                        
                    }
                }
            }
        }
    }
}
#sendgoods {
    padding-left: 53px;
    padding-right: 53px;
    .txt {
        padding: 80px 0;
        font-size: 16px;
    }
    p {
        text-align: center;
    }
    button {
        width: 120px;
        height: 40px;
        border-radius: 4px;
        border: none;
        font-size: 16px;
    }
    
}
</style>
