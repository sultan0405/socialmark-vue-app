import {createRouter, createWebHashHistory} from 'vue-router'
import store from '../store'


const routes = [
    {   
        name:'HomePage',
        path:'/',
        component:()=>import('@/views/Home')
    },
    {
        name:'LoginPage',
        path:'/login',
        component:()=>import('@/views/Login')
    },
    {
        name:'RegisterPage',
        path:'/register',
        component:()=>import('@/views/Register')
    },
    {
        name:'NewBookMark',
        path:'/new',
        component:()=>import('@/views/newBookmark')
    },
]




const router = createRouter({
    routes,
    history: createWebHashHistory()
})

router.beforeEach((to, from, next)=>{
    const _autheRequiredRoutes = ['HomePage'] // ! to.name === "HomePage"
    const _notauthRequiredRoutes = ['LoginPage', 'RegisterPage'] // ! gitmek islenyan pageLar
    const _isAuthanticated = store.getters._isAuthanticated;

    if(_notauthRequiredRoutes.indexOf(to.name) > -1 && _isAuthanticated) next(false)
    
    if (_autheRequiredRoutes.indexOf(to.name) > -1 ) {
       if(_isAuthanticated) next();
       else next({name: 'LoginPage'})
    } else {
        next()
    }
})



export default router;