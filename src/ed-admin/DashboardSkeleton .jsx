import React from 'react'

const DashboardSkeleton = () => {
    return (
        <>
            <div style={{height:'100vh', overflow:'hidden'}} className="row">

                <div className="col-lg-3">
                    <div style={{backgroundColor: '#292828'}} className="sidebar">
                        
                    </div>
                </div>

                <div style={{ minHeight: '100vh', width: '1150px' }} className="col-lg-9 px-3">
                    {/* nav bar */}
                    <nav className='d-flex align-items-center justify-content-between pt-3'>
                        <div className='rounded' style={{ backgroundColor: '#292828', width: '180px', height: '15px' }}></div>
                        <div className='d-flex align-items-center me-3'>
                            <div className='rounded-circle ' style={{ position: 'absolute', backgroundColor: '#292828', width: '20px', height: '20px', top: '25px', right: '140px' }}></div>
                            <div className='rounded' style={{ position: 'absolute', width: '90px', height: '20px', top: '25px', right: '40px', backgroundColor: '#292828' }}></div>
                            <button className='btn ps-1 admin-toggle-btn'><i className="fa-solid fa-user-tie pe-2 ps-2"></i>Admin name</button>
                        </div>
                    </nav>
                    <div className='display-none'>
                    </div>

                    <div className='rounded' style={{ width: '225px', height: '35px', backgroundColor: '#292828' }}></div>
                    {/* body */}
                    <div className='mt-4 dashboard-body row'>
                        <div style={{ height: '790px' }} className="col-lg-6 p-0 pe-2">
                            <div style={{ height: '350px' }} className="border-dark widget">
                            </div>
                            <div style={{ height: '395px' }} className="border-dark widget mt-4">
                            </div>
                        </div>
                        <div className="col-lg-6 p-0 ps-2">
                            <div style={{ height: '350px' }} className="border-dark widget">
                            </div>
                            <div style={{ height: '185px' }} className="mt-4">
                                <div style={{ height: '185px' }} className="row m-0 gap-3">
                                    <div style={{ width: '268px' }} className="col-lg-6 border-dark widget"></div>
                                    <div style={{ width: '268px' }} className="col-lg-6 border-dark widget"></div>
                                </div>
                            </div>
                            <div style={{ height: '185px' }} className="border-dark widget mt-4"></div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DashboardSkeleton 