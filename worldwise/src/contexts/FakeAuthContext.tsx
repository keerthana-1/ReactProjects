import { ReactNode, createContext, useContext, useReducer } from "react";

interface createContextType{
    user:userType|null;
    isAuthenticated:boolean;
    login:(user:string,password:string)=>void;
    logout:()=>void;
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

interface userType {
    name: string;
    email: string;
    password: string;
    avatar: string;
  }

const AuthContext=createContext<createContextType|undefined>(undefined);

interface State{
    user:userType|null;
    isAuthenticated:boolean;
}

type Action=
| {type:"login",payload:userType|null}
| {type:"logout"};

const initialState:State={
    user:null,
    isAuthenticated:false
}

function reducer(state:State,action:Action):State{
    switch(action.type){

        case "login":
            return {...state,user:action.payload,isAuthenticated:true}

        case "logout":
            return {...state,user:null,isAuthenticated:false}
    }

}

function AuthProvider({children}:{children:ReactNode}){

    const [{user,isAuthenticated},dispatch]=useReducer(reducer,initialState);

    function login(email:string,password:string){
        if(email===FAKE_USER.email && password===FAKE_USER.password){
            dispatch({type:"login",payload:FAKE_USER})
        }
    }

    function logout(){
        dispatch({type:"logout"})
    }
return(
    <AuthContext.Provider value={{user,isAuthenticated,login,logout}}>{children}</AuthContext.Provider>)
}

function useAuth(){
    const context=useContext(AuthContext);
    if(context===undefined) throw new Error("error")

    return context;

}

export {AuthProvider,useAuth}