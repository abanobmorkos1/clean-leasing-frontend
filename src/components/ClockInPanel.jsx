import { useState } from "react";

const ClockInPanel = () => {
  const [isClocked, setIsClocked] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clockInTime, setClockInTime] = useState(null);

  // Update time every second
  useState(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockToggle = () => {
    if (!isClocked) {
      // Clock in
      setClockInTime(new Date());
      setIsClocked(true);
      alert("Successfully clocked in!");
    } else {
      // Clock out
      const hours = ((new Date() - clockInTime) / (1000 * 60 * 60)).toFixed(2);
      alert(`Successfully clocked out! Total hours: ${hours}`);
      setIsClocked(false);
      setClockInTime(null);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getHoursWorked = () => {
    if (!clockInTime) return "0.00";
    return ((new Date() - clockInTime) / (1000 * 60 * 60)).toFixed(2);
  };

  return (
    <div className="clock-panel">
      <div className="clock-display">
        <div className="current-time">
          <div className="time">{formatTime(currentTime)}</div>
          <div className="date">{formatDate(currentTime)}</div>
        </div>
      </div>

      <div className="clock-status">
        <div
          className={`status-indicator ${isClocked ? "clocked-in" : "clocked-out"}`}
        >
          <div className="status-icon">{isClocked ? "🟢" : "🔴"}</div>
          <div className="status-text">
            {isClocked ? "Clocked In" : "Clocked Out"}
          </div>
        </div>

        {isClocked && clockInTime && (
          <div className="work-info">
            <div className="clock-in-time">
              <span className="label">Clocked in at:</span>
              <span className="value">{formatTime(clockInTime)}</span>
            </div>
            <div className="hours-worked">
              <span className="label">Hours worked:</span>
              <span className="value">{getHoursWorked()}h</span>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleClockToggle}
        className={`clock-button ${isClocked ? "clock-out" : "clock-in"}`}
      >
        {isClocked ? "Clock Out" : "Clock In"}
      </button>

      <style jsx>{`
        .clock-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          color: white;
          text-align: center;
        }

        .clock-display {
          margin-bottom: 1rem;
        }

        .current-time .time {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          letter-spacing: 1px;
        }

        .current-time .date {
          font-size: 1rem;
          opacity: 0.9;
        }

        .clock-status {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .status-indicator.clocked-in {
          background: rgba(76, 175, 80, 0.2);
          border: 2px solid rgba(76, 175, 80, 0.5);
        }

        .status-indicator.clocked-out {
          background: rgba(244, 67, 54, 0.2);
          border: 2px solid rgba(244, 67, 54, 0.5);
        }

        .status-icon {
          font-size: 1.2rem;
        }

        .status-text {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .work-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .work-info > div {
          display: flex;
          justify-content: space-between;
          gap: 2rem;
        }

        .label {
          opacity: 0.8;
        }

        .value {
          font-weight: 600;
        }

        .clock-button {
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 120px;
        }

        .clock-button.clock-in {
          background: #4caf50;
          color: white;
        }

        .clock-button.clock-in:hover {
          background: #45a049;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
        }

        .clock-button.clock-out {
          background: #f44336;
          color: white;
        }

        .clock-button.clock-out:hover {
          background: #da190b;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(244, 67, 54, 0.4);
        }

        @media (max-width: 768px) {
          .clock-panel {
            padding: 1rem;
          }

          .current-time .time {
            font-size: 2rem;
          }

          .work-info > div {
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ClockInPanel;
