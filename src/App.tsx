import './App.css'
import Dashboard from './components/dashboard/dashboard';
import Income from './components/income/income';
import Expenses from './components/expense/expense'
import { Layout } from './components/layout/Layout';

function App() {
  return (
    <>
      <Layout title='vite-project'>
        <Dashboard/>
        <Income/>
        <Expenses/>
      </Layout>
    </>
  )
};

export default App;