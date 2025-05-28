import { useState } from "react";
import Card from "../shared/Card";
import Table from "../shared/Table";
import Tabs from "../shared/Tabs";
import CollapsiblePanel from "../shared/CollapsiblePanel";
import ClockInPanel from "../ClockInPanel";
import { deliveries, drivers, cars, bonusPhotos } from "../../data/mockData";
import "./DriverDashboard.css";

const DriverDashboard = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Mock current driver (Mike Johnson)
  const currentDriver = drivers.find((d) => d.name === "Mike Johnson");
  const myDeliveries = deliveries.filter(
    (d) => d.assignedDriver === "Mike Johnson",
  );
  const todayDeliveries = myDeliveries.filter(
    (d) => d.deliveryDate === "2024-01-15",
  );
  const myBonusPhotos = bonusPhotos.filter(
    (bp) => bp.driverId === currentDriver?.id,
  );

  const statsCards = [
    {
      title: "Today's Deliveries",
      value: todayDeliveries.length,
      icon: "📦",
      variant: "stat",
    },
    {
      title: "Hours This Week",
      value: `${currentDriver?.hoursThisWeek}h`,
      icon: "⏰",
      variant: "success",
    },
    {
      title: "Completed This Month",
      value: currentDriver?.deliveriesCompleted || 0,
      icon: "✅",
      variant: "default",
    },
    {
      title: "Bonus Photos",
      value: currentDriver?.bonusPhotos || 0,
      icon: "📸",
      variant: "warning",
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
      key: "address",
      label: "Address",
    },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <span className={`status-badge status-badge--${status}`}>{status}</span>
      ),
    },
  ];

  const carFormData = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    vin: "",
    type: "new-car", // or 'lease-return'
  });

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const submitBonusPhotos = () => {
    // Mock submission
    alert(`Uploaded ${selectedFiles.length} bonus photos!`);
    setSelectedFiles([]);
  };

  const carColumns = [
    { key: "make", label: "Make" },
    { key: "model", label: "Model" },
    { key: "year", label: "Year" },
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
        <div className="driver-overview">
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

          <div className="clock-section">
            <Card title="Clock In/Out" icon="⏰">
              <ClockInPanel />
            </Card>
          </div>
        </div>
      ),
    },
    {
      label: "My Deliveries",
      icon: "🚛",
      count: myDeliveries.length,
      content: (
        <div className="deliveries-section">
          <CollapsiblePanel
            title="Today's Deliveries"
            defaultOpen={true}
            icon="📦"
          >
            <Table
              columns={deliveryColumns}
              data={todayDeliveries}
              onRowClick={(delivery) => console.log("View delivery:", delivery)}
            />
          </CollapsiblePanel>

          <CollapsiblePanel title="All Assigned Deliveries" icon="📋">
            <Table
              columns={deliveryColumns}
              data={myDeliveries}
              onRowClick={(delivery) => console.log("View delivery:", delivery)}
            />
          </CollapsiblePanel>
        </div>
      ),
    },
    {
      label: "Post Cars",
      icon: "🚗",
      content: (
        <div className="post-cars-section">
          <CollapsiblePanel title="Add New Car" defaultOpen={true} icon="➕">
            <form className="car-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Make</label>
                  <input type="text" placeholder="Toyota" required />
                </div>
                <div className="form-group">
                  <label>Model</label>
                  <input type="text" placeholder="Camry" required />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input type="number" placeholder="2024" required />
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <input type="text" placeholder="Silver" required />
                </div>
                <div className="form-group">
                  <label>VIN</label>
                  <input type="text" placeholder="VIN Number" required />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select>
                    <option value="new-car">New Car</option>
                    <option value="lease-return">Lease Return</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="submit-btn">
                Submit Car
              </button>
            </form>
          </CollapsiblePanel>

          <CollapsiblePanel title="My Posted Cars" icon="🚗">
            <Table
              columns={carColumns}
              data={cars.slice(0, 2)} // Mock: only show some cars
            />
          </CollapsiblePanel>
        </div>
      ),
    },
    {
      label: "Bonus Photos",
      icon: "📸",
      count: myBonusPhotos.length,
      content: (
        <div className="bonus-photos-section">
          <CollapsiblePanel
            title="Upload New Photos"
            defaultOpen={true}
            icon="📤"
          >
            <div className="upload-section">
              <div className="upload-area">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="file-input"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="upload-label">
                  <div className="upload-icon">📷</div>
                  <div className="upload-text">
                    <strong>Click to upload photos</strong>
                    <br />
                    Google reviews, customer pics, etc.
                  </div>
                </label>
              </div>

              {selectedFiles.length > 0 && (
                <div className="selected-files">
                  <h4>Selected Files:</h4>
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="file-item">
                      <span>{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="remove-btn"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button onClick={submitBonusPhotos} className="submit-btn">
                    Upload {selectedFiles.length} Photos
                  </button>
                </div>
              )}
            </div>
          </CollapsiblePanel>

          <CollapsiblePanel title="My Uploaded Photos" icon="📋">
            <Table
              columns={[
                { key: "type", label: "Type" },
                { key: "description", label: "Description" },
                { key: "uploadDate", label: "Upload Date" },
                {
                  key: "status",
                  label: "Status",
                  render: (status) => (
                    <span className={`status-badge status-badge--${status}`}>
                      {status}
                    </span>
                  ),
                },
              ]}
              data={myBonusPhotos}
            />
          </CollapsiblePanel>
        </div>
      ),
    },
  ];

  return (
    <div className="driver-dashboard">
      <div className="dashboard-header">
        <h2>Driver Dashboard</h2>
        <p>View deliveries, manage cars, and track your performance</p>
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
};

export default DriverDashboard;
