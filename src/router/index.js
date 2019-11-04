import Vue from "vue";
import VueRouter from "vue-router";
const Index = () => import("../views/Index/Index");
const Register = () => import("../views/Register/Register");
const NotFound = () => import("../views/NotFound/NotFound");
const Login = () => import("../views/Login/Login");
const Home = () => import("../views/Home/Home");
const InfoShow = () => import("../views/InfoShow/InfoShow");
const FundList = () => import("../views/FundList/FundList");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "*",
    name: "/404",
    component: NotFound
  },
  {
    path: "/index",
    name: "index",
    component: Index,
    children: [
      { path: "", component: Home },
      { path: "/home", component: Home },
      { path: "/infoshow", component: InfoShow },
      { path: "/fundlist", component: FundList }
    ]
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//路由守卫
// router.beforeEach((to, from, next) => {
//   // 判断是否有token
//   const isLodin = localStorage.eleToken ? true : false;
//   if (to.path == "/login" || to.path == "register") {
//     next();
//   } else {
//     isLodin ? next() : next("/login");
//   }
// });
export default router;
