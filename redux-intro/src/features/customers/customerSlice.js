import { createSlice } from "@reduxjs/toolkit";

const initialState={
    fullname:"",
    nationalId:"",
    createdAt:""
};


const customerSlice=createSlice({
    name: "customer",
    initialState,
    reducers:{

        
        createCustomer:{
        prepare(fullname,nationalId){
            return {payload:{fullname,nationalId,createdAt:new Date().toISOString()}}

        },
        reducer(state,action){
            state.fullname=action.payload.fullname
            state.nationalId=action.payload.nationalId
            state.createdAt=action.payload.createdAt
        }
        },

        updateName(state,action){
            state.fullname=action.payload
        }
    }


})


export const {createCustomer,updateName} = customerSlice.actions;

export default createSlice.reducer;


// export default function customerReducer(state=initialStateCustomer,action){
//     switch(action.type){
//         case "customer/createCustomer":
//             return {...state,fullname:action.payload.fullname,
//                 nationalId:action.payload.id,
//                 createdAt:action.payload.createdat}
//         case "customer/updateName":
//             return {...state,fullname:action.payload}
//         default:
//             return state
//     }
// }

// export function createCustomer(fullname,id){
//     return {type:"customer/createCustomer",payload:{fullname:fullname,id:id,createdat:new Date().toISOString()}}
// }

// export function updateName(fullname){
//     return {type:"customer/updateName",payload:fullname}
// }
