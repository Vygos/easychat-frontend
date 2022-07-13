const URLS: string[] = [
    "http://localhost:8080",
    "https://viacep.com.br/"
]

const WHITE_LIST = [
    "/usuario/existsByEmail",
    "/oauth/token"
]

export function hasUrlRegistered(baseURL: string) {
    return URLS.some(url => url.includes(baseURL));
}

export function hasUrlInWhiteList(url: string) {
    return WHITE_LIST.some(uri => uri.includes(url));
}
