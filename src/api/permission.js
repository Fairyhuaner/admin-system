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
