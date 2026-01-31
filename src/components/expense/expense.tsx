import "./expense.css"
import "../../App.css"
import { useState } from "react";

interface Expense {
    name: string;
    amount: number;
};

export function Expenses() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [expenseName, setExpenseName] = useState("");
    const [amount, setAmount] = useState(0);

    function addExpense(event) {
        if (expenseName === ''){
            setError("Expense name cannot be empty")
            event.preventDefault();
            return   
        }

        if (amount < 0) {
            setError("Amount cannot be less than zero or negative")
            event.preventDefault();
            return
        }

        const newExpense: Expense = {
            name: expenseName,
            amount: amount,
        };

        setExpenses([...expenses, newExpense]);
        setExpenseName("");
        setAmount(0);
    };

    return (  
        <div className="expense">    
            <form>   
                <h1 id="title">Expenses</h1>

                <label>
                    Enter amount of expense:
                    <input 
                    type="number" 
                    value={amount.toString()} 
                    onChange={(e) => setAmount(e.target.value)}
                    />
                </label> 

                <label>Select Expense Type:
                    <select
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                    >
                        <option></option>
                        <option>Grocery</option>
                        <option>Utility</option>
                        <option>Mortage</option>
                        <option>Rent</option>
                        <option>Tuition</option>
                        <option>Medication</option>
                        <option>Maintainance</option>
                        <option>General Fees</option>
                    </select>
                </label>

                <button type="button" onClick={addExpense}>Add Expense</button>

                <ul>
                    {expenses.map((expense, index) => (
                        <li key={index}>
                            {expense.name}: ${expense.amount}
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    );;
}  
