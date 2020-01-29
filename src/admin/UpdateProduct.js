import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../templates/Layout'
import {isAuthed} from '../API/auth'
import {getCategoriesRequest, getSingleProductRequest, updateProductRequest} from './AdminRequest'

const UpdateProduct = (props) => {
    //define initial state
    const {token, user} = isAuthed()
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories:[],
        category: '',
        sizes:[],
        shipping: '',
        quantity: '',
        photo:'',
        loading: false,
        error:'',
        createProduct:'',
        redirectToProfile: false,
        formData:''
    })
    //destructure values
    const {
        name,
        description,
        price,
        categories,
        category,
        sizes,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values

    //initialization load categories and set formData
    const getCategories = () => {
        getCategoriesRequest().then((fetchedCategories) => {
            if(fetchedCategories.error){
                setValues({...values, error: fetchedCategories.error})
            } else {
                setValues({
                    sizes: [],
                    categories: fetchedCategories,
                    formData:  new FormData()
                })
            }
        })
    }

    const init = (productId) => {
        getSingleProductRequest(productId).then((res) => {
            if (res.error) {
                setValues({...values, error: res.error})
            } else {
                setValues({...values,
                name: res.name,
                description: res.description,
                price: res.price,
                category: res.category._id,
                shipping: res.shipping,
                quantity: res.quantity,
                formData: new FormData()
            })
                getCategories()
            }
        })
    }

    //populate the formData to send to the backend whenever the state changes
    useEffect(() => {
       init(props.match.params.productId)
    }, [])

    //handle change and set state Values
    const handleChange = name => (event) => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        const index = sizes.indexOf(value)
        let updatedSizes = [...sizes]
             
        if(name ==='sizes'){
            if (index === -1){
                updatedSizes.push(value)
            } else {
                updatedSizes.splice(index,1)
            }
        }
      
        if(name === 'sizes') {
            formData.set(name, updatedSizes)
            setValues({...values, [name]: updatedSizes})
        } else {
            formData.set(name, value)
            setValues({...values, [name]: value})
        }
    }

    //submit the product form to make a request to the backend
    const formSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error:"", loading: true})
        updateProductRequest(user._id, token, props.match.params.productId ,formData)
        .then((createdProduct) =>{
            if(createdProduct.error){
                setValues({...values, error: createdProduct.error})
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: createdProduct.name
                })
            }
        })
    }

    //create a form to submit product
    const newProductForm = () => (
        <form className="mb-3" onSubmit={formSubmit}>
            <h4>Upload Photo</h4>
            <div className="form-group">
                <label onChange={handleChange('photo')} className="btn btn-secondary"><input type="file" name="photo" accept="image/*" /></label>
            </div>

            <div className="form-group" style={{width: '300px'}}>
                <label className="text-muted">Product Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
            </div>

            <div className="form-group" style={{width: '400px'}}>
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" rows='5' value={description}/>
            </div>

            <div className="form-group" id="product-price">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price}/>
            </div>

            <div className="form-group" style={{width: '300px'}}>
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories && categories.map((categories, index) => (
                        <option key={index} value={categories._id}>{categories.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group" style={{width: '300px'}}>
                <label className="text-muted">Availabe Sizes</label>
                <div className="row">
                    <ul>
                        <li>
                          <input onChange={handleChange('sizes')} type="checkbox" className="form-check-input" value="small" />
                          <label className="form-check-label">Small</label>
                        </li>
                        <li>
                          <input onChange={handleChange('sizes')} type="checkbox" className="form-check-input" value="medium" />
                          <label className="form-check-label">Medium</label>
                        </li>
                        <li>
                          <input onChange={handleChange('sizes')} type="checkbox" className="form-check-input" value="large" />
                          <label className="form-check-label">Large</label>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="form-group" style={{width: '300px'}}>
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
            </div>

            <div className="form-group" id="product-quantity">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity}/>
            </div>
            <button className="btn btn-outline-primary">Update Product</button>
        </form>
    )
  
    return (
        <Layout title="Update this product" description={`${user.name} ! Make some changes to the product.`}>
        <div className="row" >
             <div className="col-md-8 offset-md-4">
                {createdProduct && <h5 className="alert alert-success" id="category-success">Success: product {createdProduct} is updated !</h5>}
                {error && <h5 className="alert alert-danger"  id="category-error">Error: {error}</h5>}
                {loading && <div className="alert alert-light">Please wait ...</div>}
                {newProductForm()}
             <div className="mt-3">
                <Link to="/admin/products" className="text-info">Back to Products Manager</Link>
             </div>
             </div>
        </div>
      
     </Layout>
    )
}

export default UpdateProduct