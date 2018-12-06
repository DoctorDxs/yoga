<template>
  <div class="course2-list">
    <div class="corse-list-item" v-for="(item,index) in currentList" :key='index' >
      <div class="classify-title" @click="linkMore(item.id, item.name)">
        <div>{{item.name}}</div>
        <div><img src="../assets/class_next_icon@3x.png" alt=""></div>
      </div>
      <div class="slider-box">
        <div class="slider-box-wrap">
          <div class="slider-items" v-for='(courseItem, courseIndex) in item.lessons' :key='courseIndex' @click="linkDetail(courseItem.id)">
            <img :src="courseItem.goods_cover" alt="" class="course-cover">
            <div class="course-name">{{courseItem.name}}</div>
            <div class="course-subscribe">{{courseItem.video_count}}天 {{courseItem.subscribe_num}}人练习</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" class="no-more-data">{{currentList.length > 9 ? "没有更多了..." : " "}}</div>
      <div slot="no-results"> </div>
    </infinite-loading> -->
  </div>
</template>

<script>

export default {
  name: 'course2',
  data () {
    return {
      
    }
  },
  methods: {
    linkDetail(id) {
      this.$router.push({name: 'courseDetail', query: {id: id}})
    },
    infiniteHandler($state) {
      this.$emit('getCourse', $state)
    },
    linkMore(id, name) {
      this.$router.push({name: 'classify', query: {id: id, name: name}})
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
.corse-list-item {
  padding: 0 30px;
}

.classify-title {
  display: flex;
  justify-content: space-between;
  font-size: 32px;
  color: #444C52;
  font-weight: 600;
  align-items: center;
  margin: 37px 0 35px;
}

.classify-title img {
  height: 32px;
}

.slider-box {
  width: 690px;
  overflow-x: scroll;
  overflow-y: hidden;
  
}

.slider-items {
  width: 431px;
  height: 243px;
  flex-shrink: 0;
  margin-right: 20px;
  position: relative;
}

.course-cover {
  width: 100%;
  height: 243px;
}

.slider-box-wrap {
  display: flex;
  align-items: center;
}

.course-name {
  position: absolute;
  font-size: 28px;
  color: #444C52;
  font-weight: 600;
  top: 88px;
  left: 36px;
  max-width: 370px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.course-subscribe {
  position: absolute;
  font-size: 20px;
  color: #818C92;
  font-weight: 600;
  top: 153px;
  left: 36px;
}

</style>
