import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Title
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

interface StatsProps {
  statsData: StatsData;
}

type StatsData = {
  hostStats: [
    {
      listingRange: string;
      count: number;
    }
  ],
  roomTypeStats: [
    {
      roomType: string;
      count: number;
    }
  ],
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Title
);

function StatsSidebar({ statsData }: StatsProps) {
  const listingRanges = statsData?.hostStats?.map((stat) => stat.listingRange);
  const listingCounts = statsData?.hostStats?.map((stat) => stat.count);
  const roomTypes = statsData?.roomTypeStats?.map((stat) => stat.roomType);
  const roomTypeCounts = statsData?.roomTypeStats?.map((stat) => stat.count);

  const hostStatsData = {
    labels: listingRanges,
    datasets: [
      {
        data: listingCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 205, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 205, 86, 1)',
        ],
        borderWidth: 1.5,
      },
    ],
  };

  const hostStatsOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Number of Listings by hosts'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hosts',
          font: {
            weight: 'bold',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Listings',
          font: {
            weight: 'bold',
          },
        },
      },
    },
  };

  const roomTypeStatsData = {
    labels: roomTypes,
    datasets: [
      {
        data: roomTypeCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 205, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 205, 86, 1)',
        ],
        borderWidth: 1.5
      },
    ],
  };

  const roomTypeStatsOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Room types'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Room types',
          font: {
            weight: 'bold',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Listings',
          font: {
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-xl font-bold mb-4">Statistics</h2>
      {/* @ts-ignore-next-line */}
      <Doughnut data={hostStatsData} options={hostStatsOptions} />
      {/* @ts-ignore-next-line */}
      <Doughnut data={roomTypeStatsData} options={roomTypeStatsOptions} />
    </div>
  )
}

export default StatsSidebar;
