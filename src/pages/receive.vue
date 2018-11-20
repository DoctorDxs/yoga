<template>
  <div class="accountSet-page">
    <div class="account-avatar">
      
      <div class="gift-detail">
        <img :src="group_cover" alt="">
        <div class="course-desc">
          <div>{{group_name}}</div>
          <div>{{group_type}}</div>
        </div>
      </div>
      
    </div>
    <div class="account-info-item">
      <div>姓名</div>
      <div class="item-detail"><input type="text" placeholder="请输入您的姓名" v-model.trim="name" @focus="hideBottomBtn" @blur="showBottomBtn"></div>
    </div>

    <div class="account-info-item">
      <div>电话号码</div>
      <div class="item-detail"><input type="number" maxlength="11" placeholder="请输入您的电话号码" v-model.trim="phone" @focus="hideBottomBtn" @blur="showBottomBtn"></div>
    </div>

    <div class="account-info-item">
      <div>微信号</div>
      <div class="item-detail"><input type="text" placeholder="请输入你的微信号" v-model.trim="wx" @focus="hideBottomBtn" @blur="showBottomBtn"></div>
    </div>

    <div class="account-info-item" @click="showPickerAge">
      <div>年龄</div>
      <div class="item-detail"><span>{{age ? age : "请选择"}}</span><img src="../assets/class_next_icon@3x.png" alt=""></div>
    </div>

    <div class="account-info-item" @click="showPickerArea">
      <div>地址</div>
      <div class="item-detail"><span>{{add ? add : "请选择地址"}}</span><img src="../assets/class_next_icon@3x.png" alt=""></div>
    </div>
    <div class="layout" v-if='!inputFocus' @click="submitGetInfo">立即领取</div>
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
import { reciveSend } from '../fetch/api'
const ageData = []
for (let i = 0;i < 100; i++) {
  ageData.push(i)
}
export default {
  name: 'receive',
  data () {
    return {
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
      name: '',
      phone: '',
      wx: '',
      inputFocus: false,
      showNameInput: false,
      showPhoneInput: false,
      showWxInput: false
    }
  },
  activated() {
    document.title = '登记信息';
    const query = this.$route.query
    this.id = query.id
    this.group_name = query.group_name
    this.group_type = query.group_type
    this.group_cover = query.group_cover
    let userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      this.userInfo = userInfo
      this.name = userInfo.true_name
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
    document.getElementsByClassName('accountSet-page')[0].style.minHeight = window.innerHeight + 'px'
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

    hideBottomBtn() {
      this.addResize()
    },
    showBottomBtn(){
      this.removerResize()
    },

    linkBind() {
      this.$router.push({name: 'bindAccount'})
    },
    showPickerAge () {
      this.$refs.pickerAge.show()
    },
    handlePickerAgeConfirm(v) {
      this.pickerAge.anchor = v
      this.age = v[0].value.toString()
    },
    showPickerArea () {
      this.$refs.pickerArea.show()
    },
    handlePickerAreaConfirm (v) {
      this.pickerArea.anchor = v
      this.add = v[0].value + ' ' + v[1].value + ' ' + v[2].value
    },

    submitGetInfo() {
      if (this.checkInfo()) {
        const params = {
          true_name: this.name,
          telephone: this.phone,
          wechat_num: this.wx,
          address: this.add,
          age: this.age,
          giving_id: this.id
        }
        reciveSend(params).then( res => {
          if (res.state == 200) {
            this.$toast.top('已领取')
            this.$router.push({
              name: 'giftRecord'
            })
          } else {
            this.$toast.top(res.msg)
          }
        })
      }
    },
    
    checkInfo() {
      if (!this.name) {
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
      } else if (this.age === '') {
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
  components: {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.accountSet-page {
  background: #F4F6F9;
  position: relative;
}

.account-avatar {
  height: 200px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  background: #fff;
  color: #444C52;
}

.account-info-item {
  height: 120px;
  background: #fff;
  font-size: 30px;
  color: #444C52;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e1e2e3;
  padding: 0 30px;
}

.item-detail {
  color: #ABB4BB;
  display: flex;
  align-items: center;
}

.item-detail input {
  text-align: right;
  border: 0;
  outline: medium;
  font-size: 30px;
  height: 100%;
  width: 480px;
  color: rgb(68,77,82)
}

.item-detail input::-webkit-input-placeholder{
  color: #ABB4BB;
}

.item-detail span {
  margin-right: 14px;
}

.item-detail img {
  width: 18px;
  height: 30px;
}

.layout {
  height: 100px;
  background: #FF7D8D;
  margin: 40px auto 0;
  text-align: center;
  line-height: 100px;
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.input-box {
  height: 96px;
  position: fixed;
  bottom: 0;
  background: #fff;
  bottom: 0;
  width: 100%;
  display: none;
}

.input-box > div {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
}

.input-box > div input {
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

.input-box > div div {
  background: #F0F2F7;
  height: 66px;
  width: 120px;
  border-radius: 33px;
  font-size: 28px;
  color: #818C92;
  text-align: center;
  line-height: 66px;
}

.input-box > div input::placeholder {
  color: #ABB3BA;
}

.gift-detail {
  width: 670px;
  height: 140px;
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





</style>
