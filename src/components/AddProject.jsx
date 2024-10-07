import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addResponseContext } from '../context/DataShare';



function AddProject() {

  const [show, setShow] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projImage: ""
  })

  const [preview, setPreview] = useState("")
  const [token , setToken] = useState("")
  const [key,setKey] = useState(0)

  const {setAddResponse} = useContext(addResponseContext)

  // console.log(projectDetails);

  const handleFile = (e) => {
    /* console.log(e.target.files[0]); */
    setProjectDetails({ ...projectDetails, projImage: e.target.files[0]})
  }

  const handleClose = () => setShow(false);
  const handleShow = () => { setShow(true), handleReset() };

  const handleReset = () => {
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: ""
    })
    setPreview("")
    if(key == 0){
      setKey(1)
    }
    else{
      setKey(0)
    }
  }

  useEffect(() => {
    if (projectDetails.projImage) {
      //createObjectURL - method used to convert files into url
      setPreview(URL.createObjectURL(projectDetails.projImage));
    }
  }, [projectDetails.projImage])
  /* console.log(preview); */


  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
      // console.log(token);
    }
  },[])


  const handleAdd = async (e) => {
    e.preventDefault()

    const { title, language, github, website, overview, projImage } = projectDetails
    if (!title || !language || !github || !website || !overview || !projImage) {
      toast.info("please fill the form completely")
    }
    else {
      //api
      // inorder to send uploaded content - use FormData
      const reqBody = new FormData()

      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      reqBody.append("projImage", projImage)

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization":`Bearer ${token}`
        }

        const result = await addProjectApi(reqBody,reqHeader)
        console.log(result);
        if(result.status == 200){
          toast.success("project added successfully")
          handleClose()
          setAddResponse(result.data)
        }
      }
      else{
        toast.error("please login")
      }
    }
  }


  return (
    <>
      <button className='btn btn-success ms-auto me-2' onClick={handleShow}> Add <FontAwesomeIcon icon={faPlus} className='ms-1' /></button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <label htmlFor="projImg">
                <input id='projImg' type="file" style={{ display: 'none' }} key={key} onChange={(e) => handleFile(e)} />
                <img src={preview ? preview : "https://icons.veryicon.com/png/System/Flatastic%208/Open%20folder%20search.png"} alt="no image" width={'100%'} />
              </label>
            </Col>
            <Col sm={12} md={6}>
              <form className="p-3">
                <div className="mb-3">
                  <input type="text" placeholder='title' value={projectDetails.title} className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='language' value={projectDetails.language} className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='github' value={projectDetails.github} className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='website' value={projectDetails.website} className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
                </div>
                <div className="mb-3">
                  <textarea placeholder="overview" rows={4} value={projectDetails.overview} className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}></textarea>
                </div>
              </form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" type='button' onClick={handleReset} > Cancel </Button>
          <Button variant="success" type='button' onClick={handleAdd} > Add </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>
  )
}

export default AddProject