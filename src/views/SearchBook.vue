<template>
    <div class="searchBook">
    <a-input-search
      v-model:value="value"
      placeholder="input search text"
      enter-button
      @search="onSearch"
    />
    <a-table :columns="columns" :data-source="myData">
        <!-- 懂了 columns会自动帮你加载全部的属性（除了key）显示到表格里 -->
        <!-- 如果有需要单独指定 像下面这样指定样式就好了 -->
        <!-- columns中可以指定！ -->
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #customTitle>
      <span>
        <smile-outlined />
        书名
      </span>
    </template>
    <!-- <template #tags="{ text: tags }">
      <span>
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
    </template> -->
    <!-- <template #action="{ record }">
      <span>
        <a @click="goInvite">Invite 一 {{ record.name }}</a>
        <a-divider type="vertical" />
        <a>Delete</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link">
          More actions
          <down-outlined />
        </a>
      </span>
    </template> -->
  </a-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
// defineComponent函数，只是对setup函数进行封装，返回options的对象；
// 最重要的是：在TypeScript下，给予了组件 正确的参数类型推断 。
// ref用于在setup中创建响应式数据
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import service from "../api/services/service";
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: {
      title: 'customTitle',
      customRender: 'name',
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    slots: {
      customRender: 'tags',
    },
  },
  {
    title: 'Action',
    key: 'action',
    slots: {
      customRender: 'action',
    },
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export default defineComponent({
  setup() {
    const value = ref('');
    let myData=ref([]);
    const onSearch = searchValue => {
      console.log('use value', searchValue);
      console.log('or use this.value', value.value);
      let param=new FormData();
      param.append("bookName",value);
      let token=sessionStorage.getItem('token');
      service.defaults.headers.common["token"] =token;
      console.log(sessionStorage.getItem('token'));
      service.post("/api/book/searchBook", param).then((res)=>{
          console.log(res); 
          myData=res.data.data;
          console.log(myData);
      }).catch((err)=>{
        console.log("POST ERROR",err);
      })
    };

    return {
      value,
      onSearch,
      data,
      columns,
      myData,
    };
  },
  
  components: {
    SmileOutlined,
    DownOutlined,
  },
  methods: {
      goInvite(){
          console.log('Invite someone', this.value);
      }
  }
  
});
</script>

<style scoped>

</style>