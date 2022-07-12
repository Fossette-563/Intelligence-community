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
export default {
  imgcode,
  login,
  userInfo,
  nav
}
