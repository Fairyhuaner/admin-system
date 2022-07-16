<template>
  <div>
    <!-- 面包屑 -->
    <BreadCrumb :titleList="titleList"></BreadCrumb>
    <!-- /面包屑 -->
    <div class="main">
      <!-- 添加角色 -->
      <el-row>
        <el-col :span="4">
          <el-button
            type="primary"
            style="margin-left: 22px"
            @click="addRolesDialog = true"
            class="title-btn"
            >添加角色</el-button
          >
        </el-col>
      </el-row>
      <!-- /添加角色 -->
      <!-- 表格 -->
      <el-table :data="rolesList" stripe style="width: 100%" border>
        <el-table-column width="100" type="expand">
          <template slot-scope="props">
            <!-- 下选框 -->
            <el-row
              class="border_bottom border_top el-row-box"
              v-for="(item1, index) in props.row.children"
              :key="index"
            >
              <!-- 第一层 -->
              <el-col :span="6" class="el-col-box">
                <el-tag class="el-tag-box">{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 第二层 -->
              <el-col :span="18" class="el-col-second-box">
                <el-row
                  v-for="(item2, index) in item1.children"
                  :key="index"
                  class="el-col-second-box"
                >
                  <el-col :span="5" class="el-col-box">
                    <el-tag type="success" class="el-tag-box">{{
                      item2.authName
                    }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 第三层 -->
                  <el-col :span="19" class="el-col-third-box">
                    <el-tag
                      class="el-tag-third-box"
                      v-for="(item3, index) in item2.children"
                      :key="index"
                      closable
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="#" width="100"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="mobile" label="角色描述"></el-table-column>
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
              @click="assignRolesDialog = true"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /表格 -->
    </div>
    <!-- 添加角色对话框 -->
    <!-- 分配角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addRolesDialog">
      <el-form :model="addRolesParams">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input
            v-model="addRolesParams.roleName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input
            v-model="addRolesParams.roleDesc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRolesDialog = false">取 消</el-button>
        <el-button type="primary" @click.stop="addRolesBtn">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /分配角色对话框 -->
    <!-- /添加角色对话框 -->
  </div>
</template>

<script>
import { addRoles } from '@/api/permission'
import { mapGetters } from 'vuex'
import BreadCrumb from '@/components/BreadCrumb.vue'
export default {
  created () {
    this.$store.dispatch('permissions/getRolesList')
  },
  data () {
    return {
      titleList: ['权限管理', '角色列表'],
      addRolesDialog: false,
      formLabelWidth: '120px', // 对话框表单宽度
      addRolesParams: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    // 添加角色
    async addRolesBtn () {
      try {
        await addRoles(this.addRolesParams)
        await this.$store.dispatch('permissions/getRolesList')
      } catch (err) {
        console.log(err)
      }
      this.addRolesDialog = false
    }
  },
  computed: {
    ...mapGetters(['rolesList'])
  },
  watch: {},
  filters: {},
  components: { BreadCrumb }
}
</script>

<style scoped lang='less'>
.users-page {
  background-color: #eaedf1;
}
.main {
  padding: 22px;
  background-color: #fff;
}
.el-row {
  margin-bottom: 20px;
  .title-btn {
    margin-left: 0 !important;
  }
}
// 扩展选项
.border_bottom {
  border-bottom: 1px solid #eee;
}
.border_top {
  border-top: 1px solid #eee;
}
.el-row-box {
  padding-left: 80px;
  display: flex;
}
.el-col-box {
  display: flex;
  align-items: center;
}
.el-col-box {
  align-items: center;
}
.el-icon-caret-right {
  padding-left: 10px;
}
.el-col-second-box {
  padding-top: 20px;
  // display: flex;
}
.el-col-third-box {
  padding-top: 10px;
}
.el-tag-third-box {
  margin-right: 8px;
  margin-bottom: 10px;
}
</style>
