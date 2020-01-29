import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import {getCartItems} from './cartUtils'
import Card from './Card'
import Checkout from './Checkout'

const Cart = () => {
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false)

    useEffect(() => {
        setItems(getCartItems())
    },[run])

    const showItems = (items) => {
        return(
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr/>
                {items.map((item, index) => (<div className="container"><Card key={index} product={item} productImage="product-img-Cart" showAddToCart={false} cartUpdate={true} showRemoveFromCart={true} setRun={setRun}
                run={run} pricetag="pricetag-cart"/></div>))}
            </div>
        )
    }

    const showNoItems = () => {
        return(
            <div>
                <h2>Your cart is empty</h2>
                <Link to="/shop"><button className="btn btn-outline-info btn-lg">Go Shopping</button></Link>
            </div>
        )
    }

    return (
        <Layout title="My Cart" description="Ready to check out?" className="container-fluid">
           <div className="row">
             <div className="col-6">
               {items.length>0 ? showItems(items) : showNoItems()}
             </div>

             <div className="col-6">
               <h2>Your cart summary</h2>
               <hr/>
               <Checkout products={items} setRun={setRun} run={run}/>
             </div>
           </div>
          
        </Layout>
    )
}

export default Cart