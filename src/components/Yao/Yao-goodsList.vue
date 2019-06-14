<template>
    <div id="goodsList" class="bg_f" style="height:100%">
        <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">商品列表</p>
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab Pd-T24">
                <ul class="layui-tab-title">
                    <li class="layui-this" @click="tab(0)">全部（{{ goodCount.count }}）</li>
                    <li @click="tab(1)">已上架（{{ goodCount.count1 }}）</li>
                    <li @click="tab(2)">已下架（{{ goodCount.count2 }}）</li>
                    <li @click="tab(3)">已售罄（{{ goodCount.count3 }}）</li>
                    <li @click="tab(4)">待审核（{{ goodCount.count4 }}）</li>
                    <li @click="tab(5)">审核未通过（{{ goodCount.count5 }}）</li>
                    <p class="fr Ft-S14 Color_blue"><span class="Mg-R24 pointer"><i class="upfile_icon"></i>批量上传</span><span class="pointer" @click="go('/jgmall/goodsList/addGoods')"><i class="add_icon"></i>新增商品</span></p>
                </ul>


                <div class="layui-tab-content">
                    <div class="screen_type Pd-B24 Mg-T14 Mg-B24">
                        <div class="layui-form-item layui-row">
                            <div class="layui-col-md4">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">商品编号</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="" v-model='number' autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md4">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">商品名称</label>
                                    <div class="layui-input-inline">
                                        <input type="text" v-model='name' autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md4">
                                <div class="layui-inline lay_width">
                                    <div class="layui-input-inline" style="width:100%">
                                        <span class="Ft-S14 selectbtn ac pointer" @click='search'>筛选订单</span><span class="Color_blue pointer Ft-S14 Mg-L24" @click='empty'>清空筛选条件</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 加的选项卡风格只是装饰 -->
                    <!-- <div class="layui-tab-item layui-show"></div>
                    <div class="layui-tab-item"></div>
                    <div class="layui-tab-item"></div>
                    <div class="layui-tab-item"></div> -->
                    <!--  -->

            <div class="table_box" v-if='tdlast == 4 ? false : tdlast == 5 ? false : true'>
                <!-- <div class='table_head' v-show='multipleSelection.length' v-if='tdlast == 0? false : tdlast == 3? false : true'>
                    <span style='color: #3196FF;'>批量操作，当前选择{{ multipleSelection.length }}条信息</span>
                    <div v-show='tdlast == 2 ? true:false'><el-button type="primary" size='mini' >上架</el-button></div>
                    <div v-show='tdlast == 1 ? true:false'><el-button type="primary" size='mini' >下架</el-button></div>
                </div> -->
                   <el-table
                    :data="goodList"
                    :row-style='styleColor'
                    border
                    @selection-change="handleSelectionChange"
                    style="width: 100%;height: 515px;overflow: auto;" :header-cell-style='styleObj' >
                        <el-table-column
                        type="selection"
                        label="全选"
                        width="80" align='center'>
                        </el-table-column>
                        <el-table-column
                            min-width="100%"
                            label="商品名称"
                           align ='center' style='width:300px!mportant;'>

                           <template slot-scope="scope">
                                <div  style='-webkit-display:flex;display:flex;align-items: center;text-align:center'>
                                    <!-- <img :src="$http.baseURL+scope.row.pic" alt="" style='width: 60px; height:60px;display:block;' > -->
                                <p style='margin-left:20px;text-align:center;color: #333;'>{{ scope.row.name }}</p>
                                </div>
                            </template>

                        </el-table-column>
                        <el-table-column
                            min-width="60%"
                            label="商品图片"
                           align ='center' style='width:300px!mportant;'>
                           <template slot-scope="scope">
                                <div style='-webkit-display:flex;display:flex;align-items: center; text-align:center;'>
                                    <img :src="$http.baseURL+scope.row.pic" alt="" style='width: 60px; height:60px;display:block;margin: 0 auto;' >
                                </div>
                            </template>

                        </el-table-column>

                        <el-table-column
                            prop="number"
                            label="商品编码" align ='center' style='width: 200px;'>
                        </el-table-column>
                        <!-- <el-table-column
                            prop="id"
                            sortable
                            min-width="50%"
                            :cell-dblclick='editSort'
                            @click.native="handleEdit($index, row)"
                            label="排序" align ='center'>
                        </el-table-column> -->
                        <el-table-column
                            prop="stock"
                            sortable
                            min-width="50%"
                            label="库存" align ='center'>
                        </el-table-column>
                        <el-table-column
                            prop="monthly"
                            sortable
                            min-width="50%"
                            label="已售" align ='center' >
                        </el-table-column>

                        <el-table-column
                            prop="money"
                            min-width="50%"
                            label="商品售价" align ='center'>
                            <template slot-scope="scope">
                                <div>
                                    <span>￥</span><span>{{ scope.row.money }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            min-width="50%"
                            label="商品状态" align ='center'>
                            <template slot-scope="scope">
                                <div>
                                    <span v-show='scope.row.type == 1 ? true :false'>已上架</span>
                                    <span v-show='scope.row.type == 2? true :false'>已下架</span>
                                    <span v-show='scope.row.type == 3? true :false'>已售罄</span>
                                </div>
                            </template>
                        </el-table-column>
                            
                        <el-table-column
                            min-width="50%"
                            label="推荐" align ='center'>
                            <template slot-scope="scope">
                                        <el-switch
                                            v-model="scope.row.recommend"
                                            @change='tuijian(scope.row.id)'
                                            active-color="#13ce66"
                                            inactive-color="#ccc">
                                        </el-switch>
                            </template>
                        </el-table-column>
                           

                        <el-table-column
                            min-width="80%"
                            label="操作" align ='center'>

                            <template slot-scope="scope" style='display: flex;'>
                                <button class='btn' 
                                    @click="edits(scope.row)">编辑</button>
                                <button class='btn' v-if='tdlast == 0 ? true : tdlast == 1 ? true : false'
                                    @click="soldOut(scope.row)">下架</button>
                                    <button class='btn' v-if='tdlast == 2 ? true : false'
                                    @click="putaway(scope.row)">上架</button>
                                <button class='btn' 
                                @click="shows(scope.row)">更多 <i class='el-icon-caret-bottom'></i><i class='el-icon-caret-top hide' ></i></button>
                                <dl class="tdmore hide" :class="{'active':scope.row.id === numId}" >
                                    <dd class="pointer"  @click='del(scope.row)'>删除</dd>
                                    <dd class="pointer"  @click="sendgoods(scope.row.id)">记录</dd>
                                </dl>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                    
                <div v-else-if="tdlast == 4 ? true : tdlast == 5 ? true : false " >   <!-- 审核页面-->
                    
                    <el-table
                    :data="goodList"
                    :row-style='styleColor'
                    border
                    style="width: 100%;height: 515px;overflow: auto;" :header-cell-style='styleObj' >
                        <el-table-column
                        type="selection"
                        label="全选"
                        width="80" align='center'>
                        </el-table-column>
                        <el-table-column
                            min-width="100%"
                            nin-height = '70px'
                            prop="goodList"
                            label="商品名称"
                           align ='center' style='width:300px!mportant;'>
                           <template slot-scope="scope">
                                <div  style='-webkit-display:flex;display:flex;align-items: center;'>
                                    <!-- <img :src="$http.baseURL+scope.row.pic" alt="" style='width: 60px; height:60px;display:block;' > -->
                                <p style='margin-left:20px;text-align:left;color: #333;'>{{ scope.row.name }}</p>
                                </div>
                            </template>

                        </el-table-column>
                         <el-table-column
                            min-width="80%"
                            nin-height = '70px'
                            prop="goodList"
                            label="商品图片"
                           align ='center' style='width:300px!mportant;'>
                           <template slot-scope="scope">
                                <div  style='-webkit-display:flex;display:flex;align-items: center;'>
                                    <img :src="$http.baseURL+scope.row.pic" alt="" style='width: 60px; height:60px;display:block;margin:0 auto;' >
                                </div>
                            </template>

                        </el-table-column>
                        <el-table-column
                            prop="number"
                            label="商品编码" align ='center' style='width: 200px;'>
                        </el-table-column>
                        <el-table-column
                            prop="id"
                            sortable
                            min-width="50%"
                            :cell-dblclick='editSort'
                            @click.native="handleEdit($index, row)"
                            label="排序" align ='center'>
                        </el-table-column>
                        <el-table-column
                            prop="stock"
                            sortable
                            min-width="50%"
                            label="库存" align ='center'>
                        </el-table-column>

                        <el-table-column
                            prop="money"
                            min-width="50%"
                            label="商品售价" align ='center'>
                            <template slot-scope="scope">
                                <div>
                                    <span>￥</span><span>{{ scope.row.money }}</span>
                                </div>
                            </template>
                        </el-table-column>

                            <el-table-column
                            prop="examine"
                            min-width="50%"
                            label="审核" align ='center'>
                                <template slot-scope="scope">
                                    <div style='color: red;font-size:14px' v-if='scope.row.examine == 2 ? true : false'>
                                     未通过 <i class="el-icon-warning"></i>
                                    </div>
                                    <div v-if='scope.row.examine == 0 ? true : false'>待审核</div>
                                    <div v-if='scope.row.examine == 1 ? true : false'>审核通过</div>
                                </template>
                            </el-table-column>

                        <el-table-column
                            min-width="80%"
                            prop="examine"
                            label="操作" align ='center'>

                            <template slot-scope="scope" style='display: flex;'>
                                <div v-if='scope.row.examine == 0 ? true : false'>
                                    审核中，无法操作
                                </div>
                                <div v-else>
                                    <button class='btn' 
                                        @click="edits(scope.row)">重新编辑</button>
                                    <button class='btn' 
                                    @click="shows(scope.row)">更多 <i class='el-icon-caret-bottom'></i><i class='el-icon-caret-top hide' ></i></button>
                                    <dl class="tdmore hide" :class="{'active':scope.row.id === numId}" >
                                        <dd class="pointer"  @click='del(scope.row)'>删除</dd>
                                        <dd class="pointer"  @click="sendgoods(scope.row.id)">记录</dd>
                                    </dl>
                                </div>
                                
                            </template>
                        </el-table-column>
                    </el-table>
                </div> 

                    <div style='background:#fff;' v-show='goodList.length' id='page'></div>
                           
                </div>
            </div>
        </div>
        <div id="sendgoods" class="hide Pd-L40 Pd-R40 ac" style="height:330px;overflow-y:auto">
            <table width="100%">
                <tr style="border-bottom:1px solid #ddd">
                    <td class="Color_black Ft-S16" width="33.3%">时间</td>
                    <td class="Color_black Ft-S16" width="33.3%">操作人</td>
                    <td class="Color_black Ft-S16">记录</td>
                </tr>
                <tbody v-if='record.length'>
                    <tr v-for="(val,index) in record" :key='index'>
                        <td>2018年11月12日 21:11:22</td>
                        <td v-text='val.person'>188****9979</td>
                        <td v-text='val.record'>商品上架</td>
                    </tr>
                </tbody>
                 <tbody v-else>
                    <tr>
                        <td colspan="3"> 暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'goodsList',
    data() {
        return {
            styleObj: {
                'background':'#DAE9FF',
                'color': '#333',
            },
            
            num: false,     // 是否全选
            showA: true, // 
            numId: 0,   // id
            tdlast: 0,  // 商品状态
            more1: false,
            goodList: [],    // 列表数据
            goodCount: '',   // 数量
            page: 1,    
            limit: 10,
            examine: '',    // 审核状态
            name: '',       // 商品名称
            number: '',     // 商品编号
            record: [],      // 记录列表
            tabShen: true,   // 审核
            multipleSelection: []   // 选中的值进行保存
        }
    },
    mounted() {
        // this.initdata()
        this.goodLists(1) 
        this.initdata(5) // test
    },
    methods: {
        //点击排序
        handleEdit(index, row) {
            this.showEdit[index] = true;
            this.showBtn[index] = true;
            this.$set(this.showEdit,row,true)
            this.$set(this.showBtn,row,true)
        },

    

        // 排序
        editSort (row, column, cell, event) {
            // console.log(row, column, cell, event)
        },

    styleColor ({row, rowIndex}) { // 隔行变色
        if (rowIndex %2 == 1) {
        return { "background-color": "#E5F0FF" }
        } else {
            return { "background-color": "#FFF" }
        }
        return { 'height' : '60px' }
        console.log( rowIndex)
    },


    handleSelectionChange(val) {    // 全选
        if (val.length) {
            this.multipleSelection = val;
            this.num = true
        } else {
            this.multipleSelection = val;
            this.num = false
        }
        
      },


        search () { // 搜索
            var _this = this;
            layui.use('layer', function(){
            var layer = layui.layer;
                if (!_this.number && !_this.name) {
                    layer.msg('请输入要搜索的内容');
                    return;
                }
                _this.goodLists(1)
            });   
            

        },



        tab(num) {  // 选项卡
            this.tdlast = num
            this.goodLists(1)
            if (num == 1) {
                this.multipleSelection = []
            } else {
                this.multipleSelection = []
            }
        },
        goodLists(num) {    // 数据 和 搜索
            var _this = this;
            _this.goodList = []
            layui.use(['layer', 'form'], function(){
                var layer = layui.layer;
                var form = layer.form;
                _this.$http.post('/shv2/goods/index', {type: _this.tdlast,examine: _this.examine,name: _this.name, number: _this.number, page: _this.page, limit: _this.limit}, function (res) {
                    console.log(res)
                    if(res.code == 1) {
                        _this.goodCount = res;
                        _this.goodList = res.data;
                        if (num == 1) {
                            // _this.initdata(res.num) // 传递总数
                        }
                    } else {
                        _this.initdata(0) 
                    }
                }, function (err) { console.log(err)})
            });
        },
        initdata(total) {  // 分页
            var _this = this;
            layui.use(['layer','laypage'], function () {
                var layer = layui.layer;
               var laypage = layui.laypage
                //完整功能
                laypage.render({
                    elem: 'page'
                    ,count: total
                    ,layout: [ 'prev', 'page', 'next', 'skip']
                    ,jump: function(obj, first){
                        if(!first){
                            _this.goodLists(obj.curr) // /得到当前页，以便向服务端请求对应页的数据
                            _this.page = obj.curr
                        }
                    }
                });
                
                
                
            })
           
        },
        tuijian (id) {    // 推荐是否开启
            var _this = this;
            console.log(id)
            layui.use('layer', function(){
            var layer = layui.layer;
            _this.$http.post('/shv2/goods/recommend', {id:id}, function (res) {
                console.log(res)
                if (res.code == 1) {
                    layer.msg(res.msg, { icon:1});
                } else if(res.code == 3) {
                    layer.msg(res.msg, { icon:2, time: 2000});
                    setTimeout(()=> {
                        _this.goodLists(_this.page)
                    }, 1000)
                } else {
                    layer.msg(res.msg, { icon:2});
                }
            }, function (err) { console.log(err)})
            }); 
        },
        edits(data) { // 编辑
            var { id } = data
            // console.log(id)
            this.go('/jgmall/goodsList/editGoods?id='+id)
        },
        shows(data) { // 更多
            var { id } = data;
            var _this = this;
            if (_this.numId == id) {
                _this.numId = ''
            } else {
                _this.numId = id
            }
                
        },
        soldOut(data) {  // 下架
            var { id } = data;
            var _this = this;
            layui.use('layer', function(){
                var layer = layui.layer;
                _this.$http.post('/shv2/goods/goods_set', {id: id, type: 2}, function (res) {
                    // console.log(res)
                    layer.msg(res.msg);
                }, function (err) { console.log(err) })
            });  
        },
        del (data) { // 删除商品
            var _this = this;
            var { id } = data;
             layui.use('layer', function(){
                var layer = layui.layer;
                _this.$http.post('/shv2/goods/goods_set', {id: id, type: 3}, function (res) {
                    // console.log(res)
                    layer.msg(res.msg);
                }, function (err) { console.log(err) })
            })
        },
        sendgoods(id) { //  商品操作记录
            // console.log(id)
            var _this = this;
            _this.record = '';  // 每次查看前，先进行一次清空数据
            this.$http.post('/shv2/goods/goods_log', {id:id}, function (res) {
                // console.log(res)
                if(res.code == 1) {
                    _this.record = res.data
                } else {
                    console.log(res)
                }
            }, function (err) {
                console.log(err)
            })
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 1,
                    title: "记录",
                    content: $("#sendgoods"),
                    area: ["1000px", "400px"],
                    cancel: function () { }
                });
                $(".layui-layer-title").css({
                    height: "50px",
                    background: "#ECF2FB",
                    "line-height": "50px",
                    fontSize: '18px'
                });
                $(".layui-layer-setwin").css("top", "19px");
            });
        },
        empty() {   // 清空
            this.name = '';
            this.number = '';
        },

        putaway (data) {    // 上架
            // console.log(data)
            var { id } = data;
            var _this = this;
            layui.use('layer', function(){
            var layer = layui.layer;
                _this.$http.post('/shv2/goods/goods_set', { id: id, type: 4 }, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.msg(res.msg)
                    } else {
                        layer.msg(res.msg);
                    }
                }, function (err) { console.log(err)})
            
            });  
        }
    }
}
</script>
<style scoped lang='less'>

