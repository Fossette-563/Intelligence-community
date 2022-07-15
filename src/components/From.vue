<template>
  <div>
    <el-dialog :title="title" :visible="dialogFormVisible">
      <el-form ref="from" :label-width="lw" :model="model">
        <el-form-item
          v-for="(item, key) in formModel"
          :key="key"
          :label="item.title"
          :rules="item.rules"
          :prop="key"
        >
          <el-avatar
            v-if="item.tag === 'avatar'"
            :size="60"
            :src="item.src"
          ></el-avatar>
          <el-input
            v-if="item.tag === 'input'"
            v-model="model[key]"
            :clearable="item.clearable"
            :placeholder="item.holader"
            :show-password="item.showPassword"
            :show-word-limit="item.showWordLimit"
          ></el-input>
          <template v-if="item.tag === 'radio'">
            <el-radio v-model="model['status']" label="1">正常</el-radio>
            <el-radio v-model="model['status']" label="2">禁用</el-radio>
          </template>
          <el-select
            v-if="item.tag === 'select'"
            v-model="model[key]"
            :placeholder="item.holader"
          >
            <el-option
              v-for="sel in item.type"
              :key="sel.id"
              :label="sel.title"
              :value="sel.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="resetFields">取 消</el-button>
        <el-button size="mini" type="success" @click="$emit('determine')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'From',
  props: {
    title: String,
    options: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Object,
      default: () => {}
    },
    lw: {
      type: String,
      default: '100px'
    },
    menu: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      dialogFormVisible: false,
      model: {},
      menuList: []
    }
  },
  computed: {
    formModel() {
      return { ...this.options }
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          this.model = { ...val }
        })
      }
    }
  },
  methods: {
    // 控制表单显示隐藏
    open() {
      this.dialogFormVisible = true
    },
    close() {
      this.dialogFormVisible = false
    },
    // 表单验证
    async visible() {
      await this.$refs.from.validate()
      return { ...this.model }
    },
    // 取消按钮
    resetFields() {
      this.$refs.from.resetFields()
      this.dialogFormVisible = false
      this.model = {}
    }
  }
}
</script>

<style lang="scss" scoped></style>
