<template>
  <div class="searchBook">
    <a-table
      :columns="columns"
      :data-source="searchResult"
      :data-rowKey="(record) => record.bookID"
      :pagination="pagination"
      bordered
    >
      <!-- 懂了 columns会自动帮你加载全部的属性（除了key）显示到表格里 -->
      <!-- 如果有需要单独指定 像下面这样指定样式就好了 -->
      <!-- columns中可以指定！ -->
      <template
        #filterDropdown="{
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          column,
        }"
      >
        <div style="padding: 8px">
          <a-input
            ref="searchInput"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="
              (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
            "
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon><SearchOutlined /></template>
            Search
          </a-button>
          <a-button
            size="small"
            style="width: 90px"
            @click="handleReset(clearFilters)"
          >
            Reset
          </a-button>
        </div>
      </template>
      <template #filterIcon="filtered">
        <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
      <template #customRender="{ text, column }">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              class="highlight"
              :key="i"
            >
              {{ fragment }}
            </mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{ text }}
        </template>
      </template>
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
      <template #action="{ record }">
        <span>
          <a-button
            type="link"
            @click="setReturned(record.bookID, record.bookBorrower)"
            >设为已归还</a-button
          >
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
import { defineComponent, ref, reactive,toRefs } from "vue";
// defineComponent函数，只是对setup函数进行封装，返回options的对象；
// 最重要的是：在TypeScript下，给予了组件 正确的参数类型推断 。
// ref用于在setup中创建响应式数据
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import service from "../api/services/service";
import { message } from "ant-design-vue";
import { SearchOutlined } from "@ant-design/icons-vue";
const columns = [
  {
    dataIndex: "bookName",
    key: "bookName",
    slots: {
      title: "customTitle", //可以作为列的别名来使用
      customRender: "bookName", //控制那个#bookName
       filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
    },
           onFilter: (value, record) =>
            record.bookName.toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                console.log(searchInput.value);
                searchInput.value.focus();
              }, 100);
            }
          },
  },
  {
    title: "作者",
    dataIndex: "author",
    key: "author",
     slots:{
              filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          },
           onFilter: (value, record) =>
            record.author.toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                console.log(searchInput.value);
                searchInput.value.focus();
              }, 100);
            }
          },
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
    title: "借书时间",
    dataIndex: "borrowTime",
    key: "borrowTime",
     slots:{
              filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          },
           onFilter: (value, record) =>
            record.borrowTime.toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                console.log(searchInput.value);
                searchInput.value.focus();
              }, 100);
            }
          },
  },
  {
    title: "借书者图书证号",
    dataIndex: "bookBorrower",
    key: "bookBorrower",
     slots:{
              filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          },
           onFilter: (value, record) =>
            record.bookBorrower.toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                console.log(searchInput.value);
                searchInput.value.focus();
              }, 100);
            }
          },
  },
  {
    title: "操作",
    key: "action",
    slots: {
      customRender: "action",
    },
  },
];
const data = [
  {
    author: "王珊",
    bookID: "1",
    bookName: "数据库系统概论",
    iSBN: "9787040406641",
    position: "1号柜子一层",
    type: "大学教材",
  },
  {
    author: "王珊",
    bookID: "2",
    bookName: "数据库系统概论",
    iSBN: "9787040406641",
    position: "2号柜子二层",
    type: "大学教材",
  },
];
export default defineComponent({
  setup() {
    const value = ref("");
    let myData = reactive([]);
    const onSearch = (searchValue) => {
      console.log("use value", searchValue);
      console.log("or use this.value", value.value);
    };
    const state = reactive({
      searchText: "",
      searchedColumn: "",
    });
    const searchInput = ref();
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      state.searchText = selectedKeys[0];
      state.searchedColumn = dataIndex;
    };

    const handleReset = (clearFilters) => {
      clearFilters();
      state.searchText = "";
    };

    return {
      value,
      onSearch,
      data,
      columns,
      myData,
      handleSearch,
      handleReset,
      searchInput,
      ...toRefs(state),
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

  components: {
    SmileOutlined,
    DownOutlined,
    SearchOutlined,
  },
  methods: {
    setReturned(bookID, bookBorrower) {
      console.log("borrowSomeBook", bookID);
      if (typeof bookID == "undefined") {
        return;
      }
      let param = new FormData();
      param.append("bookID", bookID);
      param.append("borrower", bookBorrower);
      let token = sessionStorage.getItem("token");
      service.defaults.headers.common["token"] = token;
      console.log(sessionStorage.getItem("token"));
      service
        .post("/api/book/adminSetBorrowed", param)
        .then((res) => {
          console.log(res);
          this.searchResult = res.data.data;
          console.log(this.searchResult);
          if (res.data.status == true) message.success("设置成功");
          else message.error("请重试");
        })
        .catch((err) => {
          console.log("POST ERROR", err);
        });
    },
    getAllBorrowed() {
      //  let param=new FormData();
      //  param.append("bookID",bookID);
      let token = sessionStorage.getItem("token");
      service.defaults.headers.common["token"] = token;
      console.log(sessionStorage.getItem("token"));
      service
        .post("/api/book/allBorrowed")
        .then((res) => {
          console.log(res);
          this.searchResult = res.data.data;
          console.log(this.searchResult);
          if (res.data.status == true) message.success("获取成功");
          else message.error("请重试");
        })
        .catch((err) => {
          console.log("POST ERROR", err);
        });
    },
  },
  mounted() {
    this.getAllBorrowed();
  },
});
</script>

<style scoped>
</style>