import HttpRequest from '../HttpRequest'

export class RoleRequest extends HttpRequest{
  all() {
    return this.get('/roles')
  }
}

export default new RoleRequest()
