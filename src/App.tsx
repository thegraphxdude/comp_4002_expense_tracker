import './App.css'
import Dashboard from './components/dashboard/dashboard';
import Income from './components/income';
import { Layout } from './components/layout/Layout';

function App() {
  return (
    <>
      <Layout title='vite-project'>
        <Dashboard/>
        <Income/>
      </Layout>
    </>
  )
};

export default App;