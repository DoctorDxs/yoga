<template>
  <div class="train-detail-page">
    <course-top></course-top>
    <div class="course-tab">

      <div class="course-tab-box">
        <div :class="index == tabIndex ? 'active-color' : '' " v-for='(item, index) in tabItems' :key='index' @click='switchTabbar(index)'>
          <div>{{item}} {{index == 1 ? '(' + 6 + ')' : ''}}</div>
          <div :class="index == tabIndex ? 'tab-bottom-border-show' : 'tab-bottom-border-hide'"></div>
        </div>
      </div>

    </div>

    <div class="tab-item-detail">
      <!-- 详情 -->
      <div v-if='tabIndex == 0'>
        <div class="students-study">
          <div class="students-avatar">
            <img src="http://tx.haiqq.com/uploads/allimg/150402/16094151D-13.jpg" alt="">
            <img src="http://tx.haiqq.com/uploads/allimg/150402/16094151D-13.jpg" alt="">
            <img src="http://tx.haiqq.com/uploads/allimg/150402/16094151D-13.jpg" alt="">
            <img src="http://tx.haiqq.com/uploads/allimg/150402/16094151D-13.jpg" alt="">
            <img src="http://tx.haiqq.com/uploads/allimg/150402/16094151D-13.jpg" alt="">
            <img src="http://tx.haiqq.com/uploads/allimg/150402/16094151D-13.jpg" alt="">
          </div>
          <div class="course-detail-info">
            <div>8节课</div>
            <div>***人正在练习</div>
          </div>
        </div>
        <div class="course-des-detail">
          这是详细信息
        </div>
      </div>
      <!-- 课表 -->
      <div v-if='tabIndex == 1'>
        <div class="course-table-item" v-for='(item, index) in courseTable' :key='index'>
          <div class="course-item-cover">
            <div class="course-item-left">
              <img :src='item.cover' alt="">
              <div class="course-sort">{{index > 9 ? index+1 : '0' + (index +1)}}</div>
            </div>
            <div class="course-item-info">
              <div>{{item.name}}</div>
              <div>{{item.time}}</div>
            </div>
          </div>
          <div>
            <div v-if='item.trySee && !isBuy' class="free-try-see">免费试看</div>
            <div v-if='!item.trySee && !isBuy' class="course-locked"><img src="../assets/class_lock@3x.png" alt=""></div>
            <div v-if='isBuy' class="course-play"><img src="../assets/class_play@3x.png" alt=""></div>
          </div>
        </div>
      </div>
      <!-- 圈子 -->
      <div v-if='tabIndex == 2'><trend-list></trend-list></div>
    </div>

    <div class="course-no-buy" v-if='!isBuy'>
      <div class="consult-course">
        <div><img src="../assets/class_consult@3x.png" alt=""></div>
        <div>咨询</div>
      </div>
      <div class="share-this-course">
        <div><img src="../assets/class_share@3x.png" alt=""></div>
        <div>分享</div>
      </div>
      <div class="add-to-practice" @click="buyCourse">加入练习</div>
    </div>

    <div class="course-is-buy" v-if='isBuy'>
      <div class="write-trend" @click="linkAddTrend(1)">
        <div><img src="../assets/class_issue@3x.png" alt=""></div>
        <div>写动态</div>
      </div>
      <div class="border-line"></div>
      <div class="write-question" @click="linkAddTrend(2)">
        <div><img src="../assets/class_question@3x.png" alt=""></div>
        <div>提问题</div>
      </div>
    </div>
    
  </div>
     
</template>

<script>
import trendList from '@/components/trendList'
import courseTop from '@/components/courseTop'

