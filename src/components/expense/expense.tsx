import "./expense.css"
import "../../App.css"

interface Expenses {
    name: string;
    amount: number;
};

const sampleExpenses: Expenses[] = [
    {name: "Rent", amount: 1200},
    {name: "Groceries", amount: 200},
    {name: "Car Insurance", amount: 90},
    {name: "Medication", amount: 30},
    {name: "Clothes", amount: 100},
];

export function Expenses() {
    return (
        <section className="content-container">
            <div className="content">
                <h1 id="title">
                    Expenses
                </h1>
                <ul>{sampleExpenses.map((expense, index) => (
                    <li key={index}>
                        {expense.name}: ${expense.amount.toFixed(2)}
                    </li>
                ))}
                </ul>
            </div>
        </section>
    );
}  
