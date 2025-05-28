import { useState } from "react";
import Card from "../shared/Card";
import Table from "../shared/Table";
import Chart from "../shared/Chart";
import Tabs from "../shared/Tabs";
import CollapsiblePanel from "../shared/CollapsiblePanel";
import AdvancedFilters from "../owner/AdvancedFilters";
import PerformanceTrends from "../owner/PerformanceTrends";
import {
  drivers,
  deliveries,
  cars,
  salespeople,
  analytics,
} from "../../data/mockData";
import "./OwnerDashboard.css";

const OwnerDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    month: "",
    year: "",
    salesperson: "",
    driver: "",
  });

  const totalDriverHours = drivers.reduce((sum, d) => sum + d.hoursThisWeek, 0);
  const totalRevenue = deliveries.reduce((sum, d) => sum + d.leaseAmount, 0);
  const totalDeliveries = deliveries.length;
  const avgLeaseValue = totalRevenue / totalDeliveries;

  const performanceMetrics = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: "💰",
      variant: "success",
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Total Deliveries",
      value: totalDeliveries,
      icon: "📦",
      variant: "stat",
      change: "+8.3%",
      trend: "up",
    },
    {
      title: "Active Drivers",
      value: drivers.filter((d) => d.status === "active").length,
      icon: "👨‍🔧",
      variant: "default",
      change: "0%",
      trend: "stable",
    },
    {
      title: "Avg Lease Value",
      value: `$${Math.round(avgLeaseValue)}`,
      icon: "📈",
      variant: "warning",
      change: "+5.2%",
      trend: "up",
    },
    {
      title: "Available Cars",
      value: cars.filter((c) => c.status === "available").length,
      icon: "🚗",
      variant: "default",
      change: "-3.1%",
      trend: "down",
    },
    {
      title: "Total Driver Hours",
      value: `${totalDriverHours}h`,
      icon: "⏰",
      variant: "success",
      change: "+15.7%",
      trend: "up",
    },
  ];

  const topPerformersData = [
    ...salespeople.map((sp) => ({
      name: sp.name,
      role: "Sales",
      metric: `$${sp.totalLeaseValue.toLocaleString()}`,
      deliveries: sp.deliveriesThisMonth,
      performance: ((sp.deliveriesThisMonth / 30) * 100).toFixed(1),
    })),
    ...drivers.map((d) => ({
      name: d.name,
      role: "Driver",
      metric: `${d.deliveriesCompleted} deliveries`,
      deliveries: d.deliveriesCompleted,
      performance: ((d.deliveriesCompleted / 20) * 100).toFixed(1),
    })),
  ].sort((a, b) => b.deliveries - a.deliveries);

  const revenueChartData = {
    labels: Object.keys(analytics.carActivity.byMonth),
    values: Object.values(analytics.carActivity.byMonth).map((v) => v * 400), // Mock revenue conversion
  };

  const makeDistributionData = {
    labels: Object.keys(analytics.carActivity.byMake),
    values: Object.values(analytics.carActivity.byMake),
  };

  const weeklyHoursData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: analytics.weekly.driverHours,
  };

  const performanceColumns = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "metric", label: "Key Metric" },
    { key: "deliveries", label: "Deliveries" },
    {
      key: "performance",
      label: "Performance",
      render: (perf) => (
        <div className="performance-bar">
          <div
            className="performance-fill"
            style={{ width: `${Math.min(parseFloat(perf), 100)}%` }}
          ></div>
          <span className="performance-text">{perf}%</span>
        </div>
      ),
    },
  ];

  const driverHoursColumns = [
    { key: "name", label: "Driver Name" },
    { key: "hoursThisWeek", label: "Weekly Hours" },
    { key: "deliveriesCompleted", label: "Deliveries" },
    { key: "bonusPhotos", label: "Bonus Photos" },
    {
      key: "efficiency",
      label: "Efficiency",
      render: (_, driver) => {
        const efficiency = driver.deliveriesCompleted / driver.hoursThisWeek;
        return `${efficiency.toFixed(2)} del/hr`;
      },
    },
    {
      key: "status",
      label: "Status",
      render: (status, driver) => (
        <div className="driver-status">
          <span className={`status-badge status-badge--${status}`}>
            {status}
          </span>
          {driver.clockedIn && (
            <span className="clocked-in-indicator">🟢 Active</span>
          )}
        </div>
      ),
    },
  ];

  const carActivityColumns = [
    { key: "make", label: "Make" },
    { key: "model", label: "Model" },
    { key: "year", label: "Year" },
    { key: "status", label: "Status" },
    { key: "leasePrice", label: "Monthly Lease" },
  ];

  const applyFilters = (data) => {
    return data.filter((item) => {
      if (filters.make && item.make !== filters.make) return false;
      if (filters.model && item.model !== filters.model) return false;
      if (filters.year && item.year.toString() !== filters.year) return false;
      return true;
    });
  };

  const tabs = [
    {
      label: "Analytics Overview",
      icon: "📊",
      content: (
        <div className="owner-overview">
          <div className="metrics-grid">
            {performanceMetrics.map((metric, index) => (
              <Card key={index} variant={metric.variant} icon={metric.icon}>
                <div className="metric-content">
                  <div className="metric-header">
                    <div className="metric-value">{metric.value}</div>
                    <div
                      className={`metric-change metric-change--${metric.trend}`}
                    >
                      <span className="change-icon">
                        {metric.trend === "up"
                          ? "↗️"
                          : metric.trend === "down"
                            ? "↘️"
                            : "➡️"}
                      </span>
                      {metric.change}
                    </div>
                  </div>
                  <div className="metric-label">{metric.title}</div>
                </div>
              </Card>
            ))}
          </div>

          <div className="charts-section">
            <Card title="Monthly Revenue Trend" icon="💰">
              <Chart type="line" data={revenueChartData} />
            </Card>
            <Card title="Car Distribution by Make" icon="🚗">
              <Chart type="doughnut" data={makeDistributionData} />
            </Card>
          </div>
        </div>
      ),
    },
    {
      label: "Performance Trends",
      icon: "📈",
      content: (
        <div className="trends-section">
          <PerformanceTrends />
        </div>
      ),
    },
    {
      label: "Driver Analytics",
      icon: "👨‍🔧",
      content: (
        <div className="driver-analytics">
          <div className="charts-section">
            <Card title="Weekly Driver Hours" icon="⏰">
              <Chart type="bar" data={weeklyHoursData} />
            </Card>
            <Card title="Top Performers" icon="🏆">
              <Table
                columns={performanceColumns}
                data={topPerformersData.slice(0, 5)}
              />
            </Card>
          </div>

          <CollapsiblePanel title="Detailed Driver Hours" icon="📋">
            <Table
              columns={driverHoursColumns}
              data={drivers}
              onRowClick={(driver) =>
                console.log("View driver details:", driver)
              }
            />
          </CollapsiblePanel>
        </div>
      ),
    },
    {
      label: "Car Activity",
      icon: "🚗",
      content: (
        <div className="car-activity">
          <AdvancedFilters filters={filters} onFiltersChange={setFilters} />

          <Card title="Filtered Car Inventory" icon="🚗">
            <Table
              columns={carActivityColumns}
              data={applyFilters(cars)}
              onRowClick={(car) => console.log("View car details:", car)}
            />
          </Card>

          <div className="activity-insights">
            <Card title="Activity Insights" icon="💡">
              <div className="insights-grid">
                <div className="insight-card">
                  <div className="insight-value">
                    {Object.values(analytics.carActivity.byMake).reduce(
                      (a, b) => a + b,
                      0,
                    )}
                  </div>
                  <div className="insight-label">Total Cars Processed</div>
                </div>
                <div className="insight-card">
                  <div className="insight-value">
                    {Math.max(...Object.values(analytics.carActivity.byMake))}
                  </div>
                  <div className="insight-label">Peak Monthly Activity</div>
                </div>
                <div className="insight-card">
                  <div className="insight-value">
                    {Object.keys(analytics.carActivity.byMake).find(
                      (make) =>
                        analytics.carActivity.byMake[make] ===
                        Math.max(
                          ...Object.values(analytics.carActivity.byMake),
                        ),
                    )}
                  </div>
                  <div className="insight-label">Top Performing Make</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="owner-dashboard">
      <div className="dashboard-header">
        <h2>Owner Dashboard</h2>
        <p>Complete visibility and analytics across your leasing operation</p>
        <div className="period-controls">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-selector"
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="quarterly">This Quarter</option>
            <option value="yearly">This Year</option>
          </select>
        </div>
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
};

export default OwnerDashboard;
