import { useState } from "react";
import Card from "../shared/Card";
import Table from "../shared/Table";
import Tabs from "../shared/Tabs";
import CollapsiblePanel from "../shared/CollapsiblePanel";
import {
  drivers,
  clockRecords,
  deliveries,
  bonusPhotos,
} from "../../data/mockData";
import "./ManagementDashboard.css";

const ManagementDashboard = () => {
  const [pendingClockIns, setPendingClockIns] = useState(
    clockRecords.filter((record) => record.status === "pending"),
  );
  const [unassignedDeliveries, setUnassignedDeliveries] = useState(
    deliveries.filter((delivery) => delivery.status === "pending"),
  );

  const handleApproveClockIn = (recordId) => {
    setPendingClockIns((prev) =>
      prev
        .map((record) =>
          record.id === recordId ? { ...record, status: "approved" } : record,
        )
        .filter((record) => record.status === "pending"),
    );
    alert("Clock-in approved!");
  };

  const handleRejectClockIn = (recordId) => {
    setPendingClockIns((prev) =>
      prev.filter((record) => record.id !== recordId),
    );
    alert("Clock-in rejected!");
  };

  const handleAssignDriver = (deliveryId, driverId) => {
    const driver = drivers.find((d) => d.id === driverId);
    setUnassignedDeliveries((prev) =>
      prev
        .map((delivery) =>
          delivery.id === deliveryId
            ? { ...delivery, assignedDriver: driver.name, status: "assigned" }
            : delivery,
        )
        .filter((delivery) => delivery.status === "pending"),
    );
    alert(`Delivery ${deliveryId} assigned to ${driver.name}!`);
  };

  const statsCards = [
    {
      title: "Pending Approvals",
      value: pendingClockIns.length,
      icon: "⏳",
      variant: "warning",
    },
    {
      title: "Active Drivers",
      value: drivers.filter((d) => d.status === "active").length,
      icon: "👨‍🔧",
      variant: "success",
    },
    {
      title: "Unassigned Deliveries",
      value: unassignedDeliveries.length,
      icon: "📦",
      variant: "stat",
    },
    {
      title: "Total Weekly Hours",
      value: `${drivers.reduce((sum, d) => sum + d.hoursThisWeek, 0)}h`,
      icon: "⏰",
      variant: "default",
    },
  ];

  const clockInColumns = [
    { key: "driverName", label: "Driver" },
    {
      key: "clockIn",
      label: "Clock In",
      render: (time) => new Date(time).toLocaleString(),
    },
    {
      key: "clockOut",
      label: "Clock Out",
      render: (time) =>
        time ? new Date(time).toLocaleString() : "Still clocked in",
    },
    { key: "totalHours", label: "Hours" },
    { key: "location", label: "Location" },
    {
      key: "actions",
      label: "Actions",
      render: (_, record) => (
        <div className="action-buttons">
          <button
            onClick={() => handleApproveClockIn(record.id)}
            className="approve-btn"
          >
            ✅ Approve
          </button>
          <button
            onClick={() => handleRejectClockIn(record.id)}
            className="reject-btn"
          >
            ❌ Reject
          </button>
        </div>
      ),
    },
  ];

  const deliveryColumns = [
    { key: "id", label: "Delivery ID" },
    { key: "customerName", label: "Customer" },
    { key: "carModel", label: "Car Model" },
    { key: "address", label: "Address" },
    { key: "salesperson", label: "Posted By" },
    {
      key: "assignDriver",
      label: "Assign Driver",
      render: (_, delivery) => (
        <select
          onChange={(e) =>
            e.target.value && handleAssignDriver(delivery.id, e.target.value)
          }
          defaultValue=""
          className="driver-select"
        >
          <option value="">Select Driver</option>
          {drivers
            .filter((d) => d.status === "active")
            .map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
        </select>
      ),
    },
  ];

  const driverPerformanceColumns = [
    { key: "name", label: "Driver Name" },
    { key: "hoursThisWeek", label: "Weekly Hours" },
    { key: "deliveriesCompleted", label: "Deliveries" },
    { key: "bonusPhotos", label: "Bonus Photos" },
    {
      key: "status",
      label: "Status",
      render: (status, driver) => (
        <div className="driver-status">
          <span className={`status-badge status-badge--${status}`}>
            {status}
          </span>
          {driver.clockedIn && (
            <span className="clocked-in-indicator">🟢 Clocked In</span>
          )}
        </div>
      ),
    },
  ];

  const bonusPhotoColumns = [
    { key: "driverName", label: "Driver" },
    { key: "type", label: "Type" },
    { key: "description", label: "Description" },
    { key: "uploadDate", label: "Upload Date" },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <span className={`status-badge status-badge--${status}`}>{status}</span>
      ),
    },
  ];

  const tabs = [
    {
      label: "Overview",
      icon: "📊",
      content: (
        <div className="management-overview">
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

          <div className="quick-actions">
            <Card title="Quick Actions" icon="⚡">
              <div className="action-grid">
                <button className="action-button">
                  <span className="action-icon">✅</span>
                  <span className="action-text">Approve All Clock-ins</span>
                </button>
                <button className="action-button">
                  <span className="action-icon">📦</span>
                  <span className="action-text">Auto-assign Deliveries</span>
                </button>
                <button className="action-button">
                  <span className="action-icon">📊</span>
                  <span className="action-text">Generate Reports</span>
                </button>
                <button className="action-button">
                  <span className="action-icon">🔔</span>
                  <span className="action-text">Send Notifications</span>
                </button>
              </div>
            </Card>
          </div>
        </div>
      ),
    },
    {
      label: "Clock-in Approvals",
      icon: "⏰",
      count: pendingClockIns.length,
      content: (
        <div className="approvals-section">
          <Card title="Pending Clock-in Approvals" icon="⏳">
            {pendingClockIns.length > 0 ? (
              <Table columns={clockInColumns} data={pendingClockIns} />
            ) : (
              <div className="empty-state">
                <div className="empty-icon">✅</div>
                <p>No pending clock-in approvals</p>
              </div>
            )}
          </Card>
        </div>
      ),
    },
    {
      label: "Driver Assignment",
      icon: "🚛",
      count: unassignedDeliveries.length,
      content: (
        <div className="assignment-section">
          <Card title="Unassigned Deliveries" icon="📦">
            {unassignedDeliveries.length > 0 ? (
              <Table columns={deliveryColumns} data={unassignedDeliveries} />
            ) : (
              <div className="empty-state">
                <div className="empty-icon">✅</div>
                <p>All deliveries have been assigned</p>
              </div>
            )}
          </Card>
        </div>
      ),
    },
    {
      label: "Driver Performance",
      icon: "👨‍🔧",
      content: (
        <div className="performance-section">
          <CollapsiblePanel
            title="Weekly Performance Overview"
            defaultOpen={true}
            icon="📈"
          >
            <Table
              columns={driverPerformanceColumns}
              data={drivers}
              onRowClick={(driver) =>
                console.log("View driver details:", driver)
              }
            />
          </CollapsiblePanel>

          <CollapsiblePanel title="Bonus Photo Uploads" icon="📸">
            <Table columns={bonusPhotoColumns} data={bonusPhotos} />
          </CollapsiblePanel>
        </div>
      ),
    },
  ];

  return (
    <div className="management-dashboard">
      <div className="dashboard-header">
        <h2>Management Dashboard</h2>
        <p>Approve clock-ins, assign drivers, and monitor performance</p>
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
};

export default ManagementDashboard;
