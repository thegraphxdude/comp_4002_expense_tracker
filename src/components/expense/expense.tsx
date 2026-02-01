import React, { useState } from "react";
import "./expense.css"
import "../../App.css"

interface Expense {
    name: string;
    amount: number;
};

export function Expenses() {
    const [expenses, setExpenses] = useState<Expense[]>([
        {
            name: "Rent",
            amount: 1200
        },
        {
           name: "Groceries",
           amount: 200
        },
        {
            name: "Car Insurance",
            amount: 90
        },
        {
            name: "Medication",
            amount: 30
        },
        {
            name: "Clothes",
            amount: 100
        }

    ]);
    const [expenseType, setExpenseName] = useState("");
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState('');

    function addExpense(event: React.FormEvent) {
        if (expenseType === ''){
            setError("Expense type cannot be empty")
            event.preventDefault();
            return   
        }

        if (amount < 0) {
            setError("Amount cannot be less than zero or negative")
            event.preventDefault();
            return
        }

        const newExpense: Expense = {
            name: expenseType,
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

                {error && <p className="error">{error}</p>}

                <label>
                    Enter amount of expense:
                    <input 
                    type="number" 
                    value={amount.toString()} 
                    onChange={(e) => setAmount(e.target.value)}
                    />
                </label> 

                {error && <p className="error">{error}</p>}

                <label>Select Expense Type:
                    <select
                    value={expenseType}
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
