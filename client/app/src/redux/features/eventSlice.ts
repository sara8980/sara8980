import { createSlice } from '@reduxjs/toolkit'
import eventModel from '../../models/eventModel'

const initialValue={
   event:new eventModel("","","", new Date())
}

const eventSlice=createSlice({
    
    name:'event',
    
    initialState:initialValue,
    //רשימת הפונקציה לעדכון המחלקה
    reducers:{
         updateEvent:(state,action)=>{  
            state.event=action.payload.eventCurrent  
        }
    }
})
//{reducer,action}
//לייצא את הפונקציה לעדכון המחלקה
export const {updateEvent}=eventSlice.actions
export default eventSlice.reducer