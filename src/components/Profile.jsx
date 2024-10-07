import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editprofileApi } from '../services/allApi';
import { serverUrl } from '../services/serverUrl';



function Profile() {

  const [open, setOpen] = useState(false);
  console.log(open);

  const [userDetails, setuserDetails] = useState({
    username: "",
    email: "",
    password: "",
    github: "",
    linkedin: "",
    profile: ""
  })

  const [existingImage, setExistingImage] = useState("")

  const [preview, setPreview] = useState("")

  const [editStatus,setEditStatus] = useState(false)

  const handleProfileFile = (e)=>{
    e.preventDefault()
    setuserDetails({...userDetails,profile:e.target.files[0]})
  }
  console.log(userDetails);

  useEffect(()=>{
    if(userDetails.profile){
      setPreview(URL.createObjectURL(userDetails.profile))
    }
    else{
      setPreview("")
    }
  },[userDetails.profile])

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setuserDetails({ ...userDetails, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin })
      setExistingImage(user.profile)
    }
    setEditStatus(false)
  }, [editStatus])

  const handleProfileUpdate = async()=>{
    const{username,email,password,github,linkedin,profile}=userDetails
    if(!username || !email || !password || !github || !linkedin){
      toast.info('please fill the input fields')
    }
    else{
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)

      const token = sessionStorage.getItem("token")

      if(preview){
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await editprofileApi(reqBody,reqHeader)
        console.log(result);
        if(result.status == 200){
          toast.success('profile updated successfully')
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
          setEditStatus(true)
        }
        else{
          toast.error('something went wrong')
        }
      }
      else{
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await editprofileApi(reqBody,reqHeader)
        console.log(result);
        if(result.status == 200){
          toast.success('profile updated successfully')
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
          setEditStatus(true)
        }
        else{
          toast.error('something went wrong')
        }
      }
    }
  }


  return (
    <>
      <Card className='shadow rounded border-light ms-5 p-3' style={{ width: '22rem' }} onMouseEnter={() => setOpen(true)}>
        <div className='d-flex justify-content-between mt-3'>
          <Card.Title><h1 className='text-success'>Profile</h1></Card.Title>
          <Button className='text-dark bg-light btn-outline-info' onClick={() => setOpen(!open)} style={{ height: '40px' }}>
            {!open ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleUp} />}</Button>
        </div>
        <Collapse in={open}>
          <div>
            <div className='d-flex align-items-center justify-content-center flex-column w-100'>
              <label htmlFor='profileImg'>
                <input type="file" style={{ display: 'none' }} id='profileImg' onChange={(e)=>handleProfileFile(e)} />
                {existingImage==""?
                  <Card.Img variant="top" src={preview?preview:"https://cengage.my.site.com/resource/1607465003000/loginIcon"} alt='no image' style={{ height: '150px', width: '150px', borderRadius: '50%' }} />
                :
                <Card.Img variant="top" src={preview?preview:`${serverUrl}/uploads/${existingImage}`} alt='no image' style={{ height: '150px', width: '150px', borderRadius: '50%' }} />
                }
              </label>
              <Card.Body className='w-100'>
                <form>
                  <input type="text" placeholder='Github' className='w-100 form-control mt-3' value={userDetails.github} onChange={(e)=>setuserDetails({ ...userDetails, github: e.target.value })} />
                  <input type="text" placeholder='LinkedIn' className='w-100 form-control mt-3' value={userDetails.linkedin} onChange={(e)=>setuserDetails({ ...userDetails, linkedin: e.target.value })} />
                  <Button type='button' variant="success" className='w-100 mt-3' onClick={handleProfileUpdate}>Update</Button>
                </form>
              </Card.Body>
            </div>
          </div>
        </Collapse>
      </Card>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>
  )
}

export default Profile