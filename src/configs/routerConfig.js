import { AsyncComponent } from '@hocs'

export default [
  {
    isDefault: true,
    defaultPath: '/layout',
  },
  {
    path: '/layout',
    noExact: true,
    component: AsyncComponent(() => import('@containers/Layout')),
    childRoutes: [
      {
        isDefault: true,
        defaultPath: '/home',
      },
      {
        path: '/home2',
        noNav: true,
        iconType: 'home',
        text: '主页2',
        component: AsyncComponent(() => import('@containers/Home')),
      },
      {
        path: '/home',
        iconType: 'home',
        text: '主页',
        component: AsyncComponent(() => import('@containers/Home')),
      },
      {
        sort: 'userManagement2',
        text: '用户管理2',
        iconType: 'user',
        childRoutes: [
          {
            sort: 'userManagement3',
            text: '用户管理2',
            iconType: 'user',
            childRoutes: [
              {
                path: '/userTable2',
                iconType: 'table',
                text: '用户列表2',
                component: AsyncComponent(() => import('@containers/userManagement/UserTable')),
              },
              {
                path: '/addUser2',
                iconType: 'user-add',
                text: '新增用户2',
                component: AsyncComponent(() => import('@containers/userManagement/AddUser')),
              },
              {
                path: '/addUser3',
                iconType: 'user-add',
                text: '新增用户3',
                component: AsyncComponent(() => import('@containers/userManagement/AddUser')),
              },
              {
                path: '/addUser4',
                iconType: 'user-add',
                text: '新增用户4',
                component: AsyncComponent(() => import('@containers/userManagement/AddUser')),
              }
            ]
          },
          {
            path: '/userTable',
            iconType: 'table',
            text: '用户列表',
            component: AsyncComponent(() => import('@containers/userManagement/UserTable')),
          },
          {
            path: '/addUser',
            iconType: 'user-add',
            text: '新增用户',
            component: AsyncComponent(() => import('@containers/userManagement/AddUser')),
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: AsyncComponent(() => import('@containers/Login'))
  }
]