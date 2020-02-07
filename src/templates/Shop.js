import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {getCategoriesRequest, getFilteredProducts} from './requestAPI'
import Checkbox from './Checkbox'
import Radiobox from './RadioBox'
import prices from './fixedPrices'

const Shop = () => {
    const [productFilters, setProductFilters] = useState({
        filters: {category: [], price: []}
    })
    const [categories, setCategories] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [limit, setLimit] = useState(6)
    const [error, setError] = useState(false)

     //initialization load categories and set formData
     const init = () => {
        getCategoriesRequest().then((fetchedCategories) => {
            if(fetchedCategories.error){
                setError(fetchedCategories.error)
            } else {
                setCategories(fetchedCategories)
            }
        })
    }

    const fetchFilteredResults = (currentFilters) => {
        getFilteredProducts(0, limit, currentFilters).then((fetchedFilteredProducts) => {
             if (fetchedFilteredProducts.error) {
                 setError(fetchedFilteredProducts.error)
             } else {
                 setFilteredProducts(fetchedFilteredProducts.matchedProducts)
                 setSize(fetchedFilteredProducts.size)
                 setSkip(fetchedFilteredProducts.size)
            }
        })
     }

     //concate more products on to the exisiting state array
     const loadMore = () => {
        getFilteredProducts(skip, limit, productFilters.filters).then((fetchedFilteredProducts) => {
             if (fetchedFilteredProducts.error) {
                 setError(fetchedFilteredProducts.error)
             } else {
                 setFilteredProducts([...filteredProducts, ...fetchedFilteredProducts.matchedProducts])
                 setSize(fetchedFilteredProducts.size)
                 setSkip(skip + fetchedFilteredProducts.size)
             }
        })
     }

    useEffect(() => {
        init()
        fetchFilteredResults(productFilters.filters)
    }, [])

    const IdtoPrice = (id) => {
        let priceArray = []

        for (let key in prices) {
            if(prices[key]._id === parseInt(id)){
                priceArray = [...prices[key].array]
            }
        }
        return priceArray
    }
  
    const handleFilters = (filters, filterBy) => {
        const newFilters = {...productFilters}
        newFilters.filters[filterBy] = filters
        if (filterBy.toString() === 'price'){
            let priceValues = IdtoPrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
       
        setProductFilters(newFilters)
        fetchFilteredResults(productFilters.filters)
    }

    return (
        <Layout title="Shop Now" description="Explore your full potential" className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={handleFilters}/>
                    </ul>

                    <h4>Filter by price</h4>
                    <div>
                        <Radiobox prices={prices} handleFilters={handleFilters}/>
                    </div>
                </div>
                <div className="col-9">
                    <h2 className="mb-4">Products</h2>
                    <div className="row mr-1">
                        {filteredProducts.map((filteredProduct, index) => (
                            <div key={index} className="col-4 mb-3">
                                <Card product={filteredProduct} productImage="product-img-Shop" viewStyle="view-shop" showAddToCart={false} pricetag="pricetag-shop"/>
                            </div>
                        ))}
                        <hr/>
                        {(size>0 && size >= limit) && <button className="load-more" onClick={() => loadMore()}>Load more products</button>}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Shop