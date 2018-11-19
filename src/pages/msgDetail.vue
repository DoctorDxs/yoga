<template>
  <div class="msgDetail-page">
    <div class="trend-msg" v-for='(item, index) in msgList' :key='index'>
      <div class="msg-type" >
        <div class="msg-title">
          <div class="msg-type-icon">
            <img :src="item.user_avatar" alt="">
          </div>
          <div @click.stop="linkDetail(item.id, item.link_type)">
            <div class="msg-type-title" :style='item.is_read == "1" ? "color: #D9DEEC" : ""'>{{item.username}}</div>
            <div class="msg-tips" v-if='type == 1' :style='item.is_read == "1" ? "color: #D9DEEC" : ""'>评论了你 | 回复了你</div>
            <div class="msg-tips" v-if='type == 2' :style='item.is_read == "1" ? "color: #D9DEEC" : ""'>回答了你</div>
            <div class="msg-tips" v-if='type == 3' :style='item.is_read == "1" ? "color: #D9DEEC" : ""'>赞了你</div>
          </div>
        </div>
        <div>
          <div class="msg-time" :style='item.is_read == "0" ? "color: #D9DEEC" : ""'>{{item.time_desc}}</div>
        </div>
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler" @infinite="infiniteHandler">
      <div slot="no-more" class="no-more-data">没有更多了...</div>
    </infinite-loading>
  </div>
</template>

<script>
import { msgList, msgRead } from	'../fetch/api.js'
export default {
  name: 'msgDetail',
  data () {
    return {
      type: null,
      msgList: [],
      updateData: true,
      page: 1
    }
  },

  mounted() {
    document.getElementsByClassName('msgDetail-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    getData($state) {
      msgList({type: this.type, page: this.page}).then(res => {
        if (res.state == 200) {
          const lists = res.data.data
            if (lists.length) {
              this.page += 1;
              this.msgList.push(...lists)
              $state.loaded();
            } else {
              $state.complete()
            }
        } else {
          this.$toast.top(res.msg)
        }
      })
    },
    // 跳转到详情
    linkDetail(id, type, index) {
      if(type == 'news') {
        this.$router.push({
          name: 'trendDetail', query: {id: id}
        })
      } else if (type == 'answer') {
        this.$router.push({
          name: 'answerDetail', query: {id: id}
        })
      } else if (type == 'problem') {
        this.$router.push({
          name: 'questionDetail', query: {id: id}
        })
      };
      this.updateData = false
      this.readMSG(id, index) 
    },
    readMSG(id, index) {
      msgRead({id: id}).then(res => {
        if (res.state == 200) {
          let msgList = this.msgList
          msgList.is_read = '1'
          this.msgList = msgList
        }
      })
    },
    infiniteHandler($state) {
      this.getData($state)
    },
    activated() {
      const type = this.$route.query.type
      this.type = type
      if (type == 1) {
        document.title = '评论回复通知'
      } else if (type == 2){
        document.title = '回答通知'
      } else if (type == 3) {
        document.title = '点赞通知'
      } 
    },
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
