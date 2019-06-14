<template>
    <div id="doctorAdd" class="" style="height:95%">
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
                                <input type="text" v-model="addList.true_name">
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                医生邮箱
                            </span>
                            <span class="Color_gray6">
                                <input type="text" v-model="addList.mailbox">
                            </span>
                        </p>
                    </td>
                    <td width="33.3%" rowspan="2">
                        <p>
                            <span class="Color_black totop">
                                医生简介
                            </span>
                            <span class="Color_gray6">
                                <textarea name="" v-model="addList.introduction" id="text1">山东大学齐鲁医院肝病科副主任，中华医学会感染病分会青年委员，中国医师协会感染病医师分会青年委员会，山东省医学会传染病分会青年委员会副主任委员，山东省医师协会肝病医师分会委员，山东省医学会传染病分会秘书。长期从事肝病的临床、科研及教学工作。</textarea>
                            </span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                医生职称
                            </span>
                            <span class="Color_gray6">
                                <select name="" id="" v-model="addList.grade">
                                     <option value="">请选择</option>
                                    <option :value="val.id" v-for="val in serverdata.grade" v-text="val.name"></option>
                                </select>
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                医生手机
                            </span>
                            <span class="Color_gray6">
                                <input type="text" v-model="addList.phone" maxlength="11" class="Mg-B12">
                            </span>
                        </p>
                    </td>

                </tr>
            </table>
        </div>
        <div class="bg_f Mg-B24">
            <p class="bookingorderdetail_tit Pd-B14 Pd-T14 Pd-L24 Mg-B24 Ft-S16 Color_black clear" style="line-height:38px;">关联疾病<span class="Color_red">*</span><span class="fr"><input type="text" v-model="searchname" placeholder="搜索" id="icon_right" @keypress.13="secarch"></span></p>
            <p class="filtertype Pd-L24 Pd-R24 Pd-B12 Mg-B12">
                <span class="pointer" v-for="(val,index) in tabletype" :class="{'select':inactive==val.department_id}" @click="select(val.department_id,val.diss,val.department_name)" v-text="val.department_name">呼吸内科</span>
            </p>
            <div class="select_type">
                <div class="fl div_model" v-for="(val,index) in allillness">
                    <span><input type="checkbox" class="input_check Mg-R10" :title="val" :id="index"><label :for="index" v-text="val" class="pointer"></label></span>
                </div>
            </div>
        </div>
        <div class="bg_f Mg-B24 mydiv">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">认证信息</p>
            <table class="Mg-T12">
                <tr>
                    <td width="33.3%">
                        <p class="Ft-S14">
                            <span class="Color_black">身份证号:</span>
                            <span class="Color_gray6"><input type="text" v-model="addList.IDnumber" id="idcardinp"></span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td class="Pd-T10">
                        <ul class="clear idcardphoto">
                            <li class="fl Pd-R60">
                                <el-upload
                                    class="avatar-uploader"
                                    action=''
                                    :on-change="onchange"
                                    :show-file-list="false"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    <i v-show='imageUrl' id='reset_up'>重新上传</i>
                                </el-upload>

                                <!-- <div><img style='width: 158px;height: 156px;' id="showimg" src="../../../common/image/pages/yi/00_03.jpg" alt=""><span class="reset_up">重新上传</span><input class="pointer" id="idcardz" type="file"></div> -->
                                <p class="Mg-T10 Ft-S14 Color_black">身份证正面</p>
                                <p class="line"></p>
                            </li>
                            <li class="fl Pd-L60 Pd-R60">
                                <div><img style='width: 158px;height: 156px;' id="showimg1" src="" alt=""><span class="reset_up">重新上传</span><input class="pointer" id="idcardf" type="file"></div>
                                <p class="Mg-T10 Ft-S14 Color_black">身份证反面</p>

                            </li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p class="Mg-B10 Mg-T20"><span class="Mg-R10">执业证</span><span class="uploadbth">点击上传<input type="file" id="zyz"></span></p>
                        <p class="Mg-B10"><img src="" id="zyzimg" alt=""></p>
                        <p class="Mg-B10"><span class="Mg-R10">资质证</span><span class="uploadbth">点击上传<input type="file" id="zzz"></span></p>
                        <p class="Mg-B10"><img src="" id="zzzimg" alt=""></p>
                        <p class="Mg-B10"><span class="Mg-R10">职称证</span><span class="uploadbth">点击上传<input type="file" id="zcz"></span></p>
                        <p class="Mg-B10"><img src="" id="zczimg" alt=""></p>
                    </td>
                </tr>
            </table>
        </div>
        <div class="bg_f Mg-B24">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">服务信息<span class="Color_red">*</span> </p>
            <table>
                <tr>
                    <td width="33.3%" class="Pd-T12 Pd-B12 server">
                        <span class="Color_black Ft-S14">开通服务：</span>
                        <span v-for="val in serverdata.business" class="Mg-R20">
                            <input type="checkbox" class="input_check Mg-R10" :title="val.name" :id="val.name" :alt="val.id"><label :for="val.name" v-text="val.name" class="pointer"></label>
                        </span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="bg_f">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">展示效果</p>
            <table>
                <tr>
                    <td width="33.3%" class="Pd-T12 Pd-B12">
                        <span class="Color_black Ft-S14"><span class="Color_red">*</span>是否开启推荐:</span>
                        <div class="layui-input-inline Mg-L20" style="position:relative;top:4px">
                            <input type="radio" v-model="settop" name="tuij" value="1" id="success" title="开启"><label for="success" class="Mg-R14"><span style="position:relative;top:2px">开启</span></label>
                            <input type="radio" v-model="settop" name="tuij" value="0" id="close" title="关闭"><label for="close"><span style="position:relative;top:2px">关闭</span></label>
                        </div>
                        <p class="Color_red Ft-S12">注：开启推荐优先展示</p>
                    </td>
                </tr>
            </table>
        </div>
        <p class="ac"><span class="Color_white Ft-S16 goback pointer Mg-R28" @click="go('/data/doctorList')" style="background:#fff;color:rgba(49, 150, 255, 1)!important;border:1px solid rgba(49, 150, 255, 1)">返回</span><span class="Color_white Ft-S16 goback pointer" @click="onsubmit">保存信息</span></p>
    </div>
