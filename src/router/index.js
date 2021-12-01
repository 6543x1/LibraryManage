import { createRouter,createWebHistory } from "vue-router";

import Login from "../views/Login.vue";

import MainLayout from "../views/MainLayout.vue";

const routes = [
 
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },

  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: {
      title: "用户登录",
    },
  },
  {
    path: "/",
    name: "MainLayout",
    component: MainLayout,
    meta: {
      title: "首页——图书馆管理系统",
    },
    children: [
      {
        path: '/SearchBook',
        name: 'SearchBook',
        component: () => import(/* webpackChunkName: "about" */ '../views/SearchBook.vue'),
      },
      {
        path:'/ReturnBook',
        name:'ReturnBook',
        component: () => import('../views/ReturnBook.vue'),
      },
      {
        path:'/MyReturn/:param',
        name:'MyReturn',
        component:()=>import('../views/MyReturn.vue'),
      },
      {
        path:'/AddBook',
        name:'AddBook',
        component:()=>import('../views/AddBook.vue'),
      },
      {
        path:'/AllBorrowed',
        name:'AllBorrowed',
        component: () => import('../views/AllBorrowed.vue'),
      }
    ]
  },
 
  


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  //  mode:"hash",
  // base: process.env.BASE_URL,=>vue2写法
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  var token = sessionStorage.getItem("token");
  //如果没登录,都导向登录页
  if (!token) {
    if (to.path !== "/Login") {
      next({ path: "/Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});
/**
 * 跳转登陆页面强制刷新，相当于F5
 */
router.afterEach((to, from) => {
  if (from.path != "/Login" && from.path != "/" && to.path == "/Login") {
    window.location.reload();
  }
});
export default router;
