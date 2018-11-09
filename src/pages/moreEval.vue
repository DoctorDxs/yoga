<template>
  <div class="moreEval-page">
    <div class="moreEval-list">
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
        </div>
      </div>
    </div>
    <div class="evaluate-title">
      <div class="line-left-border"></div>
      <div>83个回答</div>
    </div>
    <div class="moreEval-list-replay" v-for='(item, index) in [1,2]' :key='index'>
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
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>

export default {
  name: 'moreEval',
  data () {
    return {
      showAll: false
    }
  },
   mounted() {
    document.getElementsByClassName('moreEval-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.moreEval-page {
  background: #F4F6F9;
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
</style>
