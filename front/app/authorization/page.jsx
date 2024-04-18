'use client';
import styles from "./auth.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import userStore from "../store/userStore";

export default function Auth(){
    const { role, set, reset } = userStore()
    const router = useRouter()

    let [login, setLogin] = useState("")
    let [password, setPassword] = useState("")

    const handleAuthClick = () => {
        set("role2")
        router.push("/main")
    }

    return (
        <div className='auth'>

            <header className='auth-head'>Авторизация</header>

            <div className='log-container'>
                <label htmlFor="" className='log-label'>Логин:</label>
                <input type="text" placeholder='Логин' required className='log-input' onChange={e => setLogin(e.target.value)}/>
            </div>

            <div className='log-container'>
                <label htmlFor="" className='log-label'>Пароль:</label>
                <input type="password" placeholder='Пароль' className='log-input' required onChange={e => setPassword(e.target.value)}/>
            </div>

            <button className='confirm-auth-button' onClick={handleAuthClick}>Подтвердить</button>
           
        </div>
    )
}