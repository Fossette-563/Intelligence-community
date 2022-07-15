<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb iconfont separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/sys/users' }"
          >系统管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="btn">
        用户名
        <el-input
          v-model="query.username"
          placeholder="请输入内容"
          size="small "
          style="width: 200px; margin-top: 20px"
        ></el-input>
        <el-button
          size="small"
          style="margin-left: 10px"
          type="success"
          @click="getUserList"
        >
          <i class="el-icon-search"></i>
          查询
        </el-button>
        <el-button icon="el-icon-edit" type="primary" @click="addUser"
          >新增
        </el-button>
      </div>
      <!-- 表格 -->
      <Table v-loading="loading" :clos="clos" :data="userList">
        <!--        头像-->
        <template v-slot:avatar="{ row }">
          <el-avatar :src="row.avatar"></el-avatar>
        </template>
        <!--        角色-->
        <template v-slot:roles="{ row }">
          <el-tag v-for="item in row.roles" :key="item.id"
            >{{ item.name }}
          </el-tag>
        </template>
        <!--        状态-->
        <template v-slot:status="{ row }">
          <el-switch
            active-value="1"
            inactive-value="0"
            @change="stateBtn(row)"
          >
          </el-switch>
        </template>
        <!--        操作-->
        <template v-slot:action="{ row }">
          <el-button
            plain
            size="mini"
            type="primary"
            @click="
              model = { ...row }
              $refs.from.open()
            "
            >编辑
          </el-button>
          <el-button plain size="mini" type="warning" @click="handleRole(row)"
            >分配角色</el-button
          >
          <el-button plain size="mini" type="danger">删除</el-button>
        </template>
      </Table>
      <!-- 分页 -->
      <Page v-model="query" :total="total" @change="getUserList"></Page>
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
        <el-form label-width="50px">
          <el-form-item label="角色">
            <el-select v-model="integers" multiple style="width: 100%">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </Dialog>
    </el-card>
  </div>
</template>

<script>
import clos from './clos'
import UserApi from '@/api/user'
import RoleApi from '@/api/role'
import { notifyTips } from '@/utils/notify'
import options from './options'

export default {
  name: 'User',
  data() {
    return {
      options,
      roleList: [],
      integers: [],
      loading: false,
      clos,
      userList: [],
      total: 0,
      query: {
        current: 1,
        size: 5,
        username: ''
      },
      model: {
        avatar: '',
        email: '',
        password: '',
        status: 1,
        username: ''
      }
    }
  },
  created() {
    this.getUserList()
  },
  computed: {
    title() {
      return this.model.id ? '编辑用户' : '新增用户'
    }
  },
  methods: {
    // 分配角色
    async Dialogcon(row) {
      console.log(row)
      try {
        const assign = await UserApi.assign(this.model.id, this.integers)
        console.log(assign, 'a')
        notifyTips('提示', '请求成功', 'success')
        this.getUserList()
      } catch (error) {
        console.log(error)
      }
      this.$refs.dilog.hide()
    },
    // 分配角色按钮
    async handleRole(row) {
      const result = []
      this.integers = []
      try {
        const { records } = await RoleApi.roleList()
        console.log(records, 'rol')
        this.roleList = records
        records.forEach((i) => {
          result.push(
            ...row.roles.filter((item) => {
              return item.id === i.id
            })
          )
        })
        this.integers = result.map((v) => v.id)
        this.$refs.dilog.show()
        this.model = { ...row }
      } catch (error) {
        console.log(error)
      }
    },
    //确定添加，编辑
    async determine() {
      // console.log(1)
      try {
        const value = await this.$refs.from.visible()
        value.avatar =
          'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg'
        value.status = value.status ? value.status : '1'
        await (!this.model.id ? UserApi.addUserList : UserApi.editUserList)(
          value
        )
        this.getUserList()
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
    // 修改状态
    stateBtn(row) {
      // console.log(row, 'row')
    },
    // 获取用户信息
    async getUserList() {
      try {
        this.loading = true
        const { records, total } = await UserApi.userList(this.query)
        this.userList = records
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

  .el-button--primary {
    position: absolute;
    right: 4px;
    top: 20px;
  }
}
</style>
