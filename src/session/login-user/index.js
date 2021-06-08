export const TOKEN_KEY = 'TOKEN'
export const MOBILE_KEY = 'MOBILE'
export const USER_ID_KEY = 'USER_ID'
export const ROLE_KEY = 'ROLE'

export const setToken = (token) => {
    sessionStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => {
    return sessionStorage.getItem(TOKEN_KEY)
}

export const setMobile = (mobile) => {
    sessionStorage.setItem(MOBILE_KEY, mobile)
}

export const getMobile = () => {
    return sessionStorage.getItem(MOBILE_KEY)
}

export const setUserId = (userId) => {
    sessionStorage.setItem(USER_ID_KEY, userId)
}

export const getUserId = () => {
    return sessionStorage.getItem(USER_ID_KEY)
}

export const setLoginUser = (user) => {
    setToken(user.token)
    setMobile(user.mobile)
    setUserId(user.userId)
}

export const getLoginUser = () => {
    const user = {
        token: getToken(),
        mobile: getMobile(),
        userId: getUserId(),
    }
    return user
}

export const setRole = (role) => {
    sessionStorage.setItem(ROLE_KEY, role)
}

export const getRole = () => {
    return sessionStorage.getItem(ROLE_KEY)
}
