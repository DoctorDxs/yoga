<template>
  <div class="send-page">
    <div class="gift-send-box">
      <img src="../assets/class_gift_bg01@3x.png" alt="" class="bg-middle">
      <img src="../assets/class_gift_bg02@3x.png" alt="" class="bg-bottom">
      <div class="content-box">
        <div class="sender-info"><div><img :src="sendDetail.user_avatar" alt="">
          <span class='sender-name'>{{sendDetail.username}}</span><span class="sender-text">赠送给你</span></div></div>
        <div class="gift-detail">
          <img :src="sendDetail.group_cover" alt="">
          <div class="course-desc">
            <div>{{sendDetail.group_name}}</div>
            <div>{{sendDetail.group_type}}</div>
          </div>
        </div>
        <div class="course-price"><span>价值</span><span>￥{{sendDetail.price}}</span></div>

        <div class="get-course-btn" @click="receiveNow" v-if='sendDetail.is_received == "0"'>立即领取</div>
        <div class="get-course-btn" @click="lookDetail" v-if='sendDetail.is_received == "1"'>已领取，查看详情</div>
        <div class="get-limit" v-if='sendDetail.limit_time'>请在{{sendDetail.limit_time}} 前领取</div>
      </div>
    </div>
    <modal 
      title="提示" 
      content='自己不能领取自己的赠品，快让您的好友领取吧！'
      :showCancle='showCancle' 
      @on-confirm='confirm'
      v-show='showModal'>
    </modal>
  </div>
     
</template>

<script>
import { getSendInfo } from '../fetch/api.js'
export default {
  name: 'sendPage',
  data () {
    return {
      sendDetail: {},
      showModal: false,
      showCancle: false,
      id: ''
    }
  },
  activated() {
    document.title = '赠送';
    let url = location.href
    let Id = url.split('id')[1].split('=')[1]
    this.id = Id
    this.getData()
  },
  mounted() {
    document.getElementsByClassName('send-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    getData() {
      getSendInfo(this.id).then(res => {
        if (res.state == 200) {
          this.sendDetail = res.data
        } else {
          this.$toast.top(res.msg)
        }
      })
    },
    receiveNow() {
      // if (this.sendDetail.is_mine == '1') {
      //   this.showModal = true
      // } else {
        this.$router.push({
          name: 'receive',query: {id: this.id, group_name: this.sendDetail.group_name, group_type: this.sendDetail.group_type, goods_cover: this.sendDetail.goods_cover}
        })
      // }
      
    },

    lookDetail() {
      this.$router.push({
        name: 'giftRecord'
      })
    },
    confirm() {
      this.showModal = false
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
