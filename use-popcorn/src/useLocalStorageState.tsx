import { useEffect, useState } from "react";

export function useLocalStorageState(initialState:[],key:string){

    const [value, setValue] = useState(function(){
    const storedValue = localStorage.getItem("watched");
    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }
    else{
        return initialState
    }
  });

  useEffect(function(){
    localStorage.setItem(key,JSON.stringify(value))
  },[value,key])

  return [value,setValue]

}