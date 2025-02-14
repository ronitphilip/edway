import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../App.css'
import { createEnquiryAPI } from '../api/allAPI'

const Contact = () => {
  
  const [ student, setStudent ] = useState({
    name: '',
    mobileNumber: '',
    locality: '',
    highestQualification: '',
    preferredCollege: '',
    preferredCourse: ''
  })  

  const createEnquiry = async (e) => {
    e.preventDefault();

    if(!student.name || !student.mobileNumber || !student.locality || !student.highestQualification )
      return alert('Please fill all the fields')

    try {
      const result = await createEnquiryAPI(student)
      setStudent({
        name: '',
        mobileNumber: '',
        locality: '',
        highestQualification: '',
        preferredCollege: '',
        preferredCourse: ''
      })
      if(result.status == 200){
        alert('Enquiry created successfully')
      }else if(result.status == 400){
        alert(result.response.data)
      }else{
        alert('Something went wrong! Try again later.')
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header/>
      <div className='container'>
        <h1 className='text-center pt-2'>Connect with our team</h1>
        <div className='px-5 mx-5'>
          <p className="text-center px-5">
            Our team is here to help with college selection, admissions, or course guidance worldwide. Fill out the form below, and we'll get back to you promptly to support your journey.
          </p>
        </div>
        <div className="row">
          <div className="col-lg-6 px-5">
            <div className='border mx-5 my-4 form-bg'>
              <div className='d-flex flex-column align-items-center justify-content-center mt-4'>
                <span className='fs-3'>Get in touch with us</span>
              </div>
              <form onSubmit={(e)=>createEnquiry(e)} className='d-flex flex-column align-items-center justify-content-center'>
                <input value={student.name} onChange={(e)=>setStudent({...student, name:e.target.value})} type="text" className='form-box' placeholder='*Name'/>
                <input value={student.mobileNumber} onChange={(e)=>setStudent({...student, mobileNumber:e.target.value})} type="text" className='form-box' placeholder='*Mobile'/>
                <input value={student.locality} onChange={(e)=>setStudent({...student, locality:e.target.value})} type="text" className='form-box' placeholder='*Locality (Kochi, Ernakulam)'/>
                <input value={student.highestQualification} onChange={(e)=>setStudent({...student, highestQualification:e.target.value})} type="text" className='form-box' placeholder='*Qualification (+2, commerce)'/>
                <input value={student.preferredCollege} onChange={(e)=>setStudent({...student, preferredCollege:e.target.value})} type="text" className='form-box' placeholder='Preffered college'/>
                <input value={student.preferredCourse} onChange={(e)=>setStudent({...student, preferredCourse:e.target.value})} type="text" className='form-box' placeholder='Preffered course'/>
                <button type='submit' className='submit-btn my-3'>Submit</button>
              </form>
            </div>
          </div>
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h2>Contact Details</h2>
            <p>Reach out to us for more information or to schedule a consultation.</p>

            <div className="row gap-3 mt-3">
              <div className="col border rounded d-flex flex-column p-3 details-div">
                <div className='d-flex'>
                  <i className="fa-solid fa-location-dot fs-4"></i>
                  <h4 className='ms-2'>Address</h4>
                </div>
                <div>
                  <p className='m-0'>Random street, Random city</p>
                  <p className='m-0'>Random state, 000 000</p>
                </div>
              </div>
              <div className="col border rounded d-flex flex-column p-3 details-div">
                <div className='d-flex'>
                  <i className="fa-solid fa-phone fs-4"></i>
                  <h4 className='ms-2'>Mobile</h4>
                </div>
                <div>
                  <p className='m-0'>+91 000 0000 000</p>
                  <p className='m-0'>+00 123 4567 890</p>
                </div>
              </div>
            </div>

            <div className="row gap-3 mt-3">
              <div className="col border rounded d-flex flex-column p-3 details-div">
                <div className='d-flex'>
                  <i className="fa-regular fa-calendar-xmark fs-4"></i>
                  <h4 className='ms-2'>Availablitiy</h4>
                </div>
                <div>
                  <p className='m-0'>Mon to Sat: 9:00 AM - 6:00 PM</p>
                  <p className='m-0'>Sat & Sun : Closed</p>
                </div>
              </div>
              <div className="col border rounded d-flex flex-column p-3 details-div">
                <div className='d-flex'>
                  <i className="fa-solid fa-envelope fs-4"></i>
                  <h4 className='ms-2'>Email</h4>
                </div>
                <div>
                  <p className='m-0'>careers.edway@gmail.com</p>
                  <p className='m-0'>help.edway@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Contact