import React, { useState, useEffect } from 'react';
import { getCustomers, createCustomer } from '../services/customerService';
import './style.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  const handleInputChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCustomer(newCustomer);
    fetchCustomers();
    setNewCustomer({ name: '', email: '', phone: '' });
    setShowForm(false);
  };

  return (
    <div className="customer-container">
      <h2>Customers</h2>
      <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Customer'}</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={newCustomer.name} onChange={handleInputChange} required />
          <input type="email" name="email" placeholder="Email" value={newCustomer.email} onChange={handleInputChange} required />
          <input type="text" name="phone" placeholder="Phone" value={newCustomer.phone} onChange={handleInputChange} required />
          <button type="submit">Add</button>
        </form>
      )}
      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
