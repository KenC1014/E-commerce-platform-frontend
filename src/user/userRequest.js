import {API} from '../config'

const readUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

const updateUser = (userId, token, userInfo) => {
    return fetch(`${API}/user/${userId}`, {
        method: "PATCH",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userInfo)
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

const updateUserInLocalStorage = (updatedUser, next) => {
    if (typeof window!== 'undefined') {
        if(localStorage.getItem('jwt')){
            let userObj = JSON.parse(localStorage.getItem('jwt'))
            userObj.user = updatedUser
            localStorage.setItem('jwt', JSON.stringify(userObj))
            next()
        }
    }
}

const getPurchaseHistory = (userId, token) => {
    return fetch(`${API}/orders/by/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

export {
    readUser,
    updateUser,
    updateUserInLocalStorage,
    getPurchaseHistory
}