</template>
<script>
export default {
    name: 'doctorAdd',
    data() {
        return {
            inactive: 1,//  关联疾病的选中样式
            name: '',//     
            settop: '1',//
            tabletype: '',
            allillness: '',
            selectfilter: [],
            selectfilter1: [],
            newarr: [],
            searchname: '',
            serverdata: '',
            addList: {
                true_name: '',
                phone: '',
                mailbox: '',
                grade: '',
                introduction: '',
                IDnumber: '',
            },
            imageUrl: '',    // 上传图片路径
            zcard: ''       // 图片文件路径
        }
    },
    mounted() {
        this.gettype()
    },
    methods: {
        beforeAvatarUpload(file) {  // 获取文件参数
            this.zcard = file;  
        },
      //当上传图片后，调用onchange方法，获取图片本地路径
      onchange(file,fileList){  // 
          var _this = this;
            var reader = new FileReader(); 
            reader.readAsDataURL(file.raw);
            //转base64
            reader.onload = function(e) {
                _this.imageUrl = e.target.result //将图片路径赋值给src进行预览
            }
        return false;
      },


        initdata() {    // 操作jquery
            var _this = this;
            for (var i = 0; i < $('.select_type span').length; i++) {
                $('.select_type input')[i].onchange = function () {
                    if ($(this)[0].checked) {
                        _this.selectfilter.push({ title: $(this)[0].title, id: $(this)[0].id })
                    } else {
                        _this.selectfilter.forEach((item, index) => {
                            if (item.title == $(this)[0].title) {
                                _this.selectfilter.splice(index, 1);
                            }
                        })
                    }
                }
            }
            for (var i = 0; i < $('.server .Mg-R20').length; i++) {
                $('.server input')[i].onchange = function () {
                    if ($(this)[0].checked) {
                        _this.selectfilter1.push({ title: $(this)[0].title, id: $(this)[0].alt })
                    } else {
                        _this.selectfilter1.forEach((item, index) => {
                            if (item.title == $(this)[0].title) {
                                _this.selectfilter1.splice(index, 1);
                            }
                        })
                    }
                }
            }
            $('#idcardz').on('change', function () {
                $('#showimg').attr('src', window.URL.createObjectURL(this.files[0]));
                $('#showimg').next().show()
            })
            $('#idcardf').on('change', function () {
                $('#showimg1').attr('src', window.URL.createObjectURL(this.files[0]));
                $('#showimg1').next().show()
            })
            $('#zyz').on('change', function () {
                $('#zyzimg').attr('src', window.URL.createObjectURL(this.files[0]));
            })
            $('#zzz').on('change', function () {
                $('#zzzimg').attr('src', window.URL.createObjectURL(this.files[0]));
            })
            $('#zcz').on('change', function () {
                $('#zczimg').attr('src', window.URL.createObjectURL(this.files[0]));
            })

        },
        select(num, list, name) {
            console.log(num)
            var _this = this;
            list = list.split('、');
            this.inactive = num;
            this.name = name;
            this.allillness = list;
            this.newarr = list;
            this.selectfilter = [];
            for (var i = 0; i < $('.select_type input').length; i++) {
                $('.select_type input')[i].checked = false;
            }
            setTimeout(function () {
                _this.initdata()
            }, 100)

        },
        secarch() {//筛选
            var _this = this;
            if (_this.searchname) {
                for (var i = 0; i < _this.newarr.length; i++) {
                    if (_this.newarr[i].name == _this.searchname) {
                        _this.allillness = [{ id: _this.newarr[i].id, name: _this.newarr[i].name }];
                        console.log(_this.allillness)
                    }
                }
            } else {
                _this.allillness = _this.newarr;
            }
            
        },
        gettype() { // 调取接口，获取关联数据
            var _this = this;
            layui.use(["layer"], function () {
                _this.$http.post('/shv2/data/dep_list', {}, function (res) {//
                // console.log(res)
                    if (res.code == 1) {
                        _this.tabletype = res.data;
                        _this.inactive = res.data[0].department_id; // 初始化赋值，默认第一个选中
                        var arr = res.data[0].diss.split('、')      // 得到的是字符串，转换为数组进行列表渲染
                        _this.allillness = arr;
                        _this.newarr = arr;
                        setTimeout(function () {
                            _this.initdata();
                        }, 100)
                    }
                }, function (err) { console.log(err) });
                _this.$http.post('/shv2/data/doc_type', {}, function (res) {//
                    if (res.code == 1) {
                        _this.serverdata = res.data;
                    }
                }, function (err) { console.log(err) });
            });
        },
        onsubmit() {    // 添加
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");  // 邮箱验证
            var exgphone = /^1(3|4|5|7|8)\d{9}$/;
            var cardid = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
            var _this = this;
            layui.use(["layer"], function () {
                if (!_this.addList.true_name) {
                    layui.layer.msg('请填写医生姓名')
                    return false;
                }
                if (!exgphone.test(_this.addList.phone)) {
                    layui.layer.msg('请填写医生手机号')
                    return false;
                }
                if (!_this.addList.mailbox || !reg.test(_this.addList.mailbox)) {
                    layui.layer.msg('请填写正确的邮箱')
                    return false;
                }
                if (!_this.addList.grade) {
                    layui.layer.msg('请选择职称')
                    return false;
                }
                if (!_this.addList.introduction) {
                    layui.layer.msg('请填写医生简介')
                    return false;
                }
                if (!cardid.test(_this.addList.IDnumber)) {
                    layui.layer.msg('请填写正确身份证号')
                    return false;
                }
                if (!_this.addList.true_name) {
                    layui.layer.msg('请填写医生姓名')
                    return false;
                }
                if (!$('#idcardz').val()) {
                    layui.layer.msg('请上传身份证正面')
                    return false;
                }
                if (!$('#idcardf').val()) {
                    layui.layer.msg('请上传身份证反面')
                    return false;
                }
                if (!$('#zyz').val()&&!$('#zzz').val()&&!$('#zcz').val()) {
                    layui.layer.msg('请上传执业证、资质证、职称证')
                    return false;
                }
           
            var formdata = new FormData();
            _this.selectfilter.forEach((ele, index) => {
                var arr = [];
                arr.push(ele.title);
                formdata.append("disid[]", arr);
            })
            _this.selectfilter1.forEach((ele, index) => {
                var arr = [];
                arr.push(ele.id);
                formdata.append("business[]", arr);
            })
            // $.each($('#idcardz')[0].files, function (i, file) {//证件正面
            // console.log(file)
            //     formdata.append('zcard[]', file);
            // });
            $.each($('#idcardf')[0].files, function (i, file) {//证件反面
            
                formdata.append('fcard[]', file);
            });
            $.each($('#zyz')[0].files, function (i, file) {//证件
           
                formdata.append('zyz[]', file);
            });
            $.each($('#zzz')[0].files, function (i, file) {//证件
                formdata.append('zzz[]', file);
            });
            $.each($('#zcz')[0].files, function (i, file) {//证件
                formdata.append('zcz[]', file);
            });
            
            layui.use(["layer"], function () {
                formdata.append("true_name", _this.addList.true_name);
                formdata.append("phone", _this.addList.phone);
                formdata.append("mailbox", _this.addList.mailbox);
                formdata.append("grade", _this.addList.grade);
                formdata.append("introduction", _this.addList.introduction);
                formdata.append("depid", _this.inactive);
                formdata.append("IDnumber", _this.addList.IDnumber);
                formdata.append("sort", _this.settop);
                formdata.append("zcard[]", _this.zcard);
                _this.$http.upload('/shv2/data/add_doc', formdata, function (res) {// 添加医生
                console.log(res)
                    if (res.code == 1) {
                        layer.msg(res.msg, { icon:1});
                        setTimeout(()=> {
                            _this.go('/data/doctorList')
                        }, 1000)
                    } else {
                        // layer.msg(res.msg);
                    }
                });
            });
             })
        }
    }
}
</script>
<style>
.layui-form-checkbox {
    padding-left: 25px !important;
}
input[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin-top: 0;
    background-color: #fff;
    border: 1px solid #c9c9c9;
    border-radius: 2px;
    color: #fff;
    text-align: center;
    line-height: 15px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    outline: none;
}

