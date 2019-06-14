<template>
    <div id="doctorEdit" class="" style="height:95%">
        <div class="bg_f Pd-T12 Mg-B24">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">基本信息<span class="Color_red">*</span></p>
            <table class="first_tab">
                <tr>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                医生姓名
                            </span>
                            <span class="Color_gray6">
                                <input class='Pd-L10' v-model='editList.true_name' type="text">
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                医生邮箱
                            </span>
                            <span class="Color_gray6">
                                <input class='Pd-L10' v-model='editList.mailbox' type="text">
                            </span>
                        </p>
                    </td>
                    <td width="33.3%" rowspan="2">
                        <p>
                            <span class="Color_black totop">
                                医生简介
                            </span>
                            <span class="Color_gray6">
                                <textarea name="" v-model='editList.introduction' id="text1">山东大学齐鲁医院肝病科副主任，中华医学会感染病分会青年委员，中国医师协会感染病医师分会青年委员会，山东省医学会传染病分会青年委员会副主任委员，山东省医师协会肝病医师分会委员，山东省医学会传染病分会秘书。长期从事肝病的临床、科研及教学工作。</textarea>
                            </span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td width="33.3%">
                        <p style=''>
                            <span class="Color_black">
                                医生职称
                            </span>
                            <span class="Color_gray6">
                                <el-select class='Mg-T30' style='width:70%;' v-model="grade" placeholder="请选择">
                                <el-option
                                    v-for="item in endList.grade"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                医生手机
                            </span>
                            <span class="Color_gray6">
                                <input v-model='editList.phone' type="text" class="Mg-B12 Pd-L10">
                            </span>
                        </p>
                    </td>

                </tr>
            </table>
        </div>
        <div class="bg_f Mg-B24">
            <p class="bookingorderdetail_tit Pd-B14 Pd-T14 Pd-L24 Mg-B24 Ft-S16 Color_black clear" style="line-height:38px;">关联疾病<span class="Color_red">*</span><span class="fr"><input type="text" placeholder="搜索" id="icon_right"></span></p>
            <p class="filtertype Pd-L24 Pd-R24 Pd-B12 Mg-B12">
                <span v-for='(val,i) in depLsit' :key='i' :class="{'select':id==val.department_id}" @click='changeDep(val.department_id)'>{{ val.department_name }}</span>
                <!-- <span>呼吸内科</span>
                <span>内分泌科</span>
                <span>神经内科</span>
                <span>肾内科</span>
                <span>消化内科</span>
                <span>血液病研究所</span>
                <span>风湿免疫科</span>
                <span>肝病研究所</span>
                <span>肝病研究所</span> -->
            </p>
            <div class="select_type">
                <form class="layui-form " action="">
                    <table>
                        <tr style='width:100%;display:flex;flex-wrap:wrap;'>
                            <td style='margin-top:20px;'>
                                <el-checkbox-group 
                                    v-model="addSublevel"
                                   
                                    >
                                    <el-checkbox v-for='(val, index) in depSublevel' :key='index' :label="val" >{{ val }}</el-checkbox>
                                </el-checkbox-group>
                               
                            </td>
                            <!-- <td width="20%">
                                <input type="checkbox" name="" title="慢性支气管炎" lay-skin="primary">
                            </td>
                            <td width="20%">
                                <input type="checkbox" name="" title="慢性支气管炎" lay-skin="primary">
                            </td> -->
                        </tr>
                    </table>
                </form>
            </div>
        </div>
        <div class="bg_f Mg-B24 mydiv">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">认证信息</p>
            <table class="Mg-T12">
                <tr>
                    <td width="33.3%">
                        <p class="Ft-S14">
                            <span class="Color_black">身份证号:</span>
                            <span class="Color_gray6"><input class="Pd-L10" v-model='editList.IDnumber' type="text" id="idcardinp"></span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td class="Pd-T10">
                        <ul class="clear idcardphoto">
                            <li class="fl Pd-R60">
                                <div><img id='editImg' src="" ref='zImg' alt=""><span class="reset_up">重新上传</span><input class="pointer files1" type="file"></div>
                                <p class="Mg-T10 Ft-S14 Color_black">身份证正面</p>
                                <p class="line"></p>
                            </li>
                            <li class="fl Pd-L60 Pd-R60">
                                <div><img id='esitImg2' src="" ref='fImg' alt=""><span class="reset_up">重新上传</span><input class="pointer files2" type="file"></div>
                                <p class="Mg-T10 Ft-S14 Color_black">身份证反面</p>
                                <p class="line"></p>
                            </li>
                            <li class="fl">
                                <div class="Mg-L60"><img id='esitImg3' ref='zheng' src="" alt=""><span class="reset_up">重新上传</span><input class="pointer files3" type="file"></div>
                                <p class="Mg-T10 Mg-L30 Ft-S14 Color_black">执业证 / 资质证 / 职称证（三选一）</p>
                            </li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>
        <div class="bg_f Mg-B24">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">服务信息<span class="Color_red">*</span> </p>
            <form class="layui-form" action="">
                <table>
                    <tr>
                        <td width="33.3%" class="Pd-T12 Pd-B12">
                            <span class="Color_black Ft-S14">开通服务：</span>
                            <el-checkbox-group style='display: inline-block;' v-model='servers' >
                                <el-checkbox v-for="city in endList.business" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
                            </el-checkbox-group>
                            <!-- <input type="checkbox" class='serverNum' name="" value='1' title="预约挂号" lay-skin="primary">
                            <input type="checkbox" class='serverNum' name="" value="3" title="图文问诊" lay-skin="primary">
                            <input type="checkbox" class='serverNum' name="" value="4" title="语音问诊" lay-skin="primary">
                            <input type="checkbox" class='serverNum' name="" value="12" title="视频问诊" lay-skin="primary">
                            <input type="checkbox" class='serverNum' name="" value="2"  title="私人医生" lay-skin="primary"> -->
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="bg_f">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">展示效果</p>
            <form class="layui-form" action="">
                <table>
                    <tr>
                        <td width="33.3%" class="Pd-T12 Pd-B12">
                            <span class="Color_black Ft-S14"><span class="Color_red">*</span>是否开启推荐:</span>
                            <div class="layui-input-inline Mg-L20" style="position:relative;top:2px">
                                <input type="radio" v-model="sort" name="sex" value="1" title="开启">
                                <input type="radio" v-model="sort" name="sex" value="0" title="关闭" >
                            </div>
                            <p class="Color_red Ft-S12">注：开启推荐优先展示</p>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <p class="ac"><span class="Color_white Ft-S16 goback pointer Mg-R28" @click="go('/data/doctorList')" style="background:#fff;color:rgba(49, 150, 255, 1)!important;border:1px solid rgba(49, 150, 255, 1)">返回</span><span class="Color_white Ft-S16 goback pointer" @click="onsubmit">保存信息</span></p>
    </div>
