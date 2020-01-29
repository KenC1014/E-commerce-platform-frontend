import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import {getThisProductRequest, listRelatedRequest} from './requestAPI'
import Card from './Card'
import ProductCard from './ProductCard'

const Product = (props) => {
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const [error, setError] = useState(false)

    const fetchThisProduct = (productId) => {
        getThisProductRequest(productId).then((fetchedProduct) => {
            if(fetchedProduct.error){
                setError(fetchedProduct.error)
            }else{
                setProduct(fetchedProduct)
                listRelatedRequest(fetchedProduct._id).then((fetchedRelatedProducts) => {
                    if(fetchedRelatedProducts.error) {
                        setError(fetchedRelatedProducts.error)
                    } else {
                        setRelatedProducts(fetchedRelatedProducts)
                    }
                })
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId
        fetchThisProduct(productId)
    },[props.match.params])

    return (
        <Layout title={product && product.name} description={product.description && product.description.substring(0,100)} className="container-fluid">
            <div className="row-8">
                {product && product.description && <ProductCard product={product} productImage="product-img-individual"/>}
            </div>

            <div className="row-4 mt-5">
            <h4 className="ml-2">Related Products</h4>
                <div className="row">
                  {relatedProducts.map((product, index) => (<div key={index} className="col-3 mb-3"><Card product={product} productImage="product-img-Shop" viewStyle="view-shop" showAddToCart={false} pricetag="pricetag-shop"/></div>))}
                </div>
            </div>
          
        </Layout>
    )
}

export default Product