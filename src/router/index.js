import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [{
        path: '/',
        redirect: '/custom-palette'
    },
    {
        path: '/custom-palette',
        component: () =>
            import ('./../components/custom-palette')
    }
]

export default new Router({
    mode: 'history',
    routes
})