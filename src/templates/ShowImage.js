import React from 'react'
import {API} from '../config'

const ShowImage = ({item, url, productImage}) => (
    <div className={productImage}>
        <img src={`${API}/${url}/photo/${item._id}`}
        alt = {item.name}
        className="mb-3"
        style={{maxHeight: "100%", maxWidth: "100%"}}
        />
    </div>
)

export default ShowImage