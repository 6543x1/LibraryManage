<template>
  <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
       <!-- <a-button type="primary">Button></a-button> -->
         <a-config-provider :locale="zh_CN">
    <router-view />
    <!-- </div> -->
         </a-config-provider>
  <!-- </div>
    <div id="app">
    <img src="./assets/logo.png">
    <a-button type="primary">Button></a-button>
  </div> -->
</template>
<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  name: "app",
  data() {
    return {
      zh_CN
    };
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;//原来在这里 艹
    }
  }
}
</style>
