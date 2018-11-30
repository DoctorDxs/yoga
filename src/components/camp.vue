<template>
  <div class="camp-list">
    <div class="camp-list-item" @click='linkCampDetail(item.id)' v-for='(item, index) in currentList' :key='index'>
      <div class="camp-info-wrap">
        
        <div class="camp-title">{{item.name}}</div>
        <div class="camp-info"><span>{{item.day_count}}</span> <span>{{item.subscribe_num}}人报名</span></div>
        <div class="active-camp" :style="item.color ? 'background:' + item.color : ''" v-if='item.font && item.color'>{{ item.font}}</div>
        <div class="camp-cover"><img :src="item.goods_cover" alt=""></div>
      </div>
      <!-- <infinite-loading @infinite="infiniteHandler">
        <div slot="no-more" class="no-more-data">{{evaluteList.length > 9 ? "没有更多了..." : " "}}</div>
        <div slot="no-results"> </div>
      </infinite-loading> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'camp',
  data () {
    return {
      itemTime: 5
    }
  },

  methods: {
    linkCampDetail(id) {
      this.$router.push({
        name: 'campDetail', query: {id: id}
      })
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
.camp-list {
  padding: 30px;
}

.camp-list-item {
  height: 310px;
  margin-bottom: 20px;
  position: relative;
}

.camp-info-wrap {
  margin-left: 30px;
}

.camp-title, .camp-info, .active-camp {
  position: absolute;
  z-index: 1;
}

.camp-title {
  font-size: 32px;
  color: #444C52;
  font-weight: 600;
  top: 80px;
}

.camp-info {
  font-size: 24px;
  color: #808C92;
  margin: 18px 0 38px;
  top: 118px;
}

.active-camp {
  padding: 0 30px;
  height: 42px;
  line-height: 44px;
  text-align: center;
  border-radius: 42px;
  font-size: 28px;
  color: #fff;
  font-weight: 600;
  background: #B78FDA;
  top: 190px;
}

.camp-cover {
  height: 100%;
  width: 100%;
  position: absolute;
  background: #F4F6F9;
  z-index: 0;
  top: 0;
  left: 0;;
}

.camp-cover img {
  height: 100%;
  width: 100%;
}
</style>
