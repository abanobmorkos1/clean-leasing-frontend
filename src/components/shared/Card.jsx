import "./Card.css";

const Card = ({
  title,
  children,
  className = "",
  action,
  icon,
  variant = "default",
}) => {
  return (
    <div className={`card card--${variant} ${className}`}>
      {(title || action || icon) && (
        <div className="card__header">
          <div className="card__title-section">
            {icon && <span className="card__icon">{icon}</span>}
            {title && <h3 className="card__title">{title}</h3>}
          </div>
          {action && <div className="card__action">{action}</div>}
        </div>
      )}
      <div className="card__content">{children}</div>
    </div>
  );
};

export default Card;
