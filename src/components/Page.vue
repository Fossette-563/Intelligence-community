<template>
  <div>
    <el-pagination
      @size-change="(size) => change('size', size)"
      @current-change="(current) => change('current', current)"
      :current-page="pageValue.current"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageValue.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Page',
  props: {
    total: Number,
    value: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    pageValue() {
      return this.value || {}
    }
  },
  methods: {
    change(type, value) {
      const person = {
        ...this.value,
        [type]: value
      }
      this.$emit('input', person)
      this.$emit('change', person)
    }
  }
}
</script>

<style lang="scss" scoped></style>
