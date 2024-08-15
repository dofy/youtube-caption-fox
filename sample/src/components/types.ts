export type ProxyConfig = {
  host: string
  port: number
  auth?: ProxyAuthConfig
}

export type ProxyAuthConfig = {
  username: string
  password: string
}

export type FormData = {
  videoId: string
  lang: string
  proxy?: ProxyConfig
}
