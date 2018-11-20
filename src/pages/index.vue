<template>
  <div class="index-page">
    <div class="index-user-info">
      <img :src="userInfo.avatar ? userInfo.avatar : defaultAvatar" alt="" class="user-avatar">
      <div class="user-login">
        <div class="user-login-name">
          <span>{{userInfo.username ? userInfo.username : '未登录'}}</span>
          <img src="../assets/vip_no_icon@3x.png" alt="" v-if='userInfo.status === "0"'>
          <img src="../assets/vip_nor_icon@3x.png" alt="" v-if='userInfo.status === "1"'>
          <img src="../assets/vip_supper_icon@3x.png" alt="" v-if='userInfo.status === "2"'>
        </div>
        <div class="user-sign">{{userInfo.desc ? userInfo.desc : '什么也没有'}}</div>
      </div>
    </div>

    <div class="my-practice-title">
      <div class="v-line"></div>
      <div>我的练习</div>
    </div>

    <!-- 我的练习数据 -->
    <div class="my-practice-wrap">

      <div class="my-practice" v-for="(item, index) in myPracticeList" data-type="0" :key='index'>
        <div class="class-detial" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skipDetail(item.id, item.type)">
          <div class="class-cover"><img :src="item.goods_cover ? item.goods_cover : '../assets/bg-img.png'" alt=""></div>
          <div>
            <div class="class-title">{{item.name}}</div>
            <div class="my-class-info">
              <div class="progress-class" ref='progressBox'><span :style='"width:" + (item.learned_count/item.video_count) * progressBoxW + "px"'></span></div>
              <div>{{item.learned_count}}/{{item.video_count}}</div>
              <div class="class-study-num">{{item.subscribe_num}} 人练习</div>
            </div>
          </div>
        </div>
        <div class="delete-class"><img src="../assets/practice_del@3x.png" alt="" :data-index="index" @click="deleteItem"></div>
      </div>
    </div>
    

    <div class="no-practice" v-if='myPracticeList.length == 0'>
      <img src="../assets/practice_normal@3x.png" alt="" class="no-practice-img">
      <div class="no-practice-text">你还没有添加课程</div>
    </div>

    <div class="add-class">
      <div @click="addClass"><img src="../assets/practice_add_icon@3x.png" alt=""><span>添加课程</span></div>
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" class="no-more-data">没有更多了...</div>
    </infinite-loading>
    <nav-bar></nav-bar>
  </div>
     
</template>

