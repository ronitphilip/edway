import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CommentsChart = ({ edComments }) => {

    if (!edComments || !edComments.Reviews || !edComments.Replies) {
        return <p>Loading...</p>;
    }
    
    const [totalReviews, setTotalReviews] = useState(0);
    const [totalReplies, setTotalReplies] = useState(0);
    const [flaggedComments, setFlaggedComments] = useState(0);

    useEffect(() => {
        if (edComments) {
            const totalReviewsCount = edComments.Reviews.length;
            const totalRepliesCount = edComments.Replies.length;
            const flaggedCount = [
                ...edComments.Reviews,
                ...edComments.Replies
            ].filter(comment => comment.status === "flagged").length;

            setTotalReviews(totalReviewsCount);
            setTotalReplies(totalRepliesCount);
            setFlaggedComments(flaggedCount);
        }
    }, [edComments]);

    const data = {
        datasets: [
            {
                data: [totalReviews, totalReplies, flaggedComments],
                backgroundColor: ["#3B2C93", "#FFC440", "#E2330A"],
                hoverBackgroundColor: ["#3B2C93", "#FFC440", "#E2330A"]
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: { enabled: true }
        }
    };

    return (
        <div className="chart-container">
            <p className="m-2">Comments Overview</p>
            <Doughnut data={data} options={options} />
            <div style={{ position: 'absolute', top: '140px', right: '60px' }}>
                <p><span style={{ color: '#3B2C93', fontWeight:'600' }}>Reviews:</span> {totalReviews}</p>
                <p><span style={{ color: '#FFC440', fontWeight:'600' }}>Replies:</span> {totalReplies}</p>
                <p><span style={{ color: '#E2330A', fontWeight:'600' }}>Flagged:</span> {flaggedComments}</p>
            </div>
        </div>
    );
};

export default CommentsChart;