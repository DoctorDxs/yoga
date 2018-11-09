<template>
  <div class="bindTel-page">
    <div class="input-box">
      <input type="number" name='tel' placeholder="请输入手机号码" v-model="phone" maxlength="11">
    </div>
    <div class="get-code-btn" @click="getCode">获取验证码</div>
  </div>
     
</template>

<script>
import {sedCode} from '../fetch/api'
export default {
  name: 'bindTel',
  data () {
    return {
      phone: '',
      type: 1
    }
  },
  created() {
    document.title = '绑定手机号码'
    const query = this.$route.query
    if (query.type) {
      this.type = query.type
    } else {
      this.type = 1
    }
  },
  mounted() {
    document.getElementsByClassName('bindTel-page')[0].style.minHeight = window.innerHeight + 'px'
  },

  methods: {
    getCode() {
      if (this.phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
        this.sedCode()
      } else {
        this.$toast.top('请输入正确的手机号码！')
      }
    },
    sedCode() {
      sedCode({type: this.type, mobile: this.phone}).then(res => {
        if (res.state == 200) {
          this.$toast.top('短信验证码已发')
          this.$router.push({name: 'inputCode',query: {phone: this.phone, type: this.type}})
        } else {
          this.$toast.top(res.data.msg)
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

.get-code-btn {
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
