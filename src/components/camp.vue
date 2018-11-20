<template>
  <div class="camp-list">
    <div class="camp-list-item" @click='linkCampDetail(item.id)' v-for='(item, index) in currentList' :key='index'>
      <div class="camp-info-wrap">
        
        <div class="camp-title" style="position: relative;z-index: 1;">{{item.name}}</div>
        <!-- item.now_phase.sign_ended_at - item.now_phase.sign_started_at -->
        <!-- timeDifference(item.now_phase ? item.now_phase.sign_ended_at : '', item.now_phase ? item.now_phase.sign_started_at : '') -->
        <div class="camp-info" style="position: relative;z-index: 1;"><span>报名还剩{{itemTime | timeDifference(item.now_phase ? item.now_phase.sign_ended_at : '', item.now_phase ? item.now_phase.sign_started_at : '')}}天</span> <span>{{item.subscribe_num}}人报名</span></div>
        <div class="active-camp" style="position: relative;z-index: 1;">限时免费学习</div>
        <div class="camp-cover"><img :src="item.goods_cover" alt=""></div>
      </div>
      <infinite-loading @infinite="infiniteHandler">
        <div slot="no-more" class="no-more-data">{{evaluteList.length > 9 ? "没有更多了..." : " "}}</div>
        <div slot="no-results"> </div>
      </infinite-loading>
      <div class="no-data-icon" v-if='!currentList.length'><img src="../assets/all_none@3x.png" alt="" ></div>
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
  },
  filters: {
    timeDifference(value, end, start) {
      if(end && start) return (new Date(end) - new Date(start)) / (1000 * 60 * 60 *24)
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
  width: 200px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  border-radius: 42px;
  font-size: 28px;
  color: #fff;
  font-weight: 600;
  background: #B78FDA;
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
