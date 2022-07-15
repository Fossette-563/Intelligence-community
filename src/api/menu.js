import request from '@/utils/request'

// 列表
const menuList = (data) => {
  return request({ url: '/menu/list', method: 'GET', data })
}

/**
 * 添加
 * @param data
 * @returns {AxiosPromise}
 */
const addMenuList = (data) => {
  return request({
    url: '/menu/add',
    method: 'POST',
    data
  })
}
/**
 * 修改
 * @param data
 * @returns {AxiosPromise}
 */
const editMenuList = (data) => {
  return request({
    url: '/menu/update',
    method: 'PUT',
    data
  })
}
export default { menuList, addMenuList, editMenuList }
