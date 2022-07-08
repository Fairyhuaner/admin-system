<template>
  <el-container class="container">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu background-color="#373d41" text-color="#fff" unique-opened>
          <el-submenu index="1">
            <template #title>我的工作台</template>
            <el-menu-item index="1-1">111</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template #title>我的工作台</template>
            <el-menu-item index="2-1">111</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template #title>我的工作台</template>
            <el-menu-item index="3-1">111</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
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
.container {
  height: 100vh;
  .el-header {
    background-color: #262a2b;
  }
  .el-aside {
    background-color: #373d41;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
// 侧边栏样式
.el-menu {
  border-right: none;
}
</style>
