<template>
  <div class="accountSet-page">
    <div class="account-avatar" >
      <div>头像</div>
      <div><img :src="dataUrl" alt=""></div>
      <input type="file" name="file"  class="img-input" accept="image/*" ref='avatar' @change="selectImg">
    </div>
    <div class="account-info-item" @click="inputChickName">
      <div>昵称</div>
      <div class="item-detail">{{chickName ? chickName : "请输入您的昵称"}}</div>
    </div>
    <div class="account-info-item" @click="inputSign">
      <div>签名</div>
      <div class="item-detail">{{sign ? sign : "请输入您的签名"}}</div>
    </div>

    <div class="account-info-item" @click="inputName">
      <div>姓名</div>
      <div class="item-detail">{{name ? name : "请输入您的姓名"}}</div>
    </div>

    <div class="account-info-item" @click="inputWx">
      <div>微信号</div>
      <div class="item-detail">{{wx ? wx : "请输入您的微信号"}}</div>
    </div>

    <div class="account-info-item" @click="showPickerAge">
      <div>年龄</div>
      <div class="item-detail"><span>{{age != '0' &&  age ? age : "请选择"}}</span><img src="../assets/class_next_icon@3x.png" alt=""></div>
    </div>

    <div class="account-info-item" @click="showPickerArea">
      <div>地址</div>
      <div class="item-detail"><span>{{add ? add : "请选择地址"}}</span><img src="../assets/class_next_icon@3x.png" alt=""></div>
    </div>

    <div class="account-info-item martop-20" @click="linkBind">
      <div>帐号绑定</div>
      <div class="item-detail"><img src="../assets/class_next_icon@3x.png" alt=""></div>
    </div>

    <!-- <div class="layout">退出</div> -->

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
    <div class="input-box" :style='showChickName ? "display: block;" : ""'>
      <div>
        <input type="text" @blur='inputBlur' ref="input4" v-model.trim="chickName" placeholder="请输入您的昵称">
        <div class="confirm-btn" :style="chickName ? 'background: #B78FDA;color:#fff;' : ''" @click="confirm('username', chickName)">提交</div>
      </div>
    </div>
    <div class="input-box" :style='showNameInput ? "display: block;" : ""'>
      <div>
        <input type="text" @blur='inputBlur' ref="input1" v-model.trim="name" placeholder="请输入您的姓名">
        <div class="confirm-btn" :style="name ? 'background: #B78FDA;color:#fff;' : ''" @click="confirm('true_name', name)">提交</div>
      </div>
    </div>
    <div class="input-box" :style='showSignInput ? "display: block;" : ""'>
      <div>
        <input type="text" @blur='inputBlur' ref="input2" v-model.trim="sign" placeholder="这里是默认签名">
        <div class="confirm-btn" :style="sign ? 'background: #B78FDA;color:#fff;' : ''" @click="confirm('desc', sign)">提交</div>
      </div>
    </div>
    <div class="input-box" :style='showWxInput ? "display: block;" : ""'>
      <div>
        <input type="text" @blur='inputBlur' ref="input3" v-model.trim="wx" placeholder="请输入您的微信号">
        <div class="confirm-btn" :style="wx ? 'background: #B78FDA;color:#fff;' : ''"  @click="confirm('wechat_num', wx)">提交</div>
      </div>
    </div>
  </div>
     
</template>
<script>
import areaData from '../utils/area.js'
import { changUserInfo, postImg, getUser } from '../fetch/api'
const ageData = []
for (let i = 0;i < 100; i++) {
  ageData.push(i)
}
export default {
  name: 'accountSet',
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
      sign: '',
      wx: '',
      chickName: '',
      inputFocus: false,
      showNameInput: false,
      showSignInput: false,
      showWxInput: false,
      showChickName: false,
      dataUrl: '',
      userInfo: {},
      imgHttp: ''
    }
  },
  activated() {
    document.title = '账号设置';
    let userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      this.userInfo = userInfo
      this.chickName = userInfo.username
      this.name = userInfo.true_name
      this.sign = userInfo.desc
      this.wx = userInfo.wechat_num
      this.age = userInfo.age
      if (userInfo.address) {
        const addressArr = userInfo.address.split(' ')
        this.add = addressArr[0] + ' ' + addressArr[1] + ' ' + addressArr[2]
      };
      this.dataUrl = userInfo.avatar
    };
  },
  mounted() {
    document.getElementsByClassName('accountSet-page')[0].style.minHeight = window.innerHeight + 'px'
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
      this.age = v[0].value + ''
      if (this.age != '0') {
        this.postUserInfo('age', this.age)
      } else {
        this.$toast.top('年龄选择错误')
      }
    },
    showPickerArea () {
      this.$refs.pickerArea.show()
    },
    handlePickerAreaConfirm (v) {
      this.pickerArea.anchor = v
      this.add = v[0].value + ' ' + v[1].value + ' ' + v[2].value
      this.postUserInfo('address', v[0].value + ' ' + v[1].value + ' ' + v[2].value)
    },
    // 处理input 框弹出时 input聚焦拉起键盘问题
    inputName() {
      this.inputFocusAuto(true, false, false, false, 'input2', 'input3', 'input4', 'input1')
    },
    inputSign() {
      this.inputFocusAuto(false, true, false, false, 'input1', 'input3', 'input4', 'input2')
    },
    inputWx() {
      this.inputFocusAuto(false, false, true, false, 'input1', 'input2', 'input4', 'input3')
    },
    inputChickName() {
      this.inputFocusAuto(false, false, false, true, 'input1', 'input2', 'input3', 'input4')
    },
    inputBlur() {
      this.$refs.input1.blur()
      this.$refs.input2.blur()
      this.$refs.input3.blur()
      this.$refs.input4.blur()
      this.inputFocus = false
      this.showNameInput = false
      this.showSignInput = false
      this.showWxInput = false
      this.showChickName = false
    },
    inputFocusAuto(showNameInput, showSignInput, showWxInput, showChickName, inputBlur1, inputBlur2, inputBlur3, inputFocus) {
      this.showNameInput = showNameInput
      this.showSignInput = showSignInput
      this.showWxInput = showWxInput
      this.showChickName = showChickName
      this.$refs[inputBlur1].blur()
      this.$refs[inputBlur2].blur()
      this.$refs[inputBlur3].blur()
      this.$refs[inputFocus].blur()
      setTimeout(() => {
        this.$refs[inputFocus].focus()
      }, 1)
      this.inputFocus = true
    },

    postUserInfo(key,val) {
      console.log(key,val)
      const params = {
        field: key,
        value: val
      }
      changUserInfo(params).then(res => {
        if (res.state == 200) {
          this.$toast.top(res.msg)
          this.getUserInfo()
        } else {
          this.$toast.top(res.msg)
        }
      })
    },

    confirm(key,val) {
      this.inputBlur()
      this.postUserInfo(key,val)
    },
    selectImg(e) {
      let file = e.target.files[0];
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload= () => {
          this.dataUrl = reader.result
      }
      this.upload()
    },

    upload() {
      if(this.$refs.avatar.files[0].length !== 0){ 
        let data = new FormData();
        data.append('file', this.$refs.avatar.files[0]);
        data.append('type', 1)
        postImg(data).then(res => {
          if (res.state == 200) {
            this.imgHttp = res.data[0]
            console.log(res.data[0])
            this.postUserInfo('avatar', res.data[0])
          }
        })
      }
    },

    getUserInfo() {
      getUser().then(res => {
        if (res.state == 200) {
          this.userInfo = res.data
          let userInfo = JSON.stringify(res.data)
          localStorage.setItem('userInfo', userInfo)
        }
      })
      
    },
    
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.accountSet-page {
  background: #F4F6F9;
  padding-bottom: 120px;
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
  position: relative;
}

.img-input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
}

.img-file {
  position: absolute;
  height: 150px;
  width: 100%;
  top: 0;
  right: 0;
  border: 1px solid red;
  opacity: 0;
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

.martop-20 {
  margin-top: 20px;
  border-top: 0;
}

.layout {
  width: 690px;
  height: 100px;
  background: #FF7D8D;
  border-radius: 8px;
  margin: 40px auto 0;
  text-align: center;
  line-height: 100px;
  color: #fff;
  font-size: 32px;
  font-weight: 600;
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

.croppa-bg {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0,1);
}

.croppa-box {
  position: absolute;
  right: 0;
  background: #fff;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.oprate-btns {
  height: 98px;
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 30px;
  line-height: 98px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}







</style>
