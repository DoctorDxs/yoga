<template>
  <div class="complated1-page">
    <div class="complated-box">
      <div class="content-box">
        <div class="complate-title">你完成了</div>
        <div class="course-title">21天瑜伽训练营·热身训练</div>
        <div class="complate-time">9月10日 星期一 10:10</div>
        <div class="complate-feel">感觉如何？</div>
        <div class="complate-icon">
          <div @click="selectThis(index)" v-for='(item, index) in iconType' :key='index'>
            <div><img :src="selectIndex == index ? item.selectIcon : item.icon" alt=""></div>
            <div :style="selectIndex == index ? 'color: #2E333B' : ''">{{item.text}}</div>
          </div>
        </div>
      </div>
      <div class="nex-stupe" @click="linkNext">下一步</div>
    </div>
  </div>
     
</template>

<script>

export default {
  name: 'complated1',
  data () {
    return {
      iconType: [
        {icon: require('../assets/class_view01_nor@3x.png'), selectIcon: require('../assets/class_view01_press@3x.png'), text: '吃力'},
        {icon: require('../assets/class_view02_nor@3x.png'), selectIcon: require('../assets/class_view02_press@3x.png'), text: '刚刚好'},
        {icon: require('../assets/class_view03_nor@3x.png'), selectIcon: require('../assets/class_view03_press@3x.png'), text: '轻松'},
      ],
      selectIndex: 0
    }
  },
  created() {
    const query = this.$route.query
    this.group_id = query.group_id,
    this.learn_id = query.learn_id,
    this.good_name = query.good_name
    this.videoTime = query.videoTime
    this.type = query.type
  },
  mounted() {
    document.title = '完成情况';
     document.getElementsByClassName('complated1-page')[0].style.minHeight = window.innerHeight + 'px'
  },

 

  methods: {
    selectThis(index) {
      this.selectIndex = index
    },
    linkNext() {
      this.$router.push({
        name: 'complated2', query: {group_id: this.group_id, learn_id: this.learn_id, feel: this.selectIndex + 1, good_name: this.good_name, type: this.type,videoTime: this.videoTime}
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

.course-title {
  font-size: 36px;
  color: #2F343C;
  text-align: center;
}

.complate-time {
  color: #818C92;
  text-align: center;
  font-size: 24px;
  margin: 20px 0 80px;
}

.complate-feel {
  font-size: 36px;
  color: #2E333B;
  text-align: center;
  
}

.complate-icon {
  display: flex;
  justify-content: space-around;
  font-size: 26px;
  color: #ABB5BC;
  width: 500px;
  margin: 60px auto 0;
  text-align: center;
}

.complate-icon img {
  width: 100px;
  height: 100px;
  margin-bottom: 18px;
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





</style>
