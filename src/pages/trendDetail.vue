<template>
  <div class="trendDetail-page">
    <div class="trend-list" @click="commentUser">
      <div class="trend-avatar"><img :src="trendDetails.user_avatar" alt=""></div>
      <div class="trend-info">
        <div class='trend-username'>{{trendDetails.username}}</div>
        <div class="trend-time">{{trendDetails.time_desc}}</div>
        <div class="trend-content">
          {{trendDetails.content}}
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
            x5-video-player-type="h5"
            playsinline
            webkit-playsinlin
            :src="trendDetails.video_path"
            ref='videoTime' v-show="!showPost">
          </video>
          <img :src="trendDetails.video_cover" alt="" class="video-cover" v-show="showPost">
          <img src="../assets/class_play_icon@3x.png" alt="" class="video-icon" @click.stop="playVideo" v-show="showPost"> 
        </div>
        <div class="trend-problem-title" v-if='trendDetails.type == 2'>
          <img src="../assets/circle_question_icon@3x.png" alt="">
          <div class="trend-problem-question">{{trendDetails.content}}</div>
        </div>

         <div class="trend-problem-title" @click.stop="linkCourse(trendDetails.group_id, trendDetails.group_type)">
          <img :src="trendDetails.group_cover" alt="">
          <div class="course-desc">
            <div>{{trendDetails.group_name}}</div>
            <div>{{trendDetails.group_subscribe}} 人练习</div>
          </div>
        </div>
        <div class="trend-meat">
          <div class="trend-meat-left">
            <div @click.stop='suportComment(trendDetails.id, 1)'>
              <img src="../assets/circle_like_nor_icon@3x.png" alt="" v-if='trendDetails.is_thumb === "0"'>
              <img src="../assets/circle_like_pre_icon@3x.png" alt="" v-if='trendDetails.is_thumb === "1"'>
              <div class="num" :style="trendDetails.is_thumb == '1' ? '' : 'color: #D4D9DD;'">{{trendDetails.thumbs}}</div>
            </div>
            <div>
              <img src="../assets/circle_comment_nor_icon@3x.png" alt="">
              <div class="num">{{trendDetails.evaluate_sum}}</div>
            </div>
            <div @click.stop="shareTips">
              <img src="../assets/circle_share_nor_icon@3x.png" alt="">
              <div class="num">分享</div>
            </div>
          </div>
          <div class="trend-more" v-if='trendDetails.is_mine == "1"' @click.stop="showdelModal(trendDetails.id, '', '', 1)"><img src="../assets/circle_more_del_icon@3x.png" alt=""></div>
        </div>
      </div>
    </div>

    <div class="evaluate-title">
      <div class="line-left-border"></div>
      <div>评论列表</div>
    </div>

    <div class="evaluate-list">
      <div v-for='(item, index) in comments' :key='index' class="mar-boot">
        <div class="trend-user" @click.stop="item.is_mine == '1' ? showdelModal(item.id, index, item.id, 2) : replay(item.id, item.username,item.id, index)">
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
                <span class="evaluate-user" @click.stop="replay(commentItem.id, commentItem.username, item.id, index)">{{commentItem.username}}</span>
                <span class="replay-text" v-if='commentItem.parent_name'> 回复 </span>
                <span class="evaluate-user">{{commentItem.parent_name}}</span>:
                <span class="evaluate-content" @click.stop="commentItem.is_mine == '1' ? showdelModal(commentItem.id, index, item.id, 3) : ''">{{commentItem.content}} </span>  
                <span class="look-img-btn" v-if='commentItem.img_path.length > 0' @click.stop="previewImage({currentImg: commentItem.img_path[0], currentImgLists: commentItem.img_path})">查看图片</span>
              </div>
              <div class="look-more-btn" @click="lookAll(item.id, index)" v-if='item.evaluate_sum > 3'>查看全部{{item.evaluate_sum}}条回复</div>
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
        <input type="text" placeholder="请输入你的想法" v-model="content" ref='commentInput'>
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
        <div class="delete-Evaluate" @click.stop="deleteEvalBtn">删除</div>
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
      v-show='showModal'>
    </modal>
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" class="no-more-data"> {{comments.length > 9 ? "没有更多了..." : ""}}</div>
      <div slot="no-results"> </div>
    </infinite-loading>
  </div>
     
