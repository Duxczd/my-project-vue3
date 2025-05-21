import { post } from '../../http'

const login = {
  login (params) {
    return post('/user/login', params)
  }
}

export default login
