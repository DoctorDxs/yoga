<template>
  <div class="trendDetail-page">
    <bg></bg>
    <div class="trend-list" @click="commentUser">
      <div class="trend-avatar"><img :src="trendDetails.user_avatar" alt=""></div>
      <div class="trend-info">
        <div @click.stop="shareTips" class="share-btn"><img src="../assets/circle_share_nor_icon@3x.png" alt=""></div>
        <div class='trend-username'>{{trendDetails.username}} <span class="answers-tips">提了一个问题</span> </div>
        <div class="trend-time">{{trendDetails.time_desc}}</div>
        <div class="trend-content" v-if="trendDetails.content">
          {{trendDetails.content}}
        </div>
        <div class="trend-desc" v-if='trendDetails.desc'>
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
        <div class="video-box" v-if='trendDetails.video_path'>
          <video 
            @ended="endVideo()"
            :src="trendDetails.video_path"
            ref='videoTime' v-show="!showPost">
          </video>
          <img :src="trendDetails.video_cover" alt="" class="video-cover" v-show="showPost">
          <img src="../assets/class_play_icon@3x.png" alt="" class="video-icon" @click.stop="playVideo" v-show="showPost"> 
        </div>
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

    <div class="evaluate-list" v-if='comments.length'>
      <div v-for='(item, index) in comments' :key='index' class="mar-boot">
        <div class="trend-user" @click.stop="item.is_mine ? linkAnswers(item.id,index) : replay(true ,item.id, item.username, item.index, item.id)">
          <div class="trend-user-avatar">
            <div>
              <img :src="item.user_avatar" alt="">
            </div>
            <div class="trend-pub-time">
              <div>{{item.username}}</div>
              <div>{{item.time_desc}}</div>
            </div>
          </div>
          <div class="support-icon" @click.stop="suportComment(item.id, index, item.is_thumb)">
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
                <span class="evaluate-user" @click.stop="replay(false ,commentItem.id, commentItem.username, item.index, item.id)">{{commentItem.username}}</span>
                <span class="replay-text" v-if='commentItem.parent_username'> 回复 </span>
                <span class="evaluate-user" v-if='commentItem.parent_username'>{{commentItem.parent_username}}</span>:
                <span class="evaluate-content" @click="commentItem.is_mine == '1' ? showModal(commentItem.id,commentIndex) : ''">{{commentItem.content}} </span>  
                
                <span class="look-img-btn" v-if='commentItem.img_path.length > 0' @click.stop="previewImage({currentImg: commentItem.img_path[0], currentImgLists: commentItem.img_path})">查看图片</span>
              </div>
              <div class="look-more-btn" @click="lookAll(item.id)" v-if='item.evaluate_sum > 3'>查看全部{{item.evaluate_sum}}条回复</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <div class="no-data-icon" v-if='!comments.length'><img src="../assets/all_none@3x.png" alt="" ></div>
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
    <modal 
      title="提示" 
      :content='modalContent'
      :showCancle='showCancle' 
      :confirmText='confirmText'
      @on-cancel="cancel" 
      @on-confirm='confirm'
      v-show='showModal1'>
    </modal>
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" class="no-more-data"> {{comments.length > 9 ? "没有更多了..." : ""}}</div>
      <div slot="no-results"> </div>
    </infinite-loading>
  </div>
     
</template>

