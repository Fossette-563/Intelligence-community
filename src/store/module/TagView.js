import { getItem, removeItem, removeItemAll, setItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    tag: getItem('tag') || []
  },
  mutations: {
    // 关闭所有tag
    closeTagAll(state) {
      state.tag = [
        {
          meta: {
            title: '控制台'
          },
          path: '/home'
        }
      ]
      setItem('tag', state.tag)
    },
    // 删除tag
    closeTag(state, index) {
      state.tag.splice(index, 1)
      setItem('tag', state.tag)
    },
    // 添加tag
    setTagView(state, tags) {
      const tag = state.tag.find((item) => item.path === tags.path)
      if (!tag) {
        state.tag.push(tags)
        setItem('tag', state.tag)
      }
    }
  },
  actions: {}
}
