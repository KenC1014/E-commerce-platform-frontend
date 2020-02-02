import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {logOut, isAuthed} from '../API/auth'
import {itemTotal} from './cartUtils'

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color: '#ff9900'}
    } else {
        return {color: '#ffffff'}
    }
}

const menu = ({history}) => {
    return(
        <div className="row"  id="pro-img">
             <div className="col-2"> 
               <img className="adjust_img mt-4 mb-4 ml-4" src="http://proweld-slovakia.sk/wp-content/uploads/2019/03/ProWeld_ProGuard_logo.png" alt="ProWeld_ProGuard_logo"/>
             </div>
             <div className="col-10" >
             <ul className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                 <li>
                     <Link className="nav-item nav-link active" id="nav-home-tab" role="tab" data-toggle="tab" aria-controls="nav-home" aria-selected="true" style={isActive(history, '/')} to="/">Home</Link>
                 </li>

                 <li>
                    <Link className="nav-item nav-link active" id="nav-home-tab" role="tab" data-toggle="tab" aria-controls="nav-home" aria-selected="true" style={isActive(history, '/shop')} to="/shop">Shop</Link>
                </li>

                {isAuthed() && isAuthed().user.role === 'customer' && (
                    <li>
                        <Link className="nav-item nav-link" id="nav-profile-tab" role="tab" data-toggle="tab" aria-controls="nav-home" aria-selected="true" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                    </li>
                )}

                {isAuthed() && isAuthed().user.role !== 'customer' && (
                    <li>
                        <Link className="nav-item nav-link" id="nav-profile-tab" role="tab" data-toggle="tab" aria-controls="nav-home" aria-selected="true" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                    </li>
                )}
                 
                {!isAuthed() && 
                    <Fragment>
                        <li>
                            <Link className="nav-item nav-link" id="nav-profile-tab" role="tab" data-toggle="tab" aria-controls="nav-profile" aria-selected="false" style={isActive(history, '/login')} to="/login">Login</Link>
                        </li>
                        <li>
                            <Link className="nav-item nav-link" id="nav-contact-tab" role="tab" data-toggle="tab" aria-controls="nav-contact" aria-selected="false" style={isActive(history, '/signup')} to="/signup">Signup</Link>
                        </li>
                    </Fragment>}

                {isAuthed() && 
                    <li>
                       <span className="nav-item nav-link" 
                       id="nav-contact-tab" 
                       role="tab" data-toggle="tab" 
                       aria-controls="nav-contact" 
                       aria-selected="false" 
                       style={{cursor:'pointer'}} 
                       onClick={() => {logOut(() => {
                           history.push('/')
                       })}}
                       >Logout</span>
                    </li>}

                    <li>
                      <Link className="nav-item nav-link" id="nav-profile-tab" aria-controls="nav-home" aria-selected="true" style={isActive(history, '/about')} to="/about">About</Link>
                   </li>
                    
                <li id="shop-cart">
                  <Link className="nav-item nav-link" id="shop-cart-text" style={isActive(history, '/cart')} to="/cart">Cart<span className="badge">{itemTotal()>0 && itemTotal()}</span></Link>
                </li>
             </ul>
             </div>
        </div>
    )
 }

export default withRouter(menu)