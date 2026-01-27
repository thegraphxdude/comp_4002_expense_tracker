import { useState } from "react";

interface BudgetGoals {
    monthlySpendingLimit: number;
    monthlySavingGoal: number
}

function BudgetTracker(){

    const [budgetGoals, setBudgetGoals] = useState<BudgetGoals>({
        monthlySpendingLimit: 0,
        monthlySavingGoal: 0,
    })
    return(
        
        <div className='form-container'>
            <h1>Set a Budget</h1>
            <form>
                <div className='input-field'>
                    <label>Monthly Spending Limit</label>
                    <input type='number' value={budgetGoals.monthlySpendingLimit}
                    onChange={(event) => setBudgetGoals({...budgetGoals, monthlySpendingLimit: Number(event.target.value)})} aria-label="Spending Limit"/>
                </div>
                <div className="input-field">
                    <label>Monthly Saving Goal</label>
                    <input type='number' value={budgetGoals.monthlySavingGoal}
                    onChange={(event) => setBudgetGoals({...budgetGoals, monthlySavingGoal: Number(event.target.value)})} aria-label="Saving Goal"/>
                </div>
            </form>
            </div>
)}

export default BudgetTracker;