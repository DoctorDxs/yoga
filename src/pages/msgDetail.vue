<template>
  <div class="msgDetail-page">
    <div class="trend-msg">
      <div class="msg-type">
        <div class="msg-title">
          <div class="msg-type-icon">
            <img src="http://img2.touxiang.cn/file/20180308/8eefd445e3718259d0044314a4289060.jpg" alt="">
          </div>
          <div>
            <div class="msg-type-title">用户名</div>
            <div class="msg-tips" v-if='type == 3'>赞了你</div>
            <div class="msg-tips" v-if='type == 1'>评论了你 | 回复了你</div>
            <div class="msg-tips" v-if='type == 2'>回答了你</div>
          </div>
        </div>
        <div>
          <div class="msg-time">1小时前</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'msgDetail',
  data () {
    return {
      type: null
    }
  },
  created() {
    const type = this.$route.query.type
    this.type = type
    if (type == 1) {
      document.title = '评论回复通知'
    } else if (type == 2){
      document.title = '回答通知'
    } else if (type == 3) {
      document.title = '点赞通知'
    } 
    // else if (type == 4) {
    //   document.title = '系统通知'
    // }
  },
  mounted() {
    document.getElementsByClassName('msgDetail-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    
  },
  components: {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.msgDetail-page {
  background: #F0F2F7;
  padding-top: 20px;
}

.trend-msg {
  background: #fff;
}

.msg-type {
  height: 120px;
  padding: 0 30px;
  border-bottom: 1px solid  #e1e2e3;
  display: flex;
  justify-content: space-between;
  align-items: center;display: flex;
  justify-content: space-between;
  align-items: center;
}

.msg-type img {
  width: 80px;
  height: 80px;
  margin-right: 32px;
}

.msg-title {
  display: flex;
  align-items: center;
}

.msg-type-title {
  font-size: 28px;
  color: #444C52;
}

.msg-tips, .msg-time {
  font-size: 24px;
  color: #ABB3BA;
}







</style>
