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
                        <input type="text" id="" v-model="tabledata.name" placeholder="请填写业务联系人" style="width: 500px;" />
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span>联系电话：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" id="" v-model="tabledata.mobile" maxlength="11" placeholder="请输入联系电话" style="width: 500px;" />
                    </td>
                </tr>
                <!-- <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 是否为合作机构：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="layui-input-inline">
                            <input type="radio" v-model="tabledata.ablock" name="tuij" value="1" id="success" title="是" checked><label for="success" class="Mg-R14 pointer"><span style="position:relative;top:2px">是</span></label>
                            <input type="radio" v-model="tabledata.ablock" name="tuij" value="2" id="close" title="否"><label for="close" class="pointer"><span style="position:relative;top:2px">否</span></label>
                        </div>
                    </td>
                </tr> -->
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 机构经营所在地：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="layui-input-inline">
                            <select name="" id="sheng" @change="selectcity(tabledata.province)" v-model="tabledata.province" style="width: 200px;">
                                <option value="">请选择省份</option>
                                <option :value="val.aid" v-for="val in provinceList" v-text="val.aname">请选择省</option>
                            </select>
                        </div>
                        <div class="layui-input-inline">
                            <select name="" id="city" @change="selectcounty(tabledata.city)" v-model="tabledata.city" style="width: 200px;">
                                <option value="">请选择城市</option>
                                <option :value="val.aid" v-for="val in cityList" v-text="val.aname">请选择市</option>
                            </select>
                        </div>
                        <div class="layui-input-inline">
                            <select name="" id="city" v-model="tabledata.county" style="width: 200px;">
                                <option value="">请选择县/区</option>
                                <option :value="val.aid" v-for="val in countyList" v-text="val.aname">请选择县/区</option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 机构经营地址：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" id="" v-model="tabledata.address" placeholder="请输入机构经营地址" style="width: 500px;" />
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 机构电话：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" id="" v-model="tabledata.telephone" placeholder="请输入机构电话" style="width: 500px;" />
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 机构邮箱：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" v-model="tabledata.mail" placeholder="请输入机构邮箱" style="width: 500px;" />
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 获取经纬度：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6" id='map_box'>
                            <Maps @jingzhun='jingzhun'></Maps>
                        <!-- <div id='jingwei'>
                            X<input type="text" id="" v-model="lat" placeholder="经度" style="width: 100px;" class="Mg-L10 Mg-R10" />-&nbsp;Y<input type="text" id="" v-model="lng" placeholder="纬度" class="Mg-L10" style="width: 100px;" />
                            <span class="getmap pointer"><i class="selectMap_icon"></i>点击获取经纬度</span>
                        </div>
                        <div id="tips">
                            <b>请输入关键字：</b>
                            <input type="text" id="keyword" name="keyword" v-model='inputVal' autocomplete="off" v-on:keydown='selectAddress($event)' style="width: 95%;"/>
                            <div id="result1" name="result1" ></div>
                        </div> -->
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="Pd-L40 Pd-B24" >
                        <div id="container"></div>
                        
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black v-top" align="right">
                        <span class="Color_red">*</span> 机构简介：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <textarea style='width: 100%;' name="desc" v-model="tabledata.introduction" placeholder="请输入内容" class="layui-textarea next_textarea"></textarea>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="Pd-L44 Pd-T40">
                        <!-- <button class="Ft-S16 onsubmit" :disabled='disabled' @click="sunmithos">
                            提交信息
                        </button> -->
                        <el-button type="primary" class="Ft-S16 onsubmit" :disabled='disabled' @click="sunmithos" :loading="disabled">提交信息</el-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import Maps from "../../public/map"
