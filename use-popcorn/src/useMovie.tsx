import { useEffect, useState } from "react";

export function useMovie(query:string){

    const [movies, setMovies] = useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError] = useState("")
    const KEY="790c93de"

    useEffect(function(){

        const controller=new AbortController();
      
        async function fetchMovies(){
          try{
          setIsLoading(true)
          setError("");
          const res= await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal:controller.signal});
      
          if(!res.ok){
            throw new Error("data not fetched")
          }
      
          const data=await res.json();
      
          if(data.Response === 'False'){
            throw new Error("No Results Found")
          }
      
          setMovies(data.Search);
         
        }catch(err:any){
         
          if(err.name!=="AbortError")
            {
              console.log(err.message);
              setError(err.message);
            }
         
        }
        finally{
          setIsLoading(false)
        }
      
        }
      
        if(query.length<3){
          setMovies([])
          setError("")
          return
        }
       // handleCloseDetails();
       fetchMovies();
      
       return function(){
        controller.abort()
       }
      
      },[query]);

      return {movies,isLoading,error}
}