<template>
  <div>
    <el-form :model="addUserForm" :rules="rules" ref="addFormRef">
      <el-form-item
        label="用户名"
        prop="username"
        :label-width="formLabelWidth"
      >
        <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input v-model="addUserForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="addUserForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile" :label-width="formLabelWidth">
        <el-input v-model="addUserForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelBtn">取 消</el-button>
      <el-button type="primary" @click.stop="addUserBtn">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { validateMobile } from '@/utils/validate'
import { addUser } from '@/api/user'
export default {
  created () { },
  props: {
    addUserDialog: {
      type: Boolean,
      required: true
    },
    paramsObj: {
      type: Object,
      required: true
    }
  },
  data () {
    const validateMobileFn = (rule, value, callback) => {
      if (validateMobile(value)) {
        callback()
      } else {
        callback(new Error('手机号格式错误'))
      }
    }
    return {
      addDialog: this.addUserDialog,
      addUserForm: { // 添加用户对话框的表单数据
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formLabelWidth: '120px', // 对话框表单宽度
      rules: {
        username: [
          { required: true, message: '用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度3到8之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度3到8之间', trigger: 'blur' }
        ],
        email: { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
        mobile: { validator: validateMobileFn, trigger: 'blur' }
      }
    }
  },
  methods: {
    // 添加用户
    async addUserBtn () {
      try {
        // 二次校验
        await this.$refs.addFormRef.validate()
        try {
          await addUser(this.addUserForm)
          this.$emit('update:addUserDialog', !this.addDialog)
          this.$store.dispatch('users/getUsersList', this.paramsObj)
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        this.$message.error('添加失败，数据格式不符合要求')
      }
      this.$refs.addFormRef.resetFields()
    },
    cancelBtn () {
      this.$emit('update:addUserDialog', !this.addDialog)
      this.$refs.addFormRef.resetFields()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.dialog-footer {
  text-align: right;
}
</style>
