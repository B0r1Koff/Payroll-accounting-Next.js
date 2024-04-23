"use client"

import styles from "./contracts.css";
import React from 'react';
import Navbar from '../2components/navbar/navbar';

const contractsData = [
  { id: 1, employeeName: 'John Doe', contractType: 'Full-time', startDate: '2024-01-01', endDate: '2024-12-31' },
  { id: 2, employeeName: 'Jane Smith', contractType: 'Part-time', startDate: '2024-02-15', endDate: '2024-08-15' },
];

export default function ContractsPage(){
  return (
    <div>
      <Navbar/>
      <div className='table-page'>
        <h1>Employee Contracts</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Contract Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>End Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {contractsData.map(contract => (
              <tr key={contract.id}>
                <td>{contract.id}</td>
                <td>{contract.employeeName}</td>
                <td>{contract.contractType}</td>
                <td>{contract.startDate}</td>
                <td>{contract.endDate}</td>
                <td>{contract.endDate}</td>
                <td>{contract.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};