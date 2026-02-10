import './App.css'
import Dashboard from './components/dashboard/dashboard';
import Income from './components/income/income';
import { Expenses } from './components/expense/expense'
import { Routes, Route } from 'react-router';

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
        </Routes>
        <Routes>
          <Route path="income" element={<Income/>}/>
        </Routes>
        <Routes>
          <Route path="expenses" element={<Expenses/>}/>
        </Routes>
    </>
  )
};

export default App;