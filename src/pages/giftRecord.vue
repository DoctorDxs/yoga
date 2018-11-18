<template>
  <div class="giftRecord-page">
    <div class="gift-tab-bars">
      <div class="gift-tab-item">
        <div @click="Sent" :class="showSent ? 'active-tabbar' : ''">
          <div>送出</div>
          <div :class="showSent ? 'active-bottom' : 'hr-line-bottom'"></div>
        </div>
        <div @click="Received" :class="!showSent ? 'active-tabbar' : ''">
          <div>收到</div>
          <div :class="!showSent ? 'active-bottom' : 'hr-line-bottom'"></div>
        </div>
      </div>
    </div>


    <div class="gift-sent" v-if='showSent'>
      <div v-for='(item, index) in sentData' :key='index' class="gift-item">
        <div class='sender-avatar'><img :src="item.user.avatar" alt=""></div>
        <div class="sender-detail">
          <div class="sender-info">
            <div class="send-time">
              <div>{{item.user.avatar.username}}</div>
              <div>{{item.time_desc}}·赠送</div>
            </div>
            <div class="send-btn" @click='sendAgain(item.id)'>未送出继续送</div>
          </div>
          <div class="course-info" @click="linkCourse(item.order.group.id, item.order.group.type)">
            <img :src="item.order.group.goods_cover" alt="">
            <div class='course-desc'>
              <div>{{item.order.group.name}}</div>
              <div>{{item.order.group.type == 2 ? '课程' : '训练营'}}</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="gift-received" v-if='!showSent'>
      <div v-for='(item, index) in reciveData' :key='index' class="gift-item">
        <div class='sender-avatar'><img :src="item.user.avatar" alt=""></div>
        <div class="sender-detail">
          <div class="sender-info">
            <div class="send-time">
              <div>{{item.user.username}}</div>
              <div>{{item.time_desc}}·赠送</div>
            </div>
          </div>
          <div class="course-info" @click="linkCourse(item.order.group.id, item.order.group.type)">
            <img :src="item.order.group.goods_cover" alt="">
            <div class='course-desc'>
              <div>{{item.order.group.name}}</div>
              <div>{{item.order.group.type == 2 ? '课程' : '训练营'}}</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
     
</template>

<script>
import { sendRecord } from '../fetch/api'
export default {
  name: 'giftRecord',
  data () {
    return {
      showSent: true,
      type: 1,
      pagesend: 1,
      pagerecive: 1, 
      sentData: [],
      reciveData: []
    }
  },
  created() {
    document.title = '赠送记录';
    this.getData()
  },
  mounted() {
    document.getElementsByClassName('giftRecord-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    getData() {
      let page;
      if (this.type == 1) {
        page = this.pagesend
      } else {
        page = this.pagerecive
      }
      sendRecord({type: this.type, page: page}).then(res => {
        if (res.state == 200) {
          if (this.type == 1 ) {
            this.sentData = res.data.data
          } else {
            this.reciveData = res.data.data
          }
        }
      })
    },
    sendAgain(id) {
      
    },
    Sent() {
      this.showSent = true,
      this.type = 1
      if (this.sentData.length == 0) {
        this.getData()
      }
    },
    Received() {
      this.showSent = false
      this.type = 2
      if (this.reciveData.length == 0) {
        this.getData()
      }
    },
    linkCourse(id, type) {
      if (type == 1) {
        this.$router.push({
          name: 'campDetail', query: {id: id}
        })
      } else {
        this.$router.push({
          name: 'courseDetail', query: {id: id}
        })
      }
    }
  },
  components: {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.giftRecord-page {
  background: #F0F2F7;
}

.gift-tab-bars {
  height: 80px;
  background: #fff;
}

.gift-tab-item {
  width: 480px;
  height: 80px;
  line-height: 80px;
  margin: auto;
  font-size: 32px;
  color: rgba(68,76,82,.3);
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hr-line-bottom {
  width: 46px;
  height: 6px;
  border-radius: 3px;
  background: #fff;
  margin-top: -6px;
}

.gift-tab-bars .active-tabbar {
  color: rgba(68,76,82,1);
}

.gift-tab-bars .active-bottom {
  background: #B78FDA;
   width: 46px;
  height: 6px;
  border-radius: 3px;
  margin-top: -6px;
}

.gift-sent, .gift-received {
  margin-top: 20px;
}

.sender-detail {
  width: 614px;
}

.gift-item {
  padding: 40px 20px;
  background: #fff;
  border-bottom: 1px solid #F4F6F9;
  display: flex;
  justify-content: space-between;
}

.sender-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.sender-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.sender-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.send-time > div:nth-child(1) {
  font-size: 30px;
  color: #444C52;
}

.send-time > div:nth-child(2) {
  font-size: 22px;
  color: #ABB3BA;
}

.send-btn {
  width: 200px;
  height: 46px;
  line-height: 47px;
  border: 1px solid #FF7D8C;
  text-align: center;
  font-size: 24px;
  color: #FF7D8C;
}

.course-info {
  height: 144px;
  background: #F4F6F9;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-top: 26px;
}

.course-info img {
  width: 104px;
  height: 104px;
  background: #E1E2E4;
  margin-right: 20px;
}

.course-desc > div:nth-child(1) {
  font-size: 28px;
  color: #444C52;
}

.course-desc > div:nth-child(2) {
  font-size: 20px;
  color: #808C92;
}



</style>
