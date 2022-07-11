<template>
  <div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#222d32"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="1">
        <i class="el-icon-s-home"></i>
        <span slot="title">控制台</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="1">
          <i class="el-icon-user"></i>
          <span>用户管理</span></el-menu-item
        >
        <el-menu-item index="2">
          <i class="el-icon-user-solid"></i>
          <span>角色管理</span></el-menu-item
        >
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span>菜单管理</span></el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
