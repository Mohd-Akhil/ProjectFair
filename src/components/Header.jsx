import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link,useNavigate } from 'react-router-dom';




function Header({dash}) {
  const navigate = useNavigate()

  const handleLogout = ()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    navigate("/")
  }


  return (
    <>
      <Navbar className='border-light' style={{ backgroundColor: 'green' }}>
        <Container>
          <Link to={'/'} style={{textDecoration:'none'}}>
            <Navbar.Brand className='text-light d-flex'>
              <FontAwesomeIcon icon={faStackOverflow} className='fa-2x me-3' />
              <h1>Project Fair</h1>
            </Navbar.Brand>
          </Link>
          {dash && <button type='button' className='btn btn-danger shadow'><FontAwesomeIcon icon={faPowerOff} onClick={handleLogout} /> Logout </button>}
        </Container>
      </Navbar>
    </>
  )
}

export default Header