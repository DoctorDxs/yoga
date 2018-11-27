<template>
  <div class="course-top-comp">
    <div class="course-top-cover">
      <div class="course-cover"><img :src="detail.goods_cover" alt=""></div>
      <div class="course-comp-btn">
        <img src="../assets/class_collect_nor@3x.png" alt="" v-if='detail.is_collection == 0' @click="collect(detail.id)">
        <img src="../assets/class_collect_pre@3x.png" alt="" v-if='detail.is_collection == 1' @click="cancleCollect(detail.id)">
        <img src="../assets/class_gift@3x.png" alt="" @click="snedBtn">
      </div>
    </div>

    <div class="send-modal-bg" v-if="showSendModal" @click="hideSendModal">
      <div class="send-modal-box">
        <div class="send-modal">
          <div class="course-info">
            <img :src="detail.goods_cover" alt="">
            <div class='course-desc'>
              <div>{{detail.name}}</div>
              <div>{{type == 1 ? '训练营' : '课程'}}</div>
            </div>
          </div>
          <div class="send-title">赠与伽人 共同成长</div>
          <div class="send-studep"><span>1</span><span>购买后，分享给好友赠送</span></div>
          <div class="send-studep"><span>2</span><span>好友点击链接，领取后即可免费学习</span></div>
          <div class="send-studep"><span>3</span><span>在我的赠送中，查看领取情况</span></div>
        </div>
        <div class="send-buy-btn">
            <div>实付 <span>￥{{detail.price}}</span></div>
            <div @click="buyNow">立即支付</div>
          </div>
      </div>
    </div>

    <div class="send-page" v-if='showShareSendModal'>
      <div class="gift-send-box">
        <img src="../assets/class_gift_bg01@3x.png" alt="" class="bg-middle">
        <img src="../assets/class_gift_bg02@3x.png" alt="" class="bg-bottom">
        <div class="content-box">
          <div class="sender-info"><div><img src="../assets/class_gift_zhifu_icon@3x.png" alt=""></div></div>
          <div class='pay-success'>支付成功</div>
          <div class="gift-detail">
            <img :src="detail.goods_cover" alt="">
            <div class="course-desc">
              <div>{{detail.name}}</div>
              <div>课程</div>
            </div>
          </div>
          <div class="course-price"><span>价值</span><span>￥{{detail.price}}</span></div>

          <div class="get-course-btn" @click.stop="sendFriends">赠送好友</div>
          
        </div>
      </div>
    </div>
    <modal 
      title="提示" 
      :content='modalContent'
      :showCancle='showCancle' 
      @on-confirm='confirm'
      v-show='showModal'>
    </modal>
  </div> 
</template>

