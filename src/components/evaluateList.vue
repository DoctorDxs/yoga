<template>
  <div class="evaluate-list">
    <div v-for='(item, index) in comments' :key='index' class="mar-boot">
      <div class="trend-user" @click="commentAnswer(item.username, item.id)">
        <div class="trend-user-avatar">
          <div>
            <img :src="item.user_avatar" alt="">
          </div>
          <div class="trend-pub-time">
            <div>{{item.username}}</div>
            <div>{{item.time_desc}}</div>
          </div>
        </div>
        <div class="support-icon">
          <span class="suport-num" :style="item.is_thumb == '1' ? '' : 'color: #D4D9DD;'">{{item.thumbs}}</span>
          <img :src="item.is_thumb == '1' ? require('../assets/circle_like_pre_icon@3x.png') : require('../assets/circle_like_nor_icon@3x.png')" alt="">
        </div>
      </div>
      <div class="trend-user-content">
        <div class="user-content-box">
          <div class="user-content">
            {{item.content}}
          </div>
          <div class="user-reply" v-if='item.comments.length > 0'>
            <div v-for='(commentItem, commentIndex) in item.comments' :key='commentIndex'>
              <span class="evaluate-user" @click="replay(commentItem.id, commentItem.username)">{{commentItem.username}}</span>
              <span class="replay-text" v-if='commentItem.parent_username'> 回复 </span>
              <span class="evaluate-user">{{commentItem.parent_username}}</span>:
              <span class="evaluate-content" @click="commentItem.is_mine == '1' ? showModal() : ''">{{commentItem.content}} </span>  
              <span class="look-img-btn" v-if='commentItem.img_path.length > 0' @click.stop="previewImage({currentImg: commentItem.img_path[0], currentImgLists: commentItem.img_path})">查看图片</span>
            </div>
            <div class="look-more-btn" @click="lookAll" v-if='item.evaluate_sum > 3'>查看全部{{item.evaluate_sum}}条回复</div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-data-icon" v-if='!comments.length'><img src="../assets/all_none@3x.png" alt="" ></div>
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" class="no-more-data">{{evaluteList.length > 9 ? "没有更多了..." : " "}}</div>
      <div slot="no-results"> </div>
    </infinite-loading>
  </div>
</template>

<script>

export default {
  name: 'evaluateList',
  data () {
    return {
      showAll: false
    }
  },
  methods: {
    lookAll() {
      this.$router.push({
        name: 'moreEval'
      })
    },
    commentAnswer(username) {
      this.$emit('toanswer', username)
    }
  },

  props: {
    comments: {
      type: Array,
      required: true
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.evaluate-list {
  padding: 30px 20px;
  background: #fff;
  border-top: 1px solid rgba(171,181,188,.3)
}

.mar-boot {
  margin-bottom: 20px;  
}

.trend-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.trend-user-avatar {
  display: flex;
  align-items: center;
}

.trend-pub-time {
  margin-left: 20px;
}

.trend-pub-time > div:nth-child(1) {
  font-size: 30px;
  color: #444C52;
}

.trend-pub-time > div:nth-child(2) {
  font-size: 22px;
  color: #ABB4BB;
}

.trend-user-avatar > div img {
  width: 70px;
  height: 70px;
  background: #F0F2F7;
  border-radius: 50%;
}

.support-icon {
  font-size: 22px;
  display: flex;
  align-items: center;
}

.support-icon img {
  width: 44px;
  height: 44px;
}

.suport-num {
  color: red;
  font-size: 22px;
  margin-right: 10px;
  margin-top: 10px; 
}

.trend-user-content {
  justify-content: flex-end;
  display: flex;
}

.user-content {
  color: #444D52;
  font-size: 32px;
  margin: 26px 0 20px;
}

.user-content-box {
  width: 620px;
}

.user-reply {
  padding: 10px;
  background: #F7F9FB;
  font-size: 28px;
  /*  */
}

.user-reply > div {
  margin-top: 10px;
}

.user-reply > div:nth-child(1) {
  margin-top: 0;
}

.evaluate-user {
  color: #5D7993;
}

.evaluate-content {
  color: #7F8C92;
}

.look-img-btn {
  color: #44CBFF;
}

.replay-text {
  color: #444C52;
}

.look-more-btn {
  color: #5D7992;
  font-size: 28px;
  margin-top: 10px;
}
</style>
