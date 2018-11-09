<template>
  <div class="evaluate-list">
    <div class="trend-user">
      <div class="trend-user-avatar">
        <div>
          <img src="http://img2.touxiang.cn/file/20180308/8eefd445e3718259d0044314a4289060.jpg" alt="">
        </div>
        <div class="trend-pub-time">
          <div>用户名</div>
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
        <div :class="[showAll ? 'user-reply-all' : '', 'user-reply']">
          <div><span class="evaluate-user">用户名:</span><span class="evaluate-content">这是评论内容</span>  <span class="look-img-btn">查看图片</span></div>
          <div><span class="evaluate-user">用户名</span><span class="replay-text"> 回复 </span><span class="evaluate-user">用户名:</span><span class="evaluate-content">这是评论内容</span>  <span class="look-img-btn">查看图片</span></div>
          <div><span class="evaluate-user">用户名</span><span class="replay-text"> 回复 </span><span class="evaluate-user">用户名:</span><span class="evaluate-content">这是评论内容</span>  <span class="look-img-btn">查看图片</span></div>
          <div><span class="evaluate-user">用户名</span><span class="replay-text"> 回复 </span><span class="evaluate-user">用户名:</span><span class="evaluate-content">这是评论内容</span>  <span class="look-img-btn">查看图片</span></div>
          <div><span class="evaluate-user">用户名</span><span class="replay-text"> 回复 </span><span class="evaluate-user">用户名:</span><span class="evaluate-content">这是评论内容</span>  <span class="look-img-btn">查看图片</span></div>
          <div><span class="evaluate-user">用户名</span><span class="replay-text"> 回复 </span><span class="evaluate-user">用户名:</span><span class="evaluate-content">这是评论内容</span>  <span class="look-img-btn">查看图片</span></div>
          <div><span class="evaluate-user">用户名</span><span class="replay-text"> 回复 </span><span class="evaluate-user">用户名:</span><span class="evaluate-content">这是评论内容</span>  <span class="look-img-btn">查看图片</span></div>
          <div class="look-more-btn" @click="lookAll">查看全部22条回复</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'evaluateList',
  data () {
    return {
      showAll: false
    }
  },
  methods: {
    lookAll() {
      this.$router.push({
        name: 'moreEval'
      })
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.evaluate-list {
  padding: 30px 20px;
  background: #fff;
  border-top: 1px solid rgba(171,181,188,.3)
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

.user-reply-all {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
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
