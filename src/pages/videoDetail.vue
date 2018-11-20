<template>
  <div class="course-detail-page">
    <div class="video-box">
      <video 
             @ended="endVideo()"
             x5-video-player-type="h5"
            playsinline
            webkit-playsinlin
             :src="videoInfo.url"
             ref='videoTime' v-show="!showPost">
      </video>
      <img :src="videoInfo.good_cover" alt="" class="video-cover" v-show="showPost">
      <img src="../assets/class_play_icon@3x.png" alt="" class="video-icon" @click="playVideo" v-show="showPost">
    </div>

    <div class="tab-item-detail" v-if='videoInfo.learns_avatar.length > 0'>
      <!-- 详情 -->
      <div>
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
            <div>DAY{{videoInfo.learn_id - 0 + 1}}</div>
            <div>{{videoInfo.learn_count - 0 + 1}}次练习</div>
          </div>
        </div>
      </div>
    </div>
    <div class="trend-list-box"><trend-list :evaluteList='evaluteList'></trend-list></div>
    <div class="course-is-buy">
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
import { getVideoDetail, getCurrentCourseEval } from '../fetch/api'

export default {
  name: 'videoDetail',
  data () {
    return {
      videoInfo: {learns_avatar: []},
      evaluteList: [],
      showPost: true
    }
  },
  created() {
    const query = this.$route.query
    this.group_id = query.group_id
    this.learn_id = query.learn_id
    this.type = query.type
    this.getVideo()
    this.getTrend()
  },

  methods: {
    linkAddTrend(type) {
      this.$router.push({name: 'submitTrend', query: {type: type, group_id: this.group_id}})
    },
    getVideo() {
      getVideoDetail(this.group_id, this.learn_id).then(res => {
        if (res.state == 200) {
          this.videoInfo = res.data
          document.title = res.data.good_name
        }
      })
    },
    endVideo() {
      this.$router.push({name: 'complated1', query: {group_id: this.group_id, learn_id: this.learn_id, good_name: this.videoInfo.good_name, type: this.type, videoTime: this.$refs.videoTime.duration}})
    },


    getTrend() {
      getCurrentCourseEval(this.group_id).then(res => {
        if (res.state == 200) {
          this.evaluteList = res.data.data
        }
      })
    },
    playVideo() {
      this.showPost = false
      this.$refs.videoTime.play()
    }
    
  },
  components: {
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

.video-box {
  width: 100%;
  height: 422px;
  position: relative;
}

.video-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-icon {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 120px;
  height: 120px;
}

.video-box video {
  height: 100%;
  width: 100%;
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

.trend-list-box {
  margin-top: 20px;
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
