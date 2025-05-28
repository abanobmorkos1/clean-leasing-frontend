import { useState } from "react";
import Card from "../shared/Card";
import Chart from "../shared/Chart";
import { deliveries, cars, analytics } from "../../data/mockData";

const SalesAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Mock current salesperson data (Sarah Wilson)
  const currentSalesperson = "Sarah Wilson";
  const myDeliveries = deliveries.filter(
    (d) => d.salesperson === currentSalesperson,
  );
  const myRevenue = myDeliveries.reduce((sum, d) => sum + d.leaseAmount, 0);
  const avgLeaseValue = myRevenue / myDeliveries.length || 0;

  // Performance metrics
  const performanceMetrics = [
    {
      title: "Total Revenue",
      value: `$${myRevenue.toLocaleString()}`,
      icon: "💰",
      variant: "success",
      target: 10000,
      current: myRevenue,
      period: "This Month",
    },
    {
      title: "Deliveries Posted",
      value: myDeliveries.length,
      icon: "📦",
      variant: "stat",
      target: 30,
      current: myDeliveries.length,
      period: "This Month",
    },
    {
      title: "Avg Lease Value",
      value: `$${Math.round(avgLeaseValue)}`,
      icon: "📊",
      variant: "warning",
      target: 400,
      current: avgLeaseValue,
      period: "This Month",
    },
    {
      title: "Completion Rate",
      value: `${Math.round((myDeliveries.filter((d) => d.status === "completed").length / myDeliveries.length) * 100) || 0}%`,
      icon: "✅",
      variant: "default",
      target: 90,
      current:
        (myDeliveries.filter((d) => d.status === "completed").length /
          myDeliveries.length) *
          100 || 0,
      period: "This Month",
    },
  ];

  // Generate performance data for charts
  const weeklyData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    values: [1200, 1800, 1400, 2200], // Mock weekly revenue
  };

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [5200, 6800, 5900, 7500, 6200, 8100],
  };

  const deliveryStatusData = {
    labels: ["Completed", "In Progress", "Pending"],
    values: [
      myDeliveries.filter((d) => d.status === "completed").length,
      myDeliveries.filter((d) => d.status === "in-progress").length,
      myDeliveries.filter((d) => d.status === "pending").length,
    ],
  };

  const carCategoryData = {
    labels: ["Economy", "Mid-Range", "Luxury", "Premium"],
    values: [12, 8, 6, 4], // Mock distribution
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getPerformanceColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return "#4caf50";
    if (percentage >= 75) return "#ff9800";
    return "#f44336";
  };

  // Goals and targets
  const goals = [
    {
      title: "Monthly Revenue Goal",
      current: myRevenue,
      target: 10000,
      unit: "$",
      color: "#4caf50",
    },
    {
      title: "Delivery Target",
      current: myDeliveries.length,
      target: 25,
      unit: "",
      color: "#2196f3",
    },
    {
      title: "Average Lease Value",
      current: avgLeaseValue,
      target: 450,
      unit: "$",
      color: "#ff9800",
    },
  ];

  // Recent achievements
  const achievements = [
    {
      title: "Top Performer",
      description: "Highest revenue this month",
      icon: "🏆",
      date: "This Month",
      type: "gold",
    },
    {
      title: "Delivery Champion",
      description: "Most deliveries completed",
      icon: "🚚",
      date: "Last Week",
      type: "silver",
    },
    {
      title: "Customer Favorite",
      description: "Highest customer satisfaction",
      icon: "⭐",
      date: "This Quarter",
      type: "bronze",
    },
  ];

  return (
    <div className="sales-analytics">
      <div className="analytics-header">
        <h3>Your Performance Analytics</h3>
        <div className="period-selector">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="metrics-section">
        <div className="metrics-grid">
          {performanceMetrics.map((metric, index) => (
            <Card key={index} variant={metric.variant} icon={metric.icon}>
              <div className="metric-content">
                <div className="metric-header">
                  <div className="metric-value">{metric.value}</div>
                  <div className="metric-period">{metric.period}</div>
                </div>
                <div className="metric-label">{metric.title}</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${getProgressPercentage(metric.current, metric.target)}%`,
                      backgroundColor: getPerformanceColor(
                        metric.current,
                        metric.target,
                      ),
                    }}
                  ></div>
                </div>
                <div className="target-info">
                  Target: {metric.target}
                  {metric.title.includes("Rate")
                    ? "%"
                    : metric.title.includes("Revenue") ||
                        metric.title.includes("Value")
                      ? " ($)"
                      : ""}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="charts-grid">
          <Card title="Revenue Trend" icon="📈">
            <Chart
              type="line"
              data={selectedPeriod === "week" ? weeklyData : monthlyData}
            />
          </Card>

          <Card title="Delivery Status Distribution" icon="📊">
            <Chart type="doughnut" data={deliveryStatusData} />
          </Card>
        </div>

        <div className="charts-grid">
          <Card title="Car Category Performance" icon="🚗">
            <Chart type="bar" data={carCategoryData} />
          </Card>

          <Card title="Goals Progress" icon="🎯">
            <div className="goals-container">
              {goals.map((goal, index) => (
                <div key={index} className="goal-item">
                  <div className="goal-header">
                    <span className="goal-title">{goal.title}</span>
                    <span className="goal-value">
                      {goal.unit}
                      {Math.round(goal.current)}/{goal.unit}
                      {goal.target}
                    </span>
                  </div>
                  <div className="goal-progress">
                    <div
                      className="goal-bar"
                      style={{
                        width: `${getProgressPercentage(goal.current, goal.target)}%`,
                        backgroundColor: goal.color,
                      }}
                    ></div>
                  </div>
                  <div className="goal-percentage">
                    {Math.round(
                      getProgressPercentage(goal.current, goal.target),
                    )}
                    % Complete
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="achievements-section">
        <Card title="Recent Achievements" icon="🏆">
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`achievement-card achievement-card--${achievement.type}`}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-content">
                  <h4 className="achievement-title">{achievement.title}</h4>
                  <p className="achievement-description">
                    {achievement.description}
                  </p>
                  <div className="achievement-date">{achievement.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Performance Insights */}
      <div className="insights-section">
        <Card title="Performance Insights" icon="💡">
          <div className="insights-list">
            <div className="insight-item">
              <div className="insight-icon">📈</div>
              <div className="insight-text">
                Your revenue is{" "}
                <strong>{Math.round((myRevenue / 8500) * 100)}%</strong> of your
                monthly target.
                {myRevenue >= 8500
                  ? " Excellent performance!"
                  : " Keep pushing to reach your goal!"}
              </div>
            </div>

            <div className="insight-item">
              <div className="insight-icon">🎯</div>
              <div className="insight-text">
                Focus on <strong>luxury vehicles</strong> to increase your
                average lease value by 15-20%.
              </div>
            </div>

            <div className="insight-item">
              <div className="insight-icon">⚡</div>
              <div className="insight-text">
                Your completion rate is strong. Consider taking on
                <strong> 2-3 more deliveries</strong> to maximize this month's
                earnings.
              </div>
            </div>
          </div>
        </Card>
      </div>

      <style jsx>{`
        .sales-analytics {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .analytics-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .analytics-header h3 {
          color: #333;
          font-size: 1.5rem;
          margin: 0;
        }

        .period-selector select {
          padding: 0.5rem 1rem;
          border: 2px solid #667eea;
          border-radius: 6px;
          background: white;
          color: #667eea;
          font-weight: 500;
          cursor: pointer;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .metric-content {
          text-align: center;
        }

        .metric-header {
          margin-bottom: 0.5rem;
        }

        .metric-value {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 0.25rem;
        }

        .metric-period {
          font-size: 0.8rem;
          color: #666;
        }

        .metric-label {
          font-size: 0.9rem;
          margin-bottom: 1rem;
          opacity: 0.8;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #f1f3f4;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          transition: width 0.3s ease;
          border-radius: 4px;
        }

        .target-info {
          font-size: 0.8rem;
          color: #666;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .goals-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .goal-item {
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .goal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .goal-title {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .goal-value {
          font-weight: 500;
          color: #666;
          font-size: 0.9rem;
        }

        .goal-progress {
          width: 100%;
          height: 6px;
          background: #e9ecef;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .goal-bar {
          height: 100%;
          transition: width 0.3s ease;
          border-radius: 3px;
        }

        .goal-percentage {
          font-size: 0.8rem;
          color: #666;
          text-align: center;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .achievement-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 8px;
          border: 2px solid;
          transition: transform 0.2s ease;
        }

        .achievement-card:hover {
          transform: translateY(-2px);
        }

        .achievement-card--gold {
          border-color: #ffd700;
          background: linear-gradient(135deg, #fff7e6, #ffeaa7);
        }

        .achievement-card--silver {
          border-color: #c0c0c0;
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        }

        .achievement-card--bronze {
          border-color: #cd7f32;
          background: linear-gradient(135deg, #fff0e6, #ffeaa7);
        }

        .achievement-icon {
          font-size: 2rem;
        }

        .achievement-title {
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .achievement-description {
          margin: 0 0 0.25rem 0;
          font-size: 0.9rem;
          color: #666;
        }

        .achievement-date {
          font-size: 0.8rem;
          color: #888;
        }

        .insights-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .insight-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }

        .insight-icon {
          font-size: 1.2rem;
          margin-top: 0.1rem;
        }

        .insight-text {
          font-size: 0.95rem;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .analytics-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .charts-grid {
            grid-template-columns: 1fr;
          }

          .achievements-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SalesAnalytics;
