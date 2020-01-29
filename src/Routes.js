import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './user/Signup'
import Login from './user/Login'
import Home from './templates/Home'
import PrivateRoute from './API/PrivateRoute'
import AdminRoute from './API/AdminRoute'
import Dashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import UpdateProduct from './admin/UpdateProduct'
import Orders from './admin/Orders'
import Shop from './templates/Shop'
import Product from './templates/Product'
import Cart from './templates/Cart'
import Profile from './user/Profile'
import ProductsManager from './admin/ProductsManager'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/shop" component={Shop} exact={true}/>
                <Route path="/login" component={Login} exact={true}/>
                <Route path="/signup" component={Signup} exact={true}/>
                <PrivateRoute path="/user/dashboard" component={Dashboard} exact={true}/>
                <PrivateRoute path="/profile/:userId" component={Profile} exact={true}/>
                <AdminRoute path="/admin/dashboard" component={AdminDashboard} exact={true}/>
                <AdminRoute path="/create/category" component={AddCategory} exact={true}/>
                <AdminRoute path="/create/product" component={AddProduct} exact={true}/>
                <AdminRoute path="/admin/product/update/:productId" component={UpdateProduct} exact={true}/>
                <AdminRoute path="/admin/orders" component={Orders} exact={true}/>
                <AdminRoute path="/admin/products" component={ProductsManager} exact={true}/>
                <Route path="/product/:productId" component={Product} exact={true}/>
                <Route path="/cart" component={Cart} exact={true}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes