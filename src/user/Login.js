import React, {useState} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Layout from '../templates/Layout'
import {logIn, authenticate, isAuthed} from '../API/auth'

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false 
    })

    const {email, password, error, loading, redirectToReferrer} = values
    const {user} =  isAuthed()

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }
    
    const submitForm = (event) => {
        event.preventDefault()
        setValues({...values, error: false, loading: true})
        logIn({email, password})
        .then((res) => {
            if(res.error){
                setValues({...values, error: res.error, loading: false})
            }else{
                authenticate(res, () => {
                    setValues({...values,
                        ...values,
                        redirectToReferrer: true
                    })
                })
            }
        })
    }

    const redirectUser = () => {
        if(redirectToReferrer) {
            if(user.role === 'customer'){
                return <Redirect to="/user/dashboard"/>
            } else {
                return <Redirect to="/admin/dashboard"/>
            }
        }

        if(isAuthed()){
            return <Redirect to="/"/>
        }
    }

    const signUpForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label className='text-muted'>Email</label>
                    <input type="email" onChange={handleChange('email')} className="form-control" value={email}></input>
                </div>
    
                <div className="form-group">
                    <label className='text-muted'>Password</label>
                    <input type="password" onChange={handleChange('password')} className="form-control" value={password}></input>
                </div>
    
                <button onClick={submitForm} className="btn btn-info btn-lg">Submit</button>
                <div> 
                     Don't have an account yet? <Link to="/signup">  Sign up now</Link>
                </div>
            </form>
        )
    }

    return (
        <Layout title="Log In" description="Welcome back!" className="container col-md-4 offset-md-4">
           {error && <div className="alert alert-danger">{error}</div>}
           {loading && <div className="alert alert-light">Please wait ...</div>}
           {redirectUser()}
           {signUpForm()}
        </Layout>
    )
}

export default Login