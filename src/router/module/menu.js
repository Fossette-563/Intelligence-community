import layout from '@/layout'

export default {
  path: '/sys',
  name: 'sys:menu:list',
  component: layout,
  mata: {
    title: '系统管理',
    icon: 'el-icon-s-grid'
  },
  children: [
    {
      path: '/sys/menus',
      name: 'sysMenus',
      component: () => import('@/views/menu'),
      meta: {
        title: '菜单管理'
      }
    }
  ]
}
