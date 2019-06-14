<template>

    <!-- 确认开通商城 -->
    <div id="yaomall" class="bg_f" style="height:100%">
        <p class="mall_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">确认开通商城</p>
        <div class="layui-form Mg-T20" >
            
            <div class="layui-form-item Mg-B24">
                <label class="layui-form-label"><span class="Color_red">*</span>店铺名称：</label>
                <div class="layui-input-inline Pd-L24" style="width:400px">
                    <input type="text" name="text" v-model='name' placeholder="请输入店铺名称" autocomplete="off" class="layui-input">
                </div>
                <div class="layui-form-mid layui-word-aux Color_red Ft-S12" v-show='isName'>该名称已被占用</div>
            </div>
            <div class="layui-form-item layui-form-text Mg-B60">
                <label class="layui-form-label" style="padding-top:0px;"><span class="Color_red">*</span>店铺展示图片：</label>
                <div class="layui-input-inline Pd-L24">
                    <div class="layui-input-inline uploadimg Mg-R24">
                        <img class="shopimg" style='width:158px;height:158px;' ref='shopimg' :src="size" alt="">
                        <div class="fileParent"><span class="Ft-S14">{{ title }}</span> <input type="file" class="pointer" id="files" placeholder="" /></div>
                        <p class="Ft-S14 Color_gray6">用于店铺展示</p>
                        <P class="Ft-S12 Color_grayA">建议尺寸：120*120</P>
                    </div>
                    <!-- <div class="layui-input-inline uploadimg">
                        <span class="Ft-S14">点击上传</span> <input type="file" class="pointer" id="2" placeholder="" />
                        <p class="Ft-S14 Color_gray6">医院信息详情页展示</p>
                        <P class="Ft-S12 Color_grayA">建议尺寸：750*340</P>
                    </div> -->
                </div>
            </div>
            <div class="layui-form-item Mg-B10">
                <label class="layui-form-label"><span class="Color_red">*</span>店铺类型：</label>
                <div class="layui-input-block Pd-L24">
                    <input type="radio" name="ls" value="连锁店" title="连锁店">
                </div>
            </div>
            <div class="layui-form-item Mg-B40">
                <label class="layui-form-label"><span class="Color_red">*</span>店铺展示服务：</label>
                <div class="layui-input-block Pd-L24">
                    <input type="radio" name="type1" value="线上物流" title="线上物流">
                    <input type="radio" name="type1" value="门店自提" title="门店自提" checked>
                    <input type="radio" name="type1" value="提供发票" title="提供发票">
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-input-block Pd-L24">
                    <button class="layui-btn onsub Ft-S16" style="background:#3196FF;width:100px;" lay-submit lay-filter="formDemo" @click='addData'>保存</button>
                    <button type="reset" class="layui-btn layui-btn-primary Mg-L24  Ft-S16" style="width:100px;" @click='empay'>取消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'yaomall',
    data() {
        return {
            name: '',         // 店铺名称
            isName: false,    //  验证店铺
            imgFile: '',      //  图片路径
            size: '',         //  图片预览路径
            title: '点击上传', //  点击上传图片的按钮
            type: '',         //  类型
            server: 2,       //  服务
        }
    },
    mounted() {
        this.$nextTick(()=> {
            this.serchStore();
        })
        this.initdata()
        
    },
    methods: {
        
        initdata() {
            var _this = this;
            layui.use([ 'layer','form'], function () {
                var form = layui.form;
                var layer = layui.layer;

                $('#files').on('change', function () {
                    _this.size = window.URL.createObjectURL(this.files[0])
                    _this.imgFile = this.files[0]
                    _this.title = '重新上传'
                    // $(this).parent().hide()
                })

                 form.on('radio', function(data){               // 监听单选按钮
			    // console.log(data.elem); //得到radio原始DOM对象
			    // console.log(data.value); //被点击的radio的value值
                    if(data.value== '连锁店'){
                        _this.type = 1
                    }else if (data.value=='线上物流') {
                    _this.server = 1
                    } else if (data.value=='门店自提') {
                        _this.server = 2
                    } else if (data.value=='提供发票') {
                        _this.server = 3
                    }
                 })



                form.render()//防止渲染失败
            });
        },

        addData () {    // 保存
            var _this = this;
            layui.use('layer', function(){
            var layer = layui.layer;
             if (!_this.name) {
                        layer.msg('请输入店铺名称')
                        return false;
                    }
                    if (!_this.imgFile) {
                        layer.msg('请上传店铺图片')
                        return false;
                    }

                    if(!_this.type) {
                        layer.msg('请选择店铺类型');
                        return false;
                    }
                                    // 药店开启接口
                    var formdata = new FormData();
                    formdata.append('name', _this.name);
                    formdata.append('label', _this.type);
                    formdata.append('business', _this.server)
                    formdata.append('pic', _this.imgFile)
                    _this.$http.upload('/shv2/store/open_store', formdata, function (res) {
                        console.log(res)
                        if (res.code == 1) {
                            layer.msg(res.msg)
                            _this.serchStore();
                        } else {
                            layer.msg(res.msg)
                        }
                    }, function (err) { console.log(err)})
            
            });   
        },
        empay () {  // 取消
            this.name = ''
            this.imgFile = ''
            this.size = ''
            this.type = ''
        },
        serchStore() {  // 查询店铺是否开启
            var _this = this;
            this.$http.post('/shv2/store/isset_store', {}, function (res) {
                console.log(res)
            if (res.code == 1) {
                _this.$router.replace('/jgmall/openmall/mallAdmin')
            } else if (res.code == 2){
                _this.$router.replace('/jgmall/openmall')
            } else {
                console.log(res)
            }
            }, function (err) { console.log(err)})
        }
    }
}
</script>

<style scoped lang="less">
#yaomall {
    .layui-unselect, .layui-form-checkbox {
        
        .layui-icon, .layui-icon-ok {
            display: none;
        }
    }
    .mall_tit {
        border-bottom: 1px solid #e6e6e6;
    }

    .layui-form {
        padding-left: 24px;
       
        div {
            .layui-form-label {
                width: 105px;
                padding-right: 0px;
                padding-left: 0px;
                color: #666;
            }
            .showimg {
                width: 158px;
                height: 158px;
            }
            .uploadimg {
                width: 158px;
                height: 158px;
                text-align: center;
                position: relative;
                border: 1px dashed #c2c2c2;
                border-radius: 4px;
                .fileParent {
                    position: absolute;
                    left: 0px;
                    top:0;
                }
                input {
                    width: 158px;
                    height: 158px;
                    opacity: 0;
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
                    left: 0px;
                    color: #c2c2c2;
                }
                p {
                    margin-top: 10px;
                }
                p:last-child {
                    margin-top: 0px;
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
                    }
                    .file-up {
                        display: block;
                        border-radius: 4px;
                        width: 150px;
                        height: 36px;
                        line-height: 36px;
                        padding-left: 28px;
                        background: #3196ff
                            url(../../../common/image/pages/account/icon_sc.png)
                            no-repeat 10px;
                        font-size: 14px;
                        color: #fff;
                        position: absolute;
                        left: 0px;
                        z-index: 0;
                    }
                }
            }
        }
    }


   
}
</style>
