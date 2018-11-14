<template>
  <div class="mineMsg-page" ref='page_bg'>
    <div class="trend-msg" @click="linkDetail(1)">
      <div class="msg-type">
        <div class="msg-title">
          <div class="msg-type-icon">
            <img src="../assets/message_comment@3x.png" alt="">
          </div>
          <div>
            <div class="msg-type-title">评论通知</div>
            <div class="msg-tips">{{reply.count === "0" ? '无新消息' : reply.username + ' 评论了你'}}</div>
          </div>
        </div>
        <div v-if='reply.count !== "0"'>
          <div class="msg-time">{{reply.time_desc}}</div>
          <div class="msg-num"><span>{{reply.count}}</span></div>
        </div>
      </div>
    </div>
    <div class="trend-msg" @click="linkDetail(2)">
      <div class="msg-type">
        <div class="msg-title">
          <div class="msg-type-icon">
            <img src="../assets/message_questicon@3x.png" alt="">
          </div>
          <div>
            <div class="msg-type-title">回答通知</div>
            <div class="msg-tips">{{answer.count === "0" ? '无新消息' : answer.username + ' 回答了你的问题'}}</div>
          </div>
        </div>
        <div v-if='answer.count !== "0"'>
          <div class="msg-time">{{answer.time_desc}}</div>
          <div class="msg-num"><span>{{answer.count}}</span></div>
        </div>
      </div>
    </div>
    <div class="trend-msg" @click="linkDetail(3)">
      <div class="msg-type">
        <div class="msg-title">
          <div class="msg-type-icon">
            <img src="../assets/message_like@3x.png" alt="">
          </div>
          <div>
            <div class="msg-type-title">点赞通知</div>
            <div class="msg-tips">{{thumb.count === "0" ? '无新消息' : thumb.username + ' 赞了你'}}</div>
          </div>
        </div>
        <div v-if='thumb.count !== "0"'>
          <div class="msg-time">{{answer.time_desc}}</div>
          <div class="msg-num"><span>{{thumb.count}}</span></div>
        </div>
      </div>
    </div>
    <div class="sys-msg" @click="linkSysMSG(system.count ? system.count : 0)">
      <div class="trend-msg">
        <div class="msg-type">
          <div class="msg-title">
            <div class="msg-type-icon">
              <img src="../assets/message_system@3x.png" alt="">
            </div>
            <div>
              <div class="msg-type-title">系统消息</div>
            </div>
          </div>
          <div v-if='system.count !== "0"'>
            <div class="msg-num"><span>{{system.count}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
     
</template>

<script>
import { msgType } from '../fetch/api'
export default {
  name: 'mineMsg',
  data () {
    return {
      reply: {},
      system: {},
      thumb: {},
      answer: {}
    }
  },
  created() {
    document.title = '我的消息';
    this.getData()
  },
  mounted() {
    this.$refs.page_bg.style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    getData() {
      msgType().then(res => {
        if (res.state = 200) {
          this.reply = res.data.reply
          this.system = res.data.system
          this.thumb = res.data.thumb
          this.answer = res.data.answer
        }
      })
    },
    linkDetail(type) {
      this.$router.push({
        name: 'msgDetail', query: {type: type}
      })
    },
    linkSysMSG(count) {
      this.$router.push({
        name: 'sysMsgDetail', query: {count: count}
      })
    }
  },
  components: {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.mineMsg-page {
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

.msg-tips, .msg-time, .msg-num {
  font-size: 24px;
  color: #ABB3BA;
}

.msg-num {
  color: #fff;
  display: flex;
  justify-content: flex-end;
  margin-top: 9px;
}

.msg-num span {
  background: #FF7D8D;
  padding: 0 10px;
  height: 32px;
  border-radius: 50%;
  text-align: center;
  line-height: 32px;
}

.sys-msg {
  margin-top: 20px;
}



</style>
