import React, { useContext } from 'react'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editprojectApi } from '../services/allApi';
import { editResponseContext } from '../context/DataShare';




function EditProject({ project }) {
  const [show, setShow] = useState(false);

  const [projectDetails, setProjectDetails] = useState({
    id: project?._id,
    title: project?.title,
    language: project?.language,
    github: project?.github,
    website: project?.website,
    overview: project?.overview,
    projImage: ""
  })

  const [preview, setPreview] = useState("")

  const {setEditResponse} = useContext(editResponseContext)

  const [key, setKey] = useState(0)

  const handleClose = () => {
    setShow(false);
    handleReset()
  }
  const handleShow = () => setShow(true);

  // console.log(projectDetails);

  const handleFileUpload = (e) => {
    e.preventDefault()
    setProjectDetails({ ...projectDetails, projImage: e.target.files[0] })
  }

  useEffect(() => {
    if (projectDetails.projImage) {
      //createObjectURL - method used to convert files into url
      setPreview(URL.createObjectURL(projectDetails.projImage));
    }
  }, [projectDetails.projImage])

  const handleReset = () => {
    setProjectDetails({
      id: project?._id,
      title: project?.title,
      language: project?.language,
      github: project?.github,
      website: project?.website,
      overview: project?.overview,
      projImage: ""
    })
    setPreview("")
    if (key == 0) {
      setKey(1)
    }
    else {
      setKey(0)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const { id, title, language, github, website, overview } = projectDetails
    if (!title || !language || !github || !website || !overview) {
      toast.info("please fill the form completely")
    }
    else {
      const reqBody = new FormData()

      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      preview ? reqBody.append("projImage", projImage) : reqBody.append("projImage", project.projImage)

      const token = sessionStorage.getItem("token")

      if (preview) {  /* if there is new image uploaded */
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await editprojectApi(id, reqBody, reqHeader)
        console.log(result);
        if(result.status == 200){
          toast.success('project updated successfully')
          handleClose()
          setEditResponse(result.data)
        }
        else{
          toast.error('something went wrong')
        }

      }
      else {  /* no new image uploaded */
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await editprojectApi(id, reqBody, reqHeader)
        console.log(result);
        if(result.status == 200){
          toast.success('project updated successfully')
          handleClose()
          setEditResponse(result.data)
        }
        else{
          toast.error('somethin went wrong')
        }

      }
    }
  }

  return (
    <>
      <FontAwesomeIcon className='text-info fa-lg' icon={faPenToSquare} onClick={handleShow} />
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <label htmlFor="projImg">
                <input id='projImg' type="file" style={{ display: 'none' }} key={key} onChange={(e) => handleFileUpload(e)} />
                <img src={preview ? preview : `${serverUrl}/uploads/${project.projImage}`} alt="no image" width={'100%'} />
              </label>
            </Col>
            <Col sm={12} md={6}>
              <form className="p-3">
                <div className="mb-3">
                  <input type="text" placeholder='title' className='form-control' value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='language' className='form-control' value={projectDetails.language} onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='github' className='form-control' value={projectDetails.github} onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='website' className='form-control' value={projectDetails.website} onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
                </div>
                <div className="mb-3">
                  <textarea placeholder="overview" rows={4} className='form-control' value={projectDetails.overview} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} ></textarea>
                </div>
              </form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleReset}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>
  )
}

export default EditProject