import request from '@/utils/request'

/**
 * 获取角色列表
 * @returns
 */
export const getRolesList = () => {
  return request({
    method: 'GET',
    url: 'roles'
  })
}
/**
 * 添加角色
 * @param {*} roleName 角色名称
 * @param {*} roleDesc 角色描述
 * @returns
 */
export const addRoles = ({ roleName, roleDesc }) => {
  return request({
    method: 'POST',
    url: 'roles',
    data: { roleName, roleDesc }
  })
}
/**
 * 获取所有权限列表
 * @param {*} type 值 list 或 tree , list 列表显示权限, tree 树状显示权限
 * @returns
 */
export const getAllRights = (type) => {
  return request({
    method: 'GET',
    url: `rights/${type}`
  })
}
/**
 * 角色授权
 * @param {*} roleId 角色 ID
 * @param {*} rids 权限 ID 列表（字符串）
 * @returns
 */
export const mandateRights = (roleId, rids) => {
  return request({
    method: 'POST',
    url: `roles/${roleId}/rights`,
    data: {
      rids
    }
  })
}
/**
 * 删除角色指定权限
 * @param {*} roleId 角色ID
 * @param {*} rightId 权限ID
 * @returns
 */
export const delRoleRight = (roleId, rightId) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}
