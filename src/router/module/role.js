import layout from '@/layout'

export default {
  path: '/roles',
  name: 'sys:role:list',
  component: layout,
  mata: {
    title: '系统管理'
  },
  children: [
    {
      path: '/sys/roles',
      name: 'sysroles',
      component: () => import('@/views/role'),
      meta: {
        title: '角色管理'
      }
    }
  ]
}
