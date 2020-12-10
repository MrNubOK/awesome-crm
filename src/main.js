import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from '@/utils/message.plugin'

import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)

var firebaseConfig = {
    apiKey: "AIzaSyArersc-am7Yv8hoATNtamFF3Q9_Idc2V8",
    authDomain: "awesome-crm-b4d66.firebaseapp.com",
    projectId: "awesome-crm-b4d66",
    storageBucket: "awesome-crm-b4d66.appspot.com",
    messagingSenderId: "374756970802",
    appId: "1:374756970802:web:839b2829090cb2483d472b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})




