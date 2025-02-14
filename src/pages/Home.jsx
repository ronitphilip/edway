import React, { useEffect, useState } from 'react'
import '../App.css'
import Hero from '../components/Hero'
import { Link } from 'react-router-dom'
import SecModel from '../models/SecModel'
import Footer from '../components/Footer'
import { addViewsAPI, getSuccessTestimonialsAPI } from '../api/allAPI'
import ImageSlider from '../components/ImageSlider'

const Home = () => {
  
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    addViews()
    fetchTestimonials()
  }, [])

  const addViews = async () => {
    try {
      const result = await addViewsAPI()      
    } catch (err) {
      console.log(err);
    }
  }

  const fetchTestimonials = async () => {
    try {
      const result = await getSuccessTestimonialsAPI()

      if (result.status === 200) {
        setTestimonials(result.data)
      } else {
        console.log(result)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='home'>
      <Hero />
      {/* Successful section */}
      <div className='mt-3 ed-height d-flex flex-column justify-content-center align-items-center'>
        <h3 className="text-center ">Your pathway to a</h3>
        <h1 className="text-center "><span className='text-gradient'>Successful</span> Career</h1>
        <ImageSlider/>
        <p className=' text-center'>
          Unlock a world of opportunities by exploring the best colleges and courses tailored to your aspirations. <br />
          Discover your ideal place to grow, learn, and achieve your dreams with ease! <Link to={'/courses'}>Learn more</Link>
        </p>
      </div>

      {/* earth section */}
      <div style={{ height: '100vh' }} className='row'>

        <div className="col-lg-6 p-0">
          <SecModel />
        </div>
        <div className="col-lg-6 d-flex flex-column justify-content-center">

          <div className="row">

            <div className='col-lg-6'>
              <span className='text-gradient main-heading'>STUDY</span>
            </div>

            <div className="col-lg-6 py-5">
              <h4 className='fst-italic mb-0 ms-5'>what you like</h4> <br />
              <h4 className='fst-italic mt-0 ms-5'>where you like</h4>

            </div>
          </div>
          <div className="row">
            <p className='pe-5'>Study abroad with us and discover a world of opportunities. We offer a wide range of courses and programs that cater to your interests and career goals. <Link to={'/courses'}>Learn more</Link></p>
          </div>

        </div>
      </div>

      {/* testimonials */}
      <div className='container mb-5'>
        <h1 className="text-center"><span className='text-gradient'>Success </span>Stories</h1>
        <div className='testi mt-5'>
          <div className='marque-parent'>

            {
              testimonials?.length > 0 && testimonials?.map((testimonial, index) => (
                <div key={index} className="marqee-card rounded d-flex flex-column p-3">
                  <div className="d-flex align-items-center">
                    <h3 style={{height:'50px', width:'50px'}} className='border rounded-circle d-flex align-items-center justify-content-center bg-light text-dark'>
                      {testimonial?.userId?.username.charAt(0).toUpperCase()}
                    </h3>
                    <span className='fw-semibold ms-2'>{testimonial?.userId?.username}</span>
                  </div>
                  <p className='mt-2 mb-0'>{testimonial?.message}</p>
                </div>
              ))
            }

          </div>
        </div>
      </div>

      {/* footer */}
      <Footer />

    </div>
  )
}

export default Home