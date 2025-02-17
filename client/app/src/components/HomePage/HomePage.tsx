import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss';
import { updateUser } from '../../redux/features/userSlice';
import userModel from '../../models/userModel';


interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const navigate = useNavigate()
  const _dispatch = useDispatch()
  const userSlice = useSelector((myStore: any) => myStore.userSlice)
  const loginC=()=>{
    let userCurrent = new userModel('','','','','','customer');
    _dispatch(updateUser({ userCurrent }))
    console.log(userSlice.user)
    navigate('/LogIn' )
  }
  const loginB=()=>{
    let userCurrent = new userModel("","","","","",'BusinessMan');
    _dispatch(updateUser({ userCurrent }))
    navigate('/LogIn')
  }
  return <div className="HomePage">
    <button onClick={(event) => { navigate('/MenagerPage')}} className='button'>כניסת מנהל</button>
    <button onClick={loginC} className='button'>כניסת לקוח</button>
    <button onClick={loginB} className='button'>כניסת בעל עסק</button>
  </div>
};

export default HomePage;
