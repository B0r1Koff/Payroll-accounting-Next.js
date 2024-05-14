"use client"
import styles from "./contracts.css";
import React, { useState, useEffect } from 'react';
import Navbar from '../2components/navbar/navbar';
import axios from "axios";

export default function ContractsPage(){
  const [user, setLoggedUser] = useState(JSON.parse(localStorage.getItem('loggedUser')))
  const [contracts, setContracts] = useState([])
  const [users, setUsers] = useState([])
  const [allowances, setAllowances] = useState([])
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    if(user.position === "head"){
      axios.get(`http://127.0.0.1:8090/api/collections/Worker/records?filter=(department_id='${user.department_id}')`)
      .then(response => {
        setUsers(response.data.items);
      })
      .catch(error => {
        console.error(error);
      });
    } else{
      axios.get(`http://127.0.0.1:8090/api/collections/Worker/records`)
      .then(response => {
        setUsers(response.data.items);
      })
      .catch(error => {
        console.error(error);
      });
    }
      setTimeout(() => {
        axios.get(`http://127.0.0.1:8090/api/collections/Contract/records`)
          .then(response => {
            setContracts(response.data.items);
          })
          .catch(error => {
            console.error(error);
        });
      }, 200);
      setTimeout(() => {
        axios.get(`http://127.0.0.1:8090/api/collections/Allowances/records`)
          .then(response => {
            setAllowances(response.data.items);
          })
          .catch(error => {
            console.error(error);
          });
      }, 400);
      setTimeout(() => {
        axios.get(`http://127.0.0.1:8090/api/collections/Department/records`)
          .then(response => {
            setDepartments(response.data.items);
          })
          .catch(error => {
            console.error(error);
          });
      }, 600);
  }, [])

  const getExperienceAllowance = (id) => {
    let result = 0
    allowances.map(allowance => {
      if(allowance.worker_id === id && allowance.type === "experience"){
        result = allowance.percent
      }
    })

    return result
  }

  const getOverworkingAllowance = (id) => {
    let result = 0
    allowances.map(allowance => {
      if(allowance.worker_id === id && allowance.type === "overworking"){
        result = allowance.percent
      }
    })

    return result
  }

  const getPosition = (id) => {
    if(id === "worker"){
      return "Сотрудник"
    }else return "Руководитель отделения"
  }

  const getDepartment = (id) => {
    let result = ""
    departments.map(department => {
      if(department.id === id){
        result = department.name
      }
    })
    return result
  }

  const getSalary = (id) => {
    let result = 0
    contracts.map(contract => {
      if(contract.worker_id === id){
        result = contract.salary
      }
    })
    return result
  }

  return (
    <div>
      <div className='table-page'>
        <h1 className="contracts-h">Контракты</h1>
        <table>
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Должность</th>
              <th>Подразделение</th>
              <th>Оклад</th>
              <th>Надбавка за стаж</th>
              <th>Надбавка за переработку</th>
            </tr>
          </thead>
          <tbody>
            {users.map(item => (
              <tr key={item.id}>
                <td>{item.fio}</td>
                <td>{getPosition(item.position)}</td>
                <td>{getDepartment(item.department_id)}</td>
                <td>{getSalary(item.id)}</td>
                <td>{getExperienceAllowance(item.id)}</td>
                <td>{getOverworkingAllowance(item.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Navbar/>
    </div>
  );
};