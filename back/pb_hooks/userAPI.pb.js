routerAdd("GET", "/api/collections/Worker/login/:login/:password", (c) => {
    
    let login = c.pathParam("login");
    let password = c.pathParam("password");
    let user = null;

    try {
    user = $app.dao().findFirstRecordByData(
        "Worker", "login", login
    )
    } catch (exception) {
        console.log(exception.message)
        return c.json(403, { "message": "UserNotFoundException" })
    }    

    if(user.getString("password") != password)
        return c.json(403, {"message": "WrongPasswordException"})
    
    return c.json(200, { user })
})

onAfterBootstrap((c) => {
    const monthes = arrayOf(new DynamicModel({
        "date": ""
    }))

    const notices = arrayOf(new DynamicModel({
        "id": "",
        "start_date": "",
        "end_date": "",
        "type": "",
        "worker_id": "",
    }))

    const contracts = arrayOf(new DynamicModel({
        "id": "",
        "salary": 0,
        "worker_id": "",
    }))

    const allowances = arrayOf(new DynamicModel({
        "id": "",
        "percent": 0,
        "type": "",
        "worker_id": "",
    }))

    try {
        $app.dao().db()
            .newQuery("SELECT date FROM MonthData")
            .all(monthes) 

        $app.dao().db()
            .newQuery("SELECT id, start_date, end_date, type, worker_id FROM Notices")
            .all(notices) 

        $app.dao().db()
            .newQuery("SELECT id, salary, worker_id FROM Contract")
            .all(contracts) 

        $app.dao().db()
            .newQuery("SELECT id, percent, type, worker_id FROM Allowances")
            .all(allowances) 
    } catch (exception) {
        console.log(exception.message)
    }   

    function isBelarusWeekend(date) {
        const day = date.getDay();
        return day === 6 || day === 0;
      }
      
      function getWorkingDaysInMonth(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
      
        let workingDays = 0;
        let currentDate = firstDay;
      
        while (currentDate <= lastDay) {
          if (!isBelarusWeekend(currentDate)) {
            workingDays++;
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      
        return workingDays;
      }
      
      function calculateSalary(contracts, notices, allowances) {
        const currentDate = new Date(); 
        const lastMonth = currentDate.getMonth(); 
        const lastMonthYear = currentDate.getFullYear(); 
      
        contracts.forEach((contract) => {
          const workingDaysInLastMonth = getWorkingDaysInMonth(lastMonthYear, lastMonth);
      
          let totalWorkDays = workingDaysInLastMonth; 
          let salary = 0; 
          const { id: contractId, salary: contractSalary, worker_id: employeeId } = contract;
      
          const absenceNotices = notices.filter(
            (notice) =>
              notice.worker_id === employeeId &&
              new Date(notice.start_date.substring(0,10)).getMonth() === lastMonth &&
              new Date(notice.start_date.substring(0,10)).getFullYear() === lastMonthYear
          );
            
          let totalAbsentDays = 0; 
      
            absenceNotices.forEach((notice) => {
              if (notice.type !== 'vacation' &&  notice.type !== 'sick leave') {
                const startDate = new Date(notice.start_date.substring(0,10)).getDate();
                const endDate = new Date(notice.end_date.substring(0,10)).getDate();
      
                for (let day = startDate; day <= endDate; day++) {
                  const date = new Date(lastMonthYear, lastMonth, day);
      
                  if (!isBelarusWeekend(date)) {
                    totalAbsentDays += 1;
                  }
                }
              }
            });
      
            totalWorkDays -= totalAbsentDays; 
      
          if (totalWorkDays >= 22) {
            totalWorkDays = 22; 
          }
      
          const employeeAllowances = allowances.filter(
            (allowance) => allowance.worker_id === employeeId
          );
      
          let totalAllowance = 0;
          employeeAllowances.forEach((allowance) => {
            totalAllowance += allowance.percent;
          });
          const totalSalary = contractSalary * (1 + totalAllowance/100)
      
         salary += (totalSalary / workingDaysInLastMonth) * totalWorkDays; 
        
         const collection = $app.dao().findCollectionByNameOrId("MonthData")

         const record = new Record(collection, {
                "date": new Date(),
                "salary": salary * 0.87,
                "allowances": salary * totalAllowance / 100,
                "deductions": salary * 0.13,
                "worker_id": employeeId
         })

         $app.dao().saveRecord(record)
        });
      }

      if(new Date(monthes.reverse()[0].date.substring(0,10)).getMonth() < new Date().getMonth()){
        calculateSalary(contracts, notices, allowances)
      }
      
      console.log(new Date());
})