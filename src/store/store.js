import Vue from 'vue';
import Vuex from 'vuex';
import draggable from './module/draggable';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      draggable: draggable,
    }
});