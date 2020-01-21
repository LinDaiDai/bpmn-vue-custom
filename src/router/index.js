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
        path: '/custom-renderer',
        component: () =>
            import ('../components/custom-renderer')
    },
    {
        path: '/custom-modeler',
        component: () =>
            import ('../components/custom-modeler')
    },
    {
        path: '/custom-context-pad',
        component: () =>
            import ('../components/custom-context-pad')
    },
    {
        path: '/custom-properties-panel',
        component: () =>
            import ('../components/custom-properties-panel')
    }
]

export default new Router({
    mode: 'history',
    routes
})