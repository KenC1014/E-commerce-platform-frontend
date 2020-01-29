import React, {useState, useEffect} from 'react'
import {getCategoriesRequest, listSearchRequest} from './requestAPI'
import Card from './Card'

const Search = () => {
    const [values, setValues] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })

    const {categories, category, search, results, searched} = values

    const fetchCategories = () => {
        getCategoriesRequest().then((fetchedCategories) => {
            if (fetchedCategories.error){

            } else {
                setValues({...values, categories: fetchedCategories})
            }
        })
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const searchProducts = () => {
        if(search) {
            listSearchRequest({search: search || undefined, category: category}).then((res) => {
                if (res.error){
                    
                } else {
                    setValues({...values, results: res, searched: true})
                }
            })
        }
    }

    const searchSubmit = (event) => {
        event.preventDefault()
        searchProducts()
    }

    const handleChange = name => (event) => {
        setValues({...values, [name]: event.target.value, searched: false})
    }

    const searchResultsMessage = (searched, results) => {
        if (searched === false) {
            return ''
        }
        
        if (searched === true && results.length > 0) {
            return (<div  className="ml-3">{`Found ${results.length} matched products:`}</div>)
        } else {
            return (<p className="not-found">Sorry: No products found!'</p>)
        }
    }

    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">{searchResultsMessage(searched, results)}</h2>
                <div className="row ml-2 mr-2">
                    {results.map((product, index) => (
                        <div className="col-4 mb-3"><Card key={index} product={product} productImage="product-img-Home" showAddToCart={false} viewStyle="view-home" pricetag="pricetag-home"/></div>
                    ))}
                </div>
            </div>
        )
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select onChange={handleChange("category")} className="btn mr-2">
                            <option value="All">Pick a category</option>
                            {categories.map((category, index) => (<option key={index} value={category._id}>{category.name}</option>))}
                        </select>
                    </div>
                    <input onChange={handleChange("search")} className="form-control" placeholder="Search products"></input>
                </div>
                <div className="btn input-group-append" style={{border: 'none'}}>
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    )

    return(
        <div className="row">
            <div className="container mb-3" style={{background: 'none', padding: '0px'}}>{searchForm()}</div>
            <div className="container-fluid mb-3" style={{background: 'none', padding: '0px'}}>{searchedProducts(results)}</div>
        </div>
    )
}

export default Search