import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../templates/Layout'
import {isAuthed} from '../API/auth'
import {getProductsRequest, deleteProductRequest} from './AdminRequest'

const ProductsManager = () => {
    const [products, setProducts] = useState([])

    const {token, user} = isAuthed()

    const getProducts = () => {
        getProductsRequest().then((res) => {
            if (res.error) {
                alert('Error on getting products')
            } else {
                setProducts(res)
            }
        })
    }

    const deleteProduct = (productId) => {
        deleteProductRequest(user._id, token, productId).then((res) => {
            console.log(res)
            if (res.error) {
                alert('Unable to delete product')
            } else {
                getProducts()
            }
        })
    }

    useEffect(() => {
        getProducts()
    },[])

    return (
        <Layout title="Products Manager" description="Here you can manage all existing products" className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h3 className="manage-products-header">{`Total products: ${products.length}`}</h3>
                <hr/>
                <table id="manage-order-table">
                  {products.map((product, index) => (
                  <tr key={index} id="manage-order-row">
                    <td><span className="manage-order-id">ID: {product._id}</span></td>
                    <td><span className="manage-order-name">{product.name}</span></td>
                    <td><span className="manage-order-name">{product.quantity} left in stock</span></td>
                    <td className="manage-order-button">
                      <Link className="ml-5" to={`/admin/product/update/${product._id}`}><button className="btn btn-warning btn-lg">Update</button></Link>
                      <button onClick={() => deleteProduct(product._id)} className="btn btn-danger btn-lg ml-4">Delete</button>
                    </td>
                  </tr>
                  ))}
                </table>
              </div>
            </div>
        </Layout>
    )
}

export default ProductsManager