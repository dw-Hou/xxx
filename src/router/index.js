import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Register from '@/components/Register'
import EventManage from '@/components/event/EventManage'
import ReportManage from '@/components/event/ReportManage'
import SubmitEvent from '@/components/event/SubmitEvent'
import Myprofile from '@/components/my/MyProfile'
import MyRequests from '@/components/my/MyRequests'
import MyReview from '@/components/my/MyReview'
import FunctionManage from '@/components/sys/FunctionManage'
import LabManage from '@/components/sys/LabManage'
import LogManage from '@/components/sys/LogManage'
import RoleManage from '@/components/sys/RoleManage'
import UserManage from '@/components/sys/UserManage'
import EventList from '@/components/event/EventList'

Vue.use(Router)
// Vue.use(VueResource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'Main',
      component: Main,
      children: [
        {path: '', name: 'He', component: HelloWorld},
        {path: '/EventManage', name: 'EventManage', component: EventManage},
        {path: '/ReportManage', name: 'ReportManage', component: ReportManage},
        {path: '/SubmitEvent', name: 'SubmitEvent', component: SubmitEvent},
        {path: '/Myprofile', name: 'Myprofile', component: Myprofile},
        {path: '/MyReview', name: 'MyReview', component: MyReview},
        {path: '/MyRequests', name: 'MyRequests', component: MyRequests},
        {path: '/FunctionManage', name: 'FunctionManage', component: FunctionManage},
        {path: '/LabManage', name: 'LabManage', component: LabManage},
        {path: '/LogManage', name: 'LogManage', component: LogManage},
        {path: '/RoleManage', name: 'RoleManage', component: RoleManage},
        {path: '/UserManage', name: 'UserManage', component: UserManage},
        {path: '/EventList', name: 'EventList', component: EventList}
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
