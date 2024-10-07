import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { allProjectApi } from '../services/allApi'



function Project() {

  const [isToken, setIsToken] = useState("")
  const [allprojects, setAllProjects] = useState([])
  const [searchKey, setSearchKey] = useState("")

  const getAllProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }

      const result = await allProjectApi(searchKey, reqHeader)
      if (result.status == 200) {
        setAllProjects(result.data)
      }
    }
  }
  console.log(allprojects);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsToken(sessionStorage.getItem("token"))
    }
  }, [])

  useEffect(() => {
    getAllProject()
  }, [searchKey])


  return (
    <>
      <Header />
      <h1 className='text-center'>PROJECTS</h1>


      {isToken ?
        <div>
          <div className="row w-100 mt-5">
            <div className="col-md-4"></div>
            <div className="col-md-4 d-flex">
              <input type="text" placeholder='search by technologies' onChange={(e) => setSearchKey(e.target.value)} className='form-control shadow' /><FontAwesomeIcon icon={faMagnifyingGlass} size='xl' style={{ marginTop: '8px', marginLeft: '-35px' }} flip='horizontal' />
            </div>
            <div className="col-md-4"></div>
          </div>

          {allprojects?.length > 0 ?
            <div className="container-fluid mt-5">
              <div className="row">
                {allprojects?.map((item)=>(
                  <div className="col-md-4">
                  <ProjectCard projects={item}/>
                </div>
                ))}
                <div className="col-md-4"></div>
                <div className="col-md-4"></div>
              </div>
            </div>
            :
            <p className='text-center text-danger mt-5 fs-3'>No Projects To Display</p>
          }
        </div>
        :
        <div>
          <div className='row w-100'>
            <div className="col-md-2"></div>
            <div className="col-md-8 align-items-center justify-content-center d-flex flex-column">
              <img src="https://mspublicschoolpremnagar.com/login/images/logo/login.gif" alt="no image" />
              <h4 className='text-center mt-3'>Please <Link to={'/login'} style={{ color: 'blue' }} >login</Link> to explore other projects</h4>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>}


    </>
  )
}

export default Project