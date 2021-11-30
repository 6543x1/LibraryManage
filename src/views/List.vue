<template>
  <div>
    <div class="nav">
      <ul class="select">
        <li>
          <a href="javascript:;">{{ className }}</a>
        </li>
        <li>
          <a href="javascript:;"
            ><img src="../assets/img/通知(3).png" alt="" />{{ notice }}</a
          >
        </li>
        <li>
          <a href="javascript:;"
            ><img src="../assets/img/发布.png" alt="" />{{ release }}</a
          >
        </li>
        <li>
          <a href="" @click="C_main"
            ><img src="../assets/img/班级.png" alt="" />{{ class_ }}</a
          >
        </li>
        <li>
          <a href="javascript:;"
            ><img src="../assets/img/头像.png" alt="" />{{ my }}</a
          >
        </li>
      </ul>
    </div>
    <div class="line"></div>
    <div class="process">
      <div class="t1">班级名单</div>
      <div class="line"></div>
      <div class="line0"></div>
      <ul id="people">
        <li>学生</li>
        <li v-for="(item, index) in student" :key="index">
          <p>学号：{{ item.username }}</p>
          <p>真实名字：{{ item.realName }}</p>
        </li>
        <li>老师</li>
        <li v-for="(item, index) in teacher" :key="index">
          <p>工号：{{ item.username }}</p>
          <p>真实名字：{{ item.realName }}</p>
        </li>
        <li v-for="(item, index) in assistant" :key="index">
          <p>学号：{{ item.username }}</p>
          <p>真实名字：{{ item.realName }}</p>
        </li>
        <li v-if="monitor!='undefined'">班长</li>
        <li v-for="(item, index) in monitor" :key="index">
          <p>身份：{{ item.username }}</p>
          <p>真实名字：{{ item.realName }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import service from "../api/services/service";
// import {useRoute} from 'vue-router';
// const route = useRoute();
export default {
  name: "List",
  data() {
    return {
      className: "FZU班务助手",
      notice: "通知",
      release: "发布",
      class_: "班级",
      my: "我的",
      assistant: [],
      monitor: [],
      student: [],
      teacher: [],
    };
  },
  computed: {
    classID() {
      return this.$route.params.classID;
    },
  },
  mounted() {
    this.getHandle();
  },

  methods: {
    C_main() {
      this.$router.push("/");
    },
    getHandle() {
      // console.log("hhh")
      let param = new FormData();
      param.append("classID", this.classID);
      let token =sessionStorage.getItem('token');
      service.defaults.headers.common["token"] = token;
      service
        .get("/api" + "/classes/" + this.classID + "/ClassMembers", param)
        .then((res) => {
          console.log(res);
          this.assistant = res.data.assistant;
          this.monitor = res.data.monitor;
          this.student = res.data.student;
          this.teacher = res.data.teacher;
          // router.push({path: '/List', query: {name: this.dispaly}});
          // console.log(this.student)
          this.list();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style src="@/assets/css/reset.css" scoped></style>
<style src="@/assets/css/nav.css" scoped></style>
<style src="@/assets/css/create.css" scoped></style>
<style lang="scss" scoped>
// @import url("../assets/css/reset.css");
// @import url("../assets/css/nav.css");
// @import url("../assets/css/create.css");
.process {
  height:auto;
  position: relative;
}
.process h2 {
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 30px;
}
.process a {
  display: inline-block;
  position: absolute;
  top: 30px;
  right: 20px;
}
.process .arrow {
  display: block;
  top: -5px;
  left: 0;
}
#people li {
  height: 100px;
  text-align: center;
  border-bottom: 1px solid black;
}
#people li p {
  padding-top: 10px;
  padding-left: 30px;
}
</style>
