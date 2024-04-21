import styles from "./contractInfo.css"
import { useState } from "react";
import Bonuses from "../bonuses/bonuses";

export default function ContractInfo({contractData, setContractData}){

    const handleContractDataChange = (e) => {
        const { name, value } = e.target;
        setContractData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

    return(
      <div className="contract-info-container">   
        <div className="contract-info-box">
          <h3 className="contract-info-h3"><span className="contract-info-span"></span>Контракт</h3>
          <div className="contract-info-form">
            <div className="contract-info-input_box">
              <input type="number" required className="contract-info-input" name="salary" placeholder="Salary" value={contractData.salary} onChange={handleContractDataChange}/>
              <label className="contract-info-label">Оклад:</label>
            </div>
            <div className="contract-info-input_box">
              <input type="number" required className="contract-info-input" name="vacationDays" placeholder="Vacation Days" value={contractData.vacationDays} onChange={handleContractDataChange}/>
              <label className="contract-info-label">Число дней отпуска в год:</label>
            </div>
            <div className="contract-info-input_box">
              <input type="date" required className="contract-info-input" name="dateOfStart" placeholder="Date of start" value={contractData.dateOfStart} onChange={handleContractDataChange}/>
              <label className="contract-info-label">Дата начала:</label>
            </div>
            <div className="contract-info-input_box">
              <input type="date" required className="contract-info-input" name="dateOfEnd" placeholder="Date of end" value={contractData.dateOfEnd} onChange={handleContractDataChange}/>
              <label className="contract-info-label">Дата завершения:</label>
            </div>
          </div>
        </div>
      </div>
    )
}