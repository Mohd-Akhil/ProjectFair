import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import mainimage from '../assets/img1.webp'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectApi } from '../services/allApi'



function Home() {

  const [isLogin, setIsLogin] = useState(false);
  const [homeProject,setHomeProject] = useState([])

  const getHomeProject = async()=>{
    const result = await homeProjectApi()
    setHomeProject(result.data);
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setIsLogin(true)
    }
    else {
      setIsLogin(false)
    }
    getHomeProject()
  }, [])

  return (
    <>
      <div className='container-fluid' style={{ height: '100vh', backgroundColor: 'green' }}>
        <Row className='p-md-5 align-items-center'>
          <Col md={6} xs={12} className='ps-5'>
            <h1 className='text-light' style={{ fontSize: '70px' }}> Project Fair</h1>
            <p className='mt-4'>One stop destination for all software development projects </p>
            { !isLogin ? <Link to={'/login'}><button className='text-light btn btn-info mt-2'>Get Started <FontAwesomeIcon icon={faArrowRight} className='ms-2' /></button></Link>
              :
              <Link to={'/dashboard'}> <button className='text-light btn btn-info mt-2'>Manage Project <FontAwesomeIcon icon={faArrowRight} className='ms-2' /></button></Link> }
          </Col>
          <Col md={6} xs={12}>
            <img src={mainimage} className='w-75 ps-5' alt='no image' style={{ marginTop: '100px' }} />
          </Col>
        </Row>
      </div>


      <div className='container-fluid'>
        <h1 className='mt-5 text-center'>Explore Our Projects</h1>
        <div className='row mt-5'>
          {homeProject?.length>0?
          homeProject?.map((item)=>(
          <div className='col-md-4'>
            <ProjectCard projects={item} />
          </div>))
          :
          null}
        </div>
        <Link to={'/project'} className='text-center text-danger'> <h5 className='mt-4'> See More Projects </h5></Link>
      </div>
    </>
  )
}

export default Home