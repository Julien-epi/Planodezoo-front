import React, { useState, useEffect } from 'react';
import StatisticsService from '@/services/statsService';
import StatisticsTable from '@/components/StatisticsTable';

function StatisticsPage() {
  const [totalStats, setTotalStats] = useState([]);
  const [dailyStats, setDailyStats] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState([]);

  useEffect(() => {
    StatisticsService.getTicketCountBySpace()
      .then(response => {
        setTotalStats(response.data);
      });

    StatisticsService.getDailyTicketCountBySpace()
      .then(response => {
        setDailyStats(response.data);
      });

    StatisticsService.getWeeklyTicketCountBySpace()
      .then(response => {
        setWeeklyStats(response.data);
      });
  }, []);

  return (
    <div className='text-center'>
      <h1>Statistics</h1>
      <h2>Total Ticket Count By Space</h2>
      <StatisticsTable stats={totalStats} />
      <h2>Daily Ticket Count By Space</h2>
      <StatisticsTable stats={dailyStats} />
      <h2>Weekly Ticket Count By Space</h2>
      <StatisticsTable stats={weeklyStats} />
    </div>
  );
}

export default StatisticsPage;
