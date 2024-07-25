import {applyMiddleware, combineReducers, createStore} from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//multiple reducers
const rootReducer=combineReducers({
    account: accountReducer,
     customer: customerReducer
 })
 
 const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
export default store;

//const store=createStore(accountReducer)  //single reducer

// store.dispatch({type:"account/deposit",payload:300});
// console.log(store.getState())
// store.dispatch({type:"account/withdraw",payload:200});
// console.log(store.getState())
// store.dispatch({type:"account/requestloan",payload:{amount:200,purpose:"buy car"}});
// console.log(store.getState())
// store.dispatch({type:"account/payloan"});



// store.dispatch(deposit(500));
// console.log(store.getState())
// store.dispatch(withdraw(200));
// console.log(store.getState())
// store.dispatch(requestLoan(1000,"buy a car"));
// console.log(store.getState())
// store.dispatch(payloan());



// store.dispatch(createCustomer("keerthana","12345"))
// store.dispatch(updateName("keerthi"))
// console.log(store.getState())