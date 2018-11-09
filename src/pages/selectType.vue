<template>
  <div class="selectType-page">
    <div class="selext-box">
      <div class="select-item">
        <div>不使用折扣</div>
        <div><img src="../assets/class_select_nor@3x.png" alt=""></div>
      </div>
      <div class="select-item">
        <div class="s-vip">
          <div>私教会员9折</div>
          <div class="s-vip-icon">成为会员享受专属折扣</div>
        </div>
        <div><img src="../assets/class_select_pre@3x.png" alt=""></div>
      </div>
    </div>

  </div>
  
</template>

<script>
export default {
  name: 'selectType',
  data () {
    return {
      type: null
    }
  },
  created() {
    const type = this.$route.query.type
    
    document.title = '会员折扣';
  
  },
  mounted() {
    document.getElementsByClassName('selectType-page')[0].style.minHeight = window.innerHeight + 'px'
  },

  methods: {
    
  },
  components: {
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.selectType-page {
  background: #F0F2F7;
  padding-top: 20px;
}

.select-item {
  background: #fff;
  height: 120px;
  border-bottom: 1px solid #f0f2f7;
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
