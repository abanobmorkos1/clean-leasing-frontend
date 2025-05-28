import "./Chart.css";

const Chart = ({ type = "bar", data, title, className = "" }) => {
  const renderBarChart = () => {
    const maxValue = Math.max(...data.values);

    return (
      <div className="chart chart--bar">
        {data.labels.map((label, index) => {
          const value = data.values[index];
          const height = (value / maxValue) * 100;

          return (
            <div key={index} className="chart__bar-container">
              <div
                className="chart__bar"
                style={{ height: `${height}%` }}
                title={`${label}: ${value}`}
              >
                <span className="chart__bar-value">{value}</span>
              </div>
              <span className="chart__bar-label">{label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderLineChart = () => {
    const maxValue = Math.max(...data.values);
    const minValue = Math.min(...data.values);
    const range = maxValue - minValue;

    const points = data.values
      .map((value, index) => {
        const x = (index / (data.values.length - 1)) * 100;
        const y = 100 - ((value - minValue) / range) * 100;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <div className="chart chart--line">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline points={points} className="chart__line" fill="none" />
          {data.values.map((value, index) => {
            const x = (index / (data.values.length - 1)) * 100;
            const y = 100 - ((value - minValue) / range) * 100;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                className="chart__point"
              />
            );
          })}
        </svg>
        <div className="chart__line-labels">
          {data.labels.map((label, index) => (
            <span key={index} className="chart__line-label">
              {label}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderPieChart = () => {
    const total = data.values.reduce((sum, value) => sum + value, 0);
    let currentAngle = 0;

    return (
      <div className="chart chart--pie">
        <svg viewBox="0 0 100 100">
          {data.values.map((value, index) => {
            const percentage = (value / total) * 100;
            const angle = (value / total) * 360;
            const largeArc = angle > 180 ? 1 : 0;

            const x1 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
            const y1 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);

            currentAngle += angle;

            const x2 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
            const y2 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);

            const pathData = [
              `M 50 50`,
              `L ${x1} ${y1}`,
              `A 40 40 0 ${largeArc} 1 ${x2} ${y2}`,
              "Z",
            ].join(" ");

            return (
              <path
                key={index}
                d={pathData}
                className={`chart__pie-slice chart__pie-slice--${index}`}
                title={`${data.labels[index]}: ${percentage.toFixed(1)}%`}
              />
            );
          })}
        </svg>
        <div className="chart__pie-legend">
          {data.labels.map((label, index) => (
            <div key={index} className="chart__pie-legend-item">
              <div
                className={`chart__pie-legend-color chart__pie-legend-color--${index}`}
              ></div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`chart-container ${className}`}>
      {title && <h4 className="chart__title">{title}</h4>}
      {type === "bar" && renderBarChart()}
      {type === "line" && renderLineChart()}
      {type === "pie" && renderPieChart()}
    </div>
  );
};

export default Chart;
