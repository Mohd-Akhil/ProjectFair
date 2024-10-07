import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddProject from './AddProject'
import { faGlobe, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import EditProject from './EditProject'
import { deleteProjectApi, userProjectApi } from '../services/allApi'
import { addResponseContext, editResponseContext } from '../context/DataShare'
import { Link } from 'react-router-dom'

function MyProject() {
  const [userProject,setUserProject] = useState("")

  const {addResponse} = useContext(addResponseContext)
  const [deleteStatus,setDeleteStatus] = useState(false)

  const {editResponse} = useContext(editResponseContext)

  const getUserProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await userProjectApi(reqHeader)
      setUserProject(result.data);
    }  
  }

  const handleDelete = async(id)=>{
    const result = await deleteProjectApi(id)
    console.log(result);
    if(result.status == 200){
      setDeleteStatus(true)
    }
  }

  useEffect(()=>{
    getUserProject()
    setDeleteStatus(false)
  },[addResponse,deleteStatus,editResponse])


  return (
    <>
      <div className='shadow mt-5 ms-5 p-4'>
        <div className='d-flex p-4 justify-content-between'>
          <h1 className='text-success'>My Project</h1>
          <AddProject />
        </div>
        {userProject?.length>0?
        userProject?.map((item)=>(
          <div className='d-flex p-3 rounded align-items-center mt-3' style={{ backgroundColor: '#d8d5d5' }} >
          <div className='ms-3'>
            <h3>{item.title}</h3>
          </div>
          <div className='ms-auto d-flex'>
            <EditProject project={item} />
            <Link to={item.website} target='_blank' ><FontAwesomeIcon icon={faGlobe} className='text-warning ms-3 fa-lg' /></Link>
            <Link to={item.github} target='_blank' ><FontAwesomeIcon icon={faGithub} className='text-success ms-3 fa-lg' /></Link>
            <FontAwesomeIcon icon={faTrashCan} className='text-danger ms-3 me-4 fa-lg' onClick={()=>handleDelete(item._id)} />
          </div>
        </div>
        ))
        
        : 
        <p className='text-danger text-center'> no projects to display</p>
        }
      </div>
    </>
  )
}

export default MyProject