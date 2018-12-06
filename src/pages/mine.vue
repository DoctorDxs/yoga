<template>
  <div class="mine-page">
    <div class="mine-header">
      <div class="mine-header-box">
        <div class="mine-header-user">
          <div class="user-avatar"><img :src="userInfo.avatar" alt=""></div>
          <div>
            <div class="mine-user-name">
              <span>{{userInfo.username}}</span>
              <img src="../assets/vip_no_icon@3x.png" alt="" v-if='userInfo.status === "0"'>
              <img src="../assets/vip_nor_icon@3x.png" alt="" v-if='userInfo.status === "1"'>
              <img src="../assets/vip_supper_icon@3x.png" alt="" v-if='userInfo.status === "2"'>
            </div>
            <div class="mine-user-sign">{{userInfo.desc}}</div>
          </div>
        </div>
        <div class="buy-vip-btn" @click="linkVip">成为会员</div>
      </div>
    </div>

    <div class="mine-setting">
      <div class="mine-setting-item" @click="linkMsg">
        <div class="my-msg-set">
          <img src="../assets/me_message@3x.png" alt="">
          <div class="mine-msg-dots" v-if='userInfo.has_notify'></div>
        </div>
        <div>我的消息</div>
      </div>
      <div class="mine-setting-item" @click="linkCollections">
        <img src="../assets/me_collect@3x.png" alt="">
        <div>我的收藏</div>
      </div>
      <div class="mine-setting-item" @click="linkGiftRecord">
        <img src="../assets/me_gift@3x.png" alt="">
        <div>赠送记录</div>
      </div>
      <div class="mine-setting-item" @click="linkSeting">
        <img src="../assets/me_setting@3x.png" alt="">
        <div>设置</div>
      </div>
    </div>
    <div class="evaluate-title">
      <div class="line-left-border"></div>
      <div>我的动态</div>
    </div>
    <trend-list :evaluteList='evaluteList' @getTrend='getTrend' @updataTrends='updataTrends'></trend-list>
    <nav-bar></nav-bar>
  </div>
     
</template>

<script>
import navBar from '@/components/navBar'
import trendList from '@/components/trendList'
import { myTrend } from '../fetch/api.js'
export default {
  name: 'mine',
  data () {
    return {
      evaluteList: [],
      userInfo: {},
      page: 1
    }
  },
  activated() {
    document.title = '我';
    let userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
    };
    this.userInfo = userInfo
  },
  mounted() {
    document.getElementsByClassName('mine-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  methods: {
    linkCollections() {
      this.$router.push({name: 'collections'})
    },
    linkMsg() {
      this.$router.push({name: 'mineMsg'})
    },
    linkSeting() {
      this.$router.push({name: 'setting'})
    },
    linkVip() {
      this.$router.push({name: 'beVip'})
    },
    linkGiftRecord() {
      this.$router.push({name: 'giftRecord'})
    },
    getTrend($state) {
      myTrend(this.page).then(res => {
        if (res.state == 200) {
          const lists = res.data.data
          if (lists.length) {
            lists.forEach((item, index) => {
              if (item.img_paths) {
                item.img_paths = item.img_paths.split(',')
              }
            })
            this.page += 1;
            this.evaluteList.push(...lists)
            $state.loaded();
          } else {
            $state.complete()
          }
        } else {
          this.$toast.top(res.msg)
        }
      })
    },
    updataTrends($state) {
      this.page = 1
      this.evaluteList = []
    }
  },
  components: {
    navBar,
    trendList
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.mine-page {
  padding-bottom: 120px;
  background: #F4F6F9;
}

.mine-header {
  height: 180px;
  padding: 20px 30px 0;
  background: #B78FDA;
}

.mine-header-box {
  /* margin-top: 20px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-avatar {
  height: 110px;
  width: 110px;
} 
.user-avatar img{
  height: 110px;
  width: 110px;
  border: 2px solid #fff;
}

.user-avatar img{
  border-radius: 50%;
}

.mine-header-user {
  display: flex;
  align-items: center;
}

.buy-vip-btn {
  width: 190px;
  height: 66px;
  color: #fff;
  font-size: 32px;
  line-height: 66px;
  text-align: center;
  background: -webkit-linear-gradient(45deg, #E6C67F,#E1BB6F, #DDB463,#D9AC57, #D9AC57);
}

.mine-user-name {
  font-size: 36px;
  color: #fff;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-left: 28px;
}

.mine-user-name img {
  /* width: 72px; */
  height: 32px;
  margin-left: 16px;
}

.mine-user-sign  {
  font-size: 26px;
  color: #fff;
  margin-top: 9px;
  margin-left: 28px;
  width: 300px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.mine-setting {
  height: 160px;
  width: 690px;
  background: #fff;
  margin: -40px auto 0;
  border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0,0,0,.1); 
}

.mine-setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.mine-setting-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #444D52;
  font-size: 24px;
  width: 100%;
}

.mine-setting-item img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.my-msg-set {
  position: relative;
  margin-bottom: 5px;
}

.my-msg-set img {
  position: relative;
  margin-bottom: 0;
} 

.mine-msg-dots {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #FF7D8D;
  border-radius: 50%;
  top: 0;
  right: -10px;
}

.evaluate-title {
  padding: 0 30px;
  height: 100px;
  background: #fff;
  display: flex;
  align-items: center;
  font-size: 32px;
  color: #444C52;
  font-weight: 600;
  margin-top: 20px;
}

.line-left-border {
  width: 8px;
  height: 38px;
  border-radius: 8px;
  background: #B78FDA;
  margin-right: 16px;
}
</style>
