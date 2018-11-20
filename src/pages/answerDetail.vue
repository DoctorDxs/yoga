<template>
  <div class="answerDetail-page">
    <div class="trend-problem-title" @click='commentUser'>
      <img src="../assets/circle_question_icon@3x.png" alt="">
      <div class="trend-problem-question">
        <div class="problem-title">{{problem.content}}</div>
        <div class="look-more-answer" @click.stop="lookAll(problem.id)">查看全部{{problem.evaluate_sum}}个回答</div>
      </div>
    </div>

    <div class="evaluate-list">
      <div class="trend-user" @click='detail.is_mine ? showModal(detail.id, true, "") : commentUser()'>
        <div class="trend-user-avatar">
          <div>
            <img :src="detail.user_avatar" alt="">
          </div>
          <div class="trend-pub-time">
            <div>{{detail.username}} <span class="answer-make">回答了一个问题</span></div>
            <div>{{detail.time_desc}}</div>
          </div>
        </div>
        <div class="support-icon" @click.stop='suportComment(detail.id)'>
          <span class="suport-num" :style="detail.is_thumb == '1' ? '' : 'color: #D4D9DD;'">{{detail.thumbs}}</span>
          <img src="../assets/circle_like_nor_icon@3x.png" alt="" v-if='detail.is_thumb === "0"'>
          <img src="../assets/circle_like_pre_icon@3x.png" alt="" v-if='detail.is_thumb === "1"'>
        </div>
      </div>
      <div class="trend-user-content">
        <div class="user-content-box">
          <div class="user-content">
            {{detail.content}}
          </div>
          <div class="trend-img1" v-if='detail.img_paths.length == 1 || detail.img_paths.length == 2'>
            <div v-for='(imgTtem, imgIndex) in detail.img_paths' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists: detail.img_paths})"></div>
          </div>
          <div class="trend-img2" v-if='detail.img_paths.length == 3'>
            <div v-for='(imgTtem, imgIndex) in detail.img_paths' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists: detail.img_paths})"></div>
          </div>
          <div class="trend-img3" v-if='detail.img_paths.length == 4'>
            <div v-for='(imgTtem, imgIndex) in detail.img_paths' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists: detail.img_paths})"></div>
          </div>
          <div class="trend-img4" v-if='detail.img_paths.length > 4'>
            <div v-for='(imgTtem, imgIndex) in detail.img_paths' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists: detail.img_paths})"></div>
          </div>
          <div class="video-box" v-if='detail.video_path'>
            <video 
              @ended="endVideo()"
              x5-video-player-type="h5"
              playsinline
              webkit-playsinlin
              :src="detail.video_path"
              ref='videoTime' v-show="!showPost">
            </video>
            <img :src="detail.video_cover" alt="" class="video-cover" v-show="showPost">
            <img src="../assets/class_play_icon@3x.png" alt="" class="video-icon" @click.stop="playVideo" v-show="showPost"> 
          </div>

          <div class="user-reply" v-if='detail.comments && detail.comments.length > 0'>
            <div v-for='(item, index) in detail.comments' :key='index'>
              <span class="evaluate-user" @click="replay(item.id, item.username)">{{item.username}}</span>
              <span class="replay-text" v-if='item.parent_username'> 回复 </span>
              <span class="evaluate-user">{{item.parent_username}}</span>:
              <span class="evaluate-content" @click="item.is_mine == '1' ? showModal(item.id, false, index) : ''">{{item.content}} </span>  
              <span class="look-img-btn" v-if='item.img_path.length > 0' @click.stop="previewImage({currentImg: item.img_path[0], currentImgLists: item.img_path})">查看图片</span>
            </div>
            <div class="look-more-btn" @click="lookAllcomment(detail.id)" v-if='detail.evaluate_sum > 3'>查看全部{{detail.evaluate_sum}}条回复</div>
          </div>
        </div>
      </div>
    </div>

    <div class="replay-input-box">
      <div class="replay-input">
        <!-- 请输入你的想法 -->
        <!-- 评论TA的回答 -->
        <!-- 请输入你的回答 -->
        <input type="text" placeholder="评论TA的回答" v-model.trim="content" ref='commentInput'>
        <div class="input-img-box">
          <img src="../assets/issue_photo_icon@3x.png" alt="">
          <input type="file" @change="selectImg" class="input-img" name="img1" value="" accept="image/*" ref="inputImg1">
        </div>
        
        <div class="submit-btn" :style='(content != "" || imgs.length > 0) ? "color: #fff;background: #B78FDA;" : ""' @click="commentAnswer">发表</div>
      </div>
      <div class="reply-img-list" v-if='imgs.length > 0'>
        <div v-for='(item, index) in imgs' :key='index'>
          <img :src="item" alt="">
          <img src="../assets/issue_del_icon@3x.png" alt="" @click="deleteImg(item, index)">
        </div>
      </div>
    </div>
    <div class="modal-bg" v-if='modalShow' @click="hideModal">
      <div class="modal-box">
        <div class="delete-Evaluate" @click.stop="deleteEval">删除</div>
        <div class="cancle" @click="hideModal">取消</div>
      </div>
    </div>
    <modal 
      title="提示" 
      content='是否删除?'
      :showCancle='showCancle' 
      confirmText='删除'
      @on-cancel="cancel" 
      @on-confirm='confirm'
      v-show='showModal1'>
    </modal>
  </div>
     
