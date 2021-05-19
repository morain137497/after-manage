import { createRouter, createWebHistory } from 'vue-router'
import Main from '../layout/main'

const routes = [
  {
    path: '/',
    name: 'Index_',
    redirect: '/index',
    component: Main,
    meta: {
      title: '首页',
      icon: 'el-icon-s-home',
      sidebar: true
    },
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '首页'
        },
        component: () => import('../views/index')
      }
    ]
  },
  {
    path: '/system',
    name: 'System_',
    component: Main,
    meta: {
      title: '系统管理',
      icon: 'el-icon-s-home',
      sidebar: true
    },
    children: [
      {
        path: 'admin-list',
        name: 'adminList',
        meta: {
          title: '管理员列表'
        },
        component: () => import('../views/index')
      },
      {
        path: 'role-list',
        name: 'roleList',
        meta: {
          title: '角色列表'
        },
        component: () => import('../views/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      sidebar: false
    },
    component: () => import('../views/login')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
