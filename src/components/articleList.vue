<template>
  <div class="article-list">
    
    <div class="article-list-item" v-for='(item, index) in currentList' :key='index'>
      <div @click="linkDetail(item.id)">
        <div class="article-cover"><img :src="item.article_image" alt=""></div>
        <div class="article-desc">
          <div class="article-title">{{item.title}}</div>
          <div class="article-info">
            <div>{{item.scan_count}}人订阅</div>
            <div>{{item.publish_at}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleUrl } from '../fetch/api'
export default {
  name: 'articleList',
  data () {
    return {
      
    }
  },

  methods: {
    linkDetail(id) {
      getArticleUrl(id).then(res => {
        if (res.state == 200) {
          window.location.href = res.data.information.url
        }
      })
    }
  },

  props: {
    currentList: {
      type: Array,
      required: true
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.article-list {
  padding: 30px;
}

.article-list-item > div {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.article-cover {
  width: 200px;
  height: 160px;
  margin-right: 32px;
  background: #F4F6F9;
}

.article-cover img {
  width: 200px;
  height: 160px;
}

.article-desc {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 140px;
  width: 446px;
  /* 文字两端对齐 且标点符号不在首行  因和文字超出省略冲突因此注释 */
  /* text-align:justify; 
  text-justify:inter-ideograph; */
  word-break : normal; 
}

.article-title {
  font-size: 28px;
  color: #444C52;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  display: box;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.article-info {
  display: flex;
  justify-content: space-between;
  color: #808C92;
  font-size: 24px;
}

</style>
