<template>
  <div class="myReturn">
    <a-table
      :columns="myColumn"
      :data-source="searchResult"
      :rowKey="(record) => record.bookID"
      :pagination="pagination"
    >
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
      <template #action="{ record }" v-if="param == 6">
        <span>
          <a-button
            type="link"
            @click="goBorrow(record.bookID)"
            :disabled="record.borrowed"
            >{{ record.borrowed === true ? "已借出" : "借书" }}</a-button
          >
          <a-divider type="vertical" />
          <a>查看详情</a>
          <a-divider type="vertical" />
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
import { defineComponent, ref, reactive } from "vue";
// defineComponent函数，只是对setup函数进行封装，返回options的对象；
// 最重要的是：在TypeScript下，给予了组件 正确的参数类型推断 。
// ref用于在setup中创建响应式数据
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import service from "../api/services/service";
import { message } from "ant-design-vue";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "MyReturn",
  setup() {
    const param=ref('');
    const route=useRoute();
    param.value=route.params;
    console.log(route.params);
    console.log('param value',param.value);
    return {
      param,
    };
  },
  data() {
    return {
      searchResult: [],
      pagination: {
        defaultPageSize: 10,
        showTotal: (total) => `共查询到 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "15", "20"],
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
      },
    };
  },
  computed: {
      myColumn() {
    let columns = [
  {
    dataIndex: "bookName",
    key: "bookName",
    slots: {
      title: "customTitle", //可以作为列的别名来使用
      customRender: "bookName", //控制那个#bookName
    },
  },
  {
    title: "作者",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "位置",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "分类",
    key: "type",
    dataIndex: "type",
    slots: {
      customRender: "tags",
    },
  },
  {
    title: "ISBN",
    dataIndex: "iSBN",
    key: "iSBN",
  },  
    {
    title: '操作',
    key: 'action',
    slots: {
      customRender: 'action',
    },
    }
  
];
    console.log(this.param);

    
    return columns;
}
  },
  components: {
      SmileOutlined,
      DownOutlined,
  },
  mounted(){
      console.log("MyReturnMounted!",this.param);//直接根据param决定调用哪个函数就好了
      console.log(this.myColumn);
  },
  watch:{
      '$route'(to,from){
          console.log("MyReturn!route changed!");
          console.log(from);//可以根据from的params.param来判定应该调用哪个函数,记得this.$set一下
          console.log(to);
      }
  }
});
</script>

<style>
</style>