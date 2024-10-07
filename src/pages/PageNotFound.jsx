import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'


function PageNotFound() {
  return (
    <>
      <div className='d-flex justify-content-center align-items-center flex-column'>
        <img src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif" height={'550px'} alt="404 image" />
        <h1>Look's Like You're Lost !!!</h1>
        <Link to={'/'}><button className='btn btn-warning'> <FontAwesomeIcon icon={faArrowLeft} className='me-2' /> Back To Home </button></Link>
      </div>
    </>
  )
}

export default PageNotFound