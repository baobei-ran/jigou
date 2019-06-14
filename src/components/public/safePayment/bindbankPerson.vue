<template>
    <div id="" class="">
        <div id="bindbank_card" class="bg_f Pd-B40">
            <p class="recharge_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10">
                绑定银行卡
            </p>
            <table class="Mg-T24">
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 提现账户类型：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="layui-input-inline" style="width: 200px;">
                            <select name="" id="type" lay-verify="" style="width: 200px;">
                                <option value="1">其他账户</option>
                                <!-- <option value="2">对公账户</option> -->
                                <option value="3">法人账户</option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 姓名：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" v-model='userName' placeholder="" style="width: 200px;" />
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 身份证号码：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" id="mycode" v-model='IDcard' placeholder="" style="width: 300px;" />
                    </td>
                </tr>
                <tr class="">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <p style="position:relative;top:-100px">
                            <span class="Color_red">*</span> 个人身份证照片：
                        </p>
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6 clear Pd-B30 Pd-T10">
                        <div class="fl showimg hide Mg-R36"><img src="" alt="" /></div>
                        <div class="fl uploadimg Mg-R36">
                            <div id='zcard'>
                                <img src="" alt="">
                                <span>点击上传</span><input type="file" id="zfile" placeholder="" />
                            </div>
                            <p>法人身份证正面</p>
                        </div>
                        <div class="fl showimg hide Mg-R36"><img src="" alt="" /></div>
                        <div class="fl uploadimg">
                            <div id='fcard'>
                                <img src="" alt="">
                                <span>点击上传</span> <input type="file" id="ffile" placeholder="" />
                            </div>
                            <p>法人身份证反面</p>
                        </div>
                    </td>
                </tr>
                <tr class="">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <p style="position:relative;top:-25px">
                            <span class="Color_red">*</span> 授权证明文件：
                        </p>
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="clear upflie Pd-T14" style="overflow:hidden">
                            <div class="fl">
                                <input type="file" id="uploadfile" placeholder="" />
                                <span class="file-up">{{ uptitle }}</span>
                            </div>
                            
                            <span id="getmodle" class="pointer" style="font-size:12px; color: #3196FF;margin-left: 160px; line-height: 36px;">
                                <!-- <a class="downLoad" href="../../../../static/layui/file/auth.pdf" download="" > 下载授权证明文件模板</a> -->
                                <a class="downLoad" :href="$http.baseURL+'/file/auth.pdf'" download="" target="_blank"> 下载授权证明文件模板</a>
                            </span>
                        </div>
                        <p class="Color_gray6 Mg-T10 Mg-B10" style="font-size:12px;">
                            请先下载《授权证明文件模板》后填写相关信息加盖绑定机构公章后上传
                        </p>
                        <p class="Color_gray6" style="font-size:12px;">
                            格式要求：支持 jpg、jpeg、bmp、gif、png格式照片，大小不超过2M
                        </p>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="Pd-L44 Pd-T40">
                        <button class="bankrecharge Ft-S16 " id="addsunbimt" >
                            提交信息
                        </button>
                    </td>
                </tr>
            </table>
        </div>
        <!-- <div id="layer_getcode" class="hide">
            <table class="Mg-T46 Ft-S16">
                <tr>
                    <td width="100px" align="right">手机号：</td>
                    <td width="210px" class="Pd-L40" id="layerphone">18232337779</td>
                </tr>
                <tr class="">
                    <td width="100px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 验证码：
                    </td>
                    <td class="Pd-L30 Ft-S16 Color_gray6">
                        <input type="text" id="code" placeholder="请输入验证码" style="width: 210px;height: 40px" class="Pd-L10" /><span class="getcode" id="getcode">获取验证码</span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center">
                        <button class="acitve_btn Ft-S16 Color_white Mg-T60" id="confirm">
                            确认
                        </button>
                    </td>
                </tr>
            </table>
        </div> -->
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {
            userName: '',                  //  姓名
            IDcard: '',                    // 身份证
            uptitle: '上传授权证明文件',    // 上传文件按钮
            zcard: '',                     // 身份证正面
            fcard: '',                     // 身份证反面
            upfile: '',                    // 授权证明文件
        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        test() {
            this.go('/finance/bankcardadmin/checkbank')
        },
        initdata() {
          var _this=this
          var formdata = new FormData();
            layui.use(["layer"], function () {
                var $ = layui.jquery;
                $("#type").on("change", function () {
                    if ($("#type").val() == 2) {
                        _this.go('/finance/bankcardadmin/safePayment')  // 对公账户，已隐藏
                    } else if ($("#type").val() == 3) {
                        _this.go('/finance/bankcardadmin/bindbankLegal')  // 法人账户
                    }
                });

                $('#zfile').on('change', function () {  // 身份证正面
                    $('#zcard > img').attr('src' , window.URL.createObjectURL(this.files[0]))
                    $('#zcard > span').hide()
                    $.each($('#zfile')[0].files, function (i, file) {
                        _this.zcard = file
                    })
                })

                $('#ffile').on('change', function () {  // 身份证反面
                    $('#fcard > img').attr('src' , window.URL.createObjectURL(this.files[0]))
                    $('#fcard > span').hide()
                    $.each($('#ffile')[0].files, function (i, file) {
                        _this.fcard = file
                    })
                })

                $('#uploadfile').on('change', function () {  // 授权证明文件
                    $.each($('#uploadfile')[0].files, function (i, file) {
                        //  console.log(file.type)
                        var isLt2M = file.size / 1024 / 1024 < 2;
                        if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/gif' &&  file.type !== 'image/jpeg' && file.type !== 'image/bmp') {
                            layer.msg("上传的文件格式错误");
                        } else if (!isLt2M){
                            layer.msg("文件大小不能超过2M!");
                        } else {
                            _this.upfile = file
                            if (_this.upfile) {
                                _this.uptitle = '已上传授权证明文件'
                            }
                        }
                        
                       
                    })
                })

                
                $("#addsunbimt").on("click", function () {
                    var isphone = /^1[3456789]\d{9}$/;
                    var pattern = /^([1-9]{1})(\d{14}|\d{18})$/;
                    var isIDCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                    if (!_this.userName) {
                        //姓名
                        layer.msg("请填写正确的姓名");
                        return;
                    }
                    if (!_this.IDcard || !isIDCard.test(_this.IDcard)) {
                        //身份证号码
                        layer.msg("请填写正确的身份证号码");
                        return;
                    }
                    if (!_this.zcard) {
                        layer.msg("请上传身份证正面");
                        return;
                    }
                    if (!_this.fcard) {
                        layer.msg("请上传身份证反面");
                        return;
                    }
                    if (!_this.upfile) {
                        layer.msg("请上传授权证明文件");
                        return;
                    }
                    formdata.append('name', _this.userName);
                    formdata.append('idcard', _this.IDcard)
                    formdata.append('cardpic1', _this.zcard)
                    formdata.append('cardpic2', _this.fcard)
                    formdata.append('filepic', _this.upfile)
                    
                    _this.$http.upload('/shv2/account/add_bank_person', formdata, function (res) {
                        console.log(res)
                        if (res.code == 1) {
                            layer.msg(res.msg)
                            _this.go('/finance/bankcardadmin/checkbank')    // 进入审核期
                        } else {
                            layer.msg(res.msg)
                        }
                    }, function (err) { console.log(err)} )

                

                //     $("#layerphone").text($("#phone").val()); //弹框手机号
                //     layer.load(1, {
                //         shade: [0.1, "#000"] //加载层
                //     });

                //     // layer.closeAll()//关闭弹框
                //     layer.open({
                //         type: 1,
                //         shade: false,
                //         closeBtn: 1,
                //         title: "验证码",
                //         content: $("#layer_getcode"),
                //         area: ["560px", "360px"],
                //         cancel: function () { }
                //     });
                // });
                // $("#confirm").on("click", function () {
                //     //弹出框提交
                //     if (!$("#code").val() || $("#code").val().length != 4) {
                //         //验证码
                //         layer.msg("请输入正确的验证码");
                //         return;
                //     }
                // });


                // 手机验证码操作
                // var noneclick = false;
                // $("#getcode").on("click", function () {
                //     //获取验证码

                //     if (noneclick) {
                //         return;
                //     }
                //     var time = 60;
                //     $(this).text("(60s)重获");
                //     var _this = $(this);
                //     var settime = setInterval(function () {
                //         if (!time) {
                //             noneclick = false;
                //             _this.text("重新获取");
                //             clearInterval(settime);
                //             return;
                //         }
                //         noneclick = true;
                //         time--;
                //         _this.text("(" + time + "s)重获");
                //     }, 1000);
                });




            });

        }
    }
}
</script>

