import {API} from '../config'
import queryString from 'query-string'

const getProductsRequest = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET",
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

const getCategoriesRequest = () => {
    return fetch(`${API}/categories`, {
        method: "GET",
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

const getFilteredProducts = (skip, limit, filters={}) => {
    const query = {skip, limit, filters}
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query)
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

const listSearchRequest = (params) => {
    const query = queryString.stringify(params)
    return fetch(`${API}/products/search?${query}`, {
        method: "GET",
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

const getThisProductRequest = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET",
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

const listRelatedRequest = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method: "GET",
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

const getBraintreeClientTokenRequest = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
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

const processPaymentRequest = (userId, token, paymentInfo) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentInfo)
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

const createOrderRequest = (userId, token, orderInfo) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order: orderInfo})
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}


export {
        getProductsRequest, 
        getCategoriesRequest, 
        getFilteredProducts,
        listSearchRequest,
        listRelatedRequest,
        getThisProductRequest,
        getBraintreeClientTokenRequest,
        processPaymentRequest, 
        createOrderRequest
    }