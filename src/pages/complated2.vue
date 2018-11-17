<template>
  <div class="complated1-page">
    <div class="complated-box">
      <div class="content-box">
        <div class="complate-title">此刻的心情？</div>
        <div class="feel-content"><textarea placeholder="输入你的心情" v-model.trim="content"></textarea></div>
        <div class="icon-img">
          <img :src="imgs ? imgs : require('../assets/class_takephoto@3x.png')" alt="">
          <input type="file" @change="selectImg" class="input-img" name="img1" accept="image/*" ref="inputImg1">
        </div>
      </div>
      <div class="nex-stupe" @click="submitTrends">完成</div>
    </div>
  </div>
     
</template>

<script>
import { postImg, addTrend } from '../fetch/api'
export default {
  name: 'complated2',
  data () {
    return {
      content: '',

      imgs: ''
    }
  },
  created() {
    const query = this.$route.query
    this.group_id = query.group_id,
    this.learn_id = query.learn_id,
    this.good_name = query.good_name
    this.videoTime = query.videoTime
    this.type = query.type
    this.feel = query.feel
  },
  mounted() {
    document.title = '完成情况';
     document.getElementsByClassName('complated1-page')[0].style.minHeight = window.innerHeight + 'px'
  },

 

  methods: {
    selectImg(e) {
      const inputFile = this.$refs.inputImg1
      if(inputFile.files[0].length !== 0){ 
        let data = new FormData();
        data.append('file', inputFile.files[0]);
        data.append('type', 6)
        postImg(data).then(res => {
          if (res.state == 200) {
            this.imgs = res.data[0]
            inputFile.value = ''
          } else {
            this.$toast.top(res.msg)
          }
        })
      }
    },

    submitTrends() {
      if (this.content || this.imgs) {
        const params = {
          group_id: this.group_id,
          learn_id: this.learn_id,
          content: this.content,
          image_paths: this.imgs,
          type: 1,
          feel: this.feel
        }
        addTrend(params).then(res => {
          if (res.state == 200) {
            this.$toast.top(res.msg)
            this.$router.push({
              name: 'complated3', query: {good_name: this.good_name,group_id: this.group_id, type: this.type,videoTime:this.videoTime}
            })
          } else {
            this.$toast.top(res.msg)
          }
        })
      } else {
        this.$toast.top('请填写心情或选择图片！')
      }
    },

    
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
  resize: none;
}

.feel-content textarea::placeholder {
  color: #818C92;
}

.icon-img {
  margin-left: 60px;
  position: relative;
}

.icon-img img {
  width: 144px;
  height: 144px;
}

.input-img {
  position: absolute;
  width: 144px;
  height: 144px;
  top: 0;
  left: 0;
  opacity: 0;
}





</style>