export default {
  name: 'trainDetail',
  data () {
    return {
      tabItems: ['详情','课表','圈子'],
      tabIndex: 0,
      isBuy: true,
      courseTable: [
        {cover: 'http://pic.qqtn.com/up/2018-7/15308567411160505.jpg',name: '舒展圣体', time: '4分钟', trySee: true},
        {cover: 'http://pic.qqtn.com/up/2018-7/15308567411160505.jpg',name: '热身训练', time: '4分钟', trySee: false},
        {cover: 'http://pic.qqtn.com/up/2018-7/15308567411160505.jpg',name: '开始训练', time: '4分钟', trySee: false},
        {cover: 'http://pic.qqtn.com/up/2018-7/15308567411160505.jpg',name: '训练结束', time: '4分钟', trySee: false},
      ]
    }
  },
  mounted() {
    document.title = '21天瑜伽训练营';
  },

 

  methods: {
    switchTabbar(index) {
      this.tabIndex = index
    },
    buyCourse() {
      this.$router.push({name: 'buyCourse'})
    },
    linkAddTrend(type) {
      this.$router.push({name: 'submitTrend', query: {type: type} })
    }
  },
  components: {
    courseTop,
    trendList
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.course-detail-page {
  background: #F0F2F7;
  padding-bottom: 120px;
  position: relative;
}

.course-tab {
  height: 80px;
  background: #fff;
  
}

.course-tab-box {
  width: 420px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  color: #444C52;
  font-size: 32px;
  font-weight: 600;
  line-height: 80px;
}

.course-tab-box > div {
  opacity: .3;
}

.course-tab-box .active-color {
  opacity: 1;
}

.tab-bottom-border-show {width: 46px;height: 6px;background: #B78FDA;border-radius: 12px; margin: -6px auto 0;}
.tab-bottom-border-hide {width: 46px;height: 6px;background: #ffffff;border-radius: 12px; margin: -6px auto 0;}

.tab-item-detail {
  margin-top: 20px;
}

.students-study {
  background: #ffffff;
  padding: 0 30px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.students-avatar {
  width: 310px;
  flex-shrink: 0;
  display: flex;
  margin-left: 40px;
}

.students-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-left: -40px;
  border: 2px solid #fff;
}

.course-detail-info {
  font-size: 26px;
  color: #808C92;
  text-align: right;
}

.course-des-detail {
  margin-top: 20px;
  min-height: 500px;
  background: #fff;
}

.course-table-item {
  height: 160px;
  background: #fff;
  margin-bottom: 10px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.course-item-info {
  margin-left: 30px;
}

.course-item-info > div:nth-child(1) {
  font-size: 28px;
  color: #444C52;
  font-weight: 600;
}

.course-item-info > div:nth-child(2) {
  font-size: 24px;
  color: #7F8C92;
  margin-top: 28px;
}

.course-item-cover {
  display: flex;
  align-items: center;
}

.course-item-left  {
  position: relative;
}

.course-sort {
  position: absolute;
  top: 0;
  left: 0;
  background: #B78FDA;
  width: 70px;
  height: 30px;
  border-bottom-right-radius: 30px; 
  font-size: 24px;
  text-align: center;
  line-height: 30px;
  color: #fff;
}

.course-item-left img {
  width: 180px;
  height: 120px;
}

.free-try-see {
  background: #B78FDA;
  width: 180px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 28px;
  color: #fff;
  border-radius: 70px;
}

.course-locked, .course-play {
  width: 180px;
  text-align: center;
}

.course-locked img {
  height: 42px;
  width: 38px;
}

.course-play img {
  height: 50px;
  width: 50px;
}

.course-no-buy {
  height: 100px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
}

.add-to-practice {
  width: 520px;
  background: #B78FDA;
  flex-shrink: 0;
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  color: #fff;
  line-height: 100px;
}

.consult-course, .share-this-course {
  font-size: 24px;
  color: #808C92;
  text-align: center;
  width: 115px;
  display: flex;
  flex-direction: column;
}

.consult-course img, .share-this-course img {
  height: 60px;
  width: 60px;
  margin: 4px 0 -6px;
}

.course-is-buy {
  background: #fff;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
}

.write-question, .write-trend {
  display: flex;
  align-items: center;
  font-size: 32px;
  color: #B78FDA;
  margin: auto;
}

.write-question img,.write-trend img {
  width: 60px;
  height: 60px;
  margin-right: 14px;
}

.border-line {
  background: #C7CCD1;
  width: 2px;
  height: 60px;
}



</style>
