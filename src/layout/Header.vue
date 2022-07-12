<template>
  <div class="Header-com">
    <div class="left">
      <span class="icon-left"
        ><i
          class="el-icon-s-fold"
          style="font-size: 30px; margin-top: 10px; color: #fff"
        ></i>
        <!-- tagView -->
        <TagView></TagView>
      </span>
    </div>
    <div class="right">
      <el-avatar :src="userInfo.avatar"></el-avatar>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userInfo.username
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">个人设置</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus" @click.native="getlayOut"
            >安全退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions({
      layOut: 'user/getLayOut'
    }),
    async getlayOut() {
      await this.$confirm('确定要退出吗', '提示', {
        type: 'warning'
      })
      await this.layOut()
      this.$router.push('/login')
      this.$notify({
        title: '提示',
        message: '正在安全退出中...',
        type: 'success',
        duration: 1000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Header-com {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .left {
    width: 100%;
  }
  .right {
    width: 150px;
    display: flex;
    align-items: center;
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
