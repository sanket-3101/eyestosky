import React from 'react';
import './Dashboard.css'; // We'll add custom CSS here

const kpis = [
  { title: 'Total Users', value: '12,340', icon: 'bi-people', bg: 'primary' },
  { title: 'Active Users', value: '9,876', icon: 'bi-person-check', bg: 'success' },
  { title: 'Total Revenue', value: '$58,400', icon: 'bi-cash-stack', bg: 'warning' },
  { title: 'New Signups', value: '1,230', icon: 'bi-person-plus', bg: 'info' },
];

const Dashboard = () => {
  return (
    <div className="container my-4">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        {kpis.map((kpi, index) => (
          <div className="col-md-6 col-lg-3 mb-4" key={index}>
            <div className={`card text-white bg-${kpi.bg} kpi-card`}>
              <div className="card-body d-flex align-items-center">
                <i className={`bi ${kpi.icon} fs-1 me-3`}></i>
                <div>
                  <h6 className="card-subtitle mb-1">{kpi.title}</h6>
                  <h4 className="card-title mb-0">{kpi.value}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
