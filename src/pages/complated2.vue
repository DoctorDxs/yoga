<template>
  <div class="complated1-page">
    <div class="complated-box">
      <div class="content-box">
        <div class="complate-title">此刻的心情？</div>
        <div class="feel-content"><textarea placeholder="输入你的心情" v-model.trim="content"></textarea></div>
        <div class="icon-img"><img src="../assets/class_takephoto@3x.png" alt=""></div>
      </div>
      <div class="nex-stupe" @click="linkNext">完成</div>
    </div>
  </div>
     
</template>

<script>

export default {
  name: 'complated2',
  data () {
    return {
      content: ''
    }
  },
  created() {
    
  },
  mounted() {
    document.title = '完成情况';
     document.getElementsByClassName('complated1-page')[0].style.minHeight = window.innerHeight + 'px'
  },

 

  methods: {
    
    linkNext() {
      this.$router.push({
        name: 'complated3'
      })
    }
  },
  components: {
    
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.complated1-page {
  background: #fff;
  position: relative;
}

.complated-box {
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
  width: 690px;
  top:  140px;
  box-shadow: 0 6px 24px rgba(0,0,0,.1);
  background: #fff;
  height: 650px;
}

.complate-title {
  font-size: 36px;
  color: #2F343C;
  text-align: center;
  margin: 70px 0 20px;
}

.nex-stupe {
  width: 100%;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
  font-size: 36px;
  background: #B78FDA;
  margin-top: 150px;
  border-radius: 8px;
}

.feel-content {
  padding: 60px;
}

.feel-content textarea {
  width: 570px;
  border: 0;
  outline: medium;
  font-size: 28px;
  height: 160px;
}

.feel-content textarea::placeholder {
  color: #818C92;
}

.icon-img {
  padding: 0 60px 0;
}

.icon-img img {
  width: 144px;
  height: 144px;
}





</style>
