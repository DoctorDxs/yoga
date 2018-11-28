<template>
  <div class="abouts-page">
    <bg></bg>
    <div class="about-logo">
       
      <div><img :src="aboutData.logo" alt=""></div>
      <div>{{aboutData.name}}</div>
      <div>{{aboutData.android_version}}</div>

    </div>
    <div class="other-items" @click="showCodeModal">
      <div class="other-item">
        <div>公众帐号</div>
        <img src="../assets/class_next_icon@3x.png" alt="">
      </div>
    </div>

    <div class="modal-bg" v-show="showModal" @click="hideModal">
      <div class="modal-box" @click.stop="stopFather"><img :src="aboutData.qr_code" alt=""></div>
    </div>
  </div>
     
</template>

<script>
import {getAbout} from '../fetch/api.js'
export default {
  name: 'abouts',
  data () {
    return {
      aboutData: {},
      showModal: false
    }
  },
  activated() {
    document.title = '关于';
    this.getData()
  },
  mounted() {
    document.getElementsByClassName('abouts-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    getData() {
      getAbout().then(res => {
        if (res.state == 200) {
          this.aboutData = res.data
        }
      })
    },
    showCodeModal() {
      this.showModal = true
    },
    hideModal() {
      this.showModal = false
    },
    stopFather() {
      return false
    }

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

.modal-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, .5);
  top: 0;
  left: 0;
}

.modal-box {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.modal-box img {
  width: 400px;
  height: 400px;
}





</style>
