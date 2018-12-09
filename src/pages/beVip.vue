<template>
  <div class="beVip-page">
    <div class="vip-tabbar" >
      <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div @click="selectType(2)" :class="svip? 'avtive-tab' : ''"><div>私教尊贵会员</div><div class="recommend-box"><span>推荐</span></div></div>
      <div></div>
      <div @click="selectType(1)" :class="svip? '' : 'avtive-tab'">会员</div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
    </div>

    <div v-if='svip'>
      <div class="svip-box-title">
        <div class="svip-bg">
          <img src="../assets/vip_txtbg@3x.png" alt="">
          <div>私教尊贵会员权益</div>
        </div>
      </div>

      <div class="svip-item">
        <div class="svip-icon"><img src="../assets/vip_icon01@3x.png" alt=""></div>
        <div class="svip-info">
          <div class="svip-desc">免费观看</div>
          <div class="svip-subdesc">之前购买过的训练营免费观看</div>
        </div>
      </div>
      <div class="svip-item">
        <div class="svip-icon"><img src="../assets/vip_icon02@3x.png" alt=""></div>
        <div class="svip-info">
          <div class="svip-desc">折扣购买</div>
          <div class="svip-subdesc">新的训练营折扣购买</div>
        </div>
      </div>
      <div class="svip-item">
        <div class="svip-icon"><img src="../assets/vip_icon03@3x.png" alt=""></div>
        <div class="svip-info">
          <div class="svip-desc">私教尊贵会员</div>
          <div class="svip-subdesc">点亮私教尊贵会员标识</div>
        </div>
      </div>

      <div class="svip-box-title martop20">
        <div class="svip-bg">
          <img src="../assets/vip_txtbg@3x.png" alt="">
          <div>同时尊享会员权益</div>
        </div>
      </div>
      <div class="svip-item">
        <div class="svip-icon"><img src="../assets/vip_icon04@3x.png" alt=""></div>
        <div class="svip-info">
          <div class="svip-desc">课程优惠</div>
          <div class="svip-subdesc">课程免费观看/折扣购买</div>
        </div>
      </div>
      <div class="vip-limit-time" v-if='userInfo.vip_ended_at && userInfo.status == 2'>你的私教会员{{userInfo.vip_ended_at | limitTime}}到期</div>
      <div class="svip-bottom">
        <div class="select-drop" @click="showSvpiSelectModal">
          <div class="select-type">
            <div class="new-price">￥{{selectsPrice ? selectsPrice : svipInfo.price_year_discount}}</div>
            <div class="old-price" v-if='selectsPrice && selectOldsPrice'>￥{{selectOldsPrice ? selectOldsPrice : svipInfo.price_year}}</div>
          </div>
          <div class="select-type-time">{{svipType == 1 ? '月付' : svipType == 2 ? '半年付' : svipType == 3 ? '年付' : ''}}</div>
          <div class="drap-icon">
            <img src="../assets/vip_select@3x.png" alt="" :style="showSvpiSelect ? 'transform: rotate(180deg)' : ''">
          </div>
        </div>
        
        <div class="confirm-btn" @click="beSvip">开通私教尊贵会员</div>
      </div>
    </div>
    
    <div class="vip-box martop20" v-if='!svip'>
      <div class="svip-item">
        <div class="svip-icon"><img src="../assets/vip_icon04@3x.png" alt=""></div>
        <div class="svip-info">
          <div class="svip-desc">课程优惠</div>
          <div class="svip-subdesc">课程免费观看/折扣购买</div>
        </div>
      </div>
      <div class="svip-item">
        <div class="svip-icon"><img src="../assets/vip_icon05@3x.png" alt=""></div>
        <div class="svip-info">
          <div class="svip-desc">会员</div>
          <div class="svip-subdesc">点亮会员标识</div>
        </div>
      </div>
      <div class="vip-limit-time" v-if='userInfo.vip_ended_at && userInfo.status == 1'>你的会员{{userInfo.vip_ended_at | limitTime}}到期</div>
      <div class="svip-bottom">
        <div class="select-drop" @click="showVpiSelectModal">
          <div class="select-type">
            <div class="new-price">￥{{selectPrice ? selectPrice : vipInfo.price_year_discount}}</div>
            <div class="old-price" v-if='selectPrice && selectOldPrice'>￥{{selectOldPrice ? selectOldPrice : vipInfo.price_year}}</div>
          </div>
          <div class="select-type-time">{{vipType == 1 ? '月付' : vipType === 2 ? '半年付' : '年付'}}</div>
          <div class="drap-icon">
            <img src="../assets/vip_select@3x.png" alt="" :style="showVpiSelect ? 'transform: rotate(180deg)' : ''">
          </div>
        </div>
        <div class="confirm-btn" @click="beCommonVip">开通会员</div>
      </div>
    </div>


    <div class="modal-bg" v-if='showSvpiSelect && svip' @click="hideSvpiSelectModal">
      <div class="select-item-box" @click.stop="stopFather">
        <div class="select-items2" @click="selectThis(2,'', svipInfo.upgrade_p_vip_price, '', true)" v-if='svipInfo.upgrade_p_vip_desc'>
          <div>
            <div class="title-sec">升为私教尊贵会员</div>  
            <div class="upgrade-desc">{{svipInfo.upgrade_p_vip_desc}}</div>
          </div>
          <div class="new-price">￥{{svipInfo.upgrade_p_vip_price}}</div>
        </div>
        <div class="select-items" @click.stop="selectThis(2,1, svipInfo.price_month, '', false)" v-if='userInfo.status != 1'>
          <div>月付</div>
          <div class="new-price">￥{{svipInfo.price_month}}</div>
        </div>
        <div class="select-items" @click.stop="selectThis(2,2, svipInfo.price_half_year, '', false)" v-if='userInfo.status != 1'>
          <div>半年付</div>
          <div class="new-price">￥{{svipInfo.price_half_year}}</div>
        </div>
        <div class="select-items" @click.stop="selectThis(2,3, svipInfo.price_year_discount, svipInfo.price_year, false)" v-if='userInfo.status != 1'>
          <div class="year-icon">
            <div>年付</div> 
            <div class="limit-time-cout"><span>限时折扣</span></div> 
          </div>
          <div><span class="old-price">￥{{svipInfo.price_year}}</span> <span class="new-price">￥{{svipInfo.price_year_discount}}</span></div>
        </div>
      </div>
    </div>


    <div class="modal-bg" v-if='showVpiSelect && !svip' @click="hideVpiSelectModal">
      <div class="select-item-box" @click.stop="stopFather">
        <div class="select-items" @click="selectThis(1,1,vipInfo.price_month, '', false)">
          <div>月付</div>
          <div class="new-price">￥{{vipInfo.price_month}}</div>
        </div>
        <div class="select-items" @click="selectThis(1,2,vipInfo.price_half_year, '', false)">
          <div>半年付</div>
          <div class="new-price">￥{{vipInfo.price_half_year}}</div>
        </div>
        <div class="select-items" @click="selectThis(1,3, vipInfo.price_year_discount, vipInfo.price_year, false)">
          <div class="year-icon">
            <div>年付</div> 
            <div class="limit-time-cout"><span>限时折扣</span></div> 
          </div>
          <div><span class="old-price">￥{{vipInfo.price_year}}</span> <span class="new-price">￥{{vipInfo.price_year_discount}}</span></div>
        </div>
      </div>
    </div>
  </div>
     
