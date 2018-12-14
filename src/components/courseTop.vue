<template>
  <div class="course-top-comp">
    <div class="course-top-cover">
      <div class="course-cover"><img :src="details.goods_cover" alt="" style="width: 100%;"></div>
      <div class="course-comp-btn">
        <img src="../assets/class_collect_nor@3x.png" alt="" v-if='details.is_collection == 0' @click="collect(details.id)">
        <img src="../assets/class_collect_pre@3x.png" alt="" v-if='details.is_collection == 1' @click="cancleCollect(details.id)">
        <img src="../assets/class_gift@3x.png" alt="" @click="snedBtn">
      </div>
    </div>

    <div class="send-modal-bg" v-if="showSendModal" @click="hideSendModal">
      <div class="send-modal-box">
        <div class="send-modal">
          <div class="course-info">
            <img :src="details.goods_cover" alt="">
            <div class='course-desc'>
              <div>{{details.name}}</div>
              <div>{{type == 1 ? '训练营' : '课程'}}</div>
            </div>
          </div>
          <div class="send-title">赠与伽人 共同成长</div>
          <div class="send-studep"><span>1</span><span>购买后，分享给好友赠送</span></div>
          <div class="send-studep"><span>2</span><span>好友点击链接，领取后即可免费学习</span></div>
          <div class="send-studep"><span>3</span><span>在我的赠送中，查看领取情况</span></div>
        </div>
        <div class="send-buy-btn">
          <div>实付 <span>￥{{details.price}}</span></div>
          <div @click.stop="buyNow">立即支付</div>
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
          <div class="gift-details">
            <img :src="details.goods_cover" alt="">
            <div class="course-desc">
              <div>{{details.name}}</div>
              <div>课程</div>
            </div>
          </div>
          <div class="course-price"><span>价值</span><span>￥{{details.price}}</span></div>

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

    <div class="buy-modal-bg" @click="hidePayModal" v-show="paymodal">
      <div class="buy-modal-box" @click.stop="stopFather">
        <div class="buy-modal-title" @click.stop="hidePayModal">
          <img :src="details.goods_cover" alt="" class="modal-goods-cover">
          <div class="buy-modal-course">
            <div class="buy-modal-name">{{details.name}}</div>
            <div class="buy-modal-price">￥{{details.price}}</div>
          </div>
        </div>
        <div class="modal-hr"></div>
        <div class="discount-select-title"><span class="modal-hr-line"></span>折扣</div>
        <!-- 普通用户 -->
        <div class="select1 select-commen" v-if='userInfo.status == 0' @click="selectThis(1)">
          <div :style="dis ? 'color:rgba(171,179,186,1);': ''">暂无可用折扣</div>
          <div><img src="../assets/class_select_pre@3x.png" alt="" class="select-icon"></div>
        </div>
        <div class="select2 select-commen" v-if='userInfo.status == 0 && details.vip_discount != 100' @click="selectThis(2)">
          <div class="vip-descount" >
            <span :style="!dis ? 'color:rgba(171,179,186,1);': ''">{{details.type == 1 ? '私教' : ''}}会员{{details.vip_discount != 0 ? details.vip_discount/10 + '折' : '免费'}}</span>
            <div class="vip-descount-icon"  @click.stop="linkBevip"><img src="../assets/class_zhekoubg@3x.png" alt=""><span>成为会员享受专属折扣</span></div>
          </div>
          <div><img src="../assets/class_select_nor@3x.png" alt="" class="select-icon"></div>
        </div>

        <!-- 普通会员 -->
        <div class="select1 select-commen" v-if='userInfo.status == 1' @click="selectThis(1)">

          <div :style="dis ? 'color:rgba(171,179,186,1);': ''">{{details.type == 1 ? "暂无可用折扣" : details.vip_discount == 100 ? '暂无可用折扣' : '不使用折扣'}}</div>
          <div><img src="../assets/class_select_nor@3x.png" alt="" class="select-icon" v-if='dis'><img src="../assets/class_select_pre@3x.png" alt="" class="select-icon" v-if='!dis'></div>
        </div>
        <div class="select2 select-commen" v-if='userInfo.status == 1 && details.vip_discount != 100' @click="selectThis(2)">
          <div class="vip-descount">
            <span :style="!dis ? 'color:rgba(171,179,186,1);' : ''">{{details.type == 1 ? '私教' : ''}}会员{{details.vip_discount != 0 ? details.vip_discount/10 + '折' : '免费'}}</span>
            <div class="vip-descount-icon" v-if='details.type == 1' @click.stop="linkBevip"><img src="../assets/class_zhekoubg@3x.png" alt=""><span>成为会员享受专属折扣</span></div>
          </div>
          <div><img src="../assets/class_select_nor@3x.png" alt="" class="select-icon" v-if='!dis'><img src="../assets/class_select_pre@3x.png" alt="" class="select-icon" v-if='dis'></div>
        </div>



        <!-- 私教会员 -->
        <div class="select1 select-commen" v-if='userInfo.status == 2' @click="selectThis(1)">
          <div :style="dis ? 'color:rgba(171,179,186,1);': ''">{{details.vip_discount == 100 ? "暂无可用折扣" : "不使用折扣"}}</div>
          <div><img src="../assets/class_select_nor@3x.png" alt="" class="select-icon" v-if='dis'><img src="../assets/class_select_pre@3x.png" alt="" class="select-icon" v-if='!dis'></div>
        </div>
        <div class="select2 select-commen" v-if='userInfo.status == 2 && details.vip_discount != 100' @click="selectThis(2)">
          <div class="vip-descount">
            <span :style="!dis ? 'color:rgba(171,179,186,1);': ''">{{details.type == 1 ? '私教' : ''}}会员{{details.vip_discount != 0 ? details.vip_discount/10 + '折' : '免费'}}</span>
          </div>
          <div><img src="../assets/class_select_nor@3x.png" alt="" class="select-icon" v-if='!dis'><img src="../assets/class_select_pre@3x.png" alt="" class="select-icon" v-if='dis'></div>
        </div>


       
        <div class="modal-hr"></div>
        <div class="discount-select-title"><span class="modal-hr-line"></span>付款方式</div>
        <div class="select-commen">
          <div>微信支付</div>
          <div><img src="../assets/class_select_pre@3x.png" alt="" class="select-icon"></div>
        </div>
        <div class="pay-tips" @click="hidePayModal">
          <div class="pay-tips-title">温馨提示：</div>
          <div class="pay-tips-text">虚拟商品不支持退款、转让、退换，请斟酌确认。已支付的订单可以在“首页”中点击“练习”查看。</div>
        </div>
      </div>
      <div class="pay-btn" @click.stop="stopFather">
        <div>
          <span>实付</span>
          <span class="real-pay">￥{{relPrice}}</span>
          <span class="orgin-pay" v-if='dis'>￥{{details.price}}</span>
        </div>
        <div @click.stop="submitOrder">立即支付</div>
      </div>
    </div>
  </div> 
