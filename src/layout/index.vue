<template>
  <div class="layout-page">
    <el-container>
      <el-aside width="200px"><Aside></Aside></el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <el-main
          ><Main></Main
        ></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from './Aside'
import Main from './Main'
import Header from './Header'
export default {
  name: 'layoutPage',
  components: {
    Aside,
    Main,
    Header
  },
  data() {
    return {}
  },
  mutations: {}
}
</script>

<style lang="scss" scoped>
.layout-page {
  width: 100%;
  height: 100%;
  .el-header,
  .el-footer {
    background-color: #18bc9c;
    color: #333;
  }

  .el-aside {
    background-color: #222d32;
    color: #333;
  }

  .el-main {
    background-color: #e6ebee;
    color: #333;
  }
  .el-container {
    margin-bottom: 40px;
    width: 100%;
    height: 100%;
  }
}
</style>
