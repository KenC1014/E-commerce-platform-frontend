import {API} from '../config'

const signUp = (user) => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

const logIn = (user) => {
    return fetch(`${API}/login`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

const authenticate = (user, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(user))
        next()
    }
}

const isAuthed = () => {
    if(typeof window == 'undefined') {
        return false
    }
    const userObj = JSON.parse(localStorage.getItem('jwt'))
    if(userObj){
        return userObj
    } else {
        return false
    }
}

const logOut = (next) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        next()
        return fetch(`${API}/logout`, {
            method: 'GET'
        }).then(() => {

        }).catch(() => {

        })
    }
}

export {signUp, logIn, logOut, authenticate, isAuthed} 