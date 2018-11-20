<template>
  <div class="inputCode-page">
    <div class="inpput-tips">短信已发至{{phoneHide}}</div>
    <div class="input-box">
      <input type="number" name='code' placeholder="输入验证码" v-model.trim="captcha" maxlength="6">
    </div>
    <div class="code-time-limit">
      <div v-if='limiteTime != 60'>没有收到验证码？ <span class="time-end">{{limiteTime}} </span>秒后可重新发送</div>
      <div class="time-end" @click="sedCode" v-if='limiteTime == 60'>重新发送</div>
    </div>
    <div class="check-code-btn" @click="checkCode">验证</div>
  </div>
     
</template>

<script>
import {sedCode} from '../fetch/api'
import {checkCode} from '../fetch/api'
export default {
  name: 'inputCode',
  data () {
    return {
      phoneHide: '',
      limiteTime: 60,
      captcha: '',
      type: 1
    }
  },
  activated() {
    document.title = '输入验证码';
    let phone = this.$route.query.phone
    let phoneHide = phone.substring(0,3) + '****' + phone.substring(7,11)
    this.phoneHide = phoneHide
    this.phone = phone
    const query = this.$route.query
    if (query.type) {
      this.type = query.type
    } else {
      this.type = 1
    }
    this.sedCode()
  },
  mounted() {
    document.getElementsByClassName('inputCode-page')[0].style.minHeight = window.innerHeight + 'px'
  },

  methods: {
    sedCode() {
      sedCode({type: this.type, mobile: this.phone}).then(res => {
        this.$toast.top('短信验证码已发')
        this.timeEnd()
      })
    },
    checkCode() {
      if (/^\d{6}$/.test(this.captcha)) {
        checkCode({mobile: this.phone, captcha: this.captcha}).then(res => {
          if (res.state == 200) {
            this.$toast.top('手机号码绑定成功')
            this.getUserInfo()
          } else {
            this.$toast.top(res.msg)
          }
        })
      };
      
    },
    getUserInfo() {
      getUser().then(res => {
        if (res.state == 200) {
          this.userInfo = res.data
          let userInfo = JSON.stringify(res.data)
          localStorage.setItem('userInfo', userInfo)
          this.$router.go(-2)
        }
      })
      
    },
    timeEnd() {
      if (this.limiteTime == 0) {
          this.limiteTime = 60;
      } else {
          this.limiteTime = this.limiteTime - 1 
          setTimeout(() => {
              this.timeEnd()
          },1000)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inputCode-page {
  background: #F4F6F9;
  padding: 40px 30px 0;
}

.inpput-tips {
  font-size: 26px;
  color: #ABB5BC;
  text-align: center;
  margin-bottom: 40px;
}

.input-box {
  background: #fff;
  height: 120px;
}

.input-box input {
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

.code-time-limit {
  font-size: 26px;
  color: #ABB4BB;
  text-align: center;
  margin-top: 40px;
}

.code-time-limit .time-end {
  color: #B78ED9;
}

.check-code-btn {
  height: 100px;
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  line-height: 100px;
  background: #B78FDA;
  border-radius: 5px;
  margin-top: 40px;
}




</style>
