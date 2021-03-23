import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import {Dialog, Message} from "element-ui";
import {Notification} from "element-ui";
import {MessageBox} from "element-ui";

Vue.component(Message.name, Message)
Vue.prototype.$message = Message;
Vue.component(Notification)
Vue.prototype.$notify = Notification
Vue.prototype.$confirm = MessageBox.confirm
Dialog.props.lockScroll.default = false;
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
