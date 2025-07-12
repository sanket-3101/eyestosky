import React from 'react';

const CardSkeleton: React.FC = () => (
  <div className="col-md-6 col-lg-4 mb-4">
    <div className="custom-card text-white p-4 rounded shadow-sm skeleton-card">
      <div className="skeleton-title"></div>
      <div className="skeleton-count"></div>
    </div>
  </div>
);

export default CardSkeleton; 