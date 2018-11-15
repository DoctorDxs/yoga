<template>
  <div class="trendDetail-page">
    <div class="trend-list" @click="commentUser">
      <div class="trend-avatar"><img :src="trendDetails.user_avatar" alt=""></div>
      <div class="trend-info">
        <div @click.stop="shareTips" class="share-btn"><img src="../assets/circle_share_nor_icon@3x.png" alt=""></div>
        <div class='trend-username'>{{trendDetails.username}} <span class="answers-tips">提了一个问题</span> </div>
        <div class="trend-time">{{trendDetails.time_desc}}</div>
        <div class="trend-content">
          {{trendDetails.content}}
        </div>
        <div class="trend-desc">
          {{trendDetails.desc}}
        </div>
        
        <div class="trend-img1" v-if='trendDetails.img_path.length == 1 || trendDetails.img_path.length == 2'>
          <div v-for='(imgTtem, imgIndex) in trendDetails.img_path' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists: trendDetails.img_path})"></div>
        </div>
        <div class="trend-img2" v-if='trendDetails.img_path.length == 3'>
          <div v-for='(imgTtem, imgIndex) in trendDetails.img_path' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists: trendDetails.img_path})"></div>
        </div>
        <div class="trend-img3" v-if='trendDetails.img_path.length == 4'>
          <div v-for='(imgTtem, imgIndex) in trendDetails.img_path' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists: trendDetails.img_path})"></div>
        </div>
        <div class="video-box" v-if='trendDetails.video_path'><video :src="trendDetails.video_path" controls></video></div>
        <div class="trend-problem-title" @click.stop="linkCourse(trendDetails.group_id, trendDetails.group_type)">
          <img :src="trendDetails.group_cover" alt="">
          <div class="course-desc">
            <div>{{trendDetails.group_name}}</div>
            <div>{{trendDetails.group_subscribe_num}} 人练习</div>
          </div>
        </div>
      </div>
    </div>

    <div class="evaluate-title">
      <div class="line-left-border"></div>
      <div>{{trendDetails.evaluate_sum ? trendDetails.evaluate_sum + '个回答' : '暂无回答'}}</div>
    </div>

    <div class="evaluate-list">
      <div v-for='(item, index) in comments' :key='index' class="mar-boot">
        <div class="trend-user" @click.stop="replay(item.id, item.username)">
          <div class="trend-user-avatar">
            <div>
              <img :src="item.user_avatar" alt="">
            </div>
            <div class="trend-pub-time">
              <div>{{item.username}}</div>
              <div>{{item.time_desc}}</div>
            </div>
          </div>
          <div class="support-icon" @click.stop="suportComment(item.id, 2, index, item.is_thumb)">
            <span class="suport-num" :style="item.is_thumb == '1' ? '' : 'color: #D4D9DD;'">{{item.thumbs}}</span>
            <img :src="item.is_thumb == '1' ? require('../assets/circle_like_pre_icon@3x.png') : require('../assets/circle_like_nor_icon@3x.png')" alt="">
          </div>
        </div>
        <div class="trend-user-content">
          <div class="user-content-box">
            <div class="user-content">
              {{item.content}}
            </div>
            <div class="trend-img1" v-if='item.img_path.length == 1 || item.img_path.length == 2'>
              <div v-for='(imgTtem, imgIndex) in item.img_path' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists:item.img_path})"></div>
            </div>
            <div class="trend-img2" v-if='item.img_path.length == 3'>
              <div v-for='(imgTtem, imgIndex) in item.img_path' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists:item.img_path})"></div>
            </div>
            <div class="trend-img3" v-if='item.img_path.length == 4'>
              <div v-for='(imgTtem, imgIndex) in item.img_path' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists:item.img_path})"></div>
            </div>
            <div class="user-reply" v-if='item.comments.length > 0'>
              <div v-for='(commentItem, commentIndex) in item.comments' :key='commentIndex'>
                <span class="evaluate-user" @click.stop="replay(commentItem.id, commentItem.username)">{{commentItem.username}}</span>
                <span class="replay-text" v-if='commentItem.parent_username'> 回复 </span>
                <span class="evaluate-user">{{commentItem.parent_username}}</span>:
                <span class="evaluate-content" @click="commentItem.is_mine == '1' ? showModal() : ''">{{commentItem.content}} </span>  
                <span class="look-img-btn" v-if='commentItem.img_path.length > 0' @click.stop="previewImage({currentImg: commentItem.img_path[0], currentImgLists: commentItem.img_path})">查看图片</span>
              </div>
              <div class="look-more-btn" @click="lookAll(item.id)" v-if='item.evaluate_sum > 3'>查看全部{{item.evaluate_sum}}条回复</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="replay-input-box">
      <div class="replay-input">
        <!-- 请输入你的想法 -->
        <!-- 评论TA的回答 -->
        <!-- 请输入你的回答 -->
        <input type="text" placeholder="请输入你的回答" v-model="content" ref='commentInput'>
        <div class="input-img-box">
          <img src="../assets/issue_photo_icon@3x.png" alt="">
          <input type="file" @change="selectImg" class="input-img" name="img1" value="" accept="image/*" ref="inputImg1">
        </div>
        
        <div class="submit-btn" :style='(content != "" || imgs.length > 0) ? "color: #fff;background: #B78FDA;" : ""' @click.stop="submitIdea">发表</div>
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
  </div>
     
</template>

