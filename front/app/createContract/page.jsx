'use client'
import styles from './createContract.css'; 
import Navbar from '../2components/navbar/navbar'
import { useEffect, useState } from 'react';
import UserInfo from '../2components/userInfo/userInfo';
import ContractInfo from '../2components/contractInfo/contractInfo';
import Bonuses from '../2components/bonuses/bonuses';
import PocketBase from 'pocketbase';

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
        vacationDays: '',
        dateOfStart: '',
        dateOfEnd: ''
      });

      const [bonuses, setBonuses] = useState([]);

      const findUserByLogin = () => {
        setCheck(fetch(`http://127.0.0.1:8090/api/collections/Worker/login/${userData.login}/${userData.password}`, {
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
          
          .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
          }))

          return check;
    }
    
      const handleSubmit = () => {
        if (findUserByLogin()) {
          alert("Сотрудник с таким логином уже существует!")
          return
        }

        // const record = pb.collection('Worker').create(userData);
        // record.then(function({collectionId}){
        //   console.log(collectionId);
        // })
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