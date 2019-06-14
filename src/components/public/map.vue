<template>
    <!-- 高德地图(搜索功能) -->
    <div class="map" id='map_box'>
        <div id="jingwei">
            X<input type="text" id="" v-model="lat" placeholder="经度" style="width: 100px;" class="Mg-L10 Mg-R10" />-&nbsp;Y<input type="text" id="" v-model="lng" placeholder="纬度" class="Mg-L10" style="width: 100px;" />
            <span class="getmap pointer"><i class="selectMap_icon"></i>点击获取经纬度</span>
        </div>
        <div id="tips">
            <b>请输入关键字：</b>
            <input type="text" id="keyword" name="keyword" v-model='inputVal' autocomplete="off" v-on:keyup='selectAddres($event)' style="width: 95%;"/>
            <div id="result1" name="result1" >
                <p v-if='flag' v-html='search_msgs'></p>
                <div v-for='(val, i) in search_list' class='search_msg' @click='selectResult(val)' style="font-size: 13px;cursor:pointer;padding:5px 5px 5px 5px;" >
                    {{val.name}} 
                    <span style='color:#C1C1C1;'>{{ val.district }} </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            inputVal: '',
            lng: '',
            lat: '',
            search_list: [],
            map: '',
            search_msgs: '',
            flag: false
        }
    },
    mounted () {
        var _this = this;
        this.map = new AMap.Map("container", {   // 地图
            resizeEnable: true,
            zoom: 13
        });
            this.map.on('click', function (e) {
                _this.lng=e.lnglat.getLng();
                _this.lat=e.lnglat.getLat();
                _this.jingweidu()
            });
      
    },
    methods: {
        jingweidu () {
            this.$emit('jingzhun', { lng: this.lng ,lat: this.lat, } )
        },
        selectAddres: function (e) {
            var keywords = this.inputVal;
            var auto, _this = this;
            //加载输入提示插件
            AMap.service(["AMap.Autocomplete"], function() {
                var autoOptions = {
                    city: "" //城市，默认全国
                };
                auto = new AMap.Autocomplete(autoOptions);
                //查询成功时返回查询结果
                if ( keywords.length > 0) {
                    auto.search(keywords, function(status, result){
                        // console.log(result)
                        _this.autocomplete_CallBack(result);
                    });
                }
                else {
                    document.getElementById("result1").style.display = "none";
                }
            });
        },
        //输出输入提示结果的回调函数
        autocomplete_CallBack: function (data) {
            var self = this;
            var tipArr = data.tips;
            if (tipArr && tipArr.length>0) {
                self.flag = false
                self.search_list = tipArr
            } else  {
                var resultStr = "π__π 亲,人家找不到结果!<br />要不试试：<br />1.请确保所有字词拼写正确<br />2.尝试不同的关键字<br />3.尝试更宽泛的关键字";
                self.search_msgs = resultStr
                self.search_list = []
                self.flag = true
            }
                document.getElementById("result1").style.display = "block";
                
        },
        //从输入提示框中选择关键字并查询
        selectResult: function(v) {
            var cityCode = v.adcode, self = this;
            this.inputVal = v.name
            //根据选择的输入提示关键字查询
            this.map.plugin(["AMap.PlaceSearch"], function() {
                var msearch = new AMap.PlaceSearch();  //构造地点查询类
                AMap.event.addListener(msearch, "complete", function (data) {
                    // console.log(data)
                    var poiArr = data.poiList.pois;
                    for (var i=0; i< poiArr.length; i++) {
                        addmarker(i, poiArr[i]);
                    }
                    self.map.setFitView();  // 最后关键，用来更新视图
                    //添加查询结果的marker&infowindow
                        function addmarker(i, d) {
                            // console.log(i, d)
                            var lngX = d.location.getLng();
                            var latY = d.location.getLat();
                            var markerOption = {
                                map:self.map,
                                icon:"https://webapi.amap.com/images/" + (i + 1) + ".png",
                                position:new AMap.LngLat(lngX, latY)
                            };
                            var mar = new AMap.Marker(markerOption);
                            var infoWindow = new AMap.InfoWindow({
                                content:"<h3><font color=\"#00a6ac\">  " + (i + 1) + ". " + d.name + "</font></h3>"+ TipContents(d.type, d.address, d.tel),
                                size:new AMap.Size(300, 0),
                                autoMove:true,
                                offset:new AMap.Pixel(0,-30)
                            });
                            var aa = function (e) {
                                var nowPosition = mar.getPosition(),
                                    lng_str = nowPosition.lng,
                                    lat_str = nowPosition.lat;
                                infoWindow.open(self.map, nowPosition);
                                // console.log(lng_str, lat_str)
                                self.lng = lng_str;
                                self.lat = lat_str;
                                self.jingweidu()
                            };
                            AMap.event.addListener(mar, "mouseover", aa);
                        }

                    //infowindow显示内容
                    function TipContents(type, address, tel) {  //窗体内容
                        if (type == "" || type == "undefined" || type == null || type == " undefined" || typeof type == "undefined") {
                            type = "暂无";
                        }
                        if (address == "" || address == "undefined" || address == null || address == " undefined" || typeof address == "undefined") {
                            address = "暂无";
                        }
                        if (tel == "" || tel == "undefined" || tel == null || tel == " undefined" || typeof address == "tel") {
                            tel = "暂无";
                        }
                        var str = "  地址：" + address + "<br />  电话：" + tel + " <br />  类型：" + type;
                        return str;
                    }

                }); //查询成功时的回调函数
                msearch.setCity(cityCode);
                msearch.search(v.name);  //关键字查询查询
            });
            this.search_list = []
        },
    }
}

</script>


<style lang="less" scoped>
 #map_box {
        height: 65px;
        #jingwei {
            float: left;
            line-height: 65px;
            font-size: 13px;
            input {
                height: 36px;
                border: 1px solid #c2c2c3;
                padding-left: 5px;
            }
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
                    background: url(../../common/image/icon/icon_zuobiao.png)
                        no-repeat;
                }
            }
            .next_textarea {
                resize: none;
                width: 120%;
                height: 160px;
            }
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
                .search_msg:hover {
                    background: #CAE1FF;
                }
            }
        }

        #tips > input[type="text"]{
            height:30px;
            border:1px solid #ccc;
            padding-left:5px;
            border-radius:3px;
            outline:none;
        }
    }
</style>

