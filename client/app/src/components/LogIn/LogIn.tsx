import { FC, useRef, useState } from "react"
import './LogIn.scss';
import nodeService from "../../service/node.service";
import { useNavigate } from "react-router-dom";
import userModel from "../../models/userModel";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/features/userSlice';

interface LogInProps {

}

const LogIn: FC<LogInProps> = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkRef = useRef<HTMLInputElement>(null);
  const [error, serError] = useState<any>({});
  const [message, setMessage] = useState<null | string>()
  const [isLogin, setIsLogin] = useState<Boolean>(true)
  const navigate = useNavigate()
  const userSlice = useSelector((myStore: any) => myStore.userSlice)
  const _dispatch = useDispatch()
   let userType='customer'//'businessMan'
  const loginUser = (valueForm: userModel) => {
    // event.preventDefault();
    let name = valueForm.Name;
    let id = valueForm.Id;
    let email = valueForm.Email;
    let phone = valueForm.Phone
    let password = valueForm.Password
    // let userType = valueForm.UserType
   
    if (Object.keys(error).length == 0) {
       
      
    nodeService.logIn(email ? email : '', password ? password : '', userType).then((res) => {
      console.log(res.data)
        if (res.data.isValid == true) {
          let userCurrent = new userModel(name, id, email, phone, password, userType);
          _dispatch(updateUser({ userCurrent }))
          if (userType == 'customer')
            navigate('/CustomersEvents')
          else
            navigate('/ReportsForBusinessMan')
        }
        else {
          setMessage("משתמש לא קיים במערכת")

        }

      }, error => {
        setMessage("שגיאת נתונים - נסה שנית מאוחר יותר")
      })
    }
  }

  const signUpUser = (valueForm: userModel) => {
    let name = valueForm.Name;
    let id = valueForm.Id;
    let email = valueForm.Email;
    let phone = valueForm.Phone
    let password = valueForm.Password
    // let userType = valueForm.UserType

    if (Object.keys(error).length == 0) {
      nodeService.signUp(name ? name : '', id ? id : '', email ? email : '', phone ? phone : '', password ? password : '', userType).then((res) => {
        console.log(res.data)
        console.log(res.data.isValid)
        if (res.data.isValid == true) {
          console.log(res.data.isValid)
          setMessage('נרשמת בהצלחה')
          let userCurrent = new userModel(name, id, email, phone, password, userType);
          _dispatch(updateUser({ userCurrent }))
          if (userType === 'customer')
            navigate('/CustomersEvents')
          else
            navigate('/ReportsForBusinessMan')
        }
        else {
          if (res.data.message == 'change ID')
            setMessage("קיים משתמש בת.ז. זו")
          if (res.data.message == 'change mail')
            setMessage("נא החלף מייל")

        }
      }, error => {
        setMessage("שגיאת נתונים -נסה שנית מאוחר יותר")
      })
    }
  }

  const myForm = useFormik({

    // initialValues: new userModel("", "", "", "", "", `${userSlice.user.userType}`),
    initialValues: new userModel("jon dwo", "123456789", " ", "05263254855", "  ", userType),
    onSubmit: (valueForm: userModel) => {
      {
        console.log("in")
        isLogin ? loginUser(valueForm) : signUpUser(valueForm)
      }

    },

    validationSchema: Yup.object().shape({
      Name: Yup.string().required().min(2),
      Id: Yup.string().required().min(9),
      Email: Yup.string().required().email(),
      Password: Yup.string().required(),
      Phone: Yup.number().required().min(9),
    })
  })

  return <div className="LogIn">
    <p className="point">.</p>
    <h3 className="h3">{isLogin ? "log-in " + userType : "sign-up " + userSlice.user.userType}</h3>
    <form onSubmit={myForm.handleSubmit} className='col-sm-6 form'>
    <div>
      <div className='form-group mt-3'>
        <input name='Email' value={myForm.values.Email} onChange={myForm.handleChange} className={myForm.errors.Email ? 'input form-control is-invalid' : 'input form-control'} placeholder='Email'></input>
        {myForm.errors.Email ? <small className="error_message">{myForm.errors.Email}</small> : ''}
      </div>
      <div className='form-group mt-3'>
        <input name='Password' onChange={myForm.handleChange} className={myForm.errors.Password ? 'input form-control is-invalid' : 'input form-control'} placeholder='Password'></input>
        {myForm.errors.Password ? <small className="error_message">{myForm.errors.Password}</small> : ''}
      </div>
          
      {!isLogin ? <div>
        <div className='form-group mt-3'>
          <input name='Id' onChange={myForm.handleChange} className={myForm.errors.Id ? 'input form-control is-invalid' : 'input form-control'} placeholder='ID'></input>
          {myForm.errors.Id ? <small className="error_message">{myForm.errors.Id}</small> : ''}
        </div>
        <div className='form-group mt-3'>
          <input name='Name' value={myForm.values.Name} onChange={myForm.handleChange} className={myForm.errors.Name ? 'input form-control is-invalid' : 'input form-control'} placeholder='UserName'></input>
          {myForm.errors.Name ? <small className="error_message">{myForm.errors.Name}</small> : ''}
        </div>
        <div className='form-group mt-3'>
          <input name='Phone' value={myForm.values.Phone} onChange={myForm.handleChange} className={myForm.errors.Phone ? 'input form-control is-invalid' : 'input form-control'} placeholder='Phone'></input>
          {myForm.errors.Phone ? <small className="error_message">{myForm.errors.Phone}</small> : ''}
        </div>
      </div> : ''}

      {message ? <div className="message">{message}</div> : ''}
      <button type='submit' className="button">אישור</button>
      <br></br>
      <a className="login-signup" onClick={() => { setIsLogin(!isLogin) }}>{isLogin ? "sign-up" : "log-in"}</a>
      </div>
    </form>
  </div>
};
export default LogIn;



