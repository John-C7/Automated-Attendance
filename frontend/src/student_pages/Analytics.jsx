import React, { useEffect, useState } from 'react';
import './View.css';
const Analytics = () => {
    const [chartInstances, setChartInstances] = useState([]);

    useEffect(() => {
        generateMockData();
    }, []);

    const generateMockData = () => {
        // Generate mock data
        const mockData = [
            { SUBJECT_ID: 'Subject 1', count: Math.floor(Math.random() * 10) },
            { SUBJECT_ID: 'Subject 2', count: Math.floor(Math.random() * 10) },
            { SUBJECT_ID: 'Subject 3', count: Math.floor(Math.random() * 10) },
        ];

        // Render charts
        const charts = mockData.map((item, index) => (
            <div key={index} className="chart-container">
                <h3>{item.SUBJECT_ID}</h3>
                <div className="pie-chart">
                    <div
                        className="slice"
                        style={{
                            transform: `rotate(${(item.count / 10) * 360}deg)`,
                            backgroundColor: 'blue',
                        }}
                    ></div>
                    <div
                        className="slice"
                        style={{
                            transform: `rotate(${((10 - item.count) / 10) * 360}deg)`,
                            backgroundColor: 'red',
                        }}
                    ></div>
                </div>
            </div>
        ));

        setChartInstances(charts);
    };

    return (
        <div className="chart-wrapper">
            {chartInstances}
        </div>
    );
};

export default Analytics;
