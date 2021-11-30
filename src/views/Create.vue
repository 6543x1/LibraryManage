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
      <div class="t1">创建班级</div>
      <div class="line"></div>
      <!-- anction里面填服务器的地址 -->
      <form action="" id="table">
        <p style="display: inline">班级名称</p>
        <p style="color: red; display: inline">*</p>
        <input id="_in" type="text" name="username" required v-model="name" />
        <br /><br />
        <br /><br />
        <p style="display: inline; font-size: 18px; margin-left: -80%">
          无需审核
        </p>
        <div class="testswitch">
          <input class="testswitch-checkbox" id="onoffswitch" type="checkbox" />
          <label class="testswitch-label" for="onoffswitch">
            <span class="testswitch-inner"></span>
            <span class="testswitch-switch"></span>
          </label>
        </div>
        <br /><br />
        <br /><br />
        <input
          type="button"
          value="立即提交"
          id="sub"
          @click="postHandle()"
          style="text-align: center"
        />
      </form>
    </div>
  </div>
</template>

<script>
import service from "../api/services/service";
export default {
  name: "Create",
  data() {
    return {
      className: "FZU班务助手",
      notice: "通知",
      release: "发布",
      class_: "班级",
      my: "我的",
      name: "",
      token: "",
    };
  },
  methods: {
    C_main() {
      this.$router.push("/");
    },
    // axios.get 发起get请求
    // 参数一 表示请求的地址
    // 参数二 表示配置的信息
    // params 表示传递到服务器端的数据，以url参数的形式拼接在请求地址后面
    // headers 表示请求头
    // getHandle(){
    //     axios.get("",{
    //         params:{
    //             name: 1,
    //         },
    //         headers:{}
    //     }).then(res=>console.log(res));
    // },
    // post请求传递三个参数
    // 请求地址
    // 传递的数据 在请求体中传递
    //      axios默认发送的数据是json格式的
    // 配置信息
    //   headers
    //      conttent-type:'application/json'默认
    postHandle() {
      let param = new FormData();
      param.append("name", this.name);
      service.defaults.headers.common["token"] = sessionStorage.getItem('token');
      service
        .post("https://www.jessieback.top/classes/createClass", param)
        .then((res) => {
          console.log(res);
          confirm(
            "创建成功" +
              "\n" +
              "班级码为：" +
              res.data.data +
              "\n" +
              "可在我的班级-班级详细中查看"
          );
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
