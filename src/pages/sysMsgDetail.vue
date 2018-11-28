<template>
  <div class="sysMsg-page">
    <bg></bg>
    <div v-for="(item, index) in sysList" :key='index' class="sysMsg-item">
      <div class="sys-avatar"><img :src="item.user_avatar" alt=""></div>
      <div class="msg-info-box">
        <div class="msg-info">
          <div>{{item.username}}</div>
          <div>{{item.time_desc}}</div>
        </div>
        <div class="msg-content">{{item.content}}</div>
      </div>
    </div>
    <div class="no-data-icon" v-if='!sysList.length'><img src="../assets/all_none@3x.png" alt="" ></div>
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" class="no-more-data" v-if='sysList.length > 9'>没有更多了...</div>
      <div slot="no-results"> </div>
    </infinite-loading>
  </div>
     
</template>

<script>
import { getSysMsg } from '../fetch/api'
import getDate from '../utils/timeFormat'
export default {
  name: 'sysMsgDetail',
  data () {
    return {
      sysList: [],
      page: 1
    }
  },
  activated() {
    document.title = '系统消息';
  },
  methods: {
    getData($state) {
      getSysMsg(this.page).then(res => {
        if (res.state == 200) {
          const lists = res.data.data
          if (lists.length) {
            this.page += 1;
            this.sysList.push(...lists)
            $state.loaded();
          } else {
            $state.complete()
          }
          
        } else {
          this.$toast.top(res.msg)
        }
      })
    },
    infiniteHandler($state) {
      this.getData($state)
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
