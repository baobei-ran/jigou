<template>
    <div id="orderList" style="height:100%">
        <div class="bg_f">
            <ul class="Pd-T14 Pd-B14 header dis_f">
                <li class="layui-input-block">
                    <label class="layui-form-label">请选择医生</label>
                     <el-checkbox v-model="checkAll" @change="handleCheckAllChange" v-show='doctorList.length'>全选</el-checkbox>
                     <span class="Color_red" v-show='!doctorList.length'>无医生， 无法生成处方</span>
                </li>
                <li>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="(city,i) in doctorList" :label="city" :key="i">{{city.true_name}}</el-checkbox>
                        </el-checkbox-group>
                </li>
            </ul>
        </div>
        <div class="tab_content Mg-T20 bg_f">
            <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">患者数据录入</p>
            <div class="layui-tab Pd-L24 Pd-R30">
                <div class="layui-tab-content ">
                    <ul class="screen_type Pd-T20 Pd-B24 dis_f">
                        <li class="layui-inline">
                            <span class="Color_red">*</span>
                            <label>患者姓名</label>
                            <div class="layui-input-inline">
                                <input type="text" name="" v-model='username' autocomplete="off" class="layui-input">
                            </div>
                        </li>
                        <li class="lay_width">
                            <span class="Color_red">*</span>
                            <label >性别</label>
                            <div class="layui-input-inline" >
                                <select name="city" lay-verify="" style='width:165px;'  v-model='sex'  class="layui-input">
                                    <option value="">请选择</option>
                                    <option value="0">男</option>
                                    <option value="1">女</option>
                                </select>
                                <!-- <input type="text" name="price_min" v-model='sex' autocomplete="off" class="layui-input"> -->
                            </div>
                            
                        </li>
                        <li class="lay_width Mg-L10">
                            <span class="Color_red">*</span>
                            <label >年龄</label>
                            <div class="layui-input-inline" >
                                <input type="number" name="price_max" v-model='age' autocomplete="off" class="layui-input">
                            </div>
                        </li>
                        
                        <li class="layui-inline Pd-L10">
                            <span class="Color_red">*</span>
                            <label>联系电话</label>
                            <div class="layui-input-inline">
                                <input type="text" name="" v-model='phone' autocomplete="off" class="layui-input">
                            </div>
                        </li>

                        
                    </ul>

                    <div class="content">
                        <ul>
                            <li>
                                <label>肝功能</label>
                                <input type="text" name="" v-model='liver' autocomplete="off" placeholder="（默认为正常）" class="layui-input">
                            </li>
                            <li>
                                <label>肾功能</label>
                                <input type="text" name="" v-model='kidney' autocomplete="off"  placeholder="（默认为正常）" class="layui-input">
                            </li>
                            <li>
                                <label>过敏史</label>
                                <input type="text" name="" v-model='allergy' autocomplete="off"  placeholder="（默认为正常）" class="layui-input">
                            </li>
                            <li>
                                <label>过往病史</label>
                                <input type="text" name="" v-model='ago' autocomplete="off"  placeholder="（默认为正常）" class="layui-input">
                            </li>
                            <li>
                                <label>备孕情况</label>
                                <input type="text" name="" v-model='yun' autocomplete="off"  placeholder="（默认为正常）" class="layui-input">
                            </li>
                            <li>
                                <label><span class="Color_red">*</span>症状</label>
                                <textarea name="desc" required class="layui-textarea"  v-model='disease' placeholder="（必填）" ></textarea>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="tab_content Mg-T20 bg_f ">
            <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24"><span class="Color_red">*</span>处方药品</p>
            <div class="table_con">
                <table class="layui-table" lay-skin="">
                    <thead>
                        <tr class="ac">
                            <td class="firstheadtd">药品名称</td>
                            <td>药品数量</td>
                            <td>用法及用量</td>
                        </tr>
                    </thead>
                    <tbody >
                        <tr class="table_con Color_black ac" v-for='(val,i) in tablelist' :key='i' >
                            <td>
                                <input type="text" name="title" v-model='val.name' lay-verify="required" placeholder="【药品名称】" autocomplete="off" class="layui-input">
                            </td>
                            <td>
                                <input type="number" name="title" v-model="val.num"  lay-verify="required" placeholder="【药品数量】" autocomplete="off" class="layui-input">
                            </td>
                            <td>
                                <input type="text" name="title" v-model="val.usage" lay-verify="required" placeholder="【用法及用量】" autocomplete="off" class="layui-input">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="addbtn">
                    <button @click='addtabel'>+添加药品</button>
                </div>
            </div>
        </div>
        <div class="tab_content Mg-T20 bg_f">
            <div class="dis_f msgs">
                <label>药店留言</label>
                <textarea name="desc" required class="layui-textarea" v-model='shop_word'  placeholder="（选填）" ></textarea>
            </div>
        </div>
        <div class="returns Mg-T24">
                <button class="layui-btn" @click='go("/server/Yaodoctorprescription/prescriptionList")'>取消</button>
                <button class="layui-btn layui-btn-normal" :disabled='disabled' @click='submitdata'>立即提交</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'addApply',
    data() {
        return {
            doctorList: [],             // 医生列表
            checkAll: false,            // 全选按钮操作
            checkedCities: [],          // 选择医生的数据liebaio
            username: '',               // 名字
            sex: '',                    // 性别
            age: '',                    // 年龄
            phone: '',                  // 电话
            liver: '',                  // 肝功能
            kidney: '',                 // 肾功能
            allergy: '',                // "过敏史
            ago: '',                    // 过往病史
            yun: '',                    // 备孕情况
            disease: '',                // 病症
            drugArr: [],                // 药品名称
            drugNum: [],                // 药品数量
            usage: [],                  // 用法及用量
            shop_word: '',              // 药店留言
            size: 3,                    // 处方药品的列表数量
            disabled: true,             // 按钮
            tablelist: [                // 获取处方药品的数据
                {name: '', num: '', usage: ''},
                {name: '', num: '', usage: ''},
                {name: '', num: '', usage: ''},
            ]
            
        }
    },
    mounted() {
      var self = this;
        self.$http.post('/shv2/Recipe/recipe_seldoc', {}, function (res) {
            console.log(res)
            if (res.code == 1) {
                self.doctorList = res.data
                self.disabled = false
            }
        }, function (err) { console.log(err)})
    },
    methods: {
        submitdata() {   // 提交
            var _this = this;
            this.disabled = true
            var time = setTimeout(function () {
                _this.disabled = false
                clearTimeout(time)
            }, 3000)
            
            layui.use(["layer", 'table'], function () {
                var layer = layui.layer;
                var table = layui.table;
                var isphone = /^1[3456789]\d{9}$/;
                var isNum = /\d/;
                console.log(_this.checkedCities)

                if (_this.checkedCities.length <= 0) {
                    layer.msg('请选择医生',{icon:2})
                    return;
                }
                if (!_this.username) {
                    layer.msg('请输入姓名',{icon:2})
                    return;
                }
                if(!_this.sex) {
                    layer.msg('请选择性别',{icon:2})
                    return;
                }
                if(!_this.age) {
                    layer.msg('请输入年龄',{icon:2})
                    return;
                } else if (!isNum.test(_this.age)) {
                    layer.msg('请输入正确年龄',{icon:2})
                    return;
                }
                if(!_this.phone || !isphone.test(_this.phone)) {
                    layer.msg('请输入正确电话',{icon:2})
                    return;
                }
                if (!_this.disease) {
                    layer.msg('请输入症状',{icon:2})
                    return;
                }
                _this.disabled = true
                var formdata = new FormData();
                
                _this.checkedCities.map(val => {
                    formdata.append('did[]', val.did)
                })
                
                formdata.append('names', _this.username)
                formdata.append('sex', _this.sex)
                formdata.append('age', _this.age)
                formdata.append('phone', _this.phone)

                formdata.append('liver', _this.liver != '' ? _this.liver: '正常')
                formdata.append('kidney', _this.kidney != ''? _this.kidney : '正常')
                formdata.append('allergy', _this.allergy != ''? _this.allergy : '正常')
                formdata.append('ago', _this.ago != ''? _this.ago : '正常')
                formdata.append('yun', _this.yun != ''? _this.yun : '正常')
                formdata.append('disease', _this.disease)

                var tabledata = _this.tablelist.filter(val => {
                    return val.name != '' && val.num != '' && val.usage != ''
                })
                tabledata.forEach(val => {
                    formdata.append('name[]', val.name)
                    formdata.append('num[]', val.num)
                    formdata.append('usage[]', val.usage)
                })
                formdata.append('shop_word', _this.shop_word)
                _this.$http.upload('/shv2/Recipe/recipe_add', formdata, function (res) {//
                    console.log(res)
                    var time = setTimeout(() => {
                        _this.disabled = false
                        clearTimeout(time)
                    }, 3000)
                    if (res.code == 1) {
                        layer.msg('提交成功', { icon:1 , time: 1000})
                       setTimeout(() => {
                           _this.go('/server/YaoprescriptionList')
                       }, 1000)
                    } else if (res.code == 0) {
                        layer.msg('请填写处方药品',{icon:2})
                    }
                }, function (err) { console.log(err) 
                    _this.disabled = false
                });
                
            });
        },
         
        addtabel () {   // 添加表格
            var obj = {name: '', num: '', usage: ''}
            this.tablelist.push(obj)
        },
        handleCheckAllChange(val) {     // 全选
            if(val) {
                this.checkedCities = this.doctorList 
            } else {
                this.checkedCities = [] 
            }
        },
        handleCheckedCitiesChange(value) {  // 单选
            if (value.length > 0) {
                var checkedCount = value.length;
                if (checkedCount == this.doctorList.length) {
                    this.checkAll = true;
                } else {
                    this.checkAll = false;
                }
            }
        }
       
    }
}
</script>

