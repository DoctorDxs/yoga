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
    <div class="get-code-btn" :style='canBind ? "background:rgba(183,143,218,1);color:#fff;" : ""' @click="bindTel">绑定</div>
    <div class="tips">温馨提示：</div>
    <div class="tips-text">购买付费课程和训练营时，需要该用户绑定过手机号</div>

    <div class="modal-bg" v-if='showModal'>
      <div class="modal-box">
        <div class="modal-title">注意</div>
        <div class="modal-content">你输入的手机号，之前已经登录过轻瑜伽，如果继续使用该手机号，现有数据将会丢失。请谨慎操作！</div>
        <div class="select-btn" @click="selectThis(1)">继续使用该手机号</div>
        <div class="select-btn-other" @click='selectThis(2)'>使用其他手机号</div>
      </div>
    </div>
  </div>
     
</template>

<script>
import {sedCode,checkPhone, getUser, checkCode} from '../fetch/api'
export default {
  name: 'bindTel',
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
    document.title = '绑定手机号'
    this.mobile = ''
    this.canGetCode = false
    this.code = ''
    this.canBind = false
    this.showModal = false
    this.limiteTime = 60
    this.codeBtnText = '获取验证码'
  },

  watch: {
    mobile(val) {
      if (this.mobile.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
        this.checkPhone()
      }
    },
    code(val) {
      if(/^\d{6}$/.test(val) &&　this.mobile.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
        this.canBind = true
      } else {
        this.canBind = false
      }
    }
  },

  methods: {
    // 检测  手机号是否绑定过
    checkPhone() {
      checkPhone(this.mobile).then(res => {
        if (res.state == 200) {
          this.canGetCode = true
        } else if (res.state == 400){
          this.showModal = true
        }
        
      })
    },

    getCode() {
      if (this.canGetCode) {
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
    bindTel() {
      // 绑定完后  重新设置用户信息
      checkCode({mobile: this.mobile, captcha: this.code}).then(res => {
        if (res.state == 200) {
          this.$toast.top('操作成功')
        } else {
          this.$toast.top(res.msg)
        }
      })
      this.getUserInfo()
    },
    getUserInfo() {
      getUser().then(res => {
        if (res.state == 200) {
          this.userInfo = res.data
          let userInfo = JSON.stringify(res.data)
          localStorage.setItem('userInfo', userInfo)
          this.$router.go(-1)
        }
      })
    },
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
