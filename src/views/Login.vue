<template>
  <div class="login">
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="用户名">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input v-model:value="formState.password" type="password" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">登录</a-button>
        <a-button style="margin-left: 10px" @click="TryConsole">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
// 　Vue3 的一大特性函数 ---- setup

// 　　1、setup函数是处于 围绕 beforeCreate 和 created 生命周期钩子运行  也就说在 setup函数中是无法 使用 data 和 methods 中的数据和方法的

// 　　2、setup函数是 Composition API（组合API）的入口

// 　　3、在setup函数中定义的变量和方法最后都是需要 return 出去的 不然无法再模板中使用
//https://www.cnblogs.com/zqlym/p/14710266.html
import { defineComponent, reactive, toRaw } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import service from "../api/services/service";
export default defineComponent({
  name: "Login",
  setup() {
    const formState = reactive({
      username: "",
      password: "",
    });
    const router = useRouter();

    const onSubmit = () => {
      let formData = new FormData();
      formData.append("username", formState.username);
      formData.append("password", formState.password);
      const hide=message.loading("登录中....",0);
      service
        .post("/api/user/login", formData)
        .then((res) => {
          console.log(res);
          setTimeout(hide,1);
          if (res.data.status == false) {
            message.error(res.data.msg);
            return;
          }
          sessionStorage.setItem("token", res.data.data.jwtToken);
          console.log("submit!", toRaw(formState));

          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      formState,
      onSubmit,
    };
  },
  methods: {
    TryConsole() {
      console.log(this.formState);
    },
  },
});
</script>
<style scoped>
.login {
  position: relative;
  margin-left:40%;
  top: 90%;
  width: 400px;
  height: 200px;
  margin-top: 10%;
}
</style>