//createEmployeeRecord oads Array elements into corresponding Object properties.
// Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  //Converts each nested Array into an employee record using createEmployeeRecord
  // and accumulates it to a new Array
  function createEmployeeRecords(employeeArray) {
    return employeeArray.map(createEmployeeRecord);
  }
  //createTimeInEvent
  function createTimeInEvent(employeeRecord, timestamp) {
    const [date, hour] = timestamp.split(" ");
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour),
    });
    return employeeRecord;
  }
  //createTimeOutEvent
  function createTimeOutEvent(employeeRecord, timestamp) {
    const [date, hour] = timestamp.split(" ");
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour),
    });
    return employeeRecord;
  }
  //hoursWorkedOnDate
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find((event) => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
      return hoursWorked;
    }
  
    return 0;
  }
  //wagesEarnedOnDate
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const hourlyRate = employeeRecord.payPerHour;
    return hoursWorked * hourlyRate;
  }
  //allWagesFor
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map((event) => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    return totalWages;
  }
  //Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee 
  //in the record used as context. Amount should be returned as a number.
  function calculatePayroll(employees) {
    return employees.reduce((total, employeeRecord) => {
      return total + allWagesFor(employeeRecord);
    }, 0);
  }
  