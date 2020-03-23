import HttpRequest from '../HttpRequest'

class StorageRequest extends HttpRequest {
  uploadFile(data, file, onProgress) {
    return this.custom({
      url: '/storage/upload',
      method: 'post',
      baseURL: this.apiURL,
      headers: {
        ...this.headers,
        'Content-Type': 'multipart/form-data'
      },
      data,
      onUploadProgress: ({total, loaded}) => {
        onProgress({percent: Math.round(loaded / total * 100)}, file)
      }
    })
  }
}

export default new StorageRequest()
