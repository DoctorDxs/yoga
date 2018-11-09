<template>
  <div class="setting-page">
    
    <div class="set-item" @click="linkAccount">
      <div>帐号设置</div>
      <div><img src="../assets/class_next_icon@3x.png" alt=""></div>
    </div>

    <div class="set-item-box">

      <div class="set-item" @click="linkSysSetting">
        <div>系统设置</div>
        <div><img src="../assets/class_next_icon@3x.png" alt=""></div>
      </div>
    </div>


    <div class="set-item-box">
      <div class="set-item" @click="linkFeedback">
        <div>意见反馈</div>
        <div><img src="../assets/class_next_icon@3x.png" alt=""></div>
      </div>

      <div class="set-item" @click="linkAbout">
        <div>关于</div>
        <div><img src="../assets/class_next_icon@3x.png" alt=""></div>
      </div>
    </div>

  </div>
     
</template>

<script>

export default {
  name: 'setting',
  data () {
    return {
      
    }
  },
  created() {
    document.title = '设置';
  },
  mounted() {
    document.getElementsByClassName('setting-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    linkFeedback() {
      this.$router.push({name: 'feedback'})
    },
    linkAccount() {
      this.$router.push({name: 'accountSet'})
    },
    linkAbout() {
      this.$router.push({name: 'abouts'})
    },
    linkSysSetting() {
      this.$router.push({name: 'sysSetting'})
    }
  },
  components: {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setting-page {
  background: #F4F6F9;
}

.set-item {
  height: 120px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 30px;
  color: #444C52;
  background: #fff;
  border-bottom: 1px solid #e1e2e3;
}

.set-item img {
  width: 18px;
  height: 30px;
}

.set-item-box {
  margin-top: 20px;
}




</style>
