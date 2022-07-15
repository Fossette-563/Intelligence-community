<template>
  <div>
    <el-tag
      v-for="(item, index) in tag"
      :key="index"
      type="warning"
      :effect="item.path === $route.path ? 'dark' : 'plain'"
      :closable="item.path !== '/home'"
      size="small"
      @close="colesTag(item, index)"
      @click="putag(item.path)"
    >
      {{ item.meta.title }}
    </el-tag>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'TagView',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['tag'])
  },
  methods: {
    ...mapMutations({
      settag: 'TagView/closeTag'
    }),
    // 跳转
    putag(path) {
      this.$router.push(path)
    },
    // 删除
    colesTag(item, index) {
      const tags = this.tag
      if (item.path === this.$route.path) {
        this.$router.push(tags[index - 1].path)
      }
      this.settag(index)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tag {
  margin-left: 10px;
  cursor: pointer;
}
</style>
