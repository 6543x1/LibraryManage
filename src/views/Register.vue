<template>
    <div class="register">
  <a-form
    name="custom-validation"
    ref="formRef"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
     <a-form-item has-feedback label="用户名" name="username">
      <a-input v-model:value="formState.username" type="text" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="密码" name="password">
      <a-input v-model:value="formState.password" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="确认密码" name="checkPass">
      <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
    </a-form-item>
       <a-form-item has-feedback label="真实姓名" name="realName">
      <a-input v-model:value="formState.realName" type="text" autocomplete="off" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 5 }">
      <a-button type="primary" html-type="submit">提交注册</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
    </a-form-item>
  </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
import { message } from "ant-design-vue";
import {useRouter} from 'vue-router';
import service from "../api/services/service";
export default defineComponent({
  setup() {
    const router=useRouter();
    const formRef = ref();
    const formState = reactive({
      username:'',
      password: '',
      checkPass: '',
      realName:'',
      age: undefined,
    });


    let validatePass = async (rule, value) => {
      if (value === '') {
        return Promise.reject('Please input the password');
      } else {
        if (formState.checkPass !== '') {
          formRef.value.validateFields('checkPass');
        }

        return Promise.resolve();
      }
    };

    let validatePass2 = async (rule, value) => {
      if (value === '') {
        return Promise.reject('Please input the password again');
      } else if (value !== formState.password) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
    };

    const rules = {
        username: [{ 
            required: true,
            trigger: 'blur',
            message:'请输入用户名！'
        }],
      password: [
        {
          required: true,
          validator: validatePass,
          trigger: 'change',
          message:'请检查密码！',
        },
      ],
      checkPass: [
        {
        required:true,
          validator: validatePass2,
          trigger: 'change',
          message:'请检查密码！'
        },
      ],
      realName: [
        {
          required: true,
          trigger: 'blur',
          message:'请输入真名！'
        },
      ],
    };
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    };

    const handleFinish = values => {
      console.log(values, formState);
      console.log("register");
         let formData = new FormData();
      formData.append("username", formState.username);
      formData.append("password", formState.password);
      formData.append("realName", formState.realName);
      const hide=message.loading("注册中....",0);
      service
        .post("/api/user/register", formData)
        .then((res) => {
          console.log(res);
          setTimeout(hide,1);
          if (res.data.status == false) {
            message.error(res.data.msg);
            return;
          }
          else{
            message.success("注册成功!");
            router.push("/Login");
            
          }
          console.log("submit!", toRaw(formState));

          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const handleFinishFailed = errors => {
      console.log(errors);
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      formState,
      formRef,
      rules,
      layout,
      handleFinishFailed,
      handleFinish,
      resetForm,
    };
  },
});
</script>
<style scoped>
    .register {
  position: relative;
  margin-left:40%;
  top: 90%;
  width: 450px;
  height: 200px;
  margin-top: 10%;
}
</style>