<script>
import { getSomeoneTrend, replayOrCommit, postImg, deleteImg, getSign, addSuport} from '../fetch/api.js'
export default {
  name: 'questionDetail',
  data () {
    return {
      group_type: '',
      type: '',
      id: '',
      trendDetails: {
        img_path: []
      },
      comments: [],
      content: '',
      imgs: [],
      replayInput: 1
    }
  },
  created() {
    const query = this.$route.query
    this.type = query.type
    this.group_type = query.group_type
    this.id = query.id
    document.title = '问题详情'
    this.getData()
  },
  methods: {
    getData() {
      getSomeoneTrend(this.id).then(res => {
        if(res.state == 200) {
          let trendDetails = res.data.detail
          let  comments;
          if (trendDetails.img_path) {
            trendDetails.img_path = detail.img_path.split(',')
          } else {
            trendDetails.img_path = []
          }
          comments = res.data.answers.data
          if (comments.length > 0) {
            comments.forEach((item, index) => {
              if (item.img_path) {
                item.img_path = item.img_path.split(',')
              } else {
                item.img_path = []
              }
              if (item.comments.length > 0) {
                item.comments.forEach(item2 => {
                  if (item2.img_path) {
                    item2.img_path = item2.img_path.split(',')
                  } else {
                    item2.img_path = []
                  }
                })
              }
            })
          };
          this.trendDetails = trendDetails
          this.comments = comments
        }
      })
    },
    submitIdea() {
      if (this.content || this.imgs.length > 0) {
        let params;
        if (this.replayInput == 1) {
          // 对动态进行评论
          params = {
            content: this.content,
            news_id: this.id,
            img_path: this.imgs.length > 0 ? this.imgs.join(',') : ''
          }
        } else if (this.replayInput == 2) {
          // 对评论进行回复
          params = {
            content: this.content,
            img_path: this.imgs.length > 0 ? this.imgs.join(',') : '',
            comment_id: this.comment_id
          }
        }
        this.comment(params)
        
      } else {
        this.$toast.top('请输入内容或选择图片!')
      }
    },
    // 评论
    comment(params) {
      replayOrCommit(params).then(res => {
        if (res.state == 200) {
          this.content = ''
          this.imgs = []
          this.getData()
        } else {
          this.$toast.top(res.msg)
        }
      })
    },
    selectImg(e) {
      const inputFile = this.$refs.inputImg1
      if(inputFile.files[0].length !== 0){ 
        let data = new FormData();
        data.append('file', inputFile.files[0]);
        data.append('type', 7)
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
    // 点赞
    suportComment(id, type, index, is_thumb) {
      let trendDetails = this.trendDetails
      let params;
      if (type == 1) {
        if (trendDetails.is_thumb == '1') {
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
      } else { 
        if (is_thumb == '1') {
          params = {
            comment_id: id,
            is_thumb: 0
          }
        } else {
          params = {
            comment_id: id,
            is_thumb: 1
          }
        }
        
      }
      addSuport(params).then(res => {
        if (res.state == 200) {
          if (type == 1) {
            if (trendDetails.is_thumb == '1') {
              trendDetails.thumbs =  trendDetails.thumbs - 1 + ''
              trendDetails.is_thumb =  '0'
            } else {
              trendDetails.thumbs =  trendDetails.thumbs - 0 + 1 + ''
              trendDetails.is_thumb =  '1'
            }
           this.trendDetails = trendDetails
          } else {
            let comments = this.comments
            if (is_thumb == 1) {
              comments[index].is_thumb = '0'
              comments[index].thumbs = comments[index].thumbs - 1 + ''
            } else {
              comments[index].is_thumb = '1'
              comments[index].thumbs = comments[index].thumbs - 0 + 1 + ''
            }
            this.comments = comments
          }
          
        }
      })
    },

    toTrend() {
      this.content = ''
      this.imgs = []
      this.replayInput = 1
    },

    replay(id, username) {
      this.replayInput = 2
      this.comment_id = id
      this.content = ''
      this.imgs = []
      this.$refs.commentInput.setAttribute('placeholder', `回复  ${username}`)
    },
    commentUser() {
      this.replayInput = 1
      this.content = ''
      this.imgs = []
      this.$refs.commentInput.setAttribute('placeholder', '请输入你的回答')
      
    },
    lookAll(id) {
      this.$router.push({
        name: 'moreEval', query: {id: id}
      })
    },
    // 分享提示
    shareTips() {
      alert('请点击右上角分享至好友或朋友圈')
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.trendDetail-page {
  padding-bottom: 100px;
  background: #F4F6F9;
  position: relative;
}

.evaluate-title {
  padding: 0 30px;
  height: 100px;
  background: #fff;
  display: flex;
  align-items: center;
  font-size: 32px;
  color: #444C52;
  font-weight: 600;
  margin-top: 20px;
}

.line-left-border {
  width: 8px;
  height: 38px;
  border-radius: 8px;
  background: #B78FDA;
  margin-right: 16px;
}

.replay-input-box {
  min-height: 96px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
}

.share-btn {
  position: absolute;
  width: 44px;
  height: 44px;
  right: 20px;
  top: 30px;
}

.answers-tips {
  color: #ABB4BB;
  font-size: 30px;
}


.share-btn img {
  width: 44px;
  height: 44px;
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

.replay-input img {
  width: 44px;
  height: 44px;
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
}

.reply-img-list > div {
  position: relative;
  width: 116px;
  height: 116px;
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
    color: #ABB4BB;
  }

  .trend-content {
    color: #444C52;
    font-size: 32px;
    margin: 40px 0 10px;
    font-weight: 600;
  }

  .trend-desc {
    color: #818C92;
    font-size: 32px;
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


  .evaluate-list {
  padding: 30px 20px;
  background: #fff;
  border-top: 1px solid rgba(171,181,188,.3);
  margin-bottom: 20px;
}

.mar-boot {
  margin-bottom: 20px;  
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
  /*  */
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

.look-more-btn {
  color: #5D7992;
  font-size: 28px;
  margin-top: 10px;
}


</style>
