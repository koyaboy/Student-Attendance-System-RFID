import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useAuthContext } from "../../hooks/useAuthContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ComplaintsChart() {
    const [chartData, setChartData] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        fetchChartData();
    }, []);

    const fetchChartData = () => {
        axios
            .get("http://localhost:4000/admin/complaintsData", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then((res) => {
                const { completedCount, pendingCount } = res.data;
                setChartData({
                    labels: ["Completed", "Pending"],
                    datasets: [
                        {
                            data: [completedCount, pendingCount],
                            backgroundColor: ["green", "red"],
                        },
                    ],
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || "";
                        const value = context.parsed || 0;
                        return `${label}: ${value}`;
                    },
                },
            },
        },
    };

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Complaints Chart</h2>
            <div style={{ width: "500px", height: "500px" }}>
                {chartData && (
                    <Pie data={chartData} options={chartOptions} />
                )}
            </div>
        </div>
    );
}
