import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

export interface Country  {
    country: string;
    emoji: string;
  }

function CountryList(){

  const {cities,isLoading}=useCities();

    if(isLoading) return (<Spinner/>)
    if(!cities.length) return (<Message message={"Add your first city by clicking on a city on the map"}/>)
    
        const countries = cities.reduce<Country[]>((arr, city) => {
            if (!arr.map((el) => el.country).includes(city.country))
              return [...arr, { country: city.country, emoji: city.emoji }];
            else return arr;
          }, []);

        return(
    
            <ul className={styles.countryList}>
               {
                countries.map((country:Country)=>(<CountryItem country={country}/>))
               } 
            </ul>
        )

}

export default CountryList;