<script>
import { collectCourse, cancleCollect, getSign, sendCourse, getShareInfo } from '../fetch/api'
import trendListVue from './trendList.vue';
export default {
  name: 'courseTop',
  data () {
    return {
      showSendModal: false,
      showShareSendModal: false,
      shareInfo: {},
      showCancle: false,
      modalContent: '请点击窗口右上角发送到好友或朋友圈来赠送给好友',
      showModal: false  
    }
  },
  created() {
  },

  methods: {
    getShareInfo(params) {
      this.showShareSendModal = true
      setTimeout(() => {
        getShareInfo(params).then(res => {
          if (res.state == 200) {
            this.shareInfo = res.data
            this.setConfig()
          }
       }) 
      }, 1500)
      
    },

    // 普通分享
    commonShare(detail) {
      this.detail = detail
    },
    snedBtn() {
      this.showSendModal = true
    },
    hideSendModal() {
      this.showSendModal = false
    },
    collect(id) {
      let userInfo = localStorage.getItem("userInfo")
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
      };
      if (userInfo.mobile) {
        collectCourse(id).then(res => {
          if (res.state == 200) {
            this.$toast.top(res.msg)
            this.detail.is_collection = 1
          } else {
            this.$toast.top(res.msg)
          }
        })
      } else {
        this.$router.push({name: 'bindTel'})
      }
    },
    cancleCollect(id) {
      let userInfo = localStorage.getItem("userInfo")
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
      };
      if (userInfo.mobile) {
        cancleCollect(id).then(res => {
          if (res.state == 200) {
            this.$toast.top(res.msg)
            this.detail.is_collection = 0
          } else {
            this.$toast.top(res.msg)
          }
        })
      } else {
        this.$router.push({name: 'bindTel'})
      }
    },
    buyNow() {
      console.log(this.detail)
      let params;
      if (this.detail.type == '2') {
        params = {
          group_id: this.detail.id,
          is_web: 1
        }
      } else {
        params = {
          phase_id: this.detail.now_phase_id,
          group_id: this.detail.id,
          is_web: 1
        }
      }
      sendCourse(params).then(res => {
         if (res.state == 200) {
            this.payConfig = res.data
            this.wxPay()
          } else {
            this.$toast.top(res.msg)
          }
      })
    },


    setConfig(params) {
      let shareInfo = this.shareInfo
      const that = this
      // 分享到盆友圈
        wx.onMenuShareTimeline({
          title: shareInfo.title,
          link: shareInfo.url,
          imgUrl: shareInfo.cover,
          success: function(res) {
            that.$toast.top('分享成功！')
          },
        })
      //分享给朋友
        wx.onMenuShareAppMessage({
          title: shareInfo.title,
          desc: shareInfo.desc,
          link: shareInfo.url,
          imgUrl: shareInfo.cover,
          success: function() {
            that.$toast.top('分享成功！')
          }
        })
    },

    wxPay() {
      const that = this
      const payConfig = this.payConfig
      wx.ready(function(){
        wx.chooseWXPay({
          timestamp: payConfig.pay.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: payConfig.pay.nonceStr, // 支付签名随机串，不长于 32 位
          package: payConfig.pay.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: payConfig.pay.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: payConfig.pay.sign, // 支付签名
          success: function(res) {
            that.getShareInfo({id: payConfig.giving_id, type: 3})
          },
          fail:function(res){
          }
        })
      })
    },

    giftShare(giving_id) {
      this.getShareInfo({id: giving_id, type: 3})
    },


    sendFriends() {
      this.showModal = true
    },
    confirm() {
      this.showModal = false
      this.showShareSendModal = false
    }
    
    
  },
  props: {
    detail: {
      type: Object,
      required: true
    }
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.course-top-cover {
  width: 750px;
  height: 422px;
  position: relative;
}

.course-cover {
  width: 100%;
  height: 100%;
}

.course-cover img{
  width: 100%;
  height: 100%;
}

.course-comp-btn {
  position: absolute;
  display: flex;
  top: 20px;
  right: 0;
}

.course-comp-btn img {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}

.send-modal-bg {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, .5);
  z-index: 5;
  top: 0;
}

.send-modal-box {
  position: absolute;
  bottom: 0;
  height: 640px;
  background: #fff;
  width: 100%;
}

.send-modal {
  padding: 30px 30px 0;
}

.course-info {
  height: 144px;
  background: #F4F6F9;
  display: flex;
  align-items: center;
  padding: 0 20px;
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

.send-title {
  font-size: 40px;
  color: #444D52;
  margin: 60px 0 40px;
}

.send-studep {
  display: flex;
  align-items: center;
  margin-top: 28px;
}

.send-studep span:nth-child(1) {
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  background: #B78FDA;
  font-size: 20px;
  margin-right: 20px;
}

.send-studep span:nth-child(2) {
  font-size: 28px;
  color: #818C92;
}

.send-buy-btn {
  position: absolute;
  bottom: 0;
  height: 100px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  width: 100%;
  text-align: center;
  line-height: 100px;
}

.send-buy-btn > div {
  width: 100%;
}

.send-buy-btn > div:nth-child(1) {
  font-size: 32px;
}

.send-buy-btn > div:nth-child(1) span {
  font-size: 32px;
  color: #FF7D8C;
}

.send-buy-btn > div:nth-child(2) {
  background: #B78FDA;
  color: #fff;
  font-size: 36px;
  font-weight: 600;
}




.send-page {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, .5);
  z-index: 5;
  top: 0;
}

.gift-send-box {
  position: absolute;
  width: 100%;
  height: 1050px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
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

.gift-detail {
  width: 570px;
  height: 140px;
  margin: 40px auto 30px;
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

.pay-success {
  font-size: 32px;
  color: #444C52;
  text-align: center;
  margin-top: 40px;
}

</style>
