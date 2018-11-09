<template>
  <div class="complated3-page">
    <a id='grow-img' hidden></a>

    <div class="complated-box">
      <div class="content-box">
        <div class="complate-title">发布成功</div>
        <div class="complate-time">把动态分享给更多小伙伴吧</div>
        <div class="canvs-img" id='downCavas'>
          <img :src="canvasImg" alt="" crossOrigin='*'>
          <div class="contribulite-text">恭喜你完成了</div>
          <div class="course-title">21天瑜伽训练营·热身训练</div>
          <div class="motto-text">“{{mottoText}}”</div>
          <div class="my-info">
            <div><img src="../assets/class_download@3x.png" alt="" crossOrigin='*'></div>
            <div>
              <div class="username">用户名</div>
              <div class="complate-time2">9月10日 星期一 10:10</div>
            </div>
          </div>
          <div class="this-port">
            <div>本次运动</div>
            <div>
              <span class="study-time">32:12</span>
              <span class="time-unit">min</span>
            </div>
          </div>
        </div>
        <div class="change-btn" @click="changeImg">换一换</div>
        <div class="img-opearte-btns">
          <div class="opearte-btns-box" @click="saveImg">
            <div><img src="../assets/class_download@3x.png" alt=""></div>
            <div>保存图片</div>
          </div>
          <div class="opearte-btns-box">
            <div><img src="../assets/class_share01@3x.png" alt=""></div>
            <div>分享好友</div>
          </div>
          <div class="opearte-btns-box">
            <div><img src="../assets/class_share02@3x.png" alt=""></div>
            <div>分享朋友圈</div>
          </div>
        </div>
      </div>
    </div>
  </div>
     
</template>

<script>
import html2canvas from 'html2canvas'
const mottoTexts = [
        '你从什么时候开始瑜伽，你的年龄就停在什么时候。',
        '瑜伽如同一面镜子，让我们由内而外看向自己。',
        '瑜伽不是垫子上的2小时，而是带着瑜伽式头脑生活的24小时。',
        '瑜伽时，你的一呼一吸都是与天地的“亲密接触”。',
        '瑜伽中，你的身心同在当下。',
        '身体是你的庙宇，保持身体的纯净吧，因为灵魂就居于其中。',
        '瑜伽吧，岁月不会辜负你的努力！',
        '瑜伽不需用华丽的语言去赞美它，只有实践才能表达它的真正意义。',
        '每个人的内在都潜伏着神性的火花，瑜伽使之熊熊燃烧。',
        '如果你无法让身体寂静，你也不会懂得心之寂静。',
        '瑜伽，就是让你成为自己身体和意识的主人。',
        '当你变得越来越努力越来越成熟，你会骄傲的发现，战胜自己比超越别人更有成就感。',
        '长得漂亮是优势，活得漂亮是本事，变得越来越漂亮是坚持！',
        '瑜伽不仅仅是锻炼，而是内在、心灵与身体的合一',
        '瑜伽的影响绝不仅限于身体层面，如果正确练习，体式将架起连结身心的桥梁。',
        '你的时间是有限的，所以不要浪费时间活在别人的生命中。',
        '生活从来不会允诺一份轻松，别轻易认输！',
        '瑜伽体位法的学习不是关于掌控体式；而是要用体式来了解自己和让自己发生蜕变。',
        '不一样的瑜伽人生，由你自己决定',
        '瑜伽跟旅行，总有一个在路上。',
        '瑜伽之中，有一个印象标志--蛇吞尾。开始便是结束，结束便是开始。如此循环下去的只有人心。',
        '瑜伽，让我看到了生活中的快乐与美好。',
      ]
export default {
  name: 'complated3',
  data () {
    return {
      mottoText: mottoTexts[Math.floor(Math.random()*(22))],
      canvasImg: require(`../assets/class_picturebg${Math.ceil(Math.random()*32)}.jpg`),
    }
  },
  created() {
    
  },
  mounted() {
    document.title = '完成情况';
    document.getElementsByClassName('complated3-page')[0].style.minHeight = window.innerHeight + 'px'
  },

 

  methods: {
    changeImg() {
      this.canvasImg = require(`../assets/class_picturebg${Math.ceil(Math.random()*32)}.jpg`)
      this.mottoText = mottoTexts[ Math.floor(Math.random()*(22))]
    },
    saveImg() {
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
        const image = new Image();
        const aEl = document.getElementById('grow-img')
        aEl.setAttribute('href', imgUrl)
        aEl.setAttribute('download', ("0000000" + 100000000 * Math.random()).match(/(\d{8})(\.|$)/)[1])
        aEl.click()
      });
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
