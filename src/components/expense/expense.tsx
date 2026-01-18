import React from "react";
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
            <section className="expense">
                <h1 id="title">
                    Expenses
                </h1>

                <ul>{sampleExpenses.map((expense, index) => (
                    <li key={index}>
                        {expense.name}: ${expense.amount.tofixed(2)}
                    </li>
                ))}
                </ul>
            </section>
    );
}  
