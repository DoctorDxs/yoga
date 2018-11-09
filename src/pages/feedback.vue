<template>
  <div class="feedback-page">
    <div class="contact-title">联系方式</div>
    <div class="cantact-input"><input type="text" placeholder="QQ、手机号码、邮箱等" v-model="contact"></div>
    <div class="contact-title">反馈意见</div>
    <div class="cantact-input"><div><textarea placeholder="你的意见是我们前进的动力" v-model="content"></textarea></div></div>
    <div class="contact-title">上传图片</div>
    <div class="submit-img-btn">
      <img :src="imgUrl ? imgUrl : require('../assets/class_takephoto@3x.png')" alt="">
      <input type="file" name="file"  class="img-input" accept="image/*" ref='feedback' @change="selectImg">
    </div>
    <div class="submit-form-btn" @click="submitFeedback">提交反馈</div>
  </div>
     
</template>

<script>
import { feedBack, postImg } from '../fetch/api'
export default {
  name: 'feedback',
  data () {
    return {
      contact: '',
      content: '',
      imgUrl: '',
      imgHttp: ''
    }
  },
  created() {
    document.title = '意见反馈';
  },
  mounted() {
    document.getElementsByClassName('feedback-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    submitFeedback() {
      if (this.checkInfo() && this.imgUrl) {
        this.upload()
      } else if (this.checkInfo()) {
        this.postData()
      }
    },

    checkInfo() {
      if(!this.contact) {
        this.$toast.top('请填写联系方式！')
        return false
      } else if (!this.content) {
        this.$toast.top('请填写反馈内容！')
        return false
      } else {
        return true
      }
    },


    selectImg(e) {
      let file = e.target.files[0];
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload= () => {
          this.imgUrl = reader.result
      }
    },
    upload() {
      if(this.$refs.feedback.files[0].length !== 0){ 
        let data = new FormData();
        data.append('file', this.$refs.feedback.files[0]);
        data.append('type', 9)
        postImg(data).then(res => {
          if (res.state == 200) {
            this.imgHttp = res.data[0]
            this.postData()
          }
        })

      }
    },

    postData() {
      const params = {
        feedback_image: this.imgHttp,
        content: this.content,
        contact: this.contact,
        type: 1
      }
      feedBack(params).then(res => {
        if (res.state == 200) {
          this.$toast.top('反馈成功！')
          this.$router.go(-1)
        } else {
          this.$toast.top(res.msg)
        }
      })
    }


  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.feedback-page {
  background: #fff;
  padding: 30px;
}

.contact-title {
  font-size: 32px;
  color: #444C52;
  font-weight: 600;
  margin: 28px 0;
}

.submit-form-btn {
  height: 100px;
  color: #fff;
  border-radius: 8px;
  text-align: center;
  line-height: 100px;
  background: #B78FDA;
  font-size: 32px;
  font-weight: 600;
  margin-top: 40px;
}

.cantact-input input {
  border: 0;
  outline: medium;
  height: 100px;
  width: 100%;
  background: #F4F6F9;
  color: #ABB4BB;
  font-size: 28px;
  text-indent: 30px;
}

.cantact-input input::placeholder {
  color: #ABB4BB;
}

.cantact-input > div {
  padding: 19px 30px;
  background: #F4F6F9;
}

.cantact-input textarea {
  width: 100%;
  resize: none;
  height: 400px;
  background: #F4F6F9;
  border: 0;
  outline: medium;
  font-size: 28px;
  color: #ABB4BB;
}

.cantact-input textarea::placeholder {
  color: #ABB4BB;
}

.submit-img-btn {
  position: relative;
}

.submit-img-btn img {
  height: 144px;
  width: 144px;
}

.img-input {
  display: block;
  width: 144px;
  height: 144px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}




</style>
