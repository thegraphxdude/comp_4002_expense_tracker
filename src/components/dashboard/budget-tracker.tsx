import type { BudgetGoals } from "../../../src/types/budgetGoals";
import "./budget-tracker.css"

function BudgetTracker({budgetGoals, setBudgetGoals}: 
    {budgetGoals: BudgetGoals, setBudgetGoals: React.Dispatch<React.SetStateAction<BudgetGoals>>}){

    return(
      
        <div className='form-container'>
            <h1 id="title">Budget Tracker</h1>  
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