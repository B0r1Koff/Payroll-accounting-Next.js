"use client"
import { useState } from "react"
import styles from "./absenceNotice.css"
import Navbar from "../2components/navbar/navbar"
import Notice from "../2components/notice/notice"

export default function AbsenceNotice(){
    const typesOfAbsence = ["Отпуск", "Больничный", "Оплачиваемый отпуск", "Прогул"]

    const [noticeData, setNoticeData] = useState({
        noticeType: '',
        dateOfStart: '',
        dateOfEnd: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      alert("Уведомление создано")
      console.log('Submitted data:', { noticeData });
    };

    return(
        <div className='notice-page'>
          <div className='notice-content'>
            <div className='notice-info-wrapper'>
              <Notice noticeData={noticeData} setNoticeData={setNoticeData}/>
            </div>
            <button className='create-notice-button' onClick={handleSubmit}>Создать</button>
          </div>
          <Navbar/>
        </div>
    )
}
