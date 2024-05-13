'use client'
import Navbar from '../2components/navbar/navbar'
import styles from "./main.css";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useState, useEffect } from 'react';
import userStore from '../store/userStore';
import axios from 'axios';

export default function Main() {
    const [user, setLoggedUser] = useState(JSON.parse(localStorage.getItem('loggedUser')))
    const monthes = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",]
    const dates = [4,5,6,7,8,9]

    let [date, setDate] = useState(monthes[dates.reverse()[0]])
    const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8090/api/collections/MonthData/records?filter=(worker_id='${user.id}')`)
      .then(response => {
        console.log(response.data.items);
        setData(response.data.items);
      })
      .catch(error => {
        console.error(error);
      });
  }, [])

    const generatePDF = () => {
        const input = document.getElementById('report');
        html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("Расчетный лист");
      });
    }

    const dateOptions = dates.reverse().map(date => {
        return <option key={date}>{monthes[date]}</option>
    });

    return (
        <div className='mainpage'>
    
            <div className="payslip">

                <div className='month-options'>
                    <select className="select-month" value={date} onChange = {(event) => setDate(event.target.value)}>
			            {dateOptions}
		            </select>
                    <label className='select-month-label'>Месяц:</label>
                </div>

                    <div id="report">
                        <h1 className="payslip-h">Расчетный лист</h1>
                        <p className='payslip-field'>Организация: ОАО "Чпок и в гроб"</p>
                        <p className='payslip-field'>Подразделение: Отдел компании</p>
                        <p className='payslip-field'>ФИО работника: </p>
                        <p className='payslip-field'>Должность: </p>
                        <p className='payslip-field'>Должностной оклад: </p>
                        <p className='payslip-field'>Выплата за месяц: {date}</p>
                        <p className='payslip-field'>Размер выплаты:</p>
                        <p className='payslip-field'>Размер удержаний: </p>
                    </div>

            </div>

            <button className="save-payslip-btn" onClick={(e)=>{generatePDF()}}>Сохранить</button>
            <Navbar/>
        </div>
    )
}