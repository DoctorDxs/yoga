<template>
  <div class="course-detail-page">
    <course-top :detail='detail' ref='courseTop'></course-top>
    <div class="course-tab">

      <div class="course-tab-box">
        <div :class="index == tabIndex ? 'active-color' : '' " v-for='(item, index) in tabItems' :key='index' @click='switchTabbar(index)'>
          <div>{{item}} {{index == 1 ? '(' + 6 + ')' : ''}}</div>
          <div :class="index == tabIndex ? 'tab-bottom-border-show' : 'tab-bottom-border-hide'"></div>
        </div>
      </div>

    </div>

    <div class="tab-item-detail">
      <!-- 详情 -->
      <div v-if='tabIndex == 0'>
        <div class="students-study">
          <div class="students-avatar">
            <img :src="item" alt="" v-for='(item, index) in detail.circle' :key='index'>
          </div>
          <div class="course-detail-info">
            <div>{{detail.now_phase.started_at}}开课</div>
            <div>累计{{detail.now_phase.subscribe_num}}人报名</div>
          </div>
        </div>
        <div class="good-students" v-if='detail.excellences.length > 0'>
          <div class="good-student-title"><span class="v-line-border"></span><span>昨日优秀学员</span></div>
          <div class="swiper-box">
              <mt-swipe :auto="0">
                <mt-swipe-item  v-for='item in detail.excellences' :key='item' class="goods-students-avatar">
                  <img src="http://tx.haiqq.com/uploads/allimg/150402/16094151D-13.jpg" alt="">
                  <div class="student-name">用户名</div>
                </mt-swipe-item>
              </mt-swipe>
          </div>
        </div>
        <div class="course-des-detail" v-html='detail.desc'></div>
      </div>
      <!-- 课表 -->
      <div v-if='tabIndex == 1'>
        <div class="course-table-item" v-for='(item, index) in detail.videos' :key='index'>
          <div class="course-item-cover">
            <div class="course-item-left">
              <img :src='item.cover' alt="">
              <div class="course-sort">{{index > 9 ? index+1 : '0' + (index +1)}}</div>
            </div>
            <div class="course-item-info">
              <div>{{item.name}}</div>
              <div>{{item.length_time}}</div>
            </div>
          </div>
          <div @click="linkVideo(item.group_id, item.id, item.is_can_see, item.is_try_free)">
            <div v-if='item.is_try_free == 1 && item.is_can_see != 1 && detail.in_circle != 1' class="free-try-see">免费试看</div>
            <div v-if='item.is_can_see != 1 && item.is_try_free != 1' class="course-locked"><img src="../assets/class_lock@3x.png" alt=""></div>
            <div v-if='item.is_can_see == 1 ||  (detail.in_circle == 1 && item.is_try_free == 1)' class="course-play"><img src="../assets/class_play@3x.png" alt=""></div>
          </div>
        </div>
      </div>
      <!-- 圈子 -->
      <div v-if='tabIndex == 2'><trend-list :evaluteList='evaluteList' @getTrend='getTrend'></trend-list></div>
    </div>
    <!-- 圈外 -->
    <div class="course-no-buy" v-if='detail.in_circle == "0"'>
      <div class="consult-course" @click="showConsult">
        <div><img src="../assets/class_consult@3x.png" alt=""></div>
        <div>咨询</div>
      </div>
      <div class="share-this-course" @click="showShare">
        <div><img src="../assets/class_share@3x.png" alt=""></div>
        <div>分享</div>
      </div>
      <div class="add-to-practice" @click="buyCourse" v-if='!timeEnd'>立刻报名</div>
      <div class="add-to-practice" style='background: #C7CCD1' @click="hasEnd" v-if="timeEnd">报名结束</div>
      
    </div>

    <div class="course-no-buy" v-if='detail.in_circle == "-1"'>
      <div class="consult-course" @click="showConsult">
        <div><img src="../assets/class_consult@3x.png" alt=""></div>
        <div>咨询</div>
      </div>
      <div class="share-this-course" @click="showShare">
        <div><img src="../assets/class_share@3x.png" alt=""></div>
        <div>分享</div>
      </div>
      <div class="add-to-practice"  @click="beSvip">成为私教会员</div>
    </div>

    <div class="course-no-buy" v-if='detail.in_circle == "1" && !startclass'>
      <div class="consult-course" @click="showConsult">
        <div><img src="../assets/class_consult@3x.png" alt=""></div>
        <div>咨询</div>
      </div>
      <div class="share-this-course" @click="showShare">
        <div><img src="../assets/class_share@3x.png" alt=""></div>
        <div>分享</div>
      </div>
      <div class="add-to-practice"  @click="waiteStart" >已报名，等待开课</div>
    </div>


    <div class="course-is-buy" v-if='detail.in_circle == "1"  && startclass'>
      <div class="write-trend" @click="linkAddTrend(1)">
        <div><img src="../assets/class_issue@3x.png" alt=""></div>
        <div>写动态</div>
      </div>
      <div class="border-line"></div>
      <div class="write-question" @click="linkAddTrend(2)">
        <div><img src="../assets/class_question@3x.png" alt=""></div>
        <div>提问题</div>
      </div>
    </div>

    
    <div class="add-time" v-if='!timeEnd'>
      <div>
        <div>距报名截止 还剩{{leftTime}}</div>
        <div>已有{{detail.now_phase.subscribe_num}}人报名</div>
      </div>
    </div>
    <div class="add-time" v-if='detail.in_circle == "-1"'>
      <div>
        你购买过该训练营,成为私教会员可以继续观看
      </div>
    </div>

    <!-- <div class="share-modal-bg" v-if='showShareModal' @click="hideShare">
      <div class="share-modal-box">
        <div class="share-modal">
          <div>
            <img src="../assets/class_share01@3x.png" alt="">
            <div>分享好友</div>
          </div>
          <div>
            <img src="../assets/class_share02@3x.png" alt="">
            <div>分享朋友圈</div>
          </div>
        </div>
      </div>
    </div> -->
    <modal 
      title="提示" 
      :content='modalContent'
      :showCancle='showCancle' 
      confirmText=''
      cancleText=''
      @on-confirm='confirm'
      v-show='showModal'>
    </modal>

    <div class="consult-modal-bg" v-if="showConsultModal" @click="hideConsult">
      <div class="consult-modal">
        <div class="modal-title">添加客服微信</div>
        <div class="modal-desc">亲爱的伽人，请添加轻伽瑜伽客服微信，获取专属服务</div>
        <div hidden><input type="text" v-model="wxCode"></div> 
        <div class="modal-content">{{wxCode}}</div>
        <div class="copy-btn" v-clipboard:copy="wxCode"
             v-clipboard:success="onCopy"
             v-clipboard:error="onError">复制微信号</div>
      </div>
    </div>
  </div>
     
