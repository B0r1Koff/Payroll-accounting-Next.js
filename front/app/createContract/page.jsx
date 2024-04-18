'use client'
import styles from './createContract.css'; 
import Navbar from '../2components/navbar/navbar'
import { useState } from 'react';
import UserInfo from '../2components/userInfo/userInfo';
import ContractInfo from '../2components/contractInfo/contractInfo';
import Bonuses from '../2components/bonuses/bonuses';

export default function createContract(){
    const [userData, setUserData] = useState({
        fullName: '',
        username: '',
        password: ''
      });
    
      const [contractData, setContractData] = useState({
        salary: '',
        vacationDays: ''
      });

      const [bonuses, setBonuses] = useState([]);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Do something with userData and contractData, like sending them to the server
        alert("Контракт создан")
        console.log('Submitted data:', { userData, contractData, bonuses });
      };

    return(
        <div className='contract-page'>
          <Navbar/>
          <div>
            <UserInfo userData={userData} setUserData={setUserData}/>
            <div>
              <ContractInfo contractData={contractData} setContractData={setContractData}/>
              <Bonuses bonuses={bonuses} setBonuses={setBonuses}/>
            </div>
            <button onClick={handleSubmit}>Создать</button>
          </div>
      </div>
    )
}