<style scoped lang="less">
//绑定
#bindbank_card {
    .recharge_tit {
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
    .getcode {
        display: inline-block;
        width: 80px;
        height: 30px;
        border: 1px solid rgba(49, 150, 255, 1);
        border-radius: 4px;
        color: rgba(49, 150, 255, 1);
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        margin: 10px;
        cursor: pointer;
    }
    #addsunbimt {
        width: 110px;
        height: 40px;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        color: #fff;
        border: none;
    }
    .showimg {
        width: 158px;
        height: 158px;
    }
    .uploadimg {
        width: 158px;
        height: 200px;
        
        div {
            width: 158px;
            height: 158px;
            text-align: center;
            border: 1px dashed #e4dede;
            border-radius: 4px;
            position: relative;
            font-size:0;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                max-width: 158px;
                max-height: 158px;
                border-radius: 4px;
            }
            input {
                width: 158px;
                height: 158px;
                opacity: 0;
                position: absolute;
                left: 0px;
                top: 0px;
                z-index: 3;
                }
            span {
                display: block;
                width: 158px;
                height: 158px;
                padding-top: 100px;
                background: url(../../../common/image/pages/account/icon_pic.png)
                    no-repeat center 44px;
                position: absolute;
                z-index: 0;
                font-size: 15px;
                top: 0;
                left: 0px;
            }
        }
        p {
            margin-top: 15px;
            text-align: center;
            font-size: 15px;
        }
    }
    .upflie {
        div {
            position: relative;
            height: 36px;
            #uploadfile {
                width: 150px;
                height: 36px;
                position: absolute;
                left: 0px;
                z-index: 3;
                opacity: 0;
                cursor: pointer;
            }
            .file-up {
                display: block;
                border-radius: 4px;
                width: 150px;
                height: 36px;
                line-height: 36px;
                padding-left: 28px;
                background: #3196ff
                    url(../../../common/image/pages/account/icon_sc.png) no-repeat
                    10px;
                font-size: 14px;
                color: #fff;
                position: absolute;
                left: 0px;
                z-index: 0;
            }
        }
    }
}
.downLoad {
    color: #3196FF;
}
//绑卡页面弹框
#layer_getcode {
    input,
    input:focus,
    input:hover {
        border: 1px solid #e2e2e2;
    }
    .getcode {
        display: inline-block;
        width: 80px;
        height: 30px;
        border: 1px solid rgba(49, 150, 255, 1);
        border-radius: 4px;
        color: rgba(49, 150, 255, 1);
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        margin: 10px;
        cursor: pointer;
    }
    .acitve_btn {
        width: 140px;
        height: 40px;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        border: none;
    }
}
</style>
