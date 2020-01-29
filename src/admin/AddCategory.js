import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../templates/Layout'
import {isAuthed} from '../API/auth'
import {createCategoryRequest} from './AdminRequest'

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {token, user} = isAuthed()

    const handleChange = (event) => {
        setError('')
        setName(event.target.value)
    }

    const formSubmit = (event) => {
        event.preventDefault()
        createCategoryRequest(user._id, token, {name})
        .then((createdCategory) => {
            if(createdCategory.error){
                setError(true)
            } else {
                setError('')
                setSuccess(true)
            }
        }).catch(() => {

        })
    }

    const newCategoryForm = () => (
        <form onSubmit={formSubmit}>
           <div className="form-group">
                <label className="text-muted">New Category Name</label>
                <input type="text" className="form-control" id="create-category-form" onChange={handleChange} value={name} autoFocus required/>
           </div>
           <button className="btn btn-outline-primary">Create Category</button>
        </form>
    )

    return (
        <Layout title="Add a new category" description={`${user.name} ! Add a new category to get started`}>
        <div className="row" >
             <div className="col-md-8 offset-md-4">
             {success && <h5 className="alert alert-success" id="category-success">Category: {name} is created !</h5>}
             {error && <h5 className="alert alert-danger"  id="category-error">Category: {name} already exists</h5>}
             {newCategoryForm()}
             <div className="mt-5">
                <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
             </div>
             </div>
        </div>
      
     </Layout>
    )
    
}

export default AddCategory