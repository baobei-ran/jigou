<template>
    <div id="departmentEdit" class="" style="height:95%">
        <div class="bg_f Pd-T12 Mg-B24">
            <table>
                <tr>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                科室名称：
                            </span>
                            <span class="Color_gray6" v-text="data.data.name">
                                口腔科
                            </span>
                        </p>
                    </td>
                </tr>
            </table>
        </div>
        <div class="bg_f Mg-B24 Pd-B26">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">已选关联疾病 </p>
            <table>
                <tr>
                    <td width="33.3%">
                        <p>
                            <span class="tab_type Mg-R16 Mg-T24" v-for="(val,index) in selectfilter">{{val.take_name}}<i class="close_icon el-icon-close pointer" @click="deltype(val.take_name,index)"></i></span>
                        </p>
                    </td>

                </tr>
            </table>
        </div>
        <div class="bg_f Mg-B24">
            <p class="bookingorderdetail_tit Pd-B14 Pd-T14 Pd-L24 Ft-S16 Color_black clear" style="line-height:38px;">关联疾病（可多选）<span class="fr"><input type="text" v-model="searchname" placeholder="搜索" id="icon_right" @keypress="secarch"></span></p>
            <div class="select_type">
                <div class="fl div_model" v-for="val in allillness">
                    <span><input type="checkbox" class="input_check Mg-R10" :title="val.disease_name" :id="val.disid"><label :for="val.disid" v-text="val.disease_name" class="pointer"></label></span>
                </div>
            </div>
        </div>
        <div class="bg_f">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">展示效果</p>
            <table>
                <tr>
                    <td width="33.3%" class="Pd-T12 Pd-B12">
                        <span class="Color_black Ft-S14"><span class="Color_red">*</span>是否开启推荐:</span>
                        <div class="layui-input-inline Mg-L20" style="position:relative;top:4px">
                            <input type="radio" v-model="data.data.settop" name="tuij" value="1" id="success" title="开启"><label for="success" class="Mg-R14"><span style="position:relative;top:2px">开启</span></label>
                            <input type="radio" v-model="data.data.settop" name="tuij" value="0" id="close" title="关闭"><label for="close"><span style="position:relative;top:2px">关闭</span></label>
                        </div>
                        <p class="Color_red Ft-S12">注：开启推荐优先展示</p>
                    </td>
                </tr>
            </table>

        </div>
        <p class="ac"><span class="Color_white Ft-S16 goback pointer Mg-R28" @click="go('/data/departmentList')" style="background:#fff;color:rgba(49, 150, 255, 1)!important;border:1px solid rgba(49, 150, 255, 1)">返回</span><span class="Color_white Ft-S16 goback pointer" @click="onsubmit">保存信息</span></p>
    </div>
</template>
<script>
export default {
    name: 'departmentEdit',
    data() {
        return {
            data: {
                data: {
                    id: 205,
                    name: "",
                    settop: 1
                },
                dep: [{
                    disease_name: "",
                    disid: 342,
                    flag: 0
                }],
                info: [{
                    take_disease: 345,
                    take_name: ""
                }]
            },
            allillness: '',     // 多选关联疾病列表
            selectfilter: '',   // 已选关联疾病列表
            newarr: '',
            searchname: '',
        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {
            var _this = this
            layui.use(["layer"], function () {
                var layer = layui.layer;
                _this.$http.post('/shv2/data/dep_look', _this.$route.query, function (res) {//
                console.log(res)
                    if (res.code == 1) {
                        _this.data = res;
                        _this.allillness = res.dep;
                        _this.selectfilter = res.info;
                        _this.newarr = res.dep;
                        setTimeout(function () {
                            _this.initb()
                        }, 100)
                    }
                }, function (err) { console.log(err) })
            })
        },
        initb() {
            var _this = this;
            for (var i = 0; i < $('.select_type span').length; i++) {
                _this.selectfilter.forEach(ele => {
                    if (ele.take_name == $('.select_type input')[i].title) {
                        $('.select_type input')[i].checked = true;
                    }
                })
                $('.select_type input')[i].onchange = function () {
                    if ($(this)[0].checked) {
                        _this.selectfilter.push({ take_name: $(this)[0].title, take_disease: $(this)[0].id })
                    } else {
                        _this.selectfilter.forEach((item, index) => {
                            if (item.take_name == $(this)[0].title) {
                                _this.selectfilter.splice(index, 1);
                            }
                        })
                    }
                }
            }
        },
        deltype(name, index) {
            var _this = this;
            for (var i = 0; i < $('.select_type input').length; i++) {
                if ($('.select_type input')[i].title == name) {
                    _this.selectfilter.splice(index, 1);
                    $('.select_type input')[i].checked = false
                }
            }
        },
        secarch() {//搜索筛选
            var _this = this;
            if (_this.searchname) {
                for (var i = 0; i < _this.newarr.length; i++) {
                    if (_this.newarr[i].disease_name == _this.searchname) {
                        _this.allillness = [{ disid: _this.newarr[i].disid, disease_name: _this.newarr[i].disease_name }];
                    }
                }
            } else {
                _this.allillness = _this.newarr;
            }
        },
        onsubmit() {    // 提交保存
                var num = this.selectfilter.length
                if (num) {
                    var _this = this;
                    var disid = [];
                    var formdata = new FormData();
                    _this.selectfilter.forEach((ele, index) => {
                        var arr = [];
                        arr.push(ele.take_disease);
                        arr.push(ele.take_name);
                        formdata.append("disid[]", arr);
                    })
                    layui.use(["layer", "form"], function () {
                        formdata.append("id", _this.data.data.id);
                        formdata.append("settop", _this.data.data.settop);
                        _this.$http.upload('/shv2/data/dep_edit', formdata, function (res) {
                            if (res.code == 1) {
                                layer.msg(res.msg);
                                _this.go('/data/departmentList')
                            }
                        });
                    });
                } else {
                    layui.use('layer', function(){
                    var layer = layui.layer;
                    
                    layer.msg('请选择病情');
                    }); 
                }
               
          
        },
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
#departmentEdit {
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
