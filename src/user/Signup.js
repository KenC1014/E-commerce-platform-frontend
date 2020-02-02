import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../templates/Layout'
import {signUp} from '../API/auth'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        passwordConf: '',
        error: '',
        success: false
    })

    const {name, email, password, passwordConf, error, success} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }
    
    const submitForm = (event) => {
        event.preventDefault()
        setValues({...values, error: false})
        if (password !== passwordConf) {
            return setValues({...values, error: 'Password does not match'})
        }
        signUp({name, email, password})
        .then((res) => {
            if(res.error){
                setValues({...values, error: res.error, success: false})
            }else{
                setValues({...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
    }

    const signUpForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label className='text-muted'>Name</label>
                    <input type="text" onChange={handleChange('name')} className="form-control" value={name}></input>
                </div>
    
                <div className="form-group">
                    <label className='text-muted'>Email</label>
                    <input type="email" onChange={handleChange('email')} className="form-control" value={email}></input>
                </div>
    
                <div className="form-group">
                    <label className='text-muted'>Password</label>
                    <input type="password" onChange={handleChange('password')} className="form-control" value={password}></input>
                </div>

                <div className="form-group">
                  <label className='text-muted'>Confirm Password</label>
                  <input type="password" onChange={handleChange('passwordConf')} className="form-control" value={passwordConf}></input>
              </div>
    
                <button onClick={submitForm} className="btn btn-info btn-lg">Submit</button>
                <div> 
                     Already have an account? <Link to="/login">  Log In</Link>
                </div>
            </form>
        )
    }

    return (
        <Layout title="Sign Up" description="Join SocksManias today" className="container col-md-4 offset-md-4">
           {error && <div className="alert alert-danger">{error}</div>}
           {success && <div className="alert alert-success">New account created! Please <Link to="/login">Login</Link>.</div>}
           {signUpForm()}
        </Layout>
    )
}

export default Signup