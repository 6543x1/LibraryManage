<template>
  <div class="returnBook">
    <a-input-search
      v-model:value="value"
      placeholder="输入书本的ID,一次一本"
      size="large"
      @search="returnByID"
      class ="byID"
    >
      <template #enterButton>
        <a-button-primary @click="returnByID">以书本ID归还</a-button-primary>
      </template>
    </a-input-search>
      <br />
      <br />
      <br/>
    <a-input-search
      v-model:value="value2"
      placeholder="输入书本的ISBN，同ISBN多本书请以ID归还"
      size="large"
      @search="returnByISBN"
      class="byISBN"
    >
      <template #enterButton>
        <a-button-primary>以ISBN归还</a-button-primary>
      </template>
    </a-input-search>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import service from "../api/services/service";
import {message} from "ant-design-vue";
export default defineComponent({
  name: "ReturnBook",
  setup() {
    const value = ref("");
    const value2 = ref("");

    const onSearch = (searchValue) => {
      console.log("use value", searchValue);
      console.log("or use this.value", value.value);
    };
    const onSearch2 = (searchValue) => {
      console.log("use value", searchValue);
      console.log("or use this.value", value2.value);
    };

    return {
      value,
      value2,
      onSearch,
      onSearch2,
    };
  },
  methods: {
    returnByID(){
       let formData = new FormData();
      if(this.value==undefined){
        message.error("请填写ID！");
        return;
      }
      formData.append("bookID", this.value);
      message.loading("归还中....",1);
      service
        .post("/api/book/returnBook", formData)
        .then((res) => {
          console.log(res);
          if (res.data.status == false) {
            message.error(res.data.msg);
            return;
          }
          message.success(res.data.msg);
        })
        .catch((err) => {
          console.log(err);
          message.error("出现错误");
        });
    },
     returnByISBN(){
       if(this.value2==undefined){
        message.error("请填写ISBN！");
        return;
      }
       let formData = new FormData();
       console.log(this.value2);
      formData.append("ISBN", this.value2);
      message.loading("归还中....",1);
      service
        .post("/api/book/returnBookByISBN", formData)
        .then((res) => {
          console.log(res);
          if (res.data.status == false) {
            message.error(res.data.msg);
            return;
          }
          message.success(res.data.msg);
        })
        .catch((err) => {
          console.log(err);
          message.error("出现错误");
        });
    },
  }
});
</script>

<style scoped>
</style>