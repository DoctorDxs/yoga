<template>
  <div class="giftRecord-page">
    <div class="gift-tab-bars">
      <div class="gift-tab-item">
        <div @click="Sent" :class="showSent ? 'active-tabbar' : ''">
          <div>送出</div>
          <div :class="showSent ? 'active-bottom' : 'hr-line-bottom'"></div>
        </div>
        <div @click="Received" :class="!showSent ? 'active-tabbar' : ''">
          <div>收到</div>
          <div :class="!showSent ? 'active-bottom' : 'hr-line-bottom'"></div>
        </div>
      </div>
    </div>


    <div class="gift-sent" v-if='showSent'>
      <div v-for='(item, index) in [1,2,3]' :key='index' class="gift-item">
        <div class='sender-avatar'><img src="http://tx.haiqq.com/uploads/allimg/150402/16094151D-13.jpg" alt=""></div>
        <div class="sender-detail">
          <div class="sender-info">
            <div class="send-time">
              <div>魏璎珞</div>
              <div>1小时前·赠送</div>
            </div>
            <div class="send-btn">未送出继续送</div>
          </div>
          <div class="course-info">
            <img src="http://tx.haiqq.com/uploads/allimg/150402/16094151D-13.jpg" alt="">
            <div class='course-desc'>
              <div>21天瑜伽瘦身课</div>
              <div>课程</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="gift-received" v-if='!showSent'>
      <div v-for='(item, index) in [1,2,3]' :key='index' class="gift-item">
        <div class='sender-avatar'><img src="http://tx.haiqq.com/uploads/allimg/150402/16094151D-13.jpg" alt=""></div>
        <div class="sender-detail">
          <div class="sender-info">
            <div class="send-time">
              <div>魏璎珞</div>
              <div>1小时前·赠送</div>
            </div>
            <!-- <div class="send-btn">未送出继续送</div> -->
          </div>
          <div class="course-info">
            <img src="http://tx.haiqq.com/uploads/allimg/150402/16094151D-13.jpg" alt="">
            <div class='course-desc'>
              <div>21天瑜伽瘦身课</div>
              <div>课程</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
     
</template>

<script>

export default {
  name: 'giftRecord',
  data () {
    return {
      showSent: true
    }
  },
  created() {
    document.title = '赠送记录';
  },
  mounted() {
    document.getElementsByClassName('giftRecord-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    Sent() {
      this.showSent = true
    },
    Received() {
      this.showSent = false
    }
  },
  components: {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.giftRecord-page {
  background: #F0F2F7;
}

.gift-tab-bars {
  height: 80px;
  background: #fff;
}

.gift-tab-item {
  width: 480px;
  height: 80px;
  line-height: 80px;
  margin: auto;
  font-size: 32px;
  color: rgba(68,76,82,.3);
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hr-line-bottom {
  width: 46px;
  height: 6px;
  border-radius: 3px;
  background: #fff;
  margin-top: -6px;
}

.gift-tab-bars .active-tabbar {
  color: rgba(68,76,82,1);
}

.gift-tab-bars .active-bottom {
  background: #B78FDA;
   width: 46px;
  height: 6px;
  border-radius: 3px;
  margin-top: -6px;
}

.gift-sent, .gift-received {
  margin-top: 20px;
}

.sender-detail {
  width: 614px;
}

.gift-item {
  padding: 40px 20px;
  background: #fff;
  border-bottom: 1px solid #F4F6F9;
  display: flex;
  justify-content: space-between;
}

.sender-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.sender-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.sender-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.send-time > div:nth-child(1) {
  font-size: 30px;
  color: #444C52;
}

.send-time > div:nth-child(2) {
  font-size: 22px;
  color: #ABB3BA;
}

.send-btn {
  width: 200px;
  height: 46px;
  line-height: 47px;
  border: 1px solid #FF7D8C;
  text-align: center;
  font-size: 24px;
  color: #FF7D8C;
}

.course-info {
  height: 144px;
  background: #F4F6F9;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-top: 26px;
}

.course-info img {
  width: 104px;
  height: 104px;
  background: #E1E2E4;
  margin-right: 20px;
}

.course-desc > div:nth-child(1) {
  font-size: 28px;
  color: #444C52;
}

.course-desc > div:nth-child(2) {
  font-size: 20px;
  color: #808C92;
}



</style>
