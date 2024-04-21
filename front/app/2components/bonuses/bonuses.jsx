import styles from "./bonuses.css"

export default function Bonuses({bonuses, setBonuses}){

    const handleAddBonus = () => {
        setBonuses([...bonuses, { name: '', value: '' }]);
      };
    
      const handleBonusChange = (index, field, value) => {
        const updatedBonuses = [...bonuses];
        updatedBonuses[index][field] = value;
        setBonuses(updatedBonuses);
      };
    
      const handleDeleteBonus = (index) => {
        let items = []
        bonuses.map((item, i) => {
          if(index !== i){
            items.push(item)
          }
        })
        setBonuses(items)
      }

    return(
      <div className="bonuses-info-container">   
        <div className="bonuses-info-box">
          <h3 className="bonuses-info-h3"><span className="bonuses-info-span"></span>Надбавки</h3>
          <button className="new-bonus-button" onClick={handleAddBonus}>Добавить</button>
              {bonuses.map((char, index) => (
                <div className="bonuses-info-form" key={index}>
                  <div className="bonuses-info-input_box">
                    <input type="text" required className="bonuses-info-input" placeholder={index} value={char.name} onChange={(e) => handleBonusChange(index, 'name', e.target.value)} />
                    <label className="bonuses-info-label">Надбавка:</label>
                  </div>
                  <div className="bonuses-info-input_box">
                    <input type="number" required className="bonuses-info-input" placeholder="Введите значение" value={char.value} onChange={(e) => handleBonusChange(index, 'value', e.target.value)} />
                    <label className="bonuses-info-label">Значение:</label>
                  </div>
                  <button className="delete-bonus-button" onClick={e => {handleDeleteBonus(index)}}>Удалить</button>
                </div>
              ))}
        </div>
      </div>
    )
}