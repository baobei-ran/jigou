<template>
    <div id="addGoods" style="height:100%">
        <p class="Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24 Pd-R24 Mg-B24 clear bg_f"><span class="fl">创建商品/增加商品</span><span class="fr onbtn pointer">
                <el-button type="primary" :loading="disabled" :disabled='disabled' style='vertical-align: top;'  class="layui-btn site-demo-layedit rightBtn btn_preserve" data-type='content'>保存</el-button>
            </span><span class="fr cancelbtn Mg-R24 pointer" @click='back'>取消</span></p>
        <div class="layui-row layui-col-space22 head_msg">
            <div class="layui-col-md8">
                <div class="bg_f Mg-B24">
                    <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">商品信息</p>
                    <div class="layui-row order_datail  Pd-L24 Pd-R24">
                        <div class="layui-col-md12 layui-col-sm12">
                            <form class="layui-form" action="">
                                <table>
                                    <tr>
                                        <td width="10%">商品分类</td>
                                        <td>
                                            <div class="layui-input-inline" style="width:23%">
                                                <el-select v-model='classId' placeholder="请选择一级分类" @change='merchandise'>
                                                    <el-option
                                                    v-for="item in className"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                            <div class="layui-input-inline" style="width:23%">
                                                <el-select v-model='classId2' placeholder="请选择二级分类" @change="merchandise2">
                                                    <el-option
                                                    v-for="item in className2"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                            <div class="layui-input-inline" style="width:23%">
                                                <el-select v-model="classId3" placeholder="请选择三级分类" @change="merchandise3">
                                                    <el-option
                                                    v-for="item in className3"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                            <div class="layui-input-inline" style="width:23%">
                                                <el-select  placeholder="请选择四级分类" v-model='classId4'>
                                                    <el-option
                                                    v-for="item in className4"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>商品品牌</td>
                                        <td>
                                            <div class="layui-input-inline" style="width:28%">
                                                <el-select v-model='brandId' placeholder="请选择商品品牌" >
                                                    <el-option
                                                    v-for="item in brand"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>商品名称</td>
                                        <td>
                                            <div style="max-width:500px">
                                                <input type="text" name="title" v-model='name' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>商品副标题</td>
                                        <td>
                                            <div style="max-width:500px">
                                                <input type="text" name="title" v-model='ftitle' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="Pd-B20">商品标签</td>
                                        <td>
                                            <div style="max-width:500px;margin-top: 10px;">
                                                <input type="text" name="title" v-model='labelText' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                            </div>
                                            <p style="color:rgba(102,102,102,1);line-height:24px;margin-bottom: 10px;font-size:12px">每个标签请使用英文“,"分隔，用户可通过搜索标签查找是商品</p>
                                        </td>
                                    </tr>
                                    <tr style="height:182px">
                                        <td style="display:inline-block;vertical-align: top; width:100%">
                                            <p>商品图片</p>
                                        </td>
                                        <td>
                                            <div class="layui-input-inline" id='fileList'>
                                                <!-- 主图片上传 -->
                                                <div class="layui-input-inline uploadimg Mg-R10" id='files1'>
                                                    <div><span class="Ft-S14">点击上传</span> <input id='zhuFile' type="file" class="pointer" placeholder="" /></div>
                                                    <img style='width: 145px;height: 147px;border-radius: 4px;' id='zhuImg' src="" alt="">
                                                    <label class="zhuFileLabel" for="zhuFile">重新上传</label>
                                                </div>
                                                <!--    剩余五张图片 -->
                                                
                                                <div class="layui-input-inline uploadimg Mg-R10 hide" >
                                                    <div><span class="Ft-S14">点击上传</span> <input id='zhuFile2' type="file" class="pointer" placeholder="" /></div>
                                                    <img style='width: 145px;height: 147px;border-radius: 4px;' id='zhuImg2' src="" alt="">
                                                    <label class="zhuFileLabel" for="zhuFile2">重新上传</label>
                                                </div>
                                                 <div class="layui-input-inline uploadimg Mg-R10 hide" >
                                                    <div><span class="Ft-S14">点击上传</span> <input id='zhuFile3' type="file" class="pointer" placeholder="" /></div>
                                                    <img style='width: 145px;height: 147px;border-radius: 4px;' id='zhuImg3' src="" alt="">
                                                    <label class="zhuFileLabel" for="zhuFile3">重新上传</label>
                                                </div>  
                                                <div class="layui-input-inline uploadimg Mg-R10 hide" >
                                                    <div><span class="Ft-S14">点击上传</span> <input id='zhuFile4' type="file" class="pointer" placeholder="" /></div>
                                                    <img style='width: 145px;height: 147px;border-radius: 4px;' id='zhuImg4' src="" alt="">
                                                    <label class="zhuFileLabel" for="zhuFile4">重新上传</label>
                                                </div>
                                                <div class="layui-input-inline uploadimg Mg-R10 hide" >
                                                    <div><span class="Ft-S14">点击上传</span> <input id='zhuFile5' type="file" class="pointer" placeholder="" /></div>
                                                    <img style='width: 145px;height: 147px;border-radius: 4px;' id='zhuImg5' src="" alt="">
                                                    <label class="zhuFileLabel" for="zhuFile5">重新上传</label>
                                                </div>
                                                <div class="layui-input-inline uploadimg Mg-R10 hide" >
                                                    <div><span class="Ft-S14">点击上传</span> <input id='zhuFile6' type="file" class="pointer" placeholder="" /></div>
                                                    <img style='width: 145px;height: 147px;border-radius: 4px;' id='zhuImg6' src="" alt="">
                                                    <label class="zhuFileLabel" for="zhuFile6">重新上传</label>
                                                </div>


                                            </div>
                                            <p class="layui-input-inline Ft-S12 Color_gray6 Mg-T24" style="vertical-align: bottom;">最多上传6张图片（第一张为商品主图） 建议尺寸:750*750</p>
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="layui-col-md4 head_right">
                <div class="bg_f">
                    <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24 Mg-B24">上架设置</p>
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <label class="layui-form-label">上架状态</label>
                            <div class="layui-input-block">
                                <input type="radio" name="gtype" value="1" title="立即上架"  checked>
                                <input type="radio" name="gtype" value="2" title="暂不上架">
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">限购设置</label>
                            <div class="layui-input-block">
                                <input type="text" name="title" required lay-verify="required" disabled placeholder="暂时无法使用此功能" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">满减设置</label>
                            <div class="layui-input-block">
                                <input type="text" name="title" required lay-verify="required" disabled placeholder="暂时无法使用此功能" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">添加标签</label>
                            <div class="layui-input-block">
                                <input type="text" name="title" required lay-verify="required" disabled placeholder="暂时无法使用此功能" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
                        <div class="bg_f Mg-B24 Pd-L24 Pd-B12 Pd-T12">
                    <form class="layui-form" action="">
                        <table>
                            <tr>
                                <td width="40%">
                                    <span class="Mg-R30">运费设置</span>
                                    <!-- <input type="checkbox" name="price" title="全国包邮" lay-skin="primary" checked> -->
                                    <input type="radio" name="price" value="3" title="全国包邮" checked>
                                </td>
                                <td width="40%" class="">
                                    <!-- <input type="checkbox" name="price" title="默认运费" lay-skin="primary"> -->
                                    <input type="radio" name="price" value="1" v-model='yunfei' title="默认运费" >
                                    <!-- <span>默认运费：</span> -->
                                    <input style="width:100px;border:1px solid rgba(194,194,195,1);height:36px;padding-left:10px" :disabled='!yunfei'
                                        onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                                     v-model='setPrice' type="number" placeholder="¥">
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
                <div class="bg_f Mg-B24">
                    <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">商品属性</p>
                    <div class="layui-row order_datail  Pd-L24 Pd-R24">
                        <div class="layui-col-md12 layui-col-sm12">
                            <form class="layui-form" action="">
                                <table width="100%">
                                   
                                    <tr>
                                        <td>处方/非处方</td>
                                        <td>
                                            <input type="radio" name="recipe" value="1" title="处方" checked>
                                            <input type="radio" name="recipe" value="0" title="非处方" >
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>包装</td>
                                        <td>
                                            <input type="radio" name="pack" value="2" title="盒装" checked>
                                            <input type="radio" name="pack" value="1" title="袋装">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>剂型</td>
                                        <td>
                                            <input type="radio" name="type" value="丸剂" title="丸剂" checked>
                                            <input type="radio" name="type" value="颗粒剂" title="颗粒剂" >
                                            <input type="radio" name="type" value="片剂" title="片剂">
                                            <input type="radio" name="type" value="胶囊" title="胶囊" >
                                            <input type="radio" name="type" value="口服液体制剂" title="口服液体制剂" >
                                        </td>
                                    </tr>
                                    
                                    <tr class="trTxt">
                                        <td>通用名称</td>
                                        <td>
                                           
                                            <input type="text" name="title" v-model='dname' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                          
                                        </td>
                                        <td>用法用量</td>
                                        <td>
                                             <input type="text" name="title" v-model='dose' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                            
                                        </td>
                                    </tr>
                                    <tr class="trTxt">
                                        <td>药品性状</td>
                                        <td class="Pd-B12">
                                             <input type="text" name="title" v-model='properties' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                        <td>不良反应</td>
                                        <td class="Pd-B12">
                                             <input type="text" name="title" v-model='untoward_effect' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                    </tr>
                                    <tr class="trTxt">
                                        <td>包装规格</td>
                                        <td class="Pd-B12">
                                             <input type="text" name="title" v-model='package' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                        <td>储藏条件</td>
                                        <td class="Pd-B12">
                                             <input type="text" name="title" v-model='storage' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                    </tr>
                                    <tr class="trTxt">
                                        <td>药品成分</td>
                                        <td class="Pd-B10">
                                             <input type="text" name="title" v-model='ingredient' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                        <td>用药禁忌</td>
                                        <td class="Pd-B10">
                                             <input type="text" name="title" v-model='contraindication' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                    </tr>
                                    <tr class="trTxt">
                                        <td>功能主治</td>
                                        <td>
                                             <input type="text" name="title" v-model='attending_functions' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                        <td>注意事项</td>
                                        <td>
                                             <input type="text" name="title" v-model='cautions' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                    </tr>
                                    <tr class="trTxt">
                                        <td>批准文号</td>
                                        <td>
                                            <input type="text" name="title" v-model='code' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                        <td>生产厂商</td>
                                        <td>
                                            <input type="text" name="title" v-model='enterprise' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                    </tr>
                                    <tr class="trTxt">
                                        <td>相互作用</td>
                                        <td>
                                             <input type="text" name="title" v-model='interaction' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                        <td>有效期</td>
                                        <td>
                                             <input type="text" name="title" v-model='uselife' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="bg_f Mg-B24">
                    <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">价格库存</p>
                    <div class="layui-row order_datail  Pd-L24 Pd-R24">
                        <div class="layui-col-md12 layui-col-sm12">
                            <form class="layui-form" action="">
                                <table width="100%">
                                    <tr>
                                        <td width="80px">商品售价</td>
                                        <td>
                                            <div style="width:35%">
                                                <input type="number" name="title" v-model='money' required lay-verify="required" placeholder="￥" autocomplete="off" class="layui-input">
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>市场价</td>
                                        <td>
                                            <div style="width:35%">
                                                <input type="number" name="title" v-model='marketvalue' required lay-verify="required" placeholder="￥" autocomplete="off" class="layui-input">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>设置库存</td>
                                        <td>
                                            <div style="width:25%" class="fl">
                                                <!-- <el-input
                                                    placeholder=""
                                                    v-model="repertory"
                                                    :disabled="hand">
                                                </el-input> -->
                                                <input type="number" name="title" v-model='repertory' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                            </div>
                                            <!-- <div class="fl Mg-L10" style="line-height:36px"><input type="checkbox" name="xx" lay-filter="check" lay-skin="primary" title="不限库存"></div> -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>商品货号</td>
                                        <td>
                                            <div style="width:35%">
                                                <input type="text" name="title" required lay-verify="required" placeholder="保存后系统自动生成" disabled autocomplete="off" class="layui-input">
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="bg_f Mg-B24 Pd-T20 Pd-B20 Pd-L24">
                    <div class="layui-form">
                        <span class="Mg-R24">开启推荐</span>
                        <input type="radio" name="tuijian" style='font-size: 20px;' value="1" title="开启推荐" checked>
                        <input type="radio" name="tuijian" value="2" title="关闭推荐">
                    </div>
                </div>
                <div class="bg_f Mg-B24">
                    <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">详情内容</p>
                    <div class="layui-row order_datail  Pd-L24 Pd-R24">
                        <div class="layui-col-md12 layui-col-sm12">
                            <form class="layui-form" action="">
                                <table width="100%">
                                    <tr>
                                        <td style="padding-left:0px" class="Pd-B24"><textarea lay-verify="content" id="demos"></textarea></td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
        <p class="ac Mg-T24 goback"><button class="pointer Color_blue Mg-R24" @click="back" style="background:#fff; border:1px solid rgba(49,150,255,1)">取消</button> 
            <el-button type="primary" :loading="disabled" :disabled='disabled' style='vertical-align: top;'  class="layui-btn site-demo-layedit btn_preserve" data-type='content'>保存</el-button>
        </p>
    </div>
