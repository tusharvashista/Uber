import React, { useState } from 'react';

const ReceiptForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    riderName: '',
    pickup: '',
    dropoff: '',
    pickupTime: '',
    dropoffTime: '',
    totalFare: '',
    date: new Date().toISOString().split('T')[0], // Proper date format for input[type="date"]
    driverName: '',
    licensePlate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate pickup time is before dropoff time
    if (formData.pickupTime && formData.dropoffTime) {
      const pickupDateTime = new Date(`${formData.date}T${formData.pickupTime}`);
      const dropoffDateTime = new Date(`${formData.date}T${formData.dropoffTime}`);
      
      if (pickupDateTime >= dropoffDateTime) {
        alert('Pickup time must be before drop-off time!');
        return;
      }
    }
    
    // Validate total fare is positive
    if (parseFloat(formData.totalFare) <= 0) {
      alert('Total fare must be greater than 0!');
      return;
    }
    
    // Generate a receipt number
    const receiptNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
    
    const receiptData = {
      ...formData,
      receiptNumber,
      totalFare: parseFloat(formData.totalFare)
    };
    
    onSubmit(receiptData);
  };

  const formStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    marginTop: '15px',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333'
  };

  const buttonStyle = {
    backgroundColor: '#000000',
    color: 'white',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '20px',
    width: '100%'
  };

  const rowStyle = {
    display: 'flex',
    gap: '15px'
  };

  const colStyle = {
    flex: 1
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Generate Uber Receipt
      </h2>
      
      <label style={labelStyle}>Rider Name *</label>
      <input
        type="text"
        name="riderName"
        value={formData.riderName}
        onChange={handleChange}
        required
        style={inputStyle}
        placeholder="Enter rider's full name"
      />

      <label style={labelStyle}>Pickup Location *</label>
      <input
        type="text"
        name="pickup"
        value={formData.pickup}
        onChange={handleChange}
        required
        style={inputStyle}
        placeholder="e.g., Connaught Place, New Delhi"
      />

      <label style={labelStyle}>Drop-off Location *</label>
      <input
        type="text"
        name="dropoff"
        value={formData.dropoff}
        onChange={handleChange}
        required
        style={inputStyle}
        placeholder="e.g., India Gate, New Delhi"
      />

      <div style={rowStyle}>
        <div style={colStyle}>
          <label style={labelStyle}>Pickup Time *</label>
          <input
            type="time"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={colStyle}>
          <label style={labelStyle}>Drop-off Time *</label>
          <input
            type="time"
            name="dropoffTime"
            value={formData.dropoffTime}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={colStyle}>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={colStyle}>
          <label style={labelStyle}>Total Fare (₹) *</label>
          <input
            type="number"
            name="totalFare"
            value={formData.totalFare}
            onChange={handleChange}
            required
            min="1"
            step="0.01"
            style={inputStyle}
            placeholder="e.g., 250.00"
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={colStyle}>
          <label style={labelStyle}>Driver Name</label>
          <input
            type="text"
            name="driverName"
            value={formData.driverName}
            onChange={handleChange}
            style={inputStyle}
            placeholder="e.g., Rajesh Kumar"
          />
        </div>
        <div style={colStyle}>
          <label style={labelStyle}>License Plate</label>
          <input
            type="text"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            style={inputStyle}
            placeholder="e.g., HR55AV3151"
          />
        </div>
      </div>

      <button type="submit" style={buttonStyle}>
        Generate Receipt
      </button>
    </form>
  );
};

export default ReceiptForm;
