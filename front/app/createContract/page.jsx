'use client'
import styles from './createContract.css'; 
import Navbar from '../2components/navbar/navbar'
import { useEffect, useState } from 'react';
import UserInfo from '../2components/userInfo/userInfo';
import ContractInfo from '../2components/contractInfo/contractInfo';
import Bonuses from '../2components/bonuses/bonuses';
import PocketBase from 'pocketbase';
import axios from 'axios';

export default function createContract(){
    const pb = new PocketBase("http://127.0.0.1:8090")
    const [check, setCheck] = useState()

    const [userData, setUserData] = useState({
        fio: '',
        login: '',
        password: '',
        department_id: 'ow9ugkkk6wzjbzz',
        position: 'worker'
      });
    
      const [contractData, setContractData] = useState({
        salary: '',
        sick_days: '',
        date_of_start: '',
        date_of_end: '',
        worker_id: ''
      });

      const [bonuses, setBonuses] = useState({
        experience: 0,
        overworking: 0,
        worker_id: ''
      });

      // const [bonuses, setBonuses] = useState([]);

      const findUserByLogin = () => {
        fetch(`http://127.0.0.1:8090/api/collections/Worker/login/${userData.login}/${userData.password}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            return data
          })
          .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
          })
    }
    
      const handleSubmit = () => {
        // if (findUserByLogin()) {
        //   alert("Сотрудник с таким логином уже существует!")
        //   return
        // }
        console.log(findUserByLogin());
        if(Math.abs(bonuses.experience ) > 15 || Math.abs(bonuses.overworking) > 15){
          alert("Размер надбавок не должен превышать 15 процентов!")
          return
        }
        const worker = pb.collection('Worker').create(userData);
        worker.then(function({id}){
          const contract = pb.collection('Contract').create({
            "salary": contractData.salary,
            "sick_days": contractData.sick_days,
            "worker_id": id,
            "date_of_start": contractData.date_of_start,
            "date_of_end": contractData.date_of_end
        });
          const experienceAllowance = pb.collection('Allowances').create({
            "percent": parseInt(Math.abs(bonuses.experience)) || 0,
            "type": "experience",
            "worker_id": id
          });
          setTimeout(() => {
            const overworkingAllowance = pb.collection('Allowances').create({
              "percent": parseInt(Math.abs(bonuses.overworking)) || 0,
              "type": "overworking",
              "worker_id": id
            });
          }, 300);
        })
      };

    return(
        <div className='contract-page'>
          <div className='contract-content'>
            <div className='contract-info-wrapper'>
              <UserInfo userData={userData} setUserData={setUserData}/>
              <ContractInfo contractData={contractData} setContractData={setContractData}/>
              <Bonuses bonuses={bonuses} setBonuses={setBonuses}/>
            </div>
            <button className='create-contract-button' onClick={handleSubmit}>Создать</button>
          </div>
          <Navbar/>
        </div>
    )
}