</template>

<script>
import trendList from '@/components/trendList'
import courseTop from '@/components/courseTop'
import { getDetail, getCurrentCourseEval, getWx, getSign, getShareInfo } from '../fetch/api'
export default {
  name: 'campDetail',
  data () {
    return {
      
      detail: {
        now_phase: {},
        excellences: []
      },
      tabItems: ['详情','课表','圈子'],
      tabIndex: 0,
      id: '',
      showShareModal: false,
      showConsultModal: false,
      wxCode: '',
      evaluteList: [],
      showCancle: false,
      modalContent: '请点击窗口右上角分享给',
      showModal: false,
      timeEnd: false,
      leftTime: '0天0时0分0秒',
      startclass: false,
      endclass: false,
      page: 1
    }
  },
  created() {
    const query = this.$route.query
    this.id = query.id 
    if (query.receive_id) {
      this.receive_id = query.receive_id 
    }
    this.getDetail(query.id )
    this.getCurrentCourseEval(query.id )
  },
  mounted() {
    document.title = '坐式瑜伽';
  },

 

  methods: {
    switchTabbar(index) {
      this.tabIndex = index
    },
    buyCourse() {
      this.$router.push({name: 'buyCourse'})
    },
    buyCourse() {
      this.$router.push({name: 'buyCourse', query: {id: this.id, price: this.detail.price,name: this.detail.name, now_phase_id: this.detail.now_phase_id,type: 1}})
    },
    waiteStart() {
      this.$toast.top('您已报名，请等待开课')
    },
    hasEnd() {
      this.$toast.top('报名已结束！')
    },
    beSvip() {
      this.$router.push({
        name: 'beVip'
      })
    },
    linkAddTrend(type) {
      this.$router.push({name: 'submitTrend', query: {type: type, group_id: this.id}})
    },
    linkVideo(group_id, learn_id, can_see, try_see) {
      if (can_see == '1' || try_see == '1') {
        this.$router.push({
          name: 'videoDetail', query: {group_id: group_id, learn_id: learn_id, type: this.detail.type}
        })
      } else {
        this.$toast.top('暂时无法观看')
      }
    },
    showShare() {
      this.showModal = true
    },
    confirm() {
      this.showModal = false
    },
    hideShare() {
      this.showShareModal = false
    },
    showConsult() {
      getWx().then(res => {
        if (res.state == 200) {
          this.wxCode = res.data.wechat
          this.showConsultModal = true
        } else {
          this.$toast.top(res.msg)
        }
      })
    },
    hideConsult() {
      this.showConsultModal = false
    },
    onCopy: function (e) {
      this.$toast.top('复制成功！')
    },
    onError: function (e) {
      this.$toast.top('复制失败！')
    },
    getDetail(id) {
      getDetail(id).then(res => {
        if (res.state == 200) {
          this.detail = res.data
          let startclass = res.data.now_phase.started_at
          let endclass = res.data.now_phase.ended_at
          // 判断是否开课  是否 结课
          let startclassDiffer = new Date(startclass).getTime() - new Date().getTime()
          let endclassDiffer = new Date(endclass).getTime() - new Date().getTime()
          if (startclassDiffer > 0) {
            this.startclass = false
          } else {
            this.startclass = true
          };
          if (endclassDiffer > 0) {
            this.endclass = false
          } else {
            this.endclass = true
          };
          let end = res.data.now_phase.sign_ended_at
          this.setIntervalTime(end)
          this.$refs.courseTop.commonShare(res.data); 
          if (this.receive_id ) {
            this.$refs.courseTop.giftShare(this.receive_id); 
          };
          this.getShareInfo({id: res.data.id, type: 1})
        }
      })
    },
    setIntervalTime(end) {
      let time =  setInterval(() => {
        let differTiem =parseInt((new Date(end).getTime() - new Date().getTime())/1000) 
        if(differTiem <= 0) {
          //  报名结束
  　      this.timeEnd = true
  　      clearInterval(time)
    　  } else {
            this.timeEnd = false
            let day = parseInt(differTiem/60/60/24)  
            let hour = parseInt(differTiem/60/60%24)
            let minute = parseInt(differTiem/60%60)
            let second = parseInt(differTiem%60)
            let leftTime = day+"天"+hour+"时"+minute+"分"+second+"秒"
            this.leftTime = leftTime
          }
      }, 1000)     

    },
    getShareInfo(params) {
      getShareInfo(params).then(res => {
        if (res.state == 200) {
          this.shareInfo = res.data
          this.getSign()
        }
      }) 
    },

    getSign() {
      getSign(encodeURIComponent(location.href)).then(res => {
        if (res.state == 200) {
          this.setConfig(res.data)
        }
      })
    },


    setConfig(params) {
      let shareInfo = this.shareInfo
      wx.config({
        debug: false, // 开启调试模式,
        appId: params.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: params.timeStamp, // 必填，生成签名的时间戳
        nonceStr: params.nonceStr, // 必填，生成签名的随机串
        signature: params.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline','chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      
      // 分享到盆友圈
        wx.onMenuShareTimeline({
          title: shareInfo.title,
          link: shareInfo.url,
          imgUrl: shareInfo.cover,
          success: function(res) {
            this.$toast.top('分享成功！')
          },
        })
      //分享给朋友
        wx.onMenuShareAppMessage({
          title: shareInfo.title,
          desc: shareInfo.desc,
          link: shareInfo.url,
          imgUrl: shareInfo.cover,
          success: function() {
            this.$toast.top('分享成功！')
          }
        })
    },

    getTrend($state) {
      getCurrentCourseEval({id: this.id, page: this.page}).then(res => {
        if (res.state == 200) {
          const lists = res.data.data
          if (lists.length) {
            this.page += 1;
            this.evaluteList.push(...lists)
            $state.loaded();
          } else {
            $state.complete()
          }
        } else {
          this.$toast.top(res.msg)
        }
      })
    }
  },
  components: {
    courseTop,
    trendList,
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.course-detail-page {
  background: #F0F2F7;
  padding-bottom: 160px;
  position: relative;
}

.course-tab {
  height: 80px;
  background: #fff;
  
}

.course-tab-box {
  width: 420px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  color: #444C52;
  font-size: 32px;
  font-weight: 600;
  line-height: 80px;
}

.course-tab-box > div {
  opacity: .3;
}

.course-tab-box .active-color {
  opacity: 1;
}

.tab-bottom-border-show {width: 46px;height: 6px;background: #B78FDA;border-radius: 12px; margin: -6px auto 0;}
.tab-bottom-border-hide {width: 46px;height: 6px;background: #ffffff;border-radius: 12px; margin: -6px auto 0;}

.tab-item-detail {
  margin-top: 20px;
}

.students-study {
  background: #ffffff;
  padding: 0 30px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.students-avatar {
  width: 310px;
  flex-shrink: 0;
  display: flex;
  margin-left: 40px;
}

.students-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-left: -40px;
  border: 4px solid #fff;
}

.course-detail-info {
  font-size: 26px;
  color: #808C92;
  text-align: right;
}

.course-des-detail {
  margin-top: 20px;
  min-height: 500px;
  background: #fff;
  word-break: break-all;
  padding: 20px;
  font-size: 28px;
}

.course-table-item {
  height: 160px;
  background: #fff;
  margin-bottom: 10px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.course-item-info {
  margin-left: 30px;
}

.course-item-info > div:nth-child(1) {
  font-size: 28px;
  color: #444C52;
  font-weight: 600;
}

.course-item-info > div:nth-child(2) {
  font-size: 24px;
  color: #7F8C92;
  margin-top: 28px;
}

.course-item-cover {
  display: flex;
  align-items: center;
}

.course-item-left  {
  position: relative;
  width: 180px;
  height: 120px;
  background: #F0F2F7;
}

.course-sort {
  position: absolute;
  top: 0;
  left: 0;
  background: #B78FDA;
  width: 90px;
  height: 30px;
  border-bottom-right-radius: 20px; 
  font-size: 24px;
  text-align: center;
  line-height: 30px;
  color: #fff;
}

.course-item-left img {
  width: 180px;
  height: 120px;
}

.free-try-see {
  background: #B78FDA;
  width: 180px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 28px;
  color: #fff;
  border-radius: 70px;
}

.course-locked, .course-play {
  width: 180px;
  text-align: center;
}

.course-locked img {
  height: 42px;
  width: 38px;
}

.course-play img {
  height: 50px;
  width: 50px;
}

.course-no-buy {
  height: 100px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
}

.add-to-practice {
  width: 520px;
  background: #B78FDA;
  flex-shrink: 0;
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  color: #fff;
  line-height: 100px;
}

.consult-course, .share-this-course {
  font-size: 24px;
  color: #808C92;
  text-align: center;
  width: 115px;
  display: flex;
  flex-direction: column;
}

.consult-course img, .share-this-course img {
  height: 60px;
  width: 60px;
  margin: 4px 0 -6px;
}

.course-is-buy {
  background: #fff;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
}

.write-question, .write-trend {
  display: flex;
  align-items: center;
  font-size: 32px;
  color: #B78FDA;
  margin: auto;
}

.write-question img,.write-trend img {
  width: 60px;
  height: 60px;
  margin-right: 14px;
}

.border-line {
  background: #C7CCD1;
  width: 2px;
  height: 60px;
}

.good-students {
  background: #fff;
  margin-top: 20px;
  height: 282px;
}

.good-student-title {
  height: 100px;
  padding: 0 30px;
  font-size: 32px;
  color: #444C52;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.swiper-box {
  width: 750px;
  overflow: hidden;
}

.v-line-border {
  height: 38px;
  width: 8px;
  background: #B78FDA;
  border-radius: 4px;
  margin-right: 18px;
}

.goods-students-avatar {
  margin-left: 30px;
  width: 110px!important;
}

.goods-students-avatar img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: #F4F6F9;
}

.student-name {
  font-size: 24px;
  color: #7F8C92;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 4px;
}

.add-time {
  height: 60px;
  background: #FF7D8D;
  width: 100%;
  position: fixed;
  bottom: 100px;
  left: 0;
  text-align: center;
  z-index: 66666;
}

.add-time > div{
  height: 60px;
  font-size: 26px;
  color: #fff;
  display: flex;
  padding: 0 30px;
  align-items: center;
  justify-content: space-between;
}

.share-modal-bg, .consult-modal-bg {
    position: fixed;
    background: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .share-modal-box {
    height: 268px;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 26px;
    color: #808C92;
  }

  .share-modal {
    display: flex;
    width: 300px;
    margin: 80px auto;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }

  .share-modal img {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
  }

  .consult-modal {
    width: 440px;
    height: 440px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background: #fff;
    padding: 50px 30px 0;
    border-radius: 8px;
  }

  .modal-title {
    font-size: 34px;
    color: #2F343C;
    font-weight: 600;
  }

  .modal-desc {
    color: #808C92;
    font-size: 28px;
    margin-top: 30px; 
  }

  .modal-content {
    color: #B78FDA;
    font-size: 34px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0;
  }

  .copy-btn {
    height: 100px;
    background: #B78FDA;
    border-radius: 8px;
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-size: 32px;
  }



</style>
