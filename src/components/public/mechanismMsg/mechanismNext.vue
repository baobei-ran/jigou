<template>
    <div id="mechanismMsg" class="bg_f">
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
            <table class="Mg-T24 mgtab">
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 业务联系人：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="layui-input-inline">
                            <input type="text" id="" v-model="tabledata.name" placeholder="请输入业务联系人姓名" style="width: 300px;" />
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 联系电话：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="layui-input-inline">
                            <input type="text" id="" maxlength="11" v-model="tabledata.mobile" placeholder="请输入业务联系人电话" style="width: 300px;" />
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 机构等级：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="layui-input-inline" style="width: 300px;">
                            <select name="" v-model="tabledata.grade" style="width: 300px;">
                                <option value=''>请选择机构等级</option>
                                <option :value="val.id" v-for="val in gradeList" v-text="val.name"></option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 医院类型：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="layui-input-inline" style="width: 300px;">
                            <select name="" v-model="tabledata.type" style="width: 300px;">
                                <option value=''>请选择医院类型</option>
                                <option :value="val.id" v-for="val in typeList" v-text="val.name">药店</option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 机构电话：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" id="" maxlength="16" v-model="tabledata.telephone" placeholder="请输入机构电话" style="width: 500px;" />
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 机构邮箱：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" id="khname" v-model="tabledata.mail" placeholder="请输入机构邮箱" style="width: 500px;" />
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 机构经营地址：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" id="" v-model="tabledata.address" placeholder="请输入机构详细经营地址" style="width: 500px;" />
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 获取经纬度：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6" >
                         <Maps @jingzhun='jingzhun'></Maps>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="Pd-L40 Pd-B24">
                        <div id="container"></div>
                    </td>
                </tr>
                <tr class="" height="182px">
                    <td width="160px" class="Ft-S14 Color_black v-top" align="right">
                        展示图片：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6 Pd-B60">

                        <div class="fl uploadimg Mg-R24">
                            <span class="Ft-S14" id="showimg3">点击上传</span> <input type="file" id="showimg" placeholder="" />
                            <p class="Ft-S14 Color_gray6">用于机构展示<br> <em class="Ft-S8 Color_grayA">建议尺寸：120*120</em></p>
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black v-top" align="right">
                        <span class="Color_red">*</span> 机构简介：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <textarea name="desc" style='width:100%;' v-model="tabledata.introduction" placeholder="请输入内容" class="layui-textarea next_textarea"></textarea>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="Pd-L44 Pd-T40">
                        <!-- <button class="Ft-S16 onsubmit pointer" :disabled='disabled' @click="sunmithos">
                            提交信息
                        </button> -->
                        <el-button type="primary" class="Ft-S16 onsubmit pointer" :disabled='disabled' @click="sunmithos" :loading="disabled">提交信息</el-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import Maps from '../map'
