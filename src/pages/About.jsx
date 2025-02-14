import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import book from '../assets/books.jpg'

const About = () => {
  return (
    <>
      <Header/>
      <div>

        <div className='m-3 row about-sec'>
          <div className="col-lg-6 d-flex flex-column justify-content-center ps-5">
            <span className='text-gradient' style={{fontSize:'120px'}}>Edway</span>
            <span style={{fontSize:'120px'}}>Education</span>
          </div>
          <div className="col-lg-6 d-flex flex-column justify-content-end pe-5 pb-5">
            <div style={{height:'400px', width:'400px'}} className='d-flex justify-content-start align-items-center'>
              <img height={'250px'} src={book} alt="no image" />
            </div>
            <p>
              Edway is your gateway to global education, helping students explore and connect with the best colleges and courses worldwide. Whether you're looking for institutions in your home country or abroad, Edway makes finding and securing admissions seamless and straightforward.
            </p>

            <div>
              <button id='enquire-btn'>Enquire</button>
              <label htmlFor="enquire-btn"><i className="fa-solid fa-arrow-right leftarrow ms-2 "></i></label>
            </div>

          </div>
        </div>

        <div className='container'>

          <div className="row mt-5 py-5">
            <span className='about-sub'>About</span>
            <div className="col-lg-6">
              <p>
                Edway was founded in 2023 by a group of passionate educators and technologists who believed that every student deserves access to world-class education, no matter where they are. It started as a small platform connecting students to top colleges in India, but with its growing success and unwavering commitment to excellence, Edway quickly expanded its reach globally. Today, it partners with prestigious institutions across continents, offering a one-stop solution for students to discover, compare, and apply to their dream colleges. Edway’s mission is to break down barriers to education, empowering students to achieve their aspirations on a global stage.
              </p>
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <div className="d-flex flex-row justify-content-evenly">
                <div>
                  <h1 className='about-num'>100+</h1>
                  <span>Students</span>
                </div>
                <div>
                  <h1 className='about-num'>100+</h1>
                  <span>Collages</span>
                </div>
                <div>
                  <h1 className='about-num'>100+</h1>
                  <span>Placements</span>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-5 py-5'>
            <div className="row">
              <div className="col-lg-6">
                <span className='about-sub'>Our Services</span>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus ea blanditiis neque animi ducimus doloribus maxime, sunt, accusamus excepturi earum officiis voluptates velit tempore corrupti praesentium aut modi, nulla ad!
                </p>
              </div>
              <div className="col-lg-6 d-flex align-items-end justify-content-end">
                <div>
                  <button id='enquire-btn'>Services</button>
                  <label htmlFor="enquire-btn"><i className="fa-solid fa-arrow-right leftarrow ms-2 "></i></label>
                </div>
              </div>
            </div>

            <div className="row mt-5 px-5">

              <div className="col-lg-4 p-0 grid-1">

                <div className='border m-2 grd-col d-flex flex-column justify-content-between'>
                  <div>
                    <span className='number'>01</span>
                  </div>
                  <div>
                    <h1>Admissons</h1>
                    <p className='m-0'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam tenetur quaerat maiores temporibus ducimus rem harum, sed quia accusamus facilis ipsa vero cumque et fuga! Dicta hic praesentium mollitia!</p>
                  </div>
                </div>

                <div className='border m-2 grd-col d-flex flex-column justify-content-between'>
                  <div>
                    <span className='number'>03</span>
                  </div>
                  <div className='mt-3'>
                    <h1>Support</h1>
                    <p className='m-0'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam tenetur quaerat maiores temporibus ducimus rem harum!</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 p-0 grid-2">

                <div className='border m-2 grd-col d-flex flex-column justify-content-between'>
                <div>
                    <span className='number'>02</span>
                  </div>
                  <div>
                    <h1>Placements</h1>
                    <p className='m-0'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam tenetur quaerat maiores temporibus ducimus rem harum, sed quia accusamus facilis ipsa vero cumque et fuga! Dicta hic praesentium mollitia!</p>
                  </div>
                </div>

                <div className='grid-3'>

                  <div className='border m-2 grd-col d-flex flex-column justify-content-between'>
                    <div>
                      <span className='number'>04</span>
                    </div>
                    <div>
                      <h1>Seminar</h1>
                      <p className='m-0'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam tenetur quaerat maiores temporibus ducimus rem harum, sed quia accusamus facilis ipsa vero cumque et fuga! Dicta hic praesentium mollitia!</p>
                    </div>
                  </div>

                  <div className='border m-2 grd-col d-flex flex-column justify-content-between'>
                    <div>
                      <span className='number'>05</span>
                    </div>
                    <div>
                      <h1>Abroad</h1>
                      <p className='m-0'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam tenetur quaerat maiores temporibus ducimus rem harum, sed quia accusamus facilis ipsa vero cumque et fuga! Dicta hic praesentium mollitia!</p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            <div className="row my-5 py-5">
              <span className='about-sub'>Any questions?</span>
              <div className="col-lg-6">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eaque suscipit non commodi neque et, nesciunt recusandae sequi ex quos omnis ipsam error distinctio voluptas aperiam harum dicta porro officia?
                  Fuga dolore vitae natus perspiciatis tenetur officia id eligendi doloremque nesciunt soluta laboriosam reiciendis, labore explicabo. Magni, consequuntur. Molestiae quo delectus voluptas laudantium distinctio veritatis molestias tempora doloribus, modi ex!
                </p>
                <div>
                  <button id='enquire-btn'>Contact</button>
                  <label htmlFor="enquire-btn"><i className="fa-solid fa-arrow-right leftarrow ms-2 "></i></label>
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

export default About