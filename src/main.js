import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './public/sass/main.sass';

import Vue from 'vue';
import App from './public/App.vue';

new Vue({
    render: h => h(App),
}).$mount('#app');
