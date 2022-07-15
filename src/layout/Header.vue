<template>
  <div class="Header-com">
    <div class="left">
      <span class="icon-left"
        ><i
          :class="
            $store.state.menu.foldedstatus
              ? 'el-icon-s-unfold'
              : 'el-icon-s-fold'
          "
          style="font-size: 30px; color: #fff; cursor: pointer"
          @click="folded"
        >
        </i>
      </span>
      <!-- tagView -->
      <TagView></TagView>
    </div>
    <div class="right">
      <div
        style="display: flex; justify-content: space-between; cursor: pointer"
      >
        <el-tooltip
          class="item"
          effect="dark"
          content="取消全屏"
          placement="bottom"
        >
          <i
            class="el-icon-rank"
            style="
              font-size: 28px;
              color: #fff;
              margin-top: 10px;
              -webkit-transform: rotate(20deg);
            "
          >
          </i>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="关闭全部标签"
          placement="bottom"
        >
          <i
            class="el-icon-circle-close"
            style="font-size: 28px; color: #fff; margin: 10px 10px 0px 10px"
            @click="closeAllTag"
          ></i>
        </el-tooltip>
      </div>
      <el-avatar :src="userInfo.avatar" style="cursor: pointer"> </el-avatar>
      <el-dropdown>
        <span
          class="el-dropdown-link"
          style="color: #fff; font-size: 20px; cursor: pointer"
        >
          {{ userInfo.username
          }}<i
            class="el-icon-arrow-down el-icon--right"
            style="color: #fff"
          ></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人设置</el-dropdown-item>
          <el-dropdown-item @click.native="getlayOut"
            >安全退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import TagView from '@/components/TagView.vue'
export default {
  name: 'Header',
  components: { TagView },
  data() {
    return {}
  },
  computed: {
    ...mapState({ setfolded: 'menu/foldedstatus' }),
    ...mapGetters(['userInfo'])
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(val) {
        const { meta, path } = val
        this.getTagView({ meta, path })
      }
    }
  },
  methods: {
    ...mapMutations({
      getfolded: 'menu/setfolded',
      getTagView: 'TagView/setTagView',
      closeAll: 'TagView/closeTagAll'
    }),
    // 关闭所有tag
    closeAllTag() {
      this.closeAll()
    },
    /**折叠动画 */
    folded() {
      this.getfolded()
    },
    /**退出 */
    ...mapActions({
      layOut: 'user/getLayOut'
    }),
    /**退出登录 */
    async getlayOut() {
      try {
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
      } catch (e) {
        console.log(e)
      }
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
    display: flex;
    align-items: center;
    .icon-left {
      width: 50px !important;
    }
  }
  .right {
    width: 280px;
    display: flex;
    align-items: center;
    .el-header {
      padding-left: 0px;
    }
    .el-avatar {
      margin-top: 10px;
    }
    .el-dropdown {
      margin: 10px 0 0 23px;
    }
  }
}
</style>
