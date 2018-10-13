import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import Routes from './routes';

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy);

import axios from 'axios';
import VueAxios from 'vue-axios';

import HighchartsVue from 'highcharts-vue';
import VueMoment from "vue-moment";

Vue.use(VueMoment);

Vue.prototype.$server = process.env.VUE_APP_API_URL || '/v1'

Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.use(VueAxios, axios);
Vue.use(HighchartsVue);

const router = new VueRouter({
  mode: 'history',
  routes: Routes
});

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
