import request from '@/utils/request'

/**角色列表接口 */
const roleList = (data) => {
  return request({ url: '/role/list', method: 'GET', data })
}
/**角色添加接口 */
const addRole = (data) => {
  return request({ url: '/role/add', method: 'POST', data })
}
/**角色编辑接口 */
const editRole = (data) => {
  return request({ url: '/role/update', method: 'PUT', data })
}
/** 获取角色信息*/
const roleInfoAPI = (id) => {
  return request({
    url: `/role/info/${id}`,
    method: 'GET'
  })
}
/**
 * 分配权限
 */
const rolePermAPI = (id, roles) => {
  return request({
    url: `/role/perm/${id}`,
    method: 'POST',
    data: roles
  })
}
export default {
  roleList,
  addRole,
  editRole,
  roleInfoAPI,
  rolePermAPI
}
