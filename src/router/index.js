import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: '登录'
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: '登录'
    },
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta: {
      name: '控制台'
    },
    component: () => import("../views/Layout/index.vue"),
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: '首页'
        },
        component: () => import("../views/Console/index.vue")
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    // redirect: "index",
    meta: {
      name: '信息管理'
    },
    component: () => import("../views/Layout/index.vue"),
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: '信息列表'
        },
        component: () => import("../views/Info/index.vue")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: '信息分类'
        },
        component: () => import("../views/Info/categroy.vue")
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    // redirect: "index",
    meta: {
      name: '用户管理'
    },
    component: () => import("../views/Layout/index.vue"),
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: '用户列表'
        },
        component: () => import("../views/User/index.vue")
      },
      {
        path: "/userCategory",
        name: "UserCategory",
        meta: {
          name: '用户分类'
        },
        component: () => import("../views/User/categroy.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
