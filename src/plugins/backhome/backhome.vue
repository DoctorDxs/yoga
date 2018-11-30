<template>
  <div class="backhome" @click="backToHmoe">
    <img src="../../assets/all_backhome_icon@3x.png" alt="">
    <span>回到首页</span>
  </div>
</template>

<script>
export default {
  name: "backhome",
  methods: {
    backToHmoe() {
      this.$router.push({name: 'index'})
    }
  }
};
</script>


<style scoped>
.backhome {
  height: 70px;
  width: 188px;
  background: #fff;
  font-size: 26px;
  color: #818C92;
  position: fixed;
  z-index: 9999999;
  display: flex;
  align-items: center;
  bottom: 421px;
  left: 0;
  border-radius: 0 35px 35px 0;
}

.backhome img {
  width: 36px;
  height: 36px;
  margin-right: 10px;
  margin-left: 20px;
}


</style>