export default {
    name: 'mechanismMsg',
    components: {
        Maps: Maps
    },
    data() {
        return {
            centerDialogVisible: false,
            grade: '',
            lng: '',
            lat: '',
            tabledata: {//医院提交参数
                name: '',
                mobile: '',
                grade: '',
                type: '',
                telephone: '',
                mail: '',
                address: '',
                longitude: '',
                latitude: '',
                introduction: '',
                picture: ''
            },
            gradeList: '',  // 医院等级
            typeList: '',    // 医院类型
            disabled: false,     // 按钮
           
        }
    },
    mounted() {
        this.initdata();
        if (this.$route.query.hospital) {//医院加载此方法 药店else
            this.inithospital()
        }
    },
    methods: {
        jingzhun (data) {
            console.log(data)
            this.lng = data.lng;
            this.lat = data.lat
        },
        initdata() {
            var _this=this;
            layui.use(["layer", "form"], function () {
                var form = layui.form;
                
                form.render()
                 $('#showimg').on('change', function () {
                    $('#showimg3').attr('style', 'background:url(' + window.URL.createObjectURL(this.files[0]) + ');background-size:cover');
                    $('#showimg3').text('')
                })
            })
            
           
            _this.$http.post('/shv2/Setting/hos_set',{}, function (res) {
                console.log(res)
                if(res.code == 1) {
                    _this.gradeList = res.grade         
                    _this.typeList = res.type
                }
            }, function (err) { console.log(res)})
        },
        inithospital() {//初始化医院类型级别
            $('#showimg').on('change', function () {
                $('#showimg7').attr('style', 'background:url(' + window.URL.createObjectURL(this.files[0]) + ');background-size:cover');
                $('#showimg7').text('')
            })
            var _this = this
            this.$http.post('/shv2/Setting/hos_set', {}, function (res) {
                if (res.code == 1) {
                    _this.gradeList = res.grade;
                    _this.typeList = res.type;
                }
            }, function () {

            })
        },
        sunmithos() {//医院提交
            var _this = this;
            var regmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            var Regphone = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
            var isguhua = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
            layui.use(["layer"], function () {
                if (!_this.tabledata.name) {
                    layer.msg('请填写业务联系人姓名',{icon:2});
                    return false
                }
                if (!Regphone.test(_this.tabledata.mobile)) {
                    layer.msg('请填写业务联系人电话',{icon:2});
                    return false
                }
                if (!_this.tabledata.grade) {
                    layer.msg('请选择医院等级',{icon:2});
                    return false
                }
                if (!_this.tabledata.type) {
                    layer.msg('请选择机构类型',{icon:2});
                    return false
                }
                if (!Regphone.test(_this.tabledata.telephone) || !isguhua.test(_this.tabledata.telephone)) {
                    layer.msg('请填写机构电话',{icon:2});
                    return false
                }
                if (!regmail.test(_this.tabledata.mail)) {
                    layer.msg('请填写机构邮箱',{icon:2});
                    return false
                }
                if (!_this.tabledata.address) {
                    layer.msg('请填写机构经营地址',{icon:2});
                    return false
                }
                if (!_this.lng) {
                    layer.msg('请选择经度',{icon:2});
                    return false
                }
                if (!_this.lat) {
                    layer.msg('请选择纬度',{icon:2});
                    return false
                }
                if (!_this.tabledata.introduction) {
                    layer.msg('请填写机构简介',{icon:2});
                    return false
                }
                if (!$('#showimg').val()) {
                    layer.msg('请添加照片',{icon:2});
                    return false
                }
                _this.disabled = true
                var fromdata = new FormData()
                fromdata.append('name', _this.tabledata.name);
                fromdata.append('mobile', _this.tabledata.mobile);
                fromdata.append('grade', _this.tabledata.grade);
                fromdata.append('type', _this.tabledata.type);
                fromdata.append('telephone', _this.tabledata.telephone);
                fromdata.append('mail', _this.tabledata.mail);
                fromdata.append('address', _this.tabledata.address);
                fromdata.append('longitude', _this.lng);
                fromdata.append('latitude', _this.lat);
                fromdata.append('introduction', _this.tabledata.introduction);
                $.each($('#showimg')[0].files, function (i, file) {
                    fromdata.append('picture', file);
                });
                _this.$http.upload('/shv2/Setting/perfect', fromdata, function (res) {
                    if (res.code == 1) {
                        layer.msg('提交成功',{icon:1});
                        var time = setTimeout(() => {
                            _this.$router.replace('/setting/boxMechanismMsg/checkmemsg?zheng=true')
                            clearTimeout(time)
                        }, 1500)
                        
                    } else {
                        layer.msg('提交失败',{icon:2});
                        var time = setTimeout(() => {
                            _this.disabled = false
                            clearTimeout(time)
                        }, 1000);
                    }
                })
            });
        },
    }
}
</script>
<style>
.amap-sug-result {
    z-index: 54564565645;
}
#mapContainer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

#tip {
    background-color: #fff;
    border: 1px solid #ccc;
    padding-left: 10px;
    padding-right: 2px;
    position: absolute;
    min-height: 65px;
    top: 10px;
    font-size: 12px;
    right: 10px;
    border-radius: 3px;
    overflow: hidden;
    line-height: 20px;
    min-width: 400px;
}
#tip input[type="button"] {
    background-color: #0d9bf2;
    height: 25px;
    text-align: center;
    line-height: 25px;
    color: #fff;
    font-size: 12px;
    border-radius: 3px;
    outline: none;
    border: 0;
    cursor: pointer;
}

#tip input[type="text"] {
    height: 25px;
    border: 1px solid #ccc;
    padding-left: 5px;
    border-radius: 3px;
    outline: none;
}
#pos {
    height: 70px;
    background-color: #fff;
    padding-left: 10px;
    padding-right: 10px;
    position: absolute;
    font-size: 12px;
    right: 10px;
    bottom: 30px;
    border-radius: 3px;
    line-height: 30px;
    border: 1px solid #ccc;
}
#pos input {
    border: 1px solid #ddd;
    height: 23px;
    border-radius: 3px;
    outline: none;
}

#result1 {
    max-height: 300px;
}
</style>

<style scoped lang="less">
#mechanismMsg {
    #container {
        width: 800px;
        height: 400px;
    }
    .mechanismMsg_tit {
        border-bottom: 1px solid #f1f2f9;
    }
    select {
        display: block;
        height: 36px;
        padding-left: 10px;
        border: 1px solid rgba(194, 194, 195, 1);
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
            span {
                position: absolute;
                top: 0px;
                display: inline-block;
                height: 4px;
                background: rgba(49, 150, 255, 1);
                width: 330px;
            }
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
    .mgtab {
        .uploadimg {
            width: 158px;
            height: 158px;
            text-align: center;
            position: relative;
            border: 1px dashed #c2c2c2;
            border-radius: 4px;
            input {
                width: 158px;
                height: 158px;
                opacity: 0;
                position: absolute;
                left: 0px;
                z-index: 3;
            }
            span {
                display: block;
                color: #c2c2c2;
                width: 158px;
                height: 158px;
                padding-top: 100px;
                background: url(../../../common/image/pages/account/icon_pic.png)
                    no-repeat center 44px;
                position: absolute;
                z-index: 0;
                left: 0px;
            }
            p {
                margin-top: 168px;
            }
        }
       
        .onsubmit {
            width: 110px;
            text-align: center;
            background: rgba(49, 150, 255, 1);
            border-radius: 4px;
            color: #fff;
            font-size: 16px;
            border: none;
            margin-bottom: 46px;
        }

        
    }
}
</style>
