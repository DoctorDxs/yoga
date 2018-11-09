<template>
  <div class="sysMsg-page">
    <div v-for="(item, index) in sysList" :key='index' class="sysMsg-item">
      <div class="sys-avatar"><img :src="item.message.from_user.avatar" alt=""></div>
      <div class="msg-info-box">
        <div class="msg-info">
          <div>{{item.message.from_user.username}}</div>
          <div>{{item.time_desc | getDate(item.time_desc)}}</div>
        </div>
        <div class="msg-content">{{item.message.content}}</div>
      </div>
    </div>
  </div>
     
</template>

<script>
import { msgList, msgRead } from '../fetch/api'
import getDate from '../utils/timeFormat'
export default {
  name: 'sysMsgDetail',
  data () {
    return {
      sysList: [],
      count: 0
    }
  },
  created() {
    document.title = '我的消息';
    this.count = this.$route.query.count - 0
    this.getData()

  },
  mounted() {
    document.getElementsByClassName('sysMsg-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    getData() {
      msgList(4).then(res => {
        if (res.state == 200) {
          const data = res.data.data
          this.sysList = data
          this.msgRead()
        }
      })
    },
    msgRead() {
      if (this.count > 0) {
        const notReadList = this.sysList.slice(0, this.count)
        notReadList.forEach((item, index) => {
          msgRead(item.id).then(res => {
            console.log(res)
          })
        })
      }
    }
  },
  filters: {
    getDate(time) {
      return getDate(time)
    }
  },
  components: {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sysMsg-page {
  background: #F0F2F7;
  padding: 40px 30px;
}

.sysMsg-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
}

.sys-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.sys-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.msg-info-box {
  width: 590px;
}

.msg-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.msg-info > div:nth-child(1) {
  color: #444C52;
  font-size: 28px;
}

.msg-info > div:nth-child(2) {
  color: #ABB3BA;
  font-size: 24px;
}

.msg-content {
  padding: 30px;
  background: #fff;
  font-size: 28px;
  color: #444C52;
  border-radius: 0 20px 20px 20px;
  margin-top: 20px;
}


</style>
