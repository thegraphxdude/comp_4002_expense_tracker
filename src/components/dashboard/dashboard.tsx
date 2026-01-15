import "./dashboard.css";

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

function Dashboard() {
  // Just initialize data as a regular variable
    const transactions: Transaction[] = [
        { id: '1', type: 'income', amount: 3000, category: 'Salary', description: 'Monthly salary', date: '2026-01-01' },
        { id: '2', type: 'expense', amount: 1200, category: 'Rent', description: 'January rent', date: '2026-01-05' },
        { id: '3', type: 'expense', amount: 150, category: 'Groceries', description: 'Weekly groceries', date: '2026-01-07' },
        { id: '4', type: 'income', amount: 500, category: 'Freelance', description: 'Web design project', date: '2026-01-10' },
        { id: '5', type: 'expense', amount: 80, category: 'Utilities', description: 'Electric bill', date: '2026-01-12' },
    ];

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

    return();
};

export default Dashboard;