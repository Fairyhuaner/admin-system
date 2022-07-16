export default {
  token: state => state.users.token,
  userList: state => state.users.userList,
  total: state => state.users.total,
  userInfo: state => state.users.userInfo,
  rolesList: state => state.permissions.rolesList,
  roles: state => state.permissions.roles
}
