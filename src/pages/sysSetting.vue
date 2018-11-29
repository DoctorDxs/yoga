<template>
  <div class="setting-page">
    <bg></bg>
    <div class="set-item">
      <div>课程提醒</div>
      <div @click="changeCourse">
        <img src="../assets/all_off_icon@3x.png" alt="" v-if='!courseRemind'>
        <img src="../assets/all_on_icon@3x.png" alt="" v-if='courseRemind'>
      </div>
    </div>

    <div class="set-item">
      <div>训练营提醒</div>
      <div @click="changeCamp">
        <img src="../assets/all_off_icon@3x.png" alt="" v-if='!campRemind'>
        <img src="../assets/all_on_icon@3x.png" alt="" v-if='campRemind'>
      </div>
    </div>


    <div class="set-item">
      <div>系统消息</div>
      <div @click="changeSys">
        <img src="../assets/all_off_icon@3x.png" alt="" v-if='!sysRemind'>
        <img src="../assets/all_on_icon@3x.png" alt="" v-if='sysRemind'>
      </div>
    </div>

  </div>
     
</template>

<script>
import { msgBtn, getSetting } from '../fetch/api'
export default {
  name: 'sysSetting',
  data () {
    return {
      courseRemind: false,
      campRemind: false,
      sysRemind: false
    }
  },
  activated() {
    document.title = '设置';
    this.getData()
  },
  mounted() {
  },
  methods: {
    // 课程
    changeCourse() {
      this.courseRemind = !this.courseRemind
      let lessonOn = this.courseRemind === true ? 1 : 0
      this.postData({type: 'lesson', on: lessonOn})
    },
    // 训练营
    changeCamp() {
      this.campRemind = !this.campRemind
      let trainOn = this.campRemind === true ? 1 : 0
      this.postData({type: 'train', on: trainOn})
    },
    // 系统通知
    changeSys() {
      this.sysRemind = !this.sysRemind
      let systemOn = this.sysRemind === true ? 1 : 0
      this.postData({type: 'system', on: systemOn})
    },
    // 获取初始数据
    getData() {
      getSetting().then(res => {
        if(res.state == 200) {
          if (res.data) {
            this.courseRemind = res.data.notify_lesson === '1' ? true : false
            this.sysRemind = res.data.notify_system === '1' ? true : false
            this.campRemind = res.data.notify_train === '1' ? true : false
          } 
        }
      })
    },
    // 提交修改
    postData(params) {
      msgBtn(params).then(res => {
        if (params.on == 1) {
          this.$toast.top('通知已开启！')
        } else {
          this.$toast.top('通知已关闭！')
        }
      })
    },

  },
  components: {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setting-page {
  background: #F4F6F9;
}

.set-item {
  height: 120px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 30px;
  color: #444C52;
  background: #fff;
  border-bottom: 1px solid #e1e2e3;
}

.set-item img {
  height: 64px;
}




</style>
