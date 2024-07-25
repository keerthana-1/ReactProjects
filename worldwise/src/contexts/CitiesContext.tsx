import { ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { city } from "../App";
import { newcity } from "../components/Form";

interface CitiesContextType{
    cities:city[];
    isLoading:boolean;
    currentCity:city | null;
    getCity: (id: string|undefined) => Promise<void>;
    createCity: (city: newcity) => Promise<void>;
    deleteCity: (id: number) => Promise<void>;
}

interface reducerState{
  cities:city[];
  isLoading:boolean;
  currentCity:city|null;
  error:string;
}

const CitiesContext=createContext<CitiesContextType|undefined>(undefined);

function CitiesProvider({children}:{children:ReactNode}){

  const BASE_URL="http://localhost:9000"

  const initialState:reducerState={
    cities:[],
    isLoading:false,
    currentCity:null,
    error:"",
  }

  type Action=
  | {type:"loading"}
  | {type:"cities/loaded",payload:city[]}
  | {type:"city/loaded",payload:city}
  | {type:"cities/created";payload:city[]}
  | {type:"cities/deleted";payload:number}
  | {type:"rejected";payload:string};


  // const [cities,setCities]=useState<city[]>([]);
  // const [isLoading,setIsLoading]=useState(false);
  // const [currentCity,setCurrentCity]=useState();

  function reducer(state:reducerState,action:Action):reducerState{
    switch(action.type){
      case "loading":
        return {
          ...state,
          isLoading:true
        }
      case "cities/loaded":
        return {
          ...state,
          isLoading:false,
          cities:action.payload,
        }
      
      case "city/loaded":
        return{
          ...state,
          isLoading:false,
          currentCity:action.payload,
        }

      case "cities/created":
        return{
          ...state,
          isLoading:false,
          cities:action.payload,
        }

      case "cities/deleted":
        return{
          ...state,
          isLoading:false,
          cities:state.cities.filter((city:city)=>city.id!==action.payload),
        }

      case "rejected":
        return {
          ...state,
          isLoading:false,
          error:action.payload,
        }

    }
  }

  const [{cities,isLoading,currentCity},dispatch]=useReducer(reducer,initialState);

  useEffect(function(){
    async function fetchCities(){
      dispatch({type:"loading"});
      try{
      const res=await fetch(BASE_URL+"/cities");
      const data=await res.json();
      dispatch({type:"cities/loaded",payload:data})
      }
      catch{
        dispatch({ type:"rejected",payload:"There was an error loading data..."})
      }
    }
    fetchCities()
  },[])

  async function getCity(id:string|undefined){
    try{
      dispatch({type:"loading"});
      const res=await fetch(`${BASE_URL}/cities/${id}`);
      const data=await res.json();
      dispatch({type:"city/loaded",payload:data})
      }
      catch{
        dispatch({ type:"rejected",payload:"There was an error loading data..."})
      }
  }

  async function createCity(city:newcity){
    try{
      dispatch({type:"loading"});
      const res=await fetch(`${BASE_URL}/cities`,{
        method:"POST",
        body:JSON.stringify(city),
        headers:{
          "Content-Type":"application/json",
        }
      });
      const data=await res.json();
      dispatch({type:"cities/created",payload:data})
      }
      catch{
        dispatch({ type:"rejected",payload:"There was an error loading data..."})
      }
      
  }

  async function deleteCity(id:number){
    try{
      dispatch({type:"loading"});
      await fetch(`${BASE_URL}/cities/${id}`,{
        method:"DELETE"
      });

      dispatch({type:"cities/deleted",payload:id})
      }
      catch{
        dispatch({ type:"rejected",payload:"There was an error loading data..."})
      }
  }
  

  return (
    <CitiesContext.Provider value={{cities,isLoading,currentCity,getCity,createCity,deleteCity}}>
        {children}
    </CitiesContext.Provider>
  )
}

function useCities(){
    const context=useContext(CitiesContext);
    if(context===undefined) throw new Error("error")
    return context;
}


export {CitiesProvider,useCities}
