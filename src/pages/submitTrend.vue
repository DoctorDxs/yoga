<template>
  <div class="submitTrend-page">
    <div class="submit-trend-wrap">
      <textarea class="trend-text-input" placeholder="请输入你的动态" v-model.trim="content"></textarea>
    </div>
    <div class="submit-trend-imgs">
      <div v-for='(item,index) in imgs' :key='index' class="trend-imgs-box">
        <img :src="item" alt="" class="trend-img-item">
        <img src="../assets/issue_del_icon@3x.png" alt="" class="del-trend-imgs" @click="deleteImg(item, index)">
      </div>
      <div class="trend-imgs-box" v-if='videoUrl !== ""'>
        <img src="../assets/issue_del_icon@3x.png" alt="" class="del-trend-imgs" @click="deleteVideo(videoUrl)">
        <video :src="videoUrl" class="trend-img-item"></video>
        <img src="../assets/video_icon.png" alt="" class="video-icon"> 
      </div>
      <div class="add-img-box add-img" v-if='imgs.length != 0 && imgs.length < 9'>
        <img src="../assets/issue_addphoto@3x.png" alt="" class="add-img">
        <input type="file" @change="selectImg" class="input-img" name="img1" accept="image/*" ref="inputImg1">
      </div>
    </div>
    <div class="add-trend-btn">
      <div class="add-btns-box">
        <div class="add-img-btn" @click='videoUrl === "" ?  "" : toast()'>
          <img src="../assets/issue_photo_icon@3x.png" alt="">
          <span>图片</span>
          <input type="file" @change="selectImg" class="input-img1" name="img2" accept="image/*" ref="inputImg2" v-if='videoUrl === ""'>
        </div>
        <div class="add-video-btn" @click='imgs.length === 0 ? "" : toast()'>
          <img src="../assets/issue_phptp_icon@3x.png" alt="">
          <span>视频</span>
          <input type="file" @change='selectVideo' class="input-img1" accept="video/*" ref="inputVideo" v-if='imgs.length == 0'>
        </div>
      </div>
      <div class="submit-trend-btn" style='background: #B78FDA;color: #fff;'>发表</div>
    </div>
    <div class="loading-bg" v-if='showLoading'>
      <loading></loading>
    </div>
  </div>
     
</template>

<script>
import { postVideo, postImg, deleteImg, deleteVideo } from '../fetch/api'
export default {
  name: 'submitTrend',
  data () {
    return {
      type: 1,
      imgs: [],
      videoUrl: '',
      showLoading: false
    }
  },
  mounted() {
    document.getElementsByClassName('submitTrend-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  created() {
    const type = this.$route.query.type
    this.type = type
    if (type == 1) {
      document.title = '发动态'; 
    } else if (type == 2) {
     document.title = '提问题'; 
    }
  },
  methods: {
    selectImg(e) {
      const inputFile = this.$refs.inputImg1 || this.$refs.inputImg2
      if(inputFile.files[0].length !== 0){ 
        let data = new FormData();
        data.append('file', inputFile.files[0]);
        data.append('type', 6)
        this.showLoading = true
        postImg(data).then(res => {
          this.showLoading = false
          if (res.state == 200) {
            if (this.imgs.length < 10) {
              this.imgs.push(res.data[0])
            }
            inputFile.outerHTML = inputFile.outerHTML;
          } else {
            this.$toast.top(res.msg)
          }
        })
      }
    },
    selectVideo(e) {
      const inputFile = this.$refs.inputVideo
      if(this.$refs.inputVideo.files[0].length !== 0){ 
        let data = new FormData();
        data.append('file', this.$refs.inputVideo.files[0]);
        data.append('type', 6)
        this.showLoading = true
        postVideo(data).then(res => {
          this.showLoading = false
          if (res.state == 200) {
            this.videoUrl = res.data.url
            inputFile.outerHTML = inputFile.outerHTML;
          } else {
            this.$toast.top(res.msg)
          }
        })
      }
    },

    toast() {
      this.$toast.top('图片或视频只能上传一种！')
    },
    deleteImg(url, index) {
      this.showLoading = true
      deleteImg({url: url}).then(res => {
        this.showLoading = false
        if (res.state == 200) {
          this.$toast.top(res.msg)
          this.imgs.splice(index,1);
        } else {
          this.$toast.top(res.msg)
        }
      })
    },
    deleteVideo(url) {
      this.showLoading = true
      deleteVideo({url: url}).then(res => {
        this.showLoading = false
        if (res.state == 200) {
          this.videoUrl = ''
          this.$toast.top(res.msg)
        } else {
          this.$toast.top(res.msg)
        }
        
      })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.submitTrend-page {
  background: #F4F6F9;
  position: relative;
}

.submit-trend-wrap {
  background: #fff;
  padding: 30px;
}

.trend-text-input {
  border: 0;
  outline: medium;
  width: 690px;
  resize: none;
  height: 300px;
  overflow-y: scroll; 
  font-size: 32px;
  color: #444C52;
}

.trend-text-input::placeholder {
  color: #ABB5BC;
}

.trend-imgs-box {
  position: relative;
  width: 116px;
  height: 116px;
  margin-right: 22px;
  margin-bottom: 20px;
}

.submit-trend-imgs {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 30px 0;
  background: #fff;
}

.trend-img-item {
  width: 116px;
  height: 116px;
}

.del-trend-imgs {
  width: 36px;
  height: 36px;
  position: absolute;
  top: -18px;
  right: -18px;
}

.add-img-box {
  position: relative;
  margin-bottom: 20px;
}

.add-img {
  width: 116px;
  height: 116px;
}

.input-img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.add-trend-btn {
  height: 96px;
  background: #fff;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e1e2e3;
}

.add-img-btn, .add-video-btn {
  display: flex;
  align-items: center;
  position: relative;
}

.add-video-btn {
  margin-left: 64px;
}

.add-btns-box {
  font-size: 28px;
  color: #444D52;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-btns-box img {
  width: 44px;
  height: 44px;
  margin-right: 20px;
}

.input-img1 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
}

.submit-trend-btn {
  width: 120px;
  height: 66px;
  background: #E1E2E4;
  color: #1E1E1E;
  text-align: center;
  line-height: 66px;
  border-radius: 33px;
  font-size: 28px;
}

.video-icon {
  position: absolute;
  width: 38px;
  height: 38px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.loading-bg {
  background: rgba(255,255,255,0);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}





</style>