<script>
import { getSomeoneTrend, replayOrCommit, postImg, deleteImg, getSign, addSuport, delEval, addTrend,getShareInfo,updataTrend} from '../fetch/api.js'
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
      replayInput: 1,
      modalShow: false,
      showModal1: false,
      modalContent: '是否删除?',
      is_share: false ,
      showCancle: false,
      confirmText: '删除',
      shareInfo: '',
      page: 1,
      showPost: true
    }
  },
  activated() {
    document.title = '问题详情'
    const query = this.$route.query
    if (this.type && this.id ) {
      if (this.id == query.id) {
        return false
      } else {
        this.type = query.type
        this.group_type = query.group_type
        this.id = query.id
        this.page = 1
        this.comments = []
        this.imgs = []
        this.content = ''
        this.trendDetails = {
          img_path: []
        }
        this.getData(this.state)
      }
    } else {
      this.type = query.type
      this.group_type = query.group_type
      this.id = query.id
      this.page = 1
      this.comments = []
      this.imgs = []
      this.content = ''
      this.trendDetails = {
        img_path: []
      }
    }


    let trendUpdate = localStorage.getItem("trendUpdate")
    if (trendUpdate) {
      trendUpdate = JSON.parse(trendUpdate)
      setTimeout(() => {
        this.updateTrend(trendUpdate)
      }, 1500)
    }
    
  },
  mounted() {
    this.addResize()
  },
  methods: {
    updateTrend(trendUpdate) {
      const comments = this.comments
      const trendIndex = trendUpdate.trendIndex
      const doWhat = trendUpdate.doWhat
      if (doWhat == 1) {
        let id;
        if (comments[trendIndex]) {
          id = comments[trendIndex].id
        }
        updataTrend(id).then(res => {
          
          if (res.state == 200) {
            if (res.data.img_path) {
              res.data.img_path = res.data.img_path.split(',')
            }
            this.comments.splice(trendIndex, 1, res.data)
          } else {
            this.comments.splice(trendIndex, 1)
          }
        })
      } else if (doWhat == 2) {
        this.$emit('updataTrends', this.$state)
        localStorage.removeItem('trendUpdate')
      }
    },

     infiniteHandler($state) {
      this.state = $state
      this.getData($state)
    },
    playVideo() {
      this.showPost = false
      this.$refs.videoTime.play()
      this.addResize()
    },
    // 监控shi'pin 全屏
    addResize() {
      window.addEventListener('resize', this.watchFullScreen, false)
    },

    watchFullScreen() {
      if (!this.checkFull()) {
        this.showPost = true
        this.$refs.videoTime.pause()
      } else {
        window.removeEventListener('resize', this.watchFullScreen, false)
      }
    },
    checkFull() {
      let isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
      if (isFull === undefined) isFull = false;
      return isFull;
    },
    getData($state) {
      getSomeoneTrend({id:　this.id, page: this.page}).then(res => {
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

            this.page += 1;
            this.comments.push(...comments)
            $state.loaded();
          } else {
            $state.complete()
          }
          this.trendDetails = trendDetails
          this.getShareInfo()
        } else {
          this.$toast.top(res.msg)
        }
      })
    },
    getShareInfo() {
      const params = {
        id: this.trendDetails.id,
        type: 2
      }
      getShareInfo(params).then(res => {
        if (res.state == 200) {
          this.shareInfo = res.data
          this.getSign()
        }
      })
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
    submitIdea() {
      if (this.content || this.imgs.length > 0) {
        let params;
        if (this.replayInput == 1) {
          // 对问题进行回答
          params = {
            content: this.content,
            type: 3,
            reply_id: this.trendDetails.id,
            image_paths: this.imgs.length > 0 ? this.imgs.join(',') : '',
            video_path: ''
          }
          this.postTrend(params)
        } else if (this.replayInput == 2) {
          // 对评论进行回复
          if (this.addComment) {
            params = {
              content: this.content,
              img_path: this.imgs.length > 0 ? this.imgs.join(',') : '',
              news_id: this.comment_id
            }
          } else {
            params = {
              content: this.content,
              img_path: this.imgs.length > 0 ? this.imgs.join(',') : '',
              comment_id: this.comment_id
            }
          }
          this.comment(params)
        }
        
      } else {
        this.$toast.top('请输入内容或选择图片!')
      }
    },

    postTrend(params) {
      addTrend(params).then(res => {
        if (res.state == 200) {
          this.$toast.top(res.msg)
          this.trendId = res.data.id
          this.updataTrend(res.data)
          this.content = ''
          this.imgs = []
        } else {
          this.$toast.top(res.msg)
        }
      })
    },


    updataTrend() {
      updataTrend(this.trendId).then(res => {
          if (res.state == 200) {
            if (res.data.img_path) {
              res.data.img_path = res.data.img_path.split(',')
            }
            let data = res.data
            data.comments = []
            // 添加一条新动态
            if(this.replayInput == 1) {
              this.comments.unshift(data)
              let trendDetails = this.trendDetails
              trendDetails.evaluate_sum = trendDetails.evaluate_sum - 0 + 1
              this.trendDetails = trendDetails
              let trendUpdate = JSON.parse(localStorage.getItem('trendUpdate'))
              trendUpdate.doWhat = 2
              localStorage.setItem('trendUpdate', JSON.stringify(trendUpdate))
            } else {
              this.comments.splice(this.trendIndex, 1, data)
              let trendUpdate = JSON.parse(localStorage.getItem('trendUpdate'))
              trendUpdate.doWhat = 1
              localStorage.setItem('trendUpdate', JSON.stringify(trendUpdate))
            }
          }
        })
    },
    // 评论
    comment(params) {
      replayOrCommit(params).then(res => {
        if (res.state == 200) {
          this.content = ''
          this.imgs = []
          this.addComment = false
          this.updataTrend()
        } else {
          this.$toast.top(res.msg)
        }
      })
    },
    selectImg(e) {
      const inputFile = this.$refs.inputImg1
      if(inputFile.files[0] && inputFile.files[0].length !== 0){ 
        let data = new FormData();
        data.append('file', inputFile.files[0]);
        data.append('type', 7)
        this.showLoading = true
        postImg(data).then(res => {
          this.showLoading = false
          if (res.state == 200) {
            this.imgs = res.data
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
      // 图片预览
      wx.previewImage({
        current: params.currentImg, // 当前显示图片的http链接
        urls: params.currentImgLists, // 需要预览的图片http链接列表
      });
    },

    getSign() {
      getSign(encodeURIComponent(location.href)).then(res => {
        if (res.state == 200) {
          this.setConfig(res.data)
        }
      })
    },

    setConfig(params) {
      let shareInfo = this.shareInfo
      wx.config({
        debug: false, 
        appId: params.appId, 
        timestamp: params.timeStamp, 
        nonceStr: params.nonceStr, 
        signature: params.signature,
        jsApiList: ['checkJsApi', 'previewImage','onMenuShareAppMessage', 'onMenuShareTimeline']
      });
      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: [
            'previewImage',
            'onMenuShareAppMessage',
            'onMenuShareTimeline'
          ]
        });
        // 分享到盆友圈
        wx.onMenuShareTimeline({
          title: shareInfo.title,
          link: shareInfo.url,
          imgUrl: shareInfo.cover,
          success: function(res) {
          },
        })
      //分享给朋友
        wx.onMenuShareAppMessage({
          title: shareInfo.title,
          desc: shareInfo.desc,
          link: shareInfo.url,
          imgUrl: shareInfo.cover,
          success: function() {
          }
        })
        
      })
    },
    // 点赞
    suportComment(id,  index, is_thumb) {
      let params;
      
      if (is_thumb == '1') {
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
          
          let comments = this.comments
          if (is_thumb == 1) {
            comments[index].is_thumb = '0'
            comments[index].thumbs = comments[index].thumbs - 1 + ''
          } else {
            comments[index].is_thumb = '1'
            comments[index].thumbs = comments[index].thumbs - 0 + 1 + ''
          }
          this.comments = comments
          let trendUpdate = JSON.parse(localStorage.getItem('trendUpdate'))
          trendUpdate.doWhat = 1
          localStorage.setItem('trendUpdate', JSON.stringify(trendUpdate))
        } 
        
      })
    },

    replay(addComment, id, username, trendIndex, trendId) {
      this.replayInput = 2
      this.trendIndex = trendIndex
      this.trendId = trendId
      this.comment_id = id
      this.addComment = addComment
      this.content = ''
      this.imgs = []
      this.$refs.commentInput.setAttribute('placeholder', `回复  ${username}`)
    },
    commentUser(id) {
      this.replayInput = 1
      this.content = ''
      this.imgs = []
      this.$refs.commentInput.setAttribute('placeholder', '请输入你的回答')
      
    },
    lookAll(id) {
      this.$router.push({
        name: 'moreEval', query: {id: id, type: 'answer'}
      })
    },
    // 分享提示
    shareTips() {
      this.modalContent = '请点击窗口右上角来分享至微信好友或朋友圈'
      this.confirmText = '确认'
      this.showModal1 = true,
      this.showCancle = false
      this.is_share = true
    },


    showModal(id, index) {
      this.modalShow = true
      this.deleteId = id,
      this.delIndex = index
    },
    deleteEval() {
      this.modalContent = '是否删除？'
      this.confirmText = '删除'
      this.showCancle = true
      this.modalShow = false
      this.showModal1 = true
    },
    confirm() {
      this.showModal1 = false
      if (this.is_share) {
        this.is_share = false
      } else {
        delEval({comment_id: this.deleteId}).then(res => {
          if (res.state == 200) {
            this.$toast.top('已删除！')
            this.deleteId = ''
            this.delIndex = ''
            this.comments = []
            this.page = 1
            this.getData(this.state)
          } else {
            this.$toast.top(res.msg)
          }
        })
        this.is_share = false
      }
    },
    cancel() {
      this.showModal1 = false
    },
    hideModal() {
      this.modalShow = false
    },

    linkAnswers(id, index) {
      this.$router.push({
        name: 'answerDetail', query: {id: id, type: this.type, index: index}
      }) 
      localStorage.setItem('trendUpdate',JSON.stringify({trendIndex: index, doWhat: 0}))
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  background: #F4F6F9;
}
.trendDetail-page {
  padding-bottom: 100px;
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
  background: #F4F6F9;
  font-size: 30px;
  color: #444D52;
  text-indent: 17px;
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
  background: #F4F6F9;
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
  background: #F4F6F9;
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

.input-img-box img {
  width: 44px;
  height: 44px;
  position: absolute;
  top: 0;
  left: 0;
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
    margin: 30px 0 10px;
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
  background: #F4F6F9;
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
