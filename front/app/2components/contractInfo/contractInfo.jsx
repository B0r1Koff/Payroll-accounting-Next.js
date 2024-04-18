export default function ContractInfo({contractData, setContractData}){

    const handleContractDataChange = (e) => {
        const { name, value } = e.target;
        setContractData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

    return(
        <div>
            <h2>Contract Data</h2>
            <input type="text" name="salary" className="contract-creation-input" placeholder="Salary" value={contractData.salary} onChange={handleContractDataChange}/>
            <input type="number" name="vacationDays" className="contract-creation-input" placeholder="Vacation Days" value={contractData.vacationDays} onChange={handleContractDataChange}/>      
        </div>
    )
}