</template>

<script>
import { getVip, buyVip, getSign, getUser} from '../fetch/api'
export default {
  name: 'beVip',
  data () {
    return {
      svip: true,
      showSvpiSelect: false,
      showVpiSelect: false,
      vipInfo: {},
      svipInfo: {},
      selectPrice: '',
      selectOldPrice: '',
      selectsPrice: '',
      selectOldsPrice: '',
      svipType: 3,
      vipType: 3,
      toSvip: false,
      payConfig: {},
      userInfo: {}
    }
  },
  activated() {
    document.title = '会员';
    let userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
    };
    this.userInfo = userInfo
    this.getVip(2)
  },
  mounted() {
    document.getElementsByClassName('beVip-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    selectType(type) {
      if (type ==1 ) {
        this.svip = false
        this.getVip(1)
      } else if (type == 2) {
        this.svip = true
        this.getVip(2)
      }
    },
    showSvpiSelectModal() {
      this.showSvpiSelect = !this.showSvpiSelect
    },
    hideSvpiSelectModal() {
      this.showSvpiSelect  = false
    },
    showVpiSelectModal() {
      this.showVpiSelect = !this.showVpiSelect
    },
    hideVpiSelectModal() {
      this.showVpiSelect  = false
    },
    selectThis(type,priceType, price, oldPrice, toSvip) {
      this.showSvpiSelect  = false
      this.showVpiSelect  = false
      this.toSvip = toSvip
      if (type == 1) {
        this.selectPrice = price
        this.selectOldPrice = oldPrice
        this.vipType = priceType
      } else {
        this.selectsPrice = price
        this.selectOldsPrice = oldPrice
        this.svipType = priceType
      }
    },
    stopFather() {
      return false
    },
    getVip(type) {
      getVip(type).then(res => {
        if (res.state == 200) {
          if (type == 1) {
            this.vipInfo = res.data
            this.selectPrice = res.data.price_year_discount
            this.selectOldPrice = res.data.price_year
          } else {
            if (this.userInfo.status == 1 ) {
              this.svipInfo = res.data
              this.selectsPrice = res.data.upgrade_p_vip_price
              this.selectOldsPrice = 0
              this.svipType = 0
              this.toSvip = true
            } else {
              this.svipInfo = res.data
              this.selectsPrice = res.data.price_year_discount
              this.selectOldsPrice = res.data.price_year
            }
            
          }
        }
      })
    },
    beSvip() {
      let params;
      // 购买私教
      if (this.toSvip) {
        params = {
          vip_type: 3,
          is_web: 1
        }
      } else {
        params = {
          vip_type: 2,
          type: this.svipType,
          is_web: 1
        }
      }
      if (this.userInfo.mobile) {
        buyVip(params).then(res => {
          if (res.state == 200) {
            this.payConfig = res.data
            this.getSign()
          } else {
            this.$toast.top(res.msg)
          }
        })
      } else {
        this.$router.push({name: 'bindTel'})
      }
      
    },
    beCommonVip() {
      let params;
      // 升级到私教
      // if (this.toSvip) {
      //   params = {
      //     vip_type: 3,
      //     is_web: 1
      //   }
      // } else {
      //   // 普通会员
        params = {
          vip_type: 1,
          type: this.svipType,
          is_web: 1
        }
      // }
      if (this.userInfo.mobile) {
        buyVip(params).then(res => {
          if (res.state == 200) {
            this.payConfig = res.data
            this.getSign()
          } else {
            this.$toast.top(res.msg)
          }
        })
      } else {
        this.$router.push({name: 'bindTel'})
      }
      
    },
    getSign() {
      getSign(encodeURIComponent(location.href)).then(res => {
        if (res.state == 200) {
          this.setConfig(res.data)
        }
      })
    },
    setConfig(params) {
      wx.config({
        debug: false, // 开启调试模式,
        appId: params.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: params.timeStamp, // 必填，生成签名的时间戳
        nonceStr: params.nonceStr, // 必填，生成签名的随机串
        signature: params.signature,// 必填，签名，见附录1
        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.error(function(res){
      });
      this.wxPay(params)
    },
    wxPay(params) {
      let that = this
      const payConfig = this.payConfig
      wx.ready(function(){
        wx.chooseWXPay({
          timestamp: payConfig.pay.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: payConfig.pay.nonceStr, // 支付签名随机串，不长于 32 位
          package: payConfig.pay.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: payConfig.pay.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: payConfig.pay.sign, // 支付签名
          success: function(res) {
            // 支付成功后的回调函数
            that.getUserInfo()
          },
          fail:function(res){
              
          }
        })
      })
    },
    
    getUserInfo() {
      getUser().then(res => {
        this.$toast.top('已开通')
        if (res.state == 200) {
          this.userInfo = res.data
          let userInfo = JSON.stringify(res.data)
          localStorage.setItem('userInfo', userInfo)
          this.$router.go(-1)
        }
      })
    },
  },
  filters: {
    limitTime(value) {
      let time = new Date(value.replace(/-/g, "/"))
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      return year + '年' + month + '月' + day + '日'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.beVip-page {
  background: #F4F6F9;
  position: relative;
  padding-bottom: 120px;
}

.vip-tabbar {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #FBF7CD;
  font-size: 32px;
  font-weight: 600;
  background: -webkit-linear-gradient(left, #E6C680, #E4C179, #DAAE5A, #D9AC57);
  text-align: center;
}

.vip-tabbar .avtive-tab {
  color: #1F1F1F;
}

.vip-tabbar > div {
  position: relative;
}

.recommend-box {
  position: absolute;
  width: 56px;
  height: 28px;
  background: #FF7D8D;
  border-radius: 14px 14px 14px 0;
  font-size: 20px;
  color: #fff;
  text-align: center;
  line-height: 28px;
  top: -14px;
  right: -60px;
}

.recommend-box span {
  display: block;
  height: 28px;
  font-size: 12px;
  line-height: 32px;
}

.svip-box-title {
  height: 100px;
  background: #fff;
}

.svip-bg {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.svip-bg > div {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  line-height: 100px;
  text-align: center;
  font-size: 28px;
  color: #D6A74C;
}

.svip-bg img {
  width: 422px;
  display: block;
  margin: auto;
}

.svip-item {
  height: 180px;
  padding: 0 40px;
  background: #fff;
  border-top: 1px solid #F4F6F9;
  display: flex;
  align-items: center;
}

.svip-icon img {
  width: 120px;
  height: 120px;
  margin-right: 36px;
}

.svip-desc  {
  font-size: 30px;
  color: #444C52;
}

.svip-subdesc {
  font-size: 26px;
  color: #808C92;
  margin-top: 16px;
}

.martop20 {
  margin-top: 20px;
}
.vip-limit-time {
  height: 60px;
  background: rgb(207, 145, 145);
  font-size: 24px;
  color: #fff;
  position: fixed;
  bottom: 130px;
  left: 0; 
  width: 100%;
  text-align: center;
  line-height: 60px;
}

.svip-bottom {
  height: 130px;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0; 
  width: 690px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
}



.select-drop, .confirm-btn {
  width: 296px;
  height: 76px;
}

.select-drop {
  border: 1px solid #F4F6F9;
}

.confirm-btn {
  border: 1px solid #fff;
  background: url('../assets/class_zhekoubg@3x.png') no-repeat;
  background-size: cover;
  color: #FAF7CC;
  font-size: 32px;
  text-align: center;
  line-height: 76px;
  border-radius: 4px;
}

.select-drop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.drap-icon {
  vertical-align: middle;
}

.select-drop img {
  width: 22px;
  height: 12px;
  vertical-align: middle;
  margin-top: -8px;
}

.select-type {
  display: flex;
  align-items: center;
}

.select-type-time {
  font-size: 22px;
  color: #AEB6BD;
  margin-top: 6px;
}

.new-price {
  color: #FF7D8C;
  font-size: 32px;
  padding: 0 10px 0 0;
}

.old-price {
  color: #AEB6BD;
  padding: 0 10px;
  font-size: 32px;
  text-decoration: line-through;
  font-weight: normal;
}

.select-item-box {
  position: absolute;
  width: 100%;
  background: #fff;
  bottom: 0;
  font-weight: 600;
}

.select-items {
  display: flex;
  align-items: center;
  font-size: 32px;
  padding: 0 30px;
  border-top: 1px solid #F4F6F9;
  justify-content: space-between;
  height: 100px;
}

.select-items2 {
  display: flex;
  align-items: center;
  font-size: 32px;
  padding: 0 30px;
  border-top: 1px solid #F4F6F9;
  justify-content: space-between;
  padding: 10px 20px;
}

.upgrade-desc {
  color: #B6BEC4;
  font-size: 18px;
}

.modal-bg {
  position: fixed;
  width: 100%;
  height: calc(100% - 136px);
  background: rgba(0,0,0, .5);
  left: 0;
  bottom: 130px;
}

.year-icon {
  position: relative;
}

.limit-time-cout {
  position: absolute;
  width: 98px;
  height: 28px;
  border-radius: 18px 14px 14px 0;
  background: #FF7D8D;
  color: #fff;
  top: 5px;
  left: 80px;
}

.limit-time-cout span {
  display: block;
  height: 28px;
  font-size: 12px;
  line-height: 32px;
  text-align: center;
}







</style>
