import React from 'react';
import './App.scss';
import LogIn from './components/LogIn/LogIn';
import HomePage from './components/HomePage/HomePage';
import EventsOrder from './components/EventsOrder/EventsOrder';
import BusinessPage from './components/BusinessPage/BusinessPage';
import BusinessGalery from './components/BusinessGalery/BusinessGalery';
import Products from './components/Products/Products';
import MenagerPage from './components/MenagerPage/MenagerPage';
import ReportsForBusinessMan from './components/ReportsForBusinessMan/ReportsForBusinessMan';
import ReportForBusiness from './components/ReportForBusiness/ReportForBusiness';
import CustomersEvents from './components/CustomersEvents/CustomersEvents';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './redux/features/userSlice';
import { Route, Routes } from 'react-router-dom';


function App() {
  const myStore = configureStore({
    reducer: {
      userSlice
    }
  })

  return (
    <Provider store={myStore}>

      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/LogIn' element={<LogIn ></LogIn>}></Route>
        <Route path='/EventsOrder' element={<EventsOrder></EventsOrder>}></Route>
        <Route path='/BusinessPage' element={<BusinessPage></BusinessPage>}></Route>
        <Route path='/BusinessGalery' element={<BusinessGalery></BusinessGalery>}></Route>
        <Route path='/Products' element={<Products></Products>}></Route>
        <Route path='/MenagerPage' element={<MenagerPage></MenagerPage>}></Route>
        <Route path='/ReportsForBusinessMan' element={<ReportsForBusinessMan></ReportsForBusinessMan>}></Route>
        <Route path='/ReportForBusiness' element={<ReportForBusiness></ReportForBusiness>}></Route>
        <Route path='/CustomersEvents' element={<CustomersEvents></CustomersEvents>}></Route>
        
      </Routes>
    </Provider>
  );



  
}


export default App;
