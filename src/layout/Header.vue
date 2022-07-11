<template>
  <div class="Header-com">
    <div class="left"></div>
    <div class="right">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <el-dropdown>
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline"
            >螺蛳粉</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check"
            >蚵仔煎</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
.Header-com {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .right {
    .el-avatar {
      margin-top: 10px;
      margin-right: 10px;
    }
    .el-dropdown {
      margin-right: 20px;
    }
  }
}
</style>
