import Vue from "vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Game from '../views/Game.vue';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
// Vue.use(BootstrapVueIcons);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
