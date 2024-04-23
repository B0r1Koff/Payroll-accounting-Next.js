import { useState } from "react"
import styles from "./notice.css"

export default function Notice({noticeData, setNoticeData}){
    const typesOfAbsence = ["Отпуск", "Больничный", "Оплачиваемый отпуск", "Прогул"]

    const handleNoticeDataChange = (e) => {
        const { name, value } = e.target;
        setNoticeData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

    const noticeOptions = typesOfAbsence.map(type => {
        return <option key={type}>{type}</option>
    });

    return(
      <div className="notice-info-container"> 
        <div className="notice-info-box">
          <h3 className="notice-info-h3"><span className="notice-info-span"></span>Уведомление</h3>
          <div className="notice-info-form">
            <div className="notice-info-input_box">
              <select type="text" required className="notice-info-input" name="noticeType" placeholder="Full Name" value={noticeData.noticeType} onChange={handleNoticeDataChange}>
                {noticeOptions}
              </select>
              <label className="notice-info-label">Тип:</label>
            </div>
            <div className="notice-info-input_box">
              <input type="date" required className="notice-info-input" name="dateOfStart" placeholder="Username" value={noticeData.dateOfStart} onChange={handleNoticeDataChange}/>
              <label className="notice-info-label">Дата начала:</label>
            </div>
            <div className="notice-info-input_box">
              <input type="date" required className="notice-info-input" name="dateOfEnd" placeholder="Password" value={noticeData.dateOfEnd} onChange={handleNoticeDataChange}/>
              <label className="notice-info-label">Дата завершения:</label>
            </div>
          </div>
        </div>
      </div>
    )
}