export default {
    name: 'mechanismMsg',
    components: {
        Maps: Maps
    },
    data() {
        return {
            lng: '',
            lat: '',
            tabledata: {//
                name: '',
                mobile: '',
                province: '',
                city: '',
                county: '',
                telephone: '',
                mail: '',
                address: '',
                introduction: '',
                ablock: '1'
            },
            gradeList: '',
            typeList: '',
            provinceList: '',
            cityList: '',
            countyList: '',
            disabled: false,             // 按钮
            Map_gd: '',                  // 地图
            placeSearch: '',             // 搜索的容器
            inputVal: '',                // 搜索的值
        }
    },
    mounted() {
        this.selectprovince();
        // this.initdata();
    },
    methods: {
        jingzhun (data) {
            console.log(data)
            this.lng = data.lng;
            this.lat = data.lat
        },
        initdata() {
            var _this = this;
            layui.use(["layer", "form"], function () {
                var form = layui.form;
                form.render()
            })
            this.Map_gd = new AMap.Map("container", {
                resizeEnable: true,
                zoom: 13
            });
            this.Map_gd.on('click', function (e) {
                _this.lng = e.lnglat.getLng();
                _this.lat = e.lnglat.getLat();
            });
             
            AMap.service(["AMap.PlaceSearch"], function () {
            //构造地点查询类
                _this.placeSearch = new AMap.PlaceSearch({
                    pageSize: 5, // 单页显示结果条数
                    pageIndex: 1, // 页码
                    citylimit: false,  //是否强制限制在设置的城市内搜索
                    map: _this.Map_gd, // 展现结果的地图实例
                    panel: "result1", // 结果列表将在此容器中进行展示。
                    autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                    renderStyle: 'default'
                });
    
            });
            // 添加列表点选监听事件
            AMap.event.addListener(_this.placeSearch, "selectChanged", _this.selectAddress);

        },
        selectAddress (e) {  // 地图搜索
                if (this.inputVal.length > 0) {
                    this.placeSearch.search(this.inputVal);
                    document.getElementById("result1").style.display = "block";
                    
                } else {
                    document.getElementById("result1").style.display = "none";
                }
                if (e.selected) {
                    var location = e.selected.data.location;
                    console.log('lng',location.lng);
                    console.log('lat',location.lat)
                    this.lng = location.lng;
                    this.lat = location.lat;
                }
                
            
            
            
        },  
        selectprovince() {//初始化下拉框 省份
            var _this = this;
            this.$http.post('/shv2/Setting/area', { fid: 1 }, function (res) {
                if (res.code == 1) {
                    _this.provinceList = res.data;
                }
            }, function () {

            })
        },
        selectcity(num) {//市
            var _this = this;
            _this.countyList = ''
            this.$http.post('/shv2/Setting/area', { fid: num }, function (res) {
                if (res.code == 1) {
                    _this.cityList = res.data;
                }
            }, function () {

            })
        },
        selectcounty(num) { //区县
            var _this = this
            this.$http.post('/shv2/Setting/area', { fid: num }, function (res) {
                if (res.code == 1) {
                    _this.countyList = res.data;
                }
            }, function () {

            })
        },
        sunmithos() {//
            var _this = this;
            var regmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            var Regphone = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
            layui.use(["layer"], function () {
                if (!_this.tabledata.name) {
                    layer.msg('请填写业务联系人姓名', { icon: 2});
                    return false
                }
                if (!Regphone.test(_this.tabledata.mobile)) {
                    layer.msg('请填写正确业务联系人电话', { icon: 2});
                    return false
                }
                if (!_this.tabledata.province) {
                    layer.msg('请选择省份', { icon: 2});
                    return false
                }
                if (!_this.tabledata.city) {
                    layer.msg('请选择城市', { icon: 2});
                    return false
                }
                if (!_this.tabledata.county) {
                    layer.msg('请选择县、区', { icon: 2});
                    return false
                }
                if (!Regphone.test(_this.tabledata.telephone)) {
                    layer.msg('请填写正确机构电话', { icon: 2});
                    return false
                }
                if (!regmail.test(_this.tabledata.mail)) {
                    layer.msg('请填写正确机构邮箱', { icon: 2});
                    return false
                }
                if (!_this.tabledata.address) {
                    layer.msg('请填写机构经营地址', { icon: 2});
                    return false
                }
                if (!_this.lng) {
                    layer.msg('请选择经度', { icon: 2});
                    return false
                }
                if (!_this.lat) {
                    layer.msg('请选择纬度', { icon: 2});
                    return false
                }
                if (!_this.tabledata.introduction) {
                    layer.msg('请填写机构简介', { icon: 2});
                    return false
                }
                _this.disabled = true
                var fromdata = new FormData()
                fromdata.append('name', _this.tabledata.name);
                fromdata.append('mobile', _this.tabledata.mobile);
                // fromdata.append('ablock', _this.tabledata.ablock);
                fromdata.append('province', _this.tabledata.province);
                fromdata.append('city', _this.tabledata.city);
                fromdata.append('county', _this.tabledata.county);
                fromdata.append('telephone', _this.tabledata.telephone);
                fromdata.append('mail', _this.tabledata.mail);
                fromdata.append('address', _this.tabledata.address);
                fromdata.append('longitude', _this.lng);
                fromdata.append('latitude', _this.lat);
                fromdata.append('introduction', _this.tabledata.introduction);
                _this.$http.upload('/shv2/Setting/whole_add', fromdata, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.msg('提交成功', { icon: 1});
                        var timer = setTimeout(() => {
                           _this.$router.replace('/setting/boxMechanismMsg/Yaocheckmemsg?zheng=true')
                           clearTimeout(timer)
                        }, 1500)
                        
                    } else {
                        layer.msg('提交失败', { icon: 5});
                        var time = setTimeout(() => {
                            _this.disabled = false
                            clearTimeout(time)
                        }, 1000)
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
select {
    background-color: #fff;
}
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
        td {
            .getmap {
                color: #3196ff;
                font-size: 12px;
                .selectMap_icon {
                    display: inline-block;
                    width: 13px;
                    height: 13px;
                    position: relative;
                    top: 2px;
                    margin-left: 10px;
                    margin-right: 3px;
                    background: url(../../../common/image/icon/icon_zuobiao.png)
                        no-repeat;
                }
            }
            .next_textarea {
                resize: none;
                width: 120%;
                height: 160px;
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

        #map_box {
            height: 65px;
            #jingwei {
                float: left;
                line-height: 65px;
            }
            #tips {
                background-color:#fff;
                border:1px solid #eee;
                padding-left:10px;
                padding-right:2px;
                float: right;
                min-height:65px;
                font-size:12px;
                border-radius:3px;
                line-height:20px;
                width:400px;
                position: relative;
                z-index: 3000;
                #result1 {
                    width: 400px;
                    max-height: 200px;
                    overflow: auto;
                    position: absolute;
                    top: 65px;
                    left: 0;
                    z-index: 3000;
                    background-color: #FFF;
                    padding: 5px 10px;
                    display: none;
                }
            }

            #tips > input[type="text"]{
                height:25px;
                border:1px solid #ccc;
                padding-left:5px;
                border-radius:3px;
                outline:none;
            }
        }
    }
}
</style>
