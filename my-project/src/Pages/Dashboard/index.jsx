import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Welcome Back!</h3>
          <p className="text-gray-600">You have successfully logged in.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;