<template>
    <div class="buy-course-page">
        <div class="buy-info">
          <div class="input-item">
            <div class="course-name">{{courseName}}</div>
            <div class="course-price">￥{{price}}</div>
          </div>
          
          <div class="input-item" >
            <div class="input-title">姓名</div>
            <div class="input-box"><input type="text" placeholder="请输入您的姓名" v-model.trim="userName" @focus="hideBottomBtn" @blur="showBottomBtn"></div>
          </div>

          <div class="input-item">
            <div class="input-title">电话号码</div>
            <div class="input-box"><input type="number" maxlength="11" placeholder="请输入你的电话号码" v-model="phone" @focus="hideBottomBtn" @blur="showBottomBtn"></div>
          </div>

          <div class="input-item" >
            <div class="input-title">微信号</div>
            <div class="input-box"><input type="text" placeholder="请输入你的微信号" v-model="wx" @focus="hideBottomBtn" @blur="showBottomBtn"></div>
          </div>

          <div class="input-item" @click="showPickerAge">
            <div class="input-title">年龄</div>
            <div class="input-box">
              <div>{{age ? age : "请选择"}}</div>
              <div><img src="../assets/class_next_icon@3x.png" alt=""></div>
            </div>
          </div>

          <div class="input-item" @click="showPickerArea">
            <div class="input-title">地址</div>
            <div class="input-box">
              <div>{{add ? add : "请选择地址"}}</div>
              <div><img src="../assets/class_next_icon@3x.png" alt=""></div>
            </div>
          </div>

          <div class="input-item">
            <div class="input-title">付款方式</div>
            <div class="input-box">
              <div>微信支付</div>
            </div>
          </div>

          <div class="input-item">
            <div class="input-title">{{type == 1 ? '私教尊贵' : ''}}会员折扣</div>
            <div class="input-box" @click="selectDiscount">
              <div>{{discountTypeText ? discountTypeText : '未选择'}}</div>
              <div><img src="../assets/class_next_icon@3x.png" alt=""></div>
            </div>
          </div>
        </div>

        <div class="pay-btn" v-if='!inputFocus'>
          <div>
            <span>实付</span>
            <span class="real-pay">￥{{price_discount !== 0 ? price_discount : price}}</span>
            <span class="orgin-pay" v-if='price_discount !== 0'>￥{{price}}</span>
          </div>
          <div @click="submitOrder">立即支付</div>
        </div>
        <awesome-picker
          ref="pickerArea"
          :textTitle="pickerArea.textTitle"
          :data="pickerArea.areaData"
          :anchor="pickerArea.anchor"
          @confirm="handlePickerAreaConfirm">
        </awesome-picker>
        <awesome-picker
          ref="pickerAge"
          :textTitle="pickerAge.textTitle"
          :data="pickerAge.ageData"
          :anchor="pickerAge.anchor"
          @confirm="handlePickerAgeConfirm">
        </awesome-picker>
    </div>
</template>

