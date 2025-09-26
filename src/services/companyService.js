import axios from 'axios';

const API_URL = 'http://localhost:8080/api/companies';

export const getCompanies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCompany = async (company) => {
  const response = await axios.post(API_URL, company);
  return response.data;
};
