import "../../App.css"
import "./income.css"
import "../../assets/react.svg"
import { useState } from "react"
import { useUser } from "../../hooks/useUser"

interface Paycheque {
  employerName: string,
  totalEarned: number,
  hourlyRate?: number
};

interface Month {
  name: string,
  paycheques: Paycheque[]
}

function Income() {
  const {userName, setUserName} = useUser();
  const samplePaycheques: Paycheque[] = [
    {
      employerName: "Unity Technologies",
      totalEarned: 600,
      hourlyRate: 3,
    }
  ];
  const otherSamplePaycheque: Paycheque = {
    employerName: "BOB",
    totalEarned: 600,
    hourlyRate: 5
  }

  const [months, setMonths] = useState<Month[]>([
    { name: "January", paycheques: [samplePaycheques[0], otherSamplePaycheque] },
    { name: "February", paycheques: samplePaycheques },
    { name: "March", paycheques: samplePaycheques },
    { name: "April", paycheques: samplePaycheques },
    { name: "May", paycheques: samplePaycheques },
    { name: "June", paycheques: samplePaycheques },
    { name: "July", paycheques: samplePaycheques },
    { name: "August", paycheques: samplePaycheques },
    { name: "September", paycheques: samplePaycheques },
    { name: "October", paycheques: samplePaycheques },
    { name: "November", paycheques: samplePaycheques },
    { name: "December", paycheques: samplePaycheques }
  ]);

  const pastFiveMonths: Month[] = [
    months[(new Date().getMonth() + 8) % 12],
    months[(new Date().getMonth() + 9) % 12],
    months[(new Date().getMonth() + 10) % 12],
    months[(new Date().getMonth() + 11) % 12],
    months[new Date().getMonth()]
  ];

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth())
  const [isInputHidden, setIsInputHidden] = useState(false);

  function handlePaychequeInput(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const formObject = Object.fromEntries(formData.entries())

    const newMonths = [...months]
    newMonths[selectedMonthIndex].paycheques = [...newMonths[selectedMonthIndex].paycheques, {
      employerName: formObject["employer-input"].toString(),
      totalEarned: parseInt(formObject["total-pay-input"].toString()),
      hourlyRate: parseInt(formObject["hourly-rate-input"].toString()),
    }]

    setMonths(newMonths)
  }

  function handleMonthChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedMonthIndex(Number(event.target.value))
  }

  function toggleInputVisibility() {
    setIsInputHidden(!isInputHidden)
  }

  function getMonthlyTotal(month: Month) {
    let total = 0;
    for (let index = 0; index < month.paycheques.length; index++) {
      const cheque = month.paycheques[index];
      total += cheque.totalEarned
    }

    return total
  }

  function deletePaycheque(employer: string){
    const newMonths = [...months]
    newMonths[selectedMonthIndex] = {
      ...newMonths[selectedMonthIndex],
      paycheques: newMonths[selectedMonthIndex].paycheques.filter((cheque) => cheque.employerName !== employer)
    }

    setMonths(newMonths)
  }

  let topEarningMonthOnGraph: Month = months[selectedMonthIndex]


  for (let index = 0; index < pastFiveMonths.length; index++) {
    const month = pastFiveMonths[index];
    if (getMonthlyTotal(month) > getMonthlyTotal(topEarningMonthOnGraph)) {
      topEarningMonthOnGraph = month;
    }
  }

  const mostMonthlyEarnings: number = getMonthlyTotal(topEarningMonthOnGraph);

  return (
    <>
      <div className="content-container">
        <section className="content">
          <div className="username-container">
              <h1>Hi, {userName}!</h1>
              <div className="username-input">
                  <input
                      className="username-input"
                      type="text" 
                      placeholder="Change name..." 
                      onChange={(e) => setUserName(e.target.value)} 
                  />
              </div>
          </div>
          <h1 id="title">Income</h1>
          <h2>Past 5 Months</h2>
          <div id="graph-container">
            <div id="graph-side-label">
              <p>${mostMonthlyEarnings}</p>
              <p>${mostMonthlyEarnings / 2}</p>
              <p>$0</p>
            </div>
            <div id="graph">
              {pastFiveMonths.map((month) => {
                const barStyle = { height: (getMonthlyTotal(month) / mostMonthlyEarnings * 400).toString() + "px" }
                return (
                  <div className="graph-slice">
                    <div className="bar" style={barStyle}></div>
                    <p>{month.name.slice(0, 3)}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div id="income-month-container">
            <select id="income-month" aria-label="Income Month" onChange={handleMonthChange}>
              {months.map((month) => {
                const monthIndex: number = months.indexOf(month);
                return (
                  <option selected={monthIndex === new Date().getMonth() ? true : false} value={monthIndex}>{month.name}</option>
                )
              })}
            </select>
            <button className="income-month" onClick={toggleInputVisibility}>{isInputHidden ? "-" : "+"}</button>
          </div>
          {isInputHidden ? <div id="paycheque-input">
            <form onSubmit={handlePaychequeInput}>
              <label htmlFor="employer-input">Employer Name:</label>
              <input name="employer-input" className="income-form-input" type="text" />
              <label htmlFor="total-pay-input">Total Earnings From Employer in {months[selectedMonthIndex].name}:</label>
              <input name="total-pay-input" className="income-form-input" type="text" />
              <label htmlFor="hourly-rate-input">Hourly Rate (Optional):</label>
              <input name="hourly-rate-input" className="income-form-input" type="text" />
              <input id="income-form-submit" className="form-submit" type="submit" value="Add to Paycheques"></input>
            </form>
          </div> : <></>}
          <div id="salary-overview">
            {months[selectedMonthIndex].paycheques.map((paycheque => {
              const lastPaycheque = months[(selectedMonthIndex + 11) % 12].paycheques.find((element) => element.employerName === paycheque.employerName)
              const payDifference = paycheque.totalEarned - (lastPaycheque?.totalEarned ?? 0)

              let average: number = 0

              for (let index = 0; index < months.length; index++) {
                const month = months[index];
                const cheque = month.paycheques.find((element => element.employerName === paycheque.employerName))
                average += cheque?.totalEarned ?? 0
              }

              average /= 12

              return (
                <>
                  <div className="content-item">
                    <span className="income-component">
                      <h3>{paycheque.employerName}</h3>
                      <p>${paycheque.totalEarned} {!paycheque.hourlyRate ? '' : "@ $" + paycheque.hourlyRate + "/hr"}</p>
                    </span>
                    <span className="income-component">
                      <p>${payDifference >= 0 ? payDifference + " more" : -payDifference + " less"} than last month</p>
                    </span>
                    <span className="income-component">
                      <p>${average.toFixed(2)} average in the past 12 months</p>
                    </span>
                  </div>
                  <button onClick={()=>{deletePaycheque(paycheque.employerName)}} className="remove-income-item">Remove</button>
                </>
              )
            }))}
          </div>
        </section>
      </div>
    </>
  )
}

export default Income