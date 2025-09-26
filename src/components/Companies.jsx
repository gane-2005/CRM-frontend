import React, { useState, useEffect } from 'react';
import { getCompanies, createCompany } from '../services/companyService';
import './style.css';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', industry: '', location: '' });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const data = await getCompanies();
    setCompanies(data);
  };

  const handleInputChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCompany(newCompany);
    fetchCompanies();
    setNewCompany({ name: '', industry: '', location: '' });
    setShowForm(false);
  };

  return (
    <div className="company-container">
      <h2>Companies</h2>
      <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Company'}</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={newCompany.name} onChange={handleInputChange} required />
          <input type="text" name="industry" placeholder="Industry" value={newCompany.industry} onChange={handleInputChange} required />
          <input type="text" name="location" placeholder="Location" value={newCompany.location} onChange={handleInputChange} required />
          <button type="submit">Add</button>
        </form>
      )}
      <table className="company-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{company.industry}</td>
              <td>{company.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Companies;
