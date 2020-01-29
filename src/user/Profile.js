import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Layout from '../templates/Layout'
import {isAuthed} from '../API/auth'
import {readUser, updateUser, updateUserInLocalStorage} from '../user/userRequest'

const Profile = (props) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        passwordConf: '',
        error: false,
        success: false
    })

    const {token} = isAuthed()
    const { name, email, password, passwordConf, error, success } = values

    const getUser = (userId) => {
       readUser(userId, token).then((res) => {
        if (res.error) {
            setValues({...values, error: true})
        } else {
            setValues({...values,
            name: res.name,
            email: res.email})
        }
       })
    }

    useEffect(() => {
        getUser(props.match.params.userId)
    }, [])

    const handleChange = (event, name) => {
        setValues({...values, [name]: event.target.value, error: false})
    }

    const submitForm = (event) => {
        event.preventDefault()
        if (password !== passwordConf) {
            return alert('Password does not match')
        }
        const userInfo = {
            name: name,
            email: email,
            password: password
        }
        updateUser(props.match.params.userId, token, userInfo).then((res) => {
            if (res.error) {

            } else {
                updateUserInLocalStorage(res, () => {
                    setValues({
                        ...values,
                        name: res.name,
                        email: res.email,
                        success: true
                    })
                })
            }
        })
    }
 
    const profileUpdate = (name, email, password) => (
        <form  id="profile-update-form">
          <div className="form-group" id="profile-update">
            <label className="text-muted">New Name</label>
            <input onChange={(event) => handleChange(event,'name')} type="text" value={name} className="form-control mb-2" placeholder="New name"/>
            <label className="text-muted">New Email</label>
            <input onChange={(event) => handleChange(event,'email')} type="email" value={email} className="form-control mb-2" placeholder="New email"/>
            <label className="text-muted">New Password</label>
            <input onChange={(event) => handleChange(event,'password')} type="password" value={password} className="form-control mb-2" placeholder="New password"/>
            <label className="text-muted">Confirm Password</label>
            <input onChange={(event) => handleChange(event,'passwordConf')} type="password" value={passwordConf} className="form-control mb-2" placeholder="Confirm password"/>
          </div>
            <button onClick={submitForm} className="btn btn-primary btn-lg">Update Info</button>
            <Link to="/user/dashboard" className="ml-4 mt-8">Back</Link>
        </form>
    )
  
    return (
        <Layout title="Profile" description="You can update it here" className="container-fluid">
            <h2 className="mb-4" id="profile-update-header">Update your profile</h2>
             {profileUpdate(name, email, password)}
             {success && <Redirect to="/user/dashboard"/>}
        </Layout>
    )
}

export default Profile