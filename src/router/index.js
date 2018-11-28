import Vue from 'vue'
import Router from 'vue-router'
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
import questionDetail from '@/pages/questionDetail'
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
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})




// import Vue from 'vue'
// import Router from 'vue-router'
// import index from '@/pages/index'

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'index',
//       component: index
//     },
//     {
//       path: '/bindTel',
//       name: 'bindTel',
//       component: resolve => require(['@/pages/bindTel'],resolve)
//     },
//     {
//       path: '/inputCode',
//       name: 'inputCode',
//       component: resolve => require(['@/pages/inputCode'],resolve)
//     },
//     {
//       path: '/classroom',
//       name: 'classroom',
//       component: resolve => require(['@/pages/classroom'],resolve)
//     },
//     {
//       path: '/courseDetail',
//       name: 'courseDetail',
//       component: resolve => require(['@/pages/courseDetail'],resolve)
//     },
//     {
//       path: '/videoDetail',
//       name: 'videoDetail',
//       component: resolve => require(['@/pages/videoDetail'],resolve)
//     },
//     {
//       path: '/complated1',
//       name: 'complated1',
//       component: resolve => require(['@/pages/complated1'],resolve)
//     },
//     {
//       path: '/complated2',
//       name: 'complated2',
//       component: resolve => require(['@/pages/complated2'],resolve)
//     },
//     {
//       path: '/complated3',
//       name: 'complated3',
//       component: resolve => require(['@/pages/complated3'],resolve)
//     },
//     {
//       path: '/campDetail',
//       name: 'campDetail',
//       component: resolve => require(['@/pages/campDetail'],resolve)
//     },
//     {
//       path: '/buyCourse',
//       name: 'buyCourse',
//       component: resolve => require(['@/pages/buyCourse'],resolve),
//       meta: {requirePhone: true}
//     },
//     {
//       path: '/selectType',
//       name: 'selectType',
//       component: resolve => require(['@/pages/selectType'],resolve)
//     },
//     {
//       path: '/community',
//       name: 'community',
//       component: resolve => require(['@/pages/community'],resolve)
//     },
//     {
//       path: '/trendDetail',
//       name: 'trendDetail',
//       component: resolve => require(['@/pages/trendDetail'],resolve)
//     },
//     {
//       path: '/questionDetail',
//       name: 'questionDetail',
//       component: resolve => require(['@/pages/questionDetail'],resolve)
//     },
//     {
//       path: '/moreEval',
//       name: 'moreEval',
//       component: resolve => require(['@/pages/moreEval'],resolve)
//     },
//     {
//       path: '/answerDetail',
//       name: 'answerDetail',
//       component: resolve => require(['@/pages/answerDetail'],resolve)
//     },
//     {
//       path: '/submitTrend',
//       name: 'submitTrend',
//       component: resolve => require(['@/pages/submitTrend'],resolve)
//     },
//     {
//       path: '/mine',
//       name: 'mine',
//       component: resolve => require(['@/pages/mine'],resolve),
//       meta: {requirePhone: true}
//     },
//     {
//       path: '/mineMsg',
//       name: 'mineMsg',
//       component: resolve => require(['@/pages/mineMsg'],resolve),
//     },
//     {
//       path: '/msgDetail',
//       name: 'msgDetail',
//       component: resolve => require(['@/pages/msgDetail'],resolve),
//     },
//     {
//       path: '/sysMsgDetail',
//       name: 'sysMsgDetail',
//       component: resolve => require(['@/pages/sysMsgDetail'],resolve),
//     },
//     {
//       path: '/collections',
//       name: 'collections',
//       component: resolve => require(['@/pages/collections'],resolve),
//     },
//     {
//       path: '/giftRecord',
//       name: 'giftRecord',
//       component: resolve => require(['@/pages/giftRecord'],resolve),
//     },
//     {
//       path: '/sendPage',
//       name: 'sendPage',
//       component: resolve => require(['@/pages/sendPage'],resolve),
//     },
//     {
//       path: '/receive',
//       name: 'receive',
//       component: resolve => require(['@/pages/receive'],resolve),
//     },
//     {
//       path: '/setting',
//       name: 'setting',
//       component: resolve => require(['@/pages/setting'],resolve),
//     },
//     {
//       path: '/sysSetting',
//       name: 'sysSetting',
//       component: resolve => require(['@/pages/sysSetting'],resolve),
//     },
//     {
//       path: '/feedback',
//       name: 'feedback',
//       component: resolve => require(['@/pages/feedback'],resolve),
//     },
//     {
//       path: '/accountSet',
//       name: 'accountSet',
//       component: resolve => require(['@/pages/accountSet'],resolve),
//     },
//     {
//       path: '/abouts',
//       name: 'abouts',
//       component: resolve => require(['@/pages/abouts'],resolve),
//     },
//     {
//       path: '/bindAccount',
//       name: 'bindAccount',
//       component: resolve => require(['@/pages/bindAccount'],resolve),
//     },
//     {
//       path: '/beVip',
//       name: 'beVip',
//       component: resolve => require(['@/pages/beVip'],resolve),
//     }
//   ],
//   scrollBehavior (to, from, savedPosition) {
//     if (savedPosition) {
//       return savedPosition
//     } else {
//       return { x: 0, y: 0 }
//     }
//   }
// })

