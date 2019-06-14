
// 药店端

import shopMsg from "@/components/public/shopMsg"; //店铺信息
import goodsList from "@/components/Yao/Yao-goodsList"; //商品列表 
import addGoods from "@/components/Yao/list/Yao-addGoods"; //新增商品
import editGoods from "@/components/Yao/list/Yao-editGoods"; //编辑商品
import List from "@/components/Yao/Yao-List"; //列表
import listDetail from "@/components/Yao/List/Yao-ListDetail"; //列表
import sendGoodsList from "@/components/Yao/Yao-sendGoodsList"; //发货列表
import sendGoodsLog from "@/components/Yao/Yao-sendGoodsLog"; //发货日志
import refundList from "@/components/Yao/Yao-refundList"; //退款列表
import evaluationAdmin from "@/components/Yao/Yao-evaluationAdmin"; //评价管理
import mallAdmin from "@/components/Yao/jgmall/Yao-mall"; //商城管理
import Openmall from "@/components/Yao/jgmall/Open_the_mall"; //开通商城
import statisticsHome from '@/components/Yao/Yao-statistics';           // 统计首页
import Vipmember from '@/components/Yao/Yao-member';                    //  药店会员首页
import Marketing from '@/components/Yao/Yao-marketing';                 // 供销页
import InfromMsg from '@/components/Yao/Yao-informMsg';                 //  通知页
import YaodrugParabiose from "@/components/Yao/Yao-drugParabiose"; //药连体
import YaoaddDrugParabiose from "@/components/Yao/drugParabiose/addDrugParabiose"; //添加药连体
import YaodrugParabiosemsg from "@/components/Yao/drugParabiose/drugParabiosemsg"; //药店关联进度
import Yaodrugrecord from "@/components/Yao/drugParabiose/record"; //药店合作记录
import Yaodrugrecorddetail from "@/components/Yao/drugParabiose/recorddetail"; //药店合作记录详情
import YaoequipmenApply from "@/components/Yao/Yao-equipmenApply"; //设备申请
import Yaoequipmendetail from "@/components/Yao/equipmenApply/equipmendetail"; //设备详情
import Yaoequipmenjl from "@/components/Yao/equipmenApply/equipmenjl"; //记录



// 药店路由
const Yaoprescription = () => import('@/components/Yao/Yao-prescription' /* webpackChunkName: "prescription" */ );       // 处方医生列表资料上传
const PrescriptionList = () => import('@/components/Yao/prescription/prescriptionList' /* webpackChunkName: "prescription" */);  // 处方单申请页
const PrescriptionApply = () => import('@/components/Yao/prescription/prescriptionApply' /* webpackChunkName: "prescription" */); // 处方单申请列表页
const PrescriptionRecords = () => import('@/components/Yao/prescription/prescriptionRecords' /* webpackChunkName: "prescription" */); // 处方单记录
const AddApply = () => import('@/components/Yao/prescription/addApply' /* webpackChunkName: "prescription" */);  // 创建处方单
const YaoprescriptionList = () => import('@/components/Yao/Yao-prescriptionList' /* webpackChunkName: "prescription" */);  // 处方单列表
const PrescriptionCheck = () => import('@/components/Yao/prescriptionList/prescriptionCheck' /* webpackChunkName: "prescription" */);   //  处方单审核

export default [
    {
        path: "/setting/shopMsg",
        name: "店铺信息",
        component: shopMsg
    },
    {
        path: "/jgmall/goodsList",
        name: "商品列表",
        component: goodsList
    },
    {
        path: "/jgmall/goodsList/addGoods",
        name: "新增商品",
        component: addGoods
    },
    {
        path: "/jgmall/goodsList/editGoods",
        name: "编辑商品",
        component: editGoods
    },
    {
        path: "/jgmall/List",
        name: "订单列表",
        component: List
    },
    {
        path: "/jgmall/List/listDetail",
        name: "订单列表详情",
        component: listDetail
    },
    {
        path: "/jgmall/sendGoodsList",
        name: "发货列表",
        component: sendGoodsList
    },
    {
        path: "/jgmall/sendGoodsLog",
        name: "发货日志",
        component: sendGoodsLog
    },
    {
        path: "/jgmall/refundList",
        name: "退款列表",
        component: refundList
    },
    {
        path: "/jgmall/evaluationAdmin",
        name: "评价管理",
        component: evaluationAdmin
    },
    {
        path: "/jgmall/openmall/mallAdmin",
        name: "商城管理",
        component: mallAdmin
    },
    {
        path: '/jgmall/openmall',
        name: '开通商城',
        component: Openmall
    },
    {
        path: '/statistics/home',
        name: '统计',
        component: statisticsHome
    },
    {
        path: '/vip/member',
        name: '会员',
        component: Vipmember
    },
    {
        path: '/supply/marketing',
        name: '供销',
        component: Marketing
    },
    {
        path: '/messages/informMsg',
        name: '通知',
        component: InfromMsg
    },
    {
      path: "/server/YaodrugParabiose",
      name: "药店端药联体",
      component: YaodrugParabiose
    },
    {
      path: "/server/YaodrugParabiose/YaoaddDrugParabiose",
      name: "药店端增加药联体",
      component: YaoaddDrugParabiose
    },
    {
      path: "/server/YaodrugParabiose/YaodrugParabiosemsg",
      name: "药店端药店关联进度",
      component: YaodrugParabiosemsg
    },
    {
      path: "/server/YaodrugParabiose/Yaodrugrecord",
      name: "药店端药店合作记录",
      component: Yaodrugrecord
    },
    {
      path: "/server/YaodrugParabiose/Yaodrugrecorddetail",
      name: "药店端药店合作记录详情",
      component: Yaodrugrecorddetail
    },
    {
      path: "/server/YaoequipmenApply",
      name: "药店端设备申请",
      component: YaoequipmenApply
    },
    {
      path: "/server/YaoequipmenApply/Yaoequipmendetail",
      name: "药店端设备详情",
      component: Yaoequipmendetail
    },
    {
      path: "/server/YaoequipmenApply/Yaoequipmenjl",
      name: "药店端申请记录",
      component: Yaoequipmenjl
    },



    // 处方
    {
        path: '/server/Yaodoctorprescription',
        name: '处方单医生资料上传',
        component: Yaoprescription
    },
    {
        path: '/server/Yaodoctorprescription/prescriptionList',
        name: '处方单医生列表',
        component: PrescriptionList
    },
    {
        path: '/server/Yaodoctorprescription/prescriptionApply',
        name: '处方单申请列表',
        component: PrescriptionApply
    },
    {
        path: '/server/Yaodoctorprescription/prescriptionRecords',
        name: '处方单申记录',
        component: PrescriptionRecords
    },
    {
        path: '/server/Yaodoctorprescription/addApply',
        name: '创建处方单',
        component: AddApply
    },
    {
        path: '/server/YaoprescriptionList',
        name: '处方单列表',
        component: YaoprescriptionList
    },
    {
        path: '/server/YaoprescriptionList/prescriptionCheck',
        name: '处方单详情',
        component: PrescriptionCheck
    },
]