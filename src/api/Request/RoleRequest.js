import HttpRequest from '../HttpRequest'

export class RoleRequest extends HttpRequest{
  all() {
    this.setHeaderToken()

    return this.get('/roles')
  }
}

export default new RoleRequest()
