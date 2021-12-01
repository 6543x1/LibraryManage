<template>
  <div class="returnBook">
    <a-input-search
      v-model:value="value"
      placeholder="输入书本的ID,一次一本"
      size="large"
      @search="onSearch"
    >
      <template #enterButton>
        <a-button-primary>以书本ID归还</a-button-primary>
      </template>
    </a-input-search>
      <br />
      <br />
      <br/>
    <a-input-search
      v-model:value="value2"
      placeholder="输入书本的ISBN，同ISBN多本书请以ID归还"
      size="large"
      @search="onSearch2"
    >
      <template #enterButton>
        <a-button-primary>以ISBN归还</a-button-primary>
      </template>
    </a-input-search>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
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
});
</script>

<style>
</style>