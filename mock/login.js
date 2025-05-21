export default [
  {
    url: '/mock/user/login',
    method: 'post',
    response: ({ body }) => {
      if (body.username === 'admin' && body.password === '123456') {
        return {
          code: 200,
          message: '登录成功',
          data: {
            userName: '管理员',
            token: '1234567890',
            refresh_token: ''
          }
        }
      }
      if (body.username !== body.password) {
        return {
          code: 500,
          message: '用户名或密码错误',
          data: {}
        }
      }
    }
  }
]
