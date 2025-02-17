import { createSlice } from '@reduxjs/toolkit'
import userModel from '../../models/userModel'

const initialValue={
   user:new userModel("","","","","","")
}

const userSlice=createSlice({
    
    name:'user',
    
    initialState:initialValue,
    //רשימת הפונקציה לעדכון המחלקה
    reducers:{
         updateUser:(state,action)=>{  
            state.user=action.payload.userCurrent  
        }
    }
})
//{reducer,action}
//לייצא את הפונקציה לעדכון המחלקה
export const {updateUser}=userSlice.actions
export default userSlice.reducer