</template>
<script>
export default {
    name: 'orderList',
    data() {
        return {
            yunfei: false, // 默认运费改变
            hand: false, // 不限库存的按钮
            id: '', // 商品id
            name: '',   // 商品名称	
            ftitle: '', // 商品副标题	
            fileListImg: [], // 图片
            brand: [],       // 品牌
            brandId: '',       // 品牌ID
            className: [],      // 商品分类 1
            className2: [],      // 商品分类 2
            className3: [],      // 商品分类 3
            className4: [],      // 商品分类 4
            classId: '',
            classId2: '',
            classId3: '',
            classId4: '',
        
            valueId: '',         // 属性类型Id
            setPrice: '',        // 默认运费
            labelText: '',        // 商品标签
                        // start 已下为单选按钮群
            freight: '3',       // 运费设置
            gtype: 1,           //  选择上架还是下架参数
            recipe: 1,         //  是否处方
            pack: 2,           //  包装
            type: '丸剂',       //  剂型	
            dname: '中药',       //  是否中/西药
            // end
            dname: '',          // 通用名称
            dose: '',           // 用法用量
            properties: '',      //  药品性状
            untoward_effect: '',          // 不良反应	
            package: '',         //  包装规格
            storage: '',       // 储藏条件
            ingredient: '',      //  药品成分
            contraindication: '', // 用药禁忌
            attending_functions: '', // 功能主治
            cautions: '',           // 注意事项
            code: '',               // 批准文号
            enterprise: '',         // 生产企业
            interaction: '',        // 相互作用
            uselife: '',            // 有效期

            money: '',       //  商品售价
            marketvalue: '',    //  市场价格
            repertory: '',      // 设置库存
            details: '',         //  详情内容
            recommend: '1',      // 推荐商品 
            zPic: '',            //  主图片
            fPic1: '',           // 附图1
            fPic2: '',           // 附图2
            fPic3: '',           // 附图3
            fPic4: '',           // 附图4
            fPic5: '',           // 附图5
            disabled: false,     // 按钮控制
        }
    },
    created() {
        
    },
    mounted() {
        this.initdata() // 富文本编辑器
        this.addList();
    },
    methods: {  
        addList() { // 获取商品添加信息
            var _this = this;
            layui.use('form', function(){
                var form = layui.form;
                _this.$http.post('/shv2/goods/add_goodsInfo', {}, function (res) {
                if (res.code == 1) {
                    _this.brand = res.brand;
                    _this.className = res.class;
                    // console.log(_this.className)
                }
                // console.log(res)
            }, function (err) { console.log(err)})
            form.on('checkbox(check)', function(data){
                _this.hand = data.elem.checked; //是否被选中，true或者false
            });   
            form.on('radio', function(data){    // 监听 单选按钮
			    // console.log(data.elem.name);         //得到radio原始DOM对象
                // console.log(data.value);        //被点击的radio的value值
                switch(data.elem.name) {
                    case 'gtype': _this.gtype = data.value;  break;
                    case 'recipe': _this.recipe = data.value; break;
                    case 'pack': _this.pack = data.value; break;
                    case 'type': _this.type = data.value; break;
                    case 'price': _this.freight = data.value; 
                            if (_this.freight == 1) {
                                _this.yunfei = true
                            } else {
                                 _this.yunfei = false
                            }
                    ; break;
                    case 'tuijian': _this.recommend = data.value; break;
                }
            });  
            
            $('#zhuFile').on('change', function () {    // 主图为封面
                $('#zhuImg').attr('src', window.URL.createObjectURL(this.files[0]))
                $('#zhuImg').prev().hide()
                $('#zhuImg').next().show()
                $('#files1').next().show()
                 $.each($('#zhuFile')[0].files, function (i, file) {
                    _this.zPic = file
                })
            })

            // 一下五张是 附图
            $('#zhuFile2').on('change', function () {
                $('#zhuImg2').attr('src', window.URL.createObjectURL(this.files[0]))
                $('#zhuImg2').prev().hide()
                $('#zhuImg2').next().show()
                $('#files1').next().next().show()
                $.each($('#zhuFile')[0].files, function (i, file) {
                    _this.fPic1 = file
                })
            })

            $('#zhuFile3').on('change', function () {
                $('#zhuImg3').attr('src', window.URL.createObjectURL(this.files[0]))
                $('#zhuImg3').prev().hide()
                $('#zhuImg3').next().show()
                $('#files1').next().next().next().show()
                $.each($('#zhuFile')[0].files, function (i, file) {
                    _this.fPic2 = file
                })
            })

            $('#zhuFile4').on('change', function () {
                $('#zhuImg4').attr('src', window.URL.createObjectURL(this.files[0]))
                $('#zhuImg4').prev().hide()
                $('#zhuImg4').next().show()
                $('#files1').next().next().next().next().show()
                $.each($('#zhuFile')[0].files, function (i, file) {
                    _this.fPic3 = file
                })
            })

            $('#zhuFile5').on('change', function () {
                $('#zhuImg5').attr('src', window.URL.createObjectURL(this.files[0]))
                $('#zhuImg5').prev().hide()
                $('#zhuImg5').next().show()
                $('#files1').next().next().next().next().next().show()
                $.each($('#zhuFile')[0].files, function (i, file) {
                    _this.fPic4 = file
                })
            })

            $('#zhuFile6').on('change', function () {
                $('#zhuImg6').attr('src', window.URL.createObjectURL(this.files[0]))
                $('#zhuImg6').prev().hide()
                $('#zhuImg6').next().show()
                $.each($('#zhuFile')[0].files, function (i, file) {
                    _this.fPic5 = file
                })
            })
           
           
        });

           
            
        },
        merchandise(id) {   // 商品分类	第一个 id
           var _this = this;
           _this.classId2 = '';
           _this.classId3 = '';
           _this.classId4 = '';
           _this.className2 = '';
           _this.className3 = '';
           _this.className4 = '';
           this.$http.post('/shv2/goods/goods_class', { pid: id }, function (res) {
            //    console.log(res)
               if (res.code == 1) {
                   _this.className2 = res.data
               }
           }, function (err) { console.log(err)})
        },
        merchandise2(id) {   // 商品分类	第二个 id
           var _this = this;
           _this.classId3 = '';
           _this.classId4 = '';
           _this.className3 = '';
           _this.className4 = '';
           this.$http.post('/shv2/goods/goods_class', { pid: id }, function (res) {
            //    console.log(res)
               if (res.code == 1) {
                   _this.className3 = res.data
               }
           }, function (err) { console.log(err)})
        },
        merchandise3(id) {   // 商品分类	第三个 id
           var _this = this;
           this.classId4 = '';
           _this.className4 = '';
           this.$http.post('/shv2/goods/goods_class', { pid: id }, function (res) {
               if (res.code == 1) {
                   _this.className4 = res.data
               }
           }, function (err) { console.log(err)})
        },
        initdata() {    // 建立富文本编辑器
            var _this = this;
            layui.use(["layer", "element", "form", "layedit", 'jquery'], function () {
                var element = layui.element;
                var form = layui.form;
                
                var layedit = layui.layedit,
                    $ = layui.jquery;
                var index = layedit.build('demos',{
                    height:'160px'
                }); //建立编辑器
                form.verify({
                    content: function(value) { 
                        return layedit.sync(index);
                    }
                })
                $('.btn_preserve').on('click', function() {     
                    var type = $(this).data('type');
                    active[type] ? active[type].call(this) : '';
                    _this.obsubmit()    // 提交事件
                });
                //编辑器外部操作
                var active = {
                    content: function(){
                        _this.details = layedit.getContent(index); //获取编辑器内容
                    },
                    text: function(){
                        alert(layedit.getText(index)); //获取编辑器纯文本内容
                    }
                    ,selection: function(){
                        alert(layedit.getSelection(index));
                    }
                };

                if (_this.details) {    // 赋值
                    layedit.setContent(index, _this.details);
                }
                   
                form.render()//防止渲染失败
            });
        },
        back () {   // 取消返回
            this.$router.back();
        },
        obsubmit() {    // 添加商品、保存
            var _this = this;
            console.log(this.details)
            var formdata = new FormData();
            layui.use(['layer','form'], function(){
            var layer = layui.layer;
            var form = layui.from;
            
            if (!_this.classId) {
                layer.msg('请选择商品分类')
                return
            }
            if (!_this.brandId) {
                layer.msg('请选择商品品牌')
                return false
            } else if(!_this.name) {
                layer.msg('请输入商品名称')
                return false
            } else if (!_this.ftitle) {
                layer.msg('请输入商品副标题')
                return
            } else if (!_this.labelText) {
                layer.msg('请输入商品标签')
                return
            } else if (!_this.zPic) {
                layer.msg('请上传商品图片')
                return
            } else if (_this.freight == 1 && !_this.setPrice) {
                 layer.msg('请输入运费信息')
                return
            } else if (!_this.dname) {
                layer.msg('请输入通用名称')
                return
            } else if (!_this.dose) {
                layer.msg('请输入用法用量')
                return
            } else if (!_this.properties) {
                layer.msg('请输入药品性状')
                return
            } else if (!_this.untoward_effect) {
                layer.msg('请输入不良反应')
                return
            } else if (!_this.package) {
                layer.msg('请输入包装规格')
                return
            } else if (!_this.storage) {
                 layer.msg('请输入储藏条件')
                return
            } else if (!_this.ingredient) {
                layer.msg('请输入药品成分')
                return
            } else if (!_this.contraindication) {
                layer.msg('请输入用药禁忌')
                return
            } else if (!_this.attending_functions) {
                layer.msg('请输入功能主治')
                return
            } else if (!_this.cautions) {
                layer.msg('请输入注意事项')
                return
            } else if (!_this.code) {
                layer.msg('请输入批准文号')
                return
            } else if (!_this.enterprise) {
                layer.msg('请输入生产企业')
                return
            } else if (!_this.interaction) {
                layer.msg('请输入相互作用')
                return
            } else if (!_this.uselife) {
                layer.msg('请输入有效期')
                return
            } else if (!_this.money || _this.money < 1) {
                layer.msg('请输入商品价格')
                return
            } 
            if (!_this.marketvalue ||  _this.marketvalue < 1 ) {
                layer.msg('请输入市场价格')
                return
            } 
            if (!_this.repertory ||  _this.repertory < 1) {
                layer.msg('请输入库存')
                return
            } 
            else if (!_this.details) {
                layer.msg('请输入详情内容')
                return
            }
                _this.disabled = true;
                var time = setTimeout(function () {
                    _this.disabled = false
                }, 3000)
                var arr = [];
                arr.push(_this.fPic1, _this.fPic2, _this.fPic3, _this.fPic4, _this.fPic5)
                arr = arr.filter((val, i) => {  // 过滤一下
                    return val !==''
                })
                arr.forEach(val => {
                    formdata.append('picarr[]', val)
                })
                       //  商品图片  附图
                
                formdata.append("id", _this.id);
                formdata.append("one", _this.classId);
                formdata.append('two', _this.classId2);
                formdata.append('class', _this.classId3);
                formdata.append('four', _this.classId4);
                formdata.append('brand', _this.brandId);
                formdata.append('name', _this.name);
                formdata.append('vicename', _this.ftitle);
                formdata.append('pic', _this.zPic);           // 主图
                formdata.append("freight_status", _this.freight);
                formdata.append("freight_money", _this.setPrice);
                formdata.append('gtype', _this.gtype);
                formdata.append('label', _this.labelText);
                formdata.append('recipe', _this.recipe);
                formdata.append('pack', _this.pack);
                formdata.append('type', _this.type);
                formdata.append('dname', _this.dname);
                formdata.append('dose', _this.dose);
                formdata.append('properties', _this.properties);
                formdata.append('untoward_effect', _this.untoward_effect);
                formdata.append('package', _this.package);
                formdata.append('storage', _this.storage);
                formdata.append('ingredient', _this.ingredient);
                formdata.append('contraindication', _this.contraindication);
                formdata.append('attending_functions', _this.attending_functions);
                formdata.append('cautions', _this.cautions)
                formdata.append('code', _this.code)
                formdata.append('enterprise', _this.enterprise)
                formdata.append('interaction', _this.interaction)
                formdata.append('uselife', _this.uselife)
                formdata.append('money', _this.money) // 商品价格
                formdata.append('marketvalue', _this.marketvalue)  // 市场价
                formdata.append('stock', _this.repertory)  // 库存
                formdata.append('recommend', _this.recommend)  //  推荐商品
                formdata.append('describe', _this.details)     // 内容
                
                _this.$http.upload('/shv2/goods/save_goods?XDEBUG_SESSION_START=17401', formdata, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.msg(res.msg, { icon:1, time: 1500})
                        setTimeout(()=> {
                            _this.go('/jgmall/goodsList')
                        }, 1500)
                    } else {
                        layer.msg(res.msg, { icon:2 });
                    }
                }, function (err) { console.log(err);})
               
            }); 
            
        },

        // 进入编辑后调用的方法
        editClaaId(id) {
            return new Promise ((resolve, reject) => {
                this.$http.post('/shv2/goods/goods_class', { pid: id }, function (res) {
                            resolve(res)
                }, function (err) { reject(err) })
            })
        }
    }
}
</script>

<style scoped lang="less">
#addGoods {
    .rightBtn {
        vertical-align: top; 
        background:rgba(49,150,255,1);
        border-radius:4px;
        height: 32px;
        line-height: 32px;
        border: 1px solid #3196ff;
        color: #fff;
    }
    input {
        border: 1px solid rgba(194, 194, 195, 1);
    }
    .addangument {
        display: inline-block;
        width: 280px;
        height: 30px;
        border: 1px solid rgba(49, 150, 255, 1);
        border-radius: 4px;
        text-align: center;
        line-height: 30px;
    }
    .onbtn {
        width: 70px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        color: #fff;
        font-size: 16px;
    }
    .cancelbtn {
        color: #3196ff;
        border: 1px solid #3196ff;
        width: 70px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #fff;
        border-radius: 4px;
        font-size: 16px;
    }
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
    }
    .head_msg {
        .head_right {
            .bg_f {
                height: 516px;
                .layui-form-label {
                    width: 100px;
                }
                .layui-input-block {
                    width: 65%;
                }
            }

            ::-webkit-scrollbar {
                width: 4px;
                // height: 50px;
                background-color: #fff;
            }

            ::-webkit-scrollbar-track {
                border-radius: 4px;
                background-color: #fff;
            }

            ::-webkit-scrollbar-thumb {
                border-radius: 4px;
                -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                background-color: #e6e6e6;
            }
        }
    }
    .order_datail {
        padding-bottom: 12px;
        table {
            margin-top: 12px;
            width: 100%;
            tr {
                height: 60px;
                td {
                    font-size: 14px;
                }
                td:first-child {
                    color: #666;
                    text-align: right;
                    padding-right: 20px;
                }
                td:last-child {
                    color: #333;
                    .uploadimg {
                        width: 150px;
                        height: 150px;
                        margin: 3px 0;
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
                            margin-top: 168px;
                        }
                        p:last-child {
                            margin-top: 0px;
                        }
                    }
                }
            }
            tr.trTxt {
                width: 100%;
                td:first-child, td:nth-child(3) {
                    width: 80px;
                    text-align: right;
                    padding-right: 20px;
                }
                td:last-child, td:nth-child(2) {
                    width: 40%;
                    padding: 12px 0;
                    input {
                        width: 100%;
                    }
                }
            }
        }
    }

    .goback {
        margin-bottom: 98px;
        button {
            width: 100px;
            height: 36px;
            background: rgba(49, 150, 255, 1);
            border-radius: 4px;
            border: none;
            font-size: 16px;
            color: #fff;
        }
    }
}

.zhuFileLabel {
    position:absolute;
     bottom: 0;
     left: 0;
     cursor: pointer;
     border-radius: 0 0 4px 4px;
     background: rgba(0,0,0,.6);
     display: block;
     width: 100%;
     color: #fff;
     line-height: 28px;
     display: none;
}
#fileList {
    display: flex;
    flex-wrap: wrap;
}




</style>
