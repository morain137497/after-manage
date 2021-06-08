import axios from "axios";
axios.defaults.baseURL = "http://service.qunju.cn"
axios.defaults.timeout = 10000

/**
 * 请求拦截器
 */
axios.interceptors.request.use( config => {
    return config;
}, error => {
    return Promise.reject(error)
})

/**
 * 相应拦截器
 */
axios.interceptors.response.use(response => {
    return response.data;
}, error => {
    return Promise.resolve(error.response.data)
})

/**
 * 请求方法
 * @param url
 * @param type
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const request = (url, type, params = {}) => {
    if(type === 'get') {
        return axios.get(url, {params: params})
    }
    if(type === 'post') {
        return axios.post(url,  params)
    }
    if(type === 'delete') {
        return axios.delete(url, {params: params})
    }
    if(type === 'put') {
        return axios.put(url,  params)
    }
}

export default axios
