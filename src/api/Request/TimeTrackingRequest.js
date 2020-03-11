import HttpRequest from '../HttpRequest'

class TimeTracking extends HttpRequest {
  all(params = {}) {
    return this.get('/time-tracking', params)
  }
}

export default new TimeTracking()