</template>

<script>
import { getSomeOneAnswer, getSign, replayOrCommit, postImg, deleteImg, addSuport, delEval } from '../fetch/api.js'
export default {
  name: 'answerDetail',
  data () {
    return {
      content: '',
      modalShow: false,
      imgs: [],
      answerData: [],
      problem: {},
      detail: {
        img_paths: ''
      },
      replayInput: false,
      comment_id: '',
      deleteId: '',
      showModal1: false,
      showPost: true
    }
  },
  created() {
    
  },
  activated() {
    document.title = '回答详情';
    const query = this.$route.query
    this.type = query.type
    this.group_type = query.group_type
    this.id = query.id
    this.getData()
  },
  mounted() {
    // document.getElementsByClassName('answerDetail-page')[0].style.minHeight = window.innerHeight + 'px'
  },

  methods: {
    playVideo() {
      this.showPost = false
      this.$refs.videoTime.play()
    },
    endVideo() {
      
    },
    showModal(id,deleteAnswer, index) {
      this.modalShow = true
      this.deleteId = id,
      this.deleteAnswer = deleteAnswer
      this.delIndex = index
    },
    deleteEval() {
      this.modalShow = false
      this.showModal1 = true
    },
    confirm() {
      this.showModal1 = false
      let params;
      if (this.deleteAnswer) {
        params = {news_id: this.deleteId}
      } else {
        params = {comment_id: this.deleteId}
      }
      delEval(params).then(res => {
        if (res.state == 200) {
          this.$toast.top('已删除！')
          this.delId = ''
          this.delIndex = ''
          if (this.deleteAnswer) {
            this.$router.go(-1)
          };
          this.deleteAnswer = false
          this.getData()
        } else {
           this.$toast.top(res.msg)
        }
      })
    },
    cancel() {
      this.showModal1 = false
    },

    hideModal() {
      this.modalShow = false
    },
    getData() {
      getSomeOneAnswer(this.id).then(res => {
        if (res.state == 200) {
          let detail = []
          this.problem = res.data.problem
          if (res.data.detail.length > 0) {
            detail = res.data.detail[0]
            let comments = res.data.detail[0].comments
            if (detail.img_paths) {
              detail.img_paths = detail.img_paths.split(',')
            } else {
              detail.img_paths = []
            }
            if (comments.length > 0) {
              comments.forEach((item, index) => {
                if (item.img_path) {
                  item.img_path = item.img_path.split(',')
                } else {
                  item.img_path = []
                }
              })
            };
            detail.comments = comments
          }
          this.detail = detail
        }
      })
    },
    selectImg(e) {
      const inputFile = this.$refs.inputImg1
      if(inputFile.files[0].length !== 0){ 
        let data = new FormData();
        data.append('file', inputFile.files[0]);
        data.append('type', 6)
        this.showLoading = true
        postImg(data).then(res => {
          this.showLoading = false
          if (res.state == 200) {
            if (this.imgs.length < 10) {
              this.imgs.push(res.data[0])
            }
            inputFile.value = ''
          } else {
            this.$toast.top(res.msg)
          }
        })
      }
    },
    deleteImg(url, index) {
      this.showLoading = true
      deleteImg({url: url}).then(res => {
        this.showLoading = false
        if (res.state == 200) {
          this.$toast.top(res.msg)
          this.imgs.splice(index,1);
        } else {
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
    
    commentAnswer() {
      if (this.content || this.imgs.length > 0) {
        let params;
        if (!this.replayInput) {
          params = {
            content: this.content,
            img_path: this.imgs.length > 0 ? this.imgs.join(',') : '',
            news_id: this.id
          }
        } else {
          params = {
            content: this.content,
            img_path: this.imgs.length > 0 ? this.imgs.join(',') : '',
            comment_id: this.comment_id
          }
        }
        
        replayOrCommit(params).then(res => {
          if (res.state == 200) {
            this.getData()
            this.content = ''
            this.imgs = []
          }
        })
      } else {
        this.$toast.top('请填写内容或选择图片！')
      }
    },

    replay(id, username) {
      this.replayInput = true
      this.comment_id = id
      this.content = ''
      this.imgs = []
      this.$refs.commentInput.setAttribute('placeholder', `回复  ${username}`)
    },
    commentUser() {
      this.replayInput = false
      this.content = ''
      this.imgs = []
      this.$refs.commentInput.setAttribute('placeholder', '评论TA的回答')
    },
    lookAll(id) {
      this.$router.push({
        name: 'questionDetail', query: {id: id}
      })
    },
    // 点赞
    suportComment(id) {
      const detail = this.detail
      let params;
      if (detail.is_thumb == '1') {
        params = {
          news_id: id,
          is_thumb: 0,
        }
      } else {
        params = {
          news_id: id,
          is_thumb: 1,
        }
      }
      addSuport(params).then(res => {
        if (res.state == 200) {
          if (detail.is_thumb == '1') {
            detail.thumbs =  detail.thumbs - 1 + ''
            detail.is_thumb =  '0'
          } else {
            detail.thumbs =  detail.thumbs - 0 + 1 + ''
            detail.is_thumb =  '1'
          }
          this.detail = detail
        }
      })
    },
    
    lookAllcomment(id) {
      this.$router.push({
        name: 'moreEval', query: {id: id, type: 'answer'}
      })
    }
  },
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .answerDetail-page {
    background: #F4F6F9;
    position: relative;
  }  

  .trend-problem-title {
    padding: 20px ;
    display: flex;
    /* align-items: center; */
    background: #fff;
  }

  .trend-problem-title img {
    width: 100px;
    height: 100px;
  }

  .look-more-btn {
    color: #5D7992;
    font-size: 28px;
    margin-top: 10px;
  }

  .problem-title {
    height: 100px;
    line-height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 574px;
  }

  .trend-problem-question {
    font-size: 32px;
    color: #444C52;
    font-weight: 600;
    margin-left: 20px;
  }

  .look-more-answer {
    font-size: 28px;
    color: #44CBFF;
    margin-top: 18px;
    font-weight: normal;
  }

  .answer-make {
    color: #ABB2B9;
  }

  .answer-img {
    width: 234px;
    height: 234px;
    background: #F7F9FB;
    margin-bottom: 20px;

  }

  .answer-img img {
    width: 234px;
    height: 234px;
  }



.evaluate-list {
  padding: 30px 20px;
  background: #fff;
  border-top: 1px solid rgba(171,181,188,.3);
  margin-top: 20px;
}

.trend-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.trend-user-avatar {
  display: flex;
  align-items: center;
}

.trend-pub-time {
  margin-left: 20px;
}

.trend-pub-time > div:nth-child(1) {
  font-size: 30px;
  color: #444C52;
}

.trend-pub-time > div:nth-child(2) {
  font-size: 22px;
  color: #ABB4BB;
}

.trend-user-avatar > div img {
  width: 70px;
  height: 70px;
  background: #F0F2F7;
  border-radius: 50%;
}

.support-icon {
  font-size: 22px;
  display: flex;
  align-items: center;
}

.support-icon img {
  width: 44px;
  height: 44px;
}

.suport-num {
  color: red;
  font-size: 22px;
  margin-right: 10px;
  margin-top: 10px; 
}

.trend-user-content {
  justify-content: flex-end;
  display: flex;
}

.user-content {
  color: #444D52;
  font-size: 32px;
  margin: 26px 0 20px;
}

.user-content-box {
  width: 620px;
}

.user-reply {
  padding: 10px;
  background: #F7F9FB;
  font-size: 28px;
  margin-top: 20px;
}

.user-reply > div {
  margin-top: 10px;
}

.user-reply > div:nth-child(1) {
  margin-top: 0;
}

.evaluate-user {
  color: #5D7993;
}

.evaluate-content {
  color: #7F8C92;
}

.look-img-btn {
  color: #44CBFF;
}

.replay-text {
  color: #444C52;
}

.replay-input-box {
  min-height: 96px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
}

.replay-input {
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  height: 96px;
}

.replay-input > input:nth-child(1) {
  height: 66px;
  width: 506px;
  border: 0;
  outline: medium;
  border-radius: 33px;
  background: #F0F2F7;
  font-size: 30px;
  color: #444D52;
  text-indent: 17px;
}

.input-img-box img {
  width: 44px;
  height: 44px;
  position: absolute;
  top: 0;
  left: 0;;
}

.replay-input input:nth-child(1)::placeholder {
  color: #ABB3BA;
}

.submit-btn {
  width: 120px;
  height: 66px;
  line-height: 66px;
  text-align: center;
  color: #818C92;
  font-size: 28px;
  border-radius: 33px;
  background: #F0F2F7;
  position: relative;
  z-index: 7777;
}


.reply-img-list {
  padding: 30px 20px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.reply-img-list > div {
  position: relative;
  width: 116px;
  height: 116px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.reply-img-list > div img:nth-child(1) {
  width: 116px;
  height: 116px;
}

.reply-img-list > div img:nth-child(2) {
  width: 40px;
  height: 40px;
  position: absolute;
  top: -20px;
  right: -20px;
}

.modal-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .5);
}

.modal-box {
  background: #F0F2F7;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.modal-box > div {
  height: 88px;
  text-align: center;
  line-height: 88px;
  color: #444C52;
  font-size: 32px;
  background: #fff;
}

.modal-box > div:nth-child(1) {
  margin-bottom: 20px;
}

.input-img-box {
  position: relative;
  width: 44px;
  height: 44px;
}


.input-img-box .input-img {
  width: 44px;
  height: 44px;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 1;
}

.modal-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .5);
}

.modal-box {
  background: #F0F2F7;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.modal-box > div {
  height: 88px;
  text-align: center;
  line-height: 88px;
  color: #444C52;
  font-size: 32px;
  background: #fff;
}

.modal-box > div:nth-child(1) {
  margin-bottom: 20px;
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









</style>
