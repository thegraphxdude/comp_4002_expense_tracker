import "../App.css"
import "./income.css"
import reactLogo from "../assets/react.svg"

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

function Income() {
    return (
        <>
            <section className="income">
                <h1 id="title">
                    Income
                </h1>
                <img src={reactLogo} alt="react logo" className="logo" />
                <br />
                <select id='income-month' aria-label="Income Month">
                    <option selected value='1'>January</option>
                    <option value='2'>February</option>
                    <option value='3'>March</option>
                    <option value='4'>April</option>
                    <option value='5'>May</option>
                    <option value='6'>June</option>
                    <option value='7'>July</option>
                    <option value='8'>August</option>
                    <option value='9'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                </select>
                <div id="salary-overview">
                    {samplePaycheques.map((paycheque => {
                        return(
                            <div>
                                <p>{paycheque.employerName}: ${paycheque.totalEarned} {!paycheque.hourlyRate ? '' : "@ $" + paycheque.hourlyRate + "/hr"}</p>
                                <p>${paycheque.plusMinus >= 0 ? paycheque.plusMinus + " more" : -paycheque.plusMinus + " less"} than last month</p>
                                <p>${paycheque.average} average in the past 12 months</p>
                            </div>
                        )
                    }))}
                </div>
            </section>
        </>
    )
}

export default Income