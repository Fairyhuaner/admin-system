<template>
  <div class="users-page">
    <!-- 面包屑 -->
    <BreadCrumb :titleList="titleList"></BreadCrumb>
    <!-- /面包屑 -->
    <div class="main">
      <!-- 输入框 -->
      <el-row>
        <el-col :span="8">
          <div>
            <el-input
              placeholder="请输入内容"
              v-model="userInputSearch"
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchBtn"
              ></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            style="margin-left: 22px"
            @click="addUserDialog = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- /输入框 -->
      <!-- 表格 -->
      <el-table :data="userList" stripe style="width: 100%" border>
        <el-table-column prop="id" label="#" width="100"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="changeUserState(scope.row.id, scope.row.mg_state)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="editBtn(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="openDelBox(scope.row.id)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-s-tools"
              @click="openRolesBox(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /表格 -->
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paramsObj.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- /分页 -->
      <!-- 增加用户对话框 -->
      <el-dialog title="添加用户" :visible.sync="addUserDialog">
        <AddDialog
          :addUserDialog.sync="addUserDialog"
          :paramsObj="paramsObj"
        ></AddDialog>
      </el-dialog>
      <!-- /增加用户对话框 -->
      <!-- 编辑用户对话框 -->
      <el-dialog title="编辑用户" :visible.sync="editUserDialog">
        <EditDialog
          :editUserDialog.sync="editUserDialog"
          :paramsObj="paramsObj"
        ></EditDialog>
      </el-dialog>
      <!-- /编辑用户对话框 -->
      <!-- 分配角色对话框 -->
      <el-dialog title="分配角色" :visible.sync="assignRolesDialog">
        <AssignRoles
          :assignRolesDialog.sync="assignRolesDialog"
          :id="id"
          :roleName="roleName"
          :restaurants="restaurants"
          :paramsObj="paramsObj"
        ></AssignRoles>
      </el-dialog>
      <!-- /分配角色对话框 -->
    </div>
  </div>
</template>

<script>
import { delUser, changeUserState } from '@/api/user'
import { mapGetters, mapActions } from 'vuex'
import BreadCrumb from '@/components/BreadCrumb.vue'
import AddDialog from './components/AddDialog.vue'
import EditDialog from './components/EditDialog.vue'
import AssignRoles from './components/AssignRoles.vue'
export default {
  name: 'UserPage',
  created () {
    this.$store.dispatch('users/getUsersList', this.paramsObj)
  },
  data () {
    return {
      titleList: ['用户管理', '用户列表'],
      userInputSearch: '', // 用户输入
      paramsObj: {
        query: '', // 查询参数
        pagenum: 1, // 当前页码
        pagesize: 5 // 每页显示条数
      },
      addUserDialog: false, // 添加用户对话框
      editUserDialog: false, // 编辑用户对话框
      assignRolesDialog: false, // 分配角色对话框
      id: null, // 用户id
      roleName: null, // 当前角色
      restaurants: [] // 角色列表
    }
  },
  methods: {
    ...mapActions(['users/getUsersList()']),
    // 处理页码大小
    handleSizeChange (val) {
      this.paramsObj.pagesize = val
      this.$store.dispatch('users/getUsersList', this.paramsObj)
      // console.log(`每页 ${val} 条`)
    },
    // 当前页变动时候触发的事件
    handleCurrentChange (val) {
      this.paramsObj.pagenum = val
      this.$store.dispatch('users/getUsersList', this.paramsObj)
      // console.log(`当前页: ${val}`)
    },
    // 查询用户
    searchBtn () {
      this.paramsObj.query = this.userInputSearch
      this.$store.dispatch('users/getUsersList', this.paramsObj)
    },
    // 修改用户状态
    changeUserState (uId, type) {
      try {
        this.userList.forEach(async item => {
          if (item.id === uId) {
            await changeUserState({ uId, type })
            this.$store.dispatch('users/getUsersList', this.paramsObj)
            this.$message({
              message: '修改用户状态成功',
              type: 'success'
            })
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 编辑用户信息
    editBtn (id) {
      this.userList.forEach(item => {
        if (item.id === id) {
          this.editUserDialog = true
          this.$store.dispatch('users/getUserInfo', id)
        }
      })
    },
    // 删除用户
    async openDelBox (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.userList.forEach(function (item) {
          if (item.id === id) {
            // console.log(id)
            delUser(id)
          }
        })
      }).then(() => {
        this.$store.dispatch('users/getUsersList', this.paramsObj)
        this.$store.dispatch('users/getUsersList', this.paramsObj)
        console.log(this)
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 分配角色
    openRolesBox (id) {
      this.userList.forEach(item => {
        if (item.id === id) {
          this.assignRolesDialog = true
          this.id = id
          this.roleName = item.role_name
        }
      })
      this.rolesList.forEach(item1 => {
        const obj = {}
        obj.value = item1.roleName
        obj.id = item1.id
        this.restaurants.push(obj)
      })
    }
  },
  computed: {
    ...mapGetters(['userList', 'total', 'rolesList'])
  },
  watch: {
    userInputSearch (val) {
      if (val === '') {
        this.paramsObj.query = this.userInputSearch
        this.$store.dispatch('users/getUsersList', this.paramsObj)
      }
    }
  },
  filters: {},
  components: { BreadCrumb, AddDialog, EditDialog, AssignRoles }
}
</script>

<style scoped lang='less'>
// 主要内容
.users-page {
  background-color: #eaedf1;
}
.main {
  padding: 22px;
  background-color: #fff;
}
// 输入框布局
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
// 分页
.block {
  padding-top: 22px;
}
</style>
