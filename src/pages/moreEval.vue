<template>
  <div class="moreEval-page">
    <div class="moreEval-list">
      <div class="trend-user" @click.stop="toComment(comment.id, comment.username)">
        <div class="trend-user-avatar">
          <div>
            <img :src="comment.user_avatar" alt="">
          </div>
          <div class="trend-pub-time">
            <div>{{comment.username}}</div>
            <div>{{comment.time_desc}}</div>
          </div>
        </div>
        <div class="support-icon" @click.stop='suportComment(comment.id, 1)'>
          <span class="suport-num" :style="comment.is_thumb == '1' ? '' : 'color: #D4D9DD;'">{{comment.thumbs}}</span>
          <img src="../assets/circle_like_nor_icon@3x.png" alt="" v-if='comment.is_thumb === "0"'>
          <img src="../assets/circle_like_pre_icon@3x.png" alt="" v-if='comment.is_thumb === "1"'>
        </div>
      </div>
      <div class="trend-user-content">
        <div class="user-content-box">
          
          <div class="trend-img1" v-if='comment.img_path.length == 1 || comment.img_path.length == 2'>
            <div v-for='(imgTtem, imgIndex) in comment.img_path' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists: comment.img_path})"></div>
          </div>
          <div class="trend-img2" v-if='comment.img_path.length == 3'>
            <div v-for='(imgTtem, imgIndex) in comment.img_path' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists: comment.img_path})"></div>
          </div>
          <div class="trend-img3" v-if='comment.img_path.length == 4'>
            <div v-for='(imgTtem, imgIndex) in comment.img_path' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists: comment.img_path})"></div>
          </div>
          <div class="user-content">
            {{comment.content}}
          </div>
        </div>
      </div>
    </div>
    <div class="evaluate-title">
      <div class="line-left-border"></div>
      <div>回复列表</div>
    </div>
    <div class="moreEval-list-replay" v-for='(item, index) in replies' :key='index'>
      <div class="trend-user" @click.stop="toreplay(item.id, item.username)">
        <div class="trend-user-avatar">
          <div>
            <img :src="item.user_avatar" alt="">
          </div>
          <div class="trend-pub-time">
            <div>{{item.username}}</div>
            <div>一小时之前</div>
          </div>
        </div>
        <div class="support-icon" @click.stop='suportComment(item.id, 2, index, item.is_thumb)'>
          <span class="suport-num" :style="item.is_thumb == '1' ? '' : 'color: #D4D9DD;'">{{item.thumbs}}</span>
          <img src="../assets/circle_like_nor_icon@3x.png" alt="" v-if='item.is_thumb === "0"'>
          <img src="../assets/circle_like_pre_icon@3x.png" alt="" v-if='item.is_thumb === "1"'>
        </div>
      </div>
      <div class="trend-user-content">
        <div class="user-content-box">
          <div class="trend-img1" v-if='item.img_path.length == 1 || item.img_path.length == 2'>
            <div v-for='(imgTtem, imgIndex) in item.img_path' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists: item.img_path})"></div>
          </div>
          <div class="trend-img2" v-if='item.img_path.length == 3'>
            <div v-for='(imgTtem, imgIndex) in item.img_path' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists: item.img_path})"></div>
          </div>
          <div class="trend-img3" v-if='item.img_path.length == 4'>
            <div v-for='(imgTtem, imgIndex) in item.img_path' :key='imgIndex'><img :src="imgTtem" alt="" @click.stop="previewImage({currentImg: imgTtem, currentImgLists: item.img_path})"></div>
          </div>
          <div class="user-content">
            {{item.username}} <span class="replay-text" v-if='item.parent_username'> 回复 </span> {{item.content}}
          </div>
        </div>
      </div>
    </div>
    <div class="replay-input-box">
      <div class="replay-input">
        <input type="text" :placeholder="'回复 ' + comment.username" v-model.trim="content" ref='commentInput'>
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
  </div>
  
</template>

<script>
import { getComments, replayOrCommit, postImg, deleteImg, addSuport, delEval } from '../fetch/api.js'
export default {
  name: 'moreEval',
  data () {
    return {
      comment: {
        img_path: ''
      },
      replies: [],
      imgs: [],
      content: '',
      page: 1,
      type: false,
      comment_id: ''
    }
  },
  created() {
    const query = this.$route.query
    this.id = query.id
    this.type = query.type
    this.comment_id = query.id
    if (query.type === 'answer') {
      this.getData(`${this.id}?page=${this.page}&type=answer`)
    } else {
      this.getData(`${this.id}?page=${this.page}`)
    }
  },
  mounted() {
    
  },
  methods: {
    getData(params) {
      getComments(params).then(res => {
        if (res.state == 200) {
          let comment = res.data.comment
          let replies = res.data.replies.data
          if (comment.img_path) {
            comment.img_path = comment.img_path.split(',')
          } else {
            comment.img_path = []
          }
          document.title = '共' + comment.evaluate_sum + '条回复'
          if (replies.length > 0) {
            replies.forEach((item, index) => {
              if (item.img_path) {
                item.img_path = item.img_path.split(',')
              } else {
                item.img_path = []
              }
            })
          };
          this.comment = comment
          this.replies = replies
        }
      })
    },
    suportComment(id, type, index, is_thumb) {
      let comment = this.comment
      let params;
      if (type == 1) {
        if (comment.is_thumb == '1') {
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
            if (comment.is_thumb == '1') {
              comment.thumbs =  comment.thumbs - 1 + ''
              comment.is_thumb =  '0'
            } else {
              comment.thumbs =  comment.thumbs - 0 + 1 + ''
              comment.is_thumb =  '1'
            }
           this.comment = comment
          } else {
            let replies = this.replies
            if (is_thumb == 1) {
              replies[index].is_thumb = '0'
              replies[index].thumbs = replies[index].thumbs - 1 + ''
            } else {
              replies[index].is_thumb = '1'
              replies[index].thumbs = replies[index].thumbs - 0 + 1 + ''
            }
            this.replies = replies
          }
          
        }
      })
    },

    commentAnswer() {
      if (this.content || this.imgs.length > 0) {
        let params = {
          content: this.content,
          img_path: this.imgs.length > 0 ? this.imgs.join(',') : '',
          comment_id: this.comment_id
        }
        
        replayOrCommit(params).then(res => {
          if (res.state == 200) {
            if (this.type === 'answer') {
              this.getData(`${this.id}?page=${this.page}&type=answer`)
            } else {
              this.getData(`${this.id}?page=${this.page}`)
            }
            this.content = ''
            this.imgs = []
          }
        })
      } else {
        this.$toast.top('请填写内容或选择图片！')
      }
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

    toComment(id, username) {
      this.content = ''
      this.imgs = []
      this.$refs.commentInput.setAttribute('placeholder', '回复 ' + username)
      this.comment_id = id
    },
    toreplay (id, username) {
      this.content = ''
      this.imgs = []
      this.$refs.commentInput.setAttribute('placeholder', '回复 ' + username)
      this.comment_id = id
    },

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.moreEval-page {
  background: #F4F6F9;
  padding-bottom: 120px;
}

.moreEval-list {
  background: #fff;
  padding: 30px 20px 20px;
   margin-bottom: 20px;
}

.moreEval-list-replay {
  background: #fff;
  padding: 30px 20px 20px;
  border-top: 1px solid #F4F6F9;
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

.replay-text {
  color: #444C52;
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
  align-items: center;
  flex-wrap: wrap;
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
  position: absolute;
  top: 0;
  left: 0;
  width: 44px;
  height: 44px;
}

</style>
