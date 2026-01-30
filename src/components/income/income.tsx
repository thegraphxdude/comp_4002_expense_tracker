import "../../App.css"
import "./income.css"
import "../../assets/react.svg"
import { useState } from "react"

interface Paycheque {
  employerName: string,
  totalEarned: number,
  hourlyRate?: number
};

interface Month {
  name: string,
  paycheques: Paycheque[]
}

const employers: string[] = ["Unity Technologies", "343 Industries"]

const samplePaycheques: Paycheque[] = [
  {
    employerName: employers[0],
    totalEarned: 600,
    hourlyRate: 3,
  },
  {
    employerName: employers[1],
    totalEarned: 500,
  }
];

const months: Month[] = [
  { name: "January", paycheques: samplePaycheques },
  {
    name: "February", paycheques: [{
      employerName: employers[1],
      totalEarned: 500,
    }]
  },
  {
    name: "March", paycheques: [{
      employerName: employers[1],
      totalEarned: 500,
    }]
  },
  {
    name: "April", paycheques: [{
      employerName: employers[1],
      totalEarned: 400,
    }]
  },
  {
    name: "May", paycheques: [{
      employerName: employers[1],
      totalEarned: 500,
    }]
  },
  {
    name: "June", paycheques: [{
      employerName: employers[1],
      totalEarned: 500,
    }]
  },
  {
    name: "July", paycheques: [{
      employerName: employers[1],
      totalEarned: 500,
    }]
  },
  {
    name: "August", paycheques: [{
      employerName: employers[1],
      totalEarned: 500,
    }]
  },
  {
    name: "September", paycheques: [{
      employerName: employers[1],
      totalEarned: 500,
    }]
  },
  {
    name: "October", paycheques: [{
      employerName: employers[1],
      totalEarned: 500,
    }]
  },
  {
    name: "November", paycheques: [{
      employerName: employers[1],
      totalEarned: 500,
    }]
  },
  {
    name: "December", paycheques: [{
      employerName: employers[1],
      totalEarned: 600,
    }]
  }
];

const pastFiveMonths: Month[] = [
  months[(new Date().getMonth() + 8) % 12],
  months[(new Date().getMonth() + 9) % 12],
  months[(new Date().getMonth() + 10) % 12],
  months[(new Date().getMonth() + 11) % 12],
  months[new Date().getMonth()]
];

function Income() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth())

  function handleMonthChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedMonthIndex(Number(event.target.value))
  }

  function getMonthlyTotal(month: Month) {
    let total = 0;
    for (let index = 0; index < month.paycheques.length; index++) {
      const cheque = month.paycheques[index];
      total += cheque.totalEarned
    }

    return total
  }

  let topEarningMonthOnGraph: Month = months[selectedMonthIndex]

  for (let index = 0; index < pastFiveMonths.length; index++) {
    const month = pastFiveMonths[index];
      if (getMonthlyTotal(month) > getMonthlyTotal(topEarningMonthOnGraph)){
        topEarningMonthOnGraph = month;
      }
  }
  
  const mostMonthlyEarnings: number = getMonthlyTotal(topEarningMonthOnGraph);

  return (
    <>
      <div className="content-container">
        <section className="content">
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
                const barStyle = { height: (getMonthlyTotal(month) / mostMonthlyEarnings * 400).toString() + "px"}
                return (
                  <div id="graph-slice">
                    <div id="bar" style={barStyle}></div>
                    <p>{month.name.slice(0, 3)}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div id="income-month-container">
            <select id="income-month" className='income-month' aria-label="Income Month" onChange={handleMonthChange}>
              {months.map((month) => {
                const monthIndex: number = months.indexOf(month);
                return (
                  <option selected={monthIndex === new Date().getMonth() ? true : false} value={monthIndex}>{month.name}</option>
                )
              })}
            </select>
            <button className="income-month">+</button>
          </div>
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
                <div className="transaction-item incomes">
                  <span>
                    <h3>{paycheque.employerName}</h3>
                    <p>${paycheque.totalEarned} {!paycheque.hourlyRate ? '' : "@ $" + paycheque.hourlyRate + "/hr"}</p>
                  </span>
                  <span>
                    <p>${payDifference >= 0 ? payDifference + " more" : -payDifference + " less"} than last month</p>
                  </span>
                  <span>
                    <p>${average.toFixed(2)} average in the past 12 months</p>
                  </span>
                </div>
              )
            }))}
          </div>
        </section>
      </div>
    </>
  )
}

export default Income