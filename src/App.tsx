import './App.css'
import Dashboard from './components/dashboard/dashboard';
import Income from './components/income/income';
import { Expenses } from './components/expense/expense'
import { useState } from 'react';

import { Routes, Route } from 'react-router';

function App() {

  const [userName, setUserName] = useState('Guest')

  return (
    <>
        <Routes>
          <Route path="/" element={<Dashboard userName={userName} setUserName={setUserName}/>}/>
        </Routes>
        <Routes>
          <Route path="income" element={<Income userName={userName} setUserName={setUserName}/>}/>
        </Routes>
        <Routes>
          <Route path="expenses" element={<Expenses userName={userName} setUserName={setUserName}/>}/>
        </Routes>
      
    </>
  )
};

export default App;