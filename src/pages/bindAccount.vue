<template>
  <div class="bindAccount-page">
    <bg></bg>
    <div class="account-info-item" @click="changeTEL">
      <div>手机号码</div>
      <div class="item-detail"><span>{{phone ? phone : '未绑定'}}</span><img src="../assets/class_next_icon@3x.png" alt=""></div>
    </div>
    <div class="account-info-item" >
      <div>微信</div>
      <div class="item-detail"><span>已绑定</span><img src="../assets/class_next_icon@3x.png" alt=""></div>
    </div>
    <div class="account-info-item" style="margin-top: 20px;" @click="linkEditPawd">
      <div>{{has_set_password == 1 ? "修改密码" : "设置密码"}}</div>
      <div class="item-detail"><span></span><img src="../assets/class_next_icon@3x.png" alt=""></div>
    </div>
    <modal 
      title="提示" 
      content='是否更改已绑定的手机号'
      :showCancle='showCancle' 
      @on-confirm='confirm'
      @on-cancel="cancel" 
      v-show='showModal'>
    </modal>
  </div>
     
</template>

<script>

export default {
  name: 'bindAccount',
  data () {
    return {
      phone: '',
      showCancle:　true,
      showModal: false,
      setPassword: 0
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
    this.setPassword = userInfo.has_set_password
  },
  
  methods: {

    changeTEL() {
      this.showModal = true
    },
    confirm() {
      this.showModal = false
      this.$router.push({
        name: 'bindTel', query: {type: 1}
      })
    },
    cancel() {
      this.showModal = false
    },
    linkEditPawd() {
      this.$router.push({name: 'inputCode', query:{isSet: this.userInfo.has_set_password}})
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
