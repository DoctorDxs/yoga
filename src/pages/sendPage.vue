<template>
  <div class="send-page">
    <div class="gift-send-box">
      <img src="../assets/class_gift_bg01@3x.png" alt="" class="bg-middle">
      <img src="../assets/class_gift_bg02@3x.png" alt="" class="bg-bottom">
      <div class="content-box">
        <div class="sender-info"><div><img src="http://tx.haiqq.com/uploads/allimg/150402/16094151D-13.jpg" alt=""><span class='sender-name'>用户名</span><span class="sender-text">赠送给你</span></div></div>
        <div class="gift-detail">
          <img src="http://tx.haiqq.com/uploads/allimg/150402/16094151D-13.jpg" alt="">
          <div class="course-desc">
            <div>21天瑜伽瘦身课</div>
            <div>课程</div>
          </div>
        </div>
        <div class="course-price"><span>价值</span><span>￥399</span></div>
        <!-- 已领取，查看详情 -->

        <div class="get-course-btn" @click="receiveNow">立即领取</div>
        <div class="get-limit">请在2018-10-12 12:22 前领取</div>
      </div>
    </div>
  </div>
     
</template>

<script>

export default {
  name: 'sendPage',
  data () {
    return {
      
    }
  },
  created() {
    document.title = '赠送';
  },
  mounted() {
    document.getElementsByClassName('send-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    receiveNow() {
      this.$router.push({
        name: 'receive'
      })
    }
  },
  components: {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.send-page {
  background: #F4F6F9;
  position: fixed;
  width: 100%;
  height: 100;
  top: 0;
  left: 0;
}

.gift-send-box {
  position: absolute;
  width: 100%;
  height: 1050px;
  top: 80px;
}

.bg-middle {
  position: absolute;
  height: 196px;
  width: 730px;
  right: 0;
  margin: auto;
  bottom: 400px;
  left: 0;
  z-index: 1;
}

.bg-bottom {
  position: absolute;
  height: 424px;
  width: 100%;
  bottom: 0px;
  left: 0;
  z-index: 3;
}

.content-box {
  width: 690px;
  height: 852px;
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  z-index: 2;
  border: 1px solid #E6CFAE;
}

.sender-info {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 70px;
}

.sender-info > div {
  display: flex;
  align-items: center;
}

.sender-info img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.sender-name {
  font-size: 30px;
  color: #444C52;
  margin: 0 20px;
}

.sender-text {
  color: #ABB3BA;
  font-size: 30px;
}

.gift-detail {
  width: 570px;
  height: 140px;
  margin: 70px auto 30px;
  padding: 0 20px;
  display: flex;
  background: #F4F6F9;
  align-items: center;
}

.gift-detail img {
  height: 104px;
  width: 104px;
  margin-right: 20px;
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

.course-price {
  text-align: center;
  font-size: 28px;
}

.course-price span:nth-child(2) {
  color: #FF7D8C;
  font-size: 42px;
  font-weight: 600;
  margin-left: 20px;
}

.get-course-btn {
  width: 440px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background: #FF7D8C;
  border-radius: 8px;
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
  margin: 60px auto 20px;
}

.get-limit {
  text-align: center;
  color: #FF7D8C;
  font-size: 20px;
}









</style>