#goodsList {
    
    .layui-tab-content .btn {
        color: #3196FF;
        margin: 0 4px;
        border: 0;
        background: none;
        cursor: pointer;
    }
    .el-table__body {
        body > tr.el-table__row {
            height: 80px;
        }
    }
    .el-table tr{
        height: 50px;
    }
    tbody tr > td:nth-child(4) div {
        display: inline-block;
        /* width: 50px; */
        height: 27px;
        border: 1px solid #aaaaaa;
    }
    .el-table__header .has-gutter tr th.el-table_1_column_2 > .cell {
        display: flex;
    }
    .hide {
        display: none;
    }
    .table_box {
        position: relative;
    }
    .table_head {
        position: absolute;
        z-index: 99;
        width: 90%;
        right: 5px;
        background-color: #DAE9FF;
        padding: 14px 30px 14px 0;
        -webkit-display: flex;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}


.tdmore {
    position: absolute;
    z-index: 666;
    height: 86px;
    width: 100px;
    right: 0px;
    top: 45px;
    border: 1px solid #dddddd;
    margin-top: 10px;
    background-color: #fff;
    z-index: 100;
}
.tdmore:after {
    content: "";
    border: 8px dashed transparent;
    border-bottom: 8px solid #eee;
    width: 0;
    height: 0;
    font-size: 0;
    display: inline-block;
    *display: inline;
    *zoom: 1;
    vertical-align: -3px;
    position: absolute;
    bottom: auto;
    left: 42px;
    top: -15px;
}
.tdmore dd {
    height: 43px;
    line-height: 43px;
}
.active {
    display: block!important;
}
.tdmore dd:first-child {
    border-bottom: 1px solid #dddddd;
}
.layui-table[lay-even] tr:nth-child(even) {
    background: #e5f0ff;
}
.layui-table-edit {
    height: 29px;
    border-color: #3196ff !important;
    top: 39px;
    background: #fff !important;
}
</style>

