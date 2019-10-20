import Vue from "vue";
import VueRouter from "vue-router";
const Registe = () => import('../views/Registe/Registe')

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/registe"
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
