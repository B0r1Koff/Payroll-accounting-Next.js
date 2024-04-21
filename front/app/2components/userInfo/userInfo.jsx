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
      <div className="worker-info-container">   
        <div className="worker-info-box">
          <h3 className="worker-info-h3"><span className="worker-info-span"></span>Работник</h3>
          <div className="worker-info-form">
            <div className="worker-info-input_box">
              <input type="text" required className="worker-info-input" name="fullName" placeholder="Full Name" value={userData.fullName} onChange={handleUserDataChange}/>
              <label className="worker-info-label">ФИО:</label>
            </div>
            <div className="worker-info-input_box">
              <input type="text" required className="worker-info-input" name="username" placeholder="Username" value={userData.username} onChange={handleUserDataChange}/>
              <label className="worker-info-label">Логин:</label>
            </div>
            <div className="worker-info-input_box">
              <input type="password" required className="worker-info-input" name="password" placeholder="Password" value={userData.password} onChange={handleUserDataChange}/>
              <label className="worker-info-label">Пароль:</label>
            </div>
          </div>
        </div>
      </div>
    )
}