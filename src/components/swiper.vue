
<template>
  <div id="carousel">
    <div class="carousel" ref="carousel" @touchstart="touchStart" @touchend="touchEnd">
      <transition-group tag="ul" class="slide clearfix" :name="transitionName" >
        <li v-for="(item,index) in slideData" :key="index" v-show="index==beginValue"  @click="bannerLink(item.type,item.url)" >
          <img :src="item.image">
        </li>
      </transition-group>
      <div class="slideDot" v-show="dot">
        <div style="display: flex;">
          <div class="dots-box" v-for="(item,index) in slideData" :key="index">
            <img src="../assets/all_lunbo01@3x.png" alt="" v-if="index==beginValue">
            <img src="../assets/all_lunbo02@3x.png" alt="" v-if="index!=beginValue">
          </div>
        </div>
      </div>
    </div>
 
  </div>
</template>
 
<script>
  export default {
    name: "swiper",
    data(){
      return{
        setInterval:'',
        beginValue:0,
        transitionName:'slide'
      }
    },
    beforeDestroy() {
      // 组件销毁前,清除监听器
      clearInterval(this.setInterval);
    },
    methods:{
      change(key){
        if(key>(this.slideData.length-1)){
          key=0;
        }
        if(key<0){
          key=this.slideData.length-1;
        }
        this.beginValue=key;
      },

      bannerLink(type, url) {
        if (type == '1' ) {
          this.$router.push({
            name: 'campDetail', query: {id: url}
          })
        } else if (type == '2') {
          this.$router.push({
            name: 'courseDetail', query: {id: url}
          })
        } else if (type == "3") {
          return false
        } else if (type == "4") {
          this.linkDetail(url)
        } else if (type == '5') {
          window.location.href = url
        }
      },
      
      autoPlay(){
        //console.log(this.$refs.carousel.getBoundingClientRect().width);
        this.transitionName='slide';
        this.beginValue++
        if(this.beginValue>=this.slideData.length){
          this.beginValue=0;
          return;
        }
      },
      play(){
        this.setInterval=setInterval(this.autoPlay,this.interval)
      },
      touchStart(e){ //鼠标进入
        clearInterval(this.setInterval)
        this.startX = e.touches[0].clientX
      },
      touchEnd(e){ //鼠标离开
        //console.log('out')
        this.endX = e.changedTouches[0].clientX
        if (this.startX - this.endX > 30) {
          ++this.beginValue;
          this.transitionName='slide';
          this.change(this.beginValue)
        };
        if (this.startX - this.endX < -30) {
          --this.beginValue;
          this.transitionName='slideBack';
          this.change(this.beginValue)
        }
        this.startX = 0
        this.endX = 0
        this.play()
      },
      
 
    },
    mounted(){
      this.beginValue=this.begin;
      this.play();
    },
    props:{
      dot:{
        type: Boolean,
        default: true
      },
      
      interval:{
        type: Number,
        default: 5000
      },
      begin:{
        type: Number,
        default: 0
      },
      slideData:{
        type: Array,
        default: function () {
          return [];
        }
 
      }
    }
  }
</script>
 
<style scoped>
  #carousel {
    height: 100%;
  }


  .carousel {
    height: 100%;
  }
  .slide{position: relative;margin: 0;padding: 0; overflow: hidden;width: 100%; height: 100%;}
  .slide li{list-style: none;position: absolute;width: 100%; height: 100%;}
  .slide li img{width: 100%; cursor:pointer;height: 100%;}
 
  .slideDot{
    position: absolute;
    z-index: 999; 
    bottom: 20px;
    right:0; 
    left: 0;
    margin: auto;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .dots-box {
    display: flex;
    align-items: center;
  }

  .dots-box img {
    width: 20px;
    height: 20px;
    margin: 0 10px;
  }


 
 
  /*进入过渡生效时的状态*/
  .slide-enter-active{
    transform:translateX(0);
    transition: all 1s ease;
  }
 
  /*进入开始状态*/
  .slide-enter{
    transform:translateX(100%);
  }
 
  /*离开过渡生效时的状态*/
  .slide-leave-active{
    transform:translateX(-100%);
    transition: all 1s ease;
  }
 
  /*离开过渡的开始状态*/
  .slide-leave{
    transform:translateX(0);
  }
 
  /*进入过渡生效时的状态*/
  .slideBack-enter-active{
    transform:translateX(0);
    transition: all 1s ease;
  }
 
  /*进入开始状态*/
  .slideBack-enter{
    transform:translateX(-100%);
  }
 
  /*离开过渡生效时的状态*/
  .slideBack-leave-active{
    transform:translateX(100%);
    transition: all 1s ease;
  }
 
  /*离开过渡的开始状态*/
  .slideBack-leave{
    transform:translateX(0);
  }
 
</style>
