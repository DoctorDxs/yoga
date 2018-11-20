<template>
  <div class="complated3-page">
    <div class="complated-box">
      <div class="content-box">
        <div class="complate-title">发布成功</div>
        <div class="complate-time">把动态分享给更多小伙伴吧</div>
        <div class="canvs-img" id='downCavas' v-if='showImg'>
          <img :src="canvasImg" alt="">
          <div class="contribulite-text">恭喜你完成了</div>
          <div class="course-title">{{good_name}}</div>
          <div class="motto-text">“{{mottoText}}”</div>
          <div class="my-info">
            <div><img :src="userInfo.avatar" alt=""></div>
            <div>
              <div class="username">{{userInfo.username}}</div>
              <div class="complate-time2">{{sendTime}}</div>
            </div>
          </div>
          <div class="this-port">
            <div>本次运动</div>
            <div>
              <span class="study-time">{{videoTime}}</span>
              <span class="time-unit">min</span>
            </div>
          </div>
        </div>
        <div class="canvs-img" v-if='!showImg'>
          <img :src="imgUrl" alt="">
        </div>
        <div class="change-btn" @click="changeImg">换一换</div>
        <div class="img-opearte-btns">
          <div class="opearte-btns-box" @click="saveImg">
            <div><img src="../assets/class_download@3x.png" alt=""></div>
            <div>保存图片</div>
          </div>
          <div class="opearte-btns-box" @click="shareTips">
            <div><img src="../assets/class_share01@3x.png" alt=""></div>
            <div>分享好友</div>
          </div>
          <div class="opearte-btns-box" @click="shareTips">
            <div><img src="../assets/class_share02@3x.png" alt=""></div>
            <div>分享朋友圈</div>
          </div>
        </div>
      </div>
    </div>
    <modal 
      title="提示" 
      :content='modalContent'
      :showCancle='showCancle' 
      confirmText=''
      cancleText=''
      @on-cancel="cancel" 
      @on-confirm='confirm'
      v-show='showModal'>
    </modal>
  </div>
     
</template>

