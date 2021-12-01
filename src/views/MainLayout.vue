<template>

  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys1"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">主页</a-menu-item>
        <a-menu-item key="2">退出登录</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <user-outlined />
                借书
              </span>
            </template>
            <a-menu-item key="1" @click="gotoSearchBookName()">搜索书名</a-menu-item>
            <a-menu-item key="2">搜索作者</a-menu-item>
            <a-menu-item key="3">搜索ISBN</a-menu-item>
            <a-menu-item key="4">option4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <laptop-outlined />
                还书
              </span>
            </template>
            <a-menu-item key="5" @click="gotoReturnBook">还书</a-menu-item>
            <a-menu-item key="6" @click="gotoMyReturn(1)">我的未还图书</a-menu-item>
            <a-menu-item key="7" @click="gotoMyReturn(2)">我的全部借书</a-menu-item>
            <a-menu-item key="8">option8</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <!-- 此处可以直接用v-if来判定是否渲染就好了 -->
            <template #title>
              <span>
                <notification-outlined />
                管理员
              </span>
            </template>
            <a-menu-item key="9" @click="gotoAddBook">添加书籍到图书馆</a-menu-item>
            <a-menu-item key="10" @click="gotoAllBooks">查看所有被借出的书籍</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <!-- 定义路由出口，路由页面会被显示于此 可以给路由指定名字 以让同一页面有多个路由 -->
          <!-- https://next.router.vuejs.org/zh/guide/essentials/named-views.html -->
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
// 如何保持Layout而进行不同
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name:'MainLayout',
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  },

  setup() {
    return {
      selectedKeys1: ref(['2']),
      selectedKeys2: ref(['1']),
      collapsed: ref(false),
      openKeys: ref(['sub1']),
    };
  },
  methods: {
    gotoSearchBookName(){
      console.log("gotoSearchBookName",this.selectedKeys2);
      this.$router.push({name:'SearchBook'});
    },
    gotoReturnBook(){
      console.log("gotoReturnBook",this.selectedKeys2);
      this.$router.push({name:'ReturnBook'});
    },
    gotoMyReturn(type){
       console.log("gotoMyReturn",this.selectedKeys2);
       console.log(type);
       this.$router.push({name:'MyReturn',params:{param:type}});
    },
    gotoAddBook(){
      this.$router.push({name:'AddBook'});
    },
    gotoAllBooks(){
      this.$router.push({name:'AllBorrowed'});
    }
  }
});
</script>
<style scoped>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>