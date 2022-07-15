<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/sys/users' }"
          >系统管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="btn">
        角色
        <el-input
          v-model="query.name"
          placeholder="请输入内容"
          size="small "
          style="width: 200px; margin-top: 20px"
        ></el-input>
        <el-button
          type="success"
          size="small"
          style="margin-left: 10px"
          @click="getRoleList"
        >
          <i class="el-icon-search"></i>
          查询</el-button
        >
        <el-button
          class="primary"
          icon="el-icon-edit"
          type="primary"
          @click="addUser"
          >新增
        </el-button>
        <!-- 表格 -->
        <Table :clos="clos" :data="roleList" v-loading="loading">
          <!-- 状态 -->
          <template v-slot:status="{ row }">
            <el-switch
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="getState(row)"
            >
            </el-switch>
          </template>
          <!-- 操作 -->
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
            <el-button plain size="mini" type="warning" @click="EditRole(row)"
              >分配权限</el-button
            >
            <el-button type="danger" plain size="mini">删除</el-button>
          </template>
        </Table>
        <!-- 分页 -->
        <Page v-model="query" @change="getRoleList" :total="total"></Page>
        <!-- From表单 添加&编辑-->
        <From
          ref="from"
          v-model="model"
          :options="options"
          :title="title"
          @determine="determine"
        >
        </From>
        <Dialog ref="dilog" @determine="Dialogcon">
          <el-tree
            :data="treeData"
            :default-checked-keys="checkedKeys"
            :props="defaultProps"
            default-expand-all
            node-key="id"
            show-checkbox
            @check="handleCheckChange"
          ></el-tree>
        </Dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import RoleApi from '@/api/role'
import UserApi from '@/api/user'
import options from './options'
import clos from './clos'
import { notifyTips } from '@/utils/notify'
export default {
  name: 'RolePage',
  data() {
    return {
      loading: false,
      options,
      clos,
      roleList: [],
      total: 0,
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeData: [],
      query: {
        current: 1,
        size: 5,
        name: ''
      },
      model: {
        code: '',
        email: '',
        name: '',
        password: '',
        remark: '',
        status: 1,
        username: ''
      }
    }
  },
  created() {
    this.getRoleList()
  },
  computed: {
    title() {
      return this.model.id ? '编辑角色' : '新增角色'
    }
  },
  methods: {
    async getTree() {
      try {
        const { menus } = await UserApi.nav()
        this.treeData = menus
      } catch (e) {
        console.log(e)
      }
    },
    // 分配权限确定
    async Dialogcon() {
      try {
        await RoleApi.rolePermAPI(this.model.id, this.checkedKeys)
        notifyTips('提示', '更新权限成功', 'success')
        this.$refs.dilog.hide()
        this.getRoleList()
      } catch (e) {
        console.log(e)
      }
    },
    handleCheckChange(data, { checkedKeys }) {
      this.checkedKeys = checkedKeys
    },
    // 分配权限按钮
    async EditRole(row) {
      try {
        this.model = { ...row }
        this.checkedKeys = []
        await this.getTree()
        this.dgTitle = `给${row.name}分配角色`
        const { menuIds } = await RoleApi.roleInfoAPI(row.id)
        this.checkedKeys = menuIds
        this.$refs.dilog.show()
      } catch (e) {
        console.log(e)
      }
    },
    //确定添加，编辑
    async determine() {
      // console.log(1)
      try {
        const value = await this.$refs.from.visible()
        value.status = value.status ? value.status : '1'
        await (!this.model.id ? RoleApi.addRole : RoleApi.editRole)(value)
        this.getRoleList()
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
    // 更改状态
    getState(row) {
      console.log(row)
    },
    // 获取角色列表
    async getRoleList() {
      try {
        this.loading = true
        const { records, total } = await RoleApi.roleList(this.query)
        console.log(records)
        this.roleList = records
        this.total = total
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
  .primary {
    position: absolute;
    right: 4px;
    top: 20px;
  }
}
</style>
