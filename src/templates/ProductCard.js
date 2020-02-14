import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import {addItem} from './cartUtils'

const ProductCard = ({product, productImage}) => {
  const [redirect, setRedirect] = useState(false)
  const [size, setSize] = useState('')

  const addToCart = () => {
    if (product.quantity < 1) {
      return alert('Items are sold out!')
    }
    
    product.selectedSize = size
    if (!product.selectedSize) {
      return alert('Please select a size!')
    }
  
    addItem(product, () => {
        setRedirect(true)
    })
}

    const redirectAction = (redirect) => {
      if (redirect) {
          return <Redirect to="/cart" />
      }
  }

  const selectSize = (size) => {
     setSize(size)
  }
    
    return (
        <div className="container" style={{background: 'none', padding: '0px'}} id="external">
          {redirectAction(redirect)}
          <div className="left-column">
            <div className="mt-4"><ShowImage item={product} url="product" productImage={productImage} id="product-card-img"/></div>
          </div>
       
       
        
          <div className="right-column">
           
            <div className="product-description">
              <span>{product.category.name}</span>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
            </div>
       
        
          <div className="product-configuration">
       
          
            <div className="product-color">
              <span>Availability:</span>
              <div className="cable-choose">
              {(product.quantity>0 && product.sizes.length>0) ? (<span className="badge badge-primary badge-lg mt-2" id="product-card-badge">In Stock</span>) : (
                  <span className="badge badge-danger">Out of Stock</span>
              )}
            </div>
                     
            </div>
       
          
            <div className="cable-config">
              <span>Sizes:</span>
                <div class="cable-choose">
                  {product.sizes.length === 0 && <p id="no-sizes">No sizes available</p>}
                  {product.sizes[0]&&product.sizes[0].indexOf('small')!==-1 && <button onClick={() => selectSize('small')}>Small</button>}
                  {product.sizes[0]&&product.sizes[0].indexOf('medium')!==-1 && <button onClick={() => selectSize('medium')}>Medium</button>}
                  {product.sizes[0]&&product.sizes[0].indexOf('large')!==-1 && <button onClick={() => selectSize('large')}>Large</button>}
                </div>
                    
              <p>Added {moment(product.createdAt).fromNow()}</p>
            </div>
          </div>
       
        
          <div className="product-price">
            <span>€{product.price}</span>
            <button onClick={addToCart} className="cart-btn">Add to cart</button>
            <Link to="/shop" className="ml-3 mt-3">Back</Link>
          </div>
        </div>
      </div>
    )
}

export default ProductCard