<style scoped lang="less">
#goodsList {
    #page {
        text-align:center;
        margin-top: 5px;
        padding-bottom: 10px;
    }
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
    }
    input:hover,
    input:focus {
        border: 1px solid #c2c3c3;
    }
    .screen_type {
        border-bottom: 1px solid #e6e6e6;
        .layui-form-item {
            .lay_width {
                width: 100%;
                .layui-form-label {
                    width: 80px;
                    padding: 7px 10px 7px 0px;
                }
                .layui-input-inline {
                    width: 65%;
                    input {
                        height: 34px;
                    }
                }
            }
        }
        .selecttime {
            .layui-inline {
                .layui-form-label {
                    padding: 7px 10px 7px 0px;
                }
                .layui-input-inline {
                    input {
                        height: 34px;
                    }
                    .date_icon {
                        background: url(../../common/image/pages/account/icon_sj.png)
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
    .tab_content {
        background: #fff;
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
                p {
                    position: relative;
                    top: 10px;
                    i {
                        display: inline-block;
                        margin-right: 5px;
                        position: relative;
                        top: 2px;
                    }
                    .upfile_icon {
                        width: 14px;
                        height: 14px;
                        background: url(../../common/image/icon/icon_fh.png)
                            no-repeat;
                    }
                    .add_icon {
                        width: 16px;
                        height: 16px;
                        background: url(../../common/image/icon/icon_xzsp.png)
                            no-repeat;
                    }
                }
            }
        }
        .layui-tab-content {
            padding-left: 1px;
            padding-right: 1px;
            .layui-table {
                .table_headtr {
                    height: 50px;
                    background: #dae9ff !important;
                    td {
                        font-size: 16px;
                    }
                }
                tbody {
                    outline: 1px solid rgba(221, 221, 221, 1);
                    tr {
                        td:last-child {
                            p {
                                display: inline-block;
                                width: 173px;
                                text-align: left;
                                padding-right: 20px;
                            }
                            .moreafter{
                                position: relative;
                                display: inline-block;
                                padding-right:20px;
                            }
                            .moreafter:after {
                                content: "";
                                border: 6px dashed transparent;
                                border-top: 6px solid #3196FF;
                                width: 0;
                                height: 0;
                                font-size: 0;
                                display: inline-block;
                                *display: inline;
                                *zoom: 1;
                                vertical-align: -3px;
                                position: absolute;
                                bottom: auto;
                                right: 0px;
                                top: 12px;
                            }
                            .moreafterup{
                                position: relative;
                                display: inline-block;
                                padding-right:20px;
                            }
                            .moreafterup:after {
                                content: "";
                                border: 6px dashed transparent;
                                border-bottom: 6px solid #3196FF;
                                width: 0;
                                height: 0;
                                font-size: 0;
                                display: inline-block;
                                *display: inline;
                                *zoom: 1;
                                vertical-align: -3px;
                                position: absolute;
                                bottom: auto;
                                right: 0px;
                                top: 6px;
                            }
                        }
                    }
                }
            }
        }
    }
}
#sendgoods {
    padding-left: 53px;
    padding-right: 53px;

    table {
        tr {
            height: 54px;
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
                    background: url(../../common/image/icon/icon_hxcw.png)
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

.imgList {
    width: 70px;
    height: 70px;
}
.layui-table thead tr #checkeds {
    color: #3196FF!important;
}



</style>