<script>
import navBar from '@/components/navBar'
import { getUser, getCourse } from '../fetch/api'
import defaultAvatar from '../assets/normal_photo@3x.png'
import GetRequest from '../utils/geturl'
export default {
  name: 'index',
  data () {
    return {
      myPracticeList : [],
      defaultAvatar: defaultAvatar,
      startX : 0 ,
      endX : 0,
      user: false,
      userInfo: {},
      progressBoxW: 45,
      page: 1
    }
  },
  created() {
    const queryUrl = GetRequest()
    if(queryUrl.api_token) {
     localStorage.setItem('api_token', queryUrl.api_token)
    };
    if(localStorage.getItem('api_token')) {
      // 获取用户信息
      this.getUserInfo()
    } else {
      window.location.href = 'https://yoga.17link.cc/api/my/web_auth?page=https://yoga.17link.cc/dist/index.html' 
    }
    document.title = '练习';
  },
  mounted() {
    // this.setWindowH()
  },
  methods: {
    getUserInfo() {
      getUser().then(res => {
        if (res.state == 200) {
          this.userInfo = res.data
          let userInfo = JSON.stringify(res.data)
          localStorage.setItem('userInfo', userInfo)
          let currentRoute = localStorage.getItem('currentRoute') 
          if (currentRoute) {
            currentRoute = JSON.parse(currentRoute)
            this.$router.push({
              name: currentRoute.name, query: currentRoute.query
            })
            localStorage.removeItem('currentRoute')
          }
        }
      })
    },
    getMyCourse($state) {
      getCourse(this.page).then(res => {
        if(res.state == 200) {
          const lists = res.data.data
          if (lists.length) {
            this.page += 1;
            if (this.myPracticeList > 0 && this.page == 1) {
              return false
            } else {
              this.myPracticeList.push(...lists)
            }
            $state.loaded();
          } else {
            $state.complete()
          }
          this.$nextTick(() => {
            if (this.$refs.progressBox) {
              this.progressBoxW = this.$refs.progressBox[0].clientWidth
            }
          })
        } else {
          this.$toast.top(res.msg)
        }

      })
    },
    //跳转详情
    skipDetail(id, type){
      if( this.checkSlide() ){
        this.restSlide();
      }else{
        if (type === '1') {
          this.$router.push({
            name: 'campDetail', query: {id: id}
          })
        } else if (type === '2') {
          this.$router.push({
            name: 'courseDetail', query: {id: id}
          })
        }
      }
    },
    //滑动开始
    touchStart(e){
      return false
      // 记录初始位置
      this.startX = e.touches[0].clientX;
    },
    //滑动结束
    touchEnd(e){
      return false
      // 当前滑动的父级元素
      let parentElement = e.currentTarget.parentElement;
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX;
      // 左滑
      if( parentElement.dataset.type == 0 && this.startX - this.endX > 30 ){
        this.restSlide();
        parentElement.dataset.type = 1;
      }
      // 右滑
      if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
        this.restSlide();
        parentElement.dataset.type = 0;
      }
      this.startX = 0;
      this.endX = 0;
    },
    //判断当前是否有滑块处于滑动状态
    checkSlide(){
      return false
      let listItems = document.querySelectorAll('.my-practice');
      for( let i = 0 ; i < listItems.length ; i++){
        if( listItems[i].dataset.type == 1 ) {
          return true;
        }
      }
      return false;
    },
    //复位滑动状态
    restSlide(){
      return false
      let listItems = document.querySelectorAll('.my-practice');
      // 复位
      for( let i = 0 ; i < listItems.length ; i++){
        listItems[i].dataset.type = 0;
      }
    },
    //删除
    deleteItem(e){
      return false
      // 当前索引
      let index = e.currentTarget.dataset.index;
      // 复位
      this.restSlide();
      // 删除
      this.myPracticeList.splice(index,1);
    },
    // setWindowH() {
    //   if (this.myPracticeList.length == 0) document.getElementsByClassName('index-page')[0].style.minHeight = window.innerHeight + 'px'
    // },
    addClass() {
      this.$router.push({
        name: 'classroom'
      })
    },
    infiniteHandler($state) {
      this.getMyCourse($state)
    }
  },
  components: {
    navBar
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .index-page {
    background: #F4F6F9;
    padding-bottom: 120px;
  }

  .index-user-info {
    height: 150px;
    padding: 0 20px;
    background: #fff;
    display: flex;
    align-items: center;
  }

  .user-avatar {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    margin-right: 28px;
  }

  .user-login-name {
    display: flex;
    align-items: center;
  }

  .user-login-name span {
    color: #444C52;
    font-size: 36px;
    font-weight: 600;
    padding-bottom: 4px;
    max-width: 420px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user-login-name img {
    height: 32px;
    width: 72px;
    margin-left: 16px;
  }

  .user-sign {
    font-size: 26px;
    color: #808C92;
    padding-top: 4px;
    max-width: 540px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .my-practice-title {
    height: 100px;
    padding: 0 20px;
    background: #fff;
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: 32px;
    font-weight: 600;
  }

  .v-line {
    height: 38px;
    width: 8px;
    background: #B78FDA;
    border-radius: 4px;
    margin-right: 16px;
  }

  .no-practice {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 76px;
  }

  .no-practice-img {
    width: 294px;
    height: 207px; 
    background: #fff;
    padding: 10px;
    margin-top: 40px;
  }

  .no-practice-text {
    font-size: 26px;
    color: #ABB5BC;
    margin-top: 22px;
  }

  .add-class {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 100px;
    margin-top: 30px;
  }

  .add-class img {
    height: 30px;
    width: 30px;
    vertical-align: middle;
    margin-right: 12px;
  }

  .add-class div {
    width: 690px;
    height: 100px;
    background: #fff;
    text-align: center;
    color: #B78FDA;
    font-size: 32px;
    font-weight: 600;
  }

  .my-practice-wrap {
    overflow: hidden;
  }

  .my-practice {
    background: #fff;
    height: 340px;
    position: relative;
    transition: all 0.2s;
  }

  .my-practice[data-type="0"]{
    transform: translate3d(0,0,0);
  }
  .my-practice[data-type="1"]{
    transform: translate3d(-110px,0,0);
  }

  .class-detial {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #F4F6F9;
    height: 310px;
    align-items: center;
    z-index: 2;
    position: absolute;
    width: 690px;
    margin-right: 30px;
    margin-left: 30px;
    position: relative;
  }

  .class-cover {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin-right: 30px;
    position: absolute;
    z-index: -1;
  }

  .class-cover img {
    width: 100%;
    height: 100%;
  }

  .class-title {
    color: #444C52;
    font-size: 32px;
    font-weight: 600;
    margin-left: 30px;
    padding-bottom: 20px;
  }

  .my-class-info {
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #818C92;
    margin-left: 30px;
    padding-top: 20px;
  }

  .progress-class {
    width: 90px;
    height: 8px;
    background: #fff;
    border-radius: 8px;
    margin-right: 12px;
  }

  .progress-class span {
    display: block;
    height: 100%;
    background: #D8C2EB;
    border-radius: 8px;
    width: 20px;
  }

  .class-study-num {
    margin-left: 36px;
  }

  .delete-class {
    position: absolute;
    top: 0;
    right: -110px;
    z-index: 1;
    width: 110px;
    height: 100%;
    background: #fff;
  }

  .delete-class img {
    width: 60px;
    height: 60px;
    margin-top: 126px;
  }


 



</style>
