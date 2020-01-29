import React, {useState} from 'react'

const Checkbox = ({categories, handleFilters}) => {
    const [checked, setChecked] = useState([])

    const handleToggle = categoryId => () => {
        const index = checked.indexOf(categoryId)
        let updatedChecked = [...checked]

        if (index === -1){
            updatedChecked.push(categoryId)
        } else {
            updatedChecked.splice(index,1)
        }
       
        setChecked(updatedChecked)
        handleFilters(updatedChecked, 'category')
    }

    return categories.map((category, index) => (
            <li key={index}>
                <input onChange={handleToggle(category._id)} type="checkbox" className="form-check-input"/>
                <label className="form-check-label">{category.name}</label>
            </li>
        ))
    }

export default Checkbox