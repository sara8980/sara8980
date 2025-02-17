import React, { FC, useState, useEffect, useRef } from 'react';
import eventModel from '../../models/eventModel';
import './CustomersEvents.scss';
import Loadder from '../Loadder/Loadder';
// import UserDetails from '../User-details/User-details';
import MyModel from '../My-model/My-model';
import nodeService from '../../service/node.service';
import { useDispatch, useSelector } from 'react-redux';
import EventDetailesForStart from '../EventDetailesForStart/EventDetailesForStart';
import { useNavigate } from 'react-router-dom';
import { updateEvent } from '../../redux/features/eventSlice';
import HomePage from '../HomePage/HomePage';


interface CustomersEventsProps { }

const CustomersEvents: FC<CustomersEventsProps> = () => {
  
  const [idCurrentEvent, setIdCurrentEvent] = useState<string>("0")
  const [listEvent, setListEvent] = useState<eventModel[]>([])
  const [listEventForViow, setListEventForViow] = useState<eventModel[]>(listEvent)
  const [isDisplayLoadder, setIsDisplayLoadder] = useState(false)
  const [isDisplayModelDelete, setIsDisplayModelDelete] = useState(false)
  const [isDisplayEventDetails, setIsDisplayEventDetails] = useState(false)
  const [isOpenNewEvent, setIsOpenNewEvent] = useState(false)
  const [errorMessage,setErrorMessage]=useState('')
  const userSlice = useSelector((myStore: any) => myStore.userSlice)
  const _dispatch = useDispatch()
  const navigate = useNavigate()
  let customerId='111223344'
  
  let searchRef = useRef<any>()
  const fanc=()=>{ 
      setIsOpenNewEvent(!isOpenNewEvent)
      console.log(isOpenNewEvent);}

  useEffect(() => {
    loadEvents();
  }, [])

  const addNewEvent = (newEvent: eventModel) => {
    listEvent.push(newEvent)
    setListEvent([...listEvent])
    setListEventForViow([...listEvent])
    setIsOpenNewEvent(false)
  }

  const loadEvents = () => {
    setIsDisplayLoadder(true);
    nodeService.getListEvent(customerId).then((res) => {
      console.log(res.data)
      setListEvent(res.data)
      setListEventForViow(res.data)
      setIsDisplayLoadder(false);
    })
  }
  const searchEvent = () => {
    let searchValue = searchRef.current.value;
    //מחזיר מערך מפולטר
    setListEventForViow([...listEvent.filter((item) => item.event_name.includes(searchValue))])
  }
  
   
    const  deleteEvent=async ()=>{
      nodeService.deleteEvent(userSlice.user.Id, idCurrentEvent).then((res)=>{
        let index= listEvent.findIndex(a=>a.event_code==idCurrentEvent)
        listEvent.splice(index,1)
        setListEvent([...listEvent])
        setListEventForViow([...listEvent])
      },error=>{
        
        setErrorMessage('its not possible to delete this event  :(')
        setTimeout(()=>{
          setErrorMessage('')
        },2000)
      })
      setIsDisplayModelDelete(false)
    }

    const closeModel=()=>{setIsDisplayModelDelete(false)}
  
 

  return <div className="Event-List ">
    <div dir='rtl' className='row' >
      <div className='col-sm-6'>
        <input onBlur={searchEvent} ref={searchRef} className="form-control" type="text" placeholder="Search" aria-label="Search" />
        {isDisplayLoadder ? <Loadder></Loadder> : ''}
        <table className="table table-sm table-dark">
          <thead>
            <tr>
              <th scope="col">קוד</th>
              <th scope="col">שם ארוע</th>
              <th scope="col">תאריך ארוע</th>
              <th scope="col">האם הוזמן</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listEventForViow.map((row: eventModel, i:number) =>
              <tr key={i} >
                <td >{row.event_code}</td>
                <td>{row.event_name}</td>
                <td>{new Date(row.the_date).toUTCString()}</td>
                <td>{row.was_invited?'הוזמן':'עדיין לא'}</td>
                <td>
                <button type="button" className="btn btn-outline-warning" onClick={()=>{setIsDisplayModelDelete(true);setIdCurrentEvent(row.event_code)}}>מחק</button>
                <button type="button" className="btn btn-outline-warning" onClick={()=>( navigate('/EventsOrder'))}>ערוך</button>
               </td> 
              </tr>)}
          </tbody>
        </table>
        {isDisplayModelDelete ? <MyModel titel={`delete Event: ${idCurrentEvent}`} funcParent={deleteEvent} funcParentClose={closeModel}>{`האם אתה בטוח שברצונך למחוק את ארוע: ${idCurrentEvent}?`} </MyModel> : ''}
        {/* {isDisplayEventDetails ? <MyModel titel={`detailes Event: ${idCurrentEvent}`} funcParent={deleteEvent} funcParentClose={closeModel}>{`Did you shure that you want to delete the user ${idCurrentUser}`} </MyModel> : ''} */}

        {errorMessage != "" ? <div className="alert alert-danger" role="alert">{errorMessage} </div> : ""}
      </div>
      <button  onClick={fanc} className='btn btn-outline-warning'>ארוע חדש</button>
      
    </div>

    {isOpenNewEvent?<div className='col-sm-6 left-side'><EventDetailesForStart  funcParent={addNewEvent}></EventDetailesForStart></div>:''}



  </div >
};



export default CustomersEvents;
