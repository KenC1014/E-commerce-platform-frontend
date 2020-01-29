import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../templates/Layout'
import {isAuthed} from '../API/auth'
import {getPurchaseHistory} from './userRequest'
import moment from 'moment'

const Dashboard = () => {
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

    const userLinks = () => {
        return (
            <div className="card" id="user-links">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const userInfo = () => {
        return(
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                    <ul className="list-group">
                        <li className="list-group-item"><span className="user-info">Name: </span>{name}</li>
                        <li className="list-group-item"><span className="user-info">Email: </span>{email}</li>
                        <li className="list-group-item">{role === 'customer' ? <span><span className="user-info">Status: </span>Registered</span> : role }</li>
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
        <Layout title="Dashboard" description={`Welcome back ${name} !`} className="container-fluid">
           <div className="row" >
                <div className="col-3">
                    {userLinks()}
                </div>

                <div className="col-9" id="user-info">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
           </div>

           
        </Layout>
    )
}

export default Dashboard

