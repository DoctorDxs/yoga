<template>
  <div class="selectType-page">
    <div class="selext-box" v-if='type == 2'>
      <div class="select-item" @click="selectThis(1)">
        <div>不使用折扣</div>
        <div>
          <img src="../assets/class_select_nor@3x.png" alt="" v-if='selectIndex != 1'>
          <img src="../assets/class_select_pre@3x.png" alt="" v-if='selectIndex == 1'>
        </div>
      </div>
      <div class="select-item" @click="selectThis(2)" v-if='vip_discount != 100'>
        <div class="s-vip">
          <div>会员{{ vip_discount == '0' ? '免费' :  vip_discount}}折</div>
          <div class="s-vip-icon" v-if='userInfo.status == 0'  @click.stop="linkBevip">成为会员享受专属折扣</div>
        </div>
        <div>
          <img src="../assets/class_select_nor@3x.png" alt="" v-if='selectIndex != 2'>
          <img src="../assets/class_select_pre@3x.png" alt="" v-if='selectIndex == 2'>
        </div>
      </div>
    </div>

    <div class="selext-box" v-if='type == 1'>
      <div class="select-item" @click="selectThis(1)">
        <div>不使用折扣</div>
        <div>
          <img src="../assets/class_select_nor@3x.png" alt="" v-if='selectIndex != 1'>
          <img src="../assets/class_select_pre@3x.png" alt="" v-if='selectIndex == 1'>
        </div>
      </div>
      <div class="select-item" @click="selectThis(2)" v-if='vip_discount != 10'>
        <div class="s-vip">
          <div>私教会员{{vip_discount == '0' ? '免费' : vip_discount}}折</div>
          <div class="s-vip-icon" v-if='userInfo.status != 2' @click.stop="linkBevip">成为会员享受专属折扣</div>
        </div>
        <div>
          <img src="../assets/class_select_nor@3x.png" alt="" v-if='selectIndex != 2'>
          <img src="../assets/class_select_pre@3x.png" alt="" v-if='selectIndex == 2'>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'selectType',
  data () {
    return {
      type: null,
      selectIndex: 1
    }
  },
  activated() {
    const query = this.$route.query
    this.type = query.type
    this.vip_discount = query.vip_discount
    let userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
    };
    this.selectIndex = 1
    this.userInfo = userInfo
    document.title = '会员折扣';
    let vip = localStorage.getItem('vip')
  },
  mounted() {
    document.getElementsByClassName('selectType-page')[0].style.minHeight = window.innerHeight + 'px'
  },

  methods: {
    linkBevip() {
      this.$router.push({
        name: 'beVip'
      })
    },
    selectThis(selectIndex) {
      
      if (selectIndex == 2) {
        if (this.type == 2) {
          if (this.userInfo.status == 0) {
            this.$toast.top('您还不是会员，请先成为会员')
          } else {
            this.selectIndex = selectIndex
            localStorage.setItem('vip', true)
          } 
        } else {
          if (this.userInfo.status != 2) {
            this.$toast.top('您还不是私教会员，请先成为私教会员')
          }  else {
            this.selectIndex = selectIndex
            localStorage.setItem('vip', true)
          } 
        }
      } else {
        localStorage.setItem('vip', false)
      }
    }
  },
  components: {
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.selectType-page {
  background: #F4F6F9;
  padding-top: 20px;
}

.select-item {
  background: #fff;
  height: 120px;
  border-bottom: 1px solid #F4F6F9;
  font-size: 30px;
  color: #444C52;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
}

.select-item img {
  width: 44px;
  height: 44px;
}

.s-vip {
  display: flex;
  align-items: center;
}

.s-vip-icon {
  height: 66px;
  line-height: 66px;
  margin-left: 22px;
  width: 370px;
  text-align: center;
  color: #FAF7CC;
  font-size: 32px;
  background: -webkit-linear-gradient(45deg, #E6C67F,#E1BB6F, #DDB463,#D9AC57, #D9AC57);
}




</style>
