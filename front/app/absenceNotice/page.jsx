"use client"
import { useState } from "react"
import styles from "./absenceNotice.css"
import Navbar from "../2components/navbar/navbar"
import Notice from "../2components/notice/notice"
import PocketBase from 'pocketbase';

export default function AbsenceNotice(){
    const pb = new PocketBase("http://127.0.0.1:8090")
    const typesOfAbsence = ["Отпуск", "Больничный", "Оплачиваемый отпуск", "Прогул"]

    const [noticeData, setNoticeData] = useState({
      start_date: "",
      end_date: "",
      type: "",
      worker_id: ""
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if(noticeData.end_date === "" || noticeData.start_date === "" || noticeData.type === "" || noticeData.worker_id === ""){
        alert("Заполните все поля!")
        return
      }
      alert("Уведомление создано")
      const record = pb.collection('Notices').create(noticeData);
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
