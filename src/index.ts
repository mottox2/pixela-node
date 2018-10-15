import axios, { AxiosInstance } from 'axios'

interface Graph {
  id: string
  name: string
  unit: string
  type: 'int' | 'float'
  color: 'shibafu' | 'momiji' | 'sora' | 'ichou' | 'ajisai' | 'kuro'
}

class Client {
  public username: string
  private _token: string
  private client: AxiosInstance

  constructor() {
    this.username = ''
    this._token = ''

    this.client = axios.create({
      baseURL: 'https://pixe.la/v1'
    })
  }

  set token(newToken: string) {
    this._token = newToken

    this.client.interceptors.request.use(config => {
      config.headers['X-USER-TOKEN'] = this._token
      return config
    })
  }

  get token(): string {
    return this._token
  }

  createGraph(graph: Graph) {
    return this.client.request<any>({
      method: 'post',
      url: `/users/${this.username}/graphs`,
      data: {
        ...graph
      }
    })
  }

  getGraphs() {
    return this.client.request<any>({
      method: 'get',
      url: `/users/${this.username}/graphs`
    })
  }

  getGraph(graphId: string) {
    return this.client.request<any>({
      method: 'get',
      url: `/users/${this.username}/graphs/${graphId}`
    })
  }

  createPixel(graphId: string, pixel: { quantity: string; date: string }) {
    return this.client.request<any>({
      method: 'post',
      url: `/users/${this.username}/graphs/${graphId}`,
      data: {
        ...pixel
      }
    })
  }
}

export default Client
