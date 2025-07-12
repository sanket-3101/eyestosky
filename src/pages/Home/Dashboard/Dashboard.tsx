import { useEffect, useState } from 'react';
import './Dashboard.css';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Title as ChartTitle,
} from 'chart.js';
import axios from 'axios';
import { apiConstants } from '../../../constant/constant';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/reduxHook';
import { Title, ChartContainer, ChartSkeleton, CardSkeleton } from '../../../component';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  ArcElement, 
  Tooltip, 
  Legend,
  PointElement,
  LineElement,
  ChartTitle
);
  


export default function Dashboard() {
  const [cards, setCards] = useState<{ title: string; count: number; onClick: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<{
    monthlyUsers: any;
    genderStats: any;
    ageRangeStats: any;
    ufoWitnessedStats: any;
    beliefChoiceStats: any;
  }>({
    monthlyUsers: null,
    genderStats: null,
    ageRangeStats: null,
    ufoWitnessedStats: null,
    beliefChoiceStats: null
  });
  const navigate = useNavigate(); 
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    getDetails();
  }, [dispatch]);

  const getDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiConstants.baseUrl + apiConstants.dashboard());
      console.log(response.data);
      const { data } = response;
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

        // Process chart data
        if (data.monthly_users) {
          const monthlyData = {
            labels: data.monthly_users.map((item: any) => `${item.month}/${item.year}`),
            datasets: [{
              label: 'Monthly Users',
              data: data.monthly_users.map((item: any) => item.count),
              backgroundColor: '#06c',
              borderColor: '#06c',
              tension: 0.1
            }]
          };
          setChartData(prev => ({ ...prev, monthlyUsers: monthlyData }));
        }

        if (data.gender_stats) {
          const genderData = {
            labels: data.gender_stats.map((item: any) => item.type || 'Not Specified'),
            datasets: [{
              data: data.gender_stats.map((item: any) => item.count),
              backgroundColor: ['#06c', '#ff6b6b', '#4ecdc4', '#45b7d1'],
            }]
          };
          setChartData(prev => ({ ...prev, genderStats: genderData }));
        }

        if (data.age_range_stats) {
          const ageData = {
            labels: data.age_range_stats.map((item: any) => item.type || 'Not Specified'),
            datasets: [{
              data: data.age_range_stats.map((item: any) => item.count),
              backgroundColor: ['#06c', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'],
            }]
          };
          setChartData(prev => ({ ...prev, ageRangeStats: ageData }));
        }

        if (data.ufo_witnessed_stats) {
          const ufoData = {
            labels: data.ufo_witnessed_stats.map((item: any) => item.type || 'Not Specified'),
            datasets: [{
              data: data.ufo_witnessed_stats.map((item: any) => item.count),
              backgroundColor: ['#06c', '#ff6b6b', '#4ecdc4'],
            }]
          };
          setChartData(prev => ({ ...prev, ufoWitnessedStats: ufoData }));
        }

        if (data.belief_choice_stats) {
          const beliefData = {
            labels: data.belief_choice_stats.map((item: any) => 
              item.type ? (item.type.length > 20 ? item.type.substring(0, 20) + '...' : item.type) : 'Not Specified'
            ),
            datasets: [{
              data: data.belief_choice_stats.map((item: any) => item.count),
              backgroundColor: ['#06c', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'],
            }]
          };
          setChartData(prev => ({ ...prev, beliefChoiceStats: beliefData }));
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <div className="card-body">
        <Title title="Dashboard Overview" />

        <div className="row">
          {loading ? (
            // Show skeleton loading
            Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : (
            // Show actual cards
            cards.map((card, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4" onClick={() => navigate(card.onClick)}>
                <div className="custom-card text-white p-4 rounded shadow-sm">
                  <h5>{card.title}</h5>
                  <h2 className="fw-bold">{card.count}</h2>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="row mt-5">
          {loading ? (
            // Show skeleton loading for charts
            <>
              <ChartSkeleton />
              <ChartSkeleton />
              <ChartSkeleton />
              <ChartSkeleton />
              <ChartSkeleton fullWidth />
            </>
          ) : (
            // Show actual charts
            <>
              {/* Monthly Users Chart */}
              {chartData.monthlyUsers && (
                <ChartContainer title="Monthly User Growth">
                  <Line 
                    data={chartData.monthlyUsers}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top' as const,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </ChartContainer>
              )}

              {/* Gender Distribution */}
              {chartData.genderStats && (
                <ChartContainer title="Gender Distribution">
                  <Doughnut 
                    data={chartData.genderStats}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom' as const,
                        },
                      },
                    }}
                  />
                </ChartContainer>
              )}

              {/* Age Range Distribution */}
              {chartData.ageRangeStats && (
                <ChartContainer title="Age Range Distribution">
                  <Pie 
                    data={chartData.ageRangeStats}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom' as const,
                        },
                      },
                    }}
                  />
                </ChartContainer>
              )}

              {/* UFO Witnessed Stats */}
              {chartData.ufoWitnessedStats && (
                <ChartContainer title="UFO Witnessed Statistics">
                  <Bar 
                    data={chartData.ufoWitnessedStats}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </ChartContainer>
              )}

              {/* Belief Choice Stats */}
              {chartData.beliefChoiceStats && (
                <ChartContainer title="Belief Choice Distribution" fullWidth>
                  <Bar 
                    data={chartData.beliefChoiceStats}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </ChartContainer>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
