import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';
import { faFacebook, faInstagram, faLinkedin, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';


function Footer() {
    return (
        <>
            <div className="row mt-5 w-100 p-4 text-light" style={{backgroundColor:'green', margin: 0, padding: 0}}>
                <div className="col-md-1"></div>
                <div className="col-md-3">
                    <div>
                        <h4 className='text-light'><FontAwesomeIcon icon={faVideo} className='me-3' /> Project Fair </h4>
                        <p style={{textAlign:'justify'}} className='mt-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid fuga optio quaerat quia voluptas nihil veritatis expedita, repellat inventore ipsum, eligendi molestiae debitis tempora enim numquam, assumenda atque cum earum.</p>
                    </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-1">
                    <h4>Links</h4>
                    <p className='mt-4'><Link to={'/'} style={{textDecoration:'none',color:'white'}}>Home </Link></p>
                    <p><Link to={'/project'}  style={{textDecoration:'none',color:'white'}}>Project</Link></p>
                    <p><Link to={'/dashboard'}  style={{textDecoration:'none',color:'white'}}>Dashboard</Link></p>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-1">
                    <h4>Guides</h4>
                    <p className='mt-4'>React</p>
                    <p>ReactBootstrap</p>
                    <p>Bootswatch</p>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-3">
                    <h4>Contact Us</h4>
                    <div className='d-flex mt-4'>
                        <input type="text" className='form-control' placeholder='E-mail ID' />
                        <button className='btn btn-warning ms-2'>Subscribe</button>
                    </div>
                    <div className='d-flex mt-4 justify-content-between'>
                    <FontAwesomeIcon icon={faInstagram} size='2xl'/>
                    <FontAwesomeIcon icon={faFacebook} size='2xl' />
                    <FontAwesomeIcon icon={faSquareXTwitter} size='2xl' />
                    <FontAwesomeIcon icon={faLinkedin} size='2xl' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer