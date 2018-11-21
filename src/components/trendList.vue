<template>
  <div class="trend-comp">
    
    <div class="trend-list" v-for='(item, index) in evaluteList' :key='index' @click="linkDetail(item.type, item.id, item.group_type, index)">
      <div v-if='evaluteList.length == 0'><img src="../assets/all_none@3x.png" alt=""></div>
      <div class="trend-avatar"><img :src="item.user_avatar" alt=""></div>
      <div class="trend-info">
        <div class='trend-username'>{{item.username}}
            <img src="../assets/vip_no_icon@3x.png" alt="" v-if='item.user_status === "0"'>
            <img src="../assets/vip_nor_icon@3x.png" alt="" v-if='item.user_status === "1"'>
            <img src="../assets/vip_supper_icon@3x.png" alt="" v-if='item.user_status === "2"'>
            <img src="../assets/new_icon@3x.png" alt="" v-if='item.is_new === "1"'>
        </div>
        <div class="trend-time" v-if='item.type == 1'>{{item.time_desc}}</div>
        <div class="trend-time" v-if='item.type == 2'>{{item.time_desc}}·提了一个问题</div>
        <div class="trend-time" v-if='item.type == 3'>{{item.time_desc}}·回答了一个问题</div>
        <div class="trend-content" v-if='item.type == 1'>
          {{item.content}}
        </div>
        <div class="trend-content" v-if='item.type == 2'>
          {{item.desc}}
        </div>
        <div class="trend-content" v-if='item.type == 3'>
          {{item.content}}
        </div>
        <div class="trend-img1" v-if='item.img_paths.length == 1 || item.img_paths.length == 2'>
          <div v-for='(imgTtem, imgIndex) in item.img_paths' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists:item.img_paths})"></div>
        </div>
        <div class="trend-img2" v-if='item.img_paths.length == 3'>
          <div v-for='(imgTtem, imgIndex) in item.img_paths' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists:item.img_paths})"></div>
        </div>
        <div class="trend-img3" v-if='item.img_paths.length == 4'>
          <div v-for='(imgTtem, imgIndex) in item.img_paths' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists:item.img_paths})"></div>
        </div>
        <div class="trend-img4" v-if='item.img_paths.length > 4'>
          <div v-for='(imgTtem, imgIndex) in item.img_paths' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists: item.img_paths})"></div>
        </div>
        <div class="video-box" v-if='item.video_path'>
          <video 
             @ended="endVideo()"
             x5-video-player-type="h5"
            playsinline
            webkit-playsinlin
             :src="item.video_path"
             :ref='"videoTime"+index' v-show="videoIndex == index">
          </video>
          <img :src="item.video_cover" alt="" class="video-cover" v-show="videoIndex != index ">
          <img src="../assets/class_play_icon@3x.png" alt="" class="video-icon" @click.stop="playVideo('videoTime' +index ,index)" v-show="videoIndex != index"> 
        </div>
        <div class="trend-problem-title" v-if='item.type == 2'>
          <img src="../assets/circle_question_icon@3x.png" alt="">
          <div class="trend-problem-question">{{item.content}}</div>
        </div>

         <div class="trend-problem-title" v-if='item.type != 2' @click.stop="linkCourse(item.group_id, item.group_type)">
          <img :src="item.group_cover" alt="">
          <div class="course-desc">
            <div>{{item.group_name}}</div>
            <div>{{item.group_subscribe_num}} 人练习</div>
          </div>
        </div>
        <div class="trend-meat">
          <div class="trend-meat-left">
            <div @click.stop='suportTrend(item.id, item.is_thumb, index)'>
              <img src="../assets/circle_like_nor_icon@3x.png" alt="" v-if='item.is_thumb === "0"'>
              <img src="../assets/circle_like_pre_icon@3x.png" alt="" v-if='item.is_thumb === "1"'>
              <div class="num" :style="item.is_thumb == '1' ? '' : 'color: #D4D9DD;'">{{item.thumbs}}</div>
            </div>
            <div>
              <img src="../assets/circle_comment_nor_icon@3x.png" alt="">
              <div class="num">{{item.evaluate_sum}}</div>
            </div>
            <div>
              <img src="../assets/circle_share_nor_icon@3x.png" alt="">
              <div class="num">分享</div>
            </div>
          </div>
          <div class="trend-more" v-if='item.is_mine == "1"' @click.stop="deleteTrend(item.id, index)"><img src="../assets/circle_more_del_icon@3x.png" alt=""></div>
        </div>
      </div>

    </div>
    <div class="no-data-icon" v-if='!evaluteList.length'><img src="../assets/all_none@3x.png" alt="" ></div>
    <modal 
      title="提示" 
      content='是否删除?'
      :showCancle='showCancle' 
      confirmText='删除'
      @on-cancel="cancel" 
      @on-confirm='confirm'
      v-show='showModal'>
    </modal>
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" class="no-more-data">{{evaluteList.length > 9 ? "没有更多了..." : " "}}</div>
      <div slot="no-results"> </div>
    </infinite-loading>
  </div> 
