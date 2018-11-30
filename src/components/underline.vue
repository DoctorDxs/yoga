<template>
  <div class="camp-list">
    <!-- <div class="camp-list-item">
      <div class="camp-info-wrap" style="position: relative;z-index: 1;">
        <div class="camp-title">空中瑜伽教练培训</div>
        <div class="camp-info"><span>报名还剩5天</span><span>***人报名</span></div>
        <div class="active-camp">优惠名额火热争抢</div>
      </div>
      <div class="camp-cover"><img src="../assets/bg-img.png" alt=""></div>
    </div>
    <div class="camp-list-item" style="position: relative;z-index: 1;">
      <div class="camp-info-wrap">
        <div class="camp-title">空中瑜伽教练培训</div>
        <div class="camp-info"><span>报名还剩5天</span><span>***人报名</span></div>
        <div class="active-camp">优惠名额火热争抢</div>
      </div>
      <div class="camp-cover"><img src="../assets/bg-img.png" alt=""></div>
    </div>
    <div class="camp-list-item">
      <div class="camp-info-wrap" style="position: relative;z-index: 1;">
        <div class="camp-title">空中瑜伽教练培训</div>
        <div class="camp-info"><span>报名还剩5天</span><span>***人报名</span></div>
        <div class="active-camp">优惠名额火热争抢</div>
      </div>
      <div class="camp-cover"><img src="../assets/bg-img.png" alt=""></div>
    </div> -->
  </div>
</template>

<script>

export default {
  name: 'underline',
  data () {
    return {
      
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.camp-list {
  padding: 30px;
}

.camp-list-item {
  height: 310px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}

.camp-info-wrap {
  margin-left: 30px;
}

.camp-title {
  font-size: 32px;
  color: #444C52;
  font-weight: 600;
}

.camp-info {
  font-size: 24px;
  color: #808C92;
  margin: 18px 0 38px;
}

.active-camp {
  width: 250px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  border-radius: 42px;
  font-size: 28px;
  color: #fff;
  font-weight: 600;
  background: #FEB704;
}

.camp-cover {
  height: 100%;
  width: 100%;
  position: absolute;
  background: #F4F6F9;
  z-index: 0;
}

.camp-cover img {
  height: 100%;
  width: 100%;
}
</style>
