<template>
    <div id="boxmechanismMsg" class="bg_f">
        <p class="mechanismMsg_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B24">
            认证机构信息
        </p>
        <div class="Pd-L24 Pd-R24">
            <div class="progress">
                <p class="bold_line"><span class="ins-line"></span></p>
                <ul class="clear pro_circle">
                    <li class="fl"><span class="active"><i></i></span>
                        <p>填写认证信息</p>
                    </li>
                    <li class="fl"><span class="end"><i></i></span>
                        <p>完善机构信息</p>
                    </li>
                    <li class="fl"><span class="end"><i></i></span>
                        <p>提交审核</p>
                    </li>
                </ul>
            </div>
            <table class="Mg-T24 layui-form">
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 机构类型：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6 layui-form-item">
                        <div class="layui-input-inline" style="width: 200px;">
                            <select name="" style="width: 200px;" lay-verify="required">
                                <option value="1">医院</option>
                                <option value="8">药店</option>
                                <option value="2">体检机构（开发中）</option>
                                <option value="3">乡镇卫生院（开发中）</option>
                                <option value="4">社区服务中心（开发中）</option>
                                <option value="5">社区服务站（开发中）</option>
                                <option value="6">村卫生室（开发中）</option>
                                <option value="7">个人诊所（开发中）</option>
                            </select>
                        </div>
                    </td>
                </tr>
            </table>
            <yi-msg v-if='type == "1" '></yi-msg>
            <yao-msg v-else-if='type == "8" '></yao-msg>
            <other-msg v-else></other-msg>
        </div>
    </div>
</template>
<script>
import YimechanismMsg from './boxMechanismMsg/YimechanismMsg'
import YaomechanismMsg from './boxMechanismMsg/YaomechanismMsg'
import OtherMsg from './boxMechanismMsg/otherMsg'
export default {
    name: 'boxMechanismMsg',
    components: {
        'yi-msg': YimechanismMsg,   // 医院
        'yao-msg': YaomechanismMsg, // 药店
        'other-msg': OtherMsg       // 其他
    },
    data() {
        return {
            type: '1',
        }
    },
    mounted() {
        var _this = this;
        function Status () {
            return _this.$http.$post('/shv2/Setting/look_hos',{},)   // 认证状态
        }
        
        function Msg () {
            return _this.$http.$post('/shv2/Setting/step', {})  // 认证信息
        }
        var user = this.localstorage.get('logindata');
        console.log(user)
        if (user && user.hospital_status == 1) {
            this.$http.all([Msg(), Status()], function (res, rea) {     // 并发请求
                if (rea.code == 1) {
                    if (rea.data.hospital_status == 1 && res.code == 224 && res.data == 8 ) {
                        _this.$router.replace('/setting/boxMechanismMsg/Yaomesuccess')       // 药店
                    } 
                    if (rea.data.hospital_status == 1 && res.code == 224 && res.data == 1) {
                        _this.$router.replace('/setting/boxMechanismMsg/mesuccess')          // 医院
                    }
                }     
            
            })
        }
        
        this.initdata()
    },
    methods: {
        initdata () {
            var _this = this;
            layui.use('form', function () {
                var form = layui.form;
                form.on('select', function(data){
                    _this.type = data.value
                }); 

                form.render();
            });
        }
    }
   
}
</script>

<style scoped lang="less">
#boxmechanismMsg {
    .mechanismMsg_tit {
        border-bottom: 1px solid #f1f2f9;
    }
    .layui-anim .layui-anim-upbit {
        font-size: 14px;
    }
    input {
        height: 36px;
        padding-left: 10px;
        border: 1px solid rgba(194, 194, 195, 1);
    }
    input:focus,
    input:hover {
        border: 1px solid rgba(194, 194, 195, 1);
    }
    .progress {
        height: 120px;
        background: rgba(234, 244, 255, 1);
        border: 1px solid rgba(49, 150, 255, 1);
        .bold_line {
            position: relative;
            width: 660px;
            margin: 0 auto;
            height: 4px;
            background: rgba(221, 221, 221, 1);
            margin-top: 47px;
        }
        .pro_circle {
            position: relative;
            top: -17px;
            width: 740px;
            margin: 0 auto;
            text-align: center;
            li {
                .after {
                    position: relative;
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    background: #3196ff;
                    border-radius: 50%;
                    margin-bottom: 9px;
                    color: #fff;
                    line-height: 30px;
                }
                .after + p {
                    color: #3196ff;
                }
                .active {
                    position: relative;
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    background: rgba(255, 255, 255, 1);
                    border: 1px solid rgba(170, 170, 170, 1);
                    border-radius: 50%;
                    margin-bottom: 9px;
                    i {
                        position: absolute;
                        top: 8px;
                        left: 8px;
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        background: rgba(49, 150, 255, 1);
                        border-radius: 50%;
                    }
                }
                .active + p {
                    color: #3196ff;
                }
                .end {
                    position: relative;
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    background: rgba(255, 255, 255, 1);
                    border: 1px solid rgba(170, 170, 170, 1);
                    border-radius: 50%;
                    margin-bottom: 9px;
                    i {
                        display: none;
                    }
                }
            }
            li:nth-child(2) {
                margin-left: 245px;
            }
            li:nth-child(3) {
                margin-left: 245px;
            }
        }
    }
    
}
</style>
