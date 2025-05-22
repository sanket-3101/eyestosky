import React from 'react';
import './Dashboard.css';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const cards = [
  { title: 'Users', count: 1200 },
  { title: 'Approved Posts', count: 875 },
  { title: 'Pending Posts', count: 132 },
  { title: 'Active Hashtags', count: 58 },
  { title: 'Inactive Hashtags', count: 17 },
];

// Dummy Bar Chart Data
const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'New Users',
      data: [150, 200, 180, 220, 300],
      backgroundColor: '#06c',
    },
  ],
};

// Dummy Pie Chart Data
const pieData = {
  labels: ['Approved', 'Pending', 'Rejected'],
  datasets: [
    {
      data: [875, 132, 50],
      backgroundColor: ['#06c', '#ffc107', '#dc3545'],
    },
  ],
};

export default function Dashboard() {
  return (
    <section className="card">
      <div className="card-body">
        <h2 className="mb-4" style={{ color: '#04105a' }}>Dashboard Overview</h2>
        
        <div className="row">
          {cards.map((card, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="custom-card text-white p-4 rounded shadow-sm">
                <h5>{card.title}</h5>
                <h2 className="fw-bold">{card.count}</h2>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col-md-6 mb-4">
            <div className="p-3 bg-white rounded shadow-sm">
              <h5 className="mb-3">User Growth</h5>
              <Bar data={barData} />
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="p-3 bg-white rounded shadow-sm">
              <h5 className="mb-3">Post Status Distribution</h5>
              <Pie data={pieData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
