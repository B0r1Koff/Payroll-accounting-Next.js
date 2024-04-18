import styles from "./userInfo.css"

export default function UserInfo({userData, setUserData}){

    const handleUserDataChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

    return(
        <div className="user-info">
            <h2>User Data</h2>
            <input type="text" name="fullName" className="contract-creation-input" placeholder="Full Name" value={userData.fullName} onChange={handleUserDataChange}/>
            <input type="text" name="username" className="contract-creation-input" placeholder="Username" value={userData.username} onChange={handleUserDataChange}/>
            <input type="password" name="password" className="contract-creation-input" placeholder="Password" value={userData.password} onChange={handleUserDataChange}/>
        </div>
    )
}