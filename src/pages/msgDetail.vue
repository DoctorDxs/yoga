<template>
  <div class="msgDetail-page">
    <div class="trend-msg" v-for='(item, index) in msgList' :key='index'>
      <div class="msg-type" >
        <div class="msg-title">
          <div class="msg-type-icon">
            <img :src="item.user_avatar" alt="">
          </div>
          <div :style='item.is_read == "1" ? "color: #D9DEEC" : ""'>
            <div class="msg-type-title" :style='item.is_read == "0" ? "color: #D9DEEC" : ""'>{{item.username}}</div>
            <div class="msg-tips" v-if='type == 1' :style='item.is_read == "0" ? "color: #D9DEEC" : ""'>评论了你 | 回复了你</div>
            <div class="msg-tips" v-if='type == 2' :style='item.is_read == "0" ? "color: #D9DEEC" : ""'>回答了你</div>
            <div class="msg-tips" v-if='type == 3' :style='item.is_read == "0" ? "color: #D9DEEC" : ""'>赞了你</div>
          </div>
        </div>
        <div>
          <div class="msg-time" :style='item.is_read == "0" ? "color: #D9DEEC" : ""'>{{item.time_desc}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { msgList } from	'../fetch/api.js'
export default {
  name: 'msgDetail',
  data () {
    return {
      type: null,
      msgList: []
    }
  },
  created() {
    const type = this.$route.query.type
    this.type = type
    if (type == 1) {
      document.title = '评论回复通知'
      this.getData(1)
    } else if (type == 2){
      document.title = '回答通知'
      this.getData(2)
    } else if (type == 3) {
      document.title = '点赞通知'
      this.getData(3)
    } 
  },
  mounted() {
    document.getElementsByClassName('msgDetail-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    getData(type) {
      msgList(type).then(res => {
        if (res.state == 200) {
          this.msgList = res.data.data
        }
      })
    }
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
