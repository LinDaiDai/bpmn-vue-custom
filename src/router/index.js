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
    },
    {
        path: '/custom-modeler',
        component: () =>
            import ('../components/custom-modeler')
    }
]

export default new Router({
    mode: 'history',
    routes
})