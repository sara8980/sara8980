import React, { FC, useState } from 'react';
import './EventDetailesForStart.scss';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import eventModel from '../../models/eventModel';
import nodeService from '../../service/node.service';
import { useSelector } from 'react-redux';


interface EventDetailesForStartProps {
  funcParent:(event:eventModel)=>void
}

const EventDetailesForStart: FC<EventDetailesForStartProps> = (props:EventDetailesForStartProps) => {
  const navigate = useNavigate()
  const [message, setMessage] = useState<null | string>()
  const userSlice = useSelector((myStore: any) => myStore.userSlice)

  const myForm = useFormik({
    initialValues: new eventModel("","","",new Date()),

    onSubmit: async (valueForm: eventModel) => {
      { ///func of check if exist and open orderEvent
        // if(await !nodeService.isExistEventsNameToCustomer(valueForm.event_name,userSlice.user.Id))
        {
        
          nodeService.addEvent("111223344", valueForm.event_name,String(valueForm.the_date))
          props.funcParent(valueForm)
        }}
      },

    validationSchema: Yup.object().shape({
      event_name: Yup.string().required().min(2),
      //add ckeck date
      the_date: Yup.date().required(),
    })
  })
  

  return <div className="EventDetailesForStart">
  
    <form onSubmit={myForm.handleSubmit} className='col-sm-6 form'>
    <div className='form-group mt-3'>
      <input name='event_name' value={myForm.values.event_name} onChange={myForm.handleChange} className={myForm.errors.event_name ? 'input form-control is-invalid' : 'input form-control'} placeholder='event_name'></input>
      {myForm.errors.event_name ? <small className="error_message">{myForm.errors.event_name}</small> : ''}
    </div>
    <div className='form-group mt-3'>
      <input name='the_date' type="date" onChange={myForm.handleChange} className={myForm.errors.the_date ? 'input form-control is-invalid' : 'input form-control'} placeholder='the_date'></input>
      {myForm.errors.the_date ? <small className="error_message">{String(myForm.errors.the_date)}</small> : ''}
    </div>
    {message ? <div className="message">{message}</div> : ''}
    <button className="submit">אישור</button>
    <br></br>
  </form>
   
  </div>
};

export default EventDetailesForStart;
