import Vue from "vue";
import Router from "vue-router";
const Error404 = () => import('@/components/404/404');      //  404页
import Home from '@/home';
import Index from "@/components/index"; //首页
import login from "@/components/public/login/login"; //登录
import register from "@/components/public/login/register"; //注册
import forgetpass from "@/components/public/login/forgetPass"; //忘记密码
import lytAccount from "@/components/public/lytAccount"; //鲁医通账户
import tradingBill from "@/components/public/tradingBill"; //交易记录
import monthBillDetail from "@/components/public/monthBillDetail"; //月交易记录
import recharge from "@/components/public/recharge"; //充值
import rechargeResult from "@/components/public/rechargebox/rechargeResult"; //充值结果
import insetBank from "@/components/public/rechargebox/insetBank"; //充值到银行卡
import withdrawal from "@/components/public/withdrawal"; //提现
import withdrawalResult from "@/components/public/withdrawal/withdrawalResult"; //提现结果
import checkprice from "@/components/public/withdrawal/checkprice"; //提现验证
import outToBank from "@/components/public/withdrawal/outToBank"; //取出到银行卡
import bankcardadmin from "@/components/public/bankcardAdmin"; //银行卡管理

import mechanismNext from "@/components/public/mechanismMsg/mechanismNext"; // 医院机构信息下一步
import Checkbank from "@/components/public/mechanismMsg/checkbank"; // 医院机构信息审核
import mesuccess from "@/components/public/mechanismMsg/mesuccess"; // 医院机构信息成功

import BoxMechanismMsg from "@/components/public/boxMechanismMsg";  // 药店医院共享机构认证信息填写

// import mechanismMsg from "@/components/public/mechanismMsg"; // 医院机构信息
// import YaomechanismMsg from "@/components/Yao/Yao-mechanismMsg"; //药店机构信息

import YaomechanismNext from "@/components/Yao/mechanismMsg/Yao-mechanismNext"; //药店机构信息下一步
import Yaocheckmemsg from "@/components/Yao/mechanismMsg/Yao-checkbank"; //药店机构信息审核
import Yaomesuccess from "@/components/Yao/mechanismMsg/Yao-mesuccess"; //药店机构信息成功

// import safePayment from "@/components/public/safePayment"; //安全支付 对公绑卡(去除)
import bindbankLegal from "@/components/public/safePayment/bindbankLegal"; //法人绑卡
import bindbankPerson from "@/components/public/safePayment/bindbankPerson"; //个人其他绑卡
import Success from '@/components/public/safePayment/success';           // 绑卡成功 或者 失败的提示页
import checkbank from "@/components/public/safePayment/checkbank"; //审核账户
import otherform from "@/components/public/safePayment/otherform"; //再次提交 个人账户的
import changePass from "@/components/public/changePass"; //修改密码
import changePhone from "@/components/public/changePhone"; //修改手机号
import changePhonechild from "@/components/public/changePhone/changePhonechild"; //填写新手机号



import YiRouter from './Yi-index';   // 医院的路由
import YaoRouter from './Yao-index'; // 药店列表路由


// console.log(YaoRouter)
Vue.use(Router);
  var allroutes = [
    {
      path: "",
      name: '首页',
      component: Index
    },
    {
      path: "/finance/lytAccount",
      name: "鲁医通账户",
      component: lytAccount
    },
    {
      path: "/finance/tradingBill",
      name: "交易账单",
      component: tradingBill
    },
    {
      path: "/finance/monthBillDetail",
      name: "月账单明细",
      component: monthBillDetail
    },
    {
      path: "/finance/recharge",
      name: "充值",
      component: recharge
    },
    {
      path: "/finance/recharge/rechargeResult",
      name: "充值结果",
      component: rechargeResult
    },
    {
      path: "/finance/recharge/insetBank",
      name: "充值到银行卡",
      component: insetBank
    },
    {
      path: "/finance/withdrawal",
      name: "提现",
      component: withdrawal
    },
    {
      path: "/finance/withdrawal/withdrawalResult",
      name: "提现结果",
      component: withdrawalResult
    },
    {
      path: "/finance/withdrawal/checkprice",
      name: "提现审核",
      component: checkprice
    },
    {
      path: "/finance/withdrawal/outToBank",
      name: "提现到银行卡",
      component: outToBank
    },
    {
      path: "/finance/bankcardadmin",
      name: "银行卡管理",
      component: bankcardadmin
    },
    // {
    //   path: "/finance/bankcardadmin/safePayment",
    //   name: "对公账户",
    //   component: safePayment
    // },
    {
      path: "/finance/bankcardadmin/bindbankLegal",
      name: "法人账户",
      component: bindbankLegal
    },
    {
      path: "/finance/bankcardadmin/bindbankPerson",
      name: "其他账户",
      component: bindbankPerson
    },
    {
      path: '/finance/bankcardadmin/success',
      name: '绑卡提示',
      component: Success
    },
    {
      path: "/finance/bankcardadmin/checkbank",
      name: "审核账户",
      component: checkbank
    },
    {
      path: "/finance/bankcardadmin/otherform",
      name: "再次提交",
      component: otherform
    },
    
    // 医院机构信息
    {
      path: "/setting/boxMechanismMsg/mechanismNext",
      name: "机构信息第二步",
      component: mechanismNext
    },
    {
      path: "/setting/boxMechanismMsg/checkmemsg",
      name: "机构信息审核",
      component: Checkbank
    },
    {
      path: "/setting/boxMechanismMsg/mesuccess",
      name: "机构信息成功",
      component: mesuccess
    },
    

    {
      path: "/setting/boxMechanismMsg",   // 机构认证 医院和药店共享页面
      name: "机构认证信息添加",
      component: BoxMechanismMsg
    },

    // 药店机构信息
    
    {
      path: "/setting/boxMechanismMsg/YaomechanismNext",
      name: "药店机构信息第二步",
      component: YaomechanismNext
    },
    {
      path: "/setting/boxMechanismMsg/Yaocheckmemsg",
      name: "药店机构信息审核",
      component: Yaocheckmemsg
    },
    {
      path: "/setting/boxMechanismMsg/Yaomesuccess",
      name: "药店机构信息成功",
      component: Yaomesuccess
    },
    
    {
      path: "/setting/changePass",
      name: "修改密码",
      component: changePass
    },
    {
      path: "/setting/changePhone",
      name: "修改手机号",
      component: changePhone
    },
    {
      path: "/setting/changePhone/changePhonechild",
      name: "新手机号",
      component: changePhonechild
    }    
  ]


  
  allroutes = allroutes.concat(YaoRouter).concat(YiRouter); // 合并
  // console.log(allroutes)
  const routes = [
    {
      path: "/",
      component: Home,
      children: allroutes // 二级路由
    },
    {
      path: "/login",
      name: "登录",
      component: login
      
    },
    {
      path: "/register",
      name: "注册",
      component: register
      
    },
    {
      path: "/forgetpass",
      name: "忘记密码",
      component: forgetpass
    },
    {
      path: "*",
      name: '404',
      component: Error404
    }
  ]
  const router = new Router({
    // mode: "history",
    base: 'shanghu',
    routes
  });



  //导航钩子
  router.beforeEach((to, from, next) => {
      next()
  })


  export default router;