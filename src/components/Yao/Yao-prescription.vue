<template>
    <!-- 处方单医生列表 -->
    <div class="perscription bg_f Pd-B40">
        <p class="perscription_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">资料上传</p>
        <div class="content Pd-L24 Pd-R24 Mg-T20">
            <div class="msg" v-show='status'>
                您好，您的资料正在审核中，请耐心等待！
            </div>
            <div class="msg" v-show='status2'>
                您好，您的资料审核未通过，请重新上传！
                <p>未通过原因：{{ failed }}！</p>
            </div>
            <div class="Ft-S15">
                <span class="Color_red">*</span> 资料上传：
                <span class="Color_red Pd-L20 Ft-S14" >请上传小于5MB的jpg/jpeg/png格式的图片，图片细节必须清晰可见</span>
            </div>
            <div class="files Mg-T20">
                <dl>
                    <dt>
                        <img :src="img1" alt="">
                        <div v-show='fileStatus'>
                            <label for="file1">{{ labelTxt }}</label>
                            <input id='file1' @change='addfiles1'  multiple="multiple" accept=".png, .jpg, .jpeg" type="file">
                        </div>
                    </dt>
                    <dd>药师资格证</dd>
                </dl>
                <dl>
                    <dt>
                        <img :src="img2" alt="">
                        <div  v-show='fileStatus2'>
                            <label for="file2">{{ labelTxt2 }}</label>
                            <input id='file2' @change='addfiles2'  multiple="multiple" accept=".png, .jpg, .jpeg" type="file">
                        </div>
                    </dt>
                    <dd>药师签名</dd>
                </dl>
            </div>
            <p class="txt Ft-S14 Pd-T24 Pd-B24 Pd-L24">注：持有药师资格证的药师人员必须为当前药房工作人员药师签名由药师在白色背景纸张上书写清晰可辨的药师真实签名后拍照</p>

            <span v-show='disBtn' class="btn"><button class="layui-btn layui-btn-normal" @click="submitFile" :disabled='btnss' :class='{ "layui-btn-disabled": btnss }'>立即提交</button></span>
        </div>
    </div>
