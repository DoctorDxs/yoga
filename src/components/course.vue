<template>
  <div class="course-list">

    <div class="course-detail" @click='linkDetail(item.id)' v-for='(item) in currentList' :key='item.id'>
      <div>
        <div class="course-title">{{item.name}}</div>
        <div class="course-info"><span>{{item.video_count}}天</span><span>{{item.subscribe_num}}人练习</span></div>
      </div>
      <div class="course-img"><img :src="item.goods_cover ? item.goods_cover : '../assets/bg-img.png'" alt=""></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'course',
  data () {
    return {
      
    }
  },
  created() {
  },
  methods: {
    linkDetail(id) {
      this.$router.push({name: 'courseDetail', query: {id: id}})
    }
  },
  props: {
    currentList: {
      type: Array,
      required: true
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.course-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 30px;
  flex-wrap: wrap;
  margin-top: 30px;
}

.course-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 188px;
  width: 336px;
  margin-bottom: 20px;
  position: relative;
}

.course-vip {
  margin-left: 18px;
  height: 20px;
  display: flex;
  margin-bottom: 12px; 
}

.course-vip img {
  width: 46px;
  height: 20px;
}

.course-title {
  font-size: 28px;
  color: #444C52;
  font-weight: 600;
  padding-bottom: 10px;
  margin-left: 18px;
}

.course-info {
  font-size: 20px;
  color: #818C92;
  margin-left: 18px;
  padding-top: 10px;
}

.course-img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: #F4F6F9;
  top: 0;
  left: 0;
}

.course-img img {
  width: 100%;
  height: 100%;
}
</style>
