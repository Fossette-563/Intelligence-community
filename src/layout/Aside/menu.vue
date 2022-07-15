<template>
  <div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#222d32"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="$store.state.menu.foldedstatus"
    >
      <MenuItem v-for="(item, i) in menuList" :key="i" :item="item"></MenuItem>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import MenuItem from './menuItem.vue'
import { removeChildren, filterMenus } from '@/utils/removeChildren'
export default {
  name: 'Menu',
  components: {
    MenuItem
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    ...mapState({ folded: 'menu/foldedstatus' }),
    ...mapGetters(['nav']),
    menuList() {
      return filterMenus(removeChildren(this.nav))
      // const data = removeChildren(this.nav)
      // return filterMenus(data)
    }
  },
  created() {
    console.log(this.menuList)
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>