</template>
<script>
import { fail } from 'assert';
export default {
        data () {
            return {
                img1: '',           //  显示预览
                img2: '',           // 显示预览图
                btnss: true,        // 按钮类名绑定
                labelTxt: '点击上传',
                labelTxt2: '点击上传',
                files1: '',         //   上传图
                files2: '',         //  上传签名图
                status: false,      // 审核中
                status2: false,     // 审核失败
                fileStatus: true,   //  控制文件上传按钮1 
                fileStatus2: true,  //  控制文件上传按钮2
                failed: '',         // 审核失败留言
                disBtn: true,       // 提交按钮
                times: '',          // 实时监测
            }
        },
        mounted () {
            var _this = this;
            _this.$http.post('/shv2/Recipe/recipe_check', {}, function (res) {
                if (res.code == 1) {
                    if (res.code == 2) {    // 如果已经审核通过的直接跳转
                       _this.$router.replace({ path: '/server/Yaodoctorprescription/prescriptionList'})
                    } else {
                         _this.Userdata();
                        _this.times = setInterval(() => {
                            _this.Userdata();    // 查看是否已提交了资料
                        }, 3000)
                    }
                }
            }, function (err) { console.log(err)})
        },
        methods: {
            addfiles1 (event) {
                var files = event.target.files[0];  
                if (files) {   // 是否有文件
                    if(files.size > 1024 * 1024 * 5) {    
                        alert('图片大小不能超过 5MB!');
                        return false;
                    }
                    var URL = window.URL || window.webkitURL; 
                    var url = URL.createObjectURL(files)        
                    this.img1 = url
                    this.files1 = files
                    this.labelTxt = '重新上传'
                    if (this.img1 && this.img2) {
                        this.btnss = false
                    }
                }
            },
            addfiles2 (event) {
                var files = event.target.files[0];
                if (files) {
                    if(files.size > 1024 * 1024 * 5) {
                        alert('图片大小不能超过 5MB!');
                        return false;
                    }
                    var URL = window.URL || window.webkitURL; 
                    var a = URL.createObjectURL(files)
                    this.img2 = a
                    this.files2 = files
                    this.labelTxt2 = '重新上传'
                    if (this.img1 && this.img2) {
                        this.btnss = false
                    }
                }
            },

            submitFile () {                 // 上传资料
                var _this = this;
                layui.use('layer', function() {
                var layer = layui.layer;
                var formdata = new FormData();
                formdata.append('teacher_pic', _this.files1)
                formdata.append('yname_pic', _this.files2)
                _this.$http.upload('/shv2/Recipe/recipe_pic', formdata, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.msg('上传成功', { icon: 1, time: 1500});
                        var img = []
                            img.push( _this.img1, _this.img2)
                        _this.localstorage.put('Prescription', img)    // 上传的资料
                        _this.Userdata()
                    } else {
                        layer.msg('上传失败', { icon: 2, time: 1500});
                    }
                }, function (err) { })
                
                });  
            },

            // 查询是否审核中
            Userdata () {
                var _this = this;
                _this.$http.post('/shv2/Recipe/recipe_check', {}, function (res) {
                    if (res.code == 1) {
                         var type = res.data.teacher_type.toString()
                        switch(type) {
                            case '0': 
                                var data = _this.localstorage.get('Prescription');  // 产看是否提交过申请
                                if (data) {
                                    _this.status = true; 
                                    _this.fileStatus = false; 
                                    _this.fileStatus2 = false; 
                                    _this.disBtn = false
                                    _this.img1 = data[0];
                                    _this.img2 = data[1];
                                    _this.status2 = false
                                }
                                ; break;      // 未发起审核
                            case '1': 
                                var data = _this.localstorage.get('Prescription');
                                if (data) {
                                    _this.localstorage.remove('Prescription');
                                }
                                _this.status = true; _this.fileStatus = false; _this.fileStatus2 = false; _this.disBtn = false; _this.status2 = false
                                _this.img1 = _this.$http.baseURL + res.data.teacher_pic;
                                _this.img2 = _this.$http.baseURL + res.data.yname_pic;
                            ; break;     // 审核中
                            case '2': 
                                clearInterval(_this.times)
                                _this.$router.replace({ path: '/server/Yaodoctorprescription/prescriptionList'})
                            ; break;          // 审核成功
                            case '3': _this.status2 = true; _this.failed = res.data.teacher_text 
                                _this.status = false;
                                _this.img1 = _this.$http.baseURL + res.data.teacher_pic;
                                _this.img2 = _this.$http.baseURL + res.data.yname_pic;
                                _this.labelTxt = '重新上传'
                                _this.labelTxt2 = '重新上传'
                            ; break;  // 审核失败
                        }
                    }
                   
                }, function (err) {console.log(err)})
            },

        },
        beforeDestroy () {
            var data = this.times;
            clearInterval(data)
        }
}
</script>
<style lang='less' scoped>
.perscription {
    height: 100%;
    .perscription_tit {
        color: #333;
        border-bottom: 1px solid #F1F2F9;
    }
    .content {
        .msg {
            border:1px solid #3196FF;
            background: #EAF4FF;
            color: #3196FF;
            padding: 18px 24px;
            margin-bottom: 20px;
            // display: none;
            p {
                color: #666666;
                margin-top: 20px;
            }
        }
        .files {
            padding-left: 10%;
            display:box;
            display:-webkit-box;
            display:-webkit-flex; 
            display:-moz-box; 
            display:-ms-flexbox; 
            display:flex;
            dl {
                
                dt {
                    width: 159px;
                    height: 159px;
                    border: 1px dashed #c2c2c2;
                    margin-right: 20px;
                    border-radius: 4px;
                    position: relative;
                    input[type=file] {
                        display: none;
                    }
                    label {
                        position: absolute;
                        left:0;
                        bottom:0;
                        padding: 6px 0;
                        width: 100%;
                        display: block;
                        text-align: center;
                        background: rgba(0,0,0,.3);
                        color: #fff;
                        border-radius: 0 0 4px 4px;
                        cursor: pointer;
                    }
                    img {
                        width: 100%;
                    }
                }
                dd {
                    text-align: center;
                    color: #666;
                    margin-top: 10px;
                    margin-left: -10px;
                }
            }
        }
        .txt {
            width: 50%;
            margin-left: 10%;
            line-height: 29px;
        }
        .btn {
            margin-left: 10%;
        }
        .layui-btn-disabled {
            background: #DDDDDD;
            color: #666;
        }
    }
}
</style>

