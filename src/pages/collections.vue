<template>
  <div class="classroom-page">
    <div class="tab-bar">
      <div :class="index == tabIndex ? 'active-color' : '' " v-for='(item, index) in tabbar' :key='index' @click='switchTabbar(index)'>
        <div>{{item}}</div>
        <div :class="index == tabIndex ? 'active-line-show' : 'active-line-hide'"></div>
      </div>
    </div>
    <component :is="currentView"></component>
  </div>
     
</template>

<script>
import course from '@/components/course'
import camp from '@/components/camp'
import underline from '@/components/underline'
import articleList from '@/components/articleList'
import {collectList} from '../fetch/api'

export default {
  name: 'collection',
  data () {
    return {
      tabbar: ['课程','训练营','线下','文章'],
      tabIndex: 0,
      currentView: 'components0'
    }
  },
  created() {
    document.title = '我的收藏';
    this.getData() 
  },
  methods: {
    switchTabbar(index) {
      this.tabIndex = index
      this.currentView = 'components' + index
    },
    getData() {
      collectList(1).then(res => {
        console.log(res)
      })
    }
  },
  components: {
    components0: course,
    components1: camp,
    components2: underline,
    components3: articleList
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.classroom-page {padding-bottom: 120px;}
.ads-banner{padding: 0 30px;height: 230px;}
.ads-banner img{width: 690px;height: 230px;}
.tab-bar {display: flex;font-size: 32px;color: #444C52;font-weight: 600;justify-content: space-around;margin-top: 30px;padding: 0 30px;}
.tab-bar > div {opacity: 0.3;}
.tab-bar .active-color {opacity: 1;}
.active-line-show {width: 46px;height: 6px;background: #B78FDA;border-radius: 12px; margin: 14px auto 0;}
.active-line-hide {width: 46px;height: 6px;background: #fff;border-radius: 12px; margin: 14px auto 0;}
</style>
