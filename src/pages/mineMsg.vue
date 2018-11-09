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
            <div class="msg-tips">{{msgTypeList.reply && msgTypeList.reply.count === "0" ? '无新消息' : '杨超越 评论了你'}}</div>
          </div>
        </div>
        <div v-if='msgTypeList.reply && msgTypeList.reply.count !== "0"'>
          <div class="msg-time">1小时前</div>
          <div class="msg-num"><span>{{msgTypeList.reply && msgTypeList.reply.count}}</span></div>
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
            <div class="msg-tips">{{msgTypeList.answer && msgTypeList.answer.count === "0" ? '无新消息' : '杨超越 回答了你的问题'}}</div>
          </div>
        </div>
        <div v-if='msgTypeList.answer && msgTypeList.answer.count !== "0"'>
          <div class="msg-time">1小时前</div>
          <div class="msg-num"><span>{{msgTypeList.answer && msgTypeList.answer.count}}</span></div>
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
            <div class="msg-tips">{{msgTypeList.thumb && msgTypeList.thumb.count === "0" ? '无新消息' : '杨超越 赞了你'}}</div>
          </div>
        </div>
        <div v-if='msgTypeList.thumb && msgTypeList.thumb.count !== "0"'>
          <div class="msg-time">1小时前</div>
          <div class="msg-num"><span>{{msgTypeList.thumb && msgTypeList.thumb.count}}</span></div>
        </div>
      </div>
    </div>
    <div class="sys-msg" @click="linkSysMSG(msgTypeList.system ? msgTypeList.system.count : 0)">
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
          <div v-if='msgTypeList.system && msgTypeList.system.count !== "0"'>
            <div class="msg-num"><span>{{msgTypeList.system.count}}</span></div>
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
      msgTypeList: {}
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
          this.msgTypeList = res.data
          console.log(res.data)
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  text-align: center;
  line-height: 32px;
}

.sys-msg {
  margin-top: 20px;
}



</style>
