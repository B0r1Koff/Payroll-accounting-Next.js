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
        <div>
            <h3>Надбавки</h3>
            <button onClick={handleAddBonus}>Добавить надбавку</button>
            <ul>
              {bonuses.map((char, index) => (
                <li key={index}>
                <input type="text" className="contract-creation-input" placeholder={index} value={char.name} onChange={(e) => handleBonusChange(index, 'name', e.target.value)}/>
                <input type="text" className="contract-creation-input" placeholder="Введите значение" value={char.value} onChange={(e) => handleBonusChange(index, 'value', e.target.value)}/>
                <button onClick={e => {handleDeleteBonus(index)}}>Удалить</button>
                </li>
              ))}
            </ul>
      </div>
    )
}