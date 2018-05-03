import Vue from 'vue';
import app from './app.vue';
import store from './store';
import * as svgicon from 'vue-svgicon';

Vue.use(svgicon, {
    tagName: 'svgicon'
});

new Vue({
    el: '#app',
    store,
    template: '<app/>',
    components: { app }
});