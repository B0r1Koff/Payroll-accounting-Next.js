'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import styles from "./navbar.css";
import userStore from "@/app/store/userStore";
import Profile from '../profile/profile';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function Navbar(){
    const pathes = {"worker" : ["/main"], "head" : ["/main", "/createContract", "/absenceNotice", "/contracts", "/chartsPage"], "director" : ["/contracts", "/createContract"]}
    const path = usePathname()
    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('loggedUser')))
    const router = useRouter()
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isProfileClicked, setIsProfileClicked] = useState(false);

    useEffect(() => {
        const pathesList = pathes[loggedUser.position]
        if(!pathesList.includes(path)){
            router.push("/")
        }
    }, [])

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
        setIsProfileClicked(!isProfileClicked)
    };

    return ( 
        loggedUser.position === "director" ?

        <div className="navbar">
            <div className='nav-start'>
                <button onClick={toggleProfile} disabled={isProfileClicked} className='nav-button'><img className='nav-btn-img' src="https://cdn.onlinewebfonts.com/svg/img_217837.png" alt="fewre" /></button>
                <Profile isOpen={isProfileOpen} onClose={toggleProfile}/>

                <button className='nav-button' onClick={e => router.push("/contracts")}><img className='nav-btn-img' src="https://cdn.onlinewebfonts.com/svg/img_50288.png" alt="" /></button>
                <button className='nav-button' onClick={e => router.push("/createContract")}><img className='nav-btn-img' src="https://cdn.icon-icons.com/icons2/2946/PNG/512/paper_plus_icon_184281.png" alt="" /></button>
            </div>
                
            <div className='nav-end'>
                <button className='nav-button' onClick={e => router.push("/")}><img className='nav-btn-img' src="https://cdn3.iconfinder.com/data/icons/minimalisticons/28/Close-1024.png" alt="" /></button>
            </div>
        </div>

        : loggedUser.position === "head" ? 

        <div className="navbar">
            <div className='nav-start'>
                <button onClick={toggleProfile} disabled={isProfileClicked} className='nav-button'><img className='nav-btn-img' src="https://cdn.onlinewebfonts.com/svg/img_217837.png" alt="fewre" /></button>
                <Profile isOpen={isProfileOpen} onClose={toggleProfile}/>

                <button className='nav-button' onClick={e => router.push("/main")}><img className='nav-btn-img' src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/12.File-1024.png" alt="" /></button>
                <button className='nav-button' onClick={e => router.push("/createContract")}><img className='nav-btn-img' src="https://cdn.icon-icons.com/icons2/2946/PNG/512/paper_plus_icon_184281.png" alt="" /></button>
                <button className='nav-button' onClick={e => router.push("/absenceNotice")}><img className='nav-btn-img' src="https://premiumwebsites.net/wp-content/uploads/2017/10/google-calendar.png" alt="" /></button>
                <button className='nav-button' onClick={e => router.push("/contracts")}><img className='nav-btn-img' src="https://cdn.onlinewebfonts.com/svg/img_50288.png" alt="" /></button>
                <button className='nav-button' onClick={e => router.push("/chartsPage")}><img className='nav-btn-img' src="https://collegial.sainteanne.ca/wp-content/uploads/2022/01/noun-analytics-4111649-copy-2048x1993.png" alt="" /></button>
            </div>
                
            <div className='nav-end'>
                <button className='nav-button' onClick={e => router.push("/")}><img className='nav-btn-img' src="https://cdn3.iconfinder.com/data/icons/minimalisticons/28/Close-1024.png" alt="" /></button>
            </div>
        </div>

        :
        
        <div className="navbar">
            <div className='nav-start'>
                <button onClick={toggleProfile} disabled={isProfileClicked} className='nav-button'><img className='nav-btn-img' src="https://cdn.onlinewebfonts.com/svg/img_217837.png" alt="fewre" /></button>
                <Profile isOpen={isProfileOpen} onClose={toggleProfile}/>
            </div>
                
            <div className='nav-end'>
                <button className='nav-button' onClick={e => router.push("/")}><img className='nav-btn-img' src="https://cdn3.iconfinder.com/data/icons/minimalisticons/28/Close-1024.png" alt="" /></button>
            </div>
            
        </div>
    )
}