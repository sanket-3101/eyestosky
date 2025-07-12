import React from 'react';

interface ChartSkeletonProps {
  fullWidth?: boolean;
}

const ChartSkeleton: React.FC<ChartSkeletonProps> = ({ fullWidth = false }) => (
  <div className={fullWidth ? "col-md-12 mb-4" : "col-md-6 mb-4"}>
    <div className="p-3 bg-white rounded shadow-sm">
      <div className="skeleton-title mb-3" style={{ height: '24px', width: '60%' }}></div>
      <div className="skeleton-chart" style={{ height: '300px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ChartSkeleton; 