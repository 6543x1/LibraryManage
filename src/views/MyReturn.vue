<template>
  <div class="myReturn">
    <a-table
      :columns="myColumn"
      :data-source="searchResult"
      :rowKey="(record) => record.bookID"
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
            @click="goReturn(record.bookID)"
            :disabled="param != 1"
            >还书</a-button
          >
          <a-divider type="vertical" />
          <a>延长借阅时长</a>
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
import { defineComponent, ref, reactive,toRefs } from "vue";
// defineComponent函数，只是对setup函数进行封装，返回options的对象；
// 最重要的是：在TypeScript下，给予了组件 正确的参数类型推断 。
// ref用于在setup中创建响应式数据
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import service from "../api/services/service";
import { message } from "ant-design-vue";
import { useRoute } from "vue-router";
import { SearchOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  name: "MyReturn",
  setup() {
    const param = ref("");
    const route = useRoute();
     const state = reactive({
      searchText: '',
      searchedColumn: '',
    });
    const searchInput = ref();
      const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      state.searchText = selectedKeys[0];
      state.searchedColumn = dataIndex;
    };

    const handleReset = clearFilters => {
      clearFilters();
      state.searchText = '';
    };
    param.value = route.params.param;
    console.log(route.params.param);
    console.log("param value", param.value);
    return {
      param,
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
  computed: {
    myColumn() {
      let columns = [
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
          title: "操作",
          key: "action",
          slots: {
            customRender: "action",
          },
        },
      ];
      console.log(this.param);

      return columns;
    },
  },
  components: {
    SmileOutlined,
    DownOutlined,
    SearchOutlined,
  },
  mounted() {
    console.log("MyReturnMounted!", this.param); //直接根据param决定调用哪个函数就好了
    if (this.param == 1) {
      console.log("我的未借图书");
    } else {
      console.log("我的已归还图书");
    }
    console.log(this.myColumn);
    this.getMyBorrowed();
  },
  watch: {
    $route(to, from) {
      console.log("MyReturn!route changed!");
      console.log(from); //可以根据from的params.param来判定应该调用哪个函数,记得this.$set一下
      console.log(to);
      if (from.params.param == 1) {
        console.log("我的未借图书");
        this.param = 2;
      } else {
        console.log("我的已归还图书");
        this.param = 1;
      }
      this.getMyBorrowed();
    },
  },
  methods: {
    getMyBorrowed() {
      let formData = new FormData();
      console.log("before post param is", this.param);
      if (this.param == 1) {
        formData.append("finished", false);
      } else {
        formData.append("finished", true);
      }
      service.defaults.headers.common["token"] =
        sessionStorage.getItem("token");
      service
        .post("/api/book/myBorrowed", formData)
        .then((res) => {
          if (res.data.status == true) {
            this.searchResult = res.data.data;
            message.success("查询成功");
          } else {
            message.success("查询失败");
          }
        })
        .catch((err) => console.log(err));
    },
    goReturn(bookID) {
      console.log("return Book ", bookID);
      let formData = new FormData();
      formData.append("bookID", bookID);
      service.defaults.headers.common["token"] =
        sessionStorage.getItem("token");
      service
        .post("/api/book/returnBook", formData)
        .then((res) => {
          if (res.data.status == true) {
            this.searchResult = res.data.data;
            message.success("归还成功");
            this.getMyBorrowed();
          } else {
            message.success("归还失败");
          }
        })
        .catch((err) => console.log(err));
    },
  },
});
</script>

<style>
</style>