<template>
  <div>
    <div>
      <p>当前的用户： {{ userInfo.username }}</p>
      <p>当前的角色： {{ roleName }}</p>
      <span>分配新角色:</span>
      <el-autocomplete
        class="inline-input"
        v-model="state"
        placeholder="请选择"
        :fetch-suggestions="querySearch"
        @select="handleSelect"
        readonly
      ></el-autocomplete>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelBtn">取 消</el-button>
      <el-button type="primary" @click.stop="addRolesBtn">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { assignRoles } from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  name: 'AssignRolesPage',
  created () { },
  props: {
    assignRolesDialog: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    roleName: {
      type: String,
      required: true
    },
    restaurants: {
      type: Array,
      required: true
    },
    paramsObj: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      rolesDialog: this.assignRolesDialog,
      state: '',
      rid: null // 角色id
    }
  },
  methods: {
    handleSelect (item) {
      this.rid = item.id
    },
    // 输入框获取焦点时或被点击时调用的方法
    querySearch (queryString, cb) {
      // 调用 callback 返回建议列表的数据
      cb(this.restaurants)
    },
    cancelBtn () {
      this.$emit('update:assignRolesDialog', !this.rolesDialog)
    },
    async addRolesBtn () {
      try {
        const res = await assignRoles({
          id: this.id,
          rid: this.rid
        })
        console.log(res)
        this.$store.dispatch('users/getUsersList', this.paramsObj)
      } catch (err) {
        console.log(err)
      }
      this.$emit('update:assignRolesDialog', !this.rolesDialog)
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'roles'])
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
