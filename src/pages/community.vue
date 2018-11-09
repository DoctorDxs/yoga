<template>
  <div class="community-page">
    <trend-list :evaluteList='evaluteList'></trend-list>
    
    <nav-bar></nav-bar>
  </div>
     
</template>

<script>
import navBar from '@/components/navBar'
import trendList from '@/components/trendList'
import { getTrend } from '../fetch/api'
export default {
  name: 'community',
  data () {
    return {
      evaluteList: []
    }
  },
  created() {
    document.title = '圈子';
    this.getTrendData()
  },
  methods: {
    getTrendData() {
      getTrend().then(res => {
        if (res.state == 200) {
          let evaluteList = res.data.data
          if (evaluteList.length > 0) {
            evaluteList.forEach((item, index) => {
              if (item.img_paths) {
                item.img_paths = item.img_paths.split(',')
              }
            })
          }
          this.evaluteList = res.data.data
        }
      })
    },
    linkDetail(index) {
      // if (index % 3 == 0 ) {
      //   this.$router.push({name: 'answerDetail',query: {index: index}})
      // } else {
      //  this.$router.push({name: 'trendDetail',query: {index: index}})
      // }


    }
  },
  
  components: {
    navBar,
    trendList
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.community-page {
  padding-bottom: 120px;
}
</style>
