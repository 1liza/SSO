/* 添加对 userInfo、access_token、refresh_token 状态的管理 */
import {
  login,
  logout
} from '@/api/auth'
import {
  PcCookie,
  Key
} from '@/utils/cookie' // 对 cookie 操作
// 定义状态，state必须是function
const state = {
  userInfo: PcCookie.get(Key.userInfoKey) ?
    JSON.parse(PcCookie.get(Key.userInfoKey)) : null, // 用户信息对象
  accessToken: PcCookie.get(Key.accessTokenKey), // 访问令牌字符串
  refreshToken: PcCookie.get(Key.refreshTokenKey), // 刷新令牌字符串
}
// 改变状态值
const mutations = {
  // 赋值用户状态
  SET_USER_STATE(state, data) {
    console.log('SET_USER_STATE', data)
    // 状态赋值
    const {
      userInfo,
      access_token,
      refresh_token
    } = data
    state.userInfo = userInfo
    state.accessToken = access_token
    state.refreshToken = refresh_token
    // 保存到cookie中
    PcCookie.set(Key.userInfoKey, userInfo)
    PcCookie.set(Key.accessTokenKey, access_token)
    PcCookie.set(Key.refreshTokenKey, refresh_token)
  },
  // 重置用户状态,退出和登录失败时用
  RESET_USER_STATE(state) {
    // 状态置空
    state.userInfo = null
    state.accessToken = null
    state.refreshToken = null
    // 移除cookie
    PcCookie.remove(Key.userInfoKey)
    PcCookie.remove(Key.accessTokenKey)
    PcCookie.remove(Key.refreshTokenKey)
  }
}
// 定义行为
const actions = {
  // 登录操作 ++++++++++++++++++++++++++ 4.
  UserLogin({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      // 调用登录接口 /api/auth.js#login
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        // 获取响应值
        const {
          code,
          data
        } = response
        if (code === 20000) {
          // 状态赋值
          commit('SET_USER_STATE', data)
        }
        resolve(response) // 不要少了
      }).catch(error => {
        // 重置状态
        commit('RESET_USER_STATE')
        reject(error)
      })
    })
  },
  UserLogout({
    state,
    commit
  }, redirectURL) {
    // 调用退出接口, 上面不要忘记导入 logout 方法
    logout(state.accessToken).then(() => {
      // 重置状态
      commit('RESET_USER_STATE')
      // // 退出后，重写向地址，如果没有传重写向到登录页 /
      window.location.href = redirectURL || '/'
    }).catch(() => {
      // 重置状态
      commit('RESET_USER_STATE')
      window.location.href = redirectURL || '/'
    })
  }
}
export default {
  state,
  mutations,
  actions
}