import "./dashboard.css";

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
};

const testTransactions: Transaction[] = [
    { id: '1', type: 'income', amount: 3000, category: 'Salary', description: 'Monthly salary', date: '2026-01-01' },
    { id: '2', type: 'expense', amount: 1200, category: 'Rent', description: 'January rent', date: '2026-01-05' },
    { id: '3', type: 'expense', amount: 150, category: 'Groceries', description: 'Weekly groceries', date: '2026-01-07' },
    { id: '4', type: 'income', amount: 500, category: 'Freelance', description: 'Web design project', date: '2026-01-10' },
    { id: '5', type: 'expense', amount: 80, category: 'Utilities', description: 'Electric bill', date: '2026-01-12' },
];

function Dashboard() {

    let totalIncome = 0;

    testTransactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        }
    });

    let totalExpenses = 0;

    testTransactions.forEach(transaction => {
        if (transaction.type === 'expense') {
            totalExpenses += transaction.amount;
        }
    });
  
    const balance = totalIncome - totalExpenses;

    return (
        <section className="dashboard">
            <div className="title">
                <h1>Financial Dashboard</h1>
            </div>
            <div className="summary-cards">
                <div className="total-income">
                    <h2>Total Income</h2>
                    <p> ${totalIncome.toFixed(2)}</p>
                </div>
                <div className="total-expenses">
                    <h2>Total Expenses</h2>
                    <p> ${totalExpenses.toFixed(2)}</p>
                </div>
                <div className="balance">
                    <h2>Balance</h2>
                    <p> ${balance.toFixed(2)}</p>
                </div>
            </div>
            <div className="transactions">
                <h2> Recent Transactions</h2>
                <ul className="transaction-list">
                    {testTransactions.map((transaction => {
                        //Checks if the transaction is negative or positive
                        const sign = transaction.type === 'income' ? "+": "-";
                        return(
                        <li key={transaction.id} className={`transaction-item ${transaction.type}`}>
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
                        </li>
                        )
                    }))}
                </ul>
            </div>
        </section>
    );
};

export default Dashboard;