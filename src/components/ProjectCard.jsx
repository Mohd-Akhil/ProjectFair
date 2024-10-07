import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { serverUrl } from '../services/serverUrl';




function ProjectCard({projects}) {

  /* console.log(projects); */

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  return (
    <>
      <Card style={{ width: '100%' }} className=' shadow mt-4' onClick={handleShow}>
        <Card.Img variant="top" src={`${serverUrl}/uploads/${projects?.projImage}`} width={'100%'} height={'250px'} className='p-2' />
        <Card.Body>
          <Card.Title className='text-center'>{projects?.title}</Card.Title>
        </Card.Body>
      </Card>



      <Modal show={show} onHide={handleClose} size='lg' >
        <Modal.Header closeButton>
          <Modal.Title>{projects?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 mt-3">
              <img src={`${serverUrl}/uploads/${projects?.projImage}`} alt="" width={'100%'} />
            </div>
            <div className="col-md-6 mt-3">
              <h3>Description :</h3>
              <p>{projects?.overview}</p>
              <h3>Technologies :</h3>
              <p>{projects?.language}</p>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-start'>
          <div className=''>
            <Link to={projects?.github} target='_blank' ><FontAwesomeIcon icon={faGithub} className='text-info me-3' size='2xl' /></Link>
            <Link to={projects?.website} target='_blank' ><FontAwesomeIcon icon={faLink} className='text-info' size='2xl' /></Link>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectCard