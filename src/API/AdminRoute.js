import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAuthed} from './auth'

const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => isAuthed() && isAuthed().user.role !== 'customer' ? (
        <Component {...props} />
    ) : (
        <Redirect 
        to={{
            pathname: '/login', 
            state: {from: props.location}
        }} />
    )} />
)

export default AdminRoute