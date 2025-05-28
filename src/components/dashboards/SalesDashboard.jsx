import { useState } from "react";
import Card from "../shared/Card";
import Table from "../shared/Table";
import Chart from "../shared/Chart";
import Tabs from "../shared/Tabs";
import DeliveryForm from "../DeliveryForm";
import { deliveries, cars, analytics } from "../../data/mockData";
import "./SalesDashboard.css";

const SalesDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  // Filter data for current salesperson (mock: Sarah Wilson)
  const myDeliveries = deliveries.filter(
    (d) => d.salesperson === "Sarah Wilson",
  );
  const pendingDeliveries = myDeliveries.filter((d) => d.status === "pending");
  const completedDeliveries = myDeliveries.filter(
    (d) => d.status === "completed",
  );

  const statsCards = [
    {
      title: "Total Deliveries",
      value: myDeliveries.length,
      icon: "📦",
      variant: "stat",
    },
    {
      title: "Pending Deliveries",
      value: pendingDeliveries.length,
      icon: "⏳",
      variant: "warning",
    },
    {
      title: "Monthly Revenue",
      value: `$${myDeliveries.reduce((sum, d) => sum + d.leaseAmount, 0).toLocaleString()}`,
      icon: "💰",
      variant: "success",
    },
    {
      title: "Cars Leased",
      value: completedDeliveries.length,
      icon: "🚗",
      variant: "default",
    },
  ];

  const deliveryColumns = [
    {
      key: "id",
      label: "Delivery ID",
    },
    {
      key: "customerName",
      label: "Customer",
    },
    {
      key: "carModel",
      label: "Car Model",
    },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <span className={`status-badge status-badge--${status}`}>{status}</span>
      ),
    },
    {
      key: "deliveryDate",
      label: "Delivery Date",
    },
    {
      key: "leaseAmount",
      label: "Lease Amount",
      render: (amount) => `$${amount}`,
    },
  ];

  const carColumns = [
    {
      key: "make",
      label: "Make",
    },
    {
      key: "model",
      label: "Model",
    },
    {
      key: "year",
      label: "Year",
    },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <span className={`status-badge status-badge--${status}`}>{status}</span>
      ),
    },
    {
      key: "leasePrice",
      label: "Lease Price",
      render: (price) => `$${price}/month`,
    },
  ];

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [3, 5, 2, 8, 4, 6, 3],
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [5200, 7800, 6400, 8900, 7500, 6800],
  };

  const tabs = [
    {
      label: "Overview",
      icon: "📊",
      content: (
        <div className="sales-overview">
          <div className="stats-grid">
            {statsCards.map((stat, index) => (
              <Card key={index} variant={stat.variant} icon={stat.icon}>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.title}</div>
                </div>
              </Card>
            ))}
          </div>

          <div className="charts-section">
            <Card title="Weekly Deliveries">
              <Chart type="bar" data={chartData} />
            </Card>
            <Card title="Monthly Revenue Trend">
              <Chart type="line" data={revenueData} />
            </Card>
          </div>
        </div>
      ),
    },
    {
      label: "My Deliveries",
      icon: "📦",
      count: myDeliveries.length,
      content: (
        <div className="deliveries-section">
          <div className="section-header">
            <h3>My Deliveries</h3>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="period-selector"
            >
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="yearly">This Year</option>
            </select>
          </div>
          <Card>
            <Table
              columns={deliveryColumns}
              data={myDeliveries}
              onRowClick={(delivery) => console.log("View delivery:", delivery)}
            />
          </Card>
        </div>
      ),
    },
    {
      label: "Available Cars",
      icon: "🚗",
      content: (
        <div className="cars-section">
          <Card title="Available Cars for Lease">
            <Table
              columns={carColumns}
              data={cars}
              onRowClick={(car) => console.log("View car:", car)}
            />
          </Card>
        </div>
      ),
    },
    {
      label: "New Delivery",
      icon: "➕",
      content: (
        <div className="new-delivery-section">
          <Card title="Post New Delivery">
            <DeliveryForm />
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="sales-dashboard">
      <div className="dashboard-header">
        <h2>Sales Dashboard</h2>
        <p>Manage deliveries, track performance, and view analytics</p>
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
};

export default SalesDashboard;
