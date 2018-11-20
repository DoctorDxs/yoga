<template>
  <div class="bindAccount-page">
    
    <div class="account-info-item" @click="changeTEL(phone ? 2 : 1)">
      <div>手机号码</div>
      <div class="item-detail"><span>{{phone ? phone : '未绑定'}}</span><img src="../assets/class_next_icon@3x.png" alt=""></div>
    </div>
    <div class="account-info-item" >
      <div>微信</div>
      <div class="item-detail"><span>已绑定</span></div>
    </div>
    
  </div>
     
</template>

<script>

export default {
  name: 'bindAccount',
  data () {
    return {
      phone: ''
    }
  },
  activated() {
    document.title = '账号绑定';
    let userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
    };
    this.userInfo = userInfo
    let phone = userInfo.mobile
    phone = phone.substring(0,3) + '****' + phone.substring(7,11)
    this.phone = phone
  },
  mounted() {
    document.getElementsByClassName('bindAccount-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    changeTEL(type) {
      this.$router.push({
        name: 'bindTel', query: {type: type}
      })
    }
  },
  components: {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bindAccount-page {
  background: #F4F6F9;
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

.item-detail img {
  width: 18px;
  height: 30px;
  margin-left: 20px;
}







</style>
