import Vue from "vue";
import VueRouter from "vue-router";
const Registe = () => import("../views/Registe/Registe");
const NotFound = () => import("../views/NotFound/NotFound");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/registe"
  },
  {
    path: "*",
    name: "/404",
    component: NotFound
  },
  {
    path: "/registe",
    name: "registe",
    component: Registe
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
