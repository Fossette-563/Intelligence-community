/**删除空chidren */
export const removeChildren = (data) => {
  if (data.length <= 0) {
    return []
  }
  data.forEach((item) => {
    //判断有children并且长度小于0则删除空children
    if (item.children && item.children.length <= 0) {
      delete item.children
    }
    if (item.children && item.children.length > 0) {
      removeChildren(item.children)
    }
  })
  return data
}

export const filterMenus = (data) => {
  if (data.length <= 0) {
    return []
  }
  data[1].children.forEach((item) => {
    if (item.children && item.children.length > 0) {
      if (!item.children[0].name && !item.children[0].icon) {
        delete item.children
      }
    }
  })
  data[0].path = '/home'
  return data
}
