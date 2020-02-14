import React from 'react'
import Menu from './Menu'

const Layout = ({title, description, className, children}) => {
    return(
        <div>
            <Menu />
            <div className='jumbotron' id="tron">
                <h2 className="mt-5">{title}</h2>
                <p className='lead'>{description}</p>
            </div>
            <div className={className}>
              <p>{children}</p>
            </div>
            <footer> 
              <p className="copyright"> &copy; Copyright 2020 Quantec GmbH Deutschland</p>
            </footer>
        </div>
    )
}

export default Layout