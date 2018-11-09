<template>
  <div class="login-page">
    <div>Hi~</div>
    <div>亲爱的伽人</div>
    <div>请使用微信登录</div>
    <div class="login-btn" @click="wxLogin">
      <div>
        <img src="../assets/all_wechat_icon@3x.png" alt="" class="login-icon">
        <div>微信登录</div>
      </div>
    </div>
  </div>
     
</template>

<script>
import { login } from '../fetch/api'
export default {
  name: 'login',
  data () {
    return {
      
    }
  },
  created() {
    document.title = '登录';
  },
  methods: {
    wxLogin() {
      this.$router.push({name: 'bindTel'})

      // login()
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-page {
  padding: 30px;
  margin-top: 50px;
}

.login-page > div:nth-child(1), 
.login-page > div:nth-child(2),
.login-page > div:nth-child(3) {
  font-size: 40px;
  color: #2E333B;
  font-weight: 600;
  margin-left: 66px;
  margin-bottom: 70px;
}

.login-btn {
  background: #B78FDA;
  height: 100px;
  font-size: 32px;
  color: #fff;
  font-weight: 600;
  line-height: 100px;
  display: flex;
  border-radius: 5px;
}

.login-btn > div {
  margin: auto;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.login-icon {
  width: 46px;
  height: 40px;
  margin-right: 26px;
  flex-shrink: 0;
}

</style>
