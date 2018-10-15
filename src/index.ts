import axios, { AxiosInstance } from 'axios'

type GraphAttributes = ImmutableGraphAttributes & MutableGraphAttributes

interface ImmutableGraphAttributes {
  id: string
  type: 'int' | 'float'
}

interface MutableGraphAttributes {
  name: string
  unit: string
  color: 'shibafu' | 'momiji' | 'sora' | 'ichou' | 'ajisai' | 'kuro'
}

interface UserAttributes {
  token: string
  username: string
  agreeTermsOfService: 'yes' | 'no'
  notMinor: 'yes' | 'no'
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

  createUser(user: UserAttributes) {
    return this.client.request<any>({
      method: 'post',
      url: '/users',
      data: user
    })
  }

  updateUser(newToken: string) {
    return this.client.request<any>({
      method: 'put',
      url: `/users/${this.username}`,
      data: { newToken }
    })
  }

  deleteUser(newToken: string) {
    return this.client.request<any>({
      method: 'delete',
      url: `/users/${this.username}`
    })
  }

  createGraph(graph: GraphAttributes) {
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

  getGraphUrl(graphId: string) {
    return `https://pixe.la/v1/users/${this.username}/graphs/${graphId}`
  }

  getGraph(graphId: string) {
    return this.client.request<any>({
      method: 'get',
      url: `/users/${this.username}/graphs/${graphId}`
    })
  }

  updateGraph(graphId: string, attributes: MutableGraphAttributes) {
    return this.client.request<any>({
      method: 'put',
      url: `/users/${this.username}/graphs/${graphId}`,
      data: attributes
    })
  }

  deleteGraph(graphId: string) {
    return this.client.request<any>({
      method: 'delete',
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

  getPixel(graphId: string, date: string) {
    return this.client.request<any>({
      method: 'get',
      url: `/users/${this.username}/graphs/${graphId}/${date}`
    })
  }

  UpdatePixel(graphId: string, date: string, quantity: string) {
    return this.client.request<any>({
      method: 'put',
      url: `/users/${this.username}/graphs/${graphId}/${date}`,
      data: { quantity }
    })
  }

  incrementPixel(graphId: string) {
    return this.client.request<any>({
      method: 'put',
      url: `/users/${this.username}/graphs/${graphId}/increment`
    })
  }

  decrementPixel(graphId: string) {
    return this.client.request<any>({
      method: 'put',
      url: `/users/${this.username}/graphs/${graphId}/decrement`
    })
  }

  deletePixel(graphId: string, date: string) {
    return this.client.request<any>({
      method: 'delete',
      url: `/users/${this.username}/graphs/${graphId}/${date}`
    })
  }
}

export default Client
