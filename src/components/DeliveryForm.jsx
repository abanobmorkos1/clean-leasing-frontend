// src/components/DeliveryForm.jsx
import { useState } from 'react';

const DeliveryForm = () => {
  const [form, setForm] = useState({ name: '', address: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/delivery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    alert('Delivery submitted!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Customer Name" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default DeliveryForm;
