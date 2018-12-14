import Vue from 'vue'
import Router from 'vue-router'


const bindTel = () => import(/* webpackChunkName: 'bindTel' */ '@/pages/bindTel')

const inputCode = () => import(/* webpackChunkName: 'inputCode' */ '@/pages/inputCode')

const index = () => import(/* webpackChunkName: 'index' */ '@/pages/index')

const classroom = () => import(/* webpackChunkName: 'classroom' */ '@/pages/classroom')

const classify = () => import(/* webpackChunkName: 'classify' */ '@/pages/classify')

const courseDetail = () => import(/* webpackChunkName: 'courseDetail' */ '@/pages/courseDetail')

const videoDetail = () => import(/* webpackChunkName: 'videoDetail' */ '@/pages/videoDetail')

const complated1 = () => import(/* webpackChunkName: 'complated1' */ '@/pages/complated1')

const complated2 = () => import(/* webpackChunkName: 'complated2' */ '@/pages/complated2')

const complated3 = () => import(/* webpackChunkName: 'complated3' */ '@/pages/complated3')

const campDetail = () => import(/* webpackChunkName: 'campDetail' */ '@/pages/campDetail')

const selectType = () => import(/* webpackChunkName: 'selectType' */ '@/pages/selectType')

const community = () => import(/* webpackChunkName: 'community' */ '@/pages/community')

const trendDetail = () => import(/* webpackChunkName: 'trendDetail' */ '@/pages/trendDetail')

const questionDetail = () => import(/* webpackChunkName: 'questionDetail' */ '@/pages/questionDetail')

const moreEval = () => import(/* webpackChunkName: 'moreEval' */ '@/pages/moreEval')

const answerDetail = () => import(/* webpackChunkName: 'answerDetail' */ '@/pages/answerDetail')

const submitTrend = () => import(/* webpackChunkName: 'submitTrend' */ '@/pages/submitTrend')

const mine = () => import(/* webpackChunkName: 'mine' */ '@/pages/mine')

const mineMsg = () => import(/* webpackChunkName: 'mineMsg' */ '@/pages/mineMsg')

const msgDetail = () => import(/* webpackChunkName: 'msgDetail' */ '@/pages/msgDetail')

const sysMsgDetail = () => import(/* webpackChunkName: 'sysMsgDetail' */ '@/pages/sysMsgDetail')

const collections = () => import(/* webpackChunkName: 'collections' */ '@/pages/collections')

const giftRecord = () => import(/* webpackChunkName: 'giftRecord' */ '@/pages/giftRecord')

const receive = () => import(/* webpackChunkName: 'receive' */ '@/pages/receive')

const sendPage = () => import(/* webpackChunkName: 'sendPage' */ '@/pages/sendPage')

const setting = () => import(/* webpackChunkName: 'setting' */ '@/pages/setting')

const sysSetting = () => import(/* webpackChunkName: 'sysSetting' */ '@/pages/sysSetting')

const feedback = () => import(/* webpackChunkName: 'feedback' */ '@/pages/feedback')

const accountSet = () => import(/* webpackChunkName: 'accountSet' */ '@/pages/accountSet')

const bindAccount = () => import(/* webpackChunkName: 'bindAccount' */ '@/pages/bindAccount')

const abouts = () => import(/* webpackChunkName: 'abouts' */ '@/pages/abouts')

const beVip = () => import(/* webpackChunkName: 'beVip' */ '@/pages/beVip')

const changePwd = () => import(/* webpackChunkName: 'changePwd' */ '@/pages/changePwd')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/bindTel',
      name: 'bindTel',
      component: bindTel
    },
    {
      path: '/inputCode',
      name: 'inputCode',
      component: inputCode
    },
    {
      path: '/classroom',
      name: 'classroom',
      component: classroom
    },
    {
      path: '/classify',
      name: 'classify',
      component: classify
    },
    {
      path: '/courseDetail',
      name: 'courseDetail',
      component: courseDetail
    },
    {
      path: '/videoDetail',
      name: 'videoDetail',
      component: videoDetail
    },
    {
      path: '/complated1',
      name: 'complated1',
      component: complated1
    },
    {
      path: '/complated2',
      name: 'complated2',
      component: complated2
    },
    {
      path: '/complated3',
      name: 'complated3',
      component: complated3
    },
    {
      path: '/campDetail',
      name: 'campDetail',
      component: campDetail
    },
    {
      path: '/selectType',
      name: 'selectType',
      component: selectType
    },
    {
      path: '/community',
      name: 'community',
      component: community
    },
    {
      path: '/trendDetail',
      name: 'trendDetail',
      component: trendDetail
    },
    {
      path: '/questionDetail',
      name: 'questionDetail',
      component: questionDetail
    },
    {
      path: '/moreEval',
      name: 'moreEval',
      component: moreEval
    },
    {
      path: '/answerDetail',
      name: 'answerDetail',
      component: answerDetail
    },
    {
      path: '/submitTrend',
      name: 'submitTrend',
      component: submitTrend
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine,
    },
    {
      path: '/mineMsg',
      name: 'mineMsg',
      component: mineMsg
    },
    {
      path: '/msgDetail',
      name: 'msgDetail',
      component: msgDetail
    },
    {
      path: '/sysMsgDetail',
      name: 'sysMsgDetail',
      component: sysMsgDetail
    },
    {
      path: '/collections',
      name: 'collections',
      component: collections
    },
    {
      path: '/giftRecord',
      name: 'giftRecord',
      component: giftRecord
    },
    {
      path: '/sendPage',
      name: 'sendPage',
      component: sendPage
    },
    {
      path: '/receive',
      name: 'receive',
      component: receive
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '/sysSetting',
      name: 'sysSetting',
      component: sysSetting
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback
    },
    {
      path: '/accountSet',
      name: 'accountSet',
      component: accountSet
    },
    {
      path: '/abouts',
      name: 'abouts',
      component: abouts
    },
    {
      path: '/bindAccount',
      name: 'bindAccount',
      component: bindAccount
    },
    {
      path: '/changePwd',
      name: 'changePwd',
      component: changePwd
    },
    {
      path: '/beVip',
      name: 'beVip',
      component: beVip
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})



