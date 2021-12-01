<template>
  <a-form layout="vertical" :model="formState" v-bind="formItemLayout">
    <a-form-item label="书名">
      <a-input v-model:value="formState.bookName" placeholder="输入书名" />
    </a-form-item>
    <a-form-item label="作者">
      <a-input v-model:value="formState.author" placeholder="输入作者" />
    </a-form-item>
     <a-form-item label="图书类型">
      <a-input v-model:value="formState.type" placeholder="输入图书类型" />
    </a-form-item>
     <a-form-item label="作者">
      <a-input v-model:value="formState.ISBN" placeholder="输入图书的ISBN" />
    </a-form-item>
     <a-form-item label="图书所在位置">
      <a-input v-model:value="formState.author" placeholder="输入图书在图书馆中的位置" />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary">添加到数据库中</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { computed, defineComponent, reactive } from 'vue';
export default defineComponent({
  setup() {
    const formState = reactive({
      bookName: '',
      author: '',
      type:'',
      ISBN:'',
      position:'',
    });
    const formItemLayout = computed(() => {
      const { layout } = formState;
      return layout === 'horizontal'
        ? {
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 14,
            },
          }
        : {};
    });
    const buttonItemLayout = computed(() => {
      const { layout } = formState;
      return layout === 'horizontal'
        ? {
            wrapperCol: {
              span: 14,
              offset: 4,
            },
          }
        : {};
    });
    return {
      formState,
      formItemLayout,
      buttonItemLayout,
    };
  },
});
</script>