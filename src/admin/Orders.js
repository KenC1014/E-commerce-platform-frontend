import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../templates/Layout'
import {isAuthed} from '../API/auth'
import {listOrdersRequest, getStatusValuesRequest, updateOrderStatusRequest} from './AdminRequest'
import moment from 'moment'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [statusVals, setStatusVals] = useState([])

    const {token, user} = isAuthed()

    const loadOrders = () => {
        listOrdersRequest(user._id, token).then((res) => {
            if (res.error) {

            } else {
                setOrders(res)
            }
        })
    }

    const loadStatusVals = () => {
     getStatusValuesRequest(user._id, token).then((res) => {
          if (res.error) {

          } else {
              setStatusVals(res)
          }
      })
  }

    useEffect(() => {
        loadOrders()
        loadStatusVals()
    }, [])

    const handleStatusChange = (event, orderId) => {
      updateOrderStatusRequest(user._id, token, orderId, event.target.value).then((res) => {
              if (res.error) {
                  console.log("Status update failed");
              } else {
                  loadOrders();
              }
          })
       }

  const showStatus = (order) => (
      <div className="form-group">
          <h3 className="mark mb-4">Status: {order.status}</h3>
          <select className="form-control" onChange={(event) => handleStatusChange(event, order._id)}>
              <option>Update Status</option>
              {statusVals.map((status, index) => (<option key={index} value={status}>{status}</option>))}
          </select>
      </div>
  )
   
    return (
        <Layout title="Manage Orders" description={`${user.name} ! Time to work on these orders`}>
          <div className="row" >
            <div className="col-md-8 offset-md-2">
                {orders.length > 0 ? (<h4 className="text-danger display-2 ml-4">Total orders: {orders.length}</h4>) : (<h4>No orders</h4>)}
                {orders.map((order, index) => (
                <div className="mt-5" key={index} id="orders">
                  <h2 className="mb-5">
                    <span className="bg-primary">Order ID: {order._id}</span>
                  </h2>
                  <ul className="list-group mb-2">
                    <li className="list-group-item"><span className="order-info"></span>{showStatus(order)}</li>
                    <li className="list-group-item"><span className="order-info">Transaction ID: </span>{order.transaction_id}</li>
                    <li className="list-group-item"><span className="order-info">Amount: </span>€{order.amount}</li>
                    <li className="list-group-item"><span className="order-info">Customer: </span>{order.user.name}</li>
                    <li className="list-group-item"><span className="order-info">Ordered on: </span>{moment(order.createdAt).fromNow()}</li>
                    <li className="list-group-item"><span className="order-info">Delivery address: </span>{order.address}, {order.city}, {order.postalCode}</li>
                  </ul>
                  <h3 className="mt-4 mb-4 font-italic">Total products in the order: {order.products.length}</h3>
                  <table id="product-order-table">
                    <tr className="product-order-row">
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Size Selected</th>
                      <th>Quantity</th>
                    </tr>
                  {order.products.map((product, productIndex) => (
                    <tr key={productIndex} className="product-order-row">
                      <td>{product._id}</td> <td>{product.name}</td> <td>€{product.price}</td> <td>{product.selectedSize}</td> <td>{product.count}</td>
                    </tr>
                ))}
                  </table>
                
                </div>))}
            </div>
          </div>
        </Layout>
    )
}

export default Orders