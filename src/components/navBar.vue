<template>
  <div class="nav-bar">
    <div  class="nav-bar-link" 
          v-for='(item, index) in tabBar.list' 
          :key='index' 
          @click='linkNavBarPage(index, item.routerName, item.text)' 
          :style='index == selectBarIndex ? "color:" + tabBar.selectedColor : "color:" + tabBar.color'>
      <img :src="index == selectBarIndex ? item.selectedIconPath : item.iconPath" alt="">
      <span>{{item.text}}</span>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'navBar',
  data () {
    return {
      "tabBar": {
        "list": [
          {
            "routerName": "index",
            "text": "练习",
            "iconPath": require("../assets/tab_practice_pre@3x.png"),
            "selectedIconPath": require("../assets/tab_practice_nor@3x.png")
          },
          {
            "routerName": "classroom",
            "text": "课堂",
            "iconPath": require("../assets/tab_class_pre@3x.png"),
            "selectedIconPath": require("../assets/tab_class_nor@3x.png")
          },
          {
            "routerName": "community",
            "text": "圈子",
            "iconPath": require("../assets/tab_circle_pre@3x.png"),
            "selectedIconPath": require("../assets/tab_circle_nor@3x.png")
          },
          {
            "routerName": "mine",
            "text": "我",
            "iconPath": require("../assets/tab_me_pre@3x.png"),
            "selectedIconPath": require("../assets/tab_me_nor@3x.png")
          }
        ],
        "color": "#ABB2B9",
        "selectedColor": "#B78FDA",
      },
      selectBarIndex: 0
    }
  },
  created() {
    const that = this
    const routerName = this.$router.currentRoute.name
    switch (routerName) {
      case 'index':
        this.selectBarIndex = 0
        break;
      case 'classroom':
        this.selectBarIndex = 1
        break;
      case 'community':
        this.selectBarIndex = 2
        break;
      case 'mine':
        this.selectBarIndex = 3
        break;
      default: 
        this.selectBarIndex = 0
    }
  },
  methods: {
    linkNavBarPage(index, routerName, title) {
      this.$router.push({ name: routerName})
      document.title = title
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav-bar {
    width: 100%;
    height: 96px;
    background: #fff;
    border-top: 1px solid #d2d2d2;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .nav-bar img {
    width: 60px;
    height: 60px;
  }

  .nav-bar-link {
    font-size: 20px;
    color: #B78FDA;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
