import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

const DashboardCharts = ({ users, blogs, products }) => {
    /* BAR CHART */
    const barData = {
        labels: ["Users", "Blogs", "Products"],
        datasets: [
            {
                label: "Count",
                data: [users, blogs, products],
                backgroundColor: ["#2563eb", "#16a34a", "#f59e0b"],
            },
        ],
    };

    /* DOUGHNUT CHART */
    const doughnutData = {
        labels: ["Users", "Blogs", "Products"],
        datasets: [
            {
                data: [users, blogs, products],
                backgroundColor: ["#2563eb", "#16a34a", "#f59e0b"],
            },
        ],
    };

    return (
        <div className="charts">
            <div className="chart-card">
                <h4>System Overview</h4>
                <Bar data={barData} />
            </div>

            <div className="chart-card">
                <h4>Distribution</h4>
                <Doughnut data={doughnutData} />
            </div>
        </div>
    );
};

export default DashboardCharts;