</template>
<script>
export default {
    name: 'doctorEdit',
    data() {
        return {
            editList: '',
            endList: '',  // 医生职称和医生服务
            depLsit: '',    // 获取科室，关联疾病
            id: '',         // class 绑定使用
            depSublevel: '',    // 关联疾病, 子级列表
            addSublevel: [],    // 选中的放入这里
            zCard: '',          // 身份证正面
            fCard: '',          // 身份证反面
            SSScard: '',         // 三选一证图
            sort: '1',           //  是否开启推荐
            grade: '',          // 获取职称id
            servers: [],        // 选择服务
            
        }
    },
    mounted() {
        this.initdata()
        var _this = this;   
        this.$http.post('/shv2/data/dep_list', {}, function (res) {         // 获取科室，关联疾病
            // console.log(res)
            if (res.code == 1) {
                _this.depLsit = res.data
            }
        }, (err) => { console.log(err)})
    },
    methods: {
        initdata() {
            var _this = this;
            layui.use('form', function () {
                var form = layui.form;
                
                _this.$http.post('/shv2/data/doc_look', _this.$route.query, function (res) {    //  传递 id 获取对应详情
                    var code = res.code.toString()
                    // console.log(res)
                    if (code.includes('1')) {
                        _this.editList = res.data
                        res.data.business.forEach(val => {
                            _this.servers.push(Number(val))
                        })
                        // console.log(_this.servers)
                        // console.log(_this.editList)
                        var list = _this.endList.grade
                        for (var k in list) {
                            if (_this.editList.name == list[k].name) {
                                _this.grade = list[k].id
                            }
                        }
                        
                        
                        _this.sort = res.data.sort
                        _this.id=res.data.tid       // 科室id
                        if (res.data.zcard) {
                            _this.zCard = res.data.zcard
                            _this.$refs.zImg.src = _this.$http.baseURL + res.data.zcard     // 身份证正面
                        }
                        if (res.data.fcard) {
                            _this.fCard = res.data.fcard
                            _this.$refs.fImg.src = _this.$http.baseURL + res.data.fcard      // 身份正反面
                        }

                        if (res.data.zcz.length > 0) {
                            _this.SSScard = res.data.zcz[0].img
                            _this.$refs.zheng.src = _this.$http.baseURL + res.data.zcz[0].img     // 获取三证中的职称证
                        }
                        
                        if (res.data.tid) {         // 找出医生职称
                            setTimeout(() => {
                            var keshi = '';
                            for(var i=0;i<_this.depLsit.length;i++) {
                                if(res.data.tid == _this.depLsit[i].department_id) {
                                    keshi = _this.depLsit[i]
                                }
                            }
                            _this.depSublevel = keshi.diss.split('、')      // 把对应别的找出，渲染到页面
                            _this.addSublevel = res.data.title.split(',')   // 这是获取的
                        }, 30)
                        }
                    }
                }, function (res) { console.log(res) })


                $('.files1').on('change', function () {
                    $('#editImg').attr('src', window.URL.createObjectURL(this.files[0]))
                    _this.zCard = this.files[0]
                })

                $('.files2').on('change', function () {
                    $('#esitImg2').attr('src', window.URL.createObjectURL(this.files[0]))
                    _this.fCard = this.files[0]
                })

                $('.files3').on('change', function () {
                    $('#esitImg3').attr('src', window.URL.createObjectURL(this.files[0]))
                    _this.SSScard = this.files[0]
                })

                form.on('radio', function (data) {
                     var sex = data.value;
                       _this.sort = sex
                })

                

                _this.$http.post('shv2/data/doc_type', {}, function (res) {        //  获取医生职称
                    var code = res.code.toString()
                    if (code.includes('1')) {
                        _this.endList = res.data
                        // console.log(res)
                    }
                }, function (err) { console.log(err)})


                form.render();
            });
        },
        onsubmit() {    // 保存、提交
            console.log(this.editList)
            
            var _this = this;
            layui.use('layer', function(){
            var layer = layui.layer;
            var list = _this.editList;
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");  // 邮箱验证
            var exgphone = /^1(3|4|5|7|8|9)\d{9}$/;
            var cardid = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
            console.log(list.name)
            if (!list.true_name) {
                layer.msg('请输入真实姓名！')
                return false;
            }
            if (!list.mailbox || !reg.test(list.mailbox)) {
                layer.msg('请输入正确邮箱！')
                return false;
            }
            if (!_this.grade) {
                layer.msg('请选择医生职称！')
                return false;
            }
            if (!list.phone || !exgphone.test(list.phone)) {
                layer.msg('请输入正确手机号！')
                return false;
            }
            if (!list.introduction) {
                layer.msg('请来一段简介！')
                return false;
            }
            if (!_this.id || _this.addSublevel < 0) {
                layer.msg('请选择疾病！')
                return false;
            }
            if (!list.IDnumber || !cardid.test(list.IDnumber)) {
                layer.msg('请输入正确身份证号')
                return false;
            }
            if (!_this.zCard) {
                layer.msg('请上传身份证正面')
                return false;
            }
            if (!_this.fCard) {
                layer.msg('请上传身份证反面')
                return false;
            }
            if (!list.business) {
                layer.msg('请选择一项服务')
                return false;
            }
            var formdata = new FormData();
                formdata.append('id', list.did)
                formdata.append('true_name', list.true_name)
                formdata.append('phone', list.phone)
                formdata.append('mailbox', list.mailbox)
                formdata.append('grade', _this.grade)
                formdata.append('introduction', list.introduction)
                formdata.append('depid', _this.id)
                formdata.append('disid[]', _this.addSublevel)
                formdata.append('IDnumber', list.IDnumber)
                formdata.append('business[]', _this.servers)         // 服务信息
                formdata.append('sort', _this.sort)
                formdata.append('zcard[]', _this.zCard)
                formdata.append('fcard[]', _this.fCard)
                formdata.append('zcz[]', _this.SSScard)
                _this.$http.upload('/shv2/data/edit_doc', formdata, function (res) {
                    console.log(res)
                    if(res.code == 1) {
                        layer.msg(res.msg, { icon: 1});
                        var time = setTimeout(() => {
                            clearTimeout(time)
                            _this.go('/data/doctorList')
                        }, 1000)
                    } else {
                        layer.msg(res.msg);
                    }
                }, function (err) { console.log(err)})
            
            });  
        },

        changeDep(id) {       
            this.id = id                  // 关联疾病联动
            var dep = this.depLsit
            this.addSublevel = []
            for(var i=0; i< dep.length;i++) {
                if (id == dep[i].department_id) {
                    this.depSublevel = dep[i].diss
                }
            }
            this.depSublevel = this.depSublevel.split('、')
        },
         
    }
}
</script>
<style>
.layui-form-checkbox {
    padding-left: 25px !important;
}
</style>

<style scoped lang="less">
#doctorEdit {
    input {
        border: 1px solid #c2c3c3;
    }
    #editImg, #esitImg2, #esitImg3 {
        width: 158px;
        height: 158px;
        margin-top: 0;
        display: block;
        border-radius: 6px;
    }
    .first_tab {
        input {
            height: 34px;
            border-radius: 2px;
            margin-top: 24px;
            width: 70%;
        }
        .totop {
            position: relative;
            top: -80px;
        }
        #text1 {
            height: 100px;
            margin-top: 24px;
            width: 70%;
            resize: none;
            padding: 11px;
        }
        #text1::-webkit-scrollbar {
            width: 4px;
            height: 4px;
        }
        #text1::-webkit-scrollbar-thumb {
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px #dddddd;
            box-shadow: inset 0 0 5px #dddddd;
            background: #dddddd;
        }
        #text1::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px #fff;
            box-shadow: inset 0 0 5px #fff;
            border-radius: 0;
            background: #fff;
        }
    }
    div {
        border-radius: 4px;
        padding-bottom: 12px;
        .bookingorderdetail_tit {
            border-bottom: 1px solid #f1f2f9;
            #icon_right {
                width: 240px;
                height: 34px;
                text-align: left;
                padding-left: 10px;
                border: 1px solid #c2c3c3 !important;
                margin-right: 24px;
                border-radius: 2px;
            }
        }
        .filtertype {
            border-bottom: 1px solid #e6e6e6;
            .select {
                background: #3196ff !important;
                color: #fff;
                cursor: pointer;
            }
            span {
                display: inline-block;
                padding: 0px 22px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                background: rgba(241, 242, 250, 1);
                border-radius: 4px;
                font-size: 14px;
                color: #666;
                margin-right: 12px;
                margin-bottom: 12px;
                cursor: pointer;
            }
        }
        .select_type {
            height: 295px;
            overflow-y: auto;
            overflow-x: hidden;
            font-size: 14px;
            color: #666;
        }
        .select_type::-webkit-scrollbar {
            width: 4px;
            height: 4px;
        }
        .select_type::-webkit-scrollbar-thumb {
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px #dddddd;
            box-shadow: inset 0 0 5px #dddddd;
            background: #dddddd;
        }
        .select_type::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px #fff;
            box-shadow: inset 0 0 5px #fff;
            border-radius: 0;
            background: #fff;
        }
        table {
            width: 100%;
            text-align: left;
            margin-left: 24px;
            font-size: 14px;
            color: #333;
            td {
                height: 38px;
                .tab_type {
                    display: inline-block;
                    height: 36px;
                    line-height: 36px;
                    background: #eff7ff;
                    border: 1px solid rgba(49, 150, 255, 1);
                    font-size: 14px;
                    color: rgba(49, 150, 255, 1);
                    border-radius: 4px;
                    padding: 0px 10px 0px 15px;
                    .close_icon {
                        font-weight: 600;
                        border-left: 1px solid rgba(49, 150, 255, 1);
                        margin-left: 14px;
                        padding-left: 10px;
                        font-size: 16px;
                    }
                }
                #idcardinp {
                    border: 1px solid #c2c3c3;
                    height: 34px;
                    border-radius: 2px;
                    margin-bottom: 12px;
                    width: 25%;
                }
                .idcardphoto {
                    li {
                        position: relative;
                        text-align: center;
                        div {
                            width: 158px;
                            height: 158px;
                            border: 1px dashed #c2c2c2;
                            border-radius: 8px;
                            position: relative;
                            img{
                                margin-top:20px;
                            }
                            input[type="file"] {
                                position: absolute;
                                z-index: 66;
                                top: 0;
                                left: 0;
                                bottom: 0;
                                width: 158px;
                                opacity: 0;
                            }
                            .reset_up {
                                position: absolute;
                                bottom: -2px;
                                left: 0;
                                display: inline-block;
                                width: 158px;
                                height: 36px;
                                line-height: 36px;
                                background: #B1B1B1;
                                border-bottom-left-radius: 8px;
                                border-bottom-right-radius: 8px;
                                color: #fff;
                                font-size: 14px
                            }
                        }
                        .line {
                            position: absolute;
                            z-index: 66;
                            height: 60px;
                            width: 1px;
                            background: #dddddd;
                            right: 0px;
                            top: 50px;
                        }
                    }
                }
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
