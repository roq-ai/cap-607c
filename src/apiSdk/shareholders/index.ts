import axios from 'axios';
import queryString from 'query-string';
import { ShareholderInterface, ShareholderGetQueryInterface } from 'interfaces/shareholder';
import { GetQueryInterface } from '../../interfaces';

export const getShareholders = async (query?: ShareholderGetQueryInterface) => {
  const response = await axios.get(`/api/shareholders${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createShareholder = async (shareholder: ShareholderInterface) => {
  const response = await axios.post('/api/shareholders', shareholder);
  return response.data;
};

export const updateShareholderById = async (id: string, shareholder: ShareholderInterface) => {
  const response = await axios.put(`/api/shareholders/${id}`, shareholder);
  return response.data;
};

export const getShareholderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/shareholders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteShareholderById = async (id: string) => {
  const response = await axios.delete(`/api/shareholders/${id}`);
  return response.data;
};
