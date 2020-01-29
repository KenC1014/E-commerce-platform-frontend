import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import {addItem, updateItem, removeItem} from './cartUtils'

const Card = ({product, productImage, showAddToCart=true, cartUpdate=false, showRemoveFromCart=false ,setRun = f => f,  run = undefined, viewStyle = undefined, pricetag = undefined}) => {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }

    const redirectAction = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const handleChange = (productId) => event => {
        setRun(!run)
        const number = event.target.value
        setCount(number >=1 ? number : 1)
        if(number >=1){
            updateItem(productId, number)
        }
    }

    const showCartUpdate = (cartUpdate) => {
       if (cartUpdate) {
           return(
               <div>
                  <div className="input-group mb-3 mt-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Adjust Quantity</span>
                    </div>
                      <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
                  </div>
               </div>
           )
       }
    }

    const showSizeSelection = (isCartCard) => {
        if (isCartCard) {
            return (
                <div>
                  {product.selectedSize ? 
                    (<h3 className="mb-3 mt-2">Size selected: <span id="size-cart-selected">{product.selectedSize}</span></h3>): 
                    (<Link to={`/product/${product._id}`}><button>Please select your size</button></Link>)}
                </div>
            )
        }
    }

    return (
            <div className="card">
                <div className="card-header">{product.name}</div>
                <div className="card-body">
                    {redirectAction(redirect)}
                    <ShowImage item={product} url="product" productImage={productImage}/>
                    <p id="description">{product.description.substring(0,40)}</p>
                    <p><span className={pricetag}>€{product.price}</span></p>
                    {showSizeSelection(showRemoveFromCart)}
                    <Link to={`/product/${product._id}`}><button id={viewStyle} className="btn btn-outline-info mt-2 mb-2" >View Product</button></Link>
                    {showAddToCart && <button onClick={addToCart} className="btn btn-outline-primary mt-2 mb-4 ml-2">Add to cart</button>}
                    {showRemoveFromCart && <button onClick={() => {removeItem(product._id, product.selectedSize) ; setRun(!run)}} className="btn btn-outline-danger mt-2 mb-2 ml-2">Remove</button>}
                    {showCartUpdate(cartUpdate)}
                </div>
            </div>
       
    )
}

export default Card