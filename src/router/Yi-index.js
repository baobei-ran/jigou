
// 医院路由
import bookingOrder from "@/components/Yi/Yi-bookingOrder"; //预约订单
import bookingOrderdetail from "@/components/Yi/bookingOrder/bookingOrderdetail"; //预约订单详情
import inquiryOrder from '@/components/Yi/Yi-inquiryOrder';   // 问诊列表
import doctorScheduling from "@/components/Yi/Yi-doctorScheduling"; //医生排班
import doctorSchedulingdetail from "@/components/Yi/doctorScheduling/doctorSchedulingdetail"; //医生排班专家
import doctorSchedulingdetail1 from "@/components/Yi/doctorScheduling/doctorSchedulingdetail1"; //医生排班普通
import doctorParabiose from "@/components/Yi/Yi-doctorParabiose"; //医连体
import addDoctorParabiose from "@/components/Yi/doctorParabiose/addDoctorParabiose"; //添加医连体
import doctorParabiosemsg from "@/components/Yi/doctorParabiose/doctorParabiosemsg"; //医院关联进度
import record from "@/components/Yi/doctorParabiose/record"; //合作记录
import recorddetail from "@/components/Yi/doctorParabiose/recorddetail"; //合作记录详情
import drugParabiose from "@/components/Yi/Yi-drugParabiose"; //药连体
import addDrugParabiose from "@/components/Yi/drugParabiose/addDrugParabiose"; //添加药连体
import drugParabiosemsg from "@/components/Yi/drugParabiose/drugParabiosemsg"; //药店关联进度
import drugrecord from "@/components/Yi/drugParabiose/record"; //药店合作记录
import drugrecorddetail from "@/components/Yi/drugParabiose/recorddetail"; //药店合作记录详情
import equipmenApply from "@/components/Yi/Yi-equipmenApply"; //设备申请
import equipmendetail from "@/components/Yi/equipmenApply/equipmendetail"; //设备详情
import serverSetting from '@/components/Yi/Yi-serverSetting';          // 服务设置
import equipmenjl from "@/components/Yi/equipmenApply/equipmenjl"; //记录
import doctorList from "@/components/Yi/Yi-doctorList"; //医生列表
import doctorListAdd from "@/components/Yi/doctorList/doctorListAdd"; //医生列表
import doctordetail from "@/components/Yi/doctorList/doctordetail"; //查看医生信息
import doctorEdit from "@/components/Yi/doctorList/doctorEdit"; //编辑医生信息
import departmentList from "@/components/Yi/Yi-departmentList"; //科室列表
import departmentDetail from "@/components/Yi/departmentList/departmentDetail"; //查看科室
import departmentEdit from "@/components/Yi/departmentList/departmentEdit"; //编辑科室
import departmentAdd from "@/components/Yi/departmentList/departmentAdd"; // 添加科室
import Member from '@/components/Yi/Yi-vipmember';   // 会员首页
import Inform from '@/components/Yi/Yi-inform';   // 通知首页
import Purchase from '@/components/Yi/Yi-purchase';   // 采购首页




export default [
    {
      path: "/server/bookingOrder",
      name: "预约订单",
      component: bookingOrder
    },
    {
      path: "/server/bookingOrder/bookingOrderdetail",
      name: "预约订单详情",
      component: bookingOrderdetail
    },
    {
      path: "/server/inquiryOrder",
      name: "问诊订单",
      component: inquiryOrder
    },
    {
      path: "/server/doctorScheduling",
      name: "医生排班",
      component: doctorScheduling
    },
    {
      path: "/server/doctorScheduling/doctorSchedulingdetail",
      name: "医生排班专家",
      component: doctorSchedulingdetail
    },
    {
      path: "/server/doctorScheduling/doctorSchedulingdetail1",
      name: "医生排班普通",
      component: doctorSchedulingdetail1
    },
    {
      path: "/server/doctorParabiose",
      name: "医联体",
      component: doctorParabiose
    },
    {
      path: "/server/doctorParabiose/addDoctorParabiose",
      name: "增加医联体",
      component: addDoctorParabiose
    },
    {
      path: "/server/doctorParabiose/doctorParabiosemsg",
      name: "医院关联进度",
      component: doctorParabiosemsg
    },
    {
      path: "/server/doctorParabiose/record",
      name: "合作记录",
      component: record
    },
    {
      path: "/server/doctorParabiose/recorddetail",
      name: "合作记录详情",
      component: recorddetail
    },
    {
      path: "/server/drugParabiose",
      name: "药联体",
      component: drugParabiose
    },
    {
      path: "/server/drugParabiose/addDrugParabiose",
      name: "增加药联体",
      component: addDrugParabiose
    },
    {
      path: "/server/drugParabiose/drugParabiosemsg",
      name: "药店关联进度",
      component: drugParabiosemsg
    },
    {
      path: "/server/drugParabiose/drugrecord",
      name: "药店合作记录",
      component: drugrecord
    },
    {
      path: "/server/drugParabiose/drugrecorddetail",
      name: "药店合作记录详情",
      component: drugrecorddetail
    },
    {
      path: "/server/equipmenApply",
      name: "设备申请",
      component: equipmenApply
    },
    {
      path: "/server/equipmenApply/equipmendetail",
      name: "设备详情",
      component: equipmendetail
    },
    {
      path: "/server/serverSetting",
      name: "服务设置",
      component:serverSetting
    },
    {
      path: "/server/equipmenApply/equipmenjl",
      name: "申请记录",
      component: equipmenjl
    },
    {
        path: "/data/doctorList",
        name: "医生列表",
        component: doctorList
    },
    {
        path: "/data/doctorList/doctorListAdd",
        name: "添加医生",
        component: doctorListAdd
    },
    {
        path: "/data/doctorList/doctordetail",
        name: "查看医生信息",
        component: doctordetail
    },
    {
        path: "/data/doctorList/doctorEdit",
        name: "编辑医生信息",
        component: doctorEdit
    },
    {
        path: "/data/departmentList",
        name: "科室列表",
        component: departmentList
    },
    {
        path: "/data/departmentList/departmentDetail",
        name: "查看科室",
        component: departmentDetail
    },
    {
        path: "/data/departmentList/departmentEdit",
        name: "编辑科室",
        component: departmentEdit
    },
    {
        path: "/data/departmentList/departmentAdd",
        name: "增加科室",
        component: departmentAdd
    },  
    {
        path: '/vip/vipmember',
        name: '开通会员',
        component: Member
    },
    {
        path: '/supply/purchase',
        name: '采购',
        component: Purchase
    },
    {
        path: '/message/inform',
        name: '消息通知',
        component: Inform
    }, 
]