import { useState } from "react";
import { cars } from "../data/mockData";

const DeliveryForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    carId: "",
    deliveryDate: "",
    deliveryTime: "",
    leaseAmount: "",
    leaseDuration: "12",
    specialInstructions: "",
    priority: "normal",
    contactPreference: "phone",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableCars = cars.filter((car) => car.status === "available");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "Phone number is required";
    } else if (!/^\d{10,}$/.test(formData.customerPhone.replace(/\D/g, ""))) {
      newErrors.customerPhone = "Please enter a valid phone number";
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Please enter a valid email address";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code";
    }

    if (!formData.carId) {
      newErrors.carId = "Please select a car";
    }

    if (!formData.deliveryDate) {
      newErrors.deliveryDate = "Delivery date is required";
    } else {
      const selectedDate = new Date(formData.deliveryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.deliveryDate = "Delivery date cannot be in the past";
      }
    }

    if (!formData.deliveryTime) {
      newErrors.deliveryTime = "Delivery time is required";
    }

    if (!formData.leaseAmount || formData.leaseAmount <= 0) {
      newErrors.leaseAmount = "Please enter a valid lease amount";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const selectedCar = availableCars.find(
        (car) => car.id === formData.carId,
      );

      alert(`Delivery created successfully!
      
Customer: ${formData.customerName}
Car: ${selectedCar?.make} ${selectedCar?.model} ${selectedCar?.year}
Delivery: ${formData.deliveryDate} at ${formData.deliveryTime}
Lease Amount: $${formData.leaseAmount}/month`);

      // Reset form
      setFormData({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        carId: "",
        deliveryDate: "",
        deliveryTime: "",
        leaseAmount: "",
        leaseDuration: "12",
        specialInstructions: "",
        priority: "normal",
        contactPreference: "phone",
      });
    } catch (error) {
      alert("Failed to create delivery. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, customerPhone: formatted }));
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <div className="delivery-form">
      <form onSubmit={handleSubmit} className="form">
        {/* Customer Information */}
        <div className="form-section">
          <h3 className="section-title">Customer Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Customer Name *
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className={`form-input ${errors.customerName ? "error" : ""}`}
                  placeholder="John Doe"
                />
                {errors.customerName && (
                  <span className="error-message">{errors.customerName}</span>
                )}
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                Phone Number *
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handlePhoneChange}
                  className={`form-input ${errors.customerPhone ? "error" : ""}`}
                  placeholder="555-123-4567"
                  maxLength="12"
                />
                {errors.customerPhone && (
                  <span className="error-message">{errors.customerPhone}</span>
                )}
              </label>
            </div>

            <div className="form-group form-group--full">
              <label className="form-label">
                Email Address *
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className={`form-input ${errors.customerEmail ? "error" : ""}`}
                  placeholder="john.doe@email.com"
                />
                {errors.customerEmail && (
                  <span className="error-message">{errors.customerEmail}</span>
                )}
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                Contact Preference
                <select
                  name="contactPreference"
                  value={formData.contactPreference}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="text">Text Message</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="form-section">
          <h3 className="section-title">Delivery Address</h3>
          <div className="form-grid">
            <div className="form-group form-group--full">
              <label className="form-label">
                Street Address *
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`form-input ${errors.address ? "error" : ""}`}
                  placeholder="123 Main Street"
                />
                {errors.address && (
                  <span className="error-message">{errors.address}</span>
                )}
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                City *
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`form-input ${errors.city ? "error" : ""}`}
                  placeholder="New York"
                />
                {errors.city && (
                  <span className="error-message">{errors.city}</span>
                )}
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                State *
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`form-input ${errors.state ? "error" : ""}`}
                  placeholder="NY"
                  maxLength="2"
                />
                {errors.state && (
                  <span className="error-message">{errors.state}</span>
                )}
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                ZIP Code *
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={`form-input ${errors.zipCode ? "error" : ""}`}
                  placeholder="10001"
                />
                {errors.zipCode && (
                  <span className="error-message">{errors.zipCode}</span>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Vehicle & Lease Details */}
        <div className="form-section">
          <h3 className="section-title">Vehicle & Lease Details</h3>
          <div className="form-grid">
            <div className="form-group form-group--full">
              <label className="form-label">
                Select Vehicle *
                <select
                  name="carId"
                  value={formData.carId}
                  onChange={handleChange}
                  className={`form-input ${errors.carId ? "error" : ""}`}
                >
                  <option value="">Choose a vehicle...</option>
                  {availableCars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.year} {car.make} {car.model} - {car.color} ($
                      {car.leasePrice}/month)
                    </option>
                  ))}
                </select>
                {errors.carId && (
                  <span className="error-message">{errors.carId}</span>
                )}
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                Monthly Lease Amount *
                <input
                  type="number"
                  name="leaseAmount"
                  value={formData.leaseAmount}
                  onChange={handleChange}
                  className={`form-input ${errors.leaseAmount ? "error" : ""}`}
                  placeholder="350"
                  min="1"
                />
                {errors.leaseAmount && (
                  <span className="error-message">{errors.leaseAmount}</span>
                )}
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                Lease Duration (months)
                <select
                  name="leaseDuration"
                  value={formData.leaseDuration}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                  <option value="48">48 months</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="form-section">
          <h3 className="section-title">Delivery Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Delivery Date *
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className={`form-input ${errors.deliveryDate ? "error" : ""}`}
                  min={getMinDate()}
                />
                {errors.deliveryDate && (
                  <span className="error-message">{errors.deliveryDate}</span>
                )}
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                Delivery Time *
                <select
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  className={`form-input ${errors.deliveryTime ? "error" : ""}`}
                >
                  <option value="">Select time...</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
                {errors.deliveryTime && (
                  <span className="error-message">{errors.deliveryTime}</span>
                )}
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                Priority Level
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </label>
            </div>

            <div className="form-group form-group--full">
              <label className="form-label">
                Special Instructions
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Any special delivery instructions, gate codes, contact preferences, etc."
                  rows="3"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Creating Delivery...
              </>
            ) : (
              "Create Delivery"
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        .delivery-form {
          max-width: 800px;
          margin: 0 auto;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-section {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .section-title {
          margin: 0 0 1.5rem 0;
          color: #333;
          font-size: 1.2rem;
          font-weight: 600;
          border-bottom: 2px solid #667eea;
          padding-bottom: 0.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group--full {
          grid-column: 1 / -1;
        }

        .form-label {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-weight: 500;
          color: #555;
          font-size: 0.9rem;
        }

        .form-input,
        .form-textarea {
          padding: 0.75rem;
          border: 2px solid #e1e8ed;
          border-radius: 6px;
          font-size: 0.95rem;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
          background: white;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-input.error,
        .form-textarea.error {
          border-color: #dc3545;
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .error-message {
          color: #dc3545;
          font-size: 0.8rem;
          margin-top: 0.25rem;
        }

        .form-actions {
          display: flex;
          justify-content: center;
          padding-top: 1rem;
        }

        .submit-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 200px;
          justify-content: center;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid #ffffff40;
          border-top: 2px solid #ffffff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-section {
            padding: 1rem;
          }

          .submit-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default DeliveryForm;
