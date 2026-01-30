import "../../App.css"
import "./income.css"
import "../../assets/react.svg"

interface Paycheque {
  employerName: string,
  totalEarned: number,
  hourlyRate?: number
  plusMinus: number,
  average: number
};

const samplePaycheques: Paycheque[] = [
  {
    employerName: "Unity Technologies",
    totalEarned: 600,
    hourlyRate: 3,
    plusMinus: -220,
    average: 422.45
  },
  {
    employerName: "343 Industries",
    totalEarned: 500,
    plusMinus: 120,
    average: 300
  }
];

const months: string[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const pastFiveMonths: string[] = [
  months[(new Date().getMonth() + 8) % 12],
  months[(new Date().getMonth() + 9) % 12],
  months[(new Date().getMonth() + 10) % 12],
  months[(new Date().getMonth() + 11) % 12],
  months[new Date().getMonth()]
];

function Income() {
  return (
    <>
      <div className="content-container">
        <section className="content">
          <h1 id="title">Income</h1>
          <h2>Past 5 Months</h2>
          <div id="graph-container">
            <div id="graph-side-label">
              <p>$400</p>
              <p>$200</p>
              <p>$0</p>
            </div>
            <div id="graph">
              {pastFiveMonths.map((month) => {
                return (
                  <div id="graph-slice">
                    <div id="bar"></div>
                    <p>{month.slice(0, 3)}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div id="income-month-container">
            <select id="income-month" className='income-month' aria-label="Income Month">
              {months.map((month) => {
                const monthIndex: number = months.indexOf(month);
                return (
                  <option selected={monthIndex === new Date().getMonth() ? true : false} value={monthIndex}>{month}</option>
                )
              })}
            </select>
            <button className="income-month">+</button>
          </div>
          <div id="salary-overview">
            {samplePaycheques.map((paycheque => {
              return (
                <div className="transaction-item incomes">
                  <span>
                    <h3>{paycheque.employerName}</h3>
                    <p>${paycheque.totalEarned} {!paycheque.hourlyRate ? '' : "@ $" + paycheque.hourlyRate + "/hr"}</p>
                  </span>
                  <span>
                    <p>${paycheque.plusMinus >= 0 ? paycheque.plusMinus + " more" : -paycheque.plusMinus + " less"} than last month</p>
                  </span>
                  <span>
                    <p>${paycheque.average} average in the past 12 months</p>
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