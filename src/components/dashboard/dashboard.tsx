import "./dashboard.css";
import BudgetTracker from "./budget-tracker";
import { useState } from "react";
import type { BudgetGoals } from "../../../src/types/budgetGoals";
import type { FormEvent } from "react"
import { useUser } from "../../hooks/useUser";

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
};

const testTransactions: Transaction[] = [
    { id: 1, type: 'income', amount: 3000, category: 'Salary', description: 'Monthly salary', date: '2026-01-01' },
    { id: 2, type: 'expense', amount: 1200, category: 'Rent', description: 'January rent', date: '2026-01-05' },
    { id: 3, type: 'expense', amount: 150, category: 'Groceries', description: 'Weekly groceries', date: '2026-01-07' },
    { id: 4, type: 'income', amount: 500, category: 'Freelance', description: 'Web design project', date: '2026-01-10' },
    { id: 5, type: 'expense', amount: 80, category: 'Utilities', description: 'Electric bill', date: '2026-01-12' },
];




function Dashboard() {
    const {userName, setUserName} = useUser();
    const [budgetGoals, setBudgetGoals] = useState<BudgetGoals>({
        monthlySpendingLimit: 0,
        monthlySavingGoal: 0,
    })

    const [transactions, setTransactions] = useState(testTransactions);
    const [newTransaction, setNewTransaction] = useState({
        description: '',
        category: '',
        amount: '',
        type: 'income' ,
        date: ''
    });

    const initialNextId = Math.max(...transactions.map(t => t.id)) + 1 
    const [nextId, setNextId] = useState(initialNextId);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const transaction: Transaction = {
        ...newTransaction,
        id: nextId,
        amount: parseFloat(newTransaction.amount),
        type: newTransaction.type as 'income' | 'expense'
    }

    setTransactions([...transactions, transaction])
    setNextId(nextId + 1)
    setNewTransaction({
        description: '',
        category: '',
        amount: '',
        type: 'income',
        date: ''
    });
}

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewTransaction({...newTransaction, [event.target.name]: event.target.value})
    }

    const deleteTransaction = (id: number) => {
        const updatedTransactions = transactions.filter(transaction => transaction.id != id);
        setTransactions(updatedTransactions);
    }

    let totalIncome = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        }
    });

    let totalExpenses = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'expense') {
            totalExpenses += transaction.amount;
        }
    });
  
    const balance = totalIncome - totalExpenses;

    const remainingBalance = budgetGoals.monthlySpendingLimit - totalExpenses;

    const currentSavings = totalIncome - totalExpenses;

    const savingProgress = budgetGoals.monthlySavingGoal > 0 
    ? (currentSavings / budgetGoals.monthlySavingGoal) * 100
    : 0;

    return (
        <div className="content-container">
        <section className="content">
            <div>
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
                <h1 id="title">Financial Dashboard</h1>
            </div>
            <div className="summary-cards">
                <div className="summary-card1">
                    <h2>Total Income</h2>
                    <p> ${totalIncome.toFixed(2)}</p>
                </div>
                <div className="summary-card2">
                    <h2>Total Expenses</h2>
                    <p> ${totalExpenses.toFixed(2)}</p>
                </div>
                <div className="summary-card1">
                    <h2>Balance</h2>
                    <p> ${balance.toFixed(2)}</p>
                </div>
            </div>
            <div className="transactions">
                <h2> Recent Transactions</h2>
                <ul className="transaction-list">
                    {transactions.map((transaction => {
                        //Checks if the transaction is negative or positive
                        const sign = transaction.type === 'income' ? "+": "-";
                        return(
                        <li key={transaction.id} className={`content-item ${transaction.type}s`}>
                            <div className="transaction-info">
                                <h3>{transaction.description}</h3>
                                <span className="transaction-category">{transaction.category}</span>
                            </div>
                            <div className="transaction-date">
                                <time dateTime={transaction.date}>
                                    {new Date(transaction.date).toLocaleDateString()}
                                </time>
                            </div>
                            <div className="transaction-amount">
                                {sign}${transaction.amount.toFixed(2)}
                            </div>
                            <div className="delete-button">
                                <button className="dashboard-button" onClick={()=>{deleteTransaction(transaction.id)}}>Delete</button>
                            </div>
                        </li>
                        )
                    }))}
                </ul>
            </div>
            <div className="transaction-form">
                <form onSubmit={handleSubmit}>
                    <div className='transaction-input'>
                       <label>Description</label>
                       <input name= "description" type="text" value={newTransaction.description} onChange={handleChange}></input> 
                    </div>
                    <div className='transaction-input'>
                       <label>Category</label>
                       <input type="text" name= "category" value={newTransaction.category} onChange={handleChange}></input> 
                    </div>
                    <div className='transaction-input'>
                       <label>Amount</label>
                       <input type="number" name= "amount" value={newTransaction.amount} onChange={handleChange}></input> 
                    </div>
                    <div className='transaction-input'>
                        <label>Income or Expense</label>
                        <select name="type" value={newTransaction.type} onChange={handleChange}>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div className='transaction-input'>
                       <label>Date</label>
                       <input type="date" name= "date" value={newTransaction.date} onChange={handleChange}></input> 
                    </div>
                    <div className='submit-button-container'>
                    <button  className="dashboard-button" type='submit'>Submit</button>
                    </div>
                </form>
            </div>
                <BudgetTracker
                budgetGoals = {budgetGoals}
                setBudgetGoals = {setBudgetGoals}
                />
            <div>
            </div>
            <div className="summary-cards">
                <div className="summary-card1">
                    <h2>Remaining Spending Balance</h2>
                    <p> ${remainingBalance.toFixed(2)}</p>
                </div>
                <div className="summary-card2">
                    <h2>Current Savings</h2>
                    <p> ${currentSavings.toFixed(2)}</p>
                </div>
                <div className="summary-card1">
                    <h2>Savings Progress</h2>
                    <p> {savingProgress}%</p>
                </div>
            </div>
        </section>
        </div>
    );
};

export default Dashboard;