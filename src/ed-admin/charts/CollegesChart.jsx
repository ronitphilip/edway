import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CollegesChart = ({ edCourses }) => {    
    const [collegeData, setCollegeData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [stateLabels, setStateLabels] = useState([]);
    const [totalColleges, setTotalColleges] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const chartRef = useRef(null);

    useEffect(() => {
        setTotalColleges(edCourses?.length);

        if (edCourses && edCourses?.length > 0) {
            const collegeCountByLoc = {};
            const courseCountByLoc = {};
            const uniqueCourses = new Set();

            edCourses.forEach(college => {
                const state = college?.collegeId?.location[0]?.state;

                college?.courses.forEach(course => {
                    uniqueCourses.add(course?.coursename);
                });

                collegeCountByLoc[state] = (collegeCountByLoc[state] || 0) + 1;
                courseCountByLoc[state] = (courseCountByLoc[state] || 0) + college.courses.length;
            });

            setTotalCourses(uniqueCourses.size);

            const sortedLocations = Object.keys(collegeCountByLoc)
                .map(state => ({
                    state,
                    collegeCount: collegeCountByLoc[state],
                    courseCount: courseCountByLoc[state],
                    total: collegeCountByLoc[state] + courseCountByLoc[state]
                }))
                .sort((a, b) => b.total - a.total);

            const topLocations = sortedLocations.slice(0, 4);

            setStateLabels(topLocations.map(loc => loc.state));
            setCollegeData(topLocations.map(loc => loc.collegeCount));
            setCourseData(topLocations.map(loc => loc.courseCount));
        }
    }, [edCourses]);

    const getGradient = (ctx, colorStart, colorEnd) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(1, colorEnd);
        return gradient;
    };

    const data = {
        labels: stateLabels,
        datasets: [
            {
                label: "Colleges",
                data: collegeData,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const ctx = chart.ctx;
                    return getGradient(ctx, "#F2D50F", "#DA0641");
                }
            },
            {
                label: "Courses",
                data: courseData,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const ctx = chart.ctx;
                    return getGradient(ctx, "#FF57B9", "#A704FD");
                }
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true },
            tooltip: { enabled: true }
        },
        scales: {
            x: {
                ticks: { autoSkip: true, maxTicksLimit: 5 }
            },
            y: {
                title: { display: true, text: "Count" },
                beginAtZero: true
            }
        }
    };

    return (
        <div className="chart-container">
            <div className="d-flex justify-content-between">
                <p>Colleges & Courses</p>
                <div>
                    Colleges:<span className="mx-2" style={{ color: 'rgba(242, 213, 15, 1)' }}>{totalColleges}</span>
                    Courses:<span className="mx-2" style={{ color: 'rgba(255, 87, 185, 1)' }}>{totalCourses}</span>
                </div>
            </div>
            <Bar ref={chartRef} data={data} options={options} />
        </div>
    );
};

export default CollegesChart;
