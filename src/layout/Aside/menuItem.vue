<template>
  <div>
    <el-menu-item :index="item.path" v-if="!item.children">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      :index="item.id + ''"
      v-if="item.children && item.children.length > 0"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <MenuItem
        v-for="it in item.children"
        :item="it"
        :key="it.path"
      ></MenuItem>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
