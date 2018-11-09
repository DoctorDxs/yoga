<template>
  <div id="app" v-cloak>
    <keep-alive include="buyCourse, accountSet, community">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
[v-cloak] {
  display: none;
}

* {
  padding: 0;
  margin: 0;
}

body {
  overflow-x: hidden;
  background: #fff;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}


::-webkit-scrollbar {
  display: none;
}
</style>
