<template>
  <div id="app" v-cloak>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    window.alert = function(name){
			 var iframe = document.createElement("IFRAME");
			iframe.style.display="none";
			iframe.setAttribute("src", 'data:text/plain,');
			document.documentElement.appendChild(iframe);
			window.frames[0].window.alert(name);
			iframe.parentNode.removeChild(iframe);
		}
			
  }
}
</script>

<style>
[v-cloak] {
  display: none;
}

video {
  object-fit: fill;
}

* {
  padding: 0;
  margin: 0;
}

img {
  object-fit: cover;
}

.body {
  height: 100%;
}

body, html {
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

.mint-swipe-indicator {
  width: 16px!important;
  height: 16px!important;
  margin: 8px 20px!important;
}

 .no-more-data {
    font-size: 20px;
    color: #999;
    margin-top: 30px;
  }

  .no-data-icon img {
    width: 441px;
    height: 331px;
    display: block;
    margin: 30px auto 0;
  }

</style>
