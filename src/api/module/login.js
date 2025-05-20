import { post } from '../../http'

const login = {
  login (params) {
    return post('/mock/user/login', params)
  }
}

export default login
