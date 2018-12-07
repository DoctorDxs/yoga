<template>
  <div class="bindTel-page">
    <bg></bg>
    <div class="input-box">
      <input type="password" name='pwd1' placeholder="请设置新密码" v-model.trim="pwd1" minlength="6" maxlength="12" class="input-pwd">
      <img src="../assets/class_select_pre@3x.png" alt="" class="is-right" v-if='pwd1Right'>
    </div>

    <div class="input-box">
      <input type="password" name='pwd2' placeholder="请输入你的验证码" v-model.trim="pwd2" minlength="6" maxlength="12" class="input-pwd">
      <img src="../assets/class_select_pre@3x.png" alt="" class="is-right" v-if='pwd2Right'>
    </div>
    <div class="get-code-btn" :style='pwd1Right && pwd2Right ? "background:rgba(183,143,218,1);color:#fff;" : ""' @click="nextStep">确定</div>
    <div class="tips">*请输入6至12位密码且不含除字母和数字外的字符</div>
  </div>
     
</template>

<script>
import { changePhone } from '../fetch/api'
export default {
  name: 'inputCode',
  data () {
    return {
      pwd1: '',
      pwd2: '',
      pwd1Right: false,
      pwd2Right: false,
      mobile: '',
      captcha: ''
    }
  },
  
  activated() {
    document.title = '修改密码'
    const query = this.$route.query
    this.mobile = query.mobile
    this.captcha = query.captcha
    this.pwd1 = ''
    this.pwd2 = ''
    this.pwd1Right = false
    this.pwd2Right = false
    
  },

  watch: {
    pwd1(val) {
      // 密码是否 符合正则
      /^[\w]{6,12}$/.test(val) ? this.pwd1Right = true : this.pwd1Right = false
      if(this.pwd2) {
        this.pwd2 == val ? this.pwd2Right = true : this.pwd2Right = false
      }

    },
    pwd2(val) {
      // 密码是否相等
      this.pwd1 == val && /^[\w]{6,12}$/.test(val) ? this.pwd2Right = true : this.pwd2Right = false
    }
  },

  methods: {
    nextStep() {
      if (!this.pwd1Right) {
        this.$toast.top('请输入6至12位密码且不含除字母和数字外的字符')
      } else if (!this.pwd2Right) {
        this.$toast.top('两次密码不一致')
      } else {
        this.submitData()
      }
    },

    submitData() {
      changePhone({captcha: this.captcha, mobile: this.mobile, password: this.pwd1}).then(res => {
        if (res.state == 200) {
          this.$toast.top(res.msg)
          this.$router.go(-2)
        } else {
          this.$toast.top(res.msg)
        }
      })
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

.input-pwd {
  width: 600px;
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

.is-right {
  height: 44px;
  flex-shrink: 0;
  margin-right: 20px;
}

.tips {
  font-size:24px;
  font-weight:500;
  color:rgba(128,140,146,1);
  margin-top: 39px;
}


















</style>