input[type="checkbox"]:hover {
    border-color: #43adea;
}

input[type="checkbox"]:checked {
    color: #fff;
    background-color: #43adea;
    border: 1px solid #43adea;
}

input[type="checkbox"]:after {
    content: "✔";
}
input[type="radio"] + label::before {
    content: "\a0"; /*不换行空格*/
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    width: 1em;
    height: 1em;
    margin-right: 0.4em;
    border-radius: 50%;
    border: 1px solid #3196ff;
    text-indent: 0.15em;
    line-height: 1;
}
input[type="radio"]:checked + label::before {
    background-color: #3196ff;
    background-clip: content-box;
    padding: 0.2em;
}
input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
}
</style>

<style scoped lang="less">
#doctorAdd {
    input {
        border: 1px solid #c2c3c3;
    }
    .first_tab {
        input {
            height: 34px;
            border-radius: 2px;
            margin-top: 24px;
            width: 70%;
            text-indent: 1em;
        }
        select {
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
            background: #dddddd;
        }
        #text1::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px #fff;
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
            }
        }
        .select_type {
            height: 295px;
            overflow-y: auto;
            overflow-x: hidden;
            font-size: 14px;
            color: #666;
            margin-top: 20px;
            margin-left: 24px;

            .div_model {
                width: 25%;
            }
        }
        .select_type::-webkit-scrollbar {
            width: 4px;
            height: 4px;
        }
        .select_type::-webkit-scrollbar-thumb {
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px #dddddd;
            background: #dddddd;
        }
        .select_type::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px #fff;
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
                    text-indent: 1rem;
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
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            img {
                                max-width: 100%;
                                border-radius: 8px;
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
                                display: none;
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                width: 158px;
                                height: 36px;
                                line-height: 36px;
                                background: #b1b1b1;
                                border-bottom-left-radius: 8px;
                                border-bottom-right-radius: 8px;
                                color: #fff;
                                font-size: 14px;
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
                #zyzimg,
                #zzzimg,
                #zczimg {
                    max-width: 200px;
                }
                .uploadbth {
                    position: relative;
                    display: inline-block;
                    width: 92px;
                    height: 38px;
                    line-height: 38px;
                    text-align: center;
                    color: #fff;
                    border-radius: 2px;
                    background: #2ec97a;
                    input {
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        width: 92px;
                        height: 38px;
                        opacity: 0;
                    }
                }
                .uploadbth:hover {
                    opacity: 0.8;
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

.avatar-uploader .el-upload {   // 上传图片的样式
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
#reset_up {     // 单机重新上传按钮样式
    position: absolute;
    bottom: -5px;
    display:block;
    text-align:center;
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    font-style: normal;
    color: #fff;
    background: #b1b1b1;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}
</style>
