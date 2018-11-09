<template>
  <div class="accountSet-page">
    <div class="account-avatar">
      <div>头像</div>
      <div><img src="http://img2.touxiang.cn/file/20180308/8eefd445e3718259d0044314a4289060.jpg" alt=""></div>
    </div>
    <div class="account-info-item" @click="inputName">
      <div>姓名</div>
      <div class="item-detail">{{name ? name : "请输入您的姓名"}}</div>
    </div>

    <div class="account-info-item" @click="inputPhone">
      <div>电话号码</div>
      <div class="item-detail">{{phone ? phone : "请输入您的电话号码"}}</div>
    </div>

    <div class="account-info-item" @click="inputWx">
      <div>微信号</div>
      <div class="item-detail">{{wx ? wx : "请输入您的微信号"}}</div>
    </div>

    <div class="account-info-item" @click="showPickerAge">
      <div>年龄</div>
      <div class="item-detail"><span>{{age ? age : "请选择"}}</span><img src="../assets/class_next_icon@3x.png" alt=""></div>
    </div>

    <div class="account-info-item" @click="showPickerArea">
      <div>地址</div>
      <div class="item-detail"><span>{{add ? add : "请选择地址"}}</span><img src="../assets/class_next_icon@3x.png" alt=""></div>
    </div>
    <div class="input-box" :style='showNameInput ? "display: block;" : ""'>
      <div>
        <input type="text" @blur='inputBlur' ref="input1" v-model.trim="name" placeholder="请输入您的姓名">
        <div class="confirm-btn" :style="name ? 'background: #B78FDA;color:#fff;' : ''">提交</div>
      </div>
    </div>
    <div class="input-box" :style='showPhoneInput ? "display: block;" : ""'>
      <div>
        <input type="text" @blur='inputBlur' ref="input2" v-model.trim="phone" placeholder="请输入您的电话号码">
        <div class="confirm-btn" :style="phone ? 'background: #B78FDA;color:#fff;' : ''">提交</div>
      </div>
    </div>
    <div class="input-box" :style='showWxInput ? "display: block;" : ""'>
      <div>
        <input type="text" @blur='inputBlur' ref="input3" v-model.trim="wx" placeholder="请输入您的微信号">
        <div class="confirm-btn" :style="wx ? 'background: #B78FDA;color:#fff;' : ''">提交</div>
      </div>
    </div>
    <div class="layout" v-if='!inputFocus'>立即领取</div>
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
  created() {
    document.title = '登记信息';
  },
  mounted() {
    document.getElementsByClassName('accountSet-page')[0].style.minHeight = window.innerHeight + 'px'
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  },
  methods: {
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
    inputName() {
      this.inputFocusAuto(true, false, false, 'input2', 'input3', 'input1')
    },
    inputPhone() {
      this.inputFocusAuto(false, true, false, 'input1', 'input3', 'input2')
    },
    inputWx() {
      this.inputFocusAuto(false, false, true, 'input1', 'input2', 'input3')
    },
    inputBlur() {
      this.$refs.input1.blur()
      this.$refs.input2.blur()
      this.$refs.input3.blur()
      this.inputFocus = false
      this.showNameInput = false
      this.showPhoneInput = false
      this.showWxInput = false
    },
    inputFocusAuto(showNameInput, showPhoneInput, showWxInput, inputBlur1, inputBlur2, inputFocus) {
      this.showNameInput = showNameInput
      this.showPhoneInput = showPhoneInput
      this.showWxInput = showWxInput
      this.$refs[inputBlur1].blur()
      this.$refs[inputBlur2].blur()
      setTimeout(() => {
        this.$refs[inputFocus].focus()
      }, 100)
      this.inputFocus = true
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
  height: 150px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  font-size: 30px;
  color: #444C52;
}

.account-avatar img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
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





</style>
