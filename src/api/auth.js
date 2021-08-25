import request from '@/utils/request'
/* 定义 Api 调用登录接口 */

// 数据格式
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

const auth = {
  username: 'mxg-blog-admin',
  password: '123456'
}

export function login(data) {
  return request({
    headers,
    auth,
    url: `/auth/login`,
    method: 'post',
    params: data
  })
}

export function getXieyi() {
  return request({
    url: `${window.location.href}/xieyi.html`, // 访问到的是 public/xieyi.html
    method: 'get'
  })
}
// 查询用户名是否已被注册
export function getUserByUsername(username) {
  return request({
    url: `/system/api/user/username/${username}`,
    method: 'get'
  })
}
// 提交注册数据
export function register(data) {
  return request({
    headers,
    auth,
    url: `/system/api/user/register`,
    method: 'post',
    params: data
  })
}

export function logout(accessToken) {
  return request({
    url: `/auth/logout`,
    method: 'get',
    params: {
      accessToken // 确定退出用户
    }
  })
}

export function refreshToken(refreshToken) {
  return request({
    headers,
    auth,
    url: `/auth/user/refreshToken`,
    method: 'get',
    params: {
      refreshToken
    }
  })
}