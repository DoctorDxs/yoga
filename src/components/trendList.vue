<template>
  <div class="trend-comp">
    
    <div class="trend-list" v-for='(item, index) in evaluteList' :key='index' @click="linkDetail(item.type, item.id, item.group_type)">
      <div v-if='evaluteList.length == 0'><img src="../assets/all_none@3x.png" alt=""></div>
      <div class="trend-avatar"><img :src="item.user_avatar" alt=""></div>
      <div class="trend-info">
        <div class='trend-username'>{{item.username}}</div>
        <div class="trend-time">{{item.time_desc}}{{item.type == 2 ? '·提了一个问题' : ''}}</div>
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
        <div class="video-box" v-if='item.video_path'><video :src="item.video_path" controls></video></div>
        <div class="trend-problem-title" v-if='item.type == 2'>
          <img src="../assets/circle_question_icon@3x.png" alt="">
          <div class="trend-problem-question">{{item.content}}</div>
        </div>

         <div class="trend-problem-title" v-if='item.type != 2' @click.stop="linkCourse(item.group_id, item.group_type)">
          <img :src="item.group_cover" alt="">
          <div class="course-desc">
            <div>{{item.group_name}}</div>
            <div>{{item.group_subscribe}} 人练习</div>
          </div>
        </div>
        <div class="trend-meat">
          <div class="trend-meat-left">
            <div @click.stop='suportTrend(item.id, item.thumbs_sum, index)'>
              <img src="../assets/circle_like_nor_icon@3x.png" alt="" v-if='item.is_thumb === "0"'>
              <img src="../assets/circle_like_pre_icon@3x.png" alt="" v-if='item.is_thumb === "1"'>
              <div class="num" :style="item.is_thumb == '1' ? '' : 'color: #D4D9DD;'">{{item.thumbs_sum}}</div>
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
          <div class="trend-more" v-if='item.is_mine == "1"'><img src="../assets/circle_more_del_icon@3x.png" alt=""></div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import { getSign, addSuport } from '../fetch/api'
export default {
  name: 'trendList',
  data () {
    return {
      previewImages: {}
    }
  },
  created() {
    
  },
  
  methods: {
    // 点赞
    suportTrend(id, thumbs_sum, index) {
      thumbs_sum === '1' ? thumbs_sum = '0' : thumbs_sum == '1'
      addSuport({news_id: id}).then(res => {
        if (res.state == 200) {
          let evaluteList = this.evaluteList
          evaluteList[index].is_thumb === '1' ? evaluteList[index].is_thumb = '0' : evaluteList[index].is_thumb = '1'
          evaluteList[index].is_thumb === '1' ? evaluteList[index].thumbs_sum =  evaluteList[index].thumbs_sum - 1 + '' : evaluteList[index].thumbs_sum =  evaluteList[index].thumbs_sum - 0 + 1 + ''
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
    // ShareAppMessage() {
    //   const shareImg = this.shareImg
    //   console.log(shareImg)
    //   wx.onMenuShareAppMessage({
    //     title: 'title.title',
    //     desc: 'shareInfo.desc',
    //     link: 'encodeURIComponent(location.href)',
    //     imgUrl: shareImg,
    //     success: function(res) {
    //       console.log(res)
    //       alert(JSON.stringify(res)) 
    //     },
    //     cancel: function(cancel) {
    //       alert(JSON.stringify(cancel)) 

    //     },
    //     fail: function (err) {
    //         alert(JSON.stringify(err));
    //     }
    //   })
    // },
    // ShareTimeline() {
    //   wx.onMenuShareTimeline({
    //     title: 'shareInfo.title',
    //     desc: 'encodeURIComponent(location.href)',
    //     link: 'encodeURIComponent(location.href)',
    //     imgUrl: 'shareInfo.imgUrl',
    //     success: function() {

    //     },
    //     cancel: function() {

    //     }
    //   });
    // },
    linkDetail(type, id, group_type) {
      // 1动态 2提问 3回答
      if (type === '1') {
        this.$router.push({
          name: 'trendDetail', query: {id: id, group_type: group_type, type: type, from: 1}
        })  
      } else if (type === '2') {
        this.$router.push({
          name: 'trendDetail', query: {id: id, group_type: group_type, type: type, from: 2}
        })  
      } else if (type === '3') {
        this.$router.push({
          name: 'answerDetail', query: {id: id, group_type: group_type, type: type, from: 3}
        }) 
      }
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
    }
  },
  
  props: {
    evaluteList: {
      type: Array,
      required: true
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

  .trend-time {
    font-size: 22px;
    color: #ABB3BA;
  }

  .trend-content {
    color: #2F343C;
    font-size: 32px;
    margin: 40px 0 20px;
  }

  .trend-img1,.trend-img2 {
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

  .trend-img2 > div {
    background: #F4F6F9;
    width: 200px;
    height: 200px;
  }

  .trend-img2 > div img {
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
    width: 100%;
    height: 234px;
  }

  .video-box video {
    width: 100%;
    height: 234px;
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
