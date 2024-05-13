'use client';
import styles from "./auth.css";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import userStore from "../store/userStore";
import PocketBase from 'pocketbase';
import axios from "axios";

export default function Auth(){
    const router = useRouter()
    const pb = new PocketBase("http://127.0.0.1:8090")

    let [login, setLogin] = useState("")
    let [password, setPassword] = useState("")
    const { user, setUser, resetUser } = userStore()

    const Create = () => {
    //   const data = {
    //     "fio": "test",
    //     "login": "testtest",
    //     "password": "test",
    //     "department_id": "r5noqtwem67jh9o",
    //     "position": "worker"
    // };
    
    // const record =  pb.collection('Worker').create(data);
    // console.log(record);

    let final

      let data = fetch("http://127.0.0.1:8090/api/collections/Worker/records",{ method:"POST", body: {
            "fio": "test",
            "login": "testtest",
            "password": "test",
            "department_id": "r5noqtwem67jh9o",
            "position": "worker"}}).then((val) => console.log(val))
            return final
    
    }

    useEffect(() => {

        // async function getData() {
        //   let final;

        //   let data = await fetch("http://127.0.0.1:8090/api/collections/Worker/records",{ method:"POST", body: {
        //     "fio": "test",
        //     "login": "testtest",
        //     "password": "test",
        //     "department_id": "r5noqtwem67jh9o",
        //     "position": "worker"}}).then((val) => final = val)
        //     return final
        // }

        // const finalData = getData()
        // console.log(finalData);

        // pb.send("/api/collections/Worker/records", body = {
        //   "fio": "test",
        //   "login": "testtest",
        //   "password": "test",
        //   "department_id": "r5noqtwem67jh9o",
        //   "position": "worker"})

        //list.then((data) => console.log(data))
    }, [])

    const handleAuthClick = () => {
        fetch(`http://127.0.0.1:8090/api/collections/Worker/login/${login}/${password}`, {
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
            setUser(data.user)
            localStorage.setItem('loggedUser', JSON.stringify(data.user))
            router.push("/main")
          })
          .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
          });
    }

    return (
        <div className="container">
            <div className="box">
                <h3 className="h3"><span className="span"></span>Авторизация</h3>

                <div className="form">

                    <div className="input_box">
                        <input type="text" required className="input" onChange={e => setLogin(e.target.value)}/>
                        <label className="label">Логин</label>
                    </div>
                    <div className="input_box">
                        <input type="password" required className="input" onChange={e => setPassword(e.target.value)}/>
                        <label className="label">Пароль</label>
                    </div>

                    <button type="submit" className="login-button" onClick={handleAuthClick}>Авторизоваться</button>

                </div>
             
            </div>

        </div>
    )
}