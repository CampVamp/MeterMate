import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="header">
        <h2>Hello Customer!</h2>
        <div className="frequency-buttons">
          <button className="frequency-btn">Weekly</button>
          <button className="frequency-btn">Monthly</button>
          <button className="frequency-btn">Yearly</button>
        </div>
        <div className="consumption-summary">
          <div className="consumption-card">
            <p>This week</p>
            <h3>0 kWh</h3>
          </div>
          <div className="consumption-card">
            <p>This Month</p>
            <h3>0.8 kWh</h3>
          </div>
        </div>
      </div>

      <div className="chart">
        <h3>Weekly Consumption</h3>
        {/* You can replace this with an actual chart later */}
        <div className="chart-placeholder">
          <p>Chart goes here</p>
        </div>
      </div>

      <div className="payment-record">
        <h3>Payment Record (Past 5 Months)</h3>
        <div className="payment-item">
          <span className="month">January:</span>
          <span className="amount">Rs.1500 (Paid)</span>
        </div>
        <div className="payment-item">
          <span className="month">February:</span>
          <span className="amount">Rs.800 (Paid)</span>
        </div>
        <div className="payment-item">
          <span className="month">
            <strong>March:</strong>
          </span>
          <span className="amount">Rs.1690 (Paid)</span>
        </div>
        <div className="payment-item">
          <span className="month">April:</span>
          <span className="amount">Rs.1440 (Paid)</span>
        </div>
        <div className="payment-item">
          <span className="month">May:</span>
          <span className="amount">Rs.600 (Pending)</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
