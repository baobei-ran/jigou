<template>
    <div id="departmentEdit" class="" style="height:95%">
        <div class="bg_f Pd-T12 Mg-B24">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T12 Pd-L24 Ft-S16 Color_black">科室名称 </p>
            <ul class="clear head_tab">
                <li class="fl pointer Mg-T10" v-for="(val,index) in tabletype" :class="{'active':inactive==val.did,'Mg-R14':index!=(tabletype.length-1)}" @click="select(val.did,val.list,val.department_name)" v-text="val.department_name"></li>
            </ul>
        </div>
        <div class="bg_f Mg-B24 Pd-B26">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">已选关联疾病 </p>
            <table>
                <tr>
                    <td width="33.3%">
                        <p>
                            <span class="tab_type Mg-R16 Mg-T24" v-for="(val,index) in selectfilter">{{val.title}}<i class="close_icon el-icon-close pointer" @click="deltype(val.title,index)"></i></span>
                        </p>
                    </td>
                </tr>
            </table>
        </div>
        <div class="bg_f Mg-B24">
            <p class="bookingorderdetail_tit Pd-B14 Pd-T14 Pd-L24 Ft-S16 Color_black clear" style="line-height:38px;">关联疾病（可多选）<span class="fr"><input type="text" v-model="searchname" placeholder="搜索" id="icon_right" @keypress="secarch"></span></p>
            <div class="select_type">
                <div class="fl div_model" v-for="val in allillness">
                    <span><input type="checkbox" class="input_check Mg-R10" :title="val.name" :id="val.id"><label :for="val.id" v-text="val.name" class="pointer"></label></span>
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
                            <input type="radio" v-model="settop" name="tuij" value="1" id="success" title="开启"><label for="success" class="Mg-R14"><span style="position:relative;top:2px">开启</span></label>
                            <input type="radio" v-model="settop" name="tuij" value="0" id="close" title="关闭"><label for="close"><span style="position:relative;top:2px">关闭</span></label>
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
            inactive: 1,//科室id
            name: '男科',//科室名称
            settop: '1',//推荐科室
            tabletype: '',
            allillness: '', // 关联疾病的列表
            selectfilter: [],
            searchname: '',
            newarr: ''
        }
    },
    mounted() {
        this.gettype(); // 调用接口，请求数据
    },
    methods: {
        initdata() {    // 关联疾病列表如果选中就添加到已选关联疾病中去
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
        },
        deltype(name, index) { // 删除已选的关联疾病
            var _this = this;
            for (var i = 0; i < $('.select_type input').length; i++) {
                if ($('.select_type input')[i].title == name) {
                    _this.selectfilter.splice(index, 1);
                    $('.select_type input')[i].checked = false
                }
            }
        },
        select(num, list, name) {   // 选择科室名称
            var _this = this;
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
        secarch() {//搜索筛选
            var _this = this;
            if (_this.searchname) {
                for (var i = 0; i < _this.newarr.length; i++) {
                    if (_this.searchname.indexOf(_this.newarr[i].name) !== -1) {
                        _this.allillness = [{ id: _this.newarr[i].id, name: _this.newarr[i].name }];
                    }
                }
            } else {
                _this.allillness = _this.newarr;
            }
        },
        gettype() { // 接口调取
            var _this = this;
            layui.use(["layer"], function () {
                _this.$http.post('/shv2/data/dep', {}, function (res) {//
                    console.log(res)
                    if (res.code == 1) {
                        _this.tabletype = res.data;
                        _this.allillness = res.data[0].list;
                        _this.newarr = res.data[0].list;
                        setTimeout(function () {
                            _this.initdata();
                        }, 100)
                    }
                }, function (err) { console.log(err) });

            });
        },
        onsubmit() {    // 提交保存
            var _this = this;
            var disid = [];
            var formdata = new FormData();
            _this.selectfilter.forEach((ele,index) => {
                var arr = [];
                arr.push(ele.id);
                arr.push(ele.title);
                formdata.append("disid[]", arr);
            })
            layui.use(["layer", "form"], function () {
                formdata.append("id", _this.inactive);
                formdata.append("name", _this.name);
                formdata.append("settop", _this.settop);
                formdata.append("sort", 0);
                _this.$http.upload('/shv2/data/dep_add', formdata, function (res) {//
                    if (res.code == 1) {
                        layer.msg(res.msg, { icon:1, time: 2000 });
                        setTimeout(() => {
                            _this.go('/data/departmentList')
                        }, 1000)
                    } else {
                        layer.msg(res.msg, { icon:2, time: 2000 });
                    }
                });
            });
        }
    },
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
        .head_tab {
            margin-left: 30px;
            margin-right: 30px;
            li {
                padding: 8px 20px;
                background: #f1f2fa;
                font-size: 16px;
                color: #333;
                border-radius: 4px;
            }
            li.active {
                background: #3196ff;
                color: #fff;
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
