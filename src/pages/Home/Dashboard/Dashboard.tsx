import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { apiConstants } from '../../../constant/constant';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);


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
  const [cards, setCards] = useState<{ title: string; count: number; onClick: string }[]>([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    await axios
      .get(apiConstants.baseUrl + apiConstants.dashboard())
      .then((response) => {
        console.log(response.data)
        const { data } = response
        if (data) {
          const cards = [
            { title: 'Users', count: data.total_users, onClick: '/user-list' },
            { title: 'Approved Posts', count: data.total_approved_post, onClick: '/post-list' },
            { title: 'Pending Posts', count: data.total_pending_post, onClick: '/post-list' },
            { title: 'Rejected Posts', count: data.total_rejected_post, onClick: '/post-list' },
            { title: 'Active Hashtags', count: data.total_active_hashtag, onClick: '/hashtag-list' },
            { title: 'Inactive Hashtags', count: data.total_inactive_hashtag, onClick: '/hashtag-list' },
          ];
          setCards(cards);
        }
      });
  };

  return (
    <section className="card">
      <div className="card-body">
        <h2 className="mb-4" style={{ color: '#04105a' }}>Dashboard Overview</h2>

        <div className="row">
          {cards.map((card, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4" onClick={() => navigate(card.onClick)}>
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
