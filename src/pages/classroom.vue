<template>
  <div class="classroom-page">
    <div class="ads-banner">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for='(item, index) in [1,2,3]' :key='index'>
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539081623475&di=ab801c315bfb46b1aa60d14e2c25e204&imgtype=0&src=http%3A%2F%2Fpic106.nipic.com%2Ffile%2F20160812%2F5212257_215252874000_2.jpg" alt="">
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination">
        <div class='swiper-pagination-box'>
          <img v-for='(item, index) in [1,2,3]' :key='index' :src="index + 2 == currentIndex ? bots1 : bots2" alt="" >
        </div>
      </div>
      
    </div>
    <div class="tab-bar">
      <div :class="index == tabIndex ? 'active-color' : '' " v-for='(item, index) in tabbar' :key='index' @click='switchTabbar(index)'>
        <div>{{item}}</div>
        <div :class="index == tabIndex ? 'active-line-show' : 'active-line-hide'"></div>
      </div>
    </div>
    <component :is="currentView" :currentList='currentList'></component>
    <nav-bar></nav-bar>
  </div>
     
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import navBar from '@/components/navBar'
import course from '@/components/course'
import camp from '@/components/camp'
import underline from '@/components/underline'
import articleList from '@/components/articleList'
import { getArticleList, getCourseList } from '../fetch/api'
import bots1 from '../assets/all_lunbo01@3x.png'
import bots2 from '../assets/all_lunbo02@3x.png'
export default {
  name: 'classroom',
  data () {
    return {
      tabbar: ['课程','训练营','线下','文章'],
      tabIndex: 0,
      currentView: 'components0',
      articleList: [],
      courseList: [],
      campList: [],
      currentList: [],
      bots1: bots1,
      bots2: bots2,
      currentIndex: 2,
      swiperOption: {
        autoplay:true,
        loop: true,
        notNextTick: true,
        on: {
          slideChange: () => {
            if (this.$refs.mySwiper.swiper != null) {
              this.currentIndex = this.$refs.mySwiper.swiper.activeIndex + 1  == 3 + 2 ? this.$refs.mySwiper.swiper.activeIndex - 2 : this.$refs.mySwiper.swiper.activeIndex + 1
            }
          }
        }
			},
      lastClickIndex: 0
    }
  },
  created() {
    document.title = '课堂';
    this.getData(this.tabIndex)
  },
  mounted() {
    
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
    getBanner() {

    },
    getData(index) {
      // 当相应的tab存在数据时不刷新数据
      if (index == 0 && this.courseList.length == 0) {
        this.getCourseList(2)
      } else if (index == 1 && this.campList.length == 0) {
        this.getCourseList(1)
      } else if (index == 2) {
        return false
      } else if(index == 3 && this.articleList.length == 0 ) {
        this.getArticleList()
      }
    },
    getArticleList(type) {
      getArticleList(type).then(res => {
        this.articleList = res.data.data
        this.currentList = this.articleList
      })
    },
    getCourseList(type) {
      getCourseList(type).then(res => {
        if(type == 2) {
          this.courseList = res.data.data
          this.currentList = this.courseList
        } else if (type == 1) {
          this.campList = res.data.data
          this.currentList = this.campList
        }
      })
    }

  },
  components: {
    navBar,
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
.ads-banner{padding: 0 30px;height: 230px;position: relative;}
.ads-banner img{width: 690px;height: 230px;}
.tab-bar {display: flex;font-size: 32px;color: #444C52;font-weight: 600;justify-content: space-around;margin-top: 30px;padding: 0 30px;}
.tab-bar > div {opacity: 0.3;}
.tab-bar .active-color {opacity: 1;}
.active-line-show {width: 46px;height: 6px;background: #B78FDA;border-radius: 12px; margin: 14px auto 0;}
.active-line-hide {width: 46px;height: 6px;background: #fff;border-radius: 12px; margin: 14px auto 0;}

.swiper-pagination {
  width: 690px;
  position: absolute;
  bottom: 0px;
  height: 60px;
  display: flex;
} 

.swiper-pagination img {
  width: 18px;
  height: 18px;
  margin: 0 10px;
}

.swiper-pagination-box {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}





</style>