<script>
import html2canvas from 'html2canvas'
import { shareImg, getSign, getShareInfo } from '../fetch/api.js'
export default {
  name: 'complated3',
  data () {
    return {
      mottoText: '',
      canvasImg: '',
      userInfo: {},
      sendTime: '',
      goods_name: '',
      showModal: false,
      shareInfo: {},
      imgUrl: '',
      showImg: true,
      showCancle: false,
      modalContent: '请点击窗口右上角来分享至微信好友或朋友圈',
    }
  },
  activated() {
    const query = this.$route.query
    this.good_name = query.good_name
    this.type = query.type
    this.group_id = query.group_id
    this.videoTime = videoTime
    let userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
    };
    this.userInfo = userInfo
    this.getData()
    let date = new Date(); 
    let week = date.getDay(); 
    let weeks = ["日","一","二","三","四","五","六"]; 
    let getWeek = "星期" + weeks[week]; 
    this.sendTime = `${date.getMonth()+1}月${date.getDate()}日 ${getWeek} ${date.getHours()}:${date.getMinutes()}`
  },
  mounted() {
    document.title = '完成情况';
    document.getElementsByClassName('complated3-page')[0].style.minHeight = window.innerHeight + 'px'
  },

 

  methods: {
    getSign() {
      getSign(encodeURIComponent(location.href)).then(res => {
        if (res.state == 200) {
          this.setConfig(res.data)
        }
      })
    },
    getShareInfo() {
      const params = {
        id: this.group_id,
        type: 1
      }
      getShareInfo(params).then(res => {
        if (res.state == 200) {
          this.shareInfo = res.data
          this.getSign()
        }
      })
    },
    setConfig(params) {
      wx.config({
        debug: false, // 开启调试模式,
        appId: params.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: params.timeStamp, // 必填，生成签名的时间戳
        nonceStr: params.nonceStr, // 必填，生成签名的随机串
        signature: params.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      this.onShare()
    },

    onShare() {

      let shareInfo = this.shareInfo
      wx.ready(function(){
        wx.checkJsApi({
          jsApiList: [
            'onMenuShareAppMessage','onMenuShareTimeline'
          ],
        });
        // 分享到盆友圈
        wx.onMenuShareTimeline({
          title: shareInfo.title,
          link: shareInfo.url,
          imgUrl: shareInfo.cover,
          success: function(res) {
            this.$toast.top('分享成功！')
          },
        })
      //分享给朋友
        wx.onMenuShareAppMessage({
          title: shareInfo.title,
          desc: shareInfo.desc,
          link: shareInfo.url,
          imgUrl: shareInfo.cover,
          success: function() {
            this.$toast.top('分享成功！')
          }
        })
      })
    },


    changeImg() {
      this.getData()
    },

    createImg() {
      let that = this
      let content_html = document.getElementById('downCavas');　　　　//要转化的div
      let width = content_html.offsetWidth;
      let height = content_html.offsetHeight;
      let offsetTop = content_html.offsetTop;
      let canvas = document.createElement("canvas");
      let context = canvas.getContext('2d');
      let scaleBy = Math.ceil(window.devicePixelRatio);
      canvas.width = width*scaleBy;
      canvas.height = (height+offsetTop)*scaleBy;
      context.scale(scaleBy,scaleBy);
      var opts = {
        allowTaint:true,//允许加载跨域的图片
        tainttest:true, //检测每张图片都已经加载完成
        scale:scaleBy, // 添加的scale 参数
        canvas:canvas, //自定义 canvas
        logging: false, //日志开关，发布的时候记得改成false
        width:width, //dom 原始宽度
        height:height //dom 原始高度
      };
      html2canvas(content_html,opts).then(function (canvas) {
        canvas.style.width = width+"px";
        canvas.style.height = height+"px";
        const imgUrl = canvas.toDataURL("image/png")
        that.imgUrl = imgUrl
        that.showImg = false
      });
    },

    saveImg() {
      this.modalContent = '请长按上图保存至相册'
      this.showModal = true
    },
     
    getData() {
      shareImg().then(res => {
        if (res.state == 200) {
          this.canvasImg = res.data.image.content
          this.mottoText = res.data.string.content
          this.getShareInfo()
          this.createImg()
        } else {
          this.$toast.top(res.msg)
        }
      })
    },
    shareTips() {
      this.showModal = true
      this.modalContent = '请点击窗口右上角来分享至微信好友或朋友圈'
    },
    cancel() {
      this.showModal = false
    },
    confirm() {
      this.showModal = false
    }
  },
  components: {
    
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.complated3-page {
  background: #fff;
  position: relative;
  padding-bottom: 160px;
}

.complated-box {
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
  width: 690px;
  top: 60px;
}

.complate-title {
  font-size: 36px;
  color: #2F343C;
  text-align: center;
}

.complate-time {
  color: #818C92;
  text-align: center;
  font-size: 26px;
  margin: 24px 0 50px;
}

.canvs-img {
  position: relative;
  color: #fff;
  width: 100%;
  height: 690px;
}

.canvs-img > div {
  position: absolute;
}


.canvs-img img {
  width: 100%;
  height: 690px;
}

.contribulite-text {
  position: absolute;
  font-size: 30px;
  font-weight: 600;
  left: 40px;
  top: 40px;
}

.course-title {
  font-size: 36px;
  font-weight: 600;
  left: 40px;
  top: 80px;
}

.motto-text {
  font-size: 36px;
  font-weight: 600;
  left: 40px;
  bottom: 194px;
  width: 610px;
}

.my-info {
  display: flex;
  bottom: 40px;
  left: 40px;
}

.my-info img {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  margin-right: 18px;
}

.username {
  font-size: 28px;
}

.complate-time2 {
  font-size: 20px;
}

.this-port {
  right: 40px;
  bottom: 40px;
}

.this-port > div:nth-child(1) {
  font-size: 20px;
}

.study-time {
  font-size: 60px;
  font-weight: 600;
}

.time-unit {
  font-size: 30px;
  font-weight: 600;
}

.change-btn {
  width: 156px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 25px;
  font-size: 26px;
  color: #444C52;
  border: 2px solid #efefef;
  margin: 52px auto 0;
}

.img-opearte-btns {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  width: 480px;
  margin: 54px auto 0;
}

.opearte-btns-box {
  color: #808C92;
  font-size: 26px;
}

.opearte-btns-box img {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}


</style>
