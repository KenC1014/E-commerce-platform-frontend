import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../templates/Layout'
import {isAuthed} from '../API/auth'
import {getPurchaseHistory} from './userRequest'
import moment from 'moment'

const AdminDashboard = () => {
    const [history, setHistory] = useState([])

    const {user: {_id, name, email, role}, token} = isAuthed()

    const getUserHistory = (userId, token) => {
        getPurchaseHistory(userId,token).then((res) => {
            if (res.error) {

            } else {
                setHistory(res)
            }
        })
    }

    useEffect(() => {
        getUserHistory(_id, token)
    }, [])


    const adminLinks = () => {
        return (
            <div className="card" id="user-links">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">Manage Orders</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/products">Manage Products</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return(
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                    <ul className="list-group">
                        <li className="list-group-item"><span className="user-info">Name: </span>{name}</li>
                        <li className="list-group-item"><span className="user-info">Email: </span>{email}</li>
                        <li className="list-group-item">{role === 'customer' ? <span><span className="user-info">Status: </span>Registered</span> : <span><span className="user-info">Role: </span>{role}</span>}</li>
                    </ul>
            </div>
        )
    }

    const purchaseHistory = (history) => {
        return (
            <div className="card mb-5">
              <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                  <li className="list-group-item">
                    {history.map((h, i) => {
                      return (
                        <div>
                          <hr />
                          <table id="product-order-table">
                            <tr className="product-order-row">
                              <th className="first-col">Product name</th>
                              <th className="all-col">Product price</th>
                              <th className="all-col">Size</th>
                              <th className="all-col">Purchased date</th>
                              <th className="last-col">Quantity</th>
                            </tr>
                            {h.products.map((p, i) => {
                              return (
                               <tr className="product-order-row" key={i}>
                                  <td>{p.name}</td>
                                  <td>€{p.price}</td>
                                  <td>{p.selectedSize}</td>
                                  <td>{" "}{moment(p.createdAt).fromNow()}</td>
                                  <td>{p.count}</td>
                                </tr>) })}
                                <tr className="product-order-row">
                                  <td><span className="last-row">Total</span></td>
                                  <td><span className="last-row">€{h.amount}</span></td>
                                  <td><span className="last-row-col">{h.status}</span></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                            </table>
                        </div>)})}
                    </li>
                </ul>
            </div>
        )}


    return (
        <Layout title="Admin Dashboard" description={`Here is your admin control panel ${name}`} className="container-fluid">
           <div className="row" >
                <div className="col-3">
                    {adminLinks()}
                </div>

                <div className="col-9" id="user-info">
                    {adminInfo()}
                    {purchaseHistory(history)}
                </div>
           </div>

           
        </Layout>
    )
}

export default AdminDashboard

