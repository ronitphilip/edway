import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

const UserChart = ({ edUsers, edViews, isDashboard }) => {
    const [totalViews, setTotalViews] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        setTotalUsers(edUsers.length);

        const totalViewsCount = edViews.reduce((sum, view) => sum + view.count, 0);
        setTotalViews(totalViewsCount);
    }, [edUsers, edViews]);

    const generateDateRange = (startDate, endDate) => {
        const dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(currentDate.toLocaleDateString());
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
    const today = new Date();
    const allDates = generateDateRange(firstDayOfYear, today);

    const processUserData = (users) => {
        const userCountByDate = {};

        allDates.forEach(date => (userCountByDate[date] = 0));

        users.forEach(user => {
            const date = new Date(user.createdAt).toLocaleDateString();
            if (userCountByDate[date] !== undefined) {
                userCountByDate[date] += 1;
            }
        });

        return Object.keys(userCountByDate).map(date => ({
            date,
            value: userCountByDate[date]
        }));
    };

    const processViewData = (views) => {
        const viewCountByDate = {};

        allDates.forEach(date => (viewCountByDate[date] = 0));

        views.forEach(view => {
            const date = new Date(view.date).toLocaleDateString();
            if (viewCountByDate[date] !== undefined) {
                viewCountByDate[date] += view.count;
            }
        });

        return Object.keys(viewCountByDate).map(date => ({
            date,
            value: viewCountByDate[date]
        }));
    };

    const userData = processUserData(edUsers);
    const viewData = processViewData(edViews);

    const data = {
        labels: allDates,
        datasets: [
            {
                label: "Users",
                data: userData.map(entry => entry.value),
                fill: true,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                tension: 0.4
            },
            {
                label: "Website Visits",
                data: viewData.map(entry => entry.value),
                fill: true,
                backgroundColor: "rgba(255,99,132,0.4)",
                borderColor: "rgba(255,99,132,1)",
                tension: 0.4
            }
        ]
    };

    const options = {
        name: 'pointStyle: false',
        responsive: true,
        plugins: {
            legend: { display: true },
            tooltip: { enabled: true },
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
                <p>User Growth & Website Views</p>
                {
                    isDashboard && (
                        <div>
                            Users:<span className="mx-2" style={{ color: 'rgba(75,192,192,1)' }}>{totalUsers}</span>
                            Views:<span className="mx-2" style={{ color: 'rgba(255,99,132,1)' }}>{totalViews}</span>
                        </div>
                    )
                }
            </div>

            <Line data={data} options={options} />

        </div>
    );
};

export default UserChart;