import { request } from '../../../http'

const REQUEST_URL = {
    adminList: '/system/admin'
}

export const adminList = (params) => {
    return request(REQUEST_URL.adminList, 'get',params)
}
