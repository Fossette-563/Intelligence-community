<template>
  <div>
    <Menu></Menu>
  </div>
</template>

<script>
import Menu from './menu.vue'
export default {
  components: {
    Menu
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>