<style scoped lang="less">
 .returns {
    width:100%;
    text-align: center;
    button:first-child {
        background: #fff;
        border:1px solid #3196ff;
        color:#3196ff;
    }
    .layui-btn {
        padding: 0 28px;
    }
}
#orderList {
    .header {
        >li {
            margin: 0;
            line-height: 40px;
            // padding-left: 30px;
           .layui-form-label {
                margin-right: 10px;
                width: 120px;
                vertical-align: middle;
            }
            
        }
        >li:last-child {
            margin-left: 20px;
        }
    }
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
    }
    input:hover,
    input:focus {
        border: 1px solid #c2c3c3;
    }
    .screen_type {
     
            .layui-inline {
                overflow: hidden;
                label {
                  padding-right: 10px;
                }
                .layui-input-inline {
                    margin-right: 10px;
                    .el-input__inner {
                        width: 150px;
                    }
                    input {
                        height: 34px;
                    }
                }
            }
            .lay_width {
                label {
                  padding-right: 10px;
                }
                .layui-input-inline {
                    input {
                        height: 34px;
                    }
                }
            .date_icon {
                background: url(../../../common/image/pages/account/icon_sj.png)
                    no-repeat 138px;
            }
        }
        .selecttime {
            .layui-inline {
                label {
                    padding-right: 10px;
                }
                .layui-input-inline {
                    input {
                        height: 34px;
                    }
                    .date_icon {
                        background: url(../../../common/image/pages/account/icon_sj.png)
                            no-repeat 150px;
                    }
                }
            }
        }
        .selectbtn {
            display: inline-block;
            color: #fff;
            background: #3196ff;
            width: 100px;
            height: 34px;
            line-height: 34px;
            border: none;
            border-radius: 4px;
        }
    }
    .content {
        width: 100%;
        padding-right: 100px;
        ul {
            li {
                display: box;              
                display: -webkit-box;      
                display: -moz-box;         
                display: -ms-flexbox;      
                display: -webkit-flex;     
                display: flex; 
                -webkit-align-items: center;
                -moz-align-items: center;
                -ms-align-items: center;
                -o-align-items: center;
                align-items: center;
                padding: 15px 0;
                label {
                    width: 100px;
                    text-align: right;
                    margin-right: 20px;
                }
                textarea {
                    resize: none;
                    width:100%;
                    min-height: 60px;
                    line-height: 20px;
                    padding: 10px;
                }
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
        .table_con {
            padding: 20px 30px;
            .layui-table {
            
            thead {
               > tr {
                    background: #DAE9FF;
                }
            }
            tbody {
                > tr {
                    padding: 20px 0;
                    border-bottom:1px solid #C2C2C3;
                    td {
                        border:0;
                        input {
                            text-align: center;
                        }
                    }
                }
            }
        }
       .addbtn {
           padding-top: 10px;
           text-align: center;
           button {
               border: 1px solid #3196FF;
               padding: 6px 60px;
               color: #3196FF;
               background-color: #fff;
               cursor: pointer;
           }
       }
    }


    .msgs {
        padding: 20px 30px;
        label {
            width: 80px;
        }
        textarea {
            resize: none;
            min-height: 60px;
        }
    }

    }
    
}
#sendgoods {
    padding-left: 53px;
    padding-right: 53px;

    table {
        margin-top: 27px;
        tr {
            height: 64px;
            td {
                input {
                    width: 100%;
                    height: 40px;
                    padding-left: 10px;
                    border-radius: 3px;
                }
                input,
                input:hover,
                input:focus {
                    border: 1px solid #c2c3c3;
                }
                .tan_icon {
                    background: url(../../../common/image/icon/icon_hxcw.png)
                        no-repeat;
                    width: 13px;
                    height: 13px;
                    display: inline-block;
                    position: relative;
                    z-index: 66;
                    top: 2px;
                    margin-right: 4px;
                }
            }
        }
    }

    button {
        width: 160px;
        height: 46px;
        border-radius: 4px;
        border: none;
        font-size: 18px;
        margin-top: 46px;
    }
    .cancel {
        border: 1px solid #128dff;
        color: #128dff;
        background: #fff;
    }
    .send {
        color: #fff;
        background: #128dff;
    }
}
</style>
