<template>
  <div>
    <el-tree
      :data="data"
      show-checkbox
      highlight-current
      default-expand-all
      node-key="id"
      ref="tree"
      :props="defaultProps"
      v-if="assignDialog"
    >
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelBtn">取 消</el-button>
      <el-button type="primary" @click="assignBtn">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { mandateRights } from '@/api/permission'
import { mapGetters } from 'vuex'
export default {
  name: 'AssignPermissionsPage',
  created () {
    this.$forceUpdate()
    this.$store.dispatch('permissions/getAllRights', 'tree')
    console.log(this.allRights)
    this.data = this.allRights
  },
  mounted () {
    this.$refs.tree.setCheckedNodes(this.rightsList)
  },
  props: {
    assignPermissionsDialog: {
      type: Boolean,
      required: true
    },
    isId: {
      type: Number,
      required: true
    },
    rightsList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      assignDialog: this.assignPermissionsDialog,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      checkedKeys: '' // 选择之后的角色id
    }
  },
  methods: {
    cancelBtn () {
      this.$emit('update:assignPermissionsDialog', !this.assignDialog)
    },
    // 给角色分配权限
    async assignBtn () {
      this.$emit('update:assignPermissionsDialog', !this.assignDialog)
      this.checkedKeys = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()].toString()
      try {
        await mandateRights(this.isId, this.checkedKeys)
        this.$store.dispatch('permissions/getRolesList')
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapGetters(['allRights'])
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
