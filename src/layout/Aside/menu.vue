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
      <MenuItem
        v-for="item in menuList"
        :key="item.path"
        :item="item"
      ></MenuItem>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(['nav']),
    menuList() {
      const data = removeChildren(this.nav)
      return filterMenus(data)
    }
  },
  created() {
    console.log(this.menuList)
  }
}
</script>

<style lang="scss" scoped></style>
