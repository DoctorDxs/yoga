<template>
  <div class="trendDetail-page">
    <trend-list></trend-list>

    <div class="evaluate-title">
      <div class="line-left-border"></div>
      <div>83个回答</div>
    </div>

    <div class="evaluate-list" v-for='(item, index) in [0,1,2,3]' :key='index'>
      <evaluate-list></evaluate-list>
    </div>

    <!-- 请输入你的想法 -->
    <!-- 评论TA的回答 -->
    <!-- 请输入你的回答 -->
    <div class="replay-input-box">
      <div class="replay-input">
        <input type="text" :placeholder="trend? '请输入你的想法' : '请输入你的回答'">
        <img src="../assets/issue_photo_icon@3x.png" alt="">
        <div class="submit-btn">发表</div>
      </div>
    </div>
  </div>
     
</template>

<script>
import trendList from '@/components/trendList'
import evaluateList from '@/components/evaluateList'
export default {
  name: 'trendDetail',
  data () {
    return {
      trend: true
    }
  },
  created() {
    const index = this.$route.query.index
    if (index % 2 == 1 ) {
      document.title = '动态详情'
      this.trend = true
    } else {
      document.title = '问题详情'
      this.trend = false
    }
  },
  components: {
    trendList,
    evaluateList
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.trendDetail-page {
  padding-bottom: 100px;
  background: #F4F6F9;
  position: relative;
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

.replay-input-box {
  min-height: 96px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
}

.replay-input {
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  height: 96px;
}

.replay-input input {
  height: 66px;
  width: 506px;
  border: 0;
  outline: medium;
  border-radius: 33px;
  background: #F0F2F7;
  font-size: 30px;
  color: #444D52;
  text-indent: 17px;
}

.replay-input img {
  width: 44px;
  height: 44px;
}

.replay-input input::placeholder {
  color: #ABB3BA;
}

.submit-btn {
  width: 120px;
  height: 66px;
  line-height: 66px;
  text-align: center;
  color: #818C92;
  font-size: 28px;
  border-radius: 33px;
  background: #F0F2F7;
}


</style>
