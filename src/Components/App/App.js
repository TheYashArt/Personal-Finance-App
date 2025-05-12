// import logo from './logo.svg';
import './App.css';
import Header from '../Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import ExpenseTracker from '../ExpenseTracker/ExpenseTracker';
import IncomeReview from '../IncomeReview/IncomeReview';
import UserProfile from '../UserProfile/UserProfile';
import HomePage from '../HomePage/HomePage';
import Login from '../Login/Login';
import Register from '../Register/Register';

function App() {
  return (
    <div className="App ">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/IncomeReview' element={<IncomeReview/>} />
          <Route path='/ExpenseTracker' element={<ExpenseTracker/>} />
          <Route path='/Dashboard' element={<Dashboard/>} />
          <Route path='/UserProfile' element={<UserProfile/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/Register' element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
