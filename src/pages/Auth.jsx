import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { registerApi, loginApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Auth({ register }) {
  const navigate = useNavigate()
  const [userDetails, setuserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })

  console.log(userDetails);

  const handleRegister = async () => {
    const { username, email, password } = userDetails

    if (!username || !email || !password) {
      toast.info('please fill the form completely')
    }
    else {
      const result = await registerApi(userDetails)
      console.log(result);
      if (result.status == 200) {
        toast.success('registeration successfull')
        navigate('/login')
      }
      else {
        toast.error('something went wrong.please try again after sometime')
      }
    }

  }

  const handleLogin = async () => {
    const { email, password } = userDetails

    if (!email || !password) {
      toast.info('please fill the form completely')
    }
    else {
      const result = await loginApi({ email, password })
      console.log(result);
      if (result.status == 200) {
        toast.success('login successfull')
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
        setTimeout(() => {
          navigate("/")
        }, 2000);
      }
      else {
        toast.error(result.response.data)
      }
    }
  }

  return (
    <>
      <div className='d-flex justify-content-center align-items-center container-fluid flex-column' style={{ height: '100vh' }}>
        <div className='container w-75'>
          <Link to={'/'} className='fs-4' style={{ textDecoration: 'none', color: 'yellow' }}><FontAwesomeIcon icon={faArrowLeft} className='me-3' />Back to home</Link>

          <div className=' bg-info p-3 mt-2 rounded'>
            <Row>
              <Col sm={12} md={6} className='d-flex justify-content-center align-items-center' >
                <img src="https://cdn-icons-png.flaticon.com/512/295/295128.png" alt="no image" className='w-75' />
              </Col>
              <Col sm={12} md={6} className='d-flex flex-column justify-content-center align-items-center text-light' >
                <h3><FontAwesomeIcon icon={faStackOverflow} className='fa-2x me-3 ' /> Project Fair</h3>
                {register ? <h5>sign in to your account</h5> :
                  <h5>sign up to your account</h5>}

                <form className="mt-3 w-75">
                  {register &&
                  <div className="mb-3">
                    <input type="text" placeholder='User Name' className='form-control' onChange={(e) => setuserDetails({ ...userDetails, username: e.target.value })} />
                  </div>}
                  <div className="mb-3">
                    <input type="text" placeholder='E-Mail' className='form-control' onChange={(e) => setuserDetails({ ...userDetails, email: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <input type="password" placeholder='Password' className='form-control' onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    {register ?
                      <div>
                        <button type='button' className='btn btn-warning w-100 mb-1' onClick={handleRegister} >Register</button>
                        <h6>Already a user? Click here to <Link to={'/login'} className='text-danger'>Login</Link></h6>
                      </div>
                      :
                      <div>
                        <button type='button' className='btn btn-warning w-100 mb-1' onClick={handleLogin} >Login</button>
                        <h6>New user? Click here to <Link to={'/register'} className='text-danger'>Register</Link></h6>
                      </div>}
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={2000} />
      </div>
    </>
  )
}

export default Auth