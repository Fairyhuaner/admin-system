<template>
  <div>
    <!-- 面包屑 -->
    <BreadCrumb :titleList="titleList"></BreadCrumb>
    <!-- /面包屑 -->
    <!-- 表格 -->
    <el-table :data="userList" stripe style="width: 100%" border>
      <el-table-column prop="id" label="#" width="100"> </el-table-column>
      <el-table-column prop="username" label="权限名称"> </el-table-column>
      <el-table-column prop="mobile" label="路径"></el-table-column>
      <el-table-column prop="role_name" label="权限等级">
        <template>
          <el-button
            type="primary"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格 -->
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
export default {
  created () { },
  data () {
    return {
      titleList: ['权限管理', '角色列表']
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: { BreadCrumb }
}
</script>

<style scoped lang='less'>
</style>
