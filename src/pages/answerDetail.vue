<template>
  <div class="answerDetail-page">
    <div class="trend-problem-title">
      <img src="../assets/circle_question_icon@3x.png" alt="">
      <div class="trend-problem-question">
        <div class="problem-title">这个体式做完身体酸痛，丰富反倒是 怎么办？</div>
        <div class="look-more-answer">查看全部25个回答</div>
      </div>
    </div>

    <div class="evaluate-list">
      <div class="trend-user">
        <div class="trend-user-avatar">
          <div>
            <img src="http://img2.touxiang.cn/file/20180308/8eefd445e3718259d0044314a4289060.jpg" alt="">
          </div>
          <div class="trend-pub-time">
            <div>用户名 <span class="answer-make">回答了一个问题</span></div>
            <div>一小时之前</div>
          </div>
        </div>
        <div class="support-icon"><span class="suport-num">25</span><img src="../assets/circle_like_nor_icon@3x.png" alt=""></div>
      </div>
      <div class="trend-user-content">
        <div class="user-content-box">
          <div class="user-content">
            这是我打卡时输入的文字
          </div>
          <div class="answer-img"><img src="http://img2.touxiang.cn/file/20180308/8eefd445e3718259d0044314a4289060.jpg" alt=""></div>
          <div class="user-reply">
            <div><span class="evaluate-user">用户名:</span><span class="evaluate-content">这是评论内容</span>  <span class="look-img-btn">查看图片</span></div>
            <div><span class="evaluate-user">用户名</span><span class="replay-text"> 回复 </span><span class="evaluate-user">用户名:</span><span class="evaluate-content" @click="showModal">这是评论内容</span>  <span class="look-img-btn">查看图片</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="replay-input-box">
      <div class="replay-input">
        <!-- 请输入你的想法 -->
        <!-- 评论TA的回答 -->
        <!-- 请输入你的回答 -->
        <input type="text" placeholder="评论TA的回答" v-model="content">
        <img src="../assets/issue_photo_icon@3x.png" alt="">
        <div class="submit-btn" :style='issubmit ? "color: #fff;background: #B78FDA;" : ""'>发表</div>
      </div>
      <div class="reply-img-list">
        <div>
          <img src="http://img2.touxiang.cn/file/20180308/8eefd445e3718259d0044314a4289060.jpg" alt="">
          <img src="../assets/issue_del_icon@3x.png" alt="">
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

export default {
  name: 'answerDetail',
  data () {
    return {
      content: '',
      issubmit: false,
      modalShow: false
    }
  },
  created() {
    document.title = '回答详情';
  },
  watch: {
    content(newVal,oldVal) {
      console.log(newVal,oldVal)
      if (newVal.trim()) {
        this.issubmit = true
      } else {
        this.issubmit = false
      }
    }
  },
  mounted() {
    document.getElementsByClassName('answerDetail-page')[0].style.minHeight = window.innerHeight + 'px'
  },

  methods: {
    showModal() {
      this.modalShow = true
    },
    deleteEval() {
      this.modalShow = false
    },
    hideModal() {
      this.modalShow = false
    }
  }
  

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

.replay-input input {
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

.replay-input input::placeholder {
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




</style>
