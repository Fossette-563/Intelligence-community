<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb separator-class="el-icon-arrow-right" iconfont>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/sys/users' }"
          >系统管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="btn">
        菜单
        <el-input
          v-model="query.username"
          placeholder="请输入内容"
          size="small "
          style="width: 200px; margin-top: 20px"
        ></el-input>
        <el-button
          type="success"
          size="small"
          style="margin-left: 10px"
          @click="getMenuList"
        >
          <i class="el-icon-search"></i>
          查询</el-button
        >
        <el-button icon="el-icon-edit" type="primary" @click="addUser"
          >新增
        </el-button>
      </div>

      <!-- 表格 -->
      <Table
        :treeProps="{ children: 'children' }"
        :clos="clos"
        :data="menuList"
        rowK="id"
        v-loading="loading"
      >
        <template v-slot:type="{ row }">
          <el-tag v-if="row.type === 1">菜单</el-tag>
          <el-tag type="success" v-if="row.type === 0">目录</el-tag>
          <el-tag type="danger" v-if="row.type === 2">按钮</el-tag>
        </template>
        <!-- 状态 -->
        <template v-slot:status="">
          <el-switch active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
        <template v-slot:action="{ row }">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="
              model = { ...row }
              $refs.from.open()
            "
            >编辑</el-button
          >
          <el-button type="danger" plain size="mini">删除</el-button>
        </template>
      </Table>
      <!-- 分页 -->
      <Page v-model="query" @change="getMenuList"></Page>
      <!-- From表单 添加&编辑-->
      <From
        ref="from"
        v-model="model"
        :options="options"
        :title="title"
        @determine="determine"
      >
      </From>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuApi from '@/api/menu'
import options from './options'
import { notifyTips } from '@/utils/notify'
import clos from './clos'
export default {
  name: 'MenuPage',
  data() {
    return {
      loading: false,
      options,
      menuList: [],
      clos,
      // total: 0,
      query: {
        current: 1,
        size: 5,
        username: ''
      },
      model: {
        children: [],
        component: '',
        icon: '',
        label: '',
        parentId: '',
        path: '',
        perms: '',
        status: '',
        type: ''
      }
    }
  },
  created() {
    this.getMenuList()
  },
  computed: {
    ...mapGetters(['authoritys']),
    flag() {
      let f = false
      this.authoritys.forEach((item) => {
        if (item === 'sys:user:add') {
          f = true
        }
      })
      return f
    },
    title() {
      return this.model.id ? '编辑菜单' : '添加菜单'
    }
  },
  methods: {
    //确定添加，编辑
    async determine() {
      // console.log(1)
      try {
        const value = await this.$refs.from.visible()
        value.status = value.status ? value.status : '1'
        await (!this.model.id ? MenuApi.addMenuList : MenuApi.editMenuList)(
          value
        )
        this.getMenuList()
        notifyTips(
          '提示',
          this.model.id ? '编辑请求成功' : '新增请求成功',
          'success'
        )
      } catch (error) {
        console.log(error)
      }
      this.$refs.from.close()
    },
    // 新增按钮
    addUser() {
      this.$refs.from.open()
    },
    // 获取菜单列表
    async getMenuList() {
      try {
        this.loading = true
        const res = await MenuApi.menuList()
        this.menuList = res
        console.log(res)
        // this.total = res.total
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  position: relative;
  width: 100%;
  .el-button--primary {
    position: absolute;
    right: 4px;
    top: 20px;
  }
}
</style>
