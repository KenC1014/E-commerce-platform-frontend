import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import {getProductsRequest} from './requestAPI'
import Card from './Card'
import Search from './Search'

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductsBySell = () => {
        getProductsRequest('sold').then((fetchedProducts) => {
            if(fetchedProducts.error) {
                setError(fetchedProducts.error)
            } else {
                setProductsBySell(fetchedProducts)
            }
        })
    }

    const loadProductsByArrival = () => {
        getProductsRequest('createdAt').then((fetchedProducts) => {
            if(fetchedProducts.error) {
                setError(fetchedProducts.error)
            } else {
                setProductsByArrival(fetchedProducts)
            }
        })
    }

    useEffect(() => {
        loadProductsBySell()
        loadProductsByArrival()
    },[])

    return (
        <Layout title="Home Page" description="Welcome to SockManic" className="container-fluid">
            <Search />
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, index) => (<div key={index} className="col-4 mb-3"><Card product={product} productImage="product-img-Home" showAddToCart={false} viewStyle="view-home" pricetag="pricetag-home"/></div>))}
            </div>
                    
            <h2 className="mb-4">Best Sellers</h2>
            <div className='row'>
                {productsBySell.map((product, index) => (<div key={index} className="col-4 mb-3"><Card product={product} productImage="product-img-Home" showAddToCart={false} viewStyle="view-home" pricetag="pricetag-home"/></div>))}
            </div>
          
        </Layout>
    )
}

export default Home