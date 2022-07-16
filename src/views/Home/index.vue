<template>
  <el-container class="container">
    <el-header>
      <div>
        <img src="@/assets/logo.png" class="logo" alt="" />
        <span class="header-title">电商后台管理系统</span>
      </div>
      <el-button type="info" class="exit-btn" @click="exitBtn">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#373d41"
          text-color="#fff"
          active-text-color="#669999"
          :default-active="$route.path"
          unique-opened
          router
        >
          <el-submenu index="1">
            <template #title>用户管理</template>
            <el-menu-item index="/home/users">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template #title>权限管理</template>
            <el-menu-item index="/home/roles">角色列表</el-menu-item>
            <el-menu-item index="/home/rights">权限列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template #title>商品管理</template>
            <el-menu-item index="/home/goods">商品列表</el-menu-item>
            <el-menu-item index="/home/sorts">分类参数</el-menu-item>
            <el-menu-item index="/home/categories">商品分类</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template #title>订单管理</template>
            <el-menu-item index="/home/orders">订单列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template #title>数据统计</template>
            <el-menu-item index="/home/reports">数据报表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
        <p v-if="$route.path === '/home'">欢迎登录</p>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () {
  },
  data () {
    return {}
  },
  methods: {
    exitBtn () {
      this.$store.commit('users/setToken', '')
      this.$router.push('/login')
    }
  },
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #262a2b;
    .logo {
      width: 61px;
      height: 56px;
    }
    .header-title {
      color: #fff;
      font-size: 22px;
      margin-left: 20px;
      line-height: 60px;
    }
    .exit-btn {
      // justify-content: center;
      text-align: right;
    }
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