</template>

<script>
import { getSomeoneTrend, replayOrCommit, postImg, deleteImg, getSign, addSuport, getUpdate, delEval} from '../fetch/api.js'
export default {
  name: 'trendDetail',
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
      page: 1,
      showModal: false,
      modalShow: false
    }
  },
  activated() {
    const query = this.$route.query
    this.trendIndex = query.index
    if (this.id && query.id ) {
      if (this.id == query.id) {
        return false
      } else {
        this.type = query.type
        this.group_type = query.group_type
        this.id = query.id
        this.page = 1
        this.comments = []
        this.trendDetails = {
          img_path: []
        }
        this.getData(this.state)
      }
    } else {
      this.type = query.type
      this.group_type = query.group_type
      this.id = query.id
    }
    document.title = '动态详情'

    let evalUpdate = localStorage.getItem("evalUpdate")
    if (evalUpdate) {
      evalUpdate = JSON.parse(evalUpdate)
      setTimeout(() => {
        this.updateEval(evalUpdate)
      }, 1500)
    }
  },
  methods: {
    updateEval(evalUpdate) {
      const comments = this.evaluteList
      const id = evalUpdate.commentId
      const evalIndex = evalUpdate.evalIndex
      const doWhat = evalUpdate.doWhat
      if (doWhat == 1) {
        this.evalId = id
        this.commentIndex = evalIndex
        this.replayInput = 2
        this.getupdata()
      } else if (doWhat == 2) {
        this.comments.splice(evalIndex, 1)
      }
      localStorage.removeItem('evalUpdate')
    },
    playVideo() {
      this.showPost = false
      this.$refs.videoTime.play()
    },
    endVideo() {
      
    },
    infiniteHandler($state) {
      this.state = $state
      this.getData($state)
    },
    getData($state) {
      getSomeoneTrend({id: this.id, page: this.page}).then(res => {
        if(res.state == 200) {
          let trendDetails = res.data.detail
          let  comments;
          if (trendDetails.img_path) {
            trendDetails.img_path = detail.img_path.split(',')
          } else {
            trendDetails.img_path = []
          }
          comments = res.data.comments.data
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
            console.log(comments)
            $state.loaded();
          } else {
            $state.complete()
          }
          this.trendDetails = trendDetails
        } else {
          this.$toast.top(res.msg)
        }
      })
    },


    showdelModal(id,index, devalId, type) {
      // 删除 动态
      if (type == 1) {
        this.showModal = true
        this.deletetRendId = id
      } else if (type == 2) {
        // 删除评论
        this.modalShow = true
        this.deleteEvalId = id
        this.deleteEvalIndex = index
      } else if (type == 3) {
        this.modalShow = true
        this.delComentId = id
        this.deleteEvalId = devalId
        this.deleteEvalIndex = index
      }
      this.delType = type
    },
    deleteEvalBtn() {
      this.modalShow = false
      // this.showModal = true
      this.confirm()
    },
    confirm() {
      this.showModal = false
      let params;
      if (this.delType == 1) {
        params = {news_id: this.deletetRendId}
      } else if (this.delType == 2) {
        params = {comment_id:　this.deleteEvalId}
      } else if (this.delType == 3) {
        params = {comment_id:　this.delComentId}
      }
      delEval(params).then(res => {
        if (res.state == 200) {
          this.$toast.top('已删除！')
          // 删除动态
          if (this.delType == 1) {
            let trendUpdate = JSON.parse(localStorage.getItem('trendUpdate'))
            trendUpdate.doWhat = 2
            localStorage.setItem('trendUpdate', JSON.stringify(trendUpdate))
            this.$router.go(-1)
          } else if (this.delType == 2) {
            // 删一条评论 本页面 评论数 -1 评论列表中删除
            let trendDetails = this.trendDetails
            this.comments.splice(this.deleteEvalIndex, 1)
            trendDetails.evaluate_sum = trendDetails.evaluate_sum - 0 +1
            this.trendDetails = trendDetails

            let trendUpdate = JSON.parse(localStorage.getItem('trendUpdate'))
            trendUpdate.doWhat = 1
            localStorage.setItem('trendUpdate', JSON.stringify(trendUpdate))
          } else if (this.delType == 3) {
            this.replayInput = 2
            this.evalId = this.deleteEvalId
            this.getupdata('', 3)
          }
          
        } else {
           this.$toast.top(res.msg)
        }
      })
    },
    cancel() {
      this.showModal = false
    },

    hideModal() {
      this.modalShow = false
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
      let trendDetails = this.trendDetails
      replayOrCommit(params).then(res => {
        if (res.state == 200) {
          this.content = ''
          this.imgs = ''
          if (this.replayInput == 1) {
            trendDetails.evaluate_sum = trendDetails.evaluate_sum - 0 +1
            this.trendDetails = trendDetails
            let trendUpdate = JSON.parse(localStorage.getItem('trendUpdate'))
            trendUpdate.doWhat = 1
            localStorage.setItem('trendUpdate', JSON.stringify(trendUpdate))
          };
          this.getupdata(res.data)
        } else {
          this.$toast.top(res.msg)
        }
      })
    },

    // 获取某一条评论
    getupdata(data, delType) {
      let api;
      if (this.replayInput == 1) {
        api = `news_id=${this.id}&comment_id=${data.id}`
      } else {
        api = `news_id=${this.id}&comment_id=${this.evalId}`
      }
      
      getUpdate(api).then(res => {
        if(res.state == 200) {
          let data = res.data
          if (data.img_path) {
            data.img_path = data.img_path.split(',')
          } else {
            data.img_path = []
          };
          if (data.comments.length > 0) {
            data.comments.forEach( item => {
              if (item.img_path) {
                item.img_path = item.img_path.split(',')
              } else {
                item.img_path = []
              }
            })
          };

          if (delType == 3) {
            // 删除一条回复
            this.comments.splice(this.deleteEvalIndex, 1, data);
          } else {
            // 增加一条评论
            if (this.replayInput == 1) this.comments.unshift(data);
            // 修改一条评论
            if (this.replayInput == 2) this.comments.splice(this.commentIndex, 1, data);
          }
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
            let trendUpdate = JSON.parse(localStorage.getItem('trendUpdate'))
            trendUpdate.doWhat = 1
            localStorage.setItem('trendUpdate', JSON.stringify(trendUpdate))
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
        } else {
          this.$toast.top(res.msg)
        }
      })
    },

    linkCourse(id, type) {
      if (type == 1) {
        this.$router.push({
          name: 'campDetail', query: {id: id}
        })
      } else {
        this.$router.push({
          name: 'courseDetail', query: {id: id}
        })
      }
    },

    replay(id, username, evalId, index) {
      this.commentIndex = index
      this.replayInput = 2
      this.comment_id = id
      this.evalId = evalId
      this.content = ''
      this.imgs = []
      this.$refs.commentInput.setAttribute('placeholder', `回复  ${username}`)
    },
    commentUser() {
      this.replayInput = 1
      this.content = ''
      this.imgs = []
      this.$refs.commentInput.setAttribute('placeholder', '请输入你的想法')
      
    },
    lookAll(id, index) {
      this.$router.push({
        name: 'moreEval', query: {id: id, evalIndex: index}
      })
      // 0 未操作  对于评论来说（删除、和点赞） 1 更新某条数据   2 （新增）刷新整个页面
      localStorage.setItem('evalUpdate',JSON.stringify({evalIndex: index, doWhat: 0, commentId: id}))
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
body {
  background: #F4F6F9;
}
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

.input-img-box img {
  width: 44px;
  height: 44px;
  position: absolute;
  left: 0;
  top: 0;
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

.look-more-btn {
  color: #5D7992;
  font-size: 28px;
  margin-top: 10px;
}


</style>
