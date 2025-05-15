import React from 'react';
import UserCard from '../components/Dashboard/UserCard';
import EmotionChart from '../components/Dashboard/EmotionChart';
import '../styles/Dashboard.css'; 

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <UserCard />
      <EmotionChart />
    </div>
  );
};

export default Dashboard;