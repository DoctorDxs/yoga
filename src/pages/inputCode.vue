<template>
  <div class="bindTel-page">
    <bg></bg>
    <div class="input-box">
      <input type="number" name='tel' placeholder="请输入手机号码" v-model.trim="mobile" maxlength="11" class="input-mobile">
    </div>

    <div class="input-box">
      <input type="number" name='code' placeholder="请输入你的验证码" v-model.trim="code" maxlength="6" class="input-code">
      <span class="vode-btn" :style='canGetCode ? "background: rgba(183,143,218,1);color:rgba(255,255,255,1);": ""'  @click="getCode">{{limiteTime == 60 ? codeBtnText : limiteTime + 's'}}</span>
    </div>
    <div class="get-code-btn" :style='canBind ? "background:rgba(183,143,218,1);color:#fff;" : ""' @click="nextStep">下一步</div>
  </div>
     
</template>

<script>
import { sedCode } from '../fetch/api'
export default {
  name: 'inputCode',
  data () {
    return {
      mobile: '',
      canGetCode: false,
      code: '',
      canBind: false,
      showModal: false,
      limiteTime: 60,
      codeBtnText: '获取验证码'
    }
  },
  activated() {
    document.title = '修改密码'
    this.canGetCode = false
    this.code = ''
    this.canBind = false
    this.showModal = false
    this.limiteTime = 60
    this.codeBtnText = '获取验证码'
    this.mobile = ''
  },

  watch: {
    mobile(val) {
      if (this.mobile.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
        this.canGetCode = true
      } else {
        this.canGetCode = false
      }
    },
    code(val) {
      if(/^\d{6}$/.test(val) && this.mobile.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
        this.canBind = true
      } else {
        this.canBind = false
      }
    }
  },

  methods: {
    getCode() {
      if(this.canGetCode) {
        this.timeEnd()
        sedCode({type: 2, mobile: this.mobile}).then(res => {
          if (res.state == 200) {
            this.$toast.top('验证码已发送！')
          } else {
            this.$toast.top(res.msg)
          }
        })
      }
    },

    timeEnd() {
      if (this.limiteTime == 0) {
          this.limiteTime = 60;
          this.codeBtnText = '重新获取'
          // 倒计时后重新验证 手机号 是否正确
          if (this.mobile.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
            this.canGetCode = true
          } else {
            this.canGetCode = false
          }
      } else {
          this.canGetCode = false
          this.limiteTime = this.limiteTime - 1 
          setTimeout(() => {
              this.timeEnd()
          },1000)
      }
    },
    selectThis(params) {
      this.showModal = false
      if (params == 1) {
        this.canGetCode = true
      } else if (params == 2) {
        this.mobile = ''
        this.code = ''
        this.canGetCode = false
        this.canBind = false
      }
    },
    nextStep() {
      this.$router.push({name: 'changePwd', query: {mobile: this.mobile, captcha: this.code}})
    }
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bindTel-page {
  background: #F4F6F9;
  padding: 40px 30px 0;
}

.input-box {
  background: #fff;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.input-mobile {
  width: 100%;
  height: 100%;
  outline: medium;
  border: 0;
  text-indent: 30px;
  font-size: 32px;
  color: #444C52;
  font-weight: 600;
}

::-webkit-input-placeholder{
  opacity: .3;
}

.get-code-btn {
  height: 100px;
  color:rgba(171,180,187,1);
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  line-height: 100px;
  background:rgba(219,223,225,1);
  border-radius: 5px;
  margin-top: 40px;
}

.input-code {
  height: 100%;
  outline: medium;
  border: 0;
  text-indent: 30px;
  font-size: 32px;
  color: #444C52;
  font-weight: 600;
  width: 480px;
}

.vode-btn {
  width:173px;
  height:66px;
  border-radius: 66px;
  text-align: center;
  line-height: 66px;
  font-size: 28px;
  font-weight:500;
  background:rgba(225,226,228,1);
  margin-right: 20px;
  color:rgba(171,181,188,1);
}

.tips {
  font-size:26px;
  font-weight:bold;
  color:rgba(68,76,82,1);
  margin: 49px 0 24px;
}

.tips-text {
  font-size:24px;
  color:rgba(128,140,146,1);
}

.modal-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  top: 0;
  left: 0;
}

.modal-box {
  position: absolute;
  width: 500px;
  height: 560px;
  background:rgba(255,255,255,1);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border-radius: 4px;
}

.modal-title {
  text-align: center;
  font-size:34px;
  font-weight:bold;
  color:rgba(255,64,87,1);
  margin: 43px 0 40px;
}

.modal-content {
  font-size:28px;
  line-height:42px;
  font-weight:500;
  color:rgba(127,140,146,1);
  width: 418px;
  margin: 0 auto 40px;
}

.select-btn {
  width:440px;
  height:100px;
  font-size:32px;
  color:rgba(255,255,255,1);
  background:rgba(183,143,218,1);
  text-align: center;
  line-height: 100px;
  border-radius: 4px;
  margin: auto;
}

.select-btn-other {
  color:rgba(129,140,146,1);
  width: 440px;
  height: 80px;
  line-height: 100px;
  text-align: center;
  margin: auto;
  font-size: 28px;
}






</style>
