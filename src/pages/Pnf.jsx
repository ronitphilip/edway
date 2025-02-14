import React from 'react'
import { Link } from 'react-router-dom'

const Pnf = () => {
  return (
    <div className='ed-height d-flex flex-column align-items-center justify-content-center'>
      <div className='text-center mb-0 main-heading'>404</div>
      <h1 className='text-center'>Page Not Found!</h1>
      <Link to={'/'}>Back to home</Link>
    </div>
  )
}

export default Pnf