import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Register from '@/components/Register'
import EventManage from '@/components/event/EventManage'
import ReportManage from '@/components/event/ReportManage'
import CreateReport from '@/components/event/CreateReport'
import Myprofile from '@/components/my/MyProfile'
import MyRequests from '@/components/my/MyRequests'
import MyReview from '@/components/my/MyReview'
import FunctionManage from '@/components/sys/FunctionManage'
import LabManage from '@/components/sys/LabManage'
import LogManage from '@/components/sys/LogManage'
import RoleManage from '@/components/sys/RoleManage'
import UserManage from '@/components/sys/UserManage'
import EventList from '@/components/event/EventList'
import * as dao from '../components/store/dao'

Vue.use(Router)
// Vue.use(VueResource)

function requireAuth (to, from, next) {
  if (!dao.getCookie('ACCESS_TOKEN')) {
    // window.localStorage.getItem(constant.APP_USER_TOKEN)
    next({
      path: '/login'
    })
  } else {
    next()
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Login,
      beforeEnter: requireAuth
    },
    {
      path: '/index',
      name: 'Main',
      component: Main,
      children: [
        {path: '', name: 'He', component: HelloWorld, beforeEnter: requireAuth},
        {path: '/EventManage', name: 'EventManage', component: EventManage, beforeEnter: requireAuth},
        {path: '/ReportManage', name: 'ReportManage', component: ReportManage, beforeEnter: requireAuth},
        {path: '/CreateReport', name: 'CreateReport', component: CreateReport, beforeEnter: requireAuth},
        {path: '/Myprofile', name: 'Myprofile', component: Myprofile, beforeEnter: requireAuth},
        {path: '/MyReview', name: 'MyReview', component: MyReview, beforeEnter: requireAuth},
        {path: '/MyRequests', name: 'MyRequests', component: MyRequests, beforeEnter: requireAuth},
        {path: '/FunctionManage', name: 'FunctionManage', component: FunctionManage, beforeEnter: requireAuth},
        {path: '/LabManage', name: 'LabManage', component: LabManage, beforeEnter: requireAuth},
        {path: '/LogManage', name: 'LogManage', component: LogManage, beforeEnter: requireAuth},
        {path: '/RoleManage', name: 'RoleManage', component: RoleManage, beforeEnter: requireAuth},
        {path: '/UserManage', name: 'UserManage', component: UserManage, beforeEnter: requireAuth},
        {path: '/EventList', name: 'EventList', component: EventList, beforeEnter: requireAuth}
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
