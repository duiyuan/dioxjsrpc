import querystring from 'query-string'
import json from 'json-bigint'
import fetch, { Response, RequestInit } from 'node-fetch'

import { shakeKeyValue } from '../utils/string'
import { getProvider, NET } from '../constants'


function checkStatus(response: Response) {
  if (response.ok) {
    return response
  } else {
    return Promise.reject(response)
  }
}

export default class Fetcher {
  private dioxideProvider: string
  public rpcProvider: string
  constructor(net: NET) {
    const { dioxide, rpc } = getProvider(net)
    this.dioxideProvider = dioxide + '/api'
    this.rpcProvider = rpc
  }

  prune = (url: string) => (url.endsWith('/') ? url.slice(0, -1) : url)

  get<T>(service: string, options: any): Promise<T> {
    return new Promise(async (res) => {
      options = { credentials: 'omit', ...options }

      let absoluteUrl = service.startsWith('http') ? service : this.dioxideProvider + service

      if (options.data) {
        const data = shakeKeyValue(options.data) || {}
        absoluteUrl += '?' + querystring.stringify(data, { encode: false })
      }

      fetch(absoluteUrl, options)
        .then(checkStatus)
        .then((r) => r.text().then((text) => res(json.parse(text))))
    })
  }

  post<T>(service: string, options: RequestInit = {}): Promise<T> {
    return new Promise(async (res) => {
      const { body } = options
      const concatOption: RequestInit = {
        ...options,
        method: 'post',
        body,
      }
      const absoluteUrl = service.startsWith('http')
        ? service
        : this.dioxideProvider + (service.startsWith('/') ? service.slice(1) : service)

      fetch(absoluteUrl, concatOption)
        .then(checkStatus)
        .then((r) => r.json().then((json) => res(json as T)))
    })
  }
}
