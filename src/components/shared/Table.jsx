import "./Table.css";

const Table = ({
  columns,
  data,
  className = "",
  onRowClick,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="table-loading">
        <div className="loading-spinner"></div>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className={`table-container ${className}`}>
      <table className="table">
        <thead className="table__head">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="table__header">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table__body">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`table__row ${onRowClick ? "table__row--clickable" : ""}`}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="table__cell">
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="table-empty">
          <span>No data available</span>
        </div>
      )}
    </div>
  );
};

export default Table;
