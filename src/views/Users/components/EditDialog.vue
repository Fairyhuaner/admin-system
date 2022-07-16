<template>
  <div>
    <el-form :model="userInfo" :rules="rules">
      <el-form-item
        label="用户名"
        prop="username"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="userInfo.username"
          autocomplete="off"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="userInfo.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile" :label-width="formLabelWidth">
        <el-input v-model="userInfo.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelBtn">取 消</el-button>
      <el-button type="primary" @click="editUserBtn">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { validateMobile } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { editUserSubmit } from '@/api/user'
export default {
  created () { },
  props: {
    editUserDialog: {
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
      editDialog: this.editUserDialog,
      formLabelWidth: '120px', // 对话框表单宽度
      rules: {
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
    async editUserBtn () {
      try {
        const res = await editUserSubmit(this.userInfo)
        this.$store.dispatch('users/getUsersList', this.paramsObj)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
      this.$emit('update:editUserDialog', !this.editDialog)
    },
    cancelBtn () {
      this.$emit('update:editUserDialog', !this.editDialog)
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
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