</template>

<script>
import { getSign, addSuport, delEval, updataTrend } from '../fetch/api'
export default {
  name: 'trendList',
  data () {
    return {
      previewImages: {},
      showModal: false,
      showPost: true,
      videoIndex: null,
    }
  },
  activated() {
    let userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
    };
    this.userInfo = userInfo
    // 列表页无刷新 更新数据  （点赞数，评论数、删除某一动态） （回答问题、添加动态、提问等需要清空列表 重新请求数据  page 1）
    let trendUpdate = localStorage.getItem("trendUpdate")
    if (trendUpdate) {
      trendUpdate = JSON.parse(trendUpdate)
      setTimeout(() => {
        this.updateTrend(trendUpdate)
      }, 1500)
    }
  },
  
  methods: {
    infiniteHandler($state) {
      this.state = $state
      this.$emit('getTrend', $state)
    },

    updateTrend(trendUpdate) {
      const evaluteList = this.evaluteList
      const id = trendUpdate.trendId
      const trendIndex = trendUpdate.trendIndex
      const doWhat = trendUpdate.doWhat
      if (doWhat == 1) {
        updataTrend(id).then(res => {
          if (res.state == 200) {
            this.evaluteList.splice(trendIndex, 1, res.data)
          }
        })
      } else if (doWhat == 2) {
        this.evaluteList.splice(trendIndex, 1)
      } else if (doWhat == 3) {
        this.$emit('updataTrends', this.$state)
      }
      

    },



    // 点赞
    suportTrend(id, is_thumb, index) {
      let has_thumb = is_thumb == '1' ?  '0' :  '1'
      addSuport({news_id: id, is_thumb: has_thumb}).then(res => {
        if (res.state == 200) {
          let evaluteList = this.evaluteList
          has_thumb == '1' ? evaluteList[index].is_thumb = '1' : evaluteList[index].is_thumb = '0'
          has_thumb == '1' ? evaluteList[index].thumbs =  evaluteList[index].thumbs - 0 + 1 + '' : evaluteList[index].thumbs =  evaluteList[index].thumbs - 1 + ''
          this.evaluteList = evaluteList
        } else if (res.state == 400) {
          this.$toast.top(res.msg)
        }
      })
    },
    previewImage(params) {
      this.previewImages = params
      this.getSign()
    },

    getSign() {
      getSign(encodeURIComponent(location.href)).then(res => {
        if (res.state == 200) {
          this.setConfig(res.data)
        }
      })
    },

    setConfig(params) {
      const that = this
      wx.config({
        debug: false, 
        appId: params.appId, 
        timestamp: params.timeStamp, 
        nonceStr: params.nonceStr, 
        signature: params.signature,
        jsApiList: ['checkJsApi', 'previewImage']
      });
      const previewImages = this.previewImages
      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: [
            'previewImage'
          ]
        });
        // 图片预览
        wx.previewImage({
          current: previewImages.currentImg, // 当前显示图片的http链接
          urls: previewImages.currentImgLists, // 需要预览的图片http链接列表
        });
      })
    },
    linkDetail(type, id, group_type, index) {
      // 1动态 2提问 3回答
      if (type === '1') {
        this.$router.push({
          name: 'trendDetail', query: {id: id, type: type, index: index}
        })  
      } else if (type === '2') {
        this.$router.push({
          name: 'questionDetail', query: {id: id, type: type, index: index}
        })  
      } else if (type === '3') {
        this.$router.push({
          name: 'answerDetail', query: {id: id, type: type, index: index}
        }) 
      };
      // 0 未操作  1 更新某条数据  2 删除某条数据 3 刷新整个页面
      localStorage.setItem('trendUpdate',JSON.stringify({trendIndex: index, doWhat: 0, trendId: id}))
    },
    linkCourse(id, type) {
      if (type === '1') {
        this.$router.push({
          name: 'campDetail', query: {id: id}
        })
      } else if (type === '2') {
        this.$router.push({
          name: 'courseDetail', query: {id: id}
        })
      }
    },
    deleteTrend(id, index) {
      this.showModal = true
      this.delId = id
      this.delIndex = index
    },
    confirm() {
      this.showModal = false
      delEval({news_id: this.delId}).then(res => {
        if (res.state == 200) {
          this.evaluteList.splice(this.delIndex,1);
          this.$toast.top('已删除！')
          this.delId = ''
          this.delIndex = ''
        } else {
           this.$toast.top(res.msg)
        }
      })
    },
    cancel() {
      this.showModal = false
    },
    playVideo(ele, index) {
      this.videoIndex = index
      this.showPost = false
      this.$refs[ele][0].play()
    },
    endVideo() {

    },

  },
  
  props: {
    evaluteList: {
      type: Array,
      required: true,
      default: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .trend-list {
    padding: 30px 10px;
    background: #fff;
    border-top: 1px solid #E1E2E4;
    /* border-bottom: 1px solid #E1E2E4; */
    display: flex;
    flex-direction: row;
  }

  .trend-avatar {
    width: 82px;
    height: 82px;
    border-radius: 50%;
    margin-right: 20px;
  }

  .trend-avatar img {
    width: 82px;
    height: 82px;
    border-radius: 50%;
  }

  .trend-info {
    width: 570px;
  }

  .trend-username {
    max-width: 710px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 30px;
    color: #444C52;
    margin: 10px 0 0 0;
  }

  .trend-username img {
    height: 32px;
    margin-left: 16px; 
  }

  .trend-time {
    font-size: 22px;
    color: #ABB3BA;
  }

  .trend-content {
    color: #2F343C;
    font-size: 32px;
    margin: 40px 0 20px;
  }

  .trend-img1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .trend-img1 > div {
    width: 304px;
    height: 304px;
    background: #F4F6F9;
  }

  .trend-img1 > div img {
    width: 304px;
    height: 304px;
  }

  .trend-img2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .trend-img2 > div {
    background: #F4F6F9;
    width: 200px;
    height: 200px;
  }

  .trend-img2 > div img {
    width: 200px;
    height: 200px;
  }

  .trend-img4 {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .trend-img4 > div {
    background: #F4F6F9;
    width: 200px;
    height: 200px;
    margin-right: 8px;
    margin-bottom: 10px;
  }

  .trend-img4 > div img {
    width: 200px;
    height: 200px;
  }

  .trend-img3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 406px;
  }

  .trend-img3> div {
    background: #F4F6F9;
    width: 200px;
    height: 200px;
    margin-top: 6px;
  }

  .trend-img3 > div img {
    width: 200px;
    height: 200px;
  }

  .trend-problem-title {
    padding: 20px;
    background: #F4F6F9;
    display: flex;
    align-items: center;
    margin-top: 20px;
    width: 100%;
  }

.video-box {
  width: 405px;
  height: 200px;
  position: relative;
}

.video-box video {
  width: 405px;
  height: 200px;
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

  .trend-problem-title img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }

  .trend-problem-question {
    font-size: 28px;
    color: #444C52;
    font-weight: 600;
    margin-left: 20px;
  }

  .trend-meat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
  }

  .trend-meat-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
  }

  .trend-meat-left > div {
    display: flex;
    align-items: center;
  }

  .trend-meat  img {
    width: 44px;
    height: 44px;
  }

  .num {
    color: #808C92;
    font-size: 20px;
    margin-left: 8px;
  }

    .trend-img4 {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .trend-img4 > div {
    background: #F4F6F9;
    width: 200px;
    height: 200px;
    margin-right: 6px;
    margin-bottom: 10px;
  }

  .trend-img4 > div img {
    width: 200px;
    height: 200px;
  }

  
.course-desc > div:nth-child(1) {
  font-size: 28px;
  color: #444C52;
}

.course-desc > div:nth-child(2) {
  font-size: 20px;
  color: #808C92;
  margin-top: 10px;
}
  

.share-modal-bg, .consult-modal-bg {
    position: fixed;
    background: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .share-modal-box {
    height: 268px;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 26px;
    color: #808C92;
  }

  .share-modal {
    display: flex;
    width: 300px;
    margin: 80px auto;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }

  .share-modal img {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
  }
</style>
