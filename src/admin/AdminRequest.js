import {API} from '../config'

const createCategoryRequest = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

const createProductRequest = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
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

const listOrdersRequest = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
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

const getStatusValuesRequest = (userId, token) => {
    return fetch(`${API}/order/statusvalues/${userId}`, {
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

const updateOrderStatusRequest = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: "PATCH",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({status, orderId})
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

//CRUD Operations requests on products for products management

const getProductsRequest = () => {
    return fetch(`${API}/products?limit=1000`, {
        method: "GET",
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

const getSingleProductRequest = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET",
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

const updateProductRequest = (userId, token, productId, productInfo) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PATCH",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: productInfo
    }).then((res) => {
        return res.json()
    }).catch((err) => {

    })
}

const deleteProductRequest = (userId, token, productId) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
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

export {createCategoryRequest, 
        createProductRequest, 
        getCategoriesRequest, 
        listOrdersRequest, 
        getStatusValuesRequest, 
        updateOrderStatusRequest,
        getProductsRequest,
        getSingleProductRequest,
        updateProductRequest,
        deleteProductRequest
    }