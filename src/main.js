import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
Vue.config.productionTip = false
    // 以下为bpmn工作流绘图工具的样式
import 'bpmn-js/dist/assets/diagram-js.css' // 左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
// 右侧的属性栏样式
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
// 引入全局的css
import '@/css/app.css'

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')