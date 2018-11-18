<template>
  <div class="classroom-page">
    <div class="tab-bar">
      <div :class="index == tabIndex ? 'active-color' : '' " v-for='(item, index) in tabbar' :key='index' @click='switchTabbar(index)'>
        <div>{{item}}</div>
        <div :class="index == tabIndex ? 'active-line-show' : 'active-line-hide'"></div>
      </div>
    </div>
    <component :is="currentView" :currentList='currentList'></component>
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
      currentView: 'components0',
      articleList: [],
      courseList: [],
      campList: [],
      currentList: [],
      lastClickIndex: 0,
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1
    }
  },
  created() {
    document.title = '我的收藏';
    this.getData(this.tabIndex) 
  },
  methods: {
    switchTabbar(index) {
      this.tabIndex = index
      this.currentView = 'components' + index
      // 如果有数据，点击相应的tab，切换到相应的数据
      if(index == 0) {
       this.currentList = this.courseList
      } else if (index == 1) {
        this.currentList = this.campList
      } else if (index == 2) {
        return false
      } else if (index == 3) {
        this.currentList = this.articleList
      }
      // 再次点击同一tab 不刷新数据
      if (this.lastClickIndex == index) return false;
      this.getData(index)
      this.lastClickIndex = index
    },
    
    getData(index) {
      // 当相应的tab存在数据时不刷新数据
      if (index == 0 && this.courseList.length == 0) {
        this.getCollect({type: 2, page: 1})
      } else if (index == 1 && this.campList.length == 0) {
        this.getCollect({type: 1, page: 1})
      } else if (index == 2) {
        return false
      } else if(index == 3 && this.articleList.length == 0 ) {
        return false
      }
    },

    getCollect(params) {
      collectList(params).then(res => {
        if (res.state == 200) {
          if(params.type == 1) {
            this.campList = res.data.data
            this.currentList = this.campList
          } else {
            this.courseList = res.data.data
            this.currentList = this.courseList
          }
        }
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
