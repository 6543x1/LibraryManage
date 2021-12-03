<template>
    <div class="searchBook">
    <a-input-search
      v-model:value="value"
      placeholder="输入作者名字"
      enter-button
      @search="goSearch"
    />
    <a-table :columns="columns" :data-source="searchResult" :rowKey='record=>record.bookID' :pagination="pagination">
        <!-- 懂了 columns会自动帮你加载全部的属性（除了key）显示到表格里 -->
        <!-- 如果有需要单独指定 像下面这样指定样式就好了 -->
        <!-- columns中可以指定！ -->
    <template #bookName="{ text }">
      <!-- 可以在这里对字段进行超链接 -->
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
    <template #action="{record}">
      <span>
        <a-button type="link" @click="goBorrow(record.bookID)" :disabled="record.borrowed">{{record.borrowed===true ?"已借出":"借书"}}</a-button>
        <a-divider type="vertical" />
        <!-- <a>查看详情</a>
        <a-divider type="vertical" /> -->
        <!-- <a class="ant-dropdown-link">
          More actions
          <down-outlined />
        </a> -->
      </span>
    </template>
  </a-table>
  </div>
</template>

<script>
import { defineComponent, ref ,reactive} from 'vue';
// defineComponent函数，只是对setup函数进行封装，返回options的对象；
// 最重要的是：在TypeScript下，给予了组件 正确的参数类型推断 。
// ref用于在setup中创建响应式数据
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import service from "../api/services/service";
import { message } from 'ant-design-vue';
const columns = [
  {
    dataIndex: 'bookName',
    key: 'bookName',
    slots: {
      title: 'customTitle',//可以作为列的别名来使用
      customRender: 'bookName',//控制那个#bookName
    },
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: '位置',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: '分类',
    key: 'type',
    dataIndex: 'type',
    slots: {
      customRender: 'tags',
    },
  },
   {
    title: 'ISBN',
    dataIndex: 'iSBN',
    key: 'iSBN',
  },
  {
    title: '操作',
    key: 'action',
    slots: {
      customRender: 'action',
    },
  },
];
export default defineComponent({
  setup() {
    const value = ref('');
    let myData=reactive([]);
    const onSearch = searchValue => {
      console.log('use value', searchValue);
      console.log('or use this.value', value.value);
     
    };

    return {
      value,
      onSearch,
      columns,
      myData,
    };
  },
  data(){
      return{
        searchResult:[],
        pagination:{
              defaultPageSize:10,
              showTotal: total => `共查询到 ${total} 条数据`,
              showSizeChanger:true,
              pageSizeOptions: ['5', '10', '15', '20'],
              onShowSizeChange:(current, pageSize)=>this.pageSize = pageSize,
            }
        

      }
  },
  
  components: {
    SmileOutlined,
    DownOutlined,
  },
  methods:{
      goBorrow(bookID){
          console.log('borrowSomeBook',bookID);
          if(typeof(bookID)=="undefined"){
            return;
          }
      let param=new FormData();
      param.append("bookID",bookID);
      let token=sessionStorage.getItem('token');
      service.defaults.headers.common["token"] =token;
      console.log(sessionStorage.getItem('token'));
      service.post("/api/book/borrowBook", param).then((res)=>{
          console.log(res); 
          this.searchResult=res.data.data;
          console.log(this.searchResult);
          if(res.data.status==true)
          message.success("借书成功");
          else
          message.error("请重试");
      }).catch((err)=>{
        console.log("POST ERROR",err);
      })
      },
      goSearch(){
         let param=new FormData();
      param.append("author",this.value);
      console.log(this.value);
      let token=sessionStorage.getItem('token');
      service.defaults.headers.common["token"] =token;
      console.log(sessionStorage.getItem('token'));
      service.post("/api/book/searchBookByAuthor", param).then((res)=>{
          console.log(res); 
          this.searchResult=res.data.data;
          console.log(this.searchResult);
      }).catch((err)=>{
        console.log("POST ERROR",err);
      })
      }
  }
  
});
</script>

<style scoped>

</style>