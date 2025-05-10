import React from 'react';
import './Dashboard.css';

const cards = [
  { title: 'Users', count: 1200 },
  { title: 'Approved Posts', count: 875 },
  { title: 'Pending Posts', count: 132 },
  { title: 'Active Hashtags', count: 58 },
  { title: 'Inactive Hashtags', count: 17 }
];

export default function Dashboard() {
  return (
    <div className="container my-5">
      <h2 className="mb-4" style={{color: '#04105a'}}>Dashboard Overview</h2>
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
    </div>
  );
}