</template>

<script>
import { collectCourse, cancleCollect, getSign, sendCourse, getShareInfo, buyCourse } from '../fetch/api'
export default {
  name: 'courseTop',
  data () {
    return {
      showSendModal: false,
      showShareSendModal: false,
      shareInfo: {},
      showCancle: false,
      modalContent: '请点击窗口右上角发送到好友或朋友圈来赠送给好友',
      showModal: false,
      paymodal: false,
      dis: false,
      relPrice: 0,
      userInfo: {}
    }
  },
  activated() {
    this.dis = false
    this.paymodal = false
    let userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      this.userInfo = userInfo
    };
  },

  methods: {
    hidePayModal() {
      this.paymodal = false
    },
    showPayModal() {
      this.paymodal = true
    },
    submitOrder() {
      this.payForCourse()
      this.paymodal = false
    },
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
    stopFather() {
      return false
    },

    selectThis(params) {
      if (this.userInfo.status == 0) {
        this.relPrice = this.details.price
        if (this.details.type == 1) {
          alert('您还不是私教会员，不能享受私教会员折扣')
        } else {
          alert('您还不是会员，不能享受会员折扣')
        }
      } else if (this.userInfo.status == 1) {
        if (this.details.type == 1) {
          alert('您还不是私教会员，不能享受私教会员折扣')
        } else {
          if (params == 1) {
            this.relPrice = this.details.price
            this.dis = false
          } else {
            this.relPrice = this.details.vip_price
            this.dis = true
          }
        }
      } else if (this.userInfo.status == 2) {
        if (params == 1) {
          this.relPrice = this.details.price
          this.dis = false
        } else {
          this.relPrice = this.details.vip_price
          this.dis = true
        }
      }
    },

    payForCourse() {
      let params = {
        group_id: this.details.id,
        is_web: 1
      }
      if (this.details.type == 1) {
        params.phase_id = this.details.now_phase_id
      };
      if (this.dis) {
        params.is_vip_discount = 1
      } else {
        params.is_vip_discount = 0
      }
      buyCourse(params).then(res => {
        if (res.state == 200) {
          if (this.relPrice == 0) {
            this.$emit('getdetails', this.details.id)
          } else {
            this.submitPay(res.data, false)
          }
        } else {
          this.$toast.top(res.msg)
        }
      })
    },

    submitPay(payConfig, type) {
      let that = this
      wx.ready(function(){
        wx.chooseWXPay({
          debug: false,
          timestamp: payConfig.pay.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: payConfig.pay.nonceStr, // 支付签名随机串，不长于 32 位
          package: payConfig.pay.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: payConfig.pay.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: payConfig.pay.sign, // 支付签名
          success: function(res) {
            
            if (type) {
              that.getShareInfo({id: payConfig.giving_id, type: 3})
              that.showSendModal = false
            } else {
              that.paymodal = false
              that.$emit('showconsult', 1)
              that.$emit('getdetails', that.details.id)
            }
            
          },
          fail:function(res){
          }
        })
      })
    },
    linkBevip() {
      this.$router.push({
        name: 'beVip'
      })
    },
    // 普通分享
    commonShare(details) {
      this.details = details
      this.relPrice = details.price
    },
    snedBtn() {
      if (this.userInfo.mobile) {
        if (this.details.price == 0) {
          alert('免费课程不能赠送')
        } else {
          this.showSendModal = true
        }
      } else {
        this.$router.push({name: 'bindTel'})
      }
      
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
            this.details.is_collection = 1
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
            this.details.is_collection = 0
          } else {
            this.$toast.top(res.msg)
          }
        })
      } else {
        this.$router.push({name: 'bindTel'})
      }
    },
    buyNow() {
      let params;
      if (this.details.type == '2') {
        params = {
          group_id: this.details.id,
          is_web: 1
        }
      } else {
        params = {
          phase_id: this.details.now_phase_id,
          group_id: this.details.id,
          is_web: 1
        }
      }
      sendCourse(params).then(res => {
         if (res.state == 200) {
            this.payConfig = res.data
            this.submitPay(res.data, true)
          } else {
            this.$toast.top(res.msg)
          }
      })
    },


    setConfig(params) {
      let shareInfo = this.shareInfo
      const that = this
      // 分享到盆友圈
      alert(shareInfo.url)
        wx.onMenuShareTimeline({
          title: shareInfo.title,
          link: shareInfo.url,
          imgUrl: shareInfo.cover,
          success: function(res) {
          },
        })
      //分享给朋友
        wx.onMenuShareAppMessage({
          title: shareInfo.title,
          desc: shareInfo.desc,
          link: shareInfo.url,
          imgUrl: shareInfo.cover,
          success: function() {
          }
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
    details: {
      type: Object,
      required: true,
    }
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy-modal-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 99999991;
  top: 0;
}

.buy-modal-box {
  position: absolute;
  height: 1080px;
  width: 100%;
  border-radius: 10px 10px 0 0;
  background:rgba(244,246,249,1);
  bottom: 0;
}

.buy-modal-title {
  height: 180px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  background: #fff;
}


.modal-goods-cover {
  width: 240px;
  height: 120px;
  margin-right: 32px;
  flex-shrink: 0;
}

.buy-modal-course {
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 400px;
}

.buy-modal-name {
  font-weight:bold;
  color:rgba(68,76,82,1);
  font-size:32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.buy-modal-price {
  font-weight:500;
  color:rgba(255,125,140,1);
  font-size:32px;
}

.modal-hr {
  height: 20px;
  background:rgba(244,246,249,1);
}

.discount-select-title {
  height:100px;
  display: flex;
  align-items: center;
  font-weight:bold;
  font-size:32px;
  color:rgba(68,76,82,1);
  padding: 0 30px;
  background: #fff;
}

.modal-hr-line {
  width:8px;
  height:38px;
  background:rgba(183,143,218,1);
  border-radius: 4px;
  margin-right: 17px;
}

.select-commen {
  height: 100px;
  border-top: 1px solid rgba(228,234,241,1);
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size:30px;
  font-weight:500;
  color:rgba(68,76,82,1);
  background:#fff;
}

.vip-descount {
  display: flex;
  align-items: center;
}

.vip-descount-icon {
  position: relative;
  margin-left: 18px;
  width:370px;
  height:66px;
}

.vip-descount-icon img {
  width:370px;
  height:66px;
  border-radius: 4px;
}

.vip-descount-icon span {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  color: #fff;
  font-size: 32px;
  text-align: center;
  line-height: 66px;
}

.select-icon {
  height: 44px;
}

.pay-tips-title {
  font-size:26px;
  font-weight:bold;
  color:rgba(68,76,82,1);
  margin-top: 20px;
  padding: 0 30px;
}

.pay-tips-text {
  font-size:24px;
  font-weight:500;
  color:rgba(127,140,146,1);
  margin-top: 16px;
  padding: 0 30px;
}

.pay-btn {
  position: absolute;
  height: 100px;
  width: 100%;
  background: #fff;
  bottom: 0;
  left: 0;
  display: flex;
  text-align: center;
  line-height: 100px;
}

.pay-btn > div:nth-child(1) {
  font-size: 34px;
}

.real-pay {
  font-size: 32px;
  color: #FF7D8C;
  margin: 0 10px 0 20px;
}

.orgin-pay {
  font-size: 28px;
  text-decoration: line-through;
}

.pay-btn > div:nth-child(1) {
  width: 454px;
}


.pay-btn > div:nth-child(2) {
  width: 300px;
  background: #B78FDA;
  color: #fff;
  font-size: 36px;
  font-weight: 600;
}















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

.gift-details {
  width: 570px;
  height: 140px;
  margin: 40px auto 30px;
  padding: 0 20px;
  display: flex;
  background: #F4F6F9;
  align-items: center;
}

.gift-details img {
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
