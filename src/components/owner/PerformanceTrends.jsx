import { useState } from "react";
import Card from "../shared/Card";
import Chart from "../shared/Chart";
import { analytics } from "../../data/mockData";

const PerformanceTrends = () => {
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [timeRange, setTimeRange] = useState("6months");

  // Generate trend data based on selected metric and time range
  const generateTrendData = (metric, range) => {
    const labels = {
      "1month": ["Week 1", "Week 2", "Week 3", "Week 4"],
      "3months": ["Month 1", "Month 2", "Month 3"],
      "6months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      "1year": ["Q1", "Q2", "Q3", "Q4"],
    };

    const dataMap = {
      revenue: {
        "1month": [18500, 22300, 19800, 25100],
        "3months": [58400, 67200, 72800],
        "6months": [58400, 62100, 59800, 67200, 65300, 72800],
        "1year": [198600, 215400, 201300, 234700],
      },
      deliveries: {
        "1month": [45, 52, 48, 58],
        "3months": [145, 167, 182],
        "6months": [145, 152, 148, 167, 163, 182],
        "1year": [540, 598, 556, 648],
      },
      efficiency: {
        "1month": [85, 88, 83, 92],
        "3months": [85, 89, 93],
        "6months": [85, 87, 83, 89, 91, 93],
        "1year": [87, 89, 85, 91],
      },
      satisfaction: {
        "1month": [4.2, 4.4, 4.1, 4.6],
        "3months": [4.2, 4.4, 4.7],
        "6months": [4.2, 4.3, 4.1, 4.4, 4.5, 4.7],
        "1year": [4.2, 4.4, 4.3, 4.6],
      },
    };

    return {
      labels: labels[range],
      values: dataMap[metric][range],
    };
  };

  const trendData = generateTrendData(selectedMetric, timeRange);

  const metrics = [
    {
      id: "revenue",
      name: "Revenue",
      icon: "💰",
      color: "#4caf50",
      suffix: "",
      prefix: "$",
    },
    {
      id: "deliveries",
      name: "Deliveries",
      icon: "📦",
      color: "#2196f3",
      suffix: "",
      prefix: "",
    },
    {
      id: "efficiency",
      name: "Efficiency",
      icon: "⚡",
      color: "#ff9800",
      suffix: "%",
      prefix: "",
    },
    {
      id: "satisfaction",
      name: "Customer Satisfaction",
      icon: "⭐",
      color: "#9c27b0",
      suffix: "/5",
      prefix: "",
    },
  ];

  const timeRanges = [
    { id: "1month", name: "Last Month" },
    { id: "3months", name: "Last 3 Months" },
    { id: "6months", name: "Last 6 Months" },
    { id: "1year", name: "Last Year" },
  ];

  const selectedMetricData = metrics.find((m) => m.id === selectedMetric);

  // Calculate trend percentage
  const calculateTrend = (data) => {
    if (data.length < 2) return 0;
    const first = data[0];
    const last = data[data.length - 1];
    return (((last - first) / first) * 100).toFixed(1);
  };

  const trendPercentage = calculateTrend(trendData.values);
  const isPositiveTrend = parseFloat(trendPercentage) >= 0;

  // Performance insights
  const getPerformanceInsights = () => {
    const insights = [];

    if (selectedMetric === "revenue") {
      if (isPositiveTrend) {
        insights.push({
          type: "positive",
          text: `Revenue has grown by ${trendPercentage}% over the selected period`,
        });
      } else {
        insights.push({
          type: "negative",
          text: `Revenue has declined by ${Math.abs(trendPercentage)}% - consider reviewing pricing strategy`,
        });
      }
    }

    if (selectedMetric === "deliveries") {
      const avgDeliveries =
        trendData.values.reduce((a, b) => a + b, 0) / trendData.values.length;
      insights.push({
        type: "info",
        text: `Average ${avgDeliveries.toFixed(0)} deliveries per period`,
      });
    }

    if (selectedMetric === "efficiency") {
      const currentEfficiency = trendData.values[trendData.values.length - 1];
      if (currentEfficiency >= 90) {
        insights.push({
          type: "positive",
          text: "Excellent operational efficiency - maintain current practices",
        });
      } else if (currentEfficiency >= 80) {
        insights.push({
          type: "warning",
          text: "Good efficiency with room for improvement",
        });
      } else {
        insights.push({
          type: "negative",
          text: "Efficiency below target - review operational processes",
        });
      }
    }

    if (selectedMetric === "satisfaction") {
      const currentSatisfaction = trendData.values[trendData.values.length - 1];
      if (currentSatisfaction >= 4.5) {
        insights.push({
          type: "positive",
          text: "Outstanding customer satisfaction scores",
        });
      } else if (currentSatisfaction >= 4.0) {
        insights.push({
          type: "warning",
          text: "Good satisfaction with potential for improvement",
        });
      } else {
        insights.push({
          type: "negative",
          text: "Customer satisfaction needs immediate attention",
        });
      }
    }

    return insights;
  };

  const insights = getPerformanceInsights();

  return (
    <div className="performance-trends">
      <div className="trends-controls">
        <Card title="Trend Analysis Controls" icon="🎛️">
          <div className="controls-grid">
            <div className="control-section">
              <h4>Metric</h4>
              <div className="metric-buttons">
                {metrics.map((metric) => (
                  <button
                    key={metric.id}
                    onClick={() => setSelectedMetric(metric.id)}
                    className={`metric-button ${selectedMetric === metric.id ? "active" : ""}`}
                    style={{ borderColor: metric.color }}
                  >
                    <span className="metric-icon">{metric.icon}</span>
                    <span className="metric-name">{metric.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="control-section">
              <h4>Time Range</h4>
              <div className="time-buttons">
                {timeRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setTimeRange(range.id)}
                    className={`time-button ${timeRange === range.id ? "active" : ""}`}
                  >
                    {range.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="trend-visualization">
        <Card
          title={`${selectedMetricData?.name} Trend`}
          icon={selectedMetricData?.icon}
          action={
            <div className="trend-summary">
              <span
                className={`trend-indicator ${isPositiveTrend ? "positive" : "negative"}`}
              >
                {isPositiveTrend ? "↗️" : "↘️"} {Math.abs(trendPercentage)}%
              </span>
            </div>
          }
        >
          <div className="chart-container">
            <Chart
              type="line"
              data={trendData}
              options={{
                color: selectedMetricData?.color,
                prefix: selectedMetricData?.prefix,
                suffix: selectedMetricData?.suffix,
              }}
            />
          </div>
        </Card>
      </div>

      <div className="performance-insights">
        <Card title="Performance Insights" icon="💡">
          <div className="insights-list">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`insight-item insight-item--${insight.type}`}
              >
                <div className="insight-icon">
                  {insight.type === "positive" && "✅"}
                  {insight.type === "negative" && "⚠️"}
                  {insight.type === "warning" && "🔶"}
                  {insight.type === "info" && "ℹ️"}
                </div>
                <div className="insight-text">{insight.text}</div>
              </div>
            ))}
          </div>

          <div className="performance-recommendations">
            <h4>Recommendations</h4>
            <ul className="recommendations-list">
              {selectedMetric === "revenue" && (
                <>
                  <li>Focus on high-value lease agreements</li>
                  <li>Implement dynamic pricing strategies</li>
                  <li>Expand premium vehicle offerings</li>
                </>
              )}
              {selectedMetric === "deliveries" && (
                <>
                  <li>Optimize delivery route planning</li>
                  <li>Increase driver availability during peak hours</li>
                  <li>Implement automated delivery scheduling</li>
                </>
              )}
              {selectedMetric === "efficiency" && (
                <>
                  <li>Streamline administrative processes</li>
                  <li>Invest in driver training programs</li>
                  <li>Upgrade fleet management technology</li>
                </>
              )}
              {selectedMetric === "satisfaction" && (
                <>
                  <li>Implement customer feedback system</li>
                  <li>Enhance delivery experience</li>
                  <li>Provide better customer communication</li>
                </>
              )}
            </ul>
          </div>
        </Card>
      </div>

      <style jsx>{`
        .performance-trends {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .controls-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .control-section h4 {
          margin-bottom: 1rem;
          color: #333;
          font-size: 1rem;
          font-weight: 600;
        }

        .metric-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.75rem;
        }

        .metric-button {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: white;
          border: 2px solid #e1e8ed;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }

        .metric-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .metric-button.active {
          background: rgba(102, 126, 234, 0.1);
          border-color: currentColor;
        }

        .metric-icon {
          font-size: 1.2rem;
        }

        .metric-name {
          font-weight: 500;
        }

        .time-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .time-button {
          padding: 0.75rem 1.5rem;
          background: white;
          border: 2px solid #e1e8ed;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .time-button:hover {
          border-color: #667eea;
        }

        .time-button.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .trend-summary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .trend-indicator {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .trend-indicator.positive {
          background: #d4edda;
          color: #155724;
        }

        .trend-indicator.negative {
          background: #f8d7da;
          color: #721c24;
        }

        .chart-container {
          min-height: 300px;
        }

        .insights-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .insight-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid;
        }

        .insight-item--positive {
          background: #d4edda;
          border-color: #28a745;
        }

        .insight-item--negative {
          background: #f8d7da;
          border-color: #dc3545;
        }

        .insight-item--warning {
          background: #fff3cd;
          border-color: #ffc107;
        }

        .insight-item--info {
          background: #d1ecf1;
          border-color: #17a2b8;
        }

        .insight-icon {
          font-size: 1.1rem;
          margin-top: 0.1rem;
        }

        .insight-text {
          font-size: 0.95rem;
          line-height: 1.4;
        }

        .performance-recommendations h4 {
          margin-bottom: 1rem;
          color: #333;
          font-size: 1rem;
          font-weight: 600;
        }

        .recommendations-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .recommendations-list li {
          padding: 0.5rem 0;
          position: relative;
          padding-left: 1.5rem;
          color: #555;
          font-size: 0.9rem;
        }

        .recommendations-list li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: #667eea;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .metric-buttons {
            grid-template-columns: 1fr;
          }

          .time-buttons {
            flex-direction: column;
          }

          .controls-grid {
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PerformanceTrends;
