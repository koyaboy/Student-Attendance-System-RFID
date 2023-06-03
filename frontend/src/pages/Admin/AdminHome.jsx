import React from "react";
import Activity from "../../components/Admin/Activity"
import ComplaintsChart from "../../components/Admin/ComplaintsChart"

import "../../styles/Admin/AdminHome.css"

export default function AdminHome() {
    return (
        <div>
            <div className="recent-activities">
                <Activity />
            </div>

            <div className="complaints-chart">
                <ComplaintsChart />
            </div>

        </div>
    )
}