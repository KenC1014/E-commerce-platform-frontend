import React from 'react'
import Layout from './Layout'

const About = () => {
    return (
        <Layout title="About Quantec" description="Our value, vision and mission" className="container-fluid">
        <div id="about">
          <h2>Company Information</h2>
          <p>Address: Langenaustraße 34, Erlangen, Germany</p>  
          <p>Postal Code: 91058</p> 
          <p>Tel: +49 (0)91319409434</p> 
          <p>Register Number: HRB 17153</p>
          <h2>Contact</h2>
          <p>YuQing Guo</p>
          <p>Email: bau13865@gmail.com</p>  
        </div>
              
        </Layout>
    )
}

export default About