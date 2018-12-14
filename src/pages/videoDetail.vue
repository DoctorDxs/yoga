<template>
  <div class="course-detail-page">
    <bg></bg>
    <div class="video-box">
      <video controls='controls'
             @ended="endVideo()"
             :src="videoInfo.url"
             x5-video-player-type="h5" 
             x5-video-player-fullscreen="true" 
             preload="auto"
             x5-video-orientation="landscape|portrait"
             ref='videoTime' v-show="!showPost">
      </video>
      <img :src="videoInfo.good_cover" alt="" class="video-cover" v-show="showPost" style="width: 100%;">
      <img src="../assets/class_play_icon@3x.png" alt="" class="video-icon" @click="playVideo" v-show="showPost">
    </div>

    <div class="tab-item-detail">
      <!-- 详情 -->
      <div>
        <div class="students-study">
          <div class="students-avatar">
            <img :src="item" alt="" v-for='(item, index) in videoInfo.learns_avatar' :key='index'>
          </div>
          <div class="course-detail-info" v-if='type == 1'>
            <div>DAY{{videoInfo.k}}</div>
            <div>{{videoInfo.learn_count - 0 + 1}}次练习</div>
          </div>
          <div class="course-detail-info" v-if='type == 2'>
            <div>{{videoInfo.k+ '/' +count}}</div>
            <div>{{videoInfo.learn_count - 0}}次练习</div>
          </div>
        </div>
      </div>
    </div>
    <div class="trend-list-box"><trend-list :evaluteList='evaluteList' @getTrend='getTrend' @updataTrends='updataTrends' :infiniteId='infiniteId'></trend-list></div>
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
      showPost: true,
      showPlayIcon: true,
      page: 0,
      infiniteId: +new Date(),
    }
  },
  activated() {
    const query = this.$route.query
    this.courseNmae = query.courseNmae
    this.count = query.count
    if (this.type && this.learn_id ) {
      if (this.learn_id == query.learn_id) {
        return false
      } else {
        this.type = query.type
        this.group_id = query.group_id
        this.learn_id = query.learn_id
        this.in_circle = query.in_circle
        this.page = 0
        this.evaluteList = []
        this.showPost = true
        this.showPlayIcon = true
        this.getTrend(this.state)
      }
    } else {
      this.type = query.type
      this.learn_id = query.learn_id
      this.group_id = query.group_id
      this.in_circle = query.in_circle
    }
    this.getVideo()
  },
  mounted() {
  },

  methods: {
    linkAddTrend(type) {
      if (this.in_circle == 1) {
        this.$router.push({name: 'submitTrend', query: {type: type, group_id: this.group_id}})
        localStorage.setItem('trendUpdate',JSON.stringify({trendIndex: null, doWhat: 0, trendId: null}))
      } else {
        if (this.type == '2') {
          this.$toast.top('您还未购买该课程')
        } else {
          this.$toast.top('您还未购买该训练营')
        }
      }
    },
    
    playVideo() {
      this.showPost = false
      this.$refs.videoTime.play()
    },
     endVideo() {
      this.$refs.videoTime.webkitExitFullScreen()
      this.showPost = true
      this.$router.push({name: 'complated1', query: {group_id: this.group_id, learn_id: this.learn_id, good_name: this.videoInfo.good_name, type: this.type, videoTime: this.$refs.videoTime.duration, courseNmae: this.courseNmae}})
    },

    getVideo() {
      getVideoDetail(this.group_id, this.learn_id).then(res => {
        if (res.state == 200) {
          this.videoInfo = res.data
          document.title = res.data.good_name
        }
      })
    },
   


    getTrend($state) {
      this.state = $state
      this.page += 1;
      getCurrentCourseEval({page: this.page, id: this.group_id}).then(res => {
        if (res.state == 200) {
          const lists = res.data.data
          if (lists.length) {
            lists.forEach((item, index) => {
              if (item.img_paths) {
                item.img_paths = item.img_paths.split(',')
              }
            })
            
            this.evaluteList.push(...lists)
            $state.loaded();
          } else {
            $state.complete()
          }
        } else {
          this.$toast.top(res.msg)
        }
      })
    },
    
    updataTrends($state) {
      this.page = 0
      this.evaluteList = []
      this.infiniteId += 1
    }
  },
  components: {
    trendList
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
   background: #F4F6F9;
}
.course-detail-page {
  background: #F4F6F9;
  padding-bottom: 120px;
  position: relative;
}

.video-box {
  width: 100%;
  height: 422px;
  position: relative;
  overflow: hidden;
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
  object-fit: fill;
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
  height: 130px;
  align-items: center;
  margin-left: 40px;
}

.students-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-left: -40px;
  border: 4px solid #fff;
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
  width: 3px;
  height: 60px;
}



</style>
