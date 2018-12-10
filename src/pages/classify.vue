<template>
  <div class="more-course-list">
    <div class="more-course-wrap">
      <div class="course-list" v-for="(item, index) in currentList" :key='index' @click="linkDetail(item.id)">
        <img :src="item.goods_cover" alt="" class="goods-cover">
        <img src="../assets/vip_nor_small_icon@3x.png" alt="" class="course-vip" v-if='item.price != 0 && item.vip_discount != 0'>
        <div class="course-title">{{item.name}}</div>
        <div class="course-desc">{{item.video_count}}天 {{item.subscribe_num}}人练习</div>
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler" :identifier="infiniteId">
      <div slot="no-more" class="no-more-data">{{currentList.length > 9 ? "没有更多了..." : " "}}</div>
      <div slot="no-results"> </div>
    </infinite-loading>
    <div class="no-data-icon" v-if='!currentList.length'><img src="../assets/all_none@3x.png" alt="" ></div>
  </div>
</template>

<script>
import { getMoreCourse } from '../fetch/api.js'
export default {
  name: 'course2',
  data () {
    return {
      currentList: [],
      id: '',
      page: 0,
      infiniteId: +new Date(),
    }
  },
  activated() {
    const query = this.$route.query
    const id = query.id
    const name = query.name
    document.name = name
    if (this.id && this.id != query.id) {
      this.id = query.id
      this.currentList = []
      this.page = 0
      this.infiniteId += 1;
    } else {
      this.id = query.id
    }
  },
  methods: {
    linkDetail(id) {
      this.$router.push({name: 'courseDetail', query: {id: id}})
    },
    infiniteHandler($state) {
      this.getData($state)
    },
    getData($state) {
      this.page += 1;
      getMoreCourse({id: this.id, page: this.page}).then(res => {
        if (res.state == 200) {
          const lists = res.data.data
          if (lists.length) {
            this.currentList.push(...lists)
            $state.loaded();
          } else {
            $state.complete()
          }
        } else {
          this.$toast.top(res.msg)
        }
      })
    },
    linkMore(id, name) {
      this.$router.push({name: 'classify', query: {id: id, name: name}})
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.more-course-list {
  padding: 30px;
}

.more-course-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.course-list {
  position: relative;
  width: 336px;
  height: 188px;
  flex-shrink: 0;
  margin-bottom: 18px;
}

.goods-cover {
  width: 100%;
  height: 100%;
}

.course-vip, .course-title, .course-desc {
  position: absolute;
  left: 18px;
}

.course-vip  {
  height: 20px;
  top: 32px;
}

.course-title {
  font-size: 28px;
  font-size: 28px;
  color: #444C52; 
  top: 56px;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.course-desc {
  position: absolute;
  font-size: 20px;
  color: #818C92;
  font-weight: 600;
  top: 110px;
}



</style>
