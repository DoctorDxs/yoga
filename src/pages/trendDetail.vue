<template>
  <div class="trendDetail-page">
    <trend-list :evaluteList='evaluteList'></trend-list>

    <div class="evaluate-title">
      <div class="line-left-border"></div>
      <div>{{evaluteList[0] ? evaluteList[0].evaluate_sum : 0}}个回答</div>
    </div>

    <div class="evaluate-list">
      <evaluate-list :comments='comments' @toanswer='answerQuestion'></evaluate-list>
    </div>
    <div class="replay-input-box">
      <div class="replay-input">
        <!-- 请输入你的想法 -->
        <!-- 评论TA的回答 -->
        <!-- 请输入你的回答 -->
        <input type="text" :placeholder="type == 1 ? '评论TA的回答' : '请输入您的回答'" v-model="content" ref='commentInput'>
        <div class="input-img-box">
          <img src="../assets/issue_photo_icon@3x.png" alt="">
          <input type="file" @change="selectImg" class="input-img" name="img1" value="" accept="image/*" ref="inputImg1">
        </div>
        
        <div class="submit-btn" :style='(content != "" || imgs.length > 0) ? "color: #fff;background: #B78FDA;" : ""' @click="submitIdea">发表</div>
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
import trendList from '@/components/trendList'
import evaluateList from '@/components/evaluateList'
import { getSomeoneTrend, replayOrCommit, postImg, deleteImg, addTrend, getSign} from '../fetch/api.js'
export default {
  name: 'trendDetail',
  data () {
    return {
      type: 1,
      group_type: '',
      id: '',
      evaluteList: [],
      comments: [],
      content: '',
      imgs: [],
    }
  },
  created() {
    const query = this.$route.query
    this.type = query.type
    this.group_type = query.group_type
    this.id = query.id
    if (query.type == 1 ) {
      document.title = '动态详情'
    } else {
      document.title = '问题详情'
    }
    this.getData()
  },
  mounted() {
    
  },
  methods: {
    getData() {
      getSomeoneTrend(this.id).then(res => {
        if(res.state == 200) {
          this.evaluteList = []
          this.evaluteList.push(res.data.detail)
          if (this.type == 1) {
           this.comments = res.data.comments.data
          } else {
            this.comments = res.data.answers.data
          }  
        }
      })
    },
    submitIdea() {
      if (this.content || this.imgs.length > 0) {
        let params;
        if (this.type == 1) {
          // 对动态进行评论
          params = {
            content: this.content,
            news_id: this.id,
            image_paths: this.imgs.length > 0 ? this.imgs.join(',') : ''
          }
          this.comment(params)
        } else {
          // 回答提出的问题 就是发动态
          params = {
            content: this.content,
            image_paths: this.imgs.length > 0 ? this.imgs.join(',') : '',
            type: 3,
            reply_id: this.id
          }
          this.addTrend(params)
        }
        
      } else {
        this.$toast.top('请输入内容或选择图片!')
      }
    },

    comment() {
      replayOrCommit(params).then(res => {
        console.log(res)
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

    addTrend(params) {
      addTrend(params).then(res => {
        if (res.state == 200) {
          this.getData()
          this.content = ''
          this.imgs = []
        }
      })
    },
    answerQuestion(username, id) {
      const commentInput = this.$refs.commentInput
      this.answerCommentId = id
      commentInput.setAttribute('placeholder', `回复  ${username}`)
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
  },
  components: {
    trendList,
    evaluateList
  }

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


</style>
