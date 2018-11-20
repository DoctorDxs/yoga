<template>
  <div class="abouts-page">
    <div class="about-logo">
       
      <div><img src="http://img2.touxiang.cn/file/20180308/8eefd445e3718259d0044314a4289060.jpg" alt=""></div>
      <div>轻伽瑜伽</div>
      <div>v.1.0.0</div>

    </div>
    <div class="other-items">
      <div class="other-item">
        <div>公众帐号</div>
        <img src="../assets/class_next_icon@3x.png" alt="">
      </div>
    </div>

  </div>
     
</template>

<script>

export default {
  name: 'abouts',
  data () {
    return {
      
    }
  },
  activated() {
    document.title = '关于';
  },
  mounted() {
    document.getElementsByClassName('abouts-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    
  },
  components: {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.abouts-page {
  background: #F4F6F9;
}

.about-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-logo img {
  width: 120px;
  height: 120px;
  background-color: #fff;
  border-radius: 50%;
  margin-top: 112px;
}

.about-logo > div:nth-child(2) {
  font-size: 30px;
  color: #444C52;
  margin-top: 52px;
}

.about-logo > div:nth-child(3) {
  font-size: 24px;
  color: #ABB5BC;
  margin-top: 22px;
}

.other-items {
  margin-top: 110px;
}

.other-item {
  background: #fff;
  font-size: 30px;
  color: #444C52;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 120px;
  border-bottom: 1px solid #e1e2e3;
}

.other-item:nth-child(2) {
  border-bottom: 0;
}

.other-item img {
  width: 18px;
  height: 30px;
}





</style>
