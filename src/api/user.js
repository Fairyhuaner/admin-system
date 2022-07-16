import request from '@/utils/request'

/**
 * 登录
 * @param {*} param0
 * @returns
 */
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username,
      password
    }
  })
}
/**
 * 获取用户数据列表
 * @param {*} query 查询参数
 * @param {*} pagenum 当前页码
 * @param {*} pagesize 每页显示条数
 * @returns
 */
export const getUsersList = ({ query, pagenum, pagesize }) => {
  return request({
    method: 'GET',
    url: 'users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}
/**
 * 添加用户
 * @param {*} param0
 * @returns
 */
export const addUser = ({ username, password, email, mobile }) => {
  return request({
    method: 'POST',
    url: 'users',
    data: {
      username,
      password,
      email,
      mobile
    }
  })
}
/**
 * 获取单个用户信息
 * @param {*} id
 * @returns
 */
export const getUserInfo = (id) => {
  return request({
    method: 'GET',
    url: `users/${id}`
  })
}
/**
 * 编辑用户提交
 * @param {*} param0
 * @returns
 */
export const editUserSubmit = ({ id, email, mobile }) => {
  return request({
    method: 'PUT',
    url: `users/${id}`,
    data: {
      email, mobile
    }
  })
}
/**
 * 修改用户状态
 * @param {*} uId 用户id
 * @param {*} type 用户状态
 * @returns
 */
export const changeUserState = ({ uId, type }) => {
  return request({
    method: 'PUT',
    url: `users/${uId}/state/${type}`
  })
}
/**
 * 删除单个用户
 * @param {*} id
 * @returns
 */
export const delUser = (id) => {
  return request({
    method: 'DELETE',
    url: `users/${id}`
  })
}
/**
 * 给用户分配角色
 * @param {*} id 用户id
 * @param {*} id 角色id
 * @returns
 */
export const assignRoles = ({ id, rid }) => {
  return request({
    method: 'PUT',
    url: `users/${id}/role`,
    data: {
      rid
    }
  })
}
