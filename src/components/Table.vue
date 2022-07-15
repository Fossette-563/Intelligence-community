<template>
  <div>
    <el-table :row-key="rowK" :data="data" :tree-props="treeProps" border>
      border style="margin-top: 20px; width: 100%">
      <el-table-column
        v-for="(item, index) in clos"
        :key="index"
        :prop="item.prop"
        :label="item.title"
        :align="item.align"
        :width="item.width"
        :type="item.type"
      >
        <template v-if="item.slot" v-slot="{ row, $index, column }">
          <slot
            :name="item.slot"
            :row="row"
            :index="$index"
            :column="column"
          ></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Table',

  props: {
    data: {
      type: Array,
      default: () => []
    },
    clos: {
      type: Array,
      default: () => []
    },
    treeProps: {
      type: Object,
      default: () => {}
    },
    rowK: {
      type: String,
      default: 'id'
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 20px;
}
</style>
