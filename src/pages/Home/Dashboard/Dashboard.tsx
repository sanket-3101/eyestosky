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
import { setLoggedIn } from '../../../redux/slice/Auth';


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

  // ✅ Updated: Added countryWiseUser
  const [chartData, setChartData] = useState<{
    monthlyUsers: any;
    genderStats: any;
    ageRangeStats: any;
    ufoWitnessedStats: any;
    beliefChoiceStats: any;
    countryWiseUser: any;
  }>({
    monthlyUsers: null,
    genderStats: null,
    ageRangeStats: null,
    ufoWitnessedStats: null,
    beliefChoiceStats: null,
    countryWiseUser: null,
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

        // Monthly Users
        if (data.monthly_users) {
          setChartData((prev) => ({
            ...prev,
            monthlyUsers: {
              labels: data.monthly_users.map((item: any) => `${item.month}/${item.year}`),
              datasets: [
                {
                  label: 'Monthly Users',
                  data: data.monthly_users.map((item: any) => item.count),
                  backgroundColor: '#06c',
                  borderColor: '#06c',
                  tension: 0.1,
                },
              ],
            },
          }));
        }

        // Gender
        if (data.gender_stats) {
          setChartData((prev) => ({
            ...prev,
            genderStats: {
              labels: data.gender_stats.map((item: any) => item.type || 'Not Specified'),
              datasets: [
                {
                  data: data.gender_stats.map((item: any) => item.count),
                  backgroundColor: ['#06c', '#ff6b6b', '#4ecdc4', '#45b7d1'],
                },
              ],
            },
          }));
        }

        // Age Range
        if (data.age_range_stats) {
          setChartData((prev) => ({
            ...prev,
            ageRangeStats: {
              labels: data.age_range_stats.map((item: any) => item.type || 'Not Specified'),
              datasets: [
                {
                  data: data.age_range_stats.map((item: any) => item.count),
                  backgroundColor: ['#06c', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'],
                },
              ],
            },
          }));
        }

        // UFO Witnessed
        if (data.ufo_witnessed_stats) {
          setChartData((prev) => ({
            ...prev,
            ufoWitnessedStats: {
              labels: data.ufo_witnessed_stats.map((item: any) => item.type || 'Not Specified'),
              datasets: [
                {
                  data: data.ufo_witnessed_stats.map((item: any) => item.count),
                  backgroundColor: ['#06c', '#ff6b6b', '#4ecdc4'],
                },
              ],
            },
          }));
        }

        // Belief Choice
        if (data.belief_choice_stats) {
          setChartData((prev) => ({
            ...prev,
            beliefChoiceStats: {
              labels: data.belief_choice_stats.map((item: any) =>
                item.type?.length > 20 ? item.type.substring(0, 20) + '...' : item.type || 'Not Specified'
              ),
              datasets: [
                {
                  data: data.belief_choice_stats.map((item: any) => item.count),
                  backgroundColor: ['#06c', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'],
                },
              ],
            },
          }));
        }

        // ✅ NEW: Country Wise User
        if (data.country_wise_user) {
          setChartData((prev) => ({
            ...prev,
            countryWiseUser: {
              labels: data.country_wise_user.map((item: any) => item.country),
              datasets: [
                {
                  label: 'Users By Country',
                  data: data.country_wise_user.map((item: any) => item.total_users),
                  backgroundColor: ['#06c', '#ff6b6b', '#4ecdc4', '#45b7d1'],
                },
              ],
            },
          }));
        }
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        localStorage.clear();
        dispatch(setLoggedIn(false));
        navigate("/login", { replace: true });
      }
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
          {loading
            ? Array.from({ length: 6 }).map((_, index) => <CardSkeleton key={index} />)
            : cards.map((card, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4" onClick={() => navigate(card.onClick)}>
                <div className="custom-card text-white p-4 rounded shadow-sm">
                  <h5>{card.title}</h5>
                  <h2 className="fw-bold">{card.count}</h2>
                </div>
              </div>
            ))}
        </div>

        <div className="row mt-5">
          {loading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
              <ChartSkeleton />
              <ChartSkeleton />
              <ChartSkeleton fullWidth />
            </>
          ) : (
            <>
              {/* Monthly Users */}
              {chartData.monthlyUsers && (
                <ChartContainer title="Monthly User Growth">
                  <Line
                    data={chartData.monthlyUsers}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { position: 'top' } },
                      scales: { y: { beginAtZero: true } },
                    }}
                  />
                </ChartContainer>
              )}

              {/* Gender */}
              {chartData.genderStats && (
                <ChartContainer title="Gender Distribution">
                  <Doughnut
                    data={chartData.genderStats}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { position: 'bottom' } },
                    }}
                  />
                </ChartContainer>
              )}

              {/* Age Range */}
              {chartData.ageRangeStats && (
                <ChartContainer title="Age Range Distribution">
                  <Pie
                    data={chartData.ageRangeStats}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { position: 'bottom' } },
                    }}
                  />
                </ChartContainer>
              )}

              {/* UFO Witnessed */}
              {chartData.ufoWitnessedStats && (
                <ChartContainer title="UFO Witnessed Statistics">
                  <Bar
                    data={chartData.ufoWitnessedStats}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: { y: { beginAtZero: true } },
                    }}
                  />
                </ChartContainer>
              )}

              {/* Belief Choice */}
              {chartData.beliefChoiceStats && (
                <ChartContainer title="Belief Choice Distribution" fullWidth>
                  <Bar
                    data={chartData.beliefChoiceStats}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: { y: { beginAtZero: true } },
                    }}
                  />
                </ChartContainer>
              )}

              {/* ✅ NEW: Country Wise User Chart */}
              {chartData.countryWiseUser && (
                <ChartContainer title="Country Wise User Distribution">
                  <Bar
                    data={chartData.countryWiseUser}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: { y: { beginAtZero: true } },
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
