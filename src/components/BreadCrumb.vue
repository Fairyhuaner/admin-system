<template>
  <!-- 面包屑 -->
  <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item, index) in titleList" :key="index">{{
      item
    }}</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- /面包屑 -->
</template>

<script>
export default {
  props: {
    titleList: {
      type: Array,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.bread {
  padding-bottom: 22px;
}
</style>
