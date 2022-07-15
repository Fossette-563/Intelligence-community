import request from '@/utils/request'

/**图形验证码接口 */
const imgcode = () => {
  return request({ url: '/captcha', method: 'GET' })
}

/**登录接口 */
const login = (data) => {
  return request({
    url: `/login?username=${data.username}&password=${data.password}&code=${data.captchaImg}&token=${data.token}`,
    method: 'POST',
    data
  })
}
/**
 * 用户接口
 */
const userInfo = () => {
  return request({ url: '/user/info', method: 'GET' })
}
/**侧边栏接口 */
const nav = () => {
  return request({ url: '/menu/nav', method: 'GET' })
}
/**用户列表数据 */
const userList = (data) => {
  return request({
    url: '/user/list',
    method: 'GET',
    data
  })
}
/**添加用户接口 */
const addUserList = (data) => {
  return request({ url: '/user/add', method: 'POST', data })
}
/**编辑用户接口 */
const editUserList = (data) => {
  return request({ url: '/user/update', method: 'PUT', data })
}
/**分配角色 */
const assign = (id, data) => {
  return request({ url: `/user/assign/${id}`, method: 'POST', data })
}
/** */
export default {
  imgcode,
  login,
  userInfo,
  nav,
  userList,
  addUserList,
  editUserList,
  assign
}
