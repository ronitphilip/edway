import React, { useState } from 'react';
import StudentModel from '../models/StudentModel';
import '../App.css';
import Header from './Header';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleAnimation = () => {
        setIsActive(true);
        const timer = setTimeout(() => {
            setIsActive(false);
        }, 1450);

        return () => clearTimeout(timer);
    };

    const handlePageClick = (e) => {
        if (!e.target.closest('.navbar')) {
            toggleAnimation();
        }
    };

    return (
        <div className="hero-bg" onClick={handlePageClick}>
            <Header />
            {/* Student Model */}
            <div className="student-model">
                <StudentModel isActive={isActive} />
            </div>
            {/* Circles */}
            <div className="circle circle-container">
                <div className="circle last-final">
                    <div className="circle final-circle">
                        <div className="circle outer-circle">
                            <div className="circle middle-circle">
                                <div className="circle inner-circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Hero Section */}
            <div className="hero-head row">
                <div className="col-lg-7 d-flex flex-column justify-content-center ps-5">
                    <span className="main-sub-heading heading">UNLOCK YOUR FUTURE</span>
                    <span className="main-heading heading">
                        WITH <span className="text-gradient heading">EDWAY</span>
                    </span>
                    <p>
                        Struggling to find the perfect college? Let us help you discover the ideal college and <br /> 
                        course for your future.
                    </p>
                    <div className="btn-hello">
                        <Link to="/courses" className="btn btn-primary me-3">
                            Colleges <i className="fa-solid fa-arrow-right"></i>    
                        </Link>
                        <button className="btn btn-light" onClick={(e) => {
                            e.stopPropagation(); 
                            toggleAnimation();
                        }}>
                            Hello 👋
                        </button>
                    </div>
                </div>
                <div className="col-lg-5"></div>
            </div>
        </div>
    );
};

export default Hero;
