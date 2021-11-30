<template>
  <div class="myNav">
    <div class="nav">
      <ul class="select">
        <li>
          <router-link to="/Login">FZU班务助手</router-link>
        </li>
        <li>
          <router-link to="/MyNotification"
            ><img :src="aside[0].path!=$route.path?aside[0].normal:aside[0].selected" alt="" />通知</router-link
          >
        </li>
        <li>
          <router-link to="/PublicHome">
            <img :src="aside[1].path!=$route.path?aside[1].normal:aside[1].selected" alt="" />发布</router-link
          >
        </li>
        <li @click="C_main">
          <router-link to="/">
            <img :src="aside[2].path!=$route.path?aside[2].normal:aside[2].selected" alt="" />班级</router-link
          >
        </li>
        <li>
          <router-link to="/MyInfo">
            <img :src="aside[3].path!=$route.path?aside[3].normal:aside[3].selected" alt="" />我的</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyNav",
  methods: {
    C_main() {
      console.log("goto /");
      this.$router.push("/");
    },
    gotoMyNotification() {
      console.log("gotoMyNotification");
      this.$router.push("/MyNotification");
    },
  },
  data() {
    return {
      aside: [
        {
          path: "/MyNotification",
          normal: require("../assets/img/通知(3).png"),
          selected: require("../assets/img/通知(4).png"),
        },
        {
          path: "/PublicHome",
          normal: require("../assets/img/发布.png"),
          selected: require("../assets/img/fabu.png"),
        },
        {
          path: "/",
          normal: require("../assets/img/班级2.png"),
          selected: require("../assets/img/班级.png"),
        },
        {
          path: "/MyInfo",
          normal: require("../assets/img/wo-de.png"),
          selected: require("../assets/img/wo-de-.png"),
        },
      ],
    };
  },
};
</script>
<style>
.select {
  list-style: none;
}
.select li {
  margin: 0;
  padding: 0;
  border: 0;
  list-style-type: none;
}
.select ul {
  list-style-type: none;
}
#nav a{
  font-weight: bold;
  color:#2c3e50;
}
.router-link-active {
  color: rgb(0,176,255) !important;
}

</style>
<style src="@/assets/css/nav.css" scoped>
</style>
