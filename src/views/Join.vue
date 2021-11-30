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
    <div class="process">
      <div class="t1">加入班级</div>
      <div class="line"></div>
      <!-- anction里面填服务器的地址 -->
      <!-- url:https://www.jessieback.top/classes/{classID}/join -->
      <form action="" id="table">
        <p style="display: inline">邀请码</p>
        <input
          id="_in"
          type="text"
          name="username"
          required
          v-model="classID"
        />
        <br /><br />
        <input
          type="button"
          value="提交申请"
          id="sub"
          @click="postHandle"
          style="text-align: center"
        />
      </form>
    </div>
  </div>
</template>

<script>
import service from "../api/services/service";
export default {
  name: "Join",
  data() {
    return {
      className: "FZU班务助手",
      notice: "通知",
      release: "发布",
      class_: "班级",
      my: "我的",
      classID: "",
    };
  },

  methods: {
    C_main() {
      this.$router.push("/");
    },
    // Y7L2ZB班级码
    postHandle() {
      let param = new FormData();
      param.append("classID", this.classID);
      let token =sessionStorage.getItem('token');
      // console.log(token)
      service.defaults.headers.common["token"] = token;
      service
        .post("api" + "/classes/" + this.classID + "/join", param)
        .then((res) => {
          console.log(res);
          confirm(res.msg);
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
</style>
