import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {isAuthed} from '../API/auth'
import {getBraintreeClientTokenRequest, processPaymentRequest, createOrderRequest} from './requestAPI'
import DropIn from 'braintree-web-drop-in-react'
import {emptyCart} from './cartUtils'

const Checkout = ({products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        loading: false,
        address: '',
        postalCode: -1,
        city: ''
    })

    const userObj = isAuthed()
    const userId = userObj && userObj.user._id
    const token = userObj && userObj.token

    const getToken = (userId, token) => {
        getBraintreeClientTokenRequest(userId, token).then((res) => {
            if (res.error) {
                setData({...data, error: res.error})
            } else {
                setData({...data, clientToken: res.clientToken})
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    },[])

    const getTotal = () => {
        let total = products.reduce((curValue, nextValue)=>{return curValue + nextValue.count * nextValue.price}, 0)
        total = Math.floor((total + 4.99) * 1.14 *100)/100
        return total
    }

    const buy = () => {
        if(!data.address) {
            return setData({...data, error: 'Please specify your delivery address'})
        }

        if(data.postalCode === -1 ) {
            return setData({...data, error: 'Please specify your postal code'})
        }

        if(!data.city ) {
            return setData({...data, error: 'Please specify your city or town'})
        }

        setData({...data, loading: true})
        let method
        let getMethod = data.instance.requestPaymentMethod().then((res) => {
            method = res.nonce
            const paymentInfo = {
                paymentMethod: method,
                amount: getTotal(products)
            }
            processPaymentRequest(userId, token, paymentInfo).then((res) => {
                setData({...data, loading: false})
                if (res.errors) {
                    setData({...data, error: res.message})
                } else {
                    const orderInfo = {
                        products: products,
                        transaction_id: res.transaction.id,
                        amount: res.transaction.amount,
                        address: data.address,
                        postalCode: data.postalCode,
                        city: data.city
                    }
                    createOrderRequest(userId, token, orderInfo).then((res) => {
                        console.log(res)
                    })
                    setData({...data, success: true})
                    emptyCart(() => {
                        setRun(!run)
                    })
                }
            })
            .catch((err) => setData({...data, error: err.message}))
        }).catch((err) => {
            setData({...data, loading: false})
            setData({...data, error: err.message})
        })
    }

    const handleAddress = (event) => {
        setData({...data, address: event.target.value})
    }

    const handlePostalCode = (event) => {
        setData({...data, postalCode: event.target.value})
    }

    const handleCity = (event) => {
        setData({...data, city: event.target.value})
    }

    const showBraintreeDropIn = () => {
        return (
            <div onBlur={() => setData({...data, error:""})}>
              {(data.clientToken !== null && products.length>0) ? (
                  <div>
                    <div className="form-group mb-3">
                      <label className="text-muted">Delivery address:</label>
                      <textarea onChange={handleAddress} className="form-control" value={data.address} placeholder="Please specify your address here"/>
                     <div className="row">
                        <div className="mt-2 ml-3">
                          <label className="text-muted">Postal code:</label>
                          <textarea onChange={handlePostalCode} className="form-control" id="postal-code" placeholder="eg. 02627"/>
                        </div>
                        <div className="mt-2 ml-3"> 
                          <label className="text-muted">City/town:</label>
                          <textarea onChange={handleCity} className="form-control" id="city" placeholder="eg. Weißenberg"/>
                        </div>
                    </div> 
                    </div>
                    <DropIn options={{authorization: data.clientToken, paypal: {flow: "vault"}}} onInstance={(instance) => (data.instance=instance)}/>
                    <button onClick={buy} className="btn btn-outline-success btn-lg">Checkout</button>
                    <Link to="/shop"><button id="keep-shopping" className="btn btn-outline-info btn-lg">Continue Shopping</button></Link>
                  </div>
              ) : (null) }
            </div>
        )
    }

    const checkOutButton = () => {
        return(
            isAuthed() ? (<div className="mt-5">{showBraintreeDropIn()}</div>) : (
                <Link to="/login"><button className="btn btn-outline-secondary btn-lg">Sign in and checkout</button></Link>
            )
        )
    }

    const checkOutList = () => {
        return(
            <div className="checkout-list">
                <table>
                  <tr>
                   <th>Name</th>
                   <th>Price</th>
                   <th>Quantity</th>
                  </tr>
                  
                    {products.map((product, index) => (<tr key={index}><td>{product.name}</td> <td>€{product.price}</td> <td>x{product.count}</td></tr>))}
                  
                </table>
            </div>
        )
    }

    const taxAndShipping = () => {
        return (
            <div className="ml-3">
               <p>Shipping: €4.99</p>
               <p>Tax: 14%</p>
            </div>
        )
    }

    const showPaymentError = (error) => {
        return(
            error && <div className="alert alert-danger">{error}</div>
        )
    }
       
    const showPaymentSuccess = (success) => {
        return(
            success && <div className="alert alert-success"><h3>Payment Processed</h3>Thank you for your purchase!</div>
        )
    }

    const showLoading = (loading) => {
        return(
            loading && <div className="alert alert-secondary" id="payment-wait"><h3>Please wait...</h3></div>
        )
    }
   
    return (
        <div>
          {products.length > 0 && checkOutList()}
          {products.length > 0 && <hr/>}
          {products.length > 0 && taxAndShipping()}
          {products.length > 0 && <hr/>}
          {products.length > 0 && <h2>Total is €{products.length > 0 ? getTotal() : 0}</h2>}
          {showLoading(data.loading)}
          {showPaymentSuccess(data.success)}
          {isAuthed() && showPaymentError(data.error)}
          {checkOutButton()}
        </div>
    )
}

export default Checkout