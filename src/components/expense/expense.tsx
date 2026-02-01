import React, { useState } from "react";
import "./expense.css"
import "../../App.css"

interface Expense {
    id: number;
    name: string;
    amount: number;
};

export function Expenses({ userName, setUserName }: { userName: string; setUserName: (name: string) => void }) {
    const [expenses, setExpenses] = useState<Expense[]>([
        {
            id: 1,
            name: "Rent",
            amount: 1200
        },
        {
           id: 2,
           name: "Groceries",
           amount: 200
        },
        {
            id: 3,
            name: "Car Insurance",
            amount: 90
        },
        {
            id: 4,
            name: "Medication",
            amount: 30
        },
        {
            id: 5,
            name: "Clothes",
            amount: 100
        }

    ]);
    const [expenseType, setExpenseName] = useState("");
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState('');

    function addExpense(event: React.FormEvent) {
        let nextId = 1
        if (expenseType === ''){
            setError("Expense type cannot be empty.")
            event.preventDefault();
            return   
        }

        if (amount < 0) {
            setError("Amount cannot be less than zero or negative.")
            event.preventDefault();
            return
        }

        const newExpense: Expense = {
            id: nextId++,
            name: expenseType,
            amount: amount,
        };

        setExpenses([...expenses, newExpense]);
        setExpenseName("");
        setAmount(0);
    };

    function removeExpense(id: number) {
        setExpenses(prev =>
            prev.filter(expense => expense.id !== id
            )
        );

    }

    return (  
        <div className="expense-container">
            <section className="expense">
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
            <form>   
                <h1 id="title">Expenses</h1>

                {error && <p className="error">{error}</p>}
                <div className="expense-labels">
                <label>
                    Enter amount of expense:
                    <input 
                    type="number" 
                    value={amount.toString()} 
                    onChange={(e) => setAmount(Number(e.target.value))}
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
                </div>
                <ul>
                    {expenses.map((expense, index) => (
                        <li key={index}>
                            {expense.name}: ${expense.amount}

                            <button className="remove-expenses" type="button" onClick={() => removeExpense(expense.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </form>
            </section>
        </div>
    );
}  