<script>
import areaData from '../utils/area.js'
import { buyCourse, getSign } from '../fetch/api'
import trendListVue from '../components/trendList';
const ageData = []
for (let i = 0;i < 100; i++) {
  ageData.push(i)
}
export default {
  name: 'buyCourse',
  data () {
    return {
      userName: '',
      phone:'' ,
      wx: '',
      pickerArea: {
        anchor: [],
        textTitle: '选择地址',
        areaData: areaData
      },
      pickerAge: {
        anchor: [],
        textTitle: '选择年龄',
        ageData: [ageData]
      },
      add: '',
      age: '',
      courseName: '',
      price: 0,
      windowH: '',
      payConfig: {},
      price_discount: 0,
      discountTypeText: '' 
    }
  },
  created() {
    const query = this.$route.query
    this.id = query.id
    this.courseName = query.name
    this.price  = query.price
    this.type = query.type
    this.vip_discount = query.vip_discount
    this.now_phase_id = query.now_phase_id
    document.title = '课程购买';
    let userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      this.userInfo = userInfo
      this.userName = userInfo.true_name
      this.wx = userInfo.wechat_num
      this.age = userInfo.age + ''
      if (userInfo.address) {
        const addressArr = userInfo.address.split(' ')
        this.add = addressArr[0] + ' ' + addressArr[1] + ' ' + addressArr[2]
      };
      this.phone = userInfo.mobile
    };
    
  },
  mounted() {
    document.getElementsByClassName('buy-course-page')[0].style.minHeight = window.innerHeight + 'px'
    this.windowH = document.documentElement.clientHeight || document.body.clientHeight
    this.addResize()
  },

  methods: {
    watchKeyUp() {
      const nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight
      if (this.windowH > nowClientHeight) {
        this.inputFocus = true
      } else {
        this.inputFocus = false
      } 
    },

    // 添加事件
    addResize() {
      window.addEventListener('resize', this.watchKeyUp, false)
    },
    removerResize() {
      window.removeEventListener('resize', this.watchKeyUp, false)
    },
    selectDiscount() {
      this.$router.push({name: 'selectType',query: {type: this.type, vip_discount: this.vip_discount}})
    },
    showPickerAge () {
      this.$refs.pickerAge.show()
    },
    handlePickerAgeConfirm(v) {
      this.pickerAge.anchor = v
      this.age = v[0].value + ''
    },
    showPickerArea () {
      this.$refs.pickerArea.show()
    },
    handlePickerAreaConfirm (v) {
      this.pickerArea.anchor = v
      this.add = v[0].value + ' ' + v[1].value + ' ' + v[2].value
    },
    hideBottomBtn() {
      this.addResize()
    },
    showBottomBtn(){
      this.removerResize()
    },
    submitOrder() {
      if (this.checkInfo()) {
        let params = {
          true_name: this.userName,
          telephone: this.phone,
          wechat_num: this.wx,
          age: this.age,
          address: this.add.split(' ').join(' '),
          group_id: this.id,
          is_web: 1,
          phase_id: this.now_phase_id
        };
        if (this.vip) {
          params.is_vip_discount = 1
        };
        buyCourse(params).then(res => {
          if (res.state == 200) {
            this.payConfig = res.data
            this.getSign()
          } else {
            this.$toast.top(res.msg)
          }
        })
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
      const payConfig = this.payConfig
      const that  = this
      wx.ready(function(){
        wx.chooseWXPay({
          timestamp: payConfig.pay.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: payConfig.pay.nonceStr, // 支付签名随机串，不长于 32 位
          package: payConfig.pay.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: payConfig.pay.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: payConfig.pay.sign, // 支付签名
          success: function(res) {
            // 支付成功后的回调函数
            that.$router.go(-1)
          },
          fail:function(res){
              
          }
        })
      })
    },

    checkInfo() {
      if (!this.userName) {
        this.$toast.top('请输入您的姓名！')
        return false
      } else if (!this.phone) {
        this.$toast.top('请输入您的电话号码！')
        return false
      } else if(!this.phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
        this.$toast.top('请输正确的电话号码！')
        return false
      }  else if(!this.wx) {
        this.$toast.top('请输入您的微信号！')
        return false
      } else if(this.age === '') {
        this.$toast.top('请选择您的年龄')
        return false
      } else if (this.age == '0') {
        this.$toast.top('年龄不能为零岁')
        return false
      } else if(this.add === '') {
        this.$toast.top('请选择您的地址！')
        return false
      } else {
        return true
      }
    }
  },
  activated() {
    const query = this.$route.query
    this.id = query.id
    this.courseName = query.name
    this.price  = query.price
    this.type = query.type
    this.now_phase_id = query.now_phase_id
    this.vip_discount = query.vip_discount
    document.title = '课程购买';
    let vip = JSON.parse(localStorage.getItem('vip')) 
    console.log(vip == false)
    if (vip) {
      this.price_discount = (this.vip_discount * 0.01 * this.price).toFixed(2) + ''
      this.vip = true
      if (this.vip_discount == '0') {
        if (this.type == 2) {
          this.discountTypeText = '会员免费'
        } else {
          this.discountTypeText = '私教会员免费'
        }
      } else {
        if(this.type == 1) {
          this.discountTypeText = '私教会员' + this.vip_discount + '折'
        } else {
          this.discountTypeText = '会员' + this.vip_discount + '折'
        }
      }
    } else {
      this.price_discount = 0
      this.discountTypeText = '不使用折扣'
      this.vip = false
    };
    let userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      this.userInfo = userInfo
      this.phone = userInfo.mobile
    };
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy-course-page {
  font-size: 30px;
  color: #444C52;
  background: #F0F2F7;
}

.input-item {
  padding: 0 30px;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #F7F8FB;
  background: #fff;
}

.input-item input {
  text-align: right;
  border: 0;
  outline: medium;
  font-size: 30px;
  height: 100%;
  width: 480px;
  color: #ABB4BB;
}

.input-item input::-webkit-input-placeholder{
  color: #ABB4BB;
}


.course-name {
  font-size: 32px;
  font-weight: 600;
}

.course-price {
  font-size: 32px;
  color: #808C92;
}

.input-box {
  display: flex;
  align-items: center;
  color: #ABB4BB;
}

.input-box > div:nth-child(1) {
  margin-right: 14px;
}

.input-box > div:nth-child(2) {
  width: 14px;
  height: 28px;
}

.input-box img {
  width: 14px;
  height: 28px;
}

.pay-btn {
  position: fixed;
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



.input-box-2 {
  height: 96px;
  position: fixed;
  bottom: 0;
  background: #fff;
  bottom: 0;
  width: 100%;
  display: none;
}

.input-box-2 > div {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
}

.input-box-2 > div input {
  width: 570px;
  height: 66px;
  background: #F0F2F7;
  border: 0;
  outline: medium;
  border-radius: 33px;
  font-size: 30px;
  text-indent: 20px;
  color: #444D52;
}

.input-box-2 > div div {
  background: #F0F2F7;
  height: 66px;
  width: 120px;
  border-radius: 33px;
  font-size: 28px;
  color: #818C92;
  text-align: center;
  line-height: 66px;
}

.input-box-2 > div input::placeholder {
  color: #ABB3BA;
}







</style>
