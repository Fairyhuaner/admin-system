<template>
  <div>
    <!-- 面包屑 -->
    <BreadCrumb :titleList="titleList"></BreadCrumb>
    <!-- /面包屑 -->
    <!-- 表格 -->
    <el-table :data="allRights" stripe style="width: 100%" border>
      <el-table-column type="index" label="#" width="100"> </el-table-column>
      <el-table-column prop="authName" label="权限名称"> </el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="level" label="权限等级">
        <template v-slot="scope">
          <el-tag v-if="scope.row.level === '0'">{{
            (+scope.row.level + 1) | levelFormat
          }}</el-tag>
          <el-tag type="success" v-if="scope.row.level === '1'">{{
            (+scope.row.level + 1) | levelFormat
          }}</el-tag>
          <el-tag type="warning" v-if="scope.row.level === '2'">{{
            (+scope.row.level + 1) | levelFormat
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BreadCrumb from '@/components/BreadCrumb.vue'
export default {
  created () {
    this.$store.dispatch('permissions/getAllRights', 'list')
  },
  data () {
    return {
      titleList: ['权限管理', '权限列表']
    }
  },
  methods: {},
  computed: {
    ...mapGetters(['allRights'])
  },
  watch: {},
  filters: {},
  components: { BreadCrumb }
}
</script>

<style scoped lang='less'>
</style>
