import { request } from '../../../http'

const REQUEST_URL = {
    login: ''
}

/**
 * 登录方法
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const loginApi = (params) => {
    return request(REQUEST_URL.login, 'post',params)
}
