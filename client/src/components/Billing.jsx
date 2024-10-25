import "./Billing.css";

const Billing = () => {
  return (
    <div className="billing-page">
      <h2>Calculate Cost</h2>
      <div className="billing-summary">
        <div className="billing-card">
          <p>Total Power Consumption</p>
          <h3>290 kWh</h3>
        </div>
        <div className="billing-card">
          <p>Total Revenue</p>
          <h3>Rs. 2000</h3>
        </div>
      </div>
      <h3>Calculations:</h3>
      <div className="calculations">
        <div className="">
          <p>
            <strong>Meter No:</strong> GP654337
          </p>
          <p>
            <strong>Date:</strong> 01-April
          </p>
          <p>
            <strong>Rate/unit:</strong> 290kWh
          </p>
          <p>
            <strong>Total:</strong> Rs.2000
          </p>
          <p>
            <strong>Due Date:</strong> 06-April
          </p>
        </div>
      </div>

      <p className="policy-warning">
        If the bill is not paid before the due date, extra charges will be
        collected as per policy.
      </p>
    </div>
  );
};

export default Billing;
