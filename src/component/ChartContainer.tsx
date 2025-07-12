import React from 'react';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ 
  title, 
  children, 
  fullWidth = false 
}) => (
  <div className={fullWidth ? "col-md-12 mb-4" : "col-md-6 mb-4"}>
    <div className="p-3 bg-white rounded shadow-sm">
      <h5 className="mb-3">{title}</h5>
      <div style={{ height: '300px', position: 'relative' }}>
        {children}
      </div>
    </div>
  </div>
);

export default ChartContainer; 