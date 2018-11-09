import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import bindTel from '@/pages/bindTel'
import inputCode from '@/pages/inputCode'
import index from '@/pages/index'
import classroom from '@/pages/classroom'
import courseDetail from '@/pages/courseDetail'
import videoDetail from '@/pages/videoDetail'
import complated1 from '@/pages/complated1'
import complated2 from '@/pages/complated2'
import complated3 from '@/pages/complated3'
import campDetail from '@/pages/campDetail'
import buyCourse from '@/pages/buyCourse'
import selectType from '@/pages/selectType'
import community from '@/pages/community'
import trendDetail from '@/pages/trendDetail'
import moreEval from '@/pages/moreEval'
import answerDetail from '@/pages/answerDetail'
import submitTrend from '@/pages/submitTrend'
import mine from '@/pages/mine'
import mineMsg from '@/pages/mineMsg'
import msgDetail from '@/pages/msgDetail'
import sysMsgDetail from '@/pages/sysMsgDetail'
import collections from '@/pages/collections'
import giftRecord from '@/pages/giftRecord'
import receive from '@/pages/receive'
import sendPage from '@/pages/sendPage'
import setting from '@/pages/setting'
import sysSetting from '@/pages/sysSetting'
import feedback from '@/pages/feedback'
import accountSet from '@/pages/accountSet'
import bindAccount from '@/pages/bindAccount'
import abouts from '@/pages/abouts'
import beVip from '@/pages/beVip'

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
      path: '/buyCourse',
      name: 'buyCourse',
      component: buyCourse,
      meta: {requirePhone: true}
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
      meta: {requirePhone: true}
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
      path: '/beVip',
      name: 'beVip',
      component: beVip
    }
  ]
})
