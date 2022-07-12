import layout from '@/layout'

export default {
  path: '/sys',
  name: 'sys:user:list',
  component: layout,
  redirect: '/sys/users',
  mata: {
    title: '系统管理'
  },
  children: [
    {
      path: '/sys/users',
      name: 'sysUsers',
      component: () => import('@/views/user'),
      meta: {
        title: '用户管理'
      }
    }
  ]
}
