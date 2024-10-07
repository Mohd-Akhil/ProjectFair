import React, { useEffect, useState } from 'react'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'
import { Col, Row } from 'react-bootstrap'
import Header from '../components/Header'


function Dashboard() {

  const [user,setUser] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem('existingUser')){
      setUser(JSON.parse(sessionStorage.getItem('existingUser')).username);
    }
  })

  return (
    <>
    <Header dash={true}/>
    <h1 className='mt-5 ms-3'>Welcome <span className='text-success'>{user}</span></h1>
    <Row>
      <Col sm={12} md={8}>
      <MyProject/>
      </Col>
      <Col sm={12} md={4}>
      <Profile/>
      </Col>
    </Row>
    </>
  )
}

export default Dashboard