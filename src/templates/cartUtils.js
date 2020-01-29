const addItem = (item, next) => {
    let cart = []
    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count: 1
        })
    }

   // cart = Array.from(new Set(cart.map((product) => product._id))).map((id) => {
        //return cart.find( (p) => {return p._id === id})
    //})

    cart = cart.reduce((unique, o) => {
        if(!unique.some(obj => obj._id === o._id && obj.selectedSize === o.selectedSize)) {
          unique.push(o)
        }
        return unique
    },[])
   
    localStorage.setItem('cart', JSON.stringify(cart))
    next()
}

const itemTotal = () => {
    if (typeof window !== 'undefined') {
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0
}

const getCartItems = () => {
    if (typeof window !== 'undefined') {
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
    return 0
}

const updateItem = (productId, count) => {
    let cart = []
    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
    }

        cart.map((product) => {
            if(product._id === productId){
                product.count = count
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
}

const removeItem = (productId, selectedSize) => {
    let cart = []
    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
    }

        cart.forEach((product, index) => {
            if((product._id === productId) && (product.selectedSize === selectedSize)){
               cart.splice(index, 1)
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
        return cart
}

const emptyCart = (next) => {
    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            localStorage.removeItem('cart')
            next()
        }
    }
}

export {addItem, itemTotal, getCartItems, updateItem, removeItem